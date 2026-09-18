import Link from 'next/link';

// Aggressive-but-honest internal linking: every trigger/sector/
// location page surfaces a handful of genuinely related pages with
// descriptive (non-repetitive) anchor text, so no page is an orphan
// and PageRank/relevance signals flow between related content.
export default function RelatedLinks({ title = 'Related pages', links = [] }) {
  if (!links.length) return null;

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-navy-400">{title}</h2>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="block rounded-xl border border-navy-100 px-4 py-3 text-sm font-semibold text-navy-700 transition hover:border-teal-300 hover:text-navy-900"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
