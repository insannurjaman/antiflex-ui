import { notFound } from 'next/navigation';
import { demoPages } from '../../../components/demo/catalog';
import { DemoPageContent } from '../../../components/demo/page-content';
export function generateStaticParams() {
  return demoPages.filter((p) => p.slug).map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = demoPages.find((p) => p.slug === slug);
  return { title: item ? `${item.title} example` : 'Example not found' };
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!demoPages.some((p) => p.slug === slug)) notFound();
  return <DemoPageContent slug={slug} />;
}
