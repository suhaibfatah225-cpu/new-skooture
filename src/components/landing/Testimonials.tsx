import { motion } from 'framer-motion';
import { useContent } from '../../context/ContentContext';
import { Quote } from 'lucide-react';

export default function Testimonials() {
  const { content, t } = useContent();
  const testimonials = content.testimonials?.items || [];

  return (
    <section className="py-32 bg-zinc-50 dark:bg-zinc-950 relative border-t border-zinc-200 dark:border-zinc-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6 transition-colors duration-300"
          >
            {t(content.testimonials?.title || { en: 'Testimonials', ar: 'آراء العملاء' })}
          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="relative p-8 rounded-3xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl dark:shadow-none transition-all duration-300 flex flex-col justify-between"
            >
              <Quote className="absolute top-6 right-6 rtl:left-6 rtl:right-auto w-10 h-10 text-blue-500/10 dark:text-blue-500/20" />
              
              <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed mb-8 relative z-10 italic">
                "{t(item.quote)}"
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                  {t(item.author).charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 dark:text-white transition-colors duration-300">
                    {t(item.author)}
                  </h4>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 transition-colors duration-300">
                    {t(item.role)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
