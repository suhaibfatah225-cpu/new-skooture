import { Plus, Trash2 } from 'lucide-react';
import SectionWrapper from '../layout/SectionWrapper';
import TranslatableInput from '../shared/TranslatableInput';
import type { AdminSectionProps } from '../../../types';

export default function TestimonialsSection({ localContent, updateNestedContent }: AdminSectionProps) {
  return (
    <SectionWrapper key="testimonials" title="User Testimonials" description="Manage quotes from your satisfied customers.">
      {localContent.testimonials.items.map((item: any, index: number) => (
        <div key={index} className="relative p-6 border border-zinc-100 dark:border-zinc-800 rounded-2xl space-y-4">
          <button 
            onClick={() => {
              const newItems = [...localContent.testimonials.items];
              newItems.splice(index, 1);
              updateNestedContent(['testimonials', 'items'], newItems);
            }}
            className="absolute -top-2 -right-2 p-1.5 rounded-full bg-red-500 text-white shadow-lg"
          >
            <Trash2 size={14} />
          </button>
          <TranslatableInput 
            label="Quote"
            multiline
            enValue={item.quote.en}
            arValue={item.quote.ar}
            onEnChange={(val) => {
              const newItems = [...localContent.testimonials.items];
              newItems[index].quote.en = val;
              updateNestedContent(['testimonials', 'items'], newItems);
            }}
            onArChange={(val) => {
              const newItems = [...localContent.testimonials.items];
              newItems[index].quote.ar = val;
              updateNestedContent(['testimonials', 'items'], newItems);
            }}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TranslatableInput 
              label="Author Name"
              enValue={item.author.en}
              arValue={item.author.ar}
              onEnChange={(val) => {
                const newItems = [...localContent.testimonials.items];
                newItems[index].author.en = val;
                updateNestedContent(['testimonials', 'items'], newItems);
              }}
              onArChange={(val) => {
                const newItems = [...localContent.testimonials.items];
                newItems[index].author.ar = val;
                updateNestedContent(['testimonials', 'items'], newItems);
              }}
            />
            <TranslatableInput 
              label="Role / Position"
              enValue={item.role.en}
              arValue={item.role.ar}
              onEnChange={(val) => {
                const newItems = [...localContent.testimonials.items];
                newItems[index].role.en = val;
                updateNestedContent(['testimonials', 'items'], newItems);
              }}
              onArChange={(val) => {
                const newItems = [...localContent.testimonials.items];
                newItems[index].role.ar = val;
                updateNestedContent(['testimonials', 'items'], newItems);
              }}
            />
          </div>
        </div>
      ))}
      <button 
         onClick={() => {
          const newItem = {
            quote: { en: "", ar: "" },
            author: { en: "", ar: "" },
            role: { en: "", ar: "" }
          };
          updateNestedContent(['testimonials', 'items'], [...localContent.testimonials.items, newItem]);
        }}
        className="w-full py-4 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl text-zinc-400 hover:text-blue-500 hover:border-blue-500 transition-all flex items-center justify-center gap-2 font-bold"
      >
        <Plus size={20} /> Add New Testimonial
      </button>
    </SectionWrapper>
  );
}
