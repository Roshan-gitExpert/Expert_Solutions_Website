import Link from 'next/link';
import siteConfig from '@/lib/config';

// Renders a visible breadcrumb trail AND its matching BreadcrumbList
// JSON-LD (Google can show breadcrumbs directly in search results
// for pages that carry this markup). `items` is an array of
// { label, href } for everything BETWEEN Home and the current page;
// the current page's own label is passed as `current`.
export default function Breadcrumbs({ items = [], current }) {
  const trail = [{ label: 'Home', href: '/' }, ...items, { label: current, href: null }];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: item.href ? `${siteConfig.siteUrl}${item.href}` : undefined,
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-4 pt-4 text-xs sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ol className="flex flex-wrap items-center gap-1 text-navy-400">
        {trail.map((item, i) => (
          <li key={`${item.label}-${i}`} className="flex items-center gap-1">
            {i > 0 && <span aria-hidden="true">/</span>}
            {item.href ? (
              <Link href={item.href} className="hover:text-navy-700 hover:underline">
                {item.label}
              </Link>
            ) : (
              <span className="font-semibold text-navy-600">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
