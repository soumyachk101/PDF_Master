// Canonical schema.org entity nodes shared across layout.jsx and every route.
// Three files need the same two @id strings — duplicating them is how entity
// graphs silently break. This is a constants file, not an abstraction layer;
// it must not grow into a schema-builder framework.

export const ORG_ID = 'https://www.docshift.tech/#organization';
export const SITE_ID = 'https://www.docshift.tech/#website';

// Same fields as the pre-existing Organization node in layout.jsx, plus @id
// and founder — name and URL match the "Built By" credit on /about and the
// operator line on /terms verbatim. No invented title, bio or credentials.
export const organizationNode = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: 'DocShift',
    url: 'https://www.docshift.tech',
    logo: 'https://www.docshift.tech/logo.png',
    description: 'Free browser-based PDF tools. Merge, compress, convert and edit PDFs with 100% privacy.',
    foundingDate: '2024',
    founder: {
        '@type': 'Person',
        name: 'Soumya Chakraborty',
        url: 'https://github.com/soumyachk101',
    },
    sameAs: [
        'https://x.com/soumyachk1',
        'https://github.com/soumyachk101',
        'https://discord.com/users/soumya.chk101',
    ],
    contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: 'support@docshift.tech',
        availableLanguage: ['English'],
    },
};

export const webSiteNode = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': SITE_ID,
    name: 'DocShift',
    alternateName: 'DocShift PDF Tools',
    url: 'https://www.docshift.tech',
    description: 'Free browser-based PDF tools. Merge, compress, convert and edit PDFs with 100% privacy.',
    inLanguage: 'en',
    publisher: { '@id': ORG_ID },
};
