import { motion } from 'framer-motion';
import { useContent } from '../context/ContentContext';

export default function Legacy() {
  const { content, t, language } = useContent();

  return (
    <section id="legacy" className="py-32 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6 transition-colors duration-300">
            {t(content.legacy.title)}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full" />
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-zinc-200 dark:bg-zinc-800 transition-colors duration-300" />

          <div className="space-y-24">
            {content.legacy.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`flex items-center justify-between w-full ${
                  index % 2 === 0 ? 'flex-row-reverse' : ''
                }`}
              >
                <div className="w-5/12" />
                
                <div className="z-20 flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-zinc-900 border-4 border-zinc-50 dark:border-zinc-950 shadow-[0_0_20px_rgba(79,70,229,0.15)] dark:shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-colors duration-300">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600" />
                </div>
                
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <div className="p-6 rounded-2xl bg-white/80 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 backdrop-blur-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors shadow-sm">
                    <span className="inline-block px-3 py-1 mb-4 text-sm font-semibold text-blue-400 bg-blue-400/10 rounded-full">
                      {item.year}
                    </span>
                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3 transition-colors duration-300">
                      {t(item.title)}
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed transition-colors duration-300">
                      {t(item.description)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
