'use client';

import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

/**
 * Breadcrumb Navigation Component - Bauhaus Style
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

      <nav aria-label="Breadcrumb" className="mb-8 overflow-x-auto whitespace-nowrap">
        <ol className="flex items-center gap-0 list-none p-0 m-0">
          {breadcrumbItems.map((item, index) => {
            const Icon = item.icon;
            const isLast = item.isCurrent || index === breadcrumbItems.length - 1;

            return (
              <li key={index} className="flex items-center group">
                {index > 0 && (
                  <span className="mx-2 text-bauhaus-black flex items-center justify-center">
                    <ChevronRight size={18} strokeWidth={3} />
                  </span>
                )}

                <div className="flex items-center">
                  {isLast ? (
                    <span
                      aria-current="page"
                      className="flex items-center gap-2 px-3 py-1.5 bg-bauhaus-yellow border-2 border-bauhaus-black text-bauhaus-black font-display font-bold text-sm"
                    >
                      {Icon && <Icon size={14} strokeWidth={3} />}
                      {item.name}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      className="flex items-center gap-2 px-3 py-1.5 border-2 border-bauhaus-black text-bauhaus-black font-display font-bold text-sm hover:bg-bauhaus-blue hover:text-white transition-colors"
                    >
                      {Icon && <Icon size={14} strokeWidth={3} />}
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
