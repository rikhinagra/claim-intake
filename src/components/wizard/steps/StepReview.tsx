"use client";

import { useTranslations } from "next-intl";
import { IntakeFormData } from "@/lib/types";

interface StepReviewProps {
  data: IntakeFormData;
  consentInvalid: boolean;
  onConsentChange: (checked: boolean) => void;
}

function ReviewValue({ value }: { value: string }) {
  const t = useTranslations("common");
  return value ? (
    <span className="font-medium text-charcoal">{value}</span>
  ) : (
    <span className="font-normal text-[#9AA3B8] italic">{t("notProvided")}</span>
  );
}

function ReviewItem({
  label,
  value,
  style,
}: {
  label: string;
  value: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className="text-[13.5px]" style={style}>
      <span className="block text-[11.5px] text-charcoal-soft">{label}</span>
      <ReviewValue value={value} />
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="mono mb-2.5 text-[11px] tracking-[0.1em] text-green-deep uppercase">
      {children}
    </h4>
  );
}

const CASE_TYPE_KEYS: Record<string, string> = {
  "Automobile Accident": "caseTypeAutomobile",
  "Slip & Fall": "caseTypeSlipFall",
  "Dog Bite": "caseTypeDogBite",
  "Wrongful Death": "caseTypeWrongfulDeath",
};

export default function StepReview({ data, consentInvalid, onConsentChange }: StepReviewProps) {
  const t = useTranslations("stepReview");
  const tRail = useTranslations("rail");
  const tCommon = useTranslations("common");
  const tCase = useTranslations("stepCase");
  const tAccident = useTranslations("stepAccident");
  const tContact = useTranslations("stepContact");

  const translateYesNo = (value: string) => {
    if (value === "Yes") return tCommon("yes");
    if (value === "No") return tCommon("no");
    return value;
  };

  const translateBestTime = (value: string) => {
    switch (value) {
      case "ASAP":
        return tAccident("bestTimeAsap");
      case "Morning":
        return tAccident("bestTimeMorning");
      case "Afternoon":
        return tAccident("bestTimeAfternoon");
      case "Evening":
        return tAccident("bestTimeEvening");
      default:
        return value;
    }
  };

  const translatePolice = (value: string) => {
    if (value === "Yes") return tAccident("policeYes");
    if (value === "No") return tAccident("policeNo");
    if (value === "Not sure") return tAccident("policeNotSure");
    return value;
  };

  const translatePreferredLanguage = (value: string) => {
    if (value === "English") return tContact("languageEnglish");
    if (value === "Spanish") return tContact("languageSpanish");
    if (value === "Other") return tContact("languageOther");
    return value;
  };

  const fullName = `${data.firstName} ${data.lastName}`.trim();
  const cityStateZip = [data.city, data.state, data.zip].filter(Boolean).join(", ");

  return (
    <div>
      <div className="mb-7">
        <span className="mono mb-2 block text-[11.5px] tracking-[0.1em] text-green-deep uppercase">
          {tRail("stepWord")} 5 {tRail("ofWord")} 5
        </span>
        <h2 className="text-[25px] font-semibold">{t("title")}</h2>
        <p className="mt-2 max-w-[46ch] text-[14.5px] text-charcoal-soft">{t("subtitle")}</p>
      </div>

      <div className="overflow-hidden rounded-[10px] border border-line">
        <div className="border-b border-line-soft px-5 py-[18px]">
          <SectionHeading>{t("sectionYourCase")}</SectionHeading>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 max-md:grid-cols-1">
            <ReviewItem
              label={t("fieldCaseType")}
              value={
                data.caseType in CASE_TYPE_KEYS
                  ? tCase(CASE_TYPE_KEYS[data.caseType])
                  : data.caseType
              }
            />
            <ReviewItem
              label={t("fieldRepresentedByAttorney")}
              value={translateYesNo(data.hasAttorney)}
            />
            <ReviewItem label={t("fieldOccupation")} value={data.occupation} />
          </div>
        </div>

        <div className="border-b border-line-soft px-5 py-[18px]">
          <SectionHeading>{t("sectionContact")}</SectionHeading>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 max-md:grid-cols-1">
            <ReviewItem label={t("fieldName")} value={fullName} />
            <ReviewItem label={t("fieldPhone")} value={data.phone} />
            <ReviewItem label={t("fieldAltPhone")} value={data.altPhone} />
            <ReviewItem label={t("fieldEmail")} value={data.email} />
            <ReviewItem
              label={t("fieldPreferredLanguage")}
              value={translatePreferredLanguage(data.language)}
            />
            <ReviewItem label={t("fieldAddress")} value={data.address} />
            <ReviewItem label={t("fieldCityStateZip")} value={cityStateZip} />
          </div>
        </div>

        <div className="border-b border-line-soft px-5 py-[18px]">
          <SectionHeading>{t("sectionWhatHappened")}</SectionHeading>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 max-md:grid-cols-1">
            <ReviewItem label={t("fieldDate")} value={data.accDate} />
            <ReviewItem label={t("fieldTime")} value={data.accTime} />
            <ReviewItem
              label={t("fieldBestTimeToCall")}
              value={translateBestTime(data.bestTime)}
            />
            <ReviewItem
              label={t("fieldPoliceResponded")}
              value={translatePolice(data.policeArrived)}
            />
          </div>
          <div className="mt-2.5">
            <ReviewItem label={t("fieldDescription")} value={data.description} />
          </div>
        </div>

        <div className="px-5 py-[18px]">
          <SectionHeading>{t("sectionInjuries")}</SectionHeading>
          {data.injuries.length === 0 ? (
            <span className="font-normal text-[#9AA3B8] italic">{t("noInjuries")}</span>
          ) : (
            data.injuries.map((inj, i) => (
              <div
                key={inj.id}
                className="text-[13.5px]"
                style={{ marginBottom: i < data.injuries.length - 1 ? 12 : 0 }}
              >
                <span className="block text-[11.5px] text-charcoal-soft">
                  {inj.name || `${t("personFallback")} ${i + 1}`}
                  {inj.relationship ? ` (${inj.relationship})` : ""}
                </span>
                <ReviewValue value={inj.description} />
                <span className="mt-0.5 block text-[12px] text-charcoal-soft">
                  {t("seenADoctor")}:{" "}
                  {inj.seenDoctor ? translateYesNo(inj.seenDoctor) : tCommon("notProvided")} ·{" "}
                  {t("willingToGo")}:{" "}
                  {inj.willingToSee ? translateYesNo(inj.willingToSee) : tCommon("notProvided")}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="mt-[22px] flex items-start gap-[11px] rounded-[10px] bg-paper-2 p-4">
        <input
          type="checkbox"
          checked={data.consent}
          onChange={(e) => onConsentChange(e.target.checked)}
          className="mt-0.5 h-4 w-4 flex-shrink-0 accent-blue"
        />
        <p className="m-0 text-[12.5px] text-charcoal-soft">{t("consentText")}</p>
      </div>
      {consentInvalid && (
        <span className="mt-2 block text-[12px] text-clay">{t("consentError")}</span>
      )}
    </div>
  );
}
