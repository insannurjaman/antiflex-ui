import { notFound } from 'next/navigation';
import { Badge, Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@chamfer/ui';
import { componentData } from '../../../../components/component-data';
import { ComponentDemo } from '../../../../components/specimens';
import { Code } from '../../../../components/code';
export function generateStaticParams() {
  return Object.keys(componentData).map((slug) => ({ slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return { title: componentData[slug]?.name || 'Component' };
}
export default async function ComponentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = componentData[slug];
  if (!c) notFound();
  return (
    <>
      <div className="doc-breadcrumb">Documentation / Components</div>
      <div className="component-title">
        <h1>{c.name}</h1>
        <Badge variant="success">Foundation</Badge>
      </div>
      <p className="doc-lead">{c.description}</p>
      <div className="preview-panel">
        <div className="preview-panel-label">
          <span>Interactive preview</span>
          <span>Try the component</span>
        </div>
        <div className="preview-content">
          <ComponentDemo name={slug} />
        </div>
      </div>
      <h2>Usage</h2>
      <Code>{c.code}</Code>
      <h2>API reference</h2>
      <p>
        All components forward native attributes, <code>className</code>, and refs to their
        underlying elements.
      </p>
      <div className="table-scroll">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Prop</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Default</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {c.props.map(([p, t, d]) => (
              <TableRow key={p}>
                <TableCell>
                  <code>{p}</code>
                </TableCell>
                <TableCell>
                  <code>{t}</code>
                </TableCell>
                <TableCell>
                  <code>{d}</code>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <h2>Accessibility</h2>
      <p>{c.accessibility}</p>
    </>
  );
}
