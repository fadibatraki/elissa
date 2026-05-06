"use client";

import React, { useEffect, useState } from "react";

type ProductCardProps = {
  image: string;
  name: string;
  category: string;
  delay: number;
};

const ProductCard = ({ image, name, category, delay }: ProductCardProps) => (
  <div
    className="group relative rounded-2xl overflow-hidden h-64 cursor-pointer flex items-center justify-center"
    style={{
      animation: `fade-in-up 0.7s ease-out ${delay}s forwards`,
      opacity: 0,
    }}
  >
    {/* خلفية الغلاف */}
    <div className="absolute inset-0 bg-gradient-to-br from-red-950/40 via-transparent/40 to-red-900/30 group-hover:from-red-900/60 group-hover:via-transparent/50 group-hover:to-red-800/50 transition-all duration-500 z-0" />

    {/* المربع + الصورة في النص بالضبط */}
    <div className="relative z-10 flex items-center justify-center h-full w-full">
      <div className="w-60 aspect-square rounded-3xl bg-transparent flex items-center justify-center overflow-hidden">
        <img
          src={image}
          alt={name}
          className="block max-w-[80%] max-h-[80%] object-contain"
        />
      </div>
    </div>

    {/* إطار عند الهوفر */}
    <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-red-500/50 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(236,29,35,0.4)] z-20 pointer-events-none" />

    {/* محتوى الكتابة */}
    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 z-30">
      <div>
        <p className="text-red-400 text-xs font-semibold uppercase tracking-wider">
          {category}
        </p>
        <h4 className="text-white font-bold text-lg">{name}</h4>
      </div>
    </div>
  </div>
);

export default function Footer() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMsg(null);
    setError(null);

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong.");
      } else {
        setMsg("You have been subscribed successfully ✅");
        setEmail("");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const products = [
    {
      name: "33W USB-C Fast Charger",
      category: "Adapters",
      image: "/assets/img/hero/14.png",
      delay: 0,
    },
    {
      name: "25W USB-C Fast Charger",
      category: "Adapters",
      image: "/assets/img/hero/13.png",
      delay: 0.1,
    },
    {
      name: "Dual USB Car Charger 3.1A",
      category: "Adapters",
      image: "/assets/img/hero/11.png",
      delay: 0.2,
    },
    {
      name: "Charger 2.1A Micro USB Cable",
      category: "Charger",
      image: "/assets/img/hero/10.png",
      delay: 0.3,
    },
  ];

  return (
    <footer className="relative w-full py-20 md:py-32 px-4 sm:px-8 md:px-16 overflow-hidden bg-transparent border-t border-red-900/20">
      <div className="pointer-events-none absolute inset-0">
        {/* Grid pattern removed for cleaner look */}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Featured Products Section */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, i) => (
              <ProductCard key={i} {...product} delay={product.delay} />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-red-900/40 to-transparent mb-16" />

        {/* Main footer grid */}
        <div
          className="mb-0 rounded-2xl border border-red-900/50 bg-gradient-to-r from-red-950/40 via-black/60 to-red-950/40 backdrop-blur-md p-8 md:p-12 animate-[fade-in-up_0.6s_ease-out_forwards] opacity-0 hover:border-red-500/70 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(236,29,35,0.3)] relative overflow-hidden"
          style={{ animationDelay: "0.5s" }}
        >
          {/* Background animation elements only in this section */}
          <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-red-600/20 blur-3xl animate-[float-slow_15s_ease-in-out_infinite] pointer-events-none" />
          <div className="absolute -top-20 right-0 w-72 h-72 rounded-full bg-red-500/15 blur-3xl animate-[float-slow_18s_ease-in-out_infinite_reverse] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                Stay Connected
              </h3>
              <p className="text-white/70">
                Get exclusive deals, new launches, and tech insights delivered
                to your inbox.
              </p>
            </div>

            {/* فورم الإيميل */}
            <div className="w-full md:w-auto">
              <form
                onSubmit={handleSubscribe}
                className="w-full flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 md:flex-none px-5 py-3 rounded-lg bg-black/50 border border-red-900/40 text-white text-sm placeholder-white/40 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/50 transition-all duration-300"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 rounded-lg bg-red-600 text-white font-semibold text-sm hover:bg-red-700 transition-all duration-300 shadow-[0_0_20px_rgba(236,29,35,0.5)] hover:shadow-[0_0_30px_rgba(236,29,35,0.7)] whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Subscribing..." : "Subscribe"}
                </button>
              </form>

              {(msg || error) && (
                <p
                  className={`mt-2 text-xs ${
                    error ? "text-red-400" : "text-green-400"
                  }`}
                >
                  {error || msg}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(15px);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(25px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </footer>
  );
}
