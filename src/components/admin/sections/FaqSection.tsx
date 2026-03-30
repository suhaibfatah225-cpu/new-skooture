import { Plus, Trash2 } from 'lucide-react';
import SectionWrapper from '../layout/SectionWrapper';
import TranslatableInput from '../shared/TranslatableInput';
import type { AdminSectionProps } from '../../../types';

export default function FaqSection({ localContent, updateNestedContent }: AdminSectionProps) {
  return (
    <SectionWrapper key="faq" title="FAQ" description="Manage common questions and answers.">
      {localContent.faq.items.map((item: any, index: number) => (
        <div key={index} className="relative p-6 border border-zinc-100 dark:border-zinc-800 rounded-2xl space-y-4">
          <button 
            onClick={() => {
              const newItems = [...localContent.faq.items];
              newItems.splice(index, 1);
              updateNestedContent(['faq', 'items'], newItems);
            }}
            className="absolute -top-2 -right-2 p-1.5 rounded-full bg-red-500 text-white shadow-lg"
          >
            <Trash2 size={14} />
          </button>
          <TranslatableInput 
            label="Question"
            enValue={item.question.en}
            arValue={item.question.ar}
            onEnChange={(val) => {
              const newItems = [...localContent.faq.items];
              newItems[index].question.en = val;
              updateNestedContent(['faq', 'items'], newItems);
            }}
            onArChange={(val) => {
              const newItems = [...localContent.faq.items];
              newItems[index].question.ar = val;
              updateNestedContent(['faq', 'items'], newItems);
            }}
          />
          <TranslatableInput 
            label="Answer"
            multiline
            enValue={item.answer.en}
            arValue={item.answer.ar}
            onEnChange={(val) => {
              const newItems = [...localContent.faq.items];
              newItems[index].answer.en = val;
              updateNestedContent(['faq', 'items'], newItems);
            }}
            onArChange={(val) => {
              const newItems = [...localContent.faq.items];
              newItems[index].answer.ar = val;
              updateNestedContent(['faq', 'items'], newItems);
            }}
          />
        </div>
      ))}
      <button 
         onClick={() => {
          const newItem = {
            question: { en: "", ar: "" },
            answer: { en: "", ar: "" }
          };
          updateNestedContent(['faq', 'items'], [...localContent.faq.items, newItem]);
        }}
        className="w-full py-4 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl text-zinc-400 hover:text-blue-500 hover:border-blue-500 transition-all flex items-center justify-center gap-2 font-bold"
      >
        <Plus size={20} /> Add FAQ Item
      </button>
    </SectionWrapper>
  );
}
