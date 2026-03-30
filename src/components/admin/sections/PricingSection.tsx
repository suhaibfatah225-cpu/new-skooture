import { Plus, Trash2, X } from 'lucide-react';
import SectionWrapper from '../layout/SectionWrapper';
import TranslatableInput from '../shared/TranslatableInput';
import type { AdminSectionProps } from '../../../types';

export default function PricingSection({ localContent, updateNestedContent }: AdminSectionProps) {
  return (
    <SectionWrapper key="pricing" title="Pricing Plans" description="Manage your subscription models and prices.">
      {localContent.pricing.plans.map((plan: any, index: number) => (
        <div key={index} className="relative p-6 border border-zinc-100 dark:border-zinc-800 rounded-2xl space-y-6">
          <button 
            onClick={() => {
              const newPlans = [...localContent.pricing.plans];
              newPlans.splice(index, 1);
              updateNestedContent(['pricing', 'plans'], newPlans);
            }}
            className="absolute -top-2 -right-2 p-1.5 rounded-full bg-red-500 text-white shadow-lg"
          >
            <Trash2 size={14} />
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TranslatableInput 
              label="Plan Name"
              enValue={plan.name.en}
              arValue={plan.name.ar}
              onEnChange={(val) => {
                const newPlans = [...localContent.pricing.plans];
                newPlans[index].name.en = val;
                updateNestedContent(['pricing', 'plans'], newPlans);
              }}
              onArChange={(val) => {
                const newPlans = [...localContent.pricing.plans];
                newPlans[index].name.ar = val;
                updateNestedContent(['pricing', 'plans'], newPlans);
              }}
            />
            <TranslatableInput 
              label="Badge/Status"
              enValue={plan.badge.en}
              arValue={plan.badge.ar}
              onEnChange={(val) => {
                const newPlans = [...localContent.pricing.plans];
                newPlans[index].badge.en = val;
                updateNestedContent(['pricing', 'plans'], newPlans);
              }}
              onArChange={(val) => {
                const newPlans = [...localContent.pricing.plans];
                newPlans[index].badge.ar = val;
                updateNestedContent(['pricing', 'plans'], newPlans);
              }}
            />
          </div>

          <div className="space-y-4">
            <label className="text-sm font-bold text-zinc-400">Features List</label>
            <div className="space-y-2">
              {plan.features.map((f: any, fIndex: number) => (
                <div key={fIndex} className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-950 p-2 rounded-lg">
                  <input 
                    type="checkbox" 
                    checked={f.included}
                    onChange={(e) => {
                      const newPlans = [...localContent.pricing.plans];
                      newPlans[index].features[fIndex].included = e.target.checked;
                      updateNestedContent(['pricing', 'plans'], newPlans);
                    }}
                    className="w-4 h-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex-1 grid grid-cols-2 gap-2">
                    <input 
                      type="text"
                      value={f.name.en}
                      onChange={(e) => {
                        const newPlans = [...localContent.pricing.plans];
                        newPlans[index].features[fIndex].name.en = e.target.value;
                        updateNestedContent(['pricing', 'plans'], newPlans);
                      }}
                      className="w-full text-xs bg-transparent border-none focus:ring-0 px-0"
                      placeholder="EN Feature..."
                    />
                    <input 
                      type="text"
                      value={f.name.ar}
                      onChange={(e) => {
                        const newPlans = [...localContent.pricing.plans];
                        newPlans[index].features[fIndex].name.ar = e.target.value;
                        updateNestedContent(['pricing', 'plans'], newPlans);
                      }}
                      className="w-full text-xs bg-transparent border-none focus:ring-0 px-0 text-right font-arabic"
                      placeholder="\u0627\u0644\u0645\u064a\u0632\u0629..."
                    />
                  </div>
                  <button 
                    onClick={() => {
                      const newPlans = [...localContent.pricing.plans];
                      newPlans[index].features.splice(fIndex, 1);
                      updateNestedContent(['pricing', 'plans'], newPlans);
                    }}
                    className="p-1 text-zinc-400 hover:text-red-500 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
            <button 
              onClick={() => {
                const newPlans = [...localContent.pricing.plans];
                newPlans[index].features.push({
                  name: { en: "New Feature", ar: "\u0645\u064a\u0632\u0629 \u062c\u062f\u064a\u062f\u0629" },
                  included: true
                });
                updateNestedContent(['pricing', 'plans'], newPlans);
              }}
              className="text-xs font-bold text-blue-500 hover:text-blue-600 flex items-center gap-1"
            >
              <Plus size={14} /> Add Feature to Plan
            </button>
          </div>
        </div>
      ))}
    </SectionWrapper>
  );
}
