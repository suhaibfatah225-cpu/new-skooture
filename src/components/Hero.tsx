import { motion } from 'framer-motion';
import { useContent } from '../context/ContentContext';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const { content, t, language } = useContent();

  return (
    <div id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-zinc-50 dark:bg-zinc-950 pt-32 pb-24 transition-colors duration-300">
      {/* Background Video */}
      {content.hero?.videoUrl && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src={content.hero.videoUrl}
        />
      )}
      
      {/* Overlay for Video Contrast (Light/Dark) */}
      <div className="absolute inset-0 bg-white/80 dark:bg-zinc-950/70 transition-colors duration-300" />

      {/* Background Gradients (Keep them subtle over the video) */}
      <div className="absolute inset-0 w-full h-full opacity-50">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/30 rounded-full mix-blend-screen filter blur-[128px] animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600/30 rounded-full mix-blend-screen filter blur-[128px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-indigo-600/30 rounded-full mix-blend-screen filter blur-[128px] animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-300 text-sm font-medium mb-8 shadow-sm backdrop-blur-md transition-colors duration-300">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            {language === 'en' ? 'The Evolution of Smart Schools' : 'تطور المدارس الذكية'}
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-white max-w-5xl mx-auto leading-tight drop-shadow-lg transition-colors duration-300">
            {t(content.hero.headline)}
          </h1>
          
          <p className="mt-6 text-xl md:text-2xl text-zinc-700 dark:text-zinc-300 max-w-3xl mx-auto leading-relaxed drop-shadow-md transition-colors duration-300">
            {t(content.hero.subheadline)}
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 pb-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(79,70,229,0.6)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                {t(content.hero.buttons?.demo || { en: 'Book a Demo', ar: 'احجز عرضاً تجريبياً' })}
                <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${language === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
              </span>
              <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 font-bold text-zinc-900 dark:text-white bg-white/50 dark:bg-white/10 border border-zinc-300 dark:border-white/20 hover:bg-white/80 dark:hover:bg-white/20 backdrop-blur-md rounded-full overflow-hidden transition-all duration-300 shadow-sm"
            >
              <span className="relative z-10 flex items-center gap-2">
                {t(content.hero.buttons?.explore || { en: 'Explore Platform', ar: 'استكشف المنصة' })}
              </span>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDAsMCwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)] pointer-events-none transition-colors duration-300" />
    </div>
  );
}
