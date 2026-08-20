import { IntakeFormData } from "@/lib/types";

interface StepReviewProps {
  data: IntakeFormData;
  consentInvalid: boolean;
  onConsentChange: (checked: boolean) => void;
}

function ReviewValue({ value }: { value: string }) {
  return value ? (
    <span className="font-medium text-charcoal">{value}</span>
  ) : (
    <span className="font-normal text-[#9AA3B8] italic">Not provided</span>
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

export default function StepReview({ data, consentInvalid, onConsentChange }: StepReviewProps) {
  const fullName = `${data.firstName} ${data.lastName}`.trim();
  const cityStateZip = [data.city, data.state, data.zip].filter(Boolean).join(", ");

  return (
    <div>
      <div className="mb-7">
        <span className="mono mb-2 block text-[11.5px] tracking-[0.1em] text-green-deep uppercase">
          Step 5 of 5
        </span>
        <h2 className="text-[25px] font-semibold">Review your case</h2>
        <p className="mt-2 max-w-[46ch] text-[14.5px] text-charcoal-soft">
          Please confirm everything looks correct before submitting.
        </p>
      </div>

      <div className="overflow-hidden rounded-[10px] border border-line">
        <div className="border-b border-line-soft px-5 py-[18px]">
          <SectionHeading>Your Case</SectionHeading>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 max-md:grid-cols-1">
            <ReviewItem label="Case type" value={data.caseType} />
            <ReviewItem label="Represented by attorney" value={data.hasAttorney} />
            <ReviewItem label="Occupation" value={data.occupation} />
          </div>
        </div>

        <div className="border-b border-line-soft px-5 py-[18px]">
          <SectionHeading>Contact</SectionHeading>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 max-md:grid-cols-1">
            <ReviewItem label="Name" value={fullName} />
            <ReviewItem label="Phone" value={data.phone} />
            <ReviewItem label="Alternative phone" value={data.altPhone} />
            <ReviewItem label="Email" value={data.email} />
            <ReviewItem label="Preferred language" value={data.language} />
            <ReviewItem label="Address" value={data.address} />
            <ReviewItem label="City / State / ZIP" value={cityStateZip} />
          </div>
        </div>

        <div className="border-b border-line-soft px-5 py-[18px]">
          <SectionHeading>What Happened</SectionHeading>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 max-md:grid-cols-1">
            <ReviewItem label="Date" value={data.accDate} />
            <ReviewItem label="Time" value={data.accTime} />
            <ReviewItem label="Best time to call" value={data.bestTime} />
            <ReviewItem label="Police responded" value={data.policeArrived} />
          </div>
          <div className="mt-2.5">
            <ReviewItem label="Description" value={data.description} />
          </div>
        </div>

        <div className="px-5 py-[18px]">
          <SectionHeading>Injuries</SectionHeading>
          {data.injuries.length === 0 ? (
            <span className="font-normal text-[#9AA3B8] italic">No injuries added</span>
          ) : (
            data.injuries.map((inj, i) => (
              <div
                key={inj.id}
                className="text-[13.5px]"
                style={{ marginBottom: i < data.injuries.length - 1 ? 12 : 0 }}
              >
                <span className="block text-[11.5px] text-charcoal-soft">
                  {inj.name || `Person ${i + 1}`}
                  {inj.relationship ? ` (${inj.relationship})` : ""}
                </span>
                <ReviewValue value={inj.description} />
                <span className="mt-0.5 block text-[12px] text-charcoal-soft">
                  Seen a doctor: {inj.seenDoctor || "Not provided"} · Willing to go:{" "}
                  {inj.willingToSee || "Not provided"}
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
        <p className="m-0 text-[12.5px] text-charcoal-soft">
          By checking this box, I agree to be contacted by phone, text, or
          email regarding my potential case. Message and data rates may
          apply. This does not create an attorney-client relationship.
        </p>
      </div>
      {consentInvalid && (
        <span className="mt-2 block text-[12px] text-clay">
          Please confirm to continue.
        </span>
      )}
    </div>
  );
}
