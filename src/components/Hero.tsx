"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Clock, Languages } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const toggleLanguage = () => {
    const nextLocale = locale === "en" ? "es" : "en";
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <div className="relative overflow-hidden bg-[radial-gradient(ellipse_900px_500px_at_85%_-10%,rgba(6,214,75,0.16),transparent_60%),linear-gradient(180deg,#0b1740_0%,#14235c_100%)] px-6 pt-14 pb-22 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-[linear-gradient(90deg,transparent,#06d64b,transparent)] after:opacity-50">
      <motion.div
        className="relative mx-auto flex max-w-[760px] flex-col items-center text-center"
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
          className="mono order-1 mb-7 inline-flex items-center gap-2 rounded-full border border-green/40 px-3.5 py-1.5 text-[12px] tracking-[0.14em] text-green uppercase"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-green shadow-[0_0_0_3px_rgba(6,214,75,0.2)]" />
          {t("badge")}
        </motion.span>

        <motion.div
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
          }}
          className="order-2 flex flex-wrap justify-center gap-2.5 md:order-4 md:mt-9"
        >
          <motion.span
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              show: { opacity: 1, scale: 1 },
            }}
            className="flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-2.5 text-[13.5px] text-[#E4E9F5]"
          >
            <Clock className="h-3.5 w-3.5 flex-shrink-0 text-green" />
            {t("trustResponse")}
          </motion.span>

          <motion.span
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              show: { opacity: 1, scale: 1 },
            }}
            className="flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-2.5 text-[13.5px] text-[#E4E9F5]"
          >
            <ShieldCheck className="h-3.5 w-3.5 flex-shrink-0 text-green" />
            {t("trustNoFee")}
          </motion.span>

          <motion.button
            type="button"
            onClick={toggleLanguage}
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              show: { opacity: 1, scale: 1 },
            }}
            className="flex cursor-pointer items-center gap-2 rounded-full border border-green/40 bg-green/10 px-4 py-2.5 text-[13.5px] font-medium text-green transition-colors hover:bg-green/20"
          >
            <Languages className="h-3.5 w-3.5 flex-shrink-0 text-green" />
            {locale === "en" ? t("switchToSpanish") : t("switchToEnglish")}
          </motion.button>
        </motion.div>

        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 14 },
            show: { opacity: 1, y: 0 },
          }}
          className="order-3 mt-7 text-[clamp(32px,5.2vw,52px)] leading-[1.08] font-semibold text-[#FBF9F3] md:order-2 md:mt-0"
        >
          {t("headlinePlain")}
          <br />
          <em className="font-medium text-green italic">{t("headlineAccent")}</em>
        </motion.h1>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 14 },
            show: { opacity: 1, y: 0 },
          }}
          className="order-4 mx-auto mt-5 max-w-[520px] text-[17px] text-[#C9CFE0] md:order-3"
        >
          {t("subtext")}
        </motion.p>
      </motion.div>
    </div>
  );
}
