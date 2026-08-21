"use client";

import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="px-5 pt-4 pb-10 text-center text-[12px] text-charcoal-soft">
      {t("text")} &nbsp;•&nbsp;{" "}
      <span className="font-semibold text-green-deep">{t("spanishNote")}</span>
    </footer>
  );
}
