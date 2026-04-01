import { MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionWrapper from '../layout/SectionWrapper';
import type { Message } from '../../../types';

interface MessagesSectionProps {
  messages: Message[];
  isRTL: boolean;
}

export default function MessagesSection({ messages, isRTL }: MessagesSectionProps) {
  const { t } = useTranslation();

  return (
    <SectionWrapper key="messages" title={t('admin.messages.title')} description={t('admin.messages.description')}>
      <div className="space-y-6">
        {messages.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-white/5 rounded-[2.5rem] border border-dashed border-zinc-200 dark:border-white/10">
            <MessageSquare className="w-12 h-12 mx-auto text-zinc-300 dark:text-zinc-600 mb-4" />
            <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">{t('admin.messages.empty')}</p>
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
  );
}
