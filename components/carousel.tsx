"use client"

import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react"
import Image from "next/image"
import Link from "next/link"
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react"
import {
    motion,
    useMotionValue,
    useScroll,
    useSpring,
    useTransform,
} from "framer-motion"
import { ChevronLeft, ChevronRight, Flame, MapPin, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Product = {
    id: string
    name: string
    category?: {
        name: string
    } | null
    images: Array<{ url: string }>
}

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
    opts?: CarouselOptions
    plugins?: CarouselPlugin
    orientation?: "horizontal" | "vertical"
    setApi?: (api: CarouselApi) => void
}
type CarouselContextProps = {
    carouselRef: ReturnType<typeof useEmblaCarousel>[0]
    api: ReturnType<typeof useEmblaCarousel>[1]
    scrollPrev: () => void
    scrollNext: () => void
    canScrollPrev: boolean
    canScrollNext: boolean
} & CarouselProps

type HeroCarouselProps = {
    products: Product[]
}

const CarouselContext = createContext<CarouselContextProps | null>(null)

function useCarousel() {
    const context = useContext(CarouselContext)
    if (!context) {
        throw new Error("useCarousel must be used within a <Carousel />")
    }
    return context
}

function Carousel({
    orientation = "horizontal",
    opts,
    setApi,
    plugins,
    className,
    children,
    ...props
}: React.ComponentProps<"div"> & CarouselProps) {
    const [carouselRef, api] = useEmblaCarousel(
        {
            ...opts,
            axis: orientation === "horizontal" ? "x" : "y",
        },
        plugins,
    )

    const [canScrollPrev, setCanScrollPrev] = useState(false)
    const [canScrollNext, setCanScrollNext] = useState(false)

    const onSelect = useCallback((carouselApi: CarouselApi) => {
        if (!carouselApi) return
        setCanScrollPrev(carouselApi.canScrollPrev())
        setCanScrollNext(carouselApi.canScrollNext())
    }, [])

    const scrollPrev = useCallback(() => {
        api?.scrollPrev()
    }, [api])

    const scrollNext = useCallback(() => {
        api?.scrollNext()
    }, [api])

    const handleKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLDivElement>) => {
            if (event.key === "ArrowLeft") {
                event.preventDefault()
                scrollPrev()
            } else if (event.key === "ArrowRight") {
                event.preventDefault()
                scrollNext()
            }
        },
        [scrollPrev, scrollNext],
    )

    useEffect(() => {
        if (!api || !setApi) return
        setApi(api)
    }, [api, setApi])

    useEffect(() => {
        if (!api) return
        onSelect(api)
        api.on("reInit", onSelect)
        api.on("select", onSelect)

        return () => {
            api.off("select", onSelect)
        }
    }, [api, onSelect])

    return (
        <CarouselContext.Provider
            value={{
                carouselRef,
                api,
                opts,
                orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
                scrollPrev,
                scrollNext,
                canScrollPrev,
                canScrollNext,
            }}
        >
            <div
                onKeyDownCapture={handleKeyDown}
                className={cn("relative", className)}
                role="region"
                aria-roledescription="carousel"
                data-slot="carousel"
                {...props}
            >
                {children}
            </div>
        </CarouselContext.Provider>
    )
}

function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
    const { carouselRef, orientation } = useCarousel()

    return (
        <div ref={carouselRef} className="overflow-hidden" data-slot="carousel-content">
            <div
                className={cn(
                    "flex",
                    orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
                    className,
                )}
                {...props}
            />
        </div>
    )
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
    const { orientation } = useCarousel()

    return (
        <div
            role="group"
            aria-roledescription="slide"
            data-slot="carousel-item"
            className={cn(
                "min-w-0 shrink-0 grow-0",
                orientation === "horizontal" ? "pl-4" : "pt-4",
                className,
            )}
            {...props}
        />
    )
}

function CarouselPrevious({
    className,
    variant = "outline",
    size = "icon",
    ...props
}: React.ComponentProps<typeof Button>) {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel()

    return (
        <Button
            data-slot="carousel-previous"
            variant={variant}
            size={size}
            className={cn(
                "hero-icon-btn z-20 transition-all duration-300",
                orientation === "horizontal"
                    ? "absolute top-1/2 -left-24 md:-left-32 -translate-y-1/2"
                    : "absolute -top-12 left-1/2 -translate-x-1/2 rotate-90",
                className,
            )}
            disabled={!canScrollPrev}
            onClick={scrollPrev}
            {...props}
        >
            <ChevronLeft className="h-7 w-7" />
            <span className="sr-only">Previous slide</span>
        </Button>
    )
}

