import { Plus, Trash2 } from 'lucide-react';
import SectionWrapper from '../layout/SectionWrapper';
import TranslatableInput from '../shared/TranslatableInput';
import IconPicker from '../shared/IconPicker';
import type { AdminSectionProps } from '../../../types';

export default function TractionSection({ localContent, updateNestedContent }: AdminSectionProps) {
  return (
    <SectionWrapper key="traction" title="Impact Numbers" description="Highlight your key achievements and scale. Add as many stats as you need.">
      <div className="space-y-6">
        {localContent.traction.map((stat: any, index: number) => (
          <div key={index} className="relative group p-6 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-3xl space-y-4 shadow-sm">
            <button 
              onClick={() => {
                const newTraction = [...localContent.traction];
                newTraction.splice(index, 1);
                updateNestedContent(['traction'], newTraction);
              }}
              className="absolute -top-2 -right-2 p-1.5 rounded-full bg-red-500 text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 size={14} />
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <IconPicker 
                label="Section Icon"
                value={stat.icon}
                onChange={(name) => {
                  const newTraction = [...localContent.traction];
                  newTraction[index].icon = name;
                  updateNestedContent(['traction'], newTraction);
                }}
              />
              <div className="space-y-4">
                <div className="space-y-1.5 px-1">
                  <label className="text-[10px] uppercase tracking-wider font-bold text-zinc-400">Numerical Value</label>
                  <input 
                    type="number" 
                    value={stat.value}
                    onChange={(e) => {
                      const newTraction = [...localContent.traction];
                      newTraction[index].value = parseInt(e.target.value);
                      updateNestedContent(['traction'], newTraction);
                    }}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-blue-600 font-bold"
                  />
                </div>
                <TranslatableInput 
                  label="Stat Label"
                  enValue={stat.label.en}
                  arValue={stat.label.ar}
                  onEnChange={(val) => {
                    const newTraction = [...localContent.traction];
                    newTraction[index].label.en = val;
                    updateNestedContent(['traction'], newTraction);
                  }}
                  onArChange={(val) => {
                    const newTraction = [...localContent.traction];
                    newTraction[index].label.ar = val;
                    updateNestedContent(['traction'], newTraction);
                  }}
                />
              </div>
            </div>
          </div>
        ))}
        
        <button 
          onClick={() => {
            const newItem = {
              value: 0,
              label: { en: "New Stat", ar: "إحصائية جديدة" },
              icon: "Activity"
            };
            updateNestedContent(['traction'], [...localContent.traction, newItem]);
          }}
          className="w-full py-4 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl text-zinc-400 hover:text-blue-500 hover:border-blue-500 transition-all flex items-center justify-center gap-2 font-bold bg-white dark:bg-zinc-900/20"
        >
          <Plus size={20} /> Add Another Impact Stat
        </button>
      </div>
    </SectionWrapper>
  );
}
