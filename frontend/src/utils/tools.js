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
        seoTitle: 'Split PDF Pages Online Free | Extract PDF Securely',
        seoDesc: 'Easily split PDF pages online for free. Extract pages securely directly in your browser without uploading to any server.',
        seoKeywords: 'split pdf pages online free, extract pdf pages, split pdf no upload, separate pdf pages, private pdf splitter',
        seoArticle: 'Split a large PDF document into multiple smaller files or extract specific pages entirely for free. Our online splitter is incredibly fast, bypassing slow upload queues by running the tasks securely locally. Once split, you can <a href="/tool/merge-pdf">combine PDF files</a> again or use our tool to <a href="/tool/remove-pages">delete pages from a PDF</a>. If you need fine-grained control over extracting pages, try to <a href="/tool/extract-pages">pull out selected pages</a>.',
        faqs: [
            { q: 'How do I extract specific pages?', a: 'Simply enter the page ranges you want to extract (e.g., "1-3, 5") and click process. We will instantly package the specific pages into a secure download.' },
            { q: 'Are my split PDFs secure?', a: 'Absolutely. We do not retain or read the contents of your PDF files. Your privacy is guaranteed.' }
        ]
    },
    { 
        slug: 'remove-pages', name: 'Remove Pages', shortDesc: 'Delete pages from a PDF.', desc: 'Select and permanently remove specific pages from your PDF document.', icon: 'Trash2', category: 'organize', color: '#F05B25', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf', hasThumbnails: true,
        seoTitle: 'Remove Pages from PDF Free | Delete PDF Pages Online',
        seoDesc: 'Delete specific pages from a PDF document securely. Visual page removal tool that processes files 100% locally in your browser.',
        seoKeywords: 'remove pages from pdf, delete pdf pages online, free pdf page remover, remove pdf sections securely',
        seoArticle: 'Remove unwanted pages from your PDF document entirely for free. This visual tool lets you delete specific pages from a PDF quickly and securely without uploading your data. If you removed the wrong pages, you can easily <a href="/tool/merge-pdf">merge PDF files back</a> to restore them. Looking to pull pages out instead of deleting them? You can <a href="/tool/extract-pages">extract specific pages</a> or <a href="/tool/organize-pdf">reorder pdf pages</a> for a cleaner document structure.'
    },
    { 
        slug: 'extract-pages', name: 'Extract Pages', shortDesc: 'Pull out selected pages.', desc: 'Extract specific pages from a PDF into a new document or separate files.', icon: 'FolderOpen', category: 'organize', color: '#F05B25', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf', hasThumbnails: true,
        seoTitle: 'Extract Pages from PDF Online | Free & Secure Extraction',
        seoDesc: 'Pull specific pages out of any PDF document completely free. Extract pages securely in your web browser with zero file uploads.',
        seoKeywords: 'extract pages from pdf, pull out pdf pages, online pdf extractor, save selected pages from pdf',
        seoArticle: 'Easily extract pages from any PDF document into a fresh file. This tool is completely free and completely private. It runs fully in your browser, meaning you never upload sensitive files. If you extracted pages to combine them with another file, head over to the <a href="/tool/merge-pdf">secure PDF merger</a>. Alternatively, if your goal is just to cut the file in half, try to <a href="/tool/split-pdf">split your PDF pages</a>. You can also <a href="/tool/remove-pages">delete unwanted pages</a> directly.'
    },
    { 
        slug: 'organize-pdf', name: 'Organize PDF', shortDesc: 'Sort and reorder pages visually.', desc: 'Drag to reorder pages, rotate individual pages, and delete unwanted ones.', icon: 'LayoutGrid', category: 'organize', color: '#F05B25', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf', hasThumbnails: true,
        seoTitle: 'Organize & Reorder PDF Pages Free | Visual PDF Sorter',
        seoDesc: 'Drag and drop to sort, reorder, and organize your PDF pages. Free browser-based tool to visually rearrange PDF documents.',
        seoKeywords: 'organize pdf pages online, reorder pdf pages, sort pdf pages, arrange pdf layout free',
        seoArticle: 'Organize your PDF files by dragging and dropping pages into the correct order. This visual organizer lets you sort and reorder PDF pages instantly directly in your browser. Since it runs locally, it is 100% private. While organizing, you notice some upside-down pages? Easily <a href="/tool/rotate-pdf">fix page orientation</a>. You can also <a href="/tool/remove-pages">permanently delete pages</a> or <a href="/tool/merge-pdf">combine multiple PDFs</a> to organize them all at once.'
    },
    { 
        slug: 'scan-to-pdf', name: 'Scan to PDF', shortDesc: 'Turn scans into a PDF.', desc: 'Convert camera scans or image files into a single PDF document.', icon: 'ScanLine', category: 'organize', color: '#F05B25', accept: { 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'], 'image/webp': ['.webp'] }, multiple: true, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf',
        seoTitle: 'Convert Scans & Images to PDF | Free Scan to PDF Tool',
        seoDesc: 'Transform JPG, JPEG, and PNG images or camera scans into a single, clean PDF file securely in your web browser.',
        seoKeywords: 'scan to pdf, convert scan to pdf document, images to pdf converter, make pdf from camera scan',
        seoArticle: 'Turn any photo scan, JPG, or PNG image into a cohesive PDF document instantly. Our free tool converts camera scans and image files into a single PDF document locally on your device for unmatched privacy. Need your resulting file to be text-searchable? Use our <a href="/tool/ocr-pdf">OCR PDF tool</a> after converting. It is often necessary to <a href="/tool/compress-pdf">shrink PDF file sizes</a> after combining multiple high-resolution images. You can also explicitly <a href="/tool/jpg-to-pdf">convert images to PDF</a> in batches.'
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
        slug: 'repair-pdf', name: 'Repair PDF', shortDesc: 'Fix corrupted PDF files.', desc: 'Repair a damaged PDF and recover data from corrupt PDF files automatically.', icon: 'Wrench', category: 'optimize', color: '#F05B25', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf',
        seoTitle: 'Repair Corrupted PDF Files | Free Online PDF Recovery',
        seoDesc: 'Fix broken or corrupted PDF documents instantly. Recover data securely from damaged PDFs completely within your browser.',
        seoKeywords: 'repair corrupted pdf, fix broken pdf online, recover damaged pdf, fix pdf file free',
        seoArticle: 'Repair a damaged PDF and recover critical data from corrupt PDF files automatically with our free recovery engine. It attempts to rebuild internal PDF structures and salvage your content. If the file opens but is locked, try our <a href="/tool/unlock-pdf">remove PDF password tool</a>. After your document is fixed, you might want to <a href="/tool/compress-pdf">optimize its size</a> for sharing, or <a href="/tool/pdf-to-pdfa">convert it to PDF/A</a> for long-term safe archiving.'
    },
    { 
        slug: 'ocr-pdf', name: 'OCR PDF', shortDesc: 'Make scanned PDFs searchable.', desc: 'Convert scanned image PDFs into fully searchable and selectable documents.', icon: 'ScanText', category: 'optimize', color: '#F05B25', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf',
        seoTitle: 'OCR PDF Online | Make PDF Text Searchable Free',
        seoDesc: 'Run Optical Character Recognition (OCR) on scanned PDFs to make text fully searchable and selectable without uploading files.',
        seoKeywords: 'ocr pdf online, make pdf searchable, convert scan to text, text recognition pdf free',
        seoArticle: 'Convert scanned image PDFs into fully searchable and selectable text documents securely. Our OCR engine runs directly inside your browser, turning invisible image text into highly accurate selectable metadata. If you\'d rather extract all that text into a document editor, try to <a href="/tool/pdf-to-word">convert PDF to editable Word</a>. Have raw photos? First <a href="/tool/scan-to-pdf">create a PDF from your scans</a>, then run OCR, or <a href="/tool/translate-pdf">translate the PDF text</a> after recognition.'
    },

    // ── CONVERT TO PDF ──────────────────────────────────────────────────────
    { 
        slug: 'jpg-to-pdf', name: 'JPG to PDF', shortDesc: 'Convert images to PDF.', desc: 'Convert JPG and PNG images to PDF with adjustable orientation and margins.', icon: 'Images', category: 'convertTo', color: '#F05B25', accept: { 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'] }, multiple: true, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf',
        seoTitle: 'Convert JPG & PNG to PDF | Free Image to PDF Converter',
        seoDesc: 'Combine multiple images into a single PDF document. Free, secure converter for JPG and PNG to PDF running in your browser.',
        seoKeywords: 'jpg to pdf converter, convert png to pdf, image to pdf online, combine images to pdf free',
        seoArticle: 'Convert JPG and PNG images to a portable PDF format with ease. Adjust orientation and margins to create a stunning customized PDF album or document from raw images. Because our tool runs locally, your sensitive photos are 100% private. Want to pull images out of a PDF instead? Run our <a href="/tool/pdf-to-jpg">export PDF pages as images tool</a>. If your images result in a huge file, use our <a href="/tool/compress-pdf">file size shrinker</a>, or take pictures using the <a href="/tool/scan-to-pdf">Scan to PDF feature</a>.'
    },
    { 
        slug: 'word-to-pdf', name: 'Word to PDF', shortDesc: 'Convert DOCX files to PDF.', desc: 'Make DOC and DOCX files easy to read by converting them to PDF.', icon: 'FileText', category: 'convertTo', color: '#F05B25', accept: { 'application/msword': ['.doc'], 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf',
        seoTitle: 'Convert Word DOCX to PDF Online | Free Private Converter',
        seoDesc: 'Convert Word documents (DOC, DOCX) to PDF format seamlessly. Free, quick, and secure without sharing your sensitive documents.',
        seoKeywords: 'word to pdf converter, convert docx to pdf, doc to pdf free online, secure word to pdf',
        seoArticle: 'Make DOC and DOCX files perfectly readable on any device by converting them into PDF formatting. Our converter ensures your documents look exactly the same across different software platforms. If you need to go in the opposite direction later, you can <a href="/tool/pdf-to-word">convert PDF back to Word</a> easily. Once converted to PDF, you can securely <a href="/tool/sign-pdf">add your signature</a> or <a href="/tool/protect-pdf">lock it with a password</a> before sending.'
    },
    { 
        slug: 'pptx-to-pdf', name: 'PowerPoint to PDF', shortDesc: 'Convert presentations to PDF.', desc: 'Make PPT and PPTX slideshows easy to view by converting them to PDF.', icon: 'Presentation', category: 'convertTo', color: '#F05B25', accept: { 'application/vnd.ms-powerpoint': ['.ppt'], 'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf',
        seoTitle: 'PowerPoint to PDF Converter | Convert PPT & PPTX Free',
        seoDesc: 'Convert PPT and PPTX slideshows into clean PDF files. Secure browser-conversion ensures your presentations stay private.',
        seoKeywords: 'powerpoint to pdf, convert pptx to pdf online, ppt to pdf completely free, secure presentation converter',
        seoArticle: 'Make your PPT and PPTX slideshows incredibly easy to view and share by converting them to PDF format. This prevents formatting issues and ensures anyone can read your presentation without needing Office installed. Check out our reverse tool if you ever need to <a href="/tool/pdf-to-pptx">turn PDFs back to slide decks</a>. You might also want to <a href="/tool/add-watermark">add a watermark</a> to protect your presentation, or <a href="/tool/merge-pdf">combine multiple presentations</a>.'
    },
    { 
        slug: 'excel-to-pdf', name: 'Excel to PDF', shortDesc: 'Convert spreadsheets to PDF.', desc: 'Make Excel spreadsheets easy to read by converting them to PDF format.', icon: 'Table', category: 'convertTo', color: '#F05B25', accept: { 'application/vnd.ms-excel': ['.xls'], 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf',
        seoTitle: 'Excel to PDF Converter | Free XLSX Worksheet Conversion',
        seoDesc: 'Convert Excel spreadsheets (XLS, XLSX) into perfectly scaled PDF documents. 100% private and rapid financial document processing.',
        seoKeywords: 'excel to pdf converter, convert xlsx to pdf online, free spreadsheet to pdf, turn xls into pdf',
        seoArticle: 'Make complex Excel spreadsheets easy to read by securely converting them to rigid PDF format. This locks your data layout in place so your invoices and financial sheets print perfectly. Need to extract tabular data from a previously converted file? <a href="/tool/pdf-to-excel">Convert PDF back to Excel</a> in seconds. Once you have a PDF, you can easily <a href="/tool/protect-pdf">add a password</a> or <a href="/tool/redact-pdf">permanently hide sensitive financial data</a>.'
    },
    { 
        slug: 'html-to-pdf', name: 'HTML to PDF', shortDesc: 'Convert any webpage to PDF.', desc: 'Convert webpages to PDF by entering a URL. Preserves layout and styles.', icon: 'Globe', category: 'convertTo', color: '#F05B25', accept: null, multiple: false, minFiles: 0, urlInput: true, outputExt: '.pdf', outputMime: 'application/pdf',
        seoTitle: 'Save Webpage to PDF Online | Convert HTML URL to PDF Free',
        seoDesc: 'Convert any public webpage to an exact PDF replica. Just paste a URL to capture the site layout and styles securely.',
        seoKeywords: 'html to pdf online, convert webpage to pdf, save website as pdf file, secure URL to pdf',
        seoArticle: 'Convert entire webpages to high-quality PDF files simply by entering a URL. Our tool fetches the site and renders the exact layout and styles securely. Once you\'ve captured a webpage, you may want to <a href="/tool/compress-pdf">shrink the final document</a> since modern sites render large PDFs. Alternatively, you can <a href="/tool/pdf-to-jpg">save the webpage PDF as image snapshots</a> or <a href="/tool/crop-pdf">trim away unnecessary margins</a>.'
    },

    // ── CONVERT FROM PDF ────────────────────────────────────────────────────
    { 
        slug: 'pdf-to-jpg', name: 'PDF to JPG', shortDesc: 'Export PDF pages as images.', desc: 'Convert each PDF page into a JPG image or extract all embedded images.', icon: 'Image', category: 'convertFrom', color: '#F05B25', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.zip', outputMime: 'application/zip',
        seoTitle: 'Convert PDF to JPG Free | Extract PDF Images Online',
        seoDesc: 'Export all PDF pages as high-quality JPG images or extract embedded photos. Free and entirely private in your browser.',
        seoKeywords: 'pdf to jpg converter, convert pdf pages to image, extract images from pdf free, save pdf as pictures',
        seoArticle: 'Convert PDF documents into high-resolution JPG images. You can choose to export every single page as a separate JPG or instruct the tool to extract original embedded images directly. Need to go the other way? <a href="/tool/jpg-to-pdf">Convert standard images into a smooth PDF</a>. If you only want an image of specific areas, you can <a href="/tool/extract-pages">export specific pages</a> first, or even <a href="/tool/html-to-pdf">save raw websites as PDFs</a> before conversion.'
    },
    { 
        slug: 'pdf-to-word', name: 'PDF to Word', shortDesc: 'Convert PDF to editable DOCX.', desc: 'Easily convert PDF files into editable DOC and DOCX documents.', icon: 'FileOutput', category: 'convertFrom', color: '#F05B25', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.docx', outputMime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        seoTitle: 'Convert PDF to Word DOCX | Editable Private Converter',
        seoDesc: 'Easily convert PDF files into editable DOC and DOCX Word documents. Highly accurate text extraction processed securely.',
        seoKeywords: 'pdf to word converter online, convert pdf to docx free, editable pdf to word private, extract text to word',
        seoArticle: 'Easily convert static PDF files into completely editable DOC and DOCX Word documents. Our robust extraction accurately matches formatting, paragraphs, and tables completely within your browser. Once your Word doc is edited, you can quickly <a href="/tool/word-to-pdf">convert it back to PDF securely</a>. Need more direct editing without Word? Try our in-browser <a href="/tool/edit-pdf">PDF annotation tool</a>, or run <a href="/tool/ocr-pdf">OCR for scanned documents</a> before converting to Word.'
    },
    { 
        slug: 'pdf-to-pptx', name: 'PDF to PowerPoint', shortDesc: 'Turn PDFs into slide decks.', desc: 'Turn your PDF files into easy to edit PPT and PPTX slideshows.', icon: 'MonitorPlay', category: 'convertFrom', color: '#F05B25', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pptx', outputMime: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        seoTitle: 'Convert PDF to PowerPoint (PPTX) | Slideshow Generator Free',
        seoDesc: 'Turn your PDF documents into easy-to-edit PPTX slideshow presentations. Free secure conversion done on your device entirely.',
        seoKeywords: 'pdf to powerpoint converter, convert pdf to pptx online, free pdf to slide deck private, editable pdf to ppt',
        seoArticle: 'Turn your PDF files into easy to edit PPT and PPTX slideshows. This tool converts each PDF page into a PowerPoint slide seamlessly, retaining vectors and text so you can present like a pro. Need to finalize a finished PowerPoint? Instantly <a href="/tool/pptx-to-pdf">convert it back into a PDF</a> format. You can also quickly <a href="/tool/pdf-to-jpg">save slides as individual images</a> or <a href="/tool/edit-pdf">add annotations to slides</a> natively before conversion.'
    },
    { 
        slug: 'pdf-to-excel', name: 'PDF to Excel', shortDesc: 'Extract PDF tables to XLSX.', desc: 'Pull data straight from PDFs into Excel spreadsheets in seconds.', icon: 'Sheet', category: 'convertFrom', color: '#F05B25', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.xlsx', outputMime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        seoTitle: 'Convert PDF to Excel (XLSX) | Extract Tables Free',
        seoDesc: 'Pull table data straight from PDFs into Excel spreadsheets. Instant, secure, and private PDF to XLSX conversion online.',
        seoKeywords: 'pdf to excel converter online, convert pdf tables to xlsx, free spreadsheet extractor, pull data to excel private',
        seoArticle: 'Quickly pull tabular data straight from PDF documents into standard Excel spreadsheets in seconds. Save hours of manual copy-pasting by letting our smart engine identify grids and rows flawlessly. If you need to share the spreadsheet later, <a href="/tool/excel-to-pdf">convert your Excel back to PDF format rigidly</a>. Rather pull out images or text? See our <a href="/tool/pdf-to-word">PDF to Word converter</a> for text, or <a href="/tool/pdf-to-jpg">extract images directly</a>.'
    },
    { 
        slug: 'pdf-to-pdfa', name: 'PDF to PDF/A', shortDesc: 'Convert to archival PDF format.', desc: 'Transform your PDF to PDF/A, the ISO-standardized version for long-term archiving.', icon: 'Archive', category: 'convertFrom', color: '#F05B25', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf',
        seoTitle: 'Convert PDF to PDF/A | Free Document Archiving Tool',
        seoDesc: 'Transform your PDF to PDF/A formatting, the ISO-standardized version tailored for long-term safe archiving.',
        seoKeywords: 'convert pdf to pdf/a online, free archive format converter, ensure long term preservation pdf, pdf to archival format',
        seoArticle: 'Transform your standard PDF to PDF/A, an ISO-standardized format tailored specifically for long-term archiving and preservation. This fixes fonts and strips harmful active content guaranteeing standard readability in the future. To ensure archives don\'t consume too much space, be sure to <a href="/tool/compress-pdf">shrink PDF size</a> first. If you need robust legal verifiability, you should <a href="/tool/sign-pdf">add a digital signature</a> and <a href="/tool/protect-pdf">lock the document securely</a>.'
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
        seoArticle: 'Insert clear, consistent page numbers across your entire PDF document. Setup custom positions, font sizing, and staring digits natively without complex desktop software. After numbering, you can easily <a href="/tool/edit-pdf">draw more highlights or text</a> dynamically. If you split a numbered document, try to <a href="/tool/extract-pages">export just the chapter pages</a> you need, or <a href="/tool/add-watermark">apply a bold watermark</a> to finalize the copy.'
    },
    { 
        slug: 'add-watermark', name: 'Add Watermark', shortDesc: 'Stamp text over your PDF.', desc: 'Stamp a text watermark over your PDF pages with custom opacity and position.', icon: 'Droplets', category: 'edit', color: '#D7263D', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf',
        seoTitle: 'Add Watermark to PDF | Free Stamp & Transparency Tool',
        seoDesc: 'Stamp text or logo watermarks over your PDF pages. Fully customizable opacity and position entirely within your browser.',
        seoKeywords: 'add watermark to pdf free, stamp pdf text online, overlay pdf with watermark, secure watermark pdf',
        seoArticle: 'Stamp a bold text watermark over your PDF pages with custom opacity, color, and positioning. Perfect for tagging documents as "CONFIDENTIAL" or "DRAFT" safely. For ultimate verification, you can follow this up and <a href="/tool/sign-pdf">insert your signature</a> directly. Need to lock the watermark in place? <a href="/tool/protect-pdf">Secure the file with a password</a> so the watermark isn\'t removed. You can also <a href="/tool/edit-pdf">annotate the file</a> before stamping.'
    },
    { 
        slug: 'crop-pdf', name: 'Crop PDF', shortDesc: 'Trim PDF margins.', desc: 'Crop the margins of a PDF or select specific areas to keep per page.', icon: 'Crop', category: 'edit', color: '#D7263D', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf',
        seoTitle: 'Crop PDF Pages Online | Free PDF Margin Trimmer',
        seoDesc: 'Crop the margins of a PDF document visually. Adjust bounding boxes to keep specific areas and remove empty blank space.',
        seoKeywords: 'crop pdf online free, trim pdf margins, snip pdf borders, adjust pdf visible area size private',
        seoArticle: 'Crop the margins of a PDF or select specific visual areas to keep using our intuitive drag interface. Trim out frustrating printer margins and oversized borders instantly completely for free. Once trimmed, it\'s a great idea to <a href="/tool/organize-pdf">reorder the newly cropped pages</a> safely, or use <a href="/tool/remove-pages">delete pages</a> if you see entirely blank ones. Do you want to modify orientation? <a href="/tool/rotate-pdf">Rotate pages swiftly</a> instead.'
    },
    { 
        slug: 'edit-pdf', name: 'Edit PDF', shortDesc: 'Add text, shapes, and images.', desc: 'Add text, images, shapes or freehand annotations directly onto a PDF document.', icon: 'PenLine', category: 'edit', color: '#D7263D', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf', hasCanvas: true,
        seoTitle: 'Edit PDF Online Free | Draw, Add Text & Annotate Private',
        seoDesc: 'A fully-featured PDF editor in your browser. Add text, images, shapes or freehand annotations directly onto a PDF document.',
        seoKeywords: 'edit pdf online free, add text to pdf private, draw on pdf browser, annotate pdf completely free without software',
        seoArticle: 'Our flagship editor allows you to add text, images, shapes, or freehand annotations directly onto any PDF document smoothly. No clunky software installations just rapid, private editing right in your web browser. Try to <a href="/tool/add-watermark">overlay a global watermark</a> on top of your edits, or <a href="/tool/page-numbers">paginate the file</a> quickly. If you need a legal finish, simply <a href="/tool/sign-pdf">affix your digital signature</a>.'
    },

    // ── SECURITY ────────────────────────────────────────────────────────────
    { 
        slug: 'unlock-pdf', name: 'Unlock PDF', shortDesc: 'Remove PDF password.', desc: 'Remove PDF password security, giving you the freedom to use your PDF as you want.', icon: 'Unlock', category: 'security', color: '#FF4D4D', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf',
        seoTitle: 'Unlock PDF Password Restrictions | Remove Password Free',
        seoDesc: 'Remove file passwords and security restrictions from your PDFs, granting you freedom to use your document without friction.',
        seoKeywords: 'unlock pdf password online, remove pdf security free, clear pdf password completely private, unprotect pdf',
        seoArticle: 'Remove PDF password security and printing restrictions frictionlessly. Our unlocking utility strips out protection natively granting you total freedom over your file instantly. Conversely, if you want to lock an unprotected file, use our <a href="/tool/protect-pdf">secure PDF password tool</a>. If the file is still structurally broken after unlocking, our <a href="/tool/repair-pdf">expert PDF repair suite</a> can salvage the data. You can also <a href="/tool/redact-pdf">blackout sensitive info</a>.'
    },
    { 
        slug: 'protect-pdf', name: 'Protect PDF', shortDesc: 'Lock PDF with a password.', desc: 'Protect PDF files with AES-256 encryption and custom access permissions.', icon: 'Lock', category: 'security', color: '#FF4D4D', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf',
        seoTitle: 'Protect PDF with Password | Secure Encryption Free',
        seoDesc: 'Protect PDF files using powerful AES encryption. Add strong passwords to prevent viewing, printing, or modification easily.',
        seoKeywords: 'protect pdf with password, encrypt pdf file online, secure pdf from copying private, add password lock to pdf free',
        seoArticle: 'Protect highly-sensitive PDF files with industry-standard AES encryption and completely customizable access permissions. Lockdown viewing and block text-copying securely without installing heavy apps. Got the wrong password set? Quickly <a href="/tool/unlock-pdf">remove the PDF password restrictions</a>. Often before encrypting, professionals prefer to <a href="/tool/sign-pdf">sign the document</a> or <a href="/tool/redact-pdf">permanently blackout text</a> from public view entirely.'
    },
    { 
        slug: 'sign-pdf', name: 'Sign PDF', shortDesc: 'Add your signature to a PDF.', desc: 'Draw, type, or upload a signature and place it anywhere on your PDF.', icon: 'Pen', category: 'security', color: '#FF4D4D', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf', hasThumbnails: true,
        seoTitle: 'Sign PDF Documents Online | Free eSignature Maker',
        seoDesc: 'Draw, type, or upload a signature and stamp it securely anywhere on your PDF. Powerful, fast, and completely free signing.',
        seoKeywords: 'sign pdf document online, draw signature on pdf, add esignature to pdf free, secure electronic sign PDF',
        seoArticle: 'Draw, type, or effortlessly upload a signature image and place it smoothly anywhere on your PDF document. Getting legally binding signatures is fundamentally seamless and 100% private since processing stays on your machine. You can easily <a href="/tool/protect-pdf">lock your signed file</a> to prevent modifications, or <a href="/tool/add-watermark">stamp a massive watermark</a> beneath the signature natively. Feel free to <a href="/tool/edit-pdf">type your initials or dates</a> natively.'
    },
    { 
        slug: 'redact-pdf', name: 'Redact PDF', shortDesc: 'Permanently hide sensitive info.', desc: 'Permanently redact text and graphics to remove sensitive information from a PDF.', icon: 'EyeOff', category: 'security', color: '#FF4D4D', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf', hasThumbnails: true,
        seoTitle: 'Redact PDF Information | Blackout Text Permanently Free',
        seoDesc: 'Permanently redact text and graphics to strip deeply sensitive information from a PDF securely without data leaks.',
        seoKeywords: 'redact pdf text free, blackout pdf information private, censor pdf file online, scrub sensitive data from pdf',
        seoArticle: 'Permanently redact localized text and graphics to confidently eradicate extremely sensitive information from your PDF file. Unlike basic drawing tools, our engine irrevocably strips the metadata eliminating structural leaks entirely. Ensure to <a href="/tool/protect-pdf">add an encryption password</a> for a secondary layer of security lock, or <a href="/tool/remove-pages">completely remove specific sensitive pages</a>. You can also <a href="/tool/compare-pdf">compare the redacted file visually</a>.'
    },
    { 
        slug: 'compare-pdf', name: 'Compare PDF', shortDesc: 'Spot changes between two PDFs.', desc: 'Show a side-by-side document comparison and easily spot changes between versions.', icon: 'GitCompare', category: 'security', color: '#FF4D4D', accept: { 'application/pdf': ['.pdf'] }, multiple: true, minFiles: 2, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf',
        seoTitle: 'Compare PDF Files Online | Spot Text Differences Free',
        seoDesc: 'Display a dynamic side-by-side document comparison to easily spot changes between PDF versions quickly and precisely.',
        seoKeywords: 'compare pdf files difference, find changes in pdf online, spot pdf updates private, pdf diff tool free',
        seoArticle: 'Deploy a powerful side-by-side document comparison system to rapidly spot subtle textual changes between two PDF file versions. Excellent for contracts and design modifications. If you see the documents check out fine, immediately <a href="/tool/merge-pdf">combine both PDF models</a> together efficiently. Alternatively, <a href="/tool/redact-pdf">blackout any discrepancies</a> directly, or <a href="/tool/split-pdf">cut out the mismatched pages completely</a>.'
    },

    // ── INTELLIGENCE ────────────────────────────────────────────────────────
    { 
        slug: 'translate-pdf', name: 'Translate PDF', shortDesc: 'AI-powered PDF translation.', desc: 'Easily translate PDF files powered by AI. Keeps fonts, layout, and formatting intact.', icon: 'Languages', category: 'intelligence', color: '#F05B25', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf', isNew: true,
        seoTitle: 'Translate PDF Online Free | Private AI Document Translator',
        seoDesc: 'Easily translate PDF files natively. Maintains fonts, layout matrices, and formatting completely intact while converting languages.',
        seoKeywords: 'translate pdf document free, ai pdf translator online, keep formatting translate pdf private, language change pdf',
        seoArticle: 'Smoothly translate whole PDF files using advanced embedded AI technology. Keeps your complex fonts, document layouts, and standard formatting perfectly intact without breaking rows. Need to manually adjust the translation output? Utilize our built in <a href="/tool/edit-pdf">PDF text annotator</a> immediately. If you need searchability alongside translation, <a href="/tool/ocr-pdf">run our OCR toolkit natively</a>, or easily <a href="/tool/word-to-pdf">convert it from Word formats</a> dynamically.'
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