function CarouselNext({
    className,
    variant = "outline",
    size = "icon",
    ...props
}: React.ComponentProps<typeof Button>) {
    const { orientation, scrollNext, canScrollNext } = useCarousel()

    return (
        <Button
            data-slot="carousel-next"
            variant={variant}
            size={size}
            className={cn(
                "hero-icon-btn z-20 transition-all duration-300",
                orientation === "horizontal"
                    ? "absolute top-1/2 -right-24 md:-right-32 -translate-y-1/2"
                    : "absolute -bottom-12 left-1/2 -translate-x-1/2 rotate-90",
                className,
            )}
            disabled={!canScrollNext}
            onClick={scrollNext}
            {...props}
        >
            <ChevronRight className="h-7 w-7" />
            <span className="sr-only">Next slide</span>
        </Button>
    )
}

type DotButtonProps = React.ComponentProps<"button">

function DotButton({ className, ...props }: DotButtonProps) {
    return <button type="button" className={cn("cursor-pointer", className)} {...props} />
}

type UseDotButtonType = {
    selectedIndex: number
    scrollSnaps: number[]
    onDotButtonClick: (index: number) => void
}

function useDotButton(emblaApi: CarouselApi | undefined): UseDotButtonType {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

    const onDotButtonClick = useCallback(
        (index: number) => {
            if (!emblaApi) return
            emblaApi.scrollTo(index)
        },
        [emblaApi],
    )

    const onInit = useCallback((carouselApi: CarouselApi) => {
        if (!carouselApi) return
        setScrollSnaps(carouselApi.scrollSnapList())
    }, [])

    const onSelect = useCallback((carouselApi: CarouselApi) => {
        if (!carouselApi) return
        setSelectedIndex(carouselApi.selectedScrollSnap())
    }, [])

    useEffect(() => {
        if (!emblaApi) return

        onInit(emblaApi)
        onSelect(emblaApi)
        emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect)
    }, [emblaApi, onInit, onSelect])

    return {
        selectedIndex,
        scrollSnaps,
        onDotButtonClick,
    }
}

function useMediaQuery(query: string) {
    const [matches, setMatches] = useState(false)

    useEffect(() => {
        const mediaQuery = window.matchMedia(query)
        const onChange = () => setMatches(mediaQuery.matches)

        onChange()
        mediaQuery.addEventListener?.("change", onChange)

        return () => mediaQuery.removeEventListener?.("change", onChange)
    }, [query])

    return matches
}

