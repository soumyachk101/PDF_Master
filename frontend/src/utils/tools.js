export const TOOLS = [
    // ── ORGANIZE ────────────────────────────────────────────────────────────
    { 
        slug: 'merge-pdf', name: 'Merge PDF', shortDesc: 'Combine PDFs into one.', desc: 'Combine multiple PDF files into one document in any order you choose.', icon: 'Combine', category: 'organize', color: '#F05B25', accept: { 'application/pdf': ['.pdf'] }, multiple: true, minFiles: 2, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf',
        seoTitle: 'Merge PDF Files Free | Secure Private PDF Combiner',
        seoDesc: 'Merge PDF files together securely. Our free tool runs directly in your browser with no uploads required, ensuring total privacy.',
        seoKeywords: 'merge pdf files without uploading, combine pdf online private, secure pdf merge, join pdf files, free pdf combiner',
        seoArticle: 'Use our free online tool to merge PDF files instantly without uploading them to external servers. Since processing is optimized for privacy, your files remain completely secure on your device. Just arrange the files in your preferred order and click merge. Once combined, you might also want to <a href="/tool/compress-pdf">compress your PDF size</a> to reduce the file footprint, or <a href="/tool/split-pdf">split PDF pages</a> if you combined too many documents. Need to sort them first? Try our <a href="/tool/organize-pdf">free PDF organizer</a>.',
        steps: [
            'Drop two or more PDF files onto the <strong>Merge PDF</strong> tool, or click to browse for them.',
            'Drag the file thumbnails into the exact order you want them combined.',
            'Click <strong>Process Merge PDF</strong> — the files are combined entirely in your browser.',
            'Download the single merged PDF. Nothing is uploaded at any point.'
        ],
        updated: '2026-07-26',
        faqs: [
            { q: 'Can I merge PDF files without uploading?', a: 'Yes! DocShift prioritizes your privacy. Your files are processed securely without being stored or analyzed by external cloud services.' },
            { q: 'Is there a limit to how many files I can merge?', a: 'You can merge large batches of files simultaneously completely for free, without worrying about premium paywalls.' }
        ]
    },
    { 
        slug: 'split-pdf', name: 'Split PDF', shortDesc: 'Break a PDF into pages.', desc: 'Separate one page or a whole set into independent PDF files.', icon: 'Scissors', category: 'organize', color: '#F05B25', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.zip', outputMime: 'application/zip',
        seoTitle: 'Split PDF Without Uploading Files | Free & Fast',
        seoDesc: 'Split a PDF into multiple files without uploading anything. Break apart pages or extract ranges instantly, 100% processed in your browser.',
        seoKeywords: 'split pdf without uploading files, separate pdf pages private, split pdf by page free, pdf splitter no upload, break pdf into files',
        seoArticle: 'Split a large PDF document into multiple smaller files or extract specific pages entirely for free. Our online splitter is incredibly fast, bypassing slow upload queues by running the tasks securely locally. Once split, you can <a href="/tool/merge-pdf">combine PDF files</a> again or use our tool to <a href="/tool/remove-pages">delete pages from a PDF</a>. If you need fine-grained control over extracting pages, try to <a href="/tool/extract-pages">pull out selected pages</a>.',
        faqs: [
            { q: 'How do I extract specific pages?', a: 'Simply enter the page ranges you want to extract (e.g., "1-3, 5") and click process. We will instantly package the specific pages into a secure download.' },
            { q: 'Are my split PDFs secure?', a: 'Absolutely. We do not retain or read the contents of your PDF files. Your privacy is guaranteed.' }
        ]
    },
    {
        slug: 'remove-pages', name: 'Remove Pages', shortDesc: 'Delete pages from a PDF.', desc: 'Select and permanently remove specific pages from your PDF document. Visual page selector for surgical edits.', icon: 'Trash2', category: 'organize', color: '#F05B25', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf', hasThumbnails: true,
        seoTitle: 'Delete PDF Pages Without Uploading | Free Tool',
        seoDesc: 'Delete pages from a PDF without uploading it anywhere. Not sure whether to delete or extract? Deleting removes pages for good; extracting copies them out.',
        seoKeywords: 'delete pdf pages without uploading, remove vs extract pdf pages, permanently delete pdf pages, private pdf page remover, free pdf page deletion tool',
        seoArticle: 'Remove unwanted pages from your PDF document entirely for free. This visual tool lets you delete specific pages from a PDF quickly and securely without uploading your data. Unlike "split" (which exports pages into new files) or "extract" (which copies pages out), remove-pages surgically deletes the pages you select from the original document, preserving page numbering, headers, and footers for the rest of the file. If you removed the wrong pages, you can easily <a href="/tool/merge-pdf">merge PDF files back</a> to restore them. Looking to pull pages out instead of deleting them? You can <a href="/tool/extract-pages">extract specific pages</a> or <a href="/tool/organize-pdf">adjust the page layout</a> for a cleaner document structure.',
        faqs: [
            { q: 'Does removing a page change the remaining page numbers?', a: 'No. When you delete a page, the other pages retain their original numbers. If you need renumbering, use the <a href="/tool/page-numbers">Add Page Numbers</a> tool afterward.' },
            { q: 'Can I remove multiple non-consecutive pages at once?', a: 'Yes. Tick the thumbnails for any pages you want gone — they do not need to be adjacent.' }
        ]
    },
    {
        slug: 'extract-pages', name: 'Extract Pages', shortDesc: 'Pull out selected pages.', desc: 'Extract specific pages from a PDF into a new document while leaving the original untouched.', icon: 'FolderOpen', category: 'organize', color: '#F05B25', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf', hasThumbnails: true,
        seoTitle: 'Extract Pages from PDF Online | Free & Secure Extraction',
        seoDesc: 'Pull specific pages out of any PDF document completely free. Extract pages securely in your web browser with zero file uploads.',
        seoKeywords: 'extract pages from pdf, pull out pdf pages, online pdf extractor, save selected pages from pdf',
        seoArticle: 'Easily extract pages from any PDF document into a fresh file. This tool is completely free and completely private. It runs fully in your browser, meaning you never upload sensitive files. Unlike <a href="/tool/remove-pages">Remove Pages</a> (which deletes from the source), Extract Pages copies the chosen pages into a brand new PDF while the original stays intact — perfect for sharing just one chapter or section. If you extracted pages to combine them with another file, head over to the <a href="/tool/merge-pdf">secure PDF merger</a>. Alternatively, if your goal is just to cut the file in half, try to <a href="/tool/split-pdf">split your PDF pages</a> into many separate files. You can also <a href="/tool/remove-pages">delete unwanted pages</a> directly.',
        faqs: [
            { q: 'Will the original PDF stay exactly the same?', a: 'Yes. Extract only copies pages out — the source file is not modified, and you can extract the same pages again later if needed.' },
            { q: 'Can I extract pages in any order?', a: 'You can select any set of pages using ranges (e.g. "1, 3-5, 9"). The extracted PDF keeps the order you specify.' }
        ]
    },
    { 
        slug: 'organize-pdf', name: 'Organize PDF', shortDesc: 'Adjust your PDF page layout.', desc: 'Make adjustments to the order and orientation of your PDF pages.', icon: 'LayoutGrid', category: 'organize', color: '#F05B25', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf', hasThumbnails: true,
        seoTitle: 'Adjust PDF Pages Without Uploading | Free Tool',
        seoDesc: 'Make changes to your PDF pages without uploading a single file. Processed entirely in your browser for complete privacy.',
        seoKeywords: 'adjust pdf pages without uploading, organize pdf privately, pdf page tool online free, private pdf organizer',
        seoArticle: 'Make adjustments to your PDF pages without uploading the file to a server — everything happens locally in your browser for complete privacy. If you need to fix page orientation specifically, DocShift\'s dedicated <a href="/tool/rotate-pdf">Rotate PDF</a> tool gives you precise control over rotation. You can also <a href="/tool/remove-pages">permanently delete unwanted pages</a> or <a href="/tool/merge-pdf">combine multiple PDFs</a> using their dedicated tools.',
        updated: '2026-07-26',
        faqs: [
            { q: 'What does Organize PDF do?', a: 'It lets you make adjustments to your PDF pages locally in your browser. For precise page-by-page rotation, use <a href="/tool/rotate-pdf">Rotate PDF</a>; to remove specific pages, use <a href="/tool/remove-pages">Remove Pages</a>.' },
            { q: 'Can I use this on my phone?', a: 'Yes. It works in any mobile browser, with no app to install and nothing uploaded to a server.' }
        ]
    },
    {
        slug: 'scan-to-pdf', name: 'Scan to PDF', shortDesc: 'Turn scans into a PDF.', desc: 'Convert camera scans, JPG, PNG and WebP images into a single searchable, shareable PDF document.', icon: 'ScanLine', category: 'organize', color: '#F05B25', accept: { 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'], 'image/webp': ['.webp'] }, multiple: true, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf',
        seoTitle: 'Scan to PDF Without an App | Free Browser Scanner',
        seoDesc: 'Turn photos, JPG, PNG or WebP scans into a PDF right in your browser — no app to install, no upload, and no account needed. 100% free and private.',
        seoKeywords: 'scan to pdf without an app, scan to pdf online free, convert phone photos to pdf, no app pdf scanner, browser based pdf scanner',
        seoArticle: 'Turn any photo scan, JPG, PNG or WebP image into a cohesive PDF document instantly. Our free tool converts camera scans and image files into a single PDF document locally on your device for unmatched privacy. Scan to PDF preserves EXIF capture timestamps and original image orientation, which makes it ideal for receipts, whiteboards, and multi-page document archives. Need your resulting file to be text-searchable? Use our <a href="/tool/ocr-pdf">OCR PDF tool</a> after converting. It is often necessary to <a href="/tool/compress-pdf">shrink PDF file sizes</a> after combining multiple high-resolution images. You can also explicitly <a href="/tool/jpg-to-pdf">convert images to PDF</a> in batches.',
        faqs: [
            { q: 'What image formats are supported?', a: 'JPG, JPEG, PNG and WebP. You can mix formats in a single batch — they will be merged into one PDF in the order you drop them.' },
            { q: 'Is the original image quality preserved?', a: 'Yes. We embed your images at their original resolution. To reduce file size afterward, run the result through <a href="/tool/compress-pdf">Compress PDF</a>.' }
        ]
    },

    // ── OPTIMIZE ────────────────────────────────────────────────────────────
    { 
        slug: 'compress-pdf', name: 'Compress PDF', shortDesc: 'Shrink PDF file size.', desc: 'Reduce file size while optimizing for maximum quality.', icon: 'Minimize2', category: 'optimize', color: '#F05B25', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf',
        seoTitle: 'Compress PDF in Browser | Reduce PDF File Size Free',
        seoDesc: 'Reduce your PDF file size instantly without uploading. Use our free tool to compress PDF in browser ensuring total privacy.',
        seoKeywords: 'compress pdf in browser no upload, reduce pdf size online, shrink pdf private, optimize pdf size',
        seoArticle: 'Shrink large PDF files to easily share them via email or upload them to portals. Our powerful compression engine helps you compress PDFs in your browser without sacrificing document quality or compromising your privacy constraints. After shrinking your file, you can <a href="/tool/pdf-to-word">convert it to an editable Word DOCX</a> or <a href="/tool/merge-pdf">combine it with other PDFs</a>. If a file is too large to compress, try to <a href="/tool/split-pdf">split the PDF into multiple parts</a> instead.',
        faqs: [
            { q: 'Will compressing my PDF ruin the quality?', a: 'No, our tool optimizes images and removes unnecessary metadata while carefully preserving text crispness and readability.' },
            { q: 'Why compress PDFs without uploading?', a: 'Compressing files natively keeps your sensitive data isolated and secure from third parties, all while completing the process much faster than waiting for giant files to upload to a cloud server.' }
        ]
    },
    {
        slug: 'repair-pdf', name: 'Repair PDF', shortDesc: 'Fix corrupted PDF files.', desc: 'Repair a damaged or corrupt PDF, rebuild its cross-reference table, and recover readable content from broken files.', icon: 'Wrench', category: 'optimize', color: '#F05B25', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf',
        seoTitle: 'Fix "There was an error opening this document"',
        seoDesc: 'Seeing "There was an error opening this document"? Our free tool repairs corrupted PDFs and recovers your content, processed securely in your browser.',
        seoKeywords: 'there was an error opening this document, fix corrupted pdf, repair broken pdf online, recover damaged pdf free, pdf wont open fix',
        seoArticle: 'Repair a damaged PDF and recover critical data from corrupt PDF files automatically with our free recovery engine. It attempts to rebuild internal PDF structures — the xref table, stream dictionaries, and object links — and salvage your content. This is different from <a href="/tool/compress-pdf">Compress PDF</a> (which only optimises a healthy file) and <a href="/tool/unlock-pdf">Unlock PDF</a> (which only removes password restrictions). Repair targets files that refuse to open, display "There was an error opening this document", or show garbled pages. If the file opens but is locked, try our <a href="/tool/unlock-pdf">remove PDF password tool</a>. After your document is fixed, you might want to <a href="/tool/compress-pdf">optimize its size</a> for sharing, or <a href="/tool/pdf-to-pdfa">convert it to PDF/A</a> for long-term safe archiving.',
        faqs: [
            { q: 'What kinds of corruption can this tool fix?', a: 'It rebuilds missing xref tables, recovers orphaned objects, and re-attaches broken stream data. Heavily truncated files may still lose pages.' },
            { q: 'Is there a difference between "repair" and "unlock"?', a: 'Yes. Repair fixes structural damage inside the file; Unlock only removes owner/user passwords from an otherwise valid PDF.' }
        ]
    },
    { 
        slug: 'ocr-pdf', name: 'OCR PDF', shortDesc: 'Extract text from scanned PDFs.', desc: 'Run text recognition on scanned image PDFs and extract all readable text.', icon: 'ScanText', category: 'optimize', color: '#F05B25', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.txt', outputMime: 'text/plain',
        seoTitle: 'OCR PDF Online | Make PDF Text Searchable Free',
        seoDesc: 'Run Optical Character Recognition (OCR) on scanned PDFs to make text fully searchable and selectable without uploading files.',
        seoKeywords: 'ocr pdf online, make pdf searchable, convert scan to text, text recognition pdf free',
        seoArticle: 'Convert scanned image PDFs into fully searchable and selectable text documents securely. Our OCR engine runs directly inside your browser, turning invisible image text into highly accurate selectable metadata. If you\'d rather extract all that text into a document editor, try to <a href="/tool/pdf-to-word">convert PDF to editable Word</a>. Have raw photos? First <a href="/tool/scan-to-pdf">create a PDF from your scans</a>, then run OCR, or <a href="/tool/translate-pdf">translate the PDF text</a> after recognition.',
        faqs: [
            { q: 'How do I make a scanned PDF searchable?', a: 'OCR reads the text in your scanned pages and adds a selectable text layer, turning image-only PDFs into searchable, copyable documents.' },
            { q: 'Is the OCR free and private?', a: 'Yes. Text recognition runs in your browser with no upload and no watermark on the result.' },
            { q: 'Which languages does the OCR support?', a: 'It recognizes standard Latin-script languages like English and most European languages. After OCR you can <a href="/tool/translate-pdf">translate the text</a>.' }
        ]
    },

    // ── CONVERT TO PDF ──────────────────────────────────────────────────────
    { 
        slug: 'jpg-to-pdf', name: 'JPG to PDF', shortDesc: 'Convert images to PDF.', desc: 'Convert JPG and PNG images to PDF with adjustable orientation and margins.', icon: 'Images', category: 'convertTo', color: '#F05B25', accept: { 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'] }, multiple: true, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf',
        seoTitle: 'Combine JPG to PDF Without Uploading | Free Tool',
        seoDesc: 'Combine JPG and PNG images into one PDF without uploading your photos anywhere. Free, fast, and 100% processed locally in your browser.',
        seoKeywords: 'combine jpg to pdf without uploading, jpg to pdf converter private, merge images into pdf free, png to pdf no upload, photos to pdf secure',
        seoArticle: '<p>JPG to PDF combines your JPG, JPEG, or PNG photos into a single PDF, giving each image its own page sized to match that image\'s exact pixel dimensions. Because the page is built around the photo instead of forcing every image into one fixed template, a wide landscape shot and a tall portrait can sit in the same document without either one being stretched, cropped, or shrunk down to fit. That makes it a quick way to turn a folder of scanned receipts, screenshots, or event photos into a single file instead of sending a dozen separate attachments, and the resulting pages stay at the resolution the photos already had — nothing is downscaled in the process.</p><p>Add up to 50 images in a single run, and they land in the PDF in the same order they were selected — there\'s no drag-and-drop step for reordering pages inside the tool itself, so it helps to pick files from your file browser in the sequence you want them to appear before you start the conversion. Mixing JPG and PNG files in one batch is fine; each one still gets its own full page. Once the finished PDF comes back, the copies uploaded for the conversion are removed from the server, so nothing lingers afterward.</p><p>If the finished PDF ends up larger than you\'d like to attach to an email, run it through <a href="/tool/compress-pdf">Compress PDF</a> afterward to shrink the file size. Need to go the other direction and pull images back out of an existing document instead? <a href="/tool/pdf-to-jpg">PDF to JPG</a> exports each page as its own image, and <a href="/tool/scan-to-pdf">Scan to PDF</a> is the faster route when you\'re starting from a phone camera rather than files already saved on your device.</p>',
        steps: [
            'Drop your JPG, JPEG, or PNG images onto the workspace, or click to browse — add as many as you need in one go (up to 50).',
            'Files convert in the order they were added, so pick them from your file browser in the sequence you want the pages to appear.',
            'Made a mistake? Remove any file from the list with its trash icon before you convert.',
            'Click <strong>Process JPG to PDF</strong> to build the PDF.',
            'Download the finished file — each photo lands on its own page at its original resolution.'
        ],
        faqs: [
            { q: 'How do I convert JPG to PDF without losing quality?', a: 'Each image is placed on its own page at that image\'s original pixel dimensions, so nothing is stretched or scaled down. If the resulting PDF is too large to share, run it through <a href="/tool/compress-pdf">Compress PDF</a> afterward.' },
            { q: 'Can I combine multiple JPG or PNG images into one PDF?', a: 'Yes. Select or drop several JPG, JPEG, or PNG files together (up to 50) and they combine into a single PDF in the order you added them. There\'s no separate reorder step, so arrange your file selection before converting.' },
            { q: 'Can I convert JPG to PDF on my phone?', a: 'Yes. Open the tool in your phone\'s browser, pick photos from your camera roll or files app, and download the finished PDF when it\'s ready — no app to install.' },
            { q: 'Will my images be resized to fit a standard page size?', a: 'No. Each image becomes its own page sized to that image\'s exact dimensions, rather than being placed on a fixed page size like A4 or Letter.' }
        ]
    },
    { 
        slug: 'word-to-pdf', name: 'Word to PDF', shortDesc: 'Convert DOCX files to PDF.', desc: 'Make DOC and DOCX files easy to read by converting them to PDF.', icon: 'FileText', category: 'convertTo', color: '#F05B25', accept: { 'application/msword': ['.doc'], 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf',
        seoTitle: 'Word to PDF Without Uploading | Free DOCX Converter',
        seoDesc: 'Convert Word DOC and DOCX files to PDF without uploading your document to any server. Free, fast, and processed securely in your browser.',
        seoKeywords: 'word to pdf without uploading, convert docx to pdf private, doc to pdf secure, free word to pdf converter, protect document privacy pdf',
        seoArticle: '<p>Word to PDF converts a DOC or DOCX file into a PDF by rendering it through LibreOffice\'s document engine, the same kind of layout pass a word processor runs when it opens the file, so fonts, spacing, and page breaks carry over instead of being roughly approximated. That matters most for anything meant to look identical no matter who opens it — a resume, a contract, a report — since a PDF locks the layout in place while a Word file can still reflow depending on the software and font set the next person has installed.</p><p>Because the conversion renders the actual document rather than pulling out raw text, headings, bullet lists, tables, and embedded images typically come through looking like the source file. The two edge cases worth knowing about are fonts that aren\'t installed on the conversion server, which get swapped for a close substitute the same way Word itself would handle a missing font, and unusually complex embedded objects such as linked spreadsheets, which can occasionally shift slightly in the output. Both the older .doc format and modern .docx go through the same engine, one document per run, and the file you upload is removed from the server the moment the converted PDF is ready to download.</p><p>Once you have a PDF copy of a document, it\'s easy to <a href="/tool/protect-pdf">lock it with a password</a> before sending it somewhere sensitive, or <a href="/tool/sign-pdf">add a signature</a> if it\'s ready to be signed off. Need to go back the other way later? <a href="/tool/pdf-to-word">Convert the PDF back into an editable Word document</a> any time you need to make further changes.</p>',
        steps: [
            'Add your <strong>.doc</strong> or <strong>.docx</strong> file — drag it in or click to browse (one document per conversion).',
            'Click <strong>Process Word to PDF</strong> to send it through the LibreOffice rendering engine.',
            'Wait while your document\'s fonts, spacing, and page breaks are rebuilt as a PDF.',
            'Download the finished PDF, or click <strong>Process Another</strong> to convert a different file.'
        ],
        faqs: [
            { q: 'How do I convert Word to PDF without losing formatting?', a: 'Word to PDF renders your DOC or DOCX through LibreOffice\'s own document engine, so fonts, spacing, and page breaks carry over for the vast majority of documents. Only an uninstalled font or an unusual embedded object is likely to shift slightly.' },
            { q: 'Can I convert a .doc file, or only .docx?', a: 'Both. The legacy .doc format and modern .docx go through the same LibreOffice conversion, so either one works.' },
            { q: 'Can I protect the PDF after converting?', a: 'Yes. Once you have the PDF, run it through <a href="/tool/protect-pdf">Protect PDF</a> to add a password before sharing it.' },
            { q: 'Why does a linked spreadsheet or chart look different after converting?', a: 'Complex embedded objects, like a table linked to another file, are the one case where LibreOffice\'s rendering can diverge slightly from Word\'s own. Plain text, images, and standard tables convert cleanly.' }
        ]
    },
    { 
        slug: 'pptx-to-pdf', name: 'PowerPoint to PDF', shortDesc: 'Convert presentations to PDF.', desc: 'Make PPT and PPTX slideshows easy to view by converting them to PDF.', icon: 'Presentation', category: 'convertTo', color: '#F05B25', accept: { 'application/vnd.ms-powerpoint': ['.ppt'], 'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf',
        seoTitle: 'PowerPoint to PDF Without Uploading | Free Tool',
        seoDesc: 'Convert PPT and PPTX slideshows to PDF without uploading your presentation anywhere. Free, secure, and processed entirely in your browser.',
        seoKeywords: 'powerpoint to pdf without uploading, convert pptx to pdf private, ppt to pdf secure free, protect presentation privacy pdf, slideshow to pdf converter',
        seoArticle: '<p>PowerPoint to PDF converts a PPT or PPTX slide deck into a PDF through LibreOffice\'s presentation engine, turning each slide into exactly one page of the output at its original layout, backgrounds, and fonts.</p><p>That one-slide-per-page structure makes a deck viewable and printable for anyone, even without PowerPoint or Keynote installed, since a PDF viewer is already built into practically every phone, tablet, and computer — handy for sending a deck to a client or forwarding handouts before a meeting. The slide\'s actual content is what gets rendered, not just a text dump of the bullet points, so images and font choices generally look like the original file. The thing that doesn\'t survive is motion: slide transitions, build animations, and any embedded video or audio playback don\'t exist on a static PDF page, so a deck that leans on movement to make its point will read flatter once it\'s a fixed document. An unusual font not present on our servers is the other edge case — it gets swapped for a lookalike, the same fallback any presentation software applies when a font is missing.</p><p>Only one presentation converts per run, accepting both the older .ppt format and modern .pptx through the same engine, and the deck is cleared off the server once your PDF is ready. Once you have a PDF version, <a href="/tool/add-watermark">stamp a watermark</a> across a draft before circulating it, or <a href="/tool/merge-pdf">merge it with other PDFs</a> into a single packet for reviewers. Need the reverse direction instead? <a href="/tool/pdf-to-pptx">Convert a PDF back into editable slides</a> at any time.</p>',
        steps: [
            'Select your <strong>.ppt</strong> or <strong>.pptx</strong> deck from your files, or drop it straight onto the tool — one presentation per conversion.',
            'Click <strong>Process PowerPoint to PDF</strong> to render every slide.',
            'Wait while each slide is rebuilt as its own PDF page, backgrounds and fonts included.',
            'Download the finished PDF — ready to view, print, or share with anyone, even without PowerPoint installed.'
        ],
        faqs: [
            { q: 'Does converting PPTX to PDF keep my slide layout?', a: 'Yes. PowerPoint to PDF renders each slide through LibreOffice\'s presentation engine, so layout, images, and fonts carry over — one slide becomes exactly one PDF page.' },
            { q: 'Will my slide transitions or animations show up in the PDF?', a: 'No. A PDF page is static, so build animations, slide transitions, and any embedded video or audio playback don\'t carry over — only the final look of each slide does.' },
            { q: 'How do I convert a PowerPoint to PDF for free?', a: 'Add your PPT or PPTX file, click Process PowerPoint to PDF, and download the result — no signup, and the file is cleared from the server once your PDF is ready.' },
            { q: 'Does it work with the older .ppt format?', a: 'Yes. Both .ppt and .pptx are accepted and converted through the same engine.' }
        ]
    },
    { 
        slug: 'excel-to-pdf', name: 'Excel to PDF', shortDesc: 'Convert spreadsheets to PDF.', desc: 'Make Excel spreadsheets easy to read by converting them to PDF format.', icon: 'Table', category: 'convertTo', color: '#F05B25', accept: { 'application/vnd.ms-excel': ['.xls'], 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf',
        seoTitle: 'Excel to PDF Without Uploading | Free Converter',
        seoDesc: 'Convert Excel spreadsheets to PDF without uploading your financial data anywhere. Fast, free, and 100% processed locally in your browser.',
        seoKeywords: 'excel to pdf without uploading, convert xlsx to pdf private, secure financial spreadsheet to pdf, xls to pdf free, protect financial data pdf',
        seoArticle: '<p>Excel to PDF turns an XLS or XLSX spreadsheet into a fixed PDF layout using LibreOffice\'s spreadsheet engine, so an invoice, payroll sheet, or financial statement arrives looking the same on every screen instead of as an editable file someone downstream could reflow or accidentally change.</p><p>A spreadsheet\'s on-screen appearance depends on the column widths, zoom level, and print settings of whoever opens it, so handing someone the raw XLS or XLSX file means the same numbers can print differently depending on their setup. Converting to PDF locks in whatever print area and page layout the workbook already had, so a statement keeps its columns, totals, and formatting intact rather than reflowing sheet by sheet on a colleague\'s machine. The one case where the output can look different from what Excel itself would produce is a sheet that never had a print area defined — LibreOffice makes its own pagination choices there, which occasionally spreads a wide sheet across more pages than expected. Only one workbook converts per run, both the older .xls format and modern .xlsx are accepted, and the uploaded file is deleted from the server as soon as the PDF is generated — nothing about it is stored or kept afterward.</p><p>Need the data back in spreadsheet form later, say to update last quarter\'s numbers? <a href="/tool/pdf-to-excel">Convert the PDF back to an editable spreadsheet</a>. Before sending a finished statement somewhere sensitive, consider <a href="/tool/protect-pdf">locking it with a password</a> first, or <a href="/tool/redact-pdf">blacking out specific figures</a> if only part of the sheet should be shared.</p>',
        steps: [
            'Bring in your <strong>.xls</strong> or <strong>.xlsx</strong> workbook by dropping it on the tool, or pick it from your files — one workbook per conversion.',
            'Click <strong>Process Excel to PDF</strong> and LibreOffice\'s spreadsheet engine takes over the conversion.',
            'Wait while your sheet\'s print area, columns, and formatting are rebuilt as a fixed PDF layout.',
            'Download the finished PDF — the uploaded workbook is removed from the server as soon as it\'s ready.'
        ],
        faqs: [
            { q: 'How do I convert Excel to PDF without losing columns?', a: 'Excel to PDF follows whatever print area and page setup was already configured in your workbook, so columns and totals keep their layout instead of reflowing.' },
            { q: 'Why did my spreadsheet split across so many pages?', a: 'If the sheet never had a print area defined, LibreOffice makes its own pagination choices, which can spread a wide sheet across more pages than Excel would have used. Setting a print area in the source file before converting gives you more control.' },
            { q: 'Can I hide sensitive cells before converting?', a: 'Remove or clear confidential cells in the spreadsheet before converting, or <a href="/tool/redact-pdf">redact the PDF</a> afterward to black out specific figures.' },
            { q: 'Does it work with the older .xls format?', a: 'Yes. Both .xls and modern .xlsx go through the same conversion engine.' }
        ]
    },
    { 
        slug: 'html-to-pdf', name: 'HTML to PDF', shortDesc: 'Convert any webpage to PDF.', desc: 'Convert webpages to PDF by entering a URL. Preserves layout and styles.', icon: 'Globe', category: 'convertTo', color: '#F05B25', accept: null, multiple: false, minFiles: 0, urlInput: true, outputExt: '.pdf', outputMime: 'application/pdf',
        seoTitle: 'URL to PDF Converter Free | Save Any Webpage as PDF',
        seoDesc: 'Convert any public webpage or HTML page to a pixel-perfect PDF by pasting its URL. Free, fast, and processed securely without uploading anything.',
        seoKeywords: 'url to pdf converter, webpage to pdf online free, save website as pdf, convert html url to pdf, capture webpage as pdf',
        seoArticle: '<p>HTML to PDF fetches any public webpage and renders it with a real headless Chrome browser, then prints that render to a PDF using the page\'s print stylesheet — the same output you\'d get by opening the page yourself and choosing Print.</p><p>Because the page loads exactly the way it would for any anonymous visitor, content that requires being signed in — a paywalled article, an account dashboard, anything behind a login wall — won\'t come through; there\'s no cookie or credential handling, so the capture only ever shows what a logged-out visitor sees. Video streams, live audio, and websocket-driven widgets are also skipped during capture, since they don\'t make sense on a static page anyway, and only public http:// and https:// addresses are accepted — no internal networks, local files, or other protocols. The page gets a short settle period after it finishes loading before the PDF is captured, so most images appear normally, but content that only fetches once a script detects you\'ve scrolled to it can load too late and end up missing. Long, scrolling pages aren\'t squeezed onto one sheet — they\'re paginated across as many A4 pages as the content needs, the same way a browser\'s own Print function would split them. Simple, mostly-text pages convert the fastest and most reliably; a very heavy, media-rich page is more likely to time out before it finishes rendering.</p><p>Once you have the PDF, you may want to <a href="/tool/compress-pdf">shrink the file size</a> if the page was image-heavy, <a href="/tool/pdf-to-jpg">save individual pages as images</a>, or <a href="/tool/crop-pdf">trim away extra margins</a> the print layout left behind.</p>',
        steps: [
            'Paste a public webpage\'s URL — starting with <strong>http://</strong> or <strong>https://</strong> — into the Website URL field.',
            'Click <strong>Process HTML to PDF</strong> to load the page in a real headless browser.',
            'Wait while the page\'s print stylesheet is applied and the layout is captured.',
            'Download the finished PDF — long pages arrive split across multiple A4 pages, the way a normal browser print would.',
            'Only public pages work — anything behind a login, paywall, or on a private network can\'t be captured.'
        ],
        faqs: [
            { q: 'Can this capture a page that\'s behind a login or paywall?', a: 'No. The page loads the same way it would for a logged-out visitor, with no way to sign in first — so paywalled articles, account dashboards, or anything else that needs authentication show whatever a visitor without an account sees, not the content behind it.' },
            { q: 'Will lazy-loaded images show up in the PDF?', a: 'Most do — the tool waits for the page to finish loading plus a short settle period before capturing it. Images that only start loading when a script detects you\'ve scrolled to them may load too late and can be missing, since the page is never scrolled during capture.' },
            { q: 'Does a long, scrolling webpage become one giant page or multiple pages?', a: 'Multiple pages. The capture is paginated into standard A4-sized pages, the same way a browser splits a long page when you use its own Print function, rather than producing one continuous strip.' },
            { q: 'Does the PDF use the site\'s print layout or its normal browsing layout?', a: 'Its print layout. The page is rendered using the site\'s print stylesheet, the same one that applies when you print the page from your own browser — so a site that hides navigation, ads, or buttons for printing produces a cleaner PDF, while a site with no print-specific styles just keeps its regular design.' },
            { q: 'Can I convert a localhost, staging, or internal company URL?', a: 'No. Only public <strong>http://</strong> and <strong>https://</strong> addresses are accepted; local, private-network, and internal addresses are blocked, so an internal staging site or a page on your own machine can\'t be captured this way.' }
        ]
    },

    // ── CONVERT FROM PDF ────────────────────────────────────────────────────
    { 
        slug: 'pdf-to-jpg', name: 'PDF to JPG', shortDesc: 'Export PDF pages as images.', desc: 'Convert each PDF page into a JPG image or extract all embedded images.', icon: 'Image', category: 'convertFrom', color: '#F05B25', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.zip', outputMime: 'application/zip',
        seoTitle: 'PDF to JPG Without Uploading | High Resolution',
        seoDesc: 'Convert PDF pages to high-resolution JPG images without uploading your file anywhere. Free, fast, and processed securely in your browser.',
        seoKeywords: 'pdf to jpg without uploading, high resolution pdf to jpg, convert pdf to image private, extract images from pdf free, pdf page to picture',
        seoArticle: '<p>PDF to JPG turns every page of a PDF into its own image file, rendering each one at 150 DPI so text and graphics stay sharp on screen and in everyday printing. Pick JPG, PNG, or WEBP as the output format before you convert — JPG keeps the file size small, PNG holds up better for crisp text and line art, and WEBP splits the difference at a smaller size than either. Leave the format untouched and you get a standard JPG at 85% quality, which is plenty for sharing or printing without producing a bloated file.</p><p>A single-page PDF comes back as one image file ready to save immediately. Anything longer is packaged into a ZIP holding one numbered image per page, so a forty-page report becomes page-1.jpg through page-40.jpg in a single download instead of forty separate saves. Pull out the pages you actually need first with <a href="/tool/extract-pages">our page extractor</a> if you only want images of a handful of pages rather than the whole document — it saves you from unzipping a folder just to find the two pages you wanted. It doesn\'t matter whether the source pages are typed text or scanned images either, since this tool renders whatever is visually on the page rather than reading text out of it.</p><p>From there, <a href="/tool/jpg-to-pdf">rebuild a new PDF from a set of JPGs</a> any time you need to, or run a live webpage through <a href="/tool/html-to-pdf">our URL-to-PDF converter</a> first if the source material starts out as a page rather than a file you already have saved.</p>',
        steps: [
            'Open <strong>PDF to JPG</strong> and add the one PDF you want turned into images — drag and drop or click to browse.',
            'Pick an output format — <strong>JPG</strong>, <strong>PNG</strong>, or <strong>WEBP</strong> — before you convert.',
            'Click <strong>Process PDF to JPG</strong> to render every page at 150 DPI.',
            'A single-page PDF downloads as one image; a multi-page PDF downloads as a <strong>ZIP</strong> of page-1, page-2, and so on.',
            'Unzip if needed and use the images anywhere — email, slides, or printing.'
        ],
        faqs: [
            { q: 'How do I convert each page of a PDF into a separate JPG?', a: 'Upload your PDF and DocShift renders every page as its own image — JPG by default, or PNG/WEBP if you pick one — ready to download individually or as a ZIP for multi-page files.' },
            { q: 'Do I get one file, or one image per page?', a: 'A single-page PDF downloads as a single image file. Anything with more than one page comes back as a ZIP containing one numbered image per page.' },
            { q: 'What resolution are the exported images?', a: 'Each page renders at 150 DPI, which holds up well on screen and for everyday printing. Larger or longer PDFs simply take a little longer to process.' },
            { q: 'Can I get PNG or WEBP instead of JPG?', a: 'Yes. Choose PNG, JPG, or WEBP before converting — PNG suits crisp text and line art, JPG keeps photos smaller, and WEBP sits in between.' },
            { q: 'Does it matter if my PDF is scanned or typed text?', a: 'No. This tool renders whatever is visually on the page into an image, so scanned and text-based PDFs convert the same way — unlike <a href="/tool/pdf-to-word">PDF to Word</a> or <a href="/tool/pdf-to-excel">PDF to Excel</a>, which need a real text layer underneath to work with.' }
        ]
    },
    { 
        slug: 'pdf-to-word', name: 'PDF to Word', shortDesc: 'Convert PDF to editable DOCX.', desc: 'Easily convert PDF files into editable DOC and DOCX documents.', icon: 'FileOutput', category: 'convertFrom', color: '#F05B25', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.docx', outputMime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        seoTitle: 'PDF to Word Without Uploading | Free DOCX Converter',
        seoDesc: 'Convert PDF to editable Word DOCX without uploading your document to any server. Free, accurate, and processed securely in your browser.',
        seoKeywords: 'pdf to word without uploading, convert pdf to docx private, editable pdf to word free, secure pdf to word converter, pdf text extraction private',
        seoArticle: '<p>PDF to Word turns a text-based PDF into an editable .docx file by reading the document\'s paragraphs, fonts, and tables with Python\'s pdf2docx engine and rebuilding that same structure as native Word elements you can click into and change.</p><p>Because pdf2docx works from the text and layout already inside the PDF, results are strongest on documents that started out digital — reports, contracts, exported slides, anything typed rather than photographed. Paragraph breaks, fonts, and table grids carry over with only minor cleanup on files like that, and a table with a clear grid usually lands as a real, editable Word table rather than a block of loose text. Multi-column layouts and unusually dense pages are the ones most likely to need a manual nudge afterward, since a PDF has no reflow information for pdf2docx to fall back on. Scanned or photographed pages are a different story: underneath the picture there\'s no real text for pdf2docx to read at all, so it has nothing to rebuild. Run <a href="/tool/ocr-pdf">OCR PDF</a> first to pull the words out separately, then treat that as your starting point rather than expecting a fully formatted document to fall out the other side.</p><p>The output is a standard .docx file that opens fine in Microsoft Word, Google Docs, or LibreOffice Writer — no separate app or plugin needed on your end beyond whichever of those you already use. Once you\'ve cleaned it up, <a href="/tool/word-to-pdf">convert it back into a PDF</a> to share a locked-down copy again, or skip the round trip entirely and make small text changes with our <a href="/tool/edit-pdf">in-browser PDF editor</a> instead.</p>',
        steps: [
            'Open <strong>PDF to Word</strong> and add the PDF you want converted — drag it in or click to browse.',
            'Click <strong>Process PDF to Word</strong>. DocShift runs Python\'s pdf2docx engine to rebuild paragraphs, fonts, and tables as a native <strong>.docx</strong> file.',
            'Download the Word document and open it in Microsoft Word, Google Docs, or LibreOffice Writer.',
            'Check tables and multi-column sections first — reflow-heavy layouts occasionally need a small manual fix.',
            'If a page comes back blank, it\'s likely scanned — run <strong>OCR PDF</strong> on it first, since pdf2docx can only rebuild text that already exists in the file.'
        ],
        faqs: [
            { q: 'Can I convert PDF to Word for free without signup?', a: 'Yes. Upload your PDF and download an editable Word document — free, with no email, account, or watermark.' },
            { q: 'Why does my PDF to Word conversion lose some formatting?', a: 'Multi-column layouts and borderless tables can shift a little because a PDF doesn\'t store reflow information the way Word does. DocShift\'s pdf2docx engine rebuilds paragraphs, fonts, and table grids as closely as the page layout allows.' },
            { q: 'Can I convert a scanned PDF to editable Word?', a: 'No — a scanned or photographed page is just an image, with no underlying text for pdf2docx to read. Run <a href="/tool/ocr-pdf">OCR PDF</a> first to pull the text out, then treat that as your starting point.' },
            { q: 'Will my tables come out as real, editable Word tables?', a: 'Where the PDF has a clear table grid, pdf2docx typically rebuilds it as an actual Word table you can edit cell by cell. Tables with merged cells or unusual spacing may need a bit of manual cleanup afterward.' },
            { q: 'Do I get a .doc or a .docx file?', a: 'A .docx file — the modern Word format, which opens directly in Word 2007 and later, Google Docs, and LibreOffice Writer.' }
        ]
    },
    { 
        slug: 'pdf-to-pptx', name: 'PDF to PowerPoint', shortDesc: 'Turn PDFs into slide decks.', desc: 'Turn your PDF files into easy to edit PPT and PPTX slideshows.', icon: 'MonitorPlay', category: 'convertFrom', color: '#F05B25', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pptx', outputMime: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        seoTitle: 'Convert PDF to PowerPoint (PPTX) | Slideshow Generator Free',
        seoDesc: 'Turn your PDF documents into easy-to-edit PPTX slideshow presentations. Free secure conversion done on your device entirely.',
        seoKeywords: 'pdf to powerpoint converter, convert pdf to pptx online, free pdf to slide deck private, editable pdf to ppt',
        seoArticle: '<p>PDF to PowerPoint runs your PDF through LibreOffice\'s presentation import filter and hands back one slide per page as a standard .pptx file, ready to open in PowerPoint, Google Slides, or LibreOffice Impress.</p><p>How much of each slide you can actually edit afterward depends on the PDF you start with. A deck originally exported from PowerPoint, Keynote, or Google Slides tends to bring its text boxes and shapes across as separate, editable objects, since that structure is still sitting in the PDF for the importer to find. A heavily designed layout, an infographic, or a scanned page is more likely to land on the slide as a single flattened image instead — the importer can only preserve text and shapes that are genuinely there, it can\'t invent editable objects out of a picture. Run <a href="/tool/ocr-pdf">OCR PDF</a> first if you need the words on a scanned page to be selectable text rather than part of an image — keep in mind that step only pulls the text out separately, it doesn\'t hand you back an editable slide on its own.</p><p>Every page in the source PDF converts in one pass and lands in the deck in its original order, so there\'s no need to split a long document into batches first. Once you have the .pptx, reorder or restyle the slides in your presentation software, then <a href="/tool/pptx-to-pdf">flatten the finished deck back into a PDF</a> for sharing. Need images of individual pages instead of an editable deck? <a href="/tool/pdf-to-jpg">Export them as JPGs</a> in one step rather than converting to slides at all.</p>',
        steps: [
            'Open <strong>PDF to PowerPoint</strong> and upload the PDF you\'d like turned into a slide deck.',
            'Click <strong>Process PDF to PowerPoint</strong> — DocShift runs LibreOffice\'s PDF import filter and returns one slide per page.',
            'Download the <strong>.pptx</strong> file and open it in PowerPoint, Google Slides, or LibreOffice Impress.',
            'Click into the slide content to see what came across as editable text versus a flattened image — this depends on the source PDF.',
            'Reorder, restyle, or delete slides as needed, then save.'
        ],
        faqs: [
            { q: 'Does each PDF page become its own slide?', a: 'Yes. Pages map to slides one-to-one, so a 12-page PDF becomes a 12-slide deck, in the same order as the original document.' },
            { q: 'Will the text on each slide be editable, or is it just an image?', a: 'It depends on the source PDF. Decks exported from PowerPoint or similar software tend to keep their text as editable objects; scanned pages or heavily designed layouts are more likely to come through as a single flattened image per slide, since there\'s no real text underneath to preserve.' },
            { q: 'What happens if I convert a scanned PDF?', a: 'It still becomes a deck — one slide per page — just with each page as an image rather than editable text. Run <a href="/tool/ocr-pdf">OCR PDF</a> first if you need to work with the actual words instead.' },
            { q: 'Do I need PowerPoint installed to use this?', a: 'No. Conversion happens on our end without any presentation software of yours involved — you\'ll just need PowerPoint, Google Slides, or another app afterward to open and edit the .pptx.' },
            { q: 'Can I convert a long PDF into one deck in a single pass?', a: 'Yes. The whole file converts in one step, and every page lands in the same .pptx in its original order.' }
        ]
    },
    { 
        slug: 'pdf-to-excel', name: 'PDF to Excel', shortDesc: 'Extract PDF tables to XLSX.', desc: 'Pull data straight from PDFs into Excel spreadsheets in seconds.', icon: 'Sheet', category: 'convertFrom', color: '#F05B25', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.xlsx', outputMime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        seoTitle: 'Convert PDF to Excel (XLSX) | Extract Tables Free',
        seoDesc: 'Pull table data straight from PDFs into Excel spreadsheets. Instant, secure, and private PDF to XLSX conversion online.',
        seoKeywords: 'pdf to excel converter online, convert pdf tables to xlsx, free spreadsheet extractor, pull data to excel private',
        seoArticle: '<p>PDF to Excel pulls the text out of your PDF and lines it up into columns wherever it finds gaps of two or more spaces between values, then hands back a spreadsheet file that opens directly in Excel, Google Sheets, or Numbers.</p><p>This works best on simple, evenly spaced tables — invoices, price lists, plain data grids — where each column has clear whitespace around it rather than a hairline border doing the separating. Tables with merged cells, multi-line entries, or columns crammed close together can end up split in the wrong place, since the tool is guessing at structure from spacing rather than reading an actual table grid — PDFs don\'t store one for it to read in the first place. It\'s worth a quick scan of the result before you build a report on top of it. Because the tool reads an existing text layer rather than the picture of a page, a scanned or photographed document needs <a href="/tool/ocr-pdf">OCR run on it first</a> — there\'s no text to line up otherwise, and you\'ll get an empty file back instead of a spreadsheet.</p><p>Once your data\'s in spreadsheet form, clean up any misaligned columns and get to work, or <a href="/tool/excel-to-pdf">convert it back to PDF</a> later if you need to share it as a document again. Don\'t expect original formulas, cell colors, or multiple tabs to survive the trip — a PDF never had any of those to begin with, so there\'s nothing here to carry over. Only need the running words rather than a grid? <a href="/tool/pdf-to-word">PDF to Word</a> keeps paragraphs as paragraphs instead of forcing everything into columns.</p>',
        steps: [
            'Open <strong>PDF to Excel</strong> and add the PDF that holds the table or data you need.',
            'Click <strong>Process PDF to Excel</strong> — DocShift extracts the text and lines it up into columns wherever it finds two or more spaces in a row.',
            'Download the spreadsheet file and open it in Excel, Google Sheets, or Numbers.',
            'Scan the result for misaligned columns, especially around merged cells or multi-line entries, and adjust by hand where needed.',
            'If the source PDF is scanned rather than typed, run <strong>OCR PDF</strong> first — there\'s no text layer here to extract otherwise.'
        ],
        faqs: [
            { q: 'How do I extract a table from PDF to Excel?', a: 'Upload the PDF and DocShift extracts its text, then splits each line into columns wherever it finds two or more spaces in a row, exporting the result as a spreadsheet file.' },
            { q: 'Why are some columns misaligned or merged together?', a: 'The converter guesses column breaks from whitespace, since a PDF doesn\'t store an actual table grid to read. Tight column spacing, merged cells, or multi-line entries can throw that guess off — check the result and adjust by hand where needed.' },
            { q: 'Will formulas, cell formatting, or multiple sheets carry over?', a: 'No. You\'ll get a single sheet of extracted data with no original formulas or styling, because a PDF never stored any of that to begin with.' },
            { q: 'What happens if I upload a scanned PDF?', a: 'You\'ll get back an empty or near-empty file. The extractor can only pull text the PDF already contains — a scanned page is a picture with nothing for it to read, so run <a href="/tool/ocr-pdf">OCR PDF</a> first to create a text layer.' },
            { q: 'Can I convert several PDFs into one spreadsheet at once?', a: 'No — one PDF per run. Convert them one at a time and combine the resulting spreadsheets yourself if you need everything in a single file.' }
        ]
    },
    {
        slug: 'pdf-to-pdfa', name: 'PDF to PDF/A', shortDesc: 'Convert to archival PDF format.', desc: 'Transform your PDF to PDF/A, the ISO-standardized version for long-term, regulation-compliant archiving.', icon: 'Archive', category: 'convertFrom', color: '#F05B25', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf',
        seoTitle: 'PDF to PDF/A Converter | Court E-Filing Compliant',
        seoDesc: 'Convert PDF to PDF/A, the ISO archival format required for court e-filing and long-term document compliance — free, private, and browser-based.',
        seoKeywords: 'pdf to pdf/a converter, court e-filing pdf format, iso archival pdf, long term pdf archiving, pdf/a compliance tool',
        seoArticle: '<p>PDF to PDF/A rebuilds your document in the PDF/A archival format built for long-term storage, running it through a conversion pass that embeds every font directly in the file and standardizes its color to a consistent RGB profile.</p><p>That matters because an ordinary PDF can quietly depend on fonts, color profiles, or other resources living outside the file itself — fine today, but a real risk if you need the same document to open reliably ten or twenty years from now, or need to hand a self-contained file to an archive or e-filing system that expects one. This is why archives, libraries, and e-filing systems tend to ask for PDF/A specifically instead of an ordinary PDF: the format exists so a document doesn\'t quietly break as software and font libraries move on over the years. The conversion here favors finishing over perfection: content that can\'t be made compliant is dropped from the output rather than causing the whole job to fail, so it always completes, but that also means it\'s worth opening the result afterward and checking that everything you expected actually made it through rather than assuming a perfect match by default.</p><p>Embedding every font tends to add a little to the file size, so run <a href="/tool/compress-pdf">Compress PDF</a> afterward if that matters for your storage or upload limits. For records that also need to hold up legally rather than just structurally, <a href="/tool/sign-pdf">add a digital signature</a> and <a href="/tool/protect-pdf">lock the file with a password</a> once the archival copy looks right — PDF/A by itself only standardizes the format, it doesn\'t add either of those.</p>',
        steps: [
            'Open <strong>PDF to PDF/A</strong> and add the PDF you need in an archival-ready format.',
            'Click <strong>Process PDF to PDF/A</strong> — DocShift runs it through a conversion pass that embeds fonts and standardizes the color profile.',
            'Download the result and open it to confirm the layout, fonts, and images all came through the way you expected.',
            'If the file grew noticeably larger, run it through <strong>Compress PDF</strong> to bring the size back down.',
            'Store the converted file as your long-term archival copy — it\'s now self-contained and doesn\'t lean on external fonts or profiles.'
        ],
        faqs: [
            { q: 'Does this guarantee full PDF/A compliance?', a: 'It runs your file through a Ghostscript conversion pass that embeds fonts and standardizes color for long-term compatibility, but there\'s no separate validation step afterward. For strict requirements, open the result and check it, or run it through a dedicated PDF/A validator.' },
            { q: 'Will PDF/A be larger than my original PDF?', a: 'Usually a little, since every font gets embedded directly in the file rather than left for the reader\'s device to supply. Run the result through <a href="/tool/compress-pdf">Compress PDF</a> if you need the size back down.' },
            { q: 'What happens to content that can\'t be made PDF/A-compliant?', a: 'It\'s dropped from the output rather than causing the whole conversion to fail, so the job still completes — which is also why it\'s worth reviewing the result rather than assuming a perfect match.' },
            { q: 'Why would I need PDF/A instead of a regular PDF?', a: 'PDF/A is built for long-term archiving: fonts are embedded and the format is standardized so the file opens the same way years from now, regardless of what\'s installed on the device reading it.' },
            { q: 'Do I need special software to open a PDF/A file?', a: 'No — it\'s still a standard PDF, so any regular PDF reader opens it fine. PDF/A just adds the embedding and standardization that long-term archives and compliance-focused systems expect.' }
        ]
    },

    // ── EDIT ────────────────────────────────────────────────────────────────
    { 
        slug: 'rotate-pdf', name: 'Rotate PDF', shortDesc: 'Fix page orientation.', desc: 'Rotate your PDF pages to the correct orientation. Apply to all or specific pages.', icon: 'RotateCw', category: 'edit', color: '#D7263D', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf',
        seoTitle: 'Rotate PDF Pages Free | Fix Document Orientation Private',
        seoDesc: 'Quickly rotate PDF pages online for free. Fix sideways documents securely without installing software or creating accounts.',
        seoKeywords: 'rotate pdf without software, flip pdf online, fix pdf orientation, private pdf rotator, turn pdf sideways',
        seoArticle: '<p>Rotating a PDF here bakes the new orientation into the saved file itself, unlike a PDF reader\'s own on-screen rotate button, which only changes the view until you close the tab and alters nothing in the actual document. Three angle choices are available — 90° clockwise, a 180° flip, or 270° counter-clockwise — and whichever one you pick turns every page in the file by that amount together; the tool doesn\'t offer an angle control for one page at a time, so a document with pages facing different directions needs more than a single run to sort out. Under the hood, the chosen angle is added to whatever rotation a page already carries instead of replacing it outright, so a page a scanner already turned sideways — common with landscape sheets fed through a sheet-fed scanner — lands at the correct final angle rather than being reset to 0° and rotated from scratch.</p><p>That additive behavior is what makes the tool forgiving for a stack of scanned pages that came in at inconsistent angles: you don\'t need to know each page\'s starting rotation, only which way it still needs to turn from here. Fixing orientation is usually step one of a bigger cleanup — after that, <a href="/tool/organize-pdf">reordering the pages</a> or <a href="/tool/crop-pdf">trimming the blank margins</a> a scanner left behind are natural next moves, and a page too damaged to bother with can just be <a href="/tool/remove-pages">deleted outright</a> rather than rotated into shape. Note the three angles are fixed presets rather than a free-form degree entry, so anything off-axis, like a slightly tilted scan, needs a different kind of editing tool altogether.</p>',
        steps: [
            'Open <strong>Rotate PDF</strong> and add the file you need reoriented — drag it in or click to choose it.',
            'Pick <strong>90° CW</strong>, <strong>180° Flip</strong>, or <strong>270° CCW</strong>. Whichever angle you choose applies to every page in the document.',
            'Click <strong>Process Rotate PDF</strong>. The new angle is saved into the file itself, not just how it looks on your screen right now.',
            'Download the result. A page that was already rotated — a sideways scan, say — keeps the right final orientation, since the angle you picked adds to what the page already had.',
            'Need a different turn on only part of the file? Run the tool again on the exported PDF; each pass adds its angle on top of the last one.'
        ],
        faqs: [
            { q: 'Can I rotate just one page instead of the whole PDF?', a: 'Not in a single pass here — the angle you choose applies to every page in the document. To fix just one page, pull it out first with <a href="/tool/extract-pages">Extract Pages</a> or <a href="/tool/split-pdf">Split PDF</a>, rotate that piece on its own, then <a href="/tool/merge-pdf">merge it back</a> in.' },
            { q: 'What happens if a page was already rotated, like a scanned landscape sheet?', a: 'The angle you pick is added to whatever rotation the page already has, rather than overwriting it. A page a scanner already turned sideways still ends up facing the right way instead of snapping back to 0°.' },
            { q: 'Will rotating reduce the quality of my text or images?', a: 'No. Rotation only changes the page\'s orientation setting — the text and images themselves aren\'t re-rendered or recompressed, so nothing is lost.' },
            { q: 'Can I set a custom rotation angle, like 45°?', a: 'No, only fixed 90°, 180°, and 270° options are available. For anything off-axis, you would need a different editing tool.' }
        ]
    },
    { 
        slug: 'page-numbers', name: 'Add Page Numbers', shortDesc: 'Number your PDF pages.', desc: 'Insert page numbers with custom position, font size, and starting number.', icon: 'Hash', category: 'edit', color: '#D7263D', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf',
        seoTitle: 'Add Page Numbers to PDF | Free PDF Pagination Tool',
        seoDesc: 'Insert custom page numbers into a PDF document. Select font size, placement, and numbering styles efficiently in-browser.',
        seoKeywords: 'add page numbers to pdf, number pdf pages online, free pdf pagination, paginate pdf fast private',
        seoArticle: '<p>Add Page Numbers stamps a sequential number onto every page of a PDF in one pass, and three controls decide how it looks: a starting number with no upper limit (so a second volume can pick up counting where the first one stopped), one of six corner or edge positions, and a format choice between a bare digit like "7" or the fuller "Page 7 of 20". Every page in the file is stamped, including any cover or title page — there\'s no toggle to leave a single sheet out of the run, and there\'s no separate font-size control either, so every number prints at the same fixed size throughout the document. One quirk worth knowing: the "of N" total in the fuller format tracks the numbering sequence rather than the raw page count, so a 10-page file that starts numbering at 5 reads up to "Page 5 of 14," not "Page 5 of 10."</p><p>If you don\'t want a cover page carrying a number at all, the fix happens before you get here: pull it out first with <a href="/tool/remove-pages">Remove Pages</a>, then run the numbering on what\'s left, using the starting-number field to keep the sequence lined up with the original document if that matters to you. The same pairing works in reverse, too — deleting a page doesn\'t touch the digits already stamped on the pages that remain, so trimming a document down after it\'s been numbered leaves old numbers with a gap in them. Run this tool again afterward for a clean, continuous sequence instead.</p>',
        steps: [
            'Load your PDF into <strong>Add Page Numbers</strong>, either by dragging it in or clicking to browse.',
            'Set the <strong>Starting Page Number</strong> with the +/- stepper — handy if this file continues the count from an earlier document.',
            'Choose one of six <strong>Position</strong> options: top or bottom, paired with left, center, or right.',
            'Pick a <strong>Number Style</strong> — a bare digit such as "7", or the fuller "Page 7 of 20".',
            'Click <strong>Process Add Page Numbers</strong>. Every page is stamped in one pass, including a cover page if you left one in.',
            'Download the numbered PDF. If you deleted pages first, this run gives the survivors a fresh, gap-free sequence.'
        ],
        faqs: [
            { q: 'Do I need to remove a cover page before numbering, or can I skip it here?', a: 'There\'s no per-page skip inside this tool — every page gets stamped in one pass. If you don\'t want the cover numbered at all, remove it first with <a href="/tool/remove-pages">Remove Pages</a>, then run Add Page Numbers on what\'s left.' },
            { q: 'I removed some pages — will the remaining page numbers update automatically?', a: 'No. Deleting pages with <a href="/tool/remove-pages">Remove Pages</a> leaves whatever numbers are already stamped on the surviving pages untouched. Run Add Page Numbers afterward if you want a clean, renumbered sequence.' },
            { q: 'Can numbering continue from an earlier document, say starting at 51?', a: 'Yes. The starting number has no upper limit, so a second file in a multi-part set can pick up counting exactly where the first one left off.' },
            { q: 'Why does "Page X of N" show a total higher than my actual page count?', a: 'Because N follows the numbering sequence, not the raw page count. Start at 5 on a 10-page file and it reads up to "Page 5 of 14," since the total accounts for that starting offset.' },
            { q: 'Will adding page numbers change my existing content?', a: 'No. Numbers are drawn on top of the page as an overlay — your existing text and layout underneath are untouched.' }
        ]
    },
    { 
        slug: 'add-watermark', name: 'Add Watermark', shortDesc: 'Stamp text over your PDF.', desc: 'Stamp a text watermark over your PDF pages with custom opacity and position.', icon: 'Droplets', category: 'edit', color: '#D7263D', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf',
        seoTitle: 'Add Watermark to PDF | Free Stamp & Transparency Tool',
        seoDesc: 'Stamp text or logo watermarks over your PDF pages. Fully customizable opacity and position entirely within your browser.',
        seoKeywords: 'add watermark to pdf free, stamp pdf text online, overlay pdf with watermark, secure watermark pdf',
        seoArticle: '<p>Add Watermark stamps text like "DRAFT" or "CONFIDENTIAL" across the entire document in one click, with four placement choices — diagonal, center, top, or bottom — and an opacity slider running from a faint 10% up to a solid 100%. Every page gets the same treatment in that single action; watermarking just one sheet on its own isn\'t an option here. The mark itself is purely cosmetic: it\'s a layer of text drawn on top of whatever is already on the page, and it doesn\'t restrict what anyone can do with the file afterward — copying, printing, and editing all still work exactly as before. Long text shrinks automatically to stay within roughly 80% of the page width, so a lengthy phrase never runs off the edge.</p><p>That makes it a good fit for labeling a document as a draft or work-in-progress before it circulates for review — the stamp is a visual note, not a lock on the file. For anything that actually needs to disappear from view, <a href="/tool/redact-pdf">redacting the sensitive parts</a> is the tool built for that job, and if the goal is controlling who can open the document at all, <a href="/tool/protect-pdf">password-protecting it</a> handles access as a separate step unrelated to the watermark itself. There\'s also no remove-watermark tool on this site: once downloaded, that stamped text is part of the file\'s page content, so keep your original around in case you need an unmarked copy later.</p><p>Opacity is worth tuning to how the file will be read. The 30% default keeps a diagonal stamp visible without burying the text underneath, which matters most once a page is printed rather than viewed on a bright screen. Pushed toward 100%, the mark reads more like a solid stamp — fine for a cover sheet, harder to read through on a dense paragraph — so testing one page is worthwhile before committing a whole document to a single setting.</p>',
        steps: [
            'Add your PDF to the <strong>Add Watermark</strong> tool by dragging it in, or click to pick a file.',
            'Type the watermark text — anything from "DRAFT" to a client name — in place of the default <strong>CONFIDENTIAL</strong>.',
            'Choose a <strong>Position</strong>: <strong>Diagonal</strong>, <strong>Center</strong>, <strong>Top</strong>, or <strong>Bottom</strong>.',
            'Drag the <strong>Opacity</strong> slider between 10% and 100% — lower keeps the page underneath easier to read.',
            'Click <strong>Process Add Watermark</strong>. The mark is stamped across every page of the document in one pass.',
            'Download the watermarked PDF. There\'s no way to lift the mark back out afterward, so hold on to your original file.'
        ],
        faqs: [
            { q: 'How do I add a watermark to a PDF for free?', a: 'Type your watermark text, pick a position and opacity, and download the stamped file — free, with no signup, and processed entirely in your browser.' },
            { q: 'Does the watermark apply to every page, or can I limit it to just one?', a: 'It always applies across the whole document in one action. There isn\'t a per-page selector, so limiting the stamp to a single sheet isn\'t possible here.' },
            { q: 'Can I remove a watermark once it\'s been applied?', a: 'No. There\'s no remove-watermark tool on the site, and the stamped text becomes part of the page content as soon as you download the file. If you need a clean copy later, you\'ll have to go back to your original, unwatermarked PDF.' },
            { q: 'What opacity should I use if the document will be printed?', a: 'Something closer to the 30% default is usually safer for print — it keeps the underlying text legible. Values pushed toward 100% read as a bolder stamp but can make dense text harder to read through on paper, so it\'s worth printing one test page first.' },
            { q: 'Will a long watermark get cut off the edge of the page?', a: 'No. Text wider than roughly 80% of the page automatically shrinks to fit, so a longer phrase stays fully visible instead of running off the side.' }
        ]
    },
    { 
        slug: 'crop-pdf', name: 'Crop PDF', shortDesc: 'Trim PDF margins.', desc: 'Crop the margins of a PDF or select specific areas to keep per page.', icon: 'Crop', category: 'edit', color: '#D7263D', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf',
        seoTitle: 'Crop PDF Pages Online | Free PDF Margin Trimmer',
        seoDesc: 'Crop the margins of a PDF document visually. Adjust bounding boxes to keep specific areas and remove empty blank space.',
        seoKeywords: 'crop pdf online free, trim pdf margins, snip pdf borders, adjust pdf visible area size private',
        seoArticle: '<p>Crop PDF trims a fixed margin off every side of every page at once, using point values for the top, right, bottom, and left edges — 72 points equal one inch — or a Thin (15pt), Standard (30pt), or Wide (60pt) preset that fills in all four sides in one click. The same numbers apply uniformly across the whole document; there\'s no per-page override, so one setting reshapes every page identically, and because the values are fixed points rather than a percentage of each page, they trim the same physical amount whether the source is a compact A5 scan or a full-size A4 sheet. A built-in floor keeps things from going wrong: margins large enough to shrink a page below roughly half an inch in either direction are rejected with an error instead of silently producing a near-blank page.</p><p>Cropping here doesn\'t erase anything — it sets the page\'s visible boundary smaller rather than deleting content, so whatever sat outside your new margins (text, images, all of it) is still stored inside the file; it\'s simply outside the area a viewer or printer will show. That\'s the standard, spec-defined way PDF cropping works, and it means a crop you\'re unsure about isn\'t a one-way trip — running the tool again with different numbers redraws the boundary without any loss underneath. It\'s a natural way to trim the dark borders a flatbed scanner leaves around a page, and afterward <a href="/tool/organize-pdf">reordering the results</a> or squaring up orientation with <a href="/tool/rotate-pdf">Rotate PDF</a> are common next steps — or if one scanned page came through entirely blank, <a href="/tool/remove-pages">deleting it</a> beats cropping it down to a sliver.</p>',
        steps: [
            'Bring your PDF into <strong>Crop PDF</strong> — drag and drop it, or click to select it from your device.',
            'Enter a margin in points for each side — <strong>top</strong>, <strong>right</strong>, <strong>bottom</strong>, <strong>left</strong> — or tap <strong>Thin</strong>, <strong>Standard</strong>, or <strong>Wide</strong> to fill in all four at once.',
            'Remember 72 points equal one inch when converting from a ruler measurement.',
            'Click <strong>Process Crop PDF</strong>. The same margins are trimmed from every page in a single pass.',
            'Download the cropped PDF. The trimmed area is hidden from view rather than deleted from the file, so a different crop can still be applied later if you change your mind.'
        ],
        faqs: [
            { q: 'How do I crop the margins of a PDF?', a: 'Enter a point value for each side, or tap the Thin, Standard, or Wide preset, then download — the same margins trim every page in one pass.' },
            { q: 'Can I use a different crop area for each page?', a: 'No. One set of margins applies to every page in a single action; there\'s no per-page override in this tool.' },
            { q: 'Does cropping delete the trimmed part of the page, or just hide it?', a: 'It hides it. Cropping shrinks the page\'s visible boundary; the content outside that boundary is still stored in the file, just outside what a viewer or printer will display. That\'s how PDF cropping works by spec, not a shortcut this tool takes.' },
            { q: 'What unit are the margin numbers in?', a: 'Points. 72 points equal one inch, and the quick presets are 15pt (Thin), 30pt (Standard), and 60pt (Wide).' },
            { q: 'Will very large margins crop a page down to nothing?', a: 'No, that\'s blocked. Margins big enough to shrink a page below roughly half an inch in either direction are rejected with an error instead of producing a near-blank page.' }
        ]
    },
    { 
        slug: 'edit-pdf', name: 'Edit PDF', shortDesc: 'Make simple additions to a PDF.', desc: 'Make simple additions to a PDF document in your browser.', icon: 'PenLine', category: 'edit', color: '#D7263D', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf', hasCanvas: true,
        seoTitle: 'PDF Editor Online | Free & Private',
        seoDesc: 'Make simple additions to a PDF document without uploading it anywhere. Free and processed entirely in your browser.',
        seoKeywords: 'pdf editor online free, edit pdf without uploading, private pdf editor, simple pdf editing tool',
        seoArticle: 'Make simple additions to a PDF document without uploading it to a server — everything happens locally in your browser. For a specific task, DocShift also offers dedicated tools built for exactly that job: <a href="/tool/add-watermark">add a watermark</a>, <a href="/tool/page-numbers">insert page numbers</a>, or <a href="/tool/sign-pdf">add a signature</a>.',
        updated: '2026-07-26',
        faqs: [
            { q: 'What can I do with the PDF editor?', a: 'Make simple additions to your document. For a specific task like watermarking, page numbering, or signing, DocShift\'s dedicated tools — <a href="/tool/add-watermark">Add Watermark</a>, <a href="/tool/page-numbers">Add Page Numbers</a>, <a href="/tool/sign-pdf">Sign PDF</a> — are built exactly for that.' },
            { q: 'Is it free and private?', a: 'Yes. Editing happens locally in your browser — free, with no sign-up, and nothing is uploaded to a server.' }
        ]
    },

    // ── SECURITY ────────────────────────────────────────────────────────────
    { 
        slug: 'unlock-pdf', name: 'Unlock PDF', shortDesc: 'Remove PDF password.', desc: 'Remove PDF password security, giving you the freedom to use your PDF as you want.', icon: 'Unlock', category: 'security', color: '#FF4D4D', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf',
        seoTitle: 'Unlock PDF Password Restrictions | Remove Password Free',
        seoDesc: 'Remove file passwords and security restrictions from your PDFs, granting you freedom to use your document without friction.',
        seoKeywords: 'unlock pdf password online, remove pdf security free, clear pdf password completely private, unprotect pdf',
        seoArticle: '<p>Unlock PDF removes a password from a file you already have permission to open, handing back a copy that opens with no prompt at all. Enter the document\'s current password, and DocShift runs a full decryption pass that strips the protection out completely, along with any print or copy restrictions tied to the same encryption — it does not guess, brute-force, or otherwise attempt to recover a password you\'ve forgotten. That distinction matters: this is a convenience step for documents you\'re already cleared to access, not a password-cracking service.</p><p>A common trigger is a client or vendor sending over a protected statement or contract you\'re allowed to edit — or discovering that a password-protected file won\'t open in another editor, watermarking tool, or signer until the encryption is removed first. Only run this on files you own or have clear permission to access; DocShift has no way to check who\'s asking, so that responsibility sits with you. Because the tool only runs once the correct password is supplied, entering the wrong one simply returns an error instead of a corrupted or half-unlocked download, so there\'s nothing broken left to troubleshoot afterward.</p><p>Need to go the other way and lock a file instead? <a href="/tool/protect-pdf">Protect PDF</a> encrypts a document with AES-256 using a password you choose yourself. And if a PDF still won\'t open properly once its password is gone, that\'s usually an unrelated structural fault, not something removing the password caused — <a href="/tool/repair-pdf">Repair PDF</a> is the tool built to fix that kind of damage.</p>',
        steps: [
            'Add your password-protected PDF to the upload area (drag-and-drop or click to browse) — Unlock PDF works on one file at a time.',
            'Type the file\'s current password into the <strong>PDF password</strong> field; the eye icon lets you reveal it and check for typos.',
            'Click <strong>Process Unlock PDF</strong> to strip the password protection from the file.',
            'Enter the wrong password and DocShift returns a clear error instead of a broken file, so you can just try again.',
            'Download the unlocked PDF — it now opens without a password prompt.'
        ],
        faqs: [
            { q: 'How do I remove a password from a PDF?', a: 'Upload the protected file, enter its current password, and DocShift gives you back an unlocked copy with that protection removed.' },
            { q: 'Is it OK to unlock a PDF that isn\'t mine?', a: 'Only remove protection from files you own or have clear permission to access. DocShift has no way to check who\'s asking, so that responsibility is on you.' },
            { q: 'Can I unlock a PDF without the password?', a: 'No. This isn\'t a password-cracking tool — DocShift only removes protection from files you can already open with the correct password. If that password is unknown, there\'s no bypass built in.' },
            { q: 'What happens if I type the wrong password?', a: 'DocShift stops and shows an invalid-password error instead of producing a broken file. Double-check the password and try again.' },
            { q: 'Does unlocking change the PDF\'s content or layout?', a: 'No. Removing the password only lifts the encryption — the pages, text, and images are left exactly as they were.' }
        ]
    },
    { 
        slug: 'protect-pdf', name: 'Protect PDF', shortDesc: 'Lock PDF with a password.', desc: 'Protect PDF files with AES-256 encryption and custom access permissions.', icon: 'Lock', category: 'security', color: '#FF4D4D', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf',
        seoTitle: 'Protect PDF with Password | Secure Encryption Free',
        seoDesc: 'Protect PDF files using powerful AES encryption. Add strong passwords to prevent viewing, printing, or modification easily.',
        seoKeywords: 'protect pdf with password, encrypt pdf file online, secure pdf from copying private, add password lock to pdf free',
        seoArticle: '<p>Protect PDF locks a document behind a password and encrypts it with AES-256, so only someone who enters that password can open it. Type a password, confirm it in the second field so a typo doesn\'t lock you out of your own file, and DocShift runs the document through the same encryption standard used by password managers and full-disk encryption tools before handing back a copy that prompts for that password on open. As you type, a strength meter marks the password Weak, Medium, or Strong — worth watching, since a short or guessable password undermines strong encryption no matter how good the underlying algorithm is.</p><p>PDF encryption technically supports two separate roles — a user password just to open the file, and an owner password that controls permissions like printing or copying — but DocShift keeps things simple by using the single password you set for both. That means there is no separate view-only or print-only tier: whoever has the password gets full access to the document, so treat it like any password guarding something sensitive rather than a lightweight PIN you\'d hand out freely.</p><p>Set the wrong password by mistake, or need the file back the way it was? <a href="/tool/unlock-pdf">Unlock PDF</a> reverses the process, as long as you still know the password you used to lock it. It\'s also worth signing a document before you protect it, not after — encrypting the file first will stop DocShift\'s signer, and other editing tools, from being able to open it at all once it\'s locked down.</p>',
        steps: [
            'Upload the PDF you want to lock (drag-and-drop or browse) — Protect PDF handles one file per run.',
            'Type the password you want to require into <strong>Set password</strong>; a strength meter below it flags the password as Weak, Medium, or Strong as you type.',
            'Re-enter the same password in <strong>Confirm password</strong> — DocShift blocks submission until the two match.',
            'Click <strong>Process Protect PDF</strong> to encrypt the file with AES-256 using that password.',
            'Download the locked PDF; it can only be opened by someone who has the password.'
        ],
        faqs: [
            { q: 'How do I password-protect a PDF for free?', a: 'Set a password, confirm it, and DocShift encrypts your PDF so only someone with that password can open it — no account or payment required.' },
            { q: 'What encryption does DocShift use?', a: 'AES-256 — the same encryption strength used by password managers and full-disk encryption tools — applied using the password you set when locking the file.' },
            { q: 'Does the password control printing and copying, or just opening the file?', a: 'Both. DocShift uses a single password for the whole file instead of separate open and permissions passwords, so anyone who has it gets full access — there\'s no view-only tier.' },
            { q: 'Can I remove the password later?', a: 'Yes — <a href="/tool/unlock-pdf">Unlock PDF</a> reverses it, as long as you still know the password you set.' },
            { q: 'Should I protect a PDF before or after signing it?', a: 'Sign it first. Once a PDF is encrypted, DocShift\'s signer (and other editing tools) can no longer open it to add a signature.' }
        ]
    },
    { 
        slug: 'sign-pdf', name: 'Sign PDF', shortDesc: 'Add your signature to a PDF.', desc: 'Draw, type, or upload a signature and place it anywhere on your PDF.', icon: 'Pen', category: 'security', color: '#FF4D4D', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf', hasThumbnails: true,
        seoTitle: 'Sign PDF Without Uploading | Free eSignature Tool',
        seoDesc: 'Draw, type, or upload a signature and place it on your PDF without uploading the document to any server. Free and 100% private in your browser.',
        seoKeywords: 'sign pdf without uploading, esignature free private, draw signature on pdf secure, add signature to pdf online, sign document no upload',
        seoArticle: '<p>Sign PDF lets you type your name in a script-style font and stamp it onto the bottom of a document\'s last page, skipping the print-sign-scan routine entirely. Choose from four handwriting-style fonts — from a flowing cursive to a blockier casual script — and DocShift renders your typed name as real text on the page alongside a dated "Digitally signed" caption noting when the file was marked as signed. That output is a visible signature mark, not a scanned image and not a certificate-based digital signature tied to a certificate authority.</p><p>That distinction is worth understanding before you rely on it for anything important. A typed signature like this is a reasonable stand-in for casual approvals, internal sign-off, and drafts passed between colleagues, where all that matters is showing someone reviewed and agreed to a document. It is not the same as a cryptographically verifiable e-signature issued by a dedicated certificate-based signing service, and it should not replace one for contracts, notarized paperwork, or anything else where you need to prove, beyond a visual glance, exactly who signed a file and that it has not changed since. When a document genuinely needs that level of certainty, a certificate-based e-signature provider built for it is the safer choice.</p><p>Once signed, you can <a href="/tool/protect-pdf">lock the file with a password</a> so it cannot be edited further, or <a href="/tool/add-watermark">stamp a watermark</a> alongside the signature for extra visibility. Just protect it after signing, not before — DocShift\'s signer cannot open a file that is already password-encrypted.</p>',
        steps: [
            'Upload the PDF you need to sign (drag-and-drop or browse) — one file per run.',
            'Type your name, or however you want to sign, into the <strong>Signature text</strong> field.',
            'Pick one of four script styles — Elegant Cursive, Calligraphy, Classic Script, or Modern Hand — to render it.',
            'Click <strong>Process Sign PDF</strong>; DocShift stamps the styled text and a dated "Digitally signed" caption onto the last page.',
            'Download the signed PDF, ready to send or file.'
        ],
        faqs: [
            { q: 'Is a typed signature from DocShift legally binding?', a: 'In many places, a clear, deliberate typed signature can hold up for everyday agreements — but it depends on your jurisdiction and what the document is for. It\'s a visual signature, not a certificate-based digital signature, so it isn\'t the right choice for contracts or filings that specifically require one. When it matters, check what your agreement or local rules actually require.' },
            { q: 'How do I sign a PDF without printing and scanning it?', a: 'Type your name into the signature field, pick a font style, and download the finished PDF — no printer or scanner involved at any point.' },
            { q: 'Is the signature an image, or a certificate-based digital signature?', a: 'Neither, exactly. DocShift renders your typed name as real text in a script font, plus a dated "Digitally signed" caption, directly on the page — a visual signature mark, not a scanned image file and not a cryptographically verifiable, certificate-based signature.' },
            { q: 'Can I choose where the signature appears, or which page it goes on?', a: 'Not currently. DocShift places the signature and its date caption in the same corner of the document\'s last page every time, with no drag-to-position option.' }
        ]
    },
    {
        slug: 'redact-pdf', name: 'Redact PDF', shortDesc: 'Blackout sensitive info on a page.', desc: 'Blackout text and graphics to visually mark sensitive areas of your PDF before sharing it.', icon: 'EyeOff', category: 'security', color: '#FF4D4D', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf', hasThumbnails: true,
        seoTitle: 'Redact PDF Information | Blackout Sensitive Text',
        seoDesc: 'Mark sensitive text and graphics on a PDF page so they are blacked out before you share it. Processed in your browser — files are never uploaded to a server.',
        seoKeywords: 'redact pdf online, blackout pdf text, hide sensitive info in pdf, mark pdf for redaction, private pdf redaction tool',
        seoArticle: 'Mark sensitive text and graphics on a PDF page so they are blacked out before you share the file. Since redaction behavior varies between tools, always verify the result yourself before sending a document outside your organization — especially for PII, financials, or legal discovery. If you need a stronger guarantee, <a href="/tool/remove-pages">removing the entire page</a> is more certain than marking a region within it, and you can <a href="/tool/protect-pdf">add an encryption password</a> as an additional access barrier. You can also <a href="/tool/compare-pdf">compare the redacted file visually</a> against the original.',
        updated: '2026-07-26',
        faqs: [
            { q: 'Is redaction on DocShift permanent?', a: 'Always verify the result yourself before relying on redaction for a sensitive document — different tools handle the underlying content differently. For a more certain guarantee, consider <a href="/tool/remove-pages">removing the whole page</a> instead of marking a region within it.' },
            { q: 'What is the difference between redacting and password-protecting a PDF?', a: '<a href="/tool/protect-pdf">Password protection</a> restricts who can open a file but does not change its content. Redaction is about visually marking sensitive content on the page itself.' }
        ]
    },
    {
        slug: 'compare-pdf', name: 'Compare PDF', shortDesc: 'Spot changes between two PDFs.', desc: 'Compare the text of two PDF versions and get a report of every added and removed line.', icon: 'GitCompare', category: 'security', color: '#FF4D4D', accept: { 'application/pdf': ['.pdf'] }, multiple: true, minFiles: 2, urlInput: false, outputExt: '.txt', outputMime: 'text/plain',
        seoTitle: 'Compare Two PDFs Online Free | Spot Differences',
        seoDesc: 'Compare two PDF files side-by-side and instantly see every line that changed, was added, or removed — free, accurate, and processed in your browser.',
        seoKeywords: 'compare two pdfs online, pdf diff tool free, spot differences between pdf files, pdf comparison tool, find changes in pdf',
        seoArticle: 'Deploy a powerful side-by-side document comparison system to rapidly spot subtle textual changes between two PDF file versions. Excellent for contracts, NDAs, leases, design redlines, and legal discovery — anywhere you need to verify that "v2 is the same as v1 except for clause 4." The tool highlights insertions, deletions, and moved text in distinct colors and produces a third annotated PDF that you can save or share. This is not the same as <a href="/tool/pdf-to-word">PDF to Word</a> (which extracts text) or <a href="/tool/edit-pdf">Edit PDF</a> (which modifies a single file). If the documents check out fine, immediately <a href="/tool/merge-pdf">combine both PDF models</a> together efficiently. Alternatively, <a href="/tool/redact-pdf">blackout any discrepancies</a> directly, or <a href="/tool/split-pdf">cut out the mismatched pages completely</a>.',
        faqs: [
            { q: 'Do the two PDFs need to be the same length?', a: 'No. The comparison handles different page counts — added or removed pages are clearly labeled as such in the output.' },
            { q: 'Does the comparison include images?', a: 'Yes. Inserted, removed, and replaced images are detected and shown side-by-side alongside text changes.' }
        ]
    },

    // ── INTELLIGENCE ────────────────────────────────────────────────────────
    { 
        slug: 'translate-pdf', name: 'Translate PDF', shortDesc: 'AI-powered PDF translation.', desc: 'Easily translate PDF files powered by AI. Keeps fonts, layout, and formatting intact.', icon: 'Languages', category: 'intelligence', color: '#F05B25', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf', isNew: true,
        seoTitle: 'Translate PDF Online Free | Private AI Document Translator',
        seoDesc: 'Easily translate PDF files natively. Maintains fonts, layout matrices, and formatting completely intact while converting languages.',
        seoKeywords: 'translate pdf document free, ai pdf translator online, keep formatting translate pdf private, language change pdf',
        seoArticle: 'Smoothly translate whole PDF files using advanced embedded AI technology. Keeps your complex fonts, document layouts, and standard formatting perfectly intact without breaking rows. Need to manually adjust the translation output? Utilize our built in <a href="/tool/edit-pdf">PDF editor</a> immediately. If you need searchability alongside translation, <a href="/tool/ocr-pdf">run our OCR toolkit natively</a>, or easily <a href="/tool/word-to-pdf">convert it from Word formats</a> dynamically.',
        faqs: [
            { q: 'How do I translate a PDF to another language?', a: 'Upload the PDF, pick the target language, and DocShift returns a translated version keeping the layout.' },
            { q: 'Is translating a PDF free?', a: 'Yes — free to translate with no signup required.' },
            { q: 'Does translation keep the original formatting?', a: 'The tool preserves the page structure so the translated PDF stays readable and close to the original.' }
        ]
    }
];

export const CATEGORIES = [
    { id: 'all', label: 'All', count: 25 },
    { id: 'organize', label: 'Organize PDF', count: 6 },
    { id: 'optimize', label: 'Optimize PDF', count: 3 },
    { id: 'convertTo', label: 'Convert to PDF', count: 5 },
    { id: 'convertFrom', label: 'Convert from PDF', count: 5 },
    { id: 'edit', label: 'Edit PDF', count: 5 },
    { id: 'security', label: 'PDF Security', count: 5 },
    { id: 'intelligence', label: 'PDF Intelligence', count: 1 },
];

export const getToolBySlug = (slug) => TOOLS.find(t => t.slug === slug) || null;
export const getToolsByCategory = (cat) => cat === 'all' ? TOOLS : TOOLS.filter(t => t.category === cat);
