'use client';

import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

/**
 * Breadcrumb Navigation Component - Industrial Skeuomorphism Style
 */
export default function Breadcrumbs({ items = [] }) {
  const pathname = usePathname();

  // If custom items provided, use them
  const breadcrumbItems = items.length > 0 ? items : (() => {
    const pathnames = pathname.split('/').filter(x => x);
    const defaultItems = [
      {
        name: 'HOME',
        href: '/',
        icon: Home,
        isCurrent: pathnames.length === 0
      }
    ];

    // Auto-generate from path
    if (pathnames.length > 0) {
      let cumulativePath = '';
      pathnames.forEach((segment, index) => {
        cumulativePath += `/${segment}`;
        const isLast = index === pathnames.length - 1;

        // Handle tool pages specially
        if (segment === 'tool' && pathnames[index + 1]) {
          const toolSlug = pathnames[index + 1];
          defaultItems.push({
            name: toolSlug.replace(/-/g, ' ').toUpperCase(),
            href: cumulativePath,
            isCurrent: isLast
          });
          return;
        }

        // Skip intermediate segments that are handled (like tool slug itself)
        if (index > 0 && pathnames[index - 1] === 'tool') {
          return;
        }

        defaultItems.push({
          name: segment.replace(/-/g, ' ').toUpperCase(),
          href: cumulativePath,
          isCurrent: isLast
        });
      });
    }

    return defaultItems;
  })();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://www.docshift.tech${item.href}`
    }))
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <nav aria-label="Breadcrumb" className="mb-8 overflow-x-auto whitespace-nowrap scrollbar-none py-1">
        <ol className="flex items-center gap-1.5 list-none p-0 m-0">
          {breadcrumbItems.map((item, index) => {
            const Icon = item.icon;
            const isLast = item.isCurrent || index === breadcrumbItems.length - 1;

            return (
              <li key={index} className="flex items-center">
                {index > 0 && (
                  <span className="mx-1 text-border-dark flex items-center justify-center pointer-events-none">
                    <ChevronRight size={14} strokeWidth={2.5} />
                  </span>
                )}

                <div className="flex items-center">
                  {isLast ? (
                    <span
                      aria-current="page"
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-chassis border border-white/30 text-ink font-mono font-bold text-xs shadow-neu-pressed rounded-full select-none"
                    >
                      {Icon ? <Icon size={12} strokeWidth={2.5} /> : <span className="led-indicator led-green flex-shrink-0" />}
                      {item.name}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-chassis border border-white/50 text-ink-secondary font-mono font-bold text-xs shadow-neu-sharp rounded-full hover:shadow-none hover:text-ink transition-all duration-150"
                    >
                      {Icon && <Icon size={12} strokeWidth={2.5} />}
                      {item.name}
                    </Link>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
