import { motion } from 'framer-motion';
import { useContent } from '../../context/ContentContext';

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
            {content.legacy.items.map((item: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`flex items-center justify-between w-full ${
                  index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <div className="w-5/12 hidden md:block" />
                
                <div className="z-20 flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-zinc-900 border-4 border-zinc-50 dark:border-zinc-950 shadow-[0_0_20px_rgba(79,70,229,0.15)] dark:shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-colors duration-300">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600" />
                </div>
                
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                  <div className={`p-6 md:p-8 rounded-[2rem] bg-white/80 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 backdrop-blur-xl hover:border-blue-500/30 transition-all duration-500 shadow-xl group ${
                    index % 2 === 0 ? 'text-right' : 'text-left'
                  }`}>
                    <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold uppercase tracking-widest text-blue-500 bg-blue-500/10 rounded-full border border-blue-500/20">
                      {item.year}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-zinc-900 dark:text-white mb-4 transition-colors duration-300">
                      {t(item.title)}
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed transition-colors duration-300">
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
