import { Plus, Trash2 } from 'lucide-react';
import SectionWrapper from '../layout/SectionWrapper';
import TranslatableInput from '../shared/TranslatableInput';
import IconPicker from '../shared/IconPicker';
import type { AdminSectionProps } from '../../../types';

export default function FeaturesSection({ localContent, updateNestedContent }: AdminSectionProps) {
  return (
    <SectionWrapper key="features" title="AI Core Features" description="Highlight the advanced capabilities of your platform.">
      {localContent.aiCore.features.map((feature: any, index: number) => (
        <div key={index} className="relative p-6 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-3xl space-y-4 shadow-sm group">
          <button 
            onClick={() => {
              const newFeatures = [...localContent.aiCore.features];
              newFeatures.splice(index, 1);
              updateNestedContent(['aiCore', 'features'], newFeatures);
            }}
            className="absolute -top-2 -right-2 p-1.5 rounded-full bg-red-500 text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Trash2 size={14} />
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <IconPicker 
              label="Feature Icon"
              value={feature.icon}
              onChange={(name) => {
                const newFeatures = [...localContent.aiCore.features];
                newFeatures[index].icon = name;
                updateNestedContent(['aiCore', 'features'], newFeatures);
              }}
            />
            <div className="space-y-4">
              <TranslatableInput 
                label="Feature Title"
                enValue={feature.title.en}
                arValue={feature.title.ar}
                onEnChange={(val) => {
                  const newFeatures = [...localContent.aiCore.features];
                  newFeatures[index].title.en = val;
                  updateNestedContent(['aiCore', 'features'], newFeatures);
                }}
                onArChange={(val) => {
                  const newFeatures = [...localContent.aiCore.features];
                  newFeatures[index].title.ar = val;
                  updateNestedContent(['aiCore', 'features'], newFeatures);
                }}
              />
            </div>
          </div>
          <TranslatableInput 
            label="Feature Description"
            multiline
            enValue={feature.description.en}
            arValue={feature.description.ar}
            onEnChange={(val) => {
              const newFeatures = [...localContent.aiCore.features];
              newFeatures[index].description.en = val;
              updateNestedContent(['aiCore', 'features'], newFeatures);
            }}
            onArChange={(val) => {
              const newFeatures = [...localContent.aiCore.features];
              newFeatures[index].description.ar = val;
              updateNestedContent(['aiCore', 'features'], newFeatures);
            }}
          />
        </div>
      ))}
      <button 
         onClick={() => {
          const newItem = {
            title: { en: "", ar: "" },
            description: { en: "", ar: "" },
            icon: "Zap"
          };
          updateNestedContent(['aiCore', 'features'], [...localContent.aiCore.features, newItem]);
        }}
        className="w-full py-4 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl text-zinc-400 hover:text-blue-500 hover:border-blue-500 transition-all flex items-center justify-center gap-2 font-bold bg-white dark:bg-zinc-900/20"
      >
        <Plus size={20} /> Add New Feature
      </button>
    </SectionWrapper>
  );
}
