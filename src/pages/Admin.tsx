import { useState, useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import { Link } from 'react-router-dom';
import { ArrowLeft, Save, CheckCircle, Image, Video } from 'lucide-react';

export default function Admin() {
  const { content, setContent, language } = useContent();
  const [jsonContent, setJsonContent] = useState(JSON.stringify(content, null, 2));
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Quick edit states
  const [logoUrl, setLogoUrl] = useState(content.brand?.logoUrl || '');
  const [videoUrl, setVideoUrl] = useState(content.hero?.videoUrl || '');

  useEffect(() => {
    setJsonContent(JSON.stringify(content, null, 2));
    setLogoUrl(content.brand?.logoUrl || '');
    setVideoUrl(content.hero?.videoUrl || '');
  }, [content]);

  const handleSave = () => {
    try {
      const parsed = JSON.parse(jsonContent);
      
      // Merge quick edits
      if (!parsed.brand) parsed.brand = {};
      parsed.brand.logoUrl = logoUrl;
      
      if (!parsed.hero) parsed.hero = {};
      parsed.hero.videoUrl = videoUrl;

      setContent(parsed);
      setJsonContent(JSON.stringify(parsed, null, 2));
      setError(null);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (e) {
      setError('Invalid JSON format. Please check your syntax.');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans p-8 transition-colors duration-300 pt-24">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-zinc-600 dark:text-zinc-400" />
            </Link>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
              {language === 'en' ? 'Content Management' : 'إدارة المحتوى'}
            </h1>
          </div>
          
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/20"
          >
            {isSaved ? <CheckCircle className="w-5 h-5" /> : <Save className="w-5 h-5" />}
            {language === 'en' ? (isSaved ? 'Saved!' : 'Save Changes') : (isSaved ? 'تم الحفظ!' : 'حفظ التغييرات')}
          </button>
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quick Edits */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Image className="w-5 h-5 text-blue-500" />
              {language === 'en' ? 'Brand Logo URL' : 'رابط شعار العلامة التجارية'}
            </h3>
            <input
              type="text"
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="https://..."
            />
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Video className="w-5 h-5 text-purple-500" />
              {language === 'en' ? 'Hero Video URL' : 'رابط فيديو البداية'}
            </h3>
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
              placeholder="https://..."
            />
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-xl transition-colors duration-300">
          <div className="p-4 bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <span className="text-zinc-600 dark:text-zinc-400 font-mono text-sm">content.json (Advanced Editor)</span>
            <span className="text-xs text-zinc-500">Edit stats, translations, and partner logos here.</span>
          </div>
          <textarea
            value={jsonContent}
            onChange={(e) => setJsonContent(e.target.value)}
            className="w-full h-[600px] bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-300 font-mono p-6 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none transition-colors duration-300"
            spellCheck="false"
          />
        </div>
      </div>
    </div>
  );
}
