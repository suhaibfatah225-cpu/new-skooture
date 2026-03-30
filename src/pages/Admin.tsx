import { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Type, 
  BarChart3, 
  History, 
  Zap, 
  Quote, 
  CreditCard, 
  HelpCircle, 
  Settings,
  Save,
  RotateCcw,
  CheckCircle,
  Plus,
  Trash2,
  ExternalLink,
  X,
  Target,
  Layout,
  MessageSquare,
  Globe,
  GraduationCap,
  Users,
  FileEdit,
  User,
  Mail,
  Moon,
  Languages
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import Sidebar from '../components/admin/Sidebar';
import SectionWrapper from '../components/admin/SectionWrapper';
import TranslatableInput from '../components/admin/TranslatableInput';
import MediaInput from '../components/admin/MediaInput';
import IconPicker from '../components/admin/IconPicker';

export default function Admin() {
  const { 
    content, 
    setContent, 
    resetToDefault, 
    language, 
    adminLanguage, 
    setAdminLanguage, 
    messages,
    addMessage // In case we want to test from admin
  } = useContent();
  const { adminTheme, setAdminTheme } = useTheme();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('hero');
  const [isSaved, setIsSaved] = useState(false);

  // Local state for temporary changes before saving
  const [localContent, setLocalContent] = useState(content);

  const handleSave = () => {
    setContent(localContent);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('skooture_admin_session');
    navigate('/login');
  };

  const sections = [
    { id: 'overview', label: adminLanguage === 'ar' ? 'نظرة عامة' : 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'general', label: 'General Settings', icon: Layout },
    { id: 'hero', label: 'Hero Section', icon: Type },
    { id: 'traction', label: 'Stats & Traction', icon: BarChart3 },
    { id: 'legacy', label: 'Our Legacy', icon: History },
    { id: 'features', label: 'AI Features', icon: Zap },
    { id: 'topFeatures', label: 'Top Features', icon: Target },
    { id: 'testimonials', label: 'Testimonials', icon: Quote },
    { id: 'pricing', label: 'Pricing Plans', icon: CreditCard },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
    { id: 'messages', label: 'User Messages', icon: MessageSquare, badge: messages.length },
    { id: 'settings', label: 'Portal Settings', icon: Settings },
  ];

  const updateNestedContent = (path: string[], value: any) => {
    setLocalContent(prev => {
      const newContent = { ...prev };
      let current: any = newContent;
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
      return newContent;
    });
  };

  const isRTL = adminLanguage === 'ar';

  return (
    <div 
      className={`min-h-screen bg-zinc-50 dark:bg-zinc-950 flex transition-colors duration-500 ${adminLanguage === 'ar' ? 'font-arabic flex-row' : 'flex-row'}`}
      dir={adminLanguage === 'ar' ? 'rtl' : 'ltr'}
    >
      <Sidebar 
        sections={sections} 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        onLogout={handleLogout}
      />

      <main className="flex-1 overflow-y-auto max-h-screen scroll-smooth bg-[#f8fafc] dark:bg-zinc-950">
        <div className="max-w-6xl mx-auto px-8 py-10 space-y-10">
          {/* Top Navbar */}
          <header className={`flex items-center justify-between sticky top-0 z-30 py-4 -mx-8 px-8 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border-b border-zinc-200/50 dark:border-white/5 transition-all shadow-sm`}>
            <div className="flex items-center gap-6">
              <div className="flex flex-col">
                <h1 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight flex items-center gap-3">
                  <span className="w-2 h-8 bg-blue-600 rounded-full" />
                  {adminLanguage === 'ar' ? 'نظام سكوتشر الذكي' : 'Skooture Hub'}
                </h1>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mt-1">
                  {sections.find(s => s.id === activeSection)?.label}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-1.5 bg-zinc-100/50 dark:bg-white/5 rounded-2xl border border-zinc-200/50 dark:border-white/5">
              <button
                onClick={() => { if(confirm('Reset all changes to default?')) resetToDefault(); }}
                className="p-2.5 text-zinc-500 hover:text-red-500 transition-all rounded-xl hover:bg-white dark:hover:bg-zinc-800 shadow-sm"
                title={adminLanguage === 'ar' ? 'إعادة ضبط الإعدادات' : 'Reset Everything'}
              >
                <RotateCcw size={18} />
              </button>
              
              <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-800 mx-1" />

              <button
                onClick={handleSave}
                className={`flex items-center gap-3 px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg scale-100 hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${
                  isSaved 
                    ? 'bg-green-600 text-white shadow-green-600/20' 
                    : 'bg-blue-600 text-white shadow-blue-600/30 hover:bg-blue-700'
                }`}
              >
                {isSaved ? <CheckCircle size={16} /> : <Save size={16} />}
                {isSaved ? (adminLanguage === 'ar' ? 'تم الحفظ' : 'Saved') : (adminLanguage === 'ar' ? 'تحديث الموقع' : 'Update Portal')}
              </button>

              <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-800 mx-1" />

              <div className="flex items-center gap-2">
                <a 
                  href="/" 
                  target="_blank"
                  className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-blue-600 shadow-sm border border-zinc-100 dark:border-white/5 transition-all"
                  title="View Site"
                >
                  <ExternalLink size={18} />
                </a>
                
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-lg">
                  AD
                </div>
              </div>
            </div>
          </header>

          <AnimatePresence mode="wait">
            {activeSection === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-10"
              >
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: isRTL ? 'إجمالي الطلاب' : 'Total Students', value: '126,102', icon: GraduationCap, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: isRTL ? 'إجمالي المعلمين' : 'Total Teachers', value: '23,096', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
                    { label: isRTL ? 'المدارس' : 'Schools', value: '30', icon: Layout, color: 'text-orange-600', bg: 'bg-orange-50' },
                    { label: isRTL ? 'المنشورات' : 'Articles', value: '5', icon: FileEdit, color: 'text-green-600', bg: 'bg-green-50' },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] shadow-sm border border-zinc-100 dark:border-white/5 relative overflow-hidden group hover:shadow-xl transition-all">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-4 rounded-2xl ${stat.bg} dark:bg-white/5 ${stat.color} transition-transform group-hover:scale-110`}>
                          <stat.icon size={24} />
                        </div>
                        <span className="text-[10px] font-black text-green-500 bg-green-50 px-2 py-1 rounded-full">+12%</span>
                      </div>
                      <h3 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight">{stat.value}</h3>
                      <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest mt-1.5">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Main Dashboard Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Recent Messages / Activity */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 shadow-sm border border-zinc-100 dark:border-white/5">
                      <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-black text-zinc-900 dark:text-white">{isRTL ? 'آخر الرسائل' : 'Recent Messages'}</h3>
                        <button onClick={() => setActiveSection('messages')} className="text-blue-600 font-bold text-xs uppercase tracking-widest hover:underline cursor-pointer">{isRTL ? 'عرض الكل' : 'View All'}</button>
                      </div>
                      
                      <div className="space-y-4">
                        {messages.slice(0, 4).map((msg, i) => (
                          <div key={i} className="flex items-center gap-5 p-4 rounded-2xl hover:bg-zinc-50 dark:hover:bg-white/5 transition-all border border-transparent hover:border-zinc-100 dark:hover:border-white/5 cursor-pointer group">
                            <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-black text-blue-600">
                              {msg.name.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-black text-zinc-900 dark:text-white truncate">{msg.name}</h4>
                              <p className="text-zinc-400 text-sm truncate">{msg.message}</p>
                            </div>
                            <span className="text-[10px] font-bold text-zinc-400 group-hover:text-blue-600 transition-colors">
                              {new Date(msg.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                        ))}
                        {messages.length === 0 && (
                          <div className="text-center py-10">
                            <MessageSquare className="mx-auto text-zinc-200 dark:text-zinc-800 mb-4" size={48} />
                            <p className="text-zinc-400 font-bold uppercase tracking-widest text-xs">No Recent Messages</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-6">
                    <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 shadow-sm border border-zinc-100 dark:border-white/5">
                      <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-8">{isRTL ? 'إجراءات سريعة' : 'Quick Actions'}</h3>
                      <div className="grid grid-cols-1 gap-3">
                        {[
                          { id: 'hero', label: isRTL ? 'تعديل الهيدر' : 'Edit Hero', icon: Type },
                          { id: 'pricing', label: isRTL ? 'تعديل الباقات' : 'Edit Plans', icon: CreditCard },
                          { id: 'settings', label: isRTL ? 'إعدادات المنصة' : 'Portal Config', icon: Settings },
                        ].map((action, i) => (
                          <button
                            key={i}
                            onClick={() => setActiveSection(action.id)}
                            className="w-full flex items-center gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 hover:bg-blue-600 hover:text-white transition-all font-black text-sm group cursor-pointer"
                          >
                            <action.icon size={20} className="group-hover:scale-110 transition-transform" />
                            {action.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="bg-blue-600 rounded-[2.5rem] p-8 shadow-xl shadow-blue-600/20 text-white relative overflow-hidden group">
                      <Zap className="absolute -right-4 -bottom-4 text-white/10 w-32 h-32 rotate-12 group-hover:scale-110 transition-transform duration-700" />
                      <h3 className="text-xl font-black mb-4 relative z-10">{isRTL ? 'تحتاج مساعدة؟' : 'Need Help?'}</h3>
                      <p className="text-blue-100 text-sm font-medium mb-6 relative z-10 opacity-80">Check our global support docs or contact tech team.</p>
                      <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest relative z-10 hover:scale-105 transition-transform active:scale-95 shadow-lg shadow-black/10">
                        {isRTL ? 'الدعم الفني' : 'Support Hub'}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            {activeSection === 'general' && (
              <SectionWrapper key="general" title="General Settings" description="Branding and core configuration.">
                <MediaInput 
                  label="Brand Logo" 
                  value={localContent.brand.logoUrl}
                  onChange={(val) => updateNestedContent(['brand', 'logoUrl'], val)}
                />
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-100 dark:border-zinc-800/50 space-y-4">
                  <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 px-1">Security</h4>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider font-bold text-zinc-400 px-1">Admin Password (Optional .env override)</label>
                    <p className="text-xs text-zinc-500 px-1 mb-2 italic">Current password used: admin123 (Change this in .env for production)</p>
                  </div>
                </div>
              </SectionWrapper>
            )}
            {activeSection === 'hero' && (
              <SectionWrapper key="hero" title="Landing Hero Section" description="The first thing users see when they visit your site.">
                <MediaInput 
                  label="Hero Video URL or Upload" 
                  type="video"
                  value={localContent.hero.videoUrl}
                  onChange={(val) => updateNestedContent(['hero', 'videoUrl'], val)}
                />
                <TranslatableInput 
                  label="Top Badge Text"
                  enValue={localContent.hero.topBadge.en}
                  arValue={localContent.hero.topBadge.ar}
                  onEnChange={(val) => updateNestedContent(['hero', 'topBadge', 'en'], val)}
                  onArChange={(val) => updateNestedContent(['hero', 'topBadge', 'ar'], val)}
                />
                <TranslatableInput 
                  label="Hero Headline"
                  multiline
                  enValue={localContent.hero.headline.en}
                  arValue={localContent.hero.headline.ar}
                  onEnChange={(val) => updateNestedContent(['hero', 'headline', 'en'], val)}
                  onArChange={(val) => updateNestedContent(['hero', 'headline', 'ar'], val)}
                />
                <TranslatableInput 
                  label="Hero Subheadline"
                  multiline
                  enValue={localContent.hero.subheadline.en}
                  arValue={localContent.hero.subheadline.ar}
                  onEnChange={(val) => updateNestedContent(['hero', 'subheadline', 'en'], val)}
                  onArChange={(val) => updateNestedContent(['hero', 'subheadline', 'ar'], val)}
                />
              </SectionWrapper>
            )}

            {activeSection === 'traction' && (
              <SectionWrapper key="traction" title="Impact Numbers" description="Highlight your key achievements and scale. Add as many stats as you need.">
                <div className="space-y-6">
                  {localContent.traction.map((stat: any, index: number) => (
                    <div key={index} className="relative group p-6 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-3xl space-y-4 shadow-sm">
                      <button 
                        onClick={() => {
                          const newTraction = [...localContent.traction];
                          newTraction.splice(index, 1);
                          updateNestedContent(['traction'], newTraction);
                        }}
                        className="absolute -top-2 -right-2 p-1.5 rounded-full bg-red-500 text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={14} />
                      </button>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <IconPicker 
                          label="Section Icon"
                          value={stat.icon}
                          onChange={(name) => {
                            const newTraction = [...localContent.traction];
                            newTraction[index].icon = name;
                            updateNestedContent(['traction'], newTraction);
                          }}
                        />
                        <div className="space-y-4">
                          <div className="space-y-1.5 px-1">
                            <label className="text-[10px] uppercase tracking-wider font-bold text-zinc-400">Numerical Value</label>
                            <input 
                              type="number" 
                              value={stat.value}
                              onChange={(e) => {
                                const newTraction = [...localContent.traction];
                                newTraction[index].value = parseInt(e.target.value);
                                updateNestedContent(['traction'], newTraction);
                              }}
                              className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-blue-600 font-bold"
                            />
                          </div>
                          <TranslatableInput 
                            label="Stat Label"
                            enValue={stat.label.en}
                            arValue={stat.label.ar}
                            onEnChange={(val) => {
                              const newTraction = [...localContent.traction];
                              newTraction[index].label.en = val;
                              updateNestedContent(['traction'], newTraction);
                            }}
                            onArChange={(val) => {
                              const newTraction = [...localContent.traction];
                              newTraction[index].label.ar = val;
                              updateNestedContent(['traction'], newTraction);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <button 
                    onClick={() => {
                      const newItem = {
                        value: 0,
                        label: { en: "New Stat", ar: "إحصائية جديدة" },
                        icon: "Activity"
                      };
                      updateNestedContent(['traction'], [...localContent.traction, newItem]);
                    }}
                    className="w-full py-4 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl text-zinc-400 hover:text-blue-500 hover:border-blue-500 transition-all flex items-center justify-center gap-2 font-bold bg-white dark:bg-zinc-900/20"
                  >
                    <Plus size={20} /> Add Another Impact Stat
                  </button>
                </div>
              </SectionWrapper>
            )}

            {activeSection === 'legacy' && (
              <SectionWrapper key="legacy" title="Timeline Events" description="Manage the history and legacy events.">
                {localContent.legacy.items.map((item: any, index: number) => (
                  <div key={index} className="relative p-6 border border-zinc-100 dark:border-zinc-800 rounded-2xl space-y-4">
                    <button 
                      onClick={() => {
                        const newItems = [...localContent.legacy.items];
                        newItems.splice(index, 1);
                        updateNestedContent(['legacy', 'items'], newItems);
                      }}
                      className="absolute -top-2 -right-2 p-1.5 rounded-full bg-red-500 text-white shadow-lg"
                    >
                      <Trash2 size={14} />
                    </button>
                    <div className="flex items-center gap-4">
                      <div className="space-y-1 flex-1">
                        <label className="text-[10px] uppercase font-bold text-zinc-400">Year</label>
                        <input 
                          type="text" 
                          value={item.year}
                          onChange={(e) => {
                            const newItems = [...localContent.legacy.items];
                            newItems[index].year = e.target.value;
                            updateNestedContent(['legacy', 'items'], newItems);
                          }}
                          className="w-full px-4 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800"
                        />
                      </div>
                    </div>
                    <TranslatableInput 
                      label="Event Title"
                      enValue={item.title.en}
                      arValue={item.title.ar}
                      onEnChange={(val) => {
                        const newItems = [...localContent.legacy.items];
                        newItems[index].title.en = val;
                        updateNestedContent(['legacy', 'items'], newItems);
                      }}
                      onArChange={(val) => {
                        const newItems = [...localContent.legacy.items];
                        newItems[index].title.ar = val;
                        updateNestedContent(['legacy', 'items'], newItems);
                      }}
                    />
                    <TranslatableInput 
                      label="Event Description"
                      multiline
                      enValue={item.description.en}
                      arValue={item.description.ar}
                      onEnChange={(val) => {
                        const newItems = [...localContent.legacy.items];
                        newItems[index].description.en = val;
                        updateNestedContent(['legacy', 'items'], newItems);
                      }}
                      onArChange={(val) => {
                        const newItems = [...localContent.legacy.items];
                        newItems[index].description.ar = val;
                        updateNestedContent(['legacy', 'items'], newItems);
                      }}
                    />
                  </div>
                ))}
                <button 
                  onClick={() => {
                    const newItem = {
                      year: "2024",
                      title: { en: "", ar: "" },
                      description: { en: "", ar: "" }
                    };
                    updateNestedContent(['legacy', 'items'], [...localContent.legacy.items, newItem]);
                  }}
                  className="w-full py-4 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl text-zinc-400 hover:text-blue-500 hover:border-blue-500 transition-all flex items-center justify-center gap-2 font-bold"
                >
                  <Plus size={20} /> Add New Legacy Event
                </button>
              </SectionWrapper>
            )}

            {activeSection === 'testimonials' && (
              <SectionWrapper key="testimonials" title="User Testimonials" description="Manage quotes from your satisfied customers.">
                {localContent.testimonials.items.map((item: any, index: number) => (
                  <div key={index} className="relative p-6 border border-zinc-100 dark:border-zinc-800 rounded-2xl space-y-4">
                    <button 
                      onClick={() => {
                        const newItems = [...localContent.testimonials.items];
                        newItems.splice(index, 1);
                        updateNestedContent(['testimonials', 'items'], newItems);
                      }}
                      className="absolute -top-2 -right-2 p-1.5 rounded-full bg-red-500 text-white shadow-lg"
                    >
                      <Trash2 size={14} />
                    </button>
                    <TranslatableInput 
                      label="Quote"
                      multiline
                      enValue={item.quote.en}
                      arValue={item.quote.ar}
                      onEnChange={(val) => {
                        const newItems = [...localContent.testimonials.items];
                        newItems[index].quote.en = val;
                        updateNestedContent(['testimonials', 'items'], newItems);
                      }}
                      onArChange={(val) => {
                        const newItems = [...localContent.testimonials.items];
                        newItems[index].quote.ar = val;
                        updateNestedContent(['testimonials', 'items'], newItems);
                      }}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <TranslatableInput 
                        label="Author Name"
                        enValue={item.author.en}
                        arValue={item.author.ar}
                        onEnChange={(val) => {
                          const newItems = [...localContent.testimonials.items];
                          newItems[index].author.en = val;
                          updateNestedContent(['testimonials', 'items'], newItems);
                        }}
                        onArChange={(val) => {
                          const newItems = [...localContent.testimonials.items];
                          newItems[index].author.ar = val;
                          updateNestedContent(['testimonials', 'items'], newItems);
                        }}
                      />
                      <TranslatableInput 
                        label="Role / Position"
                        enValue={item.role.en}
                        arValue={item.role.ar}
                        onEnChange={(val) => {
                          const newItems = [...localContent.testimonials.items];
                          newItems[index].role.en = val;
                          updateNestedContent(['testimonials', 'items'], newItems);
                        }}
                        onArChange={(val) => {
                          const newItems = [...localContent.testimonials.items];
                          newItems[index].role.ar = val;
                          updateNestedContent(['testimonials', 'items'], newItems);
                        }}
                      />
                    </div>
                  </div>
                ))}
                <button 
                   onClick={() => {
                    const newItem = {
                      quote: { en: "", ar: "" },
                      author: { en: "", ar: "" },
                      role: { en: "", ar: "" }
                    };
                    updateNestedContent(['testimonials', 'items'], [...localContent.testimonials.items, newItem]);
                  }}
                  className="w-full py-4 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl text-zinc-400 hover:text-blue-500 hover:border-blue-500 transition-all flex items-center justify-center gap-2 font-bold"
                >
                  <Plus size={20} /> Add New Testimonial
                </button>
              </SectionWrapper>
            )}

            {activeSection === 'features' && (
              <SectionWrapper key="features" title="AI Core Features" description="Highlight the advanced capabilities of your platform.">
                {localContent.aiCore.features.map((feature: any, index: number) => (
                  <div key={index} className="relative p-6 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-3xl space-y-4 shadow-sm group">
                    <button 
                      onClick={() => {
                        const newFeatures = [...localContent.aiCore.features];
                        newFeatures.splice(index, 1);
                        updateNestedContent(['aiCore', 'features'], newFeatures);
                      }}
                      className="absolute -top-2 -right-2 p-1.5 rounded-full bg-red-500 text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={14} />
                    </button>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <IconPicker 
                        label="Feature Icon"
                        value={feature.icon}
                        onChange={(name) => {
                          const newFeatures = [...localContent.aiCore.features];
                          newFeatures[index].icon = name;
                          updateNestedContent(['aiCore', 'features'], newFeatures);
                        }}
                      />
                      <div className="space-y-4">
                        <TranslatableInput 
                          label="Feature Title"
                          enValue={feature.title.en}
                          arValue={feature.title.ar}
                          onEnChange={(val) => {
                            const newFeatures = [...localContent.aiCore.features];
                            newFeatures[index].title.en = val;
                            updateNestedContent(['aiCore', 'features'], newFeatures);
                          }}
                          onArChange={(val) => {
                            const newFeatures = [...localContent.aiCore.features];
                            newFeatures[index].title.ar = val;
                            updateNestedContent(['aiCore', 'features'], newFeatures);
                          }}
                        />
                      </div>
                    </div>
                    <TranslatableInput 
                      label="Feature Description"
                      multiline
                      enValue={feature.description.en}
                      arValue={feature.description.ar}
                      onEnChange={(val) => {
                        const newFeatures = [...localContent.aiCore.features];
                        newFeatures[index].description.en = val;
                        updateNestedContent(['aiCore', 'features'], newFeatures);
                      }}
                      onArChange={(val) => {
                        const newFeatures = [...localContent.aiCore.features];
                        newFeatures[index].description.ar = val;
                        updateNestedContent(['aiCore', 'features'], newFeatures);
                      }}
                    />
                  </div>
                ))}
                <button 
                   onClick={() => {
                    const newItem = {
                      title: { en: "", ar: "" },
                      description: { en: "", ar: "" },
                      icon: "Zap"
                    };
                    updateNestedContent(['aiCore', 'features'], [...localContent.aiCore.features, newItem]);
                  }}
                  className="w-full py-4 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl text-zinc-400 hover:text-blue-500 hover:border-blue-500 transition-all flex items-center justify-center gap-2 font-bold bg-white dark:bg-zinc-900/20"
                >
                  <Plus size={20} /> Add New Feature
                </button>
              </SectionWrapper>
            )}

            {activeSection === 'topFeatures' && (
              <SectionWrapper key="topFeatures" title="Top Features List" description="Manage the grid of top features displayed on the site.">
                 <div className="space-y-4 mb-8 p-6 bg-blue-500/5 border border-blue-500/10 rounded-3xl">
                    <TranslatableInput 
                        label="Section Title"
                        enValue={localContent.topFeatures.title.en}
                        arValue={localContent.topFeatures.title.ar}
                        onEnChange={(val) => updateNestedContent(['topFeatures', 'title', 'en'], val)}
                        onArChange={(val) => updateNestedContent(['topFeatures', 'title', 'ar'], val)}
                    />
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {localContent.topFeatures.items.map((item: any, index: number) => (
                        <div key={index} className="flex items-center gap-3 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-3 rounded-2xl group shadow-sm transition-all hover:border-blue-500/30">
                            <div className="flex-1 grid grid-cols-1 gap-2">
                                <input 
                                    type="text"
                                    value={item.en}
                                    onChange={(e) => {
                                        const newItems = [...localContent.topFeatures.items];
                                        newItems[index].en = e.target.value;
                                        updateNestedContent(['topFeatures', 'items'], newItems);
                                    }}
                                    className="w-full text-sm bg-transparent border-none focus:ring-0 px-1 font-medium dark:text-white"
                                    placeholder="English Label"
                                />
                                <input 
                                    type="text"
                                    value={item.ar}
                                    onChange={(e) => {
                                        const newItems = [...localContent.topFeatures.items];
                                        newItems[index].ar = e.target.value;
                                        updateNestedContent(['topFeatures', 'items'], newItems);
                                    }}
                                    className="w-full text-sm bg-transparent border-none focus:ring-0 px-1 text-right font-arabic dark:text-white"
                                    placeholder="العنوان بالعربية"
                                />
                            </div>
                            <button 
                                onClick={() => {
                                    const newItems = [...localContent.topFeatures.items];
                                    newItems.splice(index, 1);
                                    updateNestedContent(['topFeatures', 'items'], newItems);
                                }}
                                className="p-2 text-zinc-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                    <button 
                        onClick={() => {
                            const newItems = [...localContent.topFeatures.items, { en: "New Feature", ar: "ميزة جديدة" }];
                            updateNestedContent(['topFeatures', 'items'], newItems);
                        }}
                        className="flex items-center justify-center p-4 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl text-zinc-400 hover:text-blue-500 hover:border-blue-500 transition-all font-bold bg-white dark:bg-zinc-900/20"
                    >
                        <Plus size={20} />
                    </button>
                 </div>
              </SectionWrapper>
            )}

            {activeSection === 'pricing' && (
              <SectionWrapper key="pricing" title="Pricing Plans" description="Manage your subscription models and prices.">
                {localContent.pricing.plans.map((plan: any, index: number) => (
                  <div key={index} className="relative p-6 border border-zinc-100 dark:border-zinc-800 rounded-2xl space-y-6">
                    <button 
                      onClick={() => {
                        const newPlans = [...localContent.pricing.plans];
                        newPlans.splice(index, 1);
                        updateNestedContent(['pricing', 'plans'], newPlans);
                      }}
                      className="absolute -top-2 -right-2 p-1.5 rounded-full bg-red-500 text-white shadow-lg"
                    >
                      <Trash2 size={14} />
                    </button>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <TranslatableInput 
                        label="Plan Name"
                        enValue={plan.name.en}
                        arValue={plan.name.ar}
                        onEnChange={(val) => {
                          const newPlans = [...localContent.pricing.plans];
                          newPlans[index].name.en = val;
                          updateNestedContent(['pricing', 'plans'], newPlans);
                        }}
                        onArChange={(val) => {
                          const newPlans = [...localContent.pricing.plans];
                          newPlans[index].name.ar = val;
                          updateNestedContent(['pricing', 'plans'], newPlans);
                        }}
                      />
                      <TranslatableInput 
                        label="Badge/Status"
                        enValue={plan.badge.en}
                        arValue={plan.badge.ar}
                        onEnChange={(val) => {
                          const newPlans = [...localContent.pricing.plans];
                          newPlans[index].badge.en = val;
                          updateNestedContent(['pricing', 'plans'], newPlans);
                        }}
                        onArChange={(val) => {
                          const newPlans = [...localContent.pricing.plans];
                          newPlans[index].badge.ar = val;
                          updateNestedContent(['pricing', 'plans'], newPlans);
                        }}
                      />
                    </div>

                    <div className="space-y-4">
                      <label className="text-sm font-bold text-zinc-400">Features List</label>
                      <div className="space-y-2">
                        {plan.features.map((f: any, fIndex: number) => (
                          <div key={fIndex} className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-950 p-2 rounded-lg">
                            <input 
                              type="checkbox" 
                              checked={f.included}
                              onChange={(e) => {
                                const newPlans = [...localContent.pricing.plans];
                                newPlans[index].features[fIndex].included = e.target.checked;
                                updateNestedContent(['pricing', 'plans'], newPlans);
                              }}
                              className="w-4 h-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500"
                            />
                            <div className="flex-1 grid grid-cols-2 gap-2">
                              <input 
                                type="text"
                                value={f.name.en}
                                onChange={(e) => {
                                  const newPlans = [...localContent.pricing.plans];
                                  newPlans[index].features[fIndex].name.en = e.target.value;
                                  updateNestedContent(['pricing', 'plans'], newPlans);
                                }}
                                className="w-full text-xs bg-transparent border-none focus:ring-0 px-0"
                                placeholder="EN Feature..."
                              />
                              <input 
                                type="text"
                                value={f.name.ar}
                                onChange={(e) => {
                                  const newPlans = [...localContent.pricing.plans];
                                  newPlans[index].features[fIndex].name.ar = e.target.value;
                                  updateNestedContent(['pricing', 'plans'], newPlans);
                                }}
                                className="w-full text-xs bg-transparent border-none focus:ring-0 px-0 text-right font-arabic"
                                placeholder="الميزة..."
                              />
                            </div>
                            <button 
                              onClick={() => {
                                const newPlans = [...localContent.pricing.plans];
                                newPlans[index].features.splice(fIndex, 1);
                                updateNestedContent(['pricing', 'plans'], newPlans);
                              }}
                              className="p-1 text-zinc-400 hover:text-red-500 transition-colors"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                      <button 
                        onClick={() => {
                          const newPlans = [...localContent.pricing.plans];
                          newPlans[index].features.push({
                            name: { en: "New Feature", ar: "ميزة جديدة" },
                            included: true
                          });
                          updateNestedContent(['pricing', 'plans'], newPlans);
                        }}
                        className="text-xs font-bold text-blue-500 hover:text-blue-600 flex items-center gap-1"
                      >
                        <Plus size={14} /> Add Feature to Plan
                      </button>
                    </div>
                  </div>
                ))}
              </SectionWrapper>
            )}

            {activeSection === 'faq' && (
              <SectionWrapper key="faq" title="FAQ" description="Manage common questions and answers.">
                {localContent.faq.items.map((item: any, index: number) => (
                  <div key={index} className="relative p-6 border border-zinc-100 dark:border-zinc-800 rounded-2xl space-y-4">
                    <button 
                      onClick={() => {
                        const newItems = [...localContent.faq.items];
                        newItems.splice(index, 1);
                        updateNestedContent(['faq', 'items'], newItems);
                      }}
                      className="absolute -top-2 -right-2 p-1.5 rounded-full bg-red-500 text-white shadow-lg"
                    >
                      <Trash2 size={14} />
                    </button>
                    <TranslatableInput 
                      label="Question"
                      enValue={item.question.en}
                      arValue={item.question.ar}
                      onEnChange={(val) => {
                        const newItems = [...localContent.faq.items];
                        newItems[index].question.en = val;
                        updateNestedContent(['faq', 'items'], newItems);
                      }}
                      onArChange={(val) => {
                        const newItems = [...localContent.faq.items];
                        newItems[index].question.ar = val;
                        updateNestedContent(['faq', 'items'], newItems);
                      }}
                    />
                    <TranslatableInput 
                      label="Answer"
                      multiline
                      enValue={item.answer.en}
                      arValue={item.answer.ar}
                      onEnChange={(val) => {
                        const newItems = [...localContent.faq.items];
                        newItems[index].answer.en = val;
                        updateNestedContent(['faq', 'items'], newItems);
                      }}
                      onArChange={(val) => {
                        const newItems = [...localContent.faq.items];
                        newItems[index].answer.ar = val;
                        updateNestedContent(['faq', 'items'], newItems);
                      }}
                    />
                  </div>
                ))}
                <button 
                   onClick={() => {
                    const newItem = {
                      question: { en: "", ar: "" },
                      answer: { en: "", ar: "" }
                    };
                    updateNestedContent(['faq', 'items'], [...localContent.faq.items, newItem]);
                  }}
                  className="w-full py-4 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl text-zinc-400 hover:text-blue-500 hover:border-blue-500 transition-all flex items-center justify-center gap-2 font-bold"
                >
                  <Plus size={20} /> Add FAQ Item
                </button>
              </SectionWrapper>
            )}

            {activeSection === 'messages' && (
              <SectionWrapper key="messages" title="User Messages" description="View and manage messages sent through the Contact form.">
                <div className="space-y-6">
                  {messages.length === 0 ? (
                    <div className="text-center py-20 bg-white dark:bg-white/5 rounded-[2.5rem] border border-dashed border-zinc-200 dark:border-white/10">
                      <MessageSquare className="w-12 h-12 mx-auto text-zinc-300 dark:text-zinc-600 mb-4" />
                      <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">No messages yet</p>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {messages.map((msg, idx) => (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          key={msg.id} 
                          className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-[2rem] overflow-hidden hover:border-blue-500/30 transition-all duration-300 shadow-card dark:shadow-card-dark"
                        >
                          {/* Header */}
                          <div className="flex items-center justify-between px-6 py-4 bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-100 dark:border-white/5">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                                {msg.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <h4 className="font-bold text-zinc-900 dark:text-white">{msg.name}</h4>
                                <a href={`mailto:${msg.email}`} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">{msg.email}</a>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-xs text-zinc-400 dark:text-zinc-500">
                                {new Date(msg.timestamp).toLocaleDateString(isRTL ? 'ar-EG' : 'en-US', { 
                                  year: 'numeric', 
                                  month: 'short', 
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </span>
                            </div>
                          </div>
                          
                          {/* Message Body */}
                          <div className="p-6">
                            <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed whitespace-pre-line">
                              {msg.message}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </SectionWrapper>
            )}

            {activeSection === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-3xl mx-auto space-y-8"
              >
                {/* Language Card */}
                <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] shadow-sm border border-zinc-100 dark:border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-white/5 flex items-center justify-center text-blue-600 font-bold">
                      <Languages size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-zinc-900 dark:text-white">{isRTL ? 'لغة لوحة التحكم' : 'Dashboard Language'}</h3>
                      <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest mt-1">EN / AR</p>
                    </div>
                  </div>
                  <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1.5 rounded-2xl gap-2">
                    <button 
                      onClick={() => setAdminLanguage('ar')}
                      className={`px-6 py-2.5 rounded-xl font-black text-xs transition-all cursor-pointer ${adminLanguage === 'ar' ? 'bg-white dark:bg-zinc-700 text-blue-600 shadow-sm' : 'text-zinc-400'}`}
                    >
                      عربي
                    </button>
                    <button 
                      onClick={() => setAdminLanguage('en')}
                      className={`px-6 py-2.5 rounded-xl font-black text-xs transition-all cursor-pointer ${adminLanguage === 'en' ? 'bg-white dark:bg-zinc-700 text-blue-600 shadow-sm' : 'text-zinc-400'}`}
                    >
                      English
                    </button>
                  </div>
                </div>

                {/* Theme Card */}
                <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] shadow-sm border border-zinc-100 dark:border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-zinc-50 dark:bg-white/5 flex items-center justify-center text-zinc-400">
                      <Moon size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-zinc-900 dark:text-white">{isRTL ? 'الوضع الداكن' : 'Dark Mode'}</h3>
                      <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest mt-1">{adminTheme === 'dark' ? 'Dark' : 'Light'}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setAdminTheme(adminTheme === 'dark' ? 'light' : 'dark')}
                    className={`w-16 h-8 rounded-full p-1 transition-all duration-300 relative cursor-pointer ${adminTheme === 'dark' ? 'bg-blue-600' : 'bg-zinc-200'}`}
                  >
                    <motion.div 
                      layout
                      animate={{ x: adminTheme === 'dark' ? (isRTL ? -32 : 32) : 0 }}
                      className="w-6 h-6 bg-white rounded-full shadow-md"
                    />
                  </button>
                </div>

                {/* Profile Card */}
                <div className="bg-white dark:bg-zinc-900 p-10 rounded-[2.5rem] shadow-sm border border-zinc-100 dark:border-white/5 space-y-10">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-white/5 flex items-center justify-center text-blue-600">
                      <User size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-zinc-900 dark:text-white">{isRTL ? 'الملف الشخصي' : 'Profile Settings'}</h3>
                      <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest mt-1">Admin Account</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-zinc-400 uppercase tracking-widest ml-1">{isRTL ? 'الاسم' : 'Name'}</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300" size={18} />
                        <input 
                          type="text" 
                          defaultValue="Admin" 
                          className="w-full pl-12 pr-6 py-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-white/5 rounded-2xl font-bold text-zinc-900 dark:text-white focus:border-blue-500 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black text-zinc-400 uppercase tracking-widest ml-1">{isRTL ? 'البريد الإلكتروني' : 'Email Address'}</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300" size={18} />
                        <input 
                          type="email" 
                          defaultValue="admin@skooture.ai" 
                          className="w-full pl-12 pr-6 py-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-white/5 rounded-2xl font-bold text-zinc-900 dark:text-white focus:border-blue-500 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <button className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all mt-4 cursor-pointer">
                      {isRTL ? 'حفظ التغييرات' : 'Save Profile'}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}


          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
