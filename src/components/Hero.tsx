"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Clock, Languages } from "lucide-react";

const trustItems = [
  { icon: ShieldCheck, label: "No Fee Unless You Win" },
  { icon: Clock, label: "Response Within 24 Hours" },
  { icon: Languages, label: "Se Habla Español" },
];

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-[radial-gradient(ellipse_900px_500px_at_85%_-10%,rgba(6,214,75,0.16),transparent_60%),linear-gradient(180deg,#0b1740_0%,#14235c_100%)] px-6 pt-14 pb-22 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-[linear-gradient(90deg,transparent,#06d64b,transparent)] after:opacity-50">
      <motion.div
        className="relative mx-auto max-w-[760px] text-center"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
        }}
      >
        <motion.span
          variants={{
            hidden: { opacity: 0, y: -8 },
            show: { opacity: 1, y: 0 },
          }}
          className="mono mb-7 inline-flex items-center gap-2 rounded-full border border-green/40 px-3.5 py-1.5 text-[12px] tracking-[0.14em] text-green uppercase"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-green shadow-[0_0_0_3px_rgba(6,214,75,0.2)]" />
          Free Confidential Case Review
        </motion.span>

        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 14 },
            show: { opacity: 1, y: 0 },
          }}
          className="text-[clamp(32px,5.2vw,52px)] leading-[1.08] font-semibold text-[#FBF9F3]"
        >
          Tell us what happened.
          <br />
          <em className="font-medium text-green italic">
            We&rsquo;ll take it from here.
          </em>
        </motion.h1>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 14 },
            show: { opacity: 1, y: 0 },
          }}
          className="mx-auto mt-5 max-w-[520px] text-[17px] text-[#C9CFE0]"
        >
          A few minutes of your time is all we need to start building your
          case. No cost, no obligation, and no pressure, just a clear next
          step.
        </motion.p>

        <motion.div
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
          }}
          className="mt-9 flex flex-wrap justify-center gap-2.5"
        >
          {trustItems.map(({ icon: Icon, label }) => (
            <motion.span
              key={label}
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                show: { opacity: 1, scale: 1 },
              }}
              className="flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-2.5 text-[13.5px] text-[#E4E9F5]"
            >
              <Icon className="h-3.5 w-3.5 flex-shrink-0 text-green" />
              {label}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
