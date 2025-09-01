// src/main.jsx
import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "./i18n";
import { Loader2 } from "lucide-react";

function FallbackLoader() {
  return (
    <div
      className="
        relative flex h-screen w-screen items-center justify-center overflow-hidden
        bg-[radial-gradient(1200px_800px_at_50%_-20%,rgba(255,215,0,0.12),transparent),#000]
        text-foreground
      "
      role="status"
      aria-live="polite"
    >
      {/* Subtle grain / noise overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-20 [background:radial-gradient(#fff_1px,transparent_1px)] [background-size:3px_3px]" />

      {/* Glow ring behind logo */}
      <div className="absolute -z-0 h-[380px] w-[380px] rounded-full bg-amber-500/10 blur-3xl" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo in a glass ring */}
        <div className="relative mb-8">
          <div className="absolute inset-0 animate-[spin_8s_linear_infinite] rounded-full border border-amber-500/30" />
          <div className="absolute inset-2 animate-[spin_10s_linear_infinite_reverse] rounded-full border border-amber-500/20" />
          <div className="glass relative flex h-28 w-28 items-center justify-center rounded-full">
            {/* Use public logo to avoid import path issues */}
            <img
              src="/logo.svg"
              alt="Elevate Events Logo"
              className="h-14 w-14 object-contain"
            />
          </div>
        </div>

        {/* Brand title */}
        <h1 className="mb-3 font-luxury text-2xl tracking-wide">
          Elevate <span className="text-primary">Events</span>
        </h1>

        {/* Tagline with shimmer */}
        <p className="mb-8 max-w-[28rem] text-center font-elegant text-sm text-muted-foreground">
          <span className="relative inline-block">
            <span className="relative z-10">Crafting unforgettable luxury experiences</span>
            <span
              className="absolute inset-0 -z-0 bg-[linear-gradient(90deg,transparent,rgba(255,215,0,.18),transparent)] bg-[length:200px_100%] animate-[shimmer_2.2s_linear_infinite]"
              aria-hidden
            />
          </span>
        </p>

        {/* Progress bar */}
        <div className="relative mb-6 h-2 w-64 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-1/3 animate-[loader_1.4s_ease-in-out_infinite] rounded-full bg-amber-500/80" />
        </div>

        {/* Spinner + label (accessible) */}
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin text-amber-500" aria-hidden="true" />
          <span>Loading translations…</span>
        </div>
      </div>

      {/* Keyframes (scoped via inline styles via Tailwind’s arbitrary values) */}
      <style>
        {`
          @keyframes shimmer {
            0%   { background-position: -200px 0; }
            100% { background-position: calc(200px + 100%) 0; }
          }
          @keyframes loader {
            0%   { transform: translateX(-100%); }
            50%  { transform: translateX(50%); }
            100% { transform: translateX(300%); }
          }
        `}
      </style>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Suspense fallback={<FallbackLoader />}>
      <App />
    </Suspense>
  </StrictMode>
);
