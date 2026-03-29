import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContent } from '../context/ContentContext';
import { Plus, Minus } from 'lucide-react';

export default function FAQ() {
  const { content, t } = useContent();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faq = content.faq;
  if (!faq) return null;

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-white dark:bg-zinc-900 relative border-t border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4"
          >
            {t(faq.title)}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full max-w-md h-0.5 bg-teal-800 mx-auto relative"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-teal-600 rounded-full ring-4 ring-white dark:ring-zinc-900" />
          </motion.div>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faq.items.map((item: any, index: number) => {
            const isOpen = openIndex === index;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`border rounded-xl overflow-hidden transition-all duration-300 ${
                  isOpen 
                    ? 'border-teal-700 dark:border-teal-600 shadow-md' 
                    : 'border-zinc-200 dark:border-zinc-800 hover:border-teal-300 dark:hover:border-teal-800'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className={`w-full flex items-center justify-between p-5 text-left transition-colors duration-300 ${
                    isOpen 
                      ? 'bg-teal-700 dark:bg-teal-800 text-white' 
                      : 'bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200'
                  }`}
                >
                  <span className="font-semibold pr-8">
                    {index + 1}. {t(item.question)}
                  </span>
                  <span className={`shrink-0 flex items-center justify-center w-6 h-6 rounded-full transition-colors duration-300 ${
                    isOpen 
                      ? 'bg-transparent text-white' 
                      : 'bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400'
                  }`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="p-5 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-t border-teal-100 dark:border-teal-900/50 whitespace-pre-line">
                        {t(item.answer)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
