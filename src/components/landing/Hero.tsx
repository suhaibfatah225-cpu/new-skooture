import { motion } from 'framer-motion';
import { useContent } from '../../context/ContentContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  const { content, t, language } = useContent();

  return (
    <div id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white dark:bg-[#020617] pt-32 pb-24 transition-colors duration-500">
      {/* Aurora Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-600/20 dark:bg-blue-500/10 rounded-full blur-[120px] animate-blob" />
        <div className="absolute top-[10%] -right-[10%] w-[40%] h-[40%] bg-purple-600/20 dark:bg-purple-500/10 rounded-full blur-[120px] animate-blob animation-delay-2000" />
        <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[50%] bg-indigo-600/20 dark:bg-indigo-500/10 rounded-full blur-[120px] animate-blob animation-delay-4000" />
      </div>

      {/* Background Video with refined mask */}
      {content.hero?.videoUrl && (
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-20 dark:opacity-30"
            src={content.hero.videoUrl}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white dark:from-[#020617] dark:via-transparent dark:to-[#020617]" />
        </div>
      )}
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%23474747' stroke-width='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2v-4h4v-2h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2v-4h4v-2H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} 
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-10 shadow-xl shadow-blue-500/5 animate-float"
          >
            <Sparkles size={14} className="animate-pulse" />
            {t(content.hero.topBadge)}
          </motion.div>

          {/* Heading */}
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight text-zinc-900 dark:text-white max-w-5xl mx-auto leading-[1.1] mb-8">
            <span className="block">{t(content.hero.headline).includes('—') ? t(content.hero.headline).split('—')[0] : t(content.hero.headline)}</span>
            {t(content.hero.headline).includes('—') && (
              <span className="text-gradient block mt-2">
                {t(content.hero.headline).split('—')[1]}
              </span>
            )}
          </h1>
          
          {/* Subheading */}
          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-12 font-medium">
            {t(content.hero.subheadline)}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full max-w-2xl mx-auto">
            <motion.button
              whileHover={{ scale: 1.02, translateY: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-blue-600 text-white font-bold text-lg shadow-2xl shadow-blue-600/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-4 group text-left"
            >
              <div className="flex leading-tight">
                {language === 'en' ? (
                  <><span>Book a</span><span>Demo</span></>
                ) : (
                  <><span>احجز عرضاً</span><span>تجريبياً</span></>
                )}
              </div>
              <ArrowRight className={`transition-transform group-hover:translate-x-1 ${language === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02, translateY: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-10 py-5 rounded-2xl glass dark:bg-white/5 border-white/20 text-zinc-900 dark:text-white font-bold text-lg hover:bg-white/90 dark:hover:bg-white/10 transition-all flex items-center justify-center text-left"
            >
              <div className="flex leading-tight">
                {language === 'en' ? (
                  <><span>Explore</span><span>Platform</span></>
                ) : (
                  <><span>استكشف</span><span>المنصة</span></>
                )}
              </div>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Decorative Blur Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-[#020617] to-transparent pointer-events-none" />
    </div>
  );
}
