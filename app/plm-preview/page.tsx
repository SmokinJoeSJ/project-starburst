import { PreviewCanvas } from '@/components/content/preview-canvas';
import manifest from '@/content/plm-manifest.json';
import binding from '@/content/editor-binding.json';
import { approvedContent } from '@/lib/content/approved';
export const metadata = {
  title: 'Content preview | Project Starburst',
  robots: { index: false, follow: false },
  alternates: { canonical: null },
};
export default function Page() {
  return (
    <PreviewCanvas
      manifest={manifest}
      approved={approvedContent}
      policy={binding}
    />
  );
}
