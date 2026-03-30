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
import type { AdminSection, Language } from '../types';

export function getAdminSections(adminLanguage: Language, messageCount: number): AdminSection[] {
  return [
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
    { id: 'messages', label: 'User Messages', icon: MessageSquare, badge: messageCount },
    { id: 'settings', label: 'Portal Settings', icon: Settings },
  ];
}
