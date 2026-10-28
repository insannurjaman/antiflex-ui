import { ExamplesGallery } from '../../components/demo/gallery';
import '../demo/showcase.css';
import './examples.css';
export const metadata = {
  title: 'Examples',
  description:
    'Explore 13 connected SaaS examples built with antiflex/ui: dashboards, customers, projects, settings, profile, billing and demo checkout. Sidebar and top navigation, in light and dark.',
};
export default function Page() {
  return <ExamplesGallery />;
}
