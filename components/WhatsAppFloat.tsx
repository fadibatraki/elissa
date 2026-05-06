"use client";

import { useEffect, useState } from "react";

export default function WhatsAppFloat() {
    const phone = "008613927491989";
    const message = "Hello Nyxos, I want to ask about your products";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    const [show, setShow] = useState(false);

    // يظهر بعد ثانيتين
    useEffect(() => {
        const t = setTimeout(() => setShow(true), 1500);
        return () => clearTimeout(t);
    }, []);

    if (!show) return null;

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="
        fixed bottom-6 right-6 z-[9999]
        flex items-center justify-center
        w-16 h-16 rounded-full
        bg-gradient-to-br from-green-500 to-green-600
        shadow-2xl shadow-green-500/40
        hover:scale-110
        transition-all duration-300
        animate-bounce
      "
        >
            {/* glow ring */}
            <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-30 blur-xl animate-ping"></span>

            {/* icon */}
            <svg
                viewBox="0 0 32 32"
                width="30"
                height="30"
                fill="white"
                className="relative z-10"
            >
                <path d="M16.002 3C9.383 3 4 8.383 4 15c0 2.646.86 5.089 2.318 7.077L4 29l7.102-2.273A11.94 11.94 0 0 0 16.002 27C22.617 27 28 21.617 28 15S22.617 3 16.002 3zm0 21.8a9.77 9.77 0 0 1-4.99-1.356l-.357-.21-4.21 1.346 1.375-4.098-.232-.373A9.76 9.76 0 0 1 6.2 15c0-5.405 4.397-9.8 9.802-9.8 5.405 0 9.8 4.395 9.8 9.8s-4.395 9.8-9.8 9.8zm5.48-7.39c-.3-.15-1.77-.874-2.045-.974-.274-.1-.473-.15-.672.15-.2.3-.77.974-.944 1.175-.174.2-.347.225-.647.075-.3-.15-1.266-.467-2.41-1.487-.89-.79-1.49-1.767-1.665-2.066-.174-.3-.018-.462.13-.61.133-.132.3-.348.448-.522.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.672-1.624-.92-2.225-.242-.58-.487-.5-.672-.51l-.57-.01c-.2 0-.525.075-.8.375-.274.3-1.05 1.025-1.05 2.5 0 1.474 1.075 2.9 1.225 3.1.15.2 2.11 3.22 5.11 4.51.714.31 1.27.495 1.704.634.715.23 1.366.198 1.88.12.574-.085 1.77-.724 2.02-1.424.25-.7.25-1.3.175-1.425-.075-.125-.274-.2-.573-.35z" />
            </svg>
        </a>
    );
}
