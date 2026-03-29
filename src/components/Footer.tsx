import { useContent } from '../context/ContentContext';

export default function Footer() {
  const { content, language } = useContent();

  return (
    <footer className="py-12 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center space-y-4">
        <div className="flex items-center gap-2">
          {content.brand?.logoUrl ? (
            <img src={content.brand.logoUrl} alt="Skooture.AI" className="h-8 object-contain opacity-75 grayscale hover:grayscale-0 transition-all duration-300" referrerPolicy="no-referrer" />
          ) : (
            <>
              <div className="w-6 h-6 rounded bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-400 transition-colors duration-300">
                Skooture.AI
              </span>
            </>
          )}
        </div>
        <p className="text-zinc-500 text-sm">
          &copy; {new Date().getFullYear()} Skooture.AI. {language === 'en' ? 'All rights reserved.' : 'جميع الحقوق محفوظة.'}
        </p>
      </div>
    </footer>
  );
}
