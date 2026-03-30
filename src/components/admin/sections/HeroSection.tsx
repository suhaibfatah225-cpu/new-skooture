import SectionWrapper from '../layout/SectionWrapper';
import MediaInput from '../shared/MediaInput';
import TranslatableInput from '../shared/TranslatableInput';
import type { AdminSectionProps } from '../../../types';

export default function HeroSection({ localContent, updateNestedContent }: AdminSectionProps) {
  return (
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
  );
}
