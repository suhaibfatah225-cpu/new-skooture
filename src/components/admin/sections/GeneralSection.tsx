import SectionWrapper from '../layout/SectionWrapper';
import MediaInput from '../shared/MediaInput';
import type { AdminSectionProps } from '../../../types';

export default function GeneralSection({ localContent, updateNestedContent }: AdminSectionProps) {
  return (
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
  );
}
