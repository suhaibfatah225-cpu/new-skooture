import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useContent } from '../context/ContentContext';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const { t, addMessage, language } = useContent();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    addMessage(formData);
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
    setIsSuccess(true);
    
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <section id="contact" className="py-32 bg-white dark:bg-[#020617] relative overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-bold uppercase tracking-widest mb-6 inline-block"
              >
                {t({ en: 'Contact Us', ar: 'اتصل بنا' })}
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-extrabold text-zinc-900 dark:text-white leading-tight mb-8">
                {language === 'en' ? (
                  <>Let's Build the <span className="text-gradient">Future</span> Together</>
                ) : (
                  <>لنبنِ <span className="text-gradient">المستقبل</span> معاً</>
                )}
              </h2>
              <p className="text-xl text-zinc-600 dark:text-zinc-400 font-medium max-w-lg leading-relaxed">
                {t({ 
                  en: "Have questions about Skooture? Our team is here to help you transform your educational institution.", 
                  ar: "لديك أسئلة حول سكوتر؟ فريقنا هنا لمساعدتك في تحويل مؤسستك التعليمية." 
                })}
              </p>
            </div>

            <div className="space-y-6">
              {[
                { icon: Mail, label: 'Email', value: 'contact@skooture.ai' },
                { icon: Phone, label: 'Phone', value: '+1 (555) 000-0000' },
                { icon: MapPin, label: 'Location', value: t({ en: 'London, UK / Dubai, UAE', ar: 'لندن، المملكة المتحدة / دبي، الإمارات' }) }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-white/5 flex items-center justify-center border border-zinc-200 dark:border-white/10 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 transition-all duration-500">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-1">{item.label}</p>
                    <p className="text-lg font-bold text-zinc-900 dark:text-white">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 blur-3xl rounded-full" />
            <div className="glass-card relative p-8 md:p-12 rounded-[2.5rem] border border-white/20 dark:border-white/10 shadow-3xl">
              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center py-12"
                >
                  <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-8 border border-green-500/30">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">
                    {t({ en: 'Message Sent!', ar: 'تم إرسال الرسالة!' })}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 font-medium text-lg leading-relaxed">
                    {t({ 
                      en: 'Thank you for reaching out. We will get back to you shortly.', 
                      ar: 'شكراً لتواصلك معنا. سنقوم بالرد عليك في أقرب وقت ممكن.' 
                    })}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest ml-1">
                      {t({ en: 'Full Name', ar: 'الاسم الكامل' })}
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t({ en: 'Enter your name', ar: 'أدخل اسمك' })}
                      className="w-full px-6 py-4 rounded-2xl bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-white/10 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-zinc-900 dark:text-white font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest ml-1">
                      {t({ en: 'Email Address', ar: 'البريد الإلكتروني' })}
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t({ en: 'Enter your email', ar: 'أدخل بريدك الإلكتروني' })}
                      className="w-full px-6 py-4 rounded-2xl bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-white/10 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-zinc-900 dark:text-white font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest ml-1">
                      {t({ en: 'Your Message', ar: 'رسالتك' })}
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t({ en: 'Tell us about your institution...', ar: 'أخبرنا عن مؤسستك...' })}
                      className="w-full px-6 py-4 rounded-2xl bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-white/10 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-zinc-900 dark:text-white font-medium resize-none"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                    className="w-full py-5 rounded-2xl bg-blue-600 text-white font-black text-lg shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                  >
                    {isSubmitting ? (
                      <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        {t({ en: 'Send Message', ar: 'إرسال الرسالة' })}
                        <Send className={`w-5 h-5 ${language === 'ar' ? 'rotate-180' : ''}`} />
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
