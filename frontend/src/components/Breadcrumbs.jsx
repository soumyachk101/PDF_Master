'use client';

import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Breadcrumbs({ items = [] }) {
  const pathname = usePathname();

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

    if (pathnames.length > 0) {
      let cumulativePath = '';
      pathnames.forEach((segment, index) => {
        cumulativePath += `/${segment}`;
        const isLast = index === pathnames.length - 1;

        if (segment === 'tool' && pathnames[index + 1]) {
          const toolSlug = pathnames[index + 1];
          defaultItems.push({
            name: toolSlug.replace(/-/g, ' ').toUpperCase(),
            href: cumulativePath,
            isCurrent: isLast
          });
          return;
        }

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

      <nav aria-label="Breadcrumb" className="mb-8 overflow-x-auto whitespace-nowrap py-2">
        <ol className="flex items-center gap-2 list-none p-0 m-0">
          {breadcrumbItems.map((item, index) => {
            const Icon = item.icon;
            const isLast = item.isCurrent || index === breadcrumbItems.length - 1;

            return (
              <li key={index} className="flex items-center">
                {index > 0 && (
                  <span className="mx-1 text-[#55685C]/50 flex items-center justify-center pointer-events-none">
                    <ChevronRight size={10} strokeWidth={3} />
                  </span>
                )}

                <div className="flex items-center">
                  {isLast ? (
                    <span
                      aria-current="page"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E4EDE8] shadow-soft-inset-sm font-mono font-extrabold text-[9px] text-[#7C3AED] select-none"
                    >
                      {Icon ? <Icon size={11} strokeWidth={2.5} /> : null}
                      {item.name}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E4EDE8] shadow-soft-extruded-sm font-mono font-bold text-[9px] text-[#55685C] hover:text-[#7C3AED] hover:-translate-y-[0.5px] hover:shadow-soft-extruded transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-[#7C3AED]"
                    >
                      {Icon && <Icon size={11} strokeWidth={2.5} />}
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
