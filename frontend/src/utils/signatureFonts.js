import { Dancing_Script, Great_Vibes, Alex_Brush, Caveat } from 'next/font/google';

// Decorative faces for the Sign PDF signature preview only. `preload: false` is
// deliberate — these are used by one branch of one tool and must not be preloaded
// on the other 29 tool pages. next/font loaders need literal arguments, so no
// shared options object here.
export const dancingScript = Dancing_Script({ subsets: ['latin'], weight: '600', display: 'swap', preload: false });
export const greatVibes = Great_Vibes({ subsets: ['latin'], weight: '400', display: 'swap', preload: false });
export const alexBrush = Alex_Brush({ subsets: ['latin'], weight: '400', display: 'swap', preload: false });
export const caveat = Caveat({ subsets: ['latin'], weight: '700', display: 'swap', preload: false });

// Keyed by the same ids that ToolPage sends to the backend as `additionalData.font`.
export const SIGNATURE_FONTS = {
    'font-dancing': dancingScript,
    'font-greatvibes': greatVibes,
    'font-alex': alexBrush,
    'font-caveat': caveat,
};

export const signatureFontFamily = (id) => (SIGNATURE_FONTS[id] || dancingScript).style.fontFamily;
