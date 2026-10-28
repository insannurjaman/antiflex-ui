import Link from 'next/link';
import { IconArrowUpRight } from '@tabler/icons-react';
import { componentCatalog } from '@antiflex/ui/catalog';
import { componentData } from '../../../components/component-data';
export const metadata = { title: 'Components' };
export default function Components() {
  return (
    <>
      <div className="doc-breadcrumb">Documentation / Library</div>
      <h1>A growing component library.</h1>
      <p className="doc-lead">
        A focused foundation for your next interface. Original components, complete states, and APIs
        you can understand.
      </p>
      <div className="component-index">
        {componentCatalog.map(({ slug, name }, i) => (
          <Link key={slug} href={'/docs/components/' + slug}>
            <span className="component-index-count">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <h2>{name}</h2>
              <p>{componentData[slug].description}</p>
            </div>
            <IconArrowUpRight size={20} />
          </Link>
        ))}
      </div>
    </>
  );
}
