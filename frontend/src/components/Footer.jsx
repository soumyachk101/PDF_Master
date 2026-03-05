import { Link } from 'react-router-dom'
import { FileText, Github, Shield, Zap } from 'lucide-react'

const FOOTER_LINKS = {
  'PDF Tools': [
    { label: 'Merge PDF', href: '/tool/merge-pdf' },
    { label: 'Split PDF', href: '/tool/split-pdf' },
    { label: 'Compress PDF', href: '/tool/compress-pdf' },
    { label: 'Rotate PDF', href: '/tool/rotate-pdf' },
    { label: 'Crop PDF', href: '/tool/crop-pdf' },
    { label: 'Add Watermark', href: '/tool/add-watermark' },
  ],
  'Convert': [
    { label: 'Word to PDF', href: '/tool/word-to-pdf' },
    { label: 'PDF to Word', href: '/tool/pdf-to-word' },
    { label: 'PDF to JPG', href: '/tool/pdf-to-jpg' },
    { label: 'PDF to PNG', href: '/tool/pdf-to-png' },
    { label: 'PDF to PPT', href: '/tool/pdf-to-ppt' },
    { label: 'Excel to PDF', href: '/tool/excel-to-pdf' },
  ],
  'Images': [
    { label: 'JPG to PDF', href: '/tool/jpg-to-pdf' },
    { label: 'JPG to PNG', href: '/tool/jpg-to-png' },
    { label: 'PNG to JPG', href: '/tool/png-to-jpg' },
    { label: 'PDF to Text', href: '/tool/pdf-to-text' },
    { label: 'Lock PDF', href: '/tool/lock-pdf' },
    { label: 'Unlock PDF', href: '/tool/unlock-pdf' },
  ],
  'Company': [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
  ],
}

export default function Footer() {
  return (
    <footer
      style={{
        background: 'linear-gradient(135deg, #1A1A2E 0%, #0D0D1A 100%)',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.4)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
      className="pt-16 pb-8"
    >
      <div className="section-container">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(to bottom, #F48C84, #C84439)',
                  boxShadow: '3px 3px 8px rgba(0,0,0,0.4), -2px -2px 6px rgba(255,255,255,0.08), inset 1px 1px 2px rgba(255,255,255,0.3)',
                }}
              >
                <FileText size={18} className="text-white" strokeWidth={2.5} />
              </div>
              <span className="font-display font-extrabold text-xl">
                <span style={{ color: '#E2574C' }}>PDF</span>
                <span className="text-white">Kit</span>
              </span>
            </Link>
            <p className="text-sm text-white/40 leading-relaxed mb-5">
              Every PDF tool you need, free and secure. No registration.
            </p>
            {/* Trust badges */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs text-white/30">
                <Shield size={13} className="text-green-400" />
                <span>Files auto-deleted after processing</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/30">
                <Zap size={13} className="text-yellow-400" />
                <span>Fast, client-side processing</span>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h4
                className="font-bold text-xs uppercase tracking-widest mb-5"
                style={{ color: 'rgba(255,255,255,0.35)' }}
              >
                {section}
              </h4>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-white/50 hover:text-white transition-colors font-medium"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex items-center justify-between flex-wrap gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p className="text-sm text-white/25 font-medium">
            © PDFKit {new Date().getFullYear()} · Built with ♥ · All rights reserved
          </p>
          <a
            href="https://github.com/soumyachk101"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/30 hover:text-white transition-colors"
          >
            <Github size={18} />
          </a>
        </div>
      </div>
    </footer>
  )
}
