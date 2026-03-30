import { motion } from 'framer-motion';
import { useContent } from '../../context/ContentContext';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  const { content, t, language } = useContent();
  const cta = content.cta;

  if (!cta) return null;

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
            {t(cta.title)}
          </h2>
          
          <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            {t(cta.subtitle)}
          </p>
          
          <div className="pt-4">
            <button className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-full font-bold text-lg hover:bg-zinc-50 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] hover:scale-105">
              {t(cta.button)}
              <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${language === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
