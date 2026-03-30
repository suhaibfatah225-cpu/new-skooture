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
    <section id="faq" className="py-24 bg-zinc-50 dark:bg-zinc-950 relative border-t border-zinc-200 dark:border-zinc-900 transition-colors duration-300">
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
            className="w-24 h-1 bg-blue-600 mx-auto rounded-full relative"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-600 rounded-full ring-4 ring-zinc-50 dark:ring-zinc-950" />
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
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen 
                    ? 'border-blue-500/50 dark:border-blue-500/30 shadow-lg shadow-blue-500/10' 
                    : 'border-zinc-200 dark:border-white/5 hover:border-blue-500/30 shadow-card dark:shadow-card-dark'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className={`w-full flex items-center justify-between p-6 text-left transition-colors duration-300 ${
                    isOpen 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200'
                  }`}
                >
                  <span className="font-semibold pr-8">
                    {index + 1}. {t(item.question)}
                  </span>
                  <span className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-300 ${
                    isOpen 
                      ? 'bg-white/20 text-white' 
                      : 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400'
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
                      <div className="p-6 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-t border-blue-100 dark:border-blue-900/30 whitespace-pre-line leading-relaxed">
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
