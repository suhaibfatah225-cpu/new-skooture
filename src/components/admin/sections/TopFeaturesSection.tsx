import { Plus, Trash2 } from 'lucide-react';
import SectionWrapper from '../layout/SectionWrapper';
import TranslatableInput from '../shared/TranslatableInput';
import type { AdminSectionProps } from '../../../types';

export default function TopFeaturesSection({ localContent, updateNestedContent }: AdminSectionProps) {
  return (
    <SectionWrapper key="topFeatures" title="Top Features List" description="Manage the grid of top features displayed on the site.">
       <div className="space-y-4 mb-8 p-6 bg-blue-500/5 border border-blue-500/10 rounded-3xl">
          <TranslatableInput 
              label="Section Title"
              enValue={localContent.topFeatures.title.en}
              arValue={localContent.topFeatures.title.ar}
              onEnChange={(val) => updateNestedContent(['topFeatures', 'title', 'en'], val)}
              onArChange={(val) => updateNestedContent(['topFeatures', 'title', 'ar'], val)}
          />
       </div>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {localContent.topFeatures.items.map((item: any, index: number) => (
              <div key={index} className="flex items-center gap-3 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-3 rounded-2xl group shadow-sm transition-all hover:border-blue-500/30">
                  <div className="flex-1 grid grid-cols-1 gap-2">
                      <input 
                          type="text"
                          value={item.en}
                          onChange={(e) => {
                              const newItems = [...localContent.topFeatures.items];
                              newItems[index].en = e.target.value;
                              updateNestedContent(['topFeatures', 'items'], newItems);
                          }}
                          className="w-full text-sm bg-transparent border-none focus:ring-0 px-1 font-medium dark:text-white"
                          placeholder="English Label"
                      />
                      <input 
                          type="text"
                          value={item.ar}
                          onChange={(e) => {
                              const newItems = [...localContent.topFeatures.items];
                              newItems[index].ar = e.target.value;
                              updateNestedContent(['topFeatures', 'items'], newItems);
                          }}
                          className="w-full text-sm bg-transparent border-none focus:ring-0 px-1 text-right font-arabic dark:text-white"
                          placeholder="\u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0628\u0627\u0644\u0639\u0631\u0628\u064a\u0629"
                      />
                  </div>
                  <button 
                      onClick={() => {
                          const newItems = [...localContent.topFeatures.items];
                          newItems.splice(index, 1);
                          updateNestedContent(['topFeatures', 'items'], newItems);
                      }}
                      className="p-2 text-zinc-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  >
                      <Trash2 size={16} />
                  </button>
              </div>
          ))}
          <button 
              onClick={() => {
                  const newItems = [...localContent.topFeatures.items, { en: "New Feature", ar: "\u0645\u064a\u0632\u0629 \u062c\u062f\u064a\u062f\u0629" }];
                  updateNestedContent(['topFeatures', 'items'], newItems);
              }}
              className="flex items-center justify-center p-4 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl text-zinc-400 hover:text-blue-500 hover:border-blue-500 transition-all font-bold bg-white dark:bg-zinc-900/20"
          >
              <Plus size={20} />
          </button>
       </div>
    </SectionWrapper>
  );
}
