import { IntakeFormData, CASE_TYPES } from "@/lib/types";
import Field from "@/components/ui/Field";
import PillGroup from "@/components/ui/PillGroup";

interface StepCaseProps {
  data: IntakeFormData;
  update: (patch: Partial<IntakeFormData>) => void;
  attorneyInvalid: boolean;
}

export default function StepCase({ data, update, attorneyInvalid }: StepCaseProps) {
  return (
    <div>
      <div className="mb-7">
        <span className="mono mb-2 block text-[11.5px] tracking-[0.1em] text-green-deep uppercase">
          Step 1 of 5
        </span>
        <h2 className="text-[25px] font-semibold">About your case</h2>
        <p className="mt-2 max-w-[46ch] text-[14.5px] text-charcoal-soft">
          A quick overview so we route your case to the right team.
        </p>
      </div>

      <Field label="Case type" required>
        <select
          value={data.caseType}
          onChange={(e) => update({ caseType: e.target.value })}
        >
          {CASE_TYPES.map((type) => (
            <option key={type} value={type}>
              {type === "Rideshare Accident" ? "Rideshare / Uber / Lyft Accident" : type}
            </option>
          ))}
        </select>
      </Field>

      <Field
        label="Do you currently have an attorney?"
        required
        invalid={attorneyInvalid}
        error="Please select an option."
      >
        <PillGroup
          name="attorney"
          value={data.hasAttorney}
          onChange={(v) => update({ hasAttorney: v as IntakeFormData["hasAttorney"] })}
          options={[
            { value: "No", label: "No" },
            { value: "Yes", label: "Yes" },
          ]}
        />
      </Field>

      <Field label="Occupation" optional>
        <input
          type="text"
          placeholder="e.g. Construction"
          value={data.occupation}
          onChange={(e) => update({ occupation: e.target.value })}
        />
      </Field>
    </div>
  );
}
