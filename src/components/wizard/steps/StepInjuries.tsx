"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus, X } from "lucide-react";
import { InjuryEntry, IntakeFormData } from "@/lib/types";
import Field from "@/components/ui/Field";
import PillGroup from "@/components/ui/PillGroup";

interface StepInjuriesProps {
  data: IntakeFormData;
  update: (patch: Partial<IntakeFormData>) => void;
  invalid: Set<number>;
}

export default function StepInjuries({ data, update, invalid }: StepInjuriesProps) {
  const injuries = data.injuries;

  const updateInjury = (id: number, patch: Partial<InjuryEntry>) => {
    update({
      injuries: injuries.map((inj) => (inj.id === id ? { ...inj, ...patch } : inj)),
    });
  };

  const removeInjury = (id: number) => {
    update({ injuries: injuries.filter((inj) => inj.id !== id) });
  };

  const addInjury = () => {
    const nextId = (injuries[injuries.length - 1]?.id ?? 0) + 1;
    update({
      injuries: [
        ...injuries,
        {
          id: nextId,
          name: "",
          relationship: "",
          description: "",
          seenDoctor: "No",
          willingToSee: "Yes",
        },
      ],
    });
  };

  return (
    <div>
      <div className="mb-7">
        <span className="mono mb-2 block text-[11.5px] tracking-[0.1em] text-green-deep uppercase">
          Step 4 of 5
        </span>
        <h2 className="text-[25px] font-semibold">Injuries</h2>
        <p className="mt-2 max-w-[46ch] text-[14.5px] text-charcoal-soft">
          Add yourself and anyone else in the vehicle who was injured.
        </p>
      </div>

      <AnimatePresence initial={false}>
        {injuries.map((inj, idx) => {
          const isInvalid = invalid.has(inj.id);
          return (
          <motion.div
            key={inj.id}
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className={`mb-[18px] overflow-hidden rounded-[10px] border-[1.5px] border-l-[3px] bg-[#fcfdff] px-5 pt-5 pb-1.5 ${
              isInvalid ? "border-clay border-l-clay bg-red-50" : "border-line border-l-green"
            }`}
          >
            <div className="mb-3.5 flex items-center justify-between">
              <h3 className="mono text-[12.5px] font-semibold tracking-[0.08em] text-charcoal-soft uppercase">
                Injured Person {idx + 1}
              </h3>
              {idx > 0 && (
                <button
                  type="button"
                  onClick={() => removeInjury(inj.id)}
                  className="flex items-center gap-1 rounded px-1.5 py-1 text-[12px] font-medium text-clay"
                >
                  <X className="h-3 w-3" /> Remove
                </button>
              )}
            </div>

            {isInvalid && (
              <p className="-mt-1.5 mb-3.5 text-[12.5px] text-clay">
                Enter at least a name or a description for this person.
              </p>
            )}

            <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
              <Field label="Full name">
                <input
                  type="text"
                  placeholder={idx === 0 ? "e.g. yourself" : "e.g. passenger name"}
                  value={inj.name}
                  onChange={(e) => updateInjury(inj.id, { name: e.target.value })}
                />
              </Field>
              <Field label="Relationship to you">
                <input
                  type="text"
                  placeholder={idx === 0 ? "Self" : "e.g. Cousin"}
                  value={inj.relationship}
                  onChange={(e) => updateInjury(inj.id, { relationship: e.target.value })}
                />
              </Field>
            </div>

            <Field label="Description of injury">
              <input
                type="text"
                placeholder="e.g. Right foot pain"
                value={inj.description}
                onChange={(e) => updateInjury(inj.id, { description: e.target.value })}
              />
            </Field>

            <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
              <Field label="Has seen a doctor?">
                <PillGroup
                  name={`seen-${inj.id}`}
                  value={inj.seenDoctor}
                  onChange={(v) => updateInjury(inj.id, { seenDoctor: v as InjuryEntry["seenDoctor"] })}
                  options={[
                    { value: "Yes", label: "Yes" },
                    { value: "No", label: "Not yet" },
                  ]}
                />
              </Field>
              <Field label="Willing to see a doctor?">
                <PillGroup
                  name={`willing-${inj.id}`}
                  value={inj.willingToSee}
                  onChange={(v) => updateInjury(inj.id, { willingToSee: v as InjuryEntry["willingToSee"] })}
                  options={[
                    { value: "Yes", label: "Yes" },
                    { value: "No", label: "No" },
                  ]}
                />
              </Field>
            </div>
          </motion.div>
          );
        })}
      </AnimatePresence>

      <button
        type="button"
        onClick={addInjury}
        className="flex w-full items-center justify-center gap-2 rounded-[9px] border-[1.5px] border-dashed border-line py-3 text-[13.5px] font-semibold text-ink transition-all hover:border-green hover:bg-green-light hover:text-green-deep"
      >
        <Plus className="h-4 w-4" /> Add another injured person
      </button>
    </div>
  );
}
