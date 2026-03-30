import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContent } from '../context/ContentContext';
import { CheckCircle2, XCircle } from 'lucide-react';

export default function Pricing() {
  const { content, t, language } = useContent();
  const [currentPage, setCurrentPage] = useState(0);
  
  const pricing = content.pricing;
  if (!pricing) return null;

  const isRTL = language === 'ar';
  const itemsPerPage = 3;
  const totalPages = Math.max(1, pricing.plans.length - itemsPerPage + 1);
  
  const visiblePlans = pricing.plans.slice(currentPage, currentPage + itemsPerPage);

  const ribbonClipPath = isRTL 
    ? 'polygon(0 0, calc(100% - 15px) 0, 100% 50%, calc(100% - 15px) 100%, 0 100%)'
    : 'polygon(15px 0, 100% 0, 100% 100%, 15px 100%, 0 50%)';
    
  const ribbonPositionClass = isRTL ? 'left-[-2px] pl-4 pr-6' : 'right-[-2px] pr-4 pl-6';

  return (
    <section id="pricing" className="py-24 bg-zinc-50 dark:bg-zinc-950 relative border-t border-zinc-200 dark:border-zinc-900 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4"
          >
            {t(pricing.title)}
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

        {/* Pricing Cards Grid */}
        <div className={`grid grid-cols-1 gap-8 max-w-6xl mx-auto items-stretch ${
          visiblePlans.length === 1 ? 'md:grid-cols-1 max-w-sm' : 
          visiblePlans.length === 2 ? 'md:grid-cols-2 max-w-4xl' : 
          'md:grid-cols-3'
        }`}>
          <AnimatePresence mode="popLayout">
            {visiblePlans.map((plan: any, index: number) => (
              <motion.div
                key={plan.name.en}
                layout
                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: -20 }}
                transition={{ duration: 0.3 }}
                className={`relative flex flex-col rounded-[2.5rem] overflow-hidden transition-all duration-300 ${
                  plan.highlighted 
                    ? 'bg-blue-600 text-white shadow-2xl shadow-blue-500/20 border-0' 
                    : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 shadow-card dark:shadow-card-dark hover:border-blue-500/30'
                }`}
              >
                {/* Ribbon Badge */}
                <div 
                  className={`absolute top-6 ${ribbonPositionClass} py-1.5 text-[10px] uppercase tracking-widest font-black shadow-md z-10 rounded-full ${
                    plan.highlighted ? 'bg-white text-blue-600' : 'bg-blue-600 text-white'
                  }`}
                >
                  {t(plan.badge)}
                </div>

                {/* Card Header */}
                <div className={`p-10 pb-4 ${isRTL ? 'pl-24' : 'pr-24'}`}>
                  <h3 className={`text-3xl font-black mb-4 tracking-tight ${plan.highlighted ? 'text-white' : 'text-zinc-900 dark:text-white'}`}>
                    {t(plan.name)}
                  </h3>
                  <div className="space-y-2 mb-6">
                    {plan.details.map((detail: any, i: number) => (
                      <p key={i} className={`text-sm font-medium ${plan.highlighted ? 'text-blue-50/80' : 'text-zinc-500 dark:text-zinc-400'}`}>
                        {t(detail)}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Features List */}
                <div className="flex-1 px-10 pb-10 overflow-hidden flex flex-col">
                  <div className={`flex-1 overflow-y-auto pricing-scrollbar max-h-[320px] space-y-4 ${isRTL ? 'pl-2' : 'pr-2'}`}>
                    {plan.features.map((feature: any, i: number) => (
                      <div key={i} className="flex items-start gap-4">
                        {feature.included ? (
                          <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${plan.highlighted ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`} />
                        ) : (
                          <XCircle className={`w-5 h-5 shrink-0 mt-0.5 ${plan.highlighted ? 'text-blue-300/40' : 'text-zinc-300 dark:text-zinc-700'}`} />
                        )}
                        <span className={`text-sm font-medium ${
                          feature.included 
                            ? (plan.highlighted ? 'text-white' : 'text-zinc-700 dark:text-zinc-300')
                            : (plan.highlighted ? 'text-blue-300/40 line-through' : 'text-zinc-300 dark:text-zinc-700 line-through')
                        }`}>
                          {t(feature.name)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button className={`mt-10 w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 shadow-xl ${
                    plan.highlighted
                      ? 'bg-white text-blue-600 hover:scale-[1.02] active:scale-[0.98]'
                      : 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white hover:scale-[1.02] active:scale-[0.98]'
                  }`}>
                    {t(pricing.button)}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination Dots */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-16">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`h-2.5 rounded-full transition-all duration-500 ${
                  currentPage === i
                    ? 'w-10 bg-blue-600'
                    : 'w-2.5 bg-zinc-200 dark:bg-zinc-800 hover:bg-blue-400 cursor-pointer'
                }`}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
