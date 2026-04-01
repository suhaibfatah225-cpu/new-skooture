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
  Target,
  Layout,
  MessageSquare,
} from 'lucide-react';
import type { TFunction } from 'i18next';
import type { AdminSection } from '../types';

export function getAdminSections(t: TFunction, messageCount: number): AdminSection[] {
  return [
    { id: 'overview', label: t('admin.sections.overview'), icon: LayoutDashboard },
    { id: 'general', label: t('admin.sections.general'), icon: Layout },
    { id: 'hero', label: t('admin.sections.hero'), icon: Type },
    { id: 'traction', label: t('admin.sections.traction'), icon: BarChart3 },
    { id: 'legacy', label: t('admin.sections.legacy'), icon: History },
    { id: 'features', label: t('admin.sections.features'), icon: Zap },
    { id: 'topFeatures', label: t('admin.sections.topFeatures'), icon: Target },
    { id: 'testimonials', label: t('admin.sections.testimonials'), icon: Quote },
    { id: 'pricing', label: t('admin.sections.pricing'), icon: CreditCard },
    { id: 'faq', label: t('admin.sections.faq'), icon: HelpCircle },
    { id: 'messages', label: t('admin.sections.messages'), icon: MessageSquare, badge: messageCount },
    { id: 'settings', label: t('admin.sections.settings'), icon: Settings },
  ];
}
