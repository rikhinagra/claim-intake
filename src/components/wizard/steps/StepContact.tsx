import { IntakeFormData } from "@/lib/types";
import Field from "@/components/ui/Field";

interface StepContactProps {
  data: IntakeFormData;
  update: (patch: Partial<IntakeFormData>) => void;
  invalidFields: Set<string>;
}

export default function StepContact({ data, update, invalidFields }: StepContactProps) {
  const has = (id: string) => invalidFields.has(id);

  return (
    <div>
      <div className="mb-7">
        <span className="mono mb-2 block text-[11.5px] tracking-[0.1em] text-green-deep uppercase">
          Step 2 of 5
        </span>
        <h2 className="text-[25px] font-semibold">Contact information</h2>
        <p className="mt-2 max-w-[46ch] text-[14.5px] text-charcoal-soft">
          So our intake team can reach you. We keep this confidential.
        </p>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-4 max-md:grid-cols-1">
        <Field
          label="First name"
          required
          invalid={has("firstName")}
          error="Enter a valid first name (letters only)."
        >
          <input
            type="text"
            value={data.firstName}
            onChange={(e) => update({ firstName: e.target.value })}
          />
        </Field>
        <Field
          label="Last name"
          required
          invalid={has("lastName")}
          error="Enter a valid last name (letters only)."
        >
          <input
            type="text"
            value={data.lastName}
            onChange={(e) => update({ lastName: e.target.value })}
          />
        </Field>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-4 max-md:grid-cols-1">
        <Field
          label="Phone"
          required
          invalid={has("phone")}
          error="Enter a valid phone number."
        >
          <input
            type="tel"
            placeholder="(555) 555-5555"
            value={data.phone}
            onChange={(e) => update({ phone: e.target.value })}
          />
        </Field>
        <Field
          label="Alternative phone"
          optional
          invalid={has("altPhone")}
          error="Enter a valid phone number."
        >
          <input
            type="tel"
            value={data.altPhone}
            onChange={(e) => update({ altPhone: e.target.value })}
          />
        </Field>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-4 max-md:grid-cols-1">
        <Field
          label="Email"
          optional
          invalid={has("email")}
          error="Enter a valid email address."
        >
          <input
            type="email"
            value={data.email}
            onChange={(e) => update({ email: e.target.value })}
          />
        </Field>
        <Field label="Preferred language" required>
          <select
            value={data.language}
            onChange={(e) => update({ language: e.target.value })}
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="Other">Other</option>
          </select>
        </Field>
      </div>

      <Field label="Street address" optional>
        <input
          type="text"
          placeholder="2936 Paradise Rd"
          value={data.address}
          onChange={(e) => update({ address: e.target.value })}
        />
      </Field>

      <div className="mb-4 grid grid-cols-2 gap-4 max-md:grid-cols-1">
        <Field label="City" required invalid={has("city")} error="Required.">
          <input
            type="text"
            value={data.city}
            onChange={(e) => update({ city: e.target.value })}
          />
        </Field>
        <Field
          label="State"
          required
          invalid={has("state")}
          error="Enter a 2-letter state code (e.g. CA)."
        >
          <input
            type="text"
            maxLength={2}
            placeholder="CA"
            value={data.state}
            onChange={(e) => update({ state: e.target.value })}
          />
        </Field>
      </div>

      <Field
        label="ZIP code"
        required
        invalid={has("zip")}
        error="Enter a valid 5-digit ZIP code."
      >
        <input
          type="text"
          inputMode="numeric"
          maxLength={5}
          style={{ maxWidth: 160 }}
          value={data.zip}
          onChange={(e) => update({ zip: e.target.value })}
        />
      </Field>
    </div>
  );
}
