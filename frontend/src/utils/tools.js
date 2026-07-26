export const TOOLS = [
    // ── ORGANIZE ────────────────────────────────────────────────────────────
    { 
        slug: 'merge-pdf', name: 'Merge PDF', shortDesc: 'Combine PDFs into one.', desc: 'Combine multiple PDF files into one document in any order you choose.', icon: 'Combine', category: 'organize', color: '#F05B25', accept: { 'application/pdf': ['.pdf'] }, multiple: true, minFiles: 2, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf',
        seoTitle: 'Merge PDF Files Free | Secure Private PDF Combiner',
        seoDesc: 'Merge PDF files together securely. Our free tool runs directly in your browser with no uploads required, ensuring total privacy.',
        seoKeywords: 'merge pdf files without uploading, combine pdf online private, secure pdf merge, join pdf files, free pdf combiner',
        seoArticle: 'Use our free online tool to merge PDF files instantly without uploading them to external servers. Since processing is optimized for privacy, your files remain completely secure on your device. Just arrange the files in your preferred order and click merge. Once combined, you might also want to <a href="/tool/compress-pdf">compress your PDF size</a> to reduce the file footprint, or <a href="/tool/split-pdf">split PDF pages</a> if you combined too many documents. Need to sort them first? Try our <a href="/tool/organize-pdf">free PDF organizer</a>.',
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
        seoArticle: 'Remove unwanted pages from your PDF document entirely for free. This visual tool lets you delete specific pages from a PDF quickly and securely without uploading your data. Unlike "split" (which exports pages into new files) or "extract" (which copies pages out), remove-pages surgically deletes the pages you select from the original document, preserving page numbering, headers, and footers for the rest of the file. If you removed the wrong pages, you can easily <a href="/tool/merge-pdf">merge PDF files back</a> to restore them. Looking to pull pages out instead of deleting them? You can <a href="/tool/extract-pages">extract specific pages</a> or <a href="/tool/organize-pdf">reorder pdf pages</a> for a cleaner document structure.',
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
        slug: 'organize-pdf', name: 'Organize PDF', shortDesc: 'Sort and reorder pages visually.', desc: 'Drag to reorder pages, rotate individual pages, and delete unwanted ones.', icon: 'LayoutGrid', category: 'organize', color: '#F05B25', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf', hasThumbnails: true,
        seoTitle: 'Reorder PDF Pages Without Uploading | Free Sorter',
        seoDesc: 'Drag and drop to reorder PDF pages without uploading a single file. Sort, rotate, and organize documents visually, 100% private in your browser.',
        seoKeywords: 'reorder pdf pages without uploading, organize pdf pages private, sort pdf pages online free, visual pdf page sorter, rearrange pdf without upload',
        seoArticle: 'Organize your PDF files by dragging and dropping pages into the correct order. This visual organizer lets you sort and reorder PDF pages instantly directly in your browser. Since it runs locally, it is 100% private. While organizing, you notice some upside-down pages? Easily <a href="/tool/rotate-pdf">fix page orientation</a>. You can also <a href="/tool/remove-pages">permanently delete pages</a> or <a href="/tool/merge-pdf">combine multiple PDFs</a> to organize them all at once.',
        faqs: [
            { q: 'How do I rearrange pages in a PDF for free?', a: 'Drag the page thumbnails into any order and download the reorganized PDF — free, in your browser, with no upload.' },
            { q: 'Can I organize a PDF on my phone?', a: 'Yes. The visual organizer works in any mobile browser, so you can reorder pages by touch and save instantly.' },
            { q: 'Will reordering pages change the file quality?', a: 'No. Pages are moved, not re-rendered, so text and images stay identical to the original.' }
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
        seoArticle: 'Convert JPG and PNG images to a portable PDF format with ease. Adjust orientation and margins to create a stunning customized PDF album or document from raw images. Because our tool runs locally, your sensitive photos are 100% private. Want to pull images out of a PDF instead? Run our <a href="/tool/pdf-to-jpg">export PDF pages as images tool</a>. If your images result in a huge file, use our <a href="/tool/compress-pdf">file size shrinker</a>, or take pictures using the <a href="/tool/scan-to-pdf">Scan to PDF feature</a>.',
        faqs: [
            { q: 'How do I convert JPG to PDF without losing quality?', a: 'DocShift embeds every image at its original resolution, so your PDF keeps full JPG quality. To shrink the file afterward, run it through <a href="/tool/compress-pdf">Compress PDF</a>.' },
            { q: 'Can I combine multiple JPG or PNG images into one PDF?', a: 'Yes. Drop several JPG, JPEG or PNG files and they merge into a single PDF in the order you arrange them — no watermark, completely free.' },
            { q: 'How do I convert JPG to PDF on my phone?', a: 'DocShift runs in any mobile browser. Open the tool, pick photos from your camera roll, and download the PDF — no app to install and nothing is uploaded.' }
        ]
    },
    { 
        slug: 'word-to-pdf', name: 'Word to PDF', shortDesc: 'Convert DOCX files to PDF.', desc: 'Make DOC and DOCX files easy to read by converting them to PDF.', icon: 'FileText', category: 'convertTo', color: '#F05B25', accept: { 'application/msword': ['.doc'], 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf',
        seoTitle: 'Word to PDF Without Uploading | Free DOCX Converter',
        seoDesc: 'Convert Word DOC and DOCX files to PDF without uploading your document to any server. Free, fast, and processed securely in your browser.',
        seoKeywords: 'word to pdf without uploading, convert docx to pdf private, doc to pdf secure, free word to pdf converter, protect document privacy pdf',
        seoArticle: 'Make DOC and DOCX files perfectly readable on any device by converting them into PDF formatting. Our converter ensures your documents look exactly the same across different software platforms. If you need to go in the opposite direction later, you can <a href="/tool/pdf-to-word">convert PDF back to Word</a> easily. Once converted to PDF, you can securely <a href="/tool/sign-pdf">add your signature</a> or <a href="/tool/protect-pdf">lock it with a password</a> before sending.',
        faqs: [
            { q: 'How do I convert Word to PDF without losing formatting?', a: 'DocShift renders your DOC or DOCX exactly as written, keeping fonts, spacing and layout intact in the PDF.' },
            { q: 'Can I convert Word to PDF on my phone for free?', a: 'Yes — it runs in any browser, desktop or mobile, free and with no software to install.' },
            { q: 'Can I protect the PDF after converting?', a: 'Yes. After converting, <a href="/tool/protect-pdf">add a password</a> before sharing the file.' }
        ]
    },
    { 
        slug: 'pptx-to-pdf', name: 'PowerPoint to PDF', shortDesc: 'Convert presentations to PDF.', desc: 'Make PPT and PPTX slideshows easy to view by converting them to PDF.', icon: 'Presentation', category: 'convertTo', color: '#F05B25', accept: { 'application/vnd.ms-powerpoint': ['.ppt'], 'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf',
        seoTitle: 'PowerPoint to PDF Without Uploading | Free Tool',
        seoDesc: 'Convert PPT and PPTX slideshows to PDF without uploading your presentation anywhere. Free, secure, and processed entirely in your browser.',
        seoKeywords: 'powerpoint to pdf without uploading, convert pptx to pdf private, ppt to pdf secure free, protect presentation privacy pdf, slideshow to pdf converter',
        seoArticle: 'Make your PPT and PPTX slideshows incredibly easy to view and share by converting them to PDF format. This prevents formatting issues and ensures anyone can read your presentation without needing Office installed. Check out our reverse tool if you ever need to <a href="/tool/pdf-to-pptx">turn PDFs back to slide decks</a>. You might also want to <a href="/tool/add-watermark">add a watermark</a> to protect your presentation, or <a href="/tool/merge-pdf">combine multiple presentations</a>.',
        faqs: [
            { q: 'How do I convert PowerPoint to PDF for free?', a: 'Drop your PPT or PPTX file and download a PDF that preserves every slide, layout and font — free and without signup.' },
            { q: 'Does converting PPTX to PDF keep my slide layout?', a: 'Yes. Each slide is rendered exactly as designed, so fonts, images and positioning stay intact.' },
            { q: 'Can I convert PowerPoint to PDF on my phone?', a: 'Yes — it runs in any browser with no app to install and nothing is uploaded.' }
        ]
    },
    { 
        slug: 'excel-to-pdf', name: 'Excel to PDF', shortDesc: 'Convert spreadsheets to PDF.', desc: 'Make Excel spreadsheets easy to read by converting them to PDF format.', icon: 'Table', category: 'convertTo', color: '#F05B25', accept: { 'application/vnd.ms-excel': ['.xls'], 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf',
        seoTitle: 'Excel to PDF Without Uploading | Free Converter',
        seoDesc: 'Convert Excel spreadsheets to PDF without uploading your financial data anywhere. Fast, free, and 100% processed locally in your browser.',
        seoKeywords: 'excel to pdf without uploading, convert xlsx to pdf private, secure financial spreadsheet to pdf, xls to pdf free, protect financial data pdf',
        seoArticle: 'Make complex Excel spreadsheets easy to read by securely converting them to rigid PDF format. This locks your data layout in place so your invoices and financial sheets print perfectly. Need to extract tabular data from a previously converted file? <a href="/tool/pdf-to-excel">Convert PDF back to Excel</a> in seconds. Once you have a PDF, you can easily <a href="/tool/protect-pdf">add a password</a> or <a href="/tool/redact-pdf">permanently hide sensitive financial data</a>.',
        faqs: [
            { q: 'How do I convert Excel to PDF without losing columns?', a: 'DocShift renders your XLS or XLSX sheets to PDF keeping columns, rows and formatting readable on any device.' },
            { q: 'Is converting Excel to PDF free and private?', a: 'Yes. Conversion happens in your browser with no upload, signup or watermark.' },
            { q: 'Can I hide sensitive cells before converting?', a: 'Remove confidential data first, then convert — or <a href="/tool/redact-pdf">redact the PDF</a> afterward.' }
        ]
    },
    { 
        slug: 'html-to-pdf', name: 'HTML to PDF', shortDesc: 'Convert any webpage to PDF.', desc: 'Convert webpages to PDF by entering a URL. Preserves layout and styles.', icon: 'Globe', category: 'convertTo', color: '#F05B25', accept: null, multiple: false, minFiles: 0, urlInput: true, outputExt: '.pdf', outputMime: 'application/pdf',
        seoTitle: 'URL to PDF Converter Free | Save Any Webpage as PDF',
        seoDesc: 'Convert any public webpage or HTML page to a pixel-perfect PDF by pasting its URL. Free, fast, and processed securely without uploading anything.',
        seoKeywords: 'url to pdf converter, webpage to pdf online free, save website as pdf, convert html url to pdf, capture webpage as pdf',
        seoArticle: 'Convert entire webpages to high-quality PDF files simply by entering a URL. Our tool fetches the site and renders the exact layout and styles securely. Once you\'ve captured a webpage, you may want to <a href="/tool/compress-pdf">shrink the final document</a> since modern sites render large PDFs. Alternatively, you can <a href="/tool/pdf-to-jpg">save the webpage PDF as image snapshots</a> or <a href="/tool/crop-pdf">trim away unnecessary margins</a>.',
        faqs: [
            { q: 'How do I convert a webpage to PDF?', a: 'Paste a URL or HTML and DocShift renders the page into a clean, shareable PDF.' },
            { q: 'Can I save a website as PDF for free?', a: 'Yes, free and with no watermark. The page is captured to PDF right in your browser.' },
            { q: 'Will the PDF keep the page styling?', a: 'Layout, images and CSS styling are preserved so the PDF looks like the live page.' }
        ]
    },

    // ── CONVERT FROM PDF ────────────────────────────────────────────────────
    { 
        slug: 'pdf-to-jpg', name: 'PDF to JPG', shortDesc: 'Export PDF pages as images.', desc: 'Convert each PDF page into a JPG image or extract all embedded images.', icon: 'Image', category: 'convertFrom', color: '#F05B25', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.zip', outputMime: 'application/zip',
        seoTitle: 'PDF to JPG Without Uploading | High Resolution',
        seoDesc: 'Convert PDF pages to high-resolution JPG images without uploading your file anywhere. Free, fast, and processed securely in your browser.',
        seoKeywords: 'pdf to jpg without uploading, high resolution pdf to jpg, convert pdf to image private, extract images from pdf free, pdf page to picture',
        seoArticle: 'Convert PDF documents into high-resolution JPG images. You can choose to export every single page as a separate JPG or instruct the tool to extract original embedded images directly. Need to go the other way? <a href="/tool/jpg-to-pdf">Convert standard images into a smooth PDF</a>. If you only want an image of specific areas, you can <a href="/tool/extract-pages">export specific pages</a> first, or even <a href="/tool/html-to-pdf">save raw websites as PDFs</a> before conversion.',
        faqs: [
            { q: 'How do I convert each PDF page to a separate JPG?', a: 'DocShift exports every page as its own high-resolution JPG image and packages them for a single download.' },
            { q: 'Is converting PDF to JPG free and private?', a: 'Yes. Pages render to images locally in your browser — nothing is uploaded to a server and there is no watermark.' },
            { q: 'What resolution are the exported images?', a: 'Pages export at high resolution suitable for printing or sharing. Larger PDFs simply take a moment longer to render.' }
        ]
    },
    { 
        slug: 'pdf-to-word', name: 'PDF to Word', shortDesc: 'Convert PDF to editable DOCX.', desc: 'Easily convert PDF files into editable DOC and DOCX documents.', icon: 'FileOutput', category: 'convertFrom', color: '#F05B25', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.docx', outputMime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        seoTitle: 'PDF to Word Without Uploading | Free DOCX Converter',
        seoDesc: 'Convert PDF to editable Word DOCX without uploading your document to any server. Free, accurate, and processed securely in your browser.',
        seoKeywords: 'pdf to word without uploading, convert pdf to docx private, editable pdf to word free, secure pdf to word converter, pdf text extraction private',
        seoArticle: 'Easily convert static PDF files into completely editable DOC and DOCX Word documents. Our robust extraction accurately matches formatting, paragraphs, and tables completely within your browser. Once your Word doc is edited, you can quickly <a href="/tool/word-to-pdf">convert it back to PDF securely</a>. Need more direct editing without Word? Try our in-browser <a href="/tool/edit-pdf">PDF annotation tool</a>, or run <a href="/tool/ocr-pdf">OCR for scanned documents</a> before converting to Word.',
        faqs: [
            { q: 'Can I convert PDF to Word for free without signup?', a: 'Yes. DocShift converts PDF to an editable Word (.docx) file for free with no email, account, or watermark.' },
            { q: 'Why does my PDF to Word conversion lose formatting?', a: 'Complex layouts like columns and tables can shift because PDF stores no reflow data. DocShift preserves text, fonts and basic structure as closely as possible.' },
            { q: 'Can I convert a scanned PDF to editable Word?', a: 'Scanned pages are images. Run them through <a href="/tool/ocr-pdf">OCR PDF</a> first to make the text selectable, then convert to Word.' }
        ]
    },
    { 
        slug: 'pdf-to-pptx', name: 'PDF to PowerPoint', shortDesc: 'Turn PDFs into slide decks.', desc: 'Turn your PDF files into easy to edit PPT and PPTX slideshows.', icon: 'MonitorPlay', category: 'convertFrom', color: '#F05B25', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pptx', outputMime: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        seoTitle: 'Convert PDF to PowerPoint (PPTX) | Slideshow Generator Free',
        seoDesc: 'Turn your PDF documents into easy-to-edit PPTX slideshow presentations. Free secure conversion done on your device entirely.',
        seoKeywords: 'pdf to powerpoint converter, convert pdf to pptx online, free pdf to slide deck private, editable pdf to ppt',
        seoArticle: 'Turn your PDF files into easy to edit PPT and PPTX slideshows. This tool converts each PDF page into a PowerPoint slide seamlessly, retaining vectors and text so you can present like a pro. Need to finalize a finished PowerPoint? Instantly <a href="/tool/pptx-to-pdf">convert it back into a PDF</a> format. You can also quickly <a href="/tool/pdf-to-jpg">save slides as individual images</a> or <a href="/tool/edit-pdf">add annotations to slides</a> natively before conversion.',
        faqs: [
            { q: 'How do I convert a PDF to editable PowerPoint?', a: 'DocShift turns each PDF page into an editable slide so you can reuse the content in PowerPoint.' },
            { q: 'Is PDF to PowerPoint conversion free?', a: 'Yes — free, no signup, and your file never leaves your device.' },
            { q: 'Can I edit the slides after converting?', a: 'Yes. Each page becomes a slide you can edit, restyle or reorder in your presentation software.' }
        ]
    },
    { 
        slug: 'pdf-to-excel', name: 'PDF to Excel', shortDesc: 'Extract PDF tables to XLSX.', desc: 'Pull data straight from PDFs into Excel spreadsheets in seconds.', icon: 'Sheet', category: 'convertFrom', color: '#F05B25', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.xlsx', outputMime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        seoTitle: 'Convert PDF to Excel (XLSX) | Extract Tables Free',
        seoDesc: 'Pull table data straight from PDFs into Excel spreadsheets. Instant, secure, and private PDF to XLSX conversion online.',
        seoKeywords: 'pdf to excel converter online, convert pdf tables to xlsx, free spreadsheet extractor, pull data to excel private',
        seoArticle: 'Quickly pull tabular data straight from PDF documents into standard Excel spreadsheets in seconds. Save hours of manual copy-pasting by letting our smart engine identify grids and rows flawlessly. If you need to share the spreadsheet later, <a href="/tool/excel-to-pdf">convert your Excel back to PDF format rigidly</a>. Rather pull out images or text? See our <a href="/tool/pdf-to-word">PDF to Word converter</a> for text, or <a href="/tool/pdf-to-jpg">extract images directly</a>.',
        faqs: [
            { q: 'How do I extract a table from PDF to Excel?', a: 'DocShift detects tabular data and exports it to an editable Excel (.xlsx) spreadsheet.' },
            { q: 'Is converting PDF to Excel free and private?', a: 'Yes. It runs in your browser with no upload, account or watermark.' },
            { q: 'Why are some cells misaligned after conversion?', a: 'PDFs store no true table structure, so complex or borderless tables may need minor cleanup after export.' }
        ]
    },
    {
        slug: 'pdf-to-pdfa', name: 'PDF to PDF/A', shortDesc: 'Convert to archival PDF format.', desc: 'Transform your PDF to PDF/A, the ISO-standardized version for long-term, regulation-compliant archiving.', icon: 'Archive', category: 'convertFrom', color: '#F05B25', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf',
        seoTitle: 'PDF to PDF/A Converter | Court E-Filing Compliant',
        seoDesc: 'Convert PDF to PDF/A, the ISO archival format required for court e-filing and long-term document compliance — free, private, and browser-based.',
        seoKeywords: 'pdf to pdf/a converter, court e-filing pdf format, iso archival pdf, long term pdf archiving, pdf/a compliance tool',
        seoArticle: 'Transform your standard PDF to PDF/A, an ISO-standardized format (ISO 19005) tailored specifically for long-term archiving and preservation. This embeds all fonts, flattens transparency, strips JavaScript and external references, and attaches an XMP metadata stream — guaranteeing that your document will render identically decades from now on any compliant reader. PDF/A is required for legal, government, and many regulated-industry submissions, and is the only archival format accepted by most court e-filing systems. To ensure archives don\'t consume too much space, be sure to <a href="/tool/compress-pdf">shrink PDF size</a> first. If you need robust legal verifiability, you should <a href="/tool/sign-pdf">add a digital signature</a> and <a href="/tool/protect-pdf">lock the document securely</a>.',
        faqs: [
            { q: 'Which PDF/A conformance level do you produce?', a: 'We target PDF/A-2b, the most widely accepted baseline for archival — visually identical to the source, with all fonts embedded.' },
            { q: 'Will PDF/A be larger than my original PDF?', a: 'Usually slightly larger because fonts are embedded. Run the result through <a href="/tool/compress-pdf">Compress PDF</a> to optimise.' }
        ]
    },

    // ── EDIT ────────────────────────────────────────────────────────────────
    { 
        slug: 'rotate-pdf', name: 'Rotate PDF', shortDesc: 'Fix page orientation.', desc: 'Rotate your PDF pages to the correct orientation. Apply to all or specific pages.', icon: 'RotateCw', category: 'edit', color: '#D7263D', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf',
        seoTitle: 'Rotate PDF Pages Free | Fix Document Orientation Private',
        seoDesc: 'Quickly rotate PDF pages online for free. Fix sideways documents securely without installing software or creating accounts.',
        seoKeywords: 'rotate pdf without software, flip pdf online, fix pdf orientation, private pdf rotator, turn pdf sideways',
        seoArticle: 'Did you scan a document upside down? Easily correct PDF page orientation with our free online tool. Rotate PDFs without software straight from your device. Applying transformations takes only a few seconds, letting you download the fixed document instantly. If you need to rearrange the page order entirely, launch our <a href="/tool/organize-pdf">free visual PDF organizer</a>. Sometimes you just need to <a href="/tool/crop-pdf">crop away empty margins</a>, or <a href="/tool/remove-pages">delete broken pages altogether</a>.',
        faqs: [
            { q: 'Does rotating my PDF upload it to a cloud?', a: 'No! Our tool focuses on privacy, securely processing your file manipulation to keep your document totally private.' },
            { q: 'Can I choose how many degrees to rotate it?', a: 'Yes, you can easily rotate your document clockwise (90 degrees), counter-clockwise, or completely flip it upside down (180 degrees).' }
        ]
    },
    { 
        slug: 'page-numbers', name: 'Add Page Numbers', shortDesc: 'Number your PDF pages.', desc: 'Insert page numbers with custom position, font size, and starting number.', icon: 'Hash', category: 'edit', color: '#D7263D', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf',
        seoTitle: 'Add Page Numbers to PDF | Free PDF Pagination Tool',
        seoDesc: 'Insert custom page numbers into a PDF document. Select font size, placement, and numbering styles efficiently in-browser.',
        seoKeywords: 'add page numbers to pdf, number pdf pages online, free pdf pagination, paginate pdf fast private',
        seoArticle: 'Insert clear, consistent page numbers across your entire PDF document. Setup custom positions, font sizing, and staring digits natively without complex desktop software. After numbering, you can easily <a href="/tool/edit-pdf">draw more highlights or text</a> dynamically. If you split a numbered document, try to <a href="/tool/extract-pages">export just the chapter pages</a> you need, or <a href="/tool/add-watermark">apply a bold watermark</a> to finalize the copy.',
        faqs: [
            { q: 'How do I add page numbers to a PDF for free?', a: 'Choose a position and style, and DocShift stamps sequential page numbers onto every page — free and in-browser.' },
            { q: 'Can I start numbering from a specific page?', a: 'Yes. Set the start page and starting number so numbering begins exactly where you want.' },
            { q: 'Will adding page numbers change my content?', a: 'No. Numbers are overlaid without altering the existing text or layout.' }
        ]
    },
    { 
        slug: 'add-watermark', name: 'Add Watermark', shortDesc: 'Stamp text over your PDF.', desc: 'Stamp a text watermark over your PDF pages with custom opacity and position.', icon: 'Droplets', category: 'edit', color: '#D7263D', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf',
        seoTitle: 'Add Watermark to PDF | Free Stamp & Transparency Tool',
        seoDesc: 'Stamp text or logo watermarks over your PDF pages. Fully customizable opacity and position entirely within your browser.',
        seoKeywords: 'add watermark to pdf free, stamp pdf text online, overlay pdf with watermark, secure watermark pdf',
        seoArticle: 'Stamp a bold text watermark over your PDF pages with custom opacity, color, and positioning. Perfect for tagging documents as "CONFIDENTIAL" or "DRAFT" safely. For ultimate verification, you can follow this up and <a href="/tool/sign-pdf">insert your signature</a> directly. Need to lock the watermark in place? <a href="/tool/protect-pdf">Secure the file with a password</a> so the watermark isn\'t removed. You can also <a href="/tool/edit-pdf">annotate the file</a> before stamping.',
        faqs: [
            { q: 'How do I add a watermark to a PDF for free?', a: 'Add a text or image watermark, set opacity and position, and download the stamped PDF — free with no signup.' },
            { q: 'Can I watermark every page at once?', a: 'Yes. The watermark applies across all pages in a single step.' },
            { q: 'Is the watermark tool private?', a: 'Yes. Your file is watermarked locally in your browser and never uploaded.' }
        ]
    },
    { 
        slug: 'crop-pdf', name: 'Crop PDF', shortDesc: 'Trim PDF margins.', desc: 'Crop the margins of a PDF or select specific areas to keep per page.', icon: 'Crop', category: 'edit', color: '#D7263D', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf',
        seoTitle: 'Crop PDF Pages Online | Free PDF Margin Trimmer',
        seoDesc: 'Crop the margins of a PDF document visually. Adjust bounding boxes to keep specific areas and remove empty blank space.',
        seoKeywords: 'crop pdf online free, trim pdf margins, snip pdf borders, adjust pdf visible area size private',
        seoArticle: 'Crop the margins of a PDF or select specific visual areas to keep using our intuitive drag interface. Trim out frustrating printer margins and oversized borders instantly completely for free. Once trimmed, it\'s a great idea to <a href="/tool/organize-pdf">reorder the newly cropped pages</a> safely, or use <a href="/tool/remove-pages">delete pages</a> if you see entirely blank ones. Do you want to modify orientation? <a href="/tool/rotate-pdf">Rotate pages swiftly</a> instead.',
        faqs: [
            { q: 'How do I crop the margins of a PDF?', a: 'Drag the crop box to trim unwanted margins or white space, then download the cropped PDF.' },
            { q: 'Can I crop all pages to the same size?', a: 'Yes. Apply one crop area across every page for a consistent result.' },
            { q: 'Does cropping delete the trimmed content?', a: 'Cropping reduces the visible page size without re-rendering your content — the outer area is hidden from view.' }
        ]
    },
    { 
        slug: 'edit-pdf', name: 'Edit PDF', shortDesc: 'Add text, shapes, and images.', desc: 'Add text, images, shapes or freehand annotations directly onto a PDF document.', icon: 'PenLine', category: 'edit', color: '#D7263D', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf', hasCanvas: true,
        seoTitle: 'Free PDF Editor | No Watermark, No Sign Up',
        seoDesc: 'Edit PDFs free with no watermark and no sign up. Add text, images, shapes, or annotations directly in your browser — completely private.',
        seoKeywords: 'free pdf editor no watermark, edit pdf no sign up, annotate pdf online free, add text to pdf private, pdf editor without account',
        seoArticle: 'Our flagship editor allows you to add text, images, shapes, or freehand annotations directly onto any PDF document smoothly. No clunky software installations just rapid, private editing right in your web browser. Try to <a href="/tool/add-watermark">overlay a global watermark</a> on top of your edits, or <a href="/tool/page-numbers">paginate the file</a> quickly. If you need a legal finish, simply <a href="/tool/sign-pdf">affix your digital signature</a>.',
        faqs: [
            { q: 'How do I edit text in a PDF without Adobe?', a: 'DocShift lets you add text, shapes, images and annotations to a PDF free in your browser — no Acrobat or install required.' },
            { q: 'Is there a free PDF editor with no watermark?', a: 'Yes. DocShift never adds a watermark and has no paywall — your edited PDF downloads clean.' },
            { q: 'Can I edit a PDF on my phone?', a: 'The editor runs in any browser, so you can edit PDFs on mobile or desktop without an app.' }
        ]
    },

    // ── SECURITY ────────────────────────────────────────────────────────────
    { 
        slug: 'unlock-pdf', name: 'Unlock PDF', shortDesc: 'Remove PDF password.', desc: 'Remove PDF password security, giving you the freedom to use your PDF as you want.', icon: 'Unlock', category: 'security', color: '#FF4D4D', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf',
        seoTitle: 'Unlock PDF Password Restrictions | Remove Password Free',
        seoDesc: 'Remove file passwords and security restrictions from your PDFs, granting you freedom to use your document without friction.',
        seoKeywords: 'unlock pdf password online, remove pdf security free, clear pdf password completely private, unprotect pdf',
        seoArticle: 'Remove PDF password security and printing restrictions frictionlessly. Our unlocking utility strips out protection natively granting you total freedom over your file instantly. Conversely, if you want to lock an unprotected file, use our <a href="/tool/protect-pdf">secure PDF password tool</a>. If the file is still structurally broken after unlocking, our <a href="/tool/repair-pdf">expert PDF repair suite</a> can salvage the data. You can also <a href="/tool/redact-pdf">blackout sensitive info</a>.',
        faqs: [
            { q: 'How do I remove a password from a PDF?', a: 'Enter the current password and DocShift produces an unlocked copy with the restriction removed.' },
            { q: 'Is it legal to unlock a PDF?', a: 'Only unlock PDFs you own or have permission to access. DocShift never stores your file or password.' },
            { q: 'Can I unlock a PDF without the password?', a: 'No. You must know the password — this tool removes protection only from documents you can already open.' }
        ]
    },
    { 
        slug: 'protect-pdf', name: 'Protect PDF', shortDesc: 'Lock PDF with a password.', desc: 'Protect PDF files with AES-256 encryption and custom access permissions.', icon: 'Lock', category: 'security', color: '#FF4D4D', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf',
        seoTitle: 'Protect PDF with Password | Secure Encryption Free',
        seoDesc: 'Protect PDF files using powerful AES encryption. Add strong passwords to prevent viewing, printing, or modification easily.',
        seoKeywords: 'protect pdf with password, encrypt pdf file online, secure pdf from copying private, add password lock to pdf free',
        seoArticle: 'Protect highly-sensitive PDF files with industry-standard AES encryption and completely customizable access permissions. Lockdown viewing and block text-copying securely without installing heavy apps. Got the wrong password set? Quickly <a href="/tool/unlock-pdf">remove the PDF password restrictions</a>. Often before encrypting, professionals prefer to <a href="/tool/sign-pdf">sign the document</a> or <a href="/tool/redact-pdf">permanently blackout text</a> from public view entirely.',
        faqs: [
            { q: 'How do I password-protect a PDF for free?', a: 'Set a password and DocShift encrypts your PDF so only people with the password can open it — free and in-browser.' },
            { q: 'What encryption is used?', a: 'The PDF is secured with standard AES encryption applied locally on your device.' },
            { q: 'Can I remove the password later?', a: 'Yes, with the <a href="/tool/unlock-pdf">Unlock PDF</a> tool if you know the password.' }
        ]
    },
    { 
        slug: 'sign-pdf', name: 'Sign PDF', shortDesc: 'Add your signature to a PDF.', desc: 'Draw, type, or upload a signature and place it anywhere on your PDF.', icon: 'Pen', category: 'security', color: '#FF4D4D', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf', hasThumbnails: true,
        seoTitle: 'Sign PDF Without Uploading | Free eSignature Tool',
        seoDesc: 'Draw, type, or upload a signature and place it on your PDF without uploading the document to any server. Free and 100% private in your browser.',
        seoKeywords: 'sign pdf without uploading, esignature free private, draw signature on pdf secure, add signature to pdf online, sign document no upload',
        seoArticle: 'Draw, type, or effortlessly upload a signature image and place it smoothly anywhere on your PDF document. Getting legally binding signatures is fundamentally seamless and 100% private since processing stays on your machine. You can easily <a href="/tool/protect-pdf">lock your signed file</a> to prevent modifications, or <a href="/tool/add-watermark">stamp a massive watermark</a> beneath the signature natively. Feel free to <a href="/tool/edit-pdf">type your initials or dates</a> natively.',
        faqs: [
            { q: 'Is an electronic signature on a PDF legally binding?', a: 'In most countries a clear electronic signature is valid for common agreements. For regulated documents, check your local e-signature law.' },
            { q: 'How do I sign a PDF without printing and scanning?', a: 'Type or draw your signature directly on the PDF in your browser and download the signed file — no printer or scanner needed.' },
            { q: 'Can I sign a PDF on my phone for free?', a: 'Yes. The signer works in any mobile browser, free, and your document never leaves your device.' }
        ]
    },
    {
        slug: 'redact-pdf', name: 'Redact PDF', shortDesc: 'Permanently hide sensitive info.', desc: 'Permanently blackout text and graphics so sensitive information cannot be recovered from your PDF.', icon: 'EyeOff', category: 'security', color: '#FF4D4D', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf', hasThumbnails: true,
        seoTitle: 'Redact PDF Permanently | Not Just a Black Box',
        seoDesc: 'Permanently redact PDF text and images — not just a black box overlay. The underlying data is stripped for good, processed securely in your browser.',
        seoKeywords: 'redact pdf permanently, not just a black box pdf, truly remove text from pdf, permanent pdf redaction, secure redaction tool',
        seoArticle: 'Permanently redact localized text and graphics to confidently eradicate extremely sensitive information from your PDF file. Unlike simply drawing a black rectangle (which leaves the underlying text intact and recoverable), our engine irrevocably strips the underlying glyph data, metadata, and text-layer references — so redacted content is gone for good, even if someone opens the file in a forensic tool. This is the only safe redaction method for PII, financials, and legal discovery. Ensure to <a href="/tool/protect-pdf">add an encryption password</a> for a secondary layer of security lock, or <a href="/tool/remove-pages">completely remove specific sensitive pages</a>. You can also <a href="/tool/compare-pdf">compare the redacted file visually</a> against the unredacted original.',
        faqs: [
            { q: 'Is your redaction truly permanent?', a: 'Yes. We replace the underlying text objects with black rectangles and remove them from the content stream. Copy-paste, search, and PDF text extraction will return nothing.' },
            { q: 'Can I redact only specific words, not whole regions?', a: 'Yes — use the text-select mode to choose individual words or phrases; the rest of the page stays intact.' }
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
        seoArticle: 'Smoothly translate whole PDF files using advanced embedded AI technology. Keeps your complex fonts, document layouts, and standard formatting perfectly intact without breaking rows. Need to manually adjust the translation output? Utilize our built in <a href="/tool/edit-pdf">PDF text annotator</a> immediately. If you need searchability alongside translation, <a href="/tool/ocr-pdf">run our OCR toolkit natively</a>, or easily <a href="/tool/word-to-pdf">convert it from Word formats</a> dynamically.',
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
