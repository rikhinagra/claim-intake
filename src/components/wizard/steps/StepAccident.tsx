import { IntakeFormData } from "@/lib/types";
import Field from "@/components/ui/Field";
import PillGroup from "@/components/ui/PillGroup";

interface StepAccidentProps {
  data: IntakeFormData;
  update: (patch: Partial<IntakeFormData>) => void;
  invalid: { accDate: boolean; bestTime: boolean; description: boolean };
}

function todayLocalISODate() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

export default function StepAccident({ data, update, invalid }: StepAccidentProps) {
  return (
    <div>
      <div className="mb-7">
        <span className="mono mb-2 block text-[11.5px] tracking-[0.1em] text-green-deep uppercase">
          Step 3 of 5
        </span>
        <h2 className="text-[25px] font-semibold">What happened</h2>
        <p className="mt-2 max-w-[46ch] text-[14.5px] text-charcoal-soft">
          Walk us through the accident in your own words. Details help us
          evaluate your case accurately.
        </p>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-4 max-md:grid-cols-1">
        <Field
          label="Date of accident"
          required
          invalid={invalid.accDate}
          error="Enter a valid date, not in the future."
        >
          <input
            type="date"
            max={todayLocalISODate()}
            value={data.accDate}
            onChange={(e) => update({ accDate: e.target.value })}
          />
        </Field>
        <Field label="Approximate time" optional>
          <input
            type="time"
            value={data.accTime}
            onChange={(e) => update({ accTime: e.target.value })}
          />
        </Field>
      </div>

      <Field
        label="Best time to reach you"
        required
        invalid={invalid.bestTime}
        error="Please select an option."
      >
        <PillGroup
          name="besttime"
          value={data.bestTime}
          onChange={(v) => update({ bestTime: v })}
          options={[
            { value: "ASAP", label: "ASAP" },
            { value: "Morning", label: "Morning" },
            { value: "Afternoon", label: "Afternoon" },
            { value: "Evening", label: "Evening" },
          ]}
        />
      </Field>

      <Field label="Did police respond to the scene?" optional>
        <PillGroup
          name="police"
          value={data.policeArrived}
          onChange={(v) => update({ policeArrived: v as IntakeFormData["policeArrived"] })}
          options={[
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
            { value: "Not sure", label: "Not sure" },
          ]}
        />
      </Field>

      <Field
        label="Describe what happened"
        required
        invalid={invalid.description}
        error="Please share at least a full sentence (10+ characters)."
      >
        <textarea
          placeholder="e.g. It was raining heavily and visibility was poor when..."
          value={data.description}
          onChange={(e) => update({ description: e.target.value })}
        />
      </Field>
    </div>
  );
}
