import { Plus, Trash2 } from 'lucide-react';
import SectionWrapper from '../layout/SectionWrapper';
import TranslatableInput from '../shared/TranslatableInput';
import type { AdminSectionProps } from '../../../types';

export default function LegacySection({ localContent, updateNestedContent }: AdminSectionProps) {
  return (
    <SectionWrapper key="legacy" title="Timeline Events" description="Manage the history and legacy events.">
      {localContent.legacy.items.map((item: any, index: number) => (
        <div key={index} className="relative p-6 border border-zinc-100 dark:border-zinc-800 rounded-2xl space-y-4">
          <button 
            onClick={() => {
              const newItems = [...localContent.legacy.items];
              newItems.splice(index, 1);
              updateNestedContent(['legacy', 'items'], newItems);
            }}
            className="absolute -top-2 -right-2 p-1.5 rounded-full bg-red-500 text-white shadow-lg"
          >
            <Trash2 size={14} />
          </button>
          <div className="flex items-center gap-4">
            <div className="space-y-1 flex-1">
              <label className="text-[10px] uppercase font-bold text-zinc-400">Year</label>
              <input 
                type="text" 
                value={item.year}
                onChange={(e) => {
                  const newItems = [...localContent.legacy.items];
                  newItems[index].year = e.target.value;
                  updateNestedContent(['legacy', 'items'], newItems);
                }}
                className="w-full px-4 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800"
              />
            </div>
          </div>
          <TranslatableInput 
            label="Event Title"
            enValue={item.title.en}
            arValue={item.title.ar}
            onEnChange={(val) => {
              const newItems = [...localContent.legacy.items];
              newItems[index].title.en = val;
              updateNestedContent(['legacy', 'items'], newItems);
            }}
            onArChange={(val) => {
              const newItems = [...localContent.legacy.items];
              newItems[index].title.ar = val;
              updateNestedContent(['legacy', 'items'], newItems);
            }}
          />
          <TranslatableInput 
            label="Event Description"
            multiline
            enValue={item.description.en}
            arValue={item.description.ar}
            onEnChange={(val) => {
              const newItems = [...localContent.legacy.items];
              newItems[index].description.en = val;
              updateNestedContent(['legacy', 'items'], newItems);
            }}
            onArChange={(val) => {
              const newItems = [...localContent.legacy.items];
              newItems[index].description.ar = val;
              updateNestedContent(['legacy', 'items'], newItems);
            }}
          />
        </div>
      ))}
      <button 
        onClick={() => {
          const newItem = {
            year: "2024",
            title: { en: "", ar: "" },
            description: { en: "", ar: "" }
          };
          updateNestedContent(['legacy', 'items'], [...localContent.legacy.items, newItem]);
        }}
        className="w-full py-4 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl text-zinc-400 hover:text-blue-500 hover:border-blue-500 transition-all flex items-center justify-center gap-2 font-bold"
      >
        <Plus size={20} /> Add New Legacy Event
      </button>
    </SectionWrapper>
  );
}