export function HeroCarousel({ products }: HeroCarouselProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const isLg = useMediaQuery("(min-width: 1024px)")

    const { scrollY } = useScroll()
    const y1 = useTransform(scrollY, [0, 500], [0, 150])
    const y2 = useTransform(scrollY, [0, 500], [0, -100])

    const mouseXValue = useMotionValue(0)
    const mouseYValue = useMotionValue(0)
    const mouseX = useSpring(mouseXValue, { stiffness: 100, damping: 30 })
    const mouseY = useSpring(mouseYValue, { stiffness: 100, damping: 30 })

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            const { clientX, clientY } = event
            const { innerWidth, innerHeight } = window
            const x = (clientX - innerWidth / 2) / innerWidth
            const y = (clientY - innerHeight / 2) / innerHeight

            mouseXValue.set(x * 20)
            mouseYValue.set(y * 20)
        }

        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [mouseXValue, mouseYValue])

    const heroProducts = useMemo(
        () =>
            products.slice(0, 7).map((product, index) => ({
                ...product,
                rating: 4.7 + index * 0.1,
            })),
        [products],
    )

    const desktopCardPositions = useMemo(
        () => [
            { top: "0%", left: "-15%", rotate: -8 },
            { top: "18%", right: "6%", rotate: 4 },
            { bottom: "15%", left: "18%", rotate: 5 },
            { bottom: "-16%", right: "-2%", rotate: -5 },
            { bottom: "-34%", right: "40%", rotate: -12 },
            { bottom: "-34%", right: "90%", rotate: 12 },
            { bottom: "14%", right: "100%", rotate: -12 },
        ],
        [],
    )

    const techNodes = useMemo(
        () => [
            { x: 700, y: 154, delay: 0.3, color: "rgba(245,130,32,0.9)", radius: 7 },
            { x: 850, y: 214, delay: 0.9, color: "rgba(245,130,32,0.82)", radius: 6 },
            { x: 972, y: 286, delay: 1.4, color: "rgba(245,130,32,0.72)", radius: 7 },
            { x: 818, y: 404, delay: 1.9, color: "rgba(245,130,32,0.75)", radius: 6 },
            { x: 1068, y: 424, delay: 2.3, color: "rgba(245,130,32,0.7)", radius: 6 },
        ],
        [],
    )

    const accessNodes = useMemo(
        () => [
            { x: 742, y: 192, delay: 0.5, color: "rgba(245,130,32,0.28)", size: 42 },
            { x: 1012, y: 246, delay: 1.1, color: "rgba(245,130,32,0.24)", size: 34 },
            { x: 904, y: 392, delay: 1.8, color: "rgba(245,130,32,0.22)", size: 38 },
        ],
        [],
    )

    return (
        <section className="relative min-h-screen w-full overflow-hidden" style={{ backgroundColor: "#000000" }}>
            <div className="absolute inset-0 pointer-events-none overflow-hidden">    <div
                className="absolute inset-0"
                style={{
                    background: `
                            radial-gradient(circle at 18% 22%, rgba(245, 130, 32, 0.08) 0%, transparent 24%),
                            radial-gradient(circle at 84% 18%, rgba(59, 130, 246, 0.09) 0%, transparent 24%),
                            radial-gradient(circle at 72% 74%, rgba(16, 185, 129, 0.06) 0%, transparent 18%),
                            linear-gradient(135deg, #020202 0%, #090909 32%, #101010 62%, #151515 100%)
            `,
                }}
            />

                <motion.div
                    className="absolute inset-0 flex items-center justify-center overflow-hidden"
                    style={isLg ? { x: mouseX, y: mouseY } : undefined}
                >
                    <svg
                        viewBox="0 0 1200 600"
                        className="h-full w-full opacity-100"
                        style={{ width: isLg ? "140%" : "100%" }}
                        preserveAspectRatio="xMidYMid slice"
                    >
                        <defs>
                            <filter id="hero-glow" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="3.2" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>

                            <linearGradient id="hero-panel-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#1a1a1a" stopOpacity="0.62" />
                                <stop offset="100%" stopColor="#0a0a0a" stopOpacity="0.28" />
                            </linearGradient>

                            <linearGradient id="hero-panel-blue" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#0f172a" stopOpacity="0.42" />
                                <stop offset="100%" stopColor="#111827" stopOpacity="0.08" />
                            </linearGradient>

                            <linearGradient id="hero-trace-orange" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#f58220" stopOpacity="0" />
                                <stop offset="35%" stopColor="#f58220" stopOpacity="0.55" />
                                <stop offset="100%" stopColor="#ff9a3d" stopOpacity="0" />
                            </linearGradient>

                            <linearGradient id="hero-trace-blue" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                                <stop offset="35%" stopColor="#3b82f6" stopOpacity="0.42" />
                                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                            </linearGradient>

                            <radialGradient id="hero-ring-orange" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="#f58220" stopOpacity="0.26" />
                                <stop offset="55%" stopColor="#f58220" stopOpacity="0.08" />
                                <stop offset="100%" stopColor="#f58220" stopOpacity="0" />
                            </radialGradient>

                            <radialGradient id="hero-ring-blue" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.18" />
                                <stop offset="55%" stopColor="#3b82f6" stopOpacity="0.05" />
                                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                            </radialGradient>
                        </defs>

                        <g stroke="#ffffff" strokeOpacity="0.04" strokeWidth="1" fill="none">
                            {Array.from({ length: 11 }).map((_, index) => {
                                const y = 70 + index * 48
                                return <path key={`h-${index}`} d={`M0 ${y} H1200`} />
                            })}
                            {Array.from({ length: 13 }).map((_, index) => {
                                const x = 72 + index * 88
                                return <path key={`v-${index}`} d={`M${x} 0 V600`} />
                            })}
                        </g>

                        <g opacity="0.72">
                            <rect x="658" y="108" width="380" height="320" rx="34" fill="url(#hero-panel-gradient)" stroke="rgba(255,255,255,0.05)" />
                            <rect x="720" y="150" width="260" height="112" rx="22" fill="rgba(255,255,255,0.015)" stroke="rgba(255,255,255,0.045)" />
                            <rect x="836" y="292" width="154" height="86" rx="20" fill="url(#hero-panel-blue)" stroke="rgba(59,130,246,0.18)" />
                            <rect x="702" y="316" width="88" height="88" rx="18" fill="rgba(0,0,0,0.22)" stroke="rgba(245,130,32,0.14)" />
                            <path d="M 704 178 H 760" stroke="rgba(255,255,255,0.08)" strokeWidth="6" strokeLinecap="round" />
                            <path d="M 706 196 H 856" stroke="rgba(255,255,255,0.05)" strokeWidth="4" strokeLinecap="round" />
                            <path d="M 856 336 H 958" stroke="rgba(59,130,246,0.18)" strokeWidth="4" strokeLinecap="round" />
                            <path d="M 724 340 H 766" stroke="rgba(245,130,32,0.22)" strokeWidth="4" strokeLinecap="round" />
                        </g>

                        <g opacity="0.22" fill="none">
                            <path d="M 682 176 C 746 168, 808 172, 850 204" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" strokeDasharray="4 8" />
                            <path d="M 812 328 C 844 318, 874 318, 906 334" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" strokeDasharray="4 8" />
                        </g>

                        <g filter="url(#hero-glow)" opacity="0.5">
                            <motion.path
                                d="M 524 204 C 618 204, 676 190, 726 178 C 770 168, 820 168, 866 188"
                                fill="none"
                                stroke="url(#hero-trace-orange)"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 0.7 }}
                                transition={{ duration: 2.2, delay: 0.2, ease: "easeInOut" }}
                            />
                            <motion.path
                                d="M 612 286 C 704 286, 776 286, 840 286 C 896 286, 962 280, 1032 244"
                                fill="none"
                                stroke="url(#hero-trace-blue)"
                                strokeWidth="2"
                                strokeLinecap="round"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 0.55 }}
                                transition={{ duration: 2.4, delay: 0.8, ease: "easeInOut" }}
                            />
                            <motion.path
                                d="M 558 420 C 644 398, 706 350, 746 312 C 804 258, 900 246, 980 290"
                                fill="none"
                                stroke="url(#hero-trace-orange)"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 0.68 }}
                                transition={{ duration: 2.8, delay: 1.6, ease: "easeInOut" }}
                            />
                            <motion.path
                                d="M 712 144 V 118 M 776 144 V 118 M 840 144 V 118 M 904 144 V 118 M 968 144 V 118"
                                fill="none"
                                stroke="url(#hero-trace-blue)"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeDasharray="8 12"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 0.38 }}
                                transition={{ duration: 2.6, delay: 2.2, ease: "easeInOut" }}
                            />
                        </g>

                        <g opacity="0.34">
                            {accessNodes.map((node, index) => (
                                <g key={index} transform={`translate(${node.x} ${node.y})`}>
                                    <motion.circle
                                        r={node.size}
                                        fill="url(#hero-ring-orange)"
                                        initial={{ opacity: 0.2, scale: 0.92 }}
                                        animate={{ opacity: [0.18, 0.32, 0.18], scale: [0.92, 1.04, 0.92] }}
                                        transition={{ duration: 4.4, delay: node.delay, repeat: Infinity, ease: "easeInOut" }}
                                    />
                                    <motion.circle
                                        r={node.size * 0.62}
                                        fill="none"
                                        stroke={node.color}
                                        strokeWidth="1.25"
                                        strokeDasharray="10 8"
                                        initial={{ opacity: 0.16, rotate: 0 }}
                                        animate={{ opacity: [0.12, 0.28, 0.12], rotate: [0, 24, 0] }}
                                        transition={{ duration: 5.5, delay: node.delay, repeat: Infinity, ease: "easeInOut" }}
                                    />
                                </g>
                            ))}
                        </g>

                        <g filter="url(#hero-glow)">
                            {techNodes.map((node, index) => (
                                <g key={index} transform={`translate(${node.x} ${node.y})`} opacity="0.7">
                                    <motion.circle
                                        r={node.radius}
                                        fill="none"
                                        stroke={node.color}
                                        strokeWidth="1"
                                        initial={{ opacity: 0, scale: 0.6 }}
                                        animate={{ opacity: [0, 0.24, 0], scale: [0.6, 1.5, 1.9] }}
                                        transition={{ duration: 3.2, delay: node.delay, repeat: Infinity, ease: "easeOut" }}
                                    />
                                    <motion.circle
                                        r={Math.max(3, node.radius / 2.6)}
                                        fill={node.color}
                                        initial={{ scale: 0.85, opacity: 0.75 }}
                                        animate={{ scale: [0.85, 1.12, 0.85], opacity: [0.55, 0.82, 0.55] }}
                                        transition={{ duration: 2.4, delay: node.delay, repeat: Infinity, ease: "easeInOut" }}
                                    />
                                </g>
                            ))}
                        </g>

                        {[
                            { cx: 246, cy: 152, delay: 0.8 },
                            { cx: 428, cy: 212, delay: 1.2 },
                            { cx: 576, cy: 396, delay: 1.7 },
                            { cx: 1116, cy: 188, delay: 2.2 },
                        ].map((location, index) => (
                            <g key={index}>
                                <motion.circle
                                    cx={location.cx}
                                    cy={location.cy}
                                    r="8"
                                    fill="none"
                                    stroke="#f58220"
                                    strokeWidth="1"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: [0, 0.24, 0], scale: [0.5, 1.7, 2.1] }}
                                    transition={{ duration: 3.4, delay: location.delay, repeat: Infinity, ease: "easeOut" }}
                                />
                                <motion.circle
                                    cx={location.cx}
                                    cy={location.cy}
                                    r="4"
                                    fill="#f58220"
                                    filter="url(#hero-glow)"
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 0.72, scale: 1 }}
                                    transition={{ delay: location.delay, duration: 0.5, type: "spring" }}
                                />
                            </g>
                        ))}
                    </svg>
                </motion.div>

                <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 28%, rgba(0, 0, 0, 0.46) 68%, rgba(0, 0, 0, 0.92) 100%)",
                    }}
                />

                <div
                    className="pointer-events-none absolute inset-y-0 left-0"
                    style={{
                        width: isLg ? "50%" : "100%",
                        background: isLg
                            ? "linear-gradient(90deg, rgba(0, 0, 0, 0.94) 0%, rgba(17, 17, 17, 0.82) 52%, rgba(17, 17, 17, 0.16) 100%)"
                            : "linear-gradient(180deg, rgba(0, 0, 0, 0.94) 0%, rgba(17, 17, 17, 0.78) 55%, rgba(17, 17, 17, 0.34) 100%)",
                    }}
                />
            </div>

            <motion.div ref={containerRef} className="relative z-20">
                <div className="px-5 pb-8 pt-24 sm:px-6 lg:px-16 lg:pb-12 lg:pt-24">
                    <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
                        <motion.div style={{ y: isLg ? y1 : 0 }} className="relative z-20 order-1 min-w-0">    <motion.div
                            initial={{ opacity: 0, x: -24 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7 }}
                            className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2"
                            style={{
                                backgroundColor: "rgba(22, 22, 22, 0.92)",
                                border: "1px solid rgba(22, 22, 22, 0.92)",
                            }}
                        >
                            <Flame className="h-4 w-4" style={{ color: "#f58220" }} />
                            <span className="text-sm font-medium" style={{ color: "#f58220" }}>
                                Face Recognition, Fingerprint & Access Control
                            </span>
                        </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 22 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.75, delay: 0.1 }}
                                className="mb-5 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl xl:text-7xl"
                            >
                                <span className="block">Nyxos</span>
                                <span className="block">
                                    Smart Attendance for{" "}
                                    <motion.span
                                        style={{ color: "#f58220" }}
                                        animate={{
                                            textShadow: [
                                                "0 0 20px rgba(245, 158, 11, 0.28)",
                                                "0 0 40px rgba(245, 158, 11, 0.5)",
                                                "0 0 20px rgba(245, 158, 11, 0.28)",
                                            ],
                                        }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        Modern Teams
                                    </motion.span>
                                </span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 22 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.75, delay: 0.25 }}
                                className="mb-7 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
                            >
                                Secure workforce attendance and access solutions designed for modern businesses.
                                Nyxos combines face recognition, fingerprint verification, and enterprise-grade access control for premium global deployments.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.75, delay: 0.35 }}
                                className="flex flex-col flex-wrap gap-3 sm:flex-row sm:gap-4"
                            >
                                <motion.div whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(245, 158, 11, 0.35)" }} whileTap={{ scale: 0.98 }}>
                                    <Link
                                        href="/products"
                                        className="group flex w-full items-center justify-center gap-2 rounded-full px-7 py-4 text-base font-semibold transition-all sm:w-auto"
                                        style={{ backgroundColor: "#f58220", color: "#0d2233" }}
                                    >
                                        Explore Products
                                        <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                                            <ChevronRight className="h-5 w-5" />
                                        </motion.span>
                                    </Link>
                                </motion.div>

                                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                                    <Link
                                        href="/products"
                                        className="flex w-full items-center justify-center rounded-full px-7 py-4 text-base font-semibold transition-all sm:w-auto"
                                        style={{ border: "2px solid #f58220", color: "#fff", backgroundColor: "transparent" }}
                                    >
                                        Request Quote
                                    </Link>
                                </motion.div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.75, delay: 0.5 }}
                                className="mt-10 grid grid-cols-3 gap-3 border-t pt-7 sm:flex sm:gap-10"
                                style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
                            >
                                {[
                                    
                                    { value: "Global", label: "Enterprise Ready", color: "#f58220" },
                                    { value: "24/7", label: "Access Security", color: "white" },
                                ].map((stat, index) => (
                                    <div key={stat.label} className="min-w-0">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.6 + index * 0.08, type: "spring" }}
                                            className="flex min-w-0 items-center gap-2 text-[1.8rem] font-bold leading-none md:text-3xl"
                                            style={{ color: stat.color }}
                                        >
                                            {stat.value}
                                        </motion.div>
                                        <div className="text-[11px] leading-tight text-white/50 sm:text-sm">{stat.label}</div>
                                    </div>
                                ))}
                            </motion.div>
                        </motion.div>

                        <motion.div style={{ y: isLg ? y2 : 0 }} className="relative order-2 min-w-0">    <div className="relative hidden h-[560px] overflow-visible pt-8 lg:block">
                            {heroProducts.map((product, index) => {
                                const position = desktopCardPositions[index]
                                const isCenterCard = index === 2
                                if (!position) return null

                                return (
                                    <motion.div
                                        key={product.id}
                                        initial={{ opacity: 0, scale: 0.85, y: 30 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        transition={{ delay: 0.35 + index * 0.12, type: "spring" }}
                                        style={{
                                            position: "absolute",
                                            ...position,
                                            rotate: isCenterCard ? 0 : position.rotate,
                                            zIndex: isCenterCard ? 40 : undefined,
                                        }}
                                        whileHover={{ scale: 1.06, rotate: 0, zIndex: 50 }}
                                        className="cursor-pointer"
                                    >
                                        <Link href={`/products/${product.id}`} className="block">
                                            <motion.div
                                                animate={{ y: [0, -7, 0] }}
                                                transition={{ duration: 5 + index * 0.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.35 }}
                                                className={cn(
                                                    "aspect-square overflow-hidden rounded-2xl shadow-2xl flex flex-col",
                                                    isCenterCard ? "w-82 xl:w-80" : "w-56",
                                                )}
                                                style={{
                                                    backgroundColor: "rgba(17, 17, 17, 0.88)",
                                                    backdropFilter: "blur(20px)",
                                                    border: "1px solid rgba(255,255,255,0.08)",
                                                    boxShadow: isCenterCard ? "0 34px 72px rgba(0,0,0,0.52)" : "0 24px 50px rgba(0,0,0,0.45)",
                                                }}
                                            >
                                                <div className="relative min-h-0 flex-1 overflow-hidden">
                                                    <Image
                                                        src={product.images[0]?.url || "/placeholder.svg?height=600&width=800&query=mobile+accessory"}
                                                        alt={product.name}
                                                        fill
                                                        sizes={isCenterCard ? "320px" : "224px"}
                                                        className="object-contain"
                                                        priority={index < 3}
                                                    />
                                                    <div
                                                        className="absolute inset-0"
                                                        style={{ background: "linear-gradient(to top, rgba(0, 0, 0, 0.94) 0%, rgba(0, 0, 0, 0.28) 52%, transparent 75%)" }}
                                                    />

                                                    <div
                                                        className="absolute right-2 top-2 rounded-full px-2 py-0.5 text-[11px] font-medium"
                                                        style={{ backgroundColor: "#f58220", color: "#000000" }}
                                                    >
                                                        Featured
                                                    </div>
                                                    <div
                                                        className="absolute inset-x-0 bottom-0 h-px"
                                                        style={{ background: "linear-gradient(90deg, transparent, rgba(245,130,32,0.45), transparent)" }}
                                                    />
                                                </div>

                                                <div className={cn(isCenterCard ? "p-4" : "p-3")}>
                                                    <div className="mb-1 flex items-center gap-1">
                                                        <MapPin className="h-3 w-3" style={{ color: "#3b82f6" }} />
                                                        <span className={cn("truncate font-medium text-white", isCenterCard ? "text-base" : "text-sm")}>{product.name}</span>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className={cn("truncate text-white/55", isCenterCard ? "text-sm" : "text-xs")}>
                                                            {product.category?.name || "Nyxos collection"}
                                                        </span>
                                                        <div className="flex items-center gap-1">
                                                            <Star className="h-3 w-3 fill-current" style={{ color: "#f58220" }} />
                                                            <span className={cn("text-white/85", isCenterCard ? "text-sm" : "text-xs")}>{product.rating.toFixed(1)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </Link>
                                    </motion.div>
                                )
                            })}
                        </div>

                            <div className="lg:hidden px-1">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    {heroProducts.map((product, index) => (
                                        <motion.div
                                            key={product.id}
                                            initial={{ opacity: 0, y: 16 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.25 + index * 0.08 }}
                                        >
                                            <Link
                                                href={`/products/${product.id}`}
                                                className="mx-auto block aspect-square w-full max-w-[320px] overflow-hidden rounded-2xl shadow-2xl"
                                                style={{
                                                    backgroundColor: "rgba(17, 17, 17, 0.84)",
                                                    backdropFilter: "blur(18px)",
                                                    border: "1px solid rgba(255,255,255,0.08)",
                                                    boxShadow: "0 20px 44px rgba(0,0,0,0.42)",
                                                }}
                                            >
                                                <div className="relative min-h-0 h-[calc(100%-72px)] overflow-hidden">
                                                    <Image
                                                        src={product.images[0]?.url || "/placeholder.svg?height=480&width=640&query=mobile+accessory"}
                                                        alt={product.name}
                                                        fill
                                                        sizes="(max-width: 1024px) 50vw, 33vw"
                                                        className="object-contain"
                                                    />
                                                    <div
                                                        className="absolute inset-0"
                                                        style={{ background: "linear-gradient(to top, rgba(0, 0, 0, 0.94) 0%, rgba(0, 0, 0, 0.28) 52%, transparent 75%)" }}
                                                    />
                                                    <div
                                                        className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold"
                                                        style={{ backgroundColor: "#f58220", color: "#000000" }}
                                                    >
                                                        Featured
                                                    </div>
                                                    <div
                                                        className="absolute inset-x-0 bottom-0 h-px"
                                                        style={{ background: "linear-gradient(90deg, transparent, rgba(245,130,32,0.45), transparent)" }}
                                                    />
                                                </div>

                                                <div className="p-3">
                                                    <div className="mb-1 flex items-center gap-1">
                                                        <MapPin className="h-3 w-3" style={{ color: "#3b82f6" }} />
                                                        <span className="truncate text-sm font-medium text-white">{product.name}</span>
                                                    </div>
                                                    <div className="flex items-center justify-between gap-3">
                                                        <span className="truncate text-xs text-white/55">
                                                            {product.category?.name || "Nyxos collection"}
                                                        </span>
                                                        <div className="flex items-center gap-1">
                                                            <Star className="h-3 w-3 fill-current" style={{ color: "#f58220" }} />
                                                            <span className="text-xs text-white/70">{product.rating.toFixed(1)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            <div
                className="pointer-events-none absolute bottom-0 left-0 right-0 h-28"
                style={{ background: "linear-gradient(to top, #000000 0%, transparent 100%)" }}
            />
        </section>
    )
}

export function Hero({ products }: { products: Product[] }) {
    return <HeroCarousel products={products} />
}

export {
    type CarouselApi,
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
    DotButton,
    useDotButton,
}
