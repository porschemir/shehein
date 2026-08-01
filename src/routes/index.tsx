import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Smartphone,
  Bot,
  ChevronRight,
  Rocket,
  ShieldCheck,
  Zap,
  Users,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shein Gift Card Offer — Claim Yours Today" },
      {
        name: "description",
        content:
          "Pick your device and follow three quick steps to claim your Shein gift card. Limited time offer.",
      },
      { property: "og:title", content: "Shein Gift Card Offer — Claim Yours Today" },
      {
        property: "og:description",
        content:
          "Pick your device and follow three quick steps to claim your Shein gift card. Limited time offer.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const steps = [
  { title: "Enter basic info", desc: "Complete the quick sign-up" },
  {
    title: "Complete 2-3 simple tasks",
    desc: "Get access to recommended mobile games",
  },
  { title: "Get your Shein giftcard", desc: "Earn points and exclusive bonuses" },
];

const badges = [
  { icon: ShieldCheck, label: "Secure experience" },
  { icon: Zap, label: "Quick start" },
  { icon: Users, label: "Trusted by users" },
];

function Pill({ label }: { label: string }) {
  return (
    <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/50 bg-primary/10 px-4 py-1.5 shadow-[0_0_25px_var(--brand-glow)]">
      <span className="size-1.5 rounded-full bg-primary animate-pulse-dot" />
      <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
        {label}
      </span>
    </div>
  );
}

function Index() {
  const [device, setDevice] = useState<"ios" | "android" | null>(null);

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="card-surface w-full max-w-md rounded-3xl p-6 sm:p-8">
        {device === null ? (
          <div className="text-center">
            <Pill label="Limited time offer" />
            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-glow sm:text-5xl">
              Which device are you using?
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Choose your device to continue
            </p>

            <div className="mt-7 space-y-3">
              {[
                {
                  key: "ios" as const,
                  icon: Smartphone,
                  title: "iPhone / iOS",
                  sub: "iOS devices",
                },
                {
                  key: "android" as const,
                  icon: Bot,
                  title: "Android",
                  sub: "Android devices",
                },
              ].map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setDevice(opt.key)}
                  className="flex w-full items-center gap-4 rounded-2xl border border-border bg-secondary/40 p-4 text-left transition-colors hover:border-primary/60 hover:bg-secondary/70"
                >
                  <span className="cta-surface flex size-11 shrink-0 items-center justify-center rounded-xl">
                    <opt.icon className="size-5 text-primary-foreground" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-bold">{opt.title}</span>
                    <span className="block text-xs text-muted-foreground">
                      {opt.sub}
                    </span>
                  </span>
                  <ChevronRight className="size-5 text-primary" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <Pill label="You're ready" />
            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-[2.75rem]">
              Get whatever you want from{" "}
              <span className="text-primary text-glow">Shein</span>
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Follow the quick steps below to continue
            </p>

            <a
              href="https://giftclick.org/aff_c?offer_id=1146&aff_id=27974"
              className="cta-surface mt-6 flex w-full items-center justify-center gap-3 rounded-2xl py-4 text-lg font-extrabold uppercase tracking-wide text-primary-foreground transition-transform hover:scale-[1.02]"
            >
              <Rocket className="size-5" />
              Start now
            </a>

            <div className="mt-6 rounded-2xl border border-border bg-secondary/30 p-5 text-left">
              <div className="flex items-center justify-between">
                <h2 className="font-bold">How it works</h2>
                <ChevronRight className="size-4 text-primary" />
              </div>
              <ol className="mt-4 space-y-4">
                {steps.map((s, i) => (
                  <li key={s.title} className="flex gap-3">
                    <span className="cta-surface flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-primary-foreground">
                      {i + 1}
                    </span>
                    <span>
                      <span className="block font-semibold leading-tight">
                        {s.title}
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        {s.desc}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3">
              {badges.map((b) => (
                <div
                  key={b.label}
                  className="rounded-2xl border border-border bg-secondary/30 px-2 py-4"
                >
                  <span className="mx-auto flex size-9 items-center justify-center rounded-xl bg-primary/15">
                    <b.icon className="size-4 text-primary" />
                  </span>
                  <p className="mt-2 text-[11px] text-muted-foreground">{b.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}