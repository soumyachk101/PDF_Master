export const TOOLS = [
    // ── ORGANIZE ────────────────────────────────────────────────────────────
    { 
        slug: 'merge-pdf', name: 'Merge PDF', shortDesc: 'Combine PDFs into one.', desc: 'Combine multiple PDF files into one document in any order you choose.', icon: 'Combine', category: 'organize', color: '#F05B25', accept: { 'application/pdf': ['.pdf'] }, multiple: true, minFiles: 2, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf',
        seoTitle: 'Merge PDF Files Free | Secure Online PDF Combiner',
        seoDesc: 'Merge PDF files together securely, free and with no signup. Your files are deleted from our server right after processing.',
        seoKeywords: 'merge pdf files free, combine pdf online, secure pdf merge, join pdf files, free pdf combiner',
        seoArticle: '<p>Merging PDF files combines two or more separate documents into a single file, and the page order in the result always matches the order you drop or select the files in — whichever PDF you add first becomes the first pages of the merged copy. Add two or more files together from the file picker, or drag them into the drop zone as a batch; each one shows up as its own card with a remove button, so you can pull out anything you added by mistake before processing. Getting the order wrong? There\'s no drag-to-reorder step once the files are loaded, so clear the list and re-add them in the sequence you actually want.</p><p>A merge needs at least two PDFs, and a single batch can combine up to 20 of them at once. If one of the files is password-protected, DocShift lets you know and points you to <a href="/tool/unlock-pdf">Unlock PDF</a> first, since an encrypted document can\'t be read until it\'s unlocked. Pages are copied directly from each source file rather than re-rendered, so text and image quality come through exactly as they were in the originals.</p><p>Once the combined file is ready, <a href="/tool/compress-pdf">Compress PDF</a> is worth a pass if the merge pulled in a lot of large scanned pages, and <a href="/tool/split-pdf">Split PDF</a> can cut the document back apart later if you need to undo it. Merging is often how contracts, tax paperwork, or other multi-document sets end up as one file — bundle them together first, then decide who actually needs a copy of the combined result, rather than circulating every source document separately.</p>',
        steps: [
            'Drop two or more PDF files onto <strong>Merge PDF</strong>, or click to browse and select them together — whichever order they load in is the order they\'ll merge.',
            'Check the file list DocShift shows you, and use the trash icon on any card to drop a file you added by mistake.',
            'Want a different order? There\'s no drag-to-reorder step once files are loaded, so clear the list and re-add them in the sequence you actually want.',
            'Click <strong>Process Merge PDF</strong>. If one of the files is password-protected, DocShift will ask you to run it through <strong>Unlock PDF</strong> first.',
            'Download the single combined PDF once processing finishes.'
        ],
        updated: '2026-07-27',
        faqs: [
            { q: 'Can I control the order the PDFs merge in?', a: 'Yes — DocShift merges files in the exact order you drop or select them, so add them in that sequence rather than relying on a drag-to-reorder step afterward. Got the order wrong? Clear the file list and re-add them in the sequence you want.' },
            { q: 'What happens if one of my PDFs has a password?', a: 'DocShift lets you know the file is encrypted and asks you to run it through <a href="/tool/unlock-pdf">Unlock PDF</a> first — merging can\'t read a locked file\'s pages until the password is removed.' },
            { q: 'Is there a minimum or maximum number of files?', a: 'You need at least two PDFs to merge — DocShift will ask for a second file if you only add one — and you can combine up to 20 files in a single batch.' },
            { q: 'Will merging affect the quality of my PDFs?', a: 'No. Pages are copied directly from each source file rather than re-rendered, so text and image quality come through exactly as they were in the originals.' },
            { q: 'Can I merge scanned PDFs together with regular text-based PDFs?', a: 'Yes — Merge PDF works on any valid PDF regardless of whether its pages are scanned images or selectable text; every page is copied into the combined file exactly as it appears in its source document, contracts included.' }
        ]
    },
    { 
        slug: 'split-pdf', name: 'Split PDF', shortDesc: 'Break a PDF into pages.', desc: 'Separate one page or a whole set into independent PDF files.', icon: 'Scissors', category: 'organize', color: '#F05B25', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.zip', outputMime: 'application/zip',
        seoTitle: 'Split PDF Online Free | Fast, No Signup Required',
        seoDesc: 'Split a PDF into multiple files by page range, free and with no signup. Your file is deleted from our server right after processing.',
        seoKeywords: 'split pdf online free, separate pdf pages, split pdf by page, pdf splitter, break pdf into files',
        seoArticle: '<p>Splitting a PDF breaks one document into several smaller PDF files, and DocShift lets you choose exactly which pages go where by typing a range like <strong>1-3, 5, 7-10</strong> into the page-range field — that produces one file for pages 1 through 3, one for page 5, and one for pages 7 through 10. Leave the field blank instead, and every single page becomes its own separate PDF, which is the default when you want a document fully broken apart rather than trimmed into a handful of ranges. Quick-select buttons fill in that field for you — All Pages, Odd Pages, Even Pages, or First Page Only — though the Odd and Even presets are built for documents up to 16 pages; for anything longer, type your own comma-separated pattern instead. The tool works on one PDF at a time, so start from whichever document you need broken apart.</p><p>Because a split can produce more than one output file, the result always downloads as a single ZIP archive, even when your range produces just one PDF. Inside, each file is named for the pages it holds — <strong>page-3.pdf</strong> or <strong>pages-5-to-9.pdf</strong> — so you aren\'t stuck guessing which download is which. Once you\'ve got your pieces, <a href="/tool/merge-pdf">Merge PDF</a> can put a chosen subset back together, and <a href="/tool/remove-pages">Remove Pages</a> is the better pick if you only want a couple of pages gone rather than the whole document cut apart.</p><p>Looking for a single trimmed-down copy instead of a folder of separate files? <a href="/tool/extract-pages">Extract Pages</a> copies just the pages you choose into one new PDF, leaving the split-into-many-files approach to this tool instead. That makes the two tools a natural pair: split when you want every piece, extract when you only want one.</p>',
        steps: [
            'Load the PDF you want broken apart into <strong>Split PDF</strong> — drag it in or click to browse.',
            'Type a page range like <strong>1-3, 5, 7-10</strong> into the page-range field, or leave it blank to split every page into its own file.',
            'Use the quick presets — <strong>All Pages</strong>, <strong>Odd Pages</strong>, <strong>Even Pages</strong>, or <strong>First Page Only</strong> — to fill the field instantly instead of typing.',
            'Click <strong>Process Split PDF</strong> to generate your files.',
            'Download the ZIP — each PDF inside is named like <strong>page-3.pdf</strong> or <strong>pages-5-to-9.pdf</strong> so the pages are easy to identify.'
        ],
        updated: '2026-07-27',
        faqs: [
            { q: 'What page-range format does Split PDF accept?', a: 'Combine single pages and ranges with commas, like <strong>1-3, 5, 7-10</strong> — that produces one file for pages 1-3, one for page 5, and one for pages 7-10, all inside a single ZIP download.' },
            { q: 'What happens if I leave the page-range field blank?', a: 'DocShift splits every page into its own separate PDF, so a 20-page document becomes 20 single-page files inside the ZIP.' },
            { q: 'Do the Odd Pages and Even Pages presets work on longer documents?', a: 'The quick presets fill in pages 1 through 16; for a longer document, type your own comma-separated pattern into the field instead — for example 1,3,5,7...41.' },
            { q: 'Why do I get a ZIP file instead of a PDF?', a: 'Splitting can produce more than one output file, so results always download as a single ZIP archive — even a single extracted page comes back zipped, for a consistent download every time.' },
            { q: 'Can I split out just one page instead of the whole document?', a: 'Yes — use the <strong>First Page Only</strong> preset, or type any single page number, to get just that page as its own PDF.' }
        ]
    },
    {
        slug: 'remove-pages', name: 'Remove Pages', shortDesc: 'Delete pages from a PDF.', desc: 'Select and permanently remove specific pages from your PDF document. Visual page selector for surgical edits.', icon: 'Trash2', category: 'organize', color: '#F05B25', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf', hasThumbnails: true,
        seoTitle: 'Delete PDF Pages Online Free | No Signup',
        seoDesc: 'Delete pages from a PDF, free and with no signup. Not sure whether to delete or extract? Deleting removes pages for good; extracting copies them out.',
        seoKeywords: 'delete pdf pages online, remove vs extract pdf pages, permanently delete pdf pages, free pdf page remover, pdf page deletion tool',
        seoArticle: '<p>Remove Pages deletes the exact pages you specify from a PDF and hands back one edited copy of that same document, instead of exporting the rest into new files the way other page-editing tools do. List the page numbers you want gone, separated by commas — like 2, 5, 9 — and they don\'t need to sit next to each other or be typed in any particular order; DocShift works out which ones to drop either way, and repeats in your list simply get ignored. Because the surviving pages are never re-rendered, their content stays exactly as it was: the same headers, footers, and any page numbers already printed on them carry straight through, only changing if you follow up with <a href="/tool/page-numbers">Add Page Numbers</a> for a fresh renumbering pass. The tool works on a single uploaded PDF at a time.</p><p>This is a different job from <a href="/tool/split-pdf">Split PDF</a>, which cuts a whole document into several new files at once, and from <a href="/tool/extract-pages">Extract Pages</a>, which pulls pages into a separate PDF while your source stays untouched. Remove Pages is the one to reach for when you want the original file itself trimmed down — dropping a signed cover sheet, a blank scanned page, or an outdated appendix — without generating extra documents to keep track of afterward.</p><p>Need to keep the pages you\'re deleting rather than just discard them? Send the file through <a href="/tool/extract-pages">Extract Pages</a> first to save a copy of just those pages before removing them here, since once a page is gone from this tool it isn\'t part of the resulting document anymore, and there\'s no undo beyond starting over from your original file.</p>',
        steps: [
            'Add the PDF you want edited to <strong>Remove Pages</strong>, dragging it in or browsing for the file.',
            'Tell DocShift which page numbers to delete — for example <strong>2, 5, 9</strong> — they don\'t need to be next to each other or in order.',
            'Click <strong>Process Remove Pages</strong> to delete just those pages from the document.',
            'Download the result — every remaining page keeps its original position, headers, footers, and printed page numbers exactly as they were.',
            'Want to save the removed pages instead of just discarding them? Run the file through <strong>Extract Pages</strong> first to copy them out before you delete them here.'
        ],
        updated: '2026-07-27',
        faqs: [
            { q: 'Does removing a page change the numbering of the pages that are left?', a: 'No — deleting a page doesn\'t touch the content of the pages that remain, so any page numbers, headers, or footers already printed on them stay exactly as they were. Use <a href="/tool/page-numbers">Add Page Numbers</a> afterward if you want the document renumbered from scratch.' },
            { q: 'Can I remove several pages that aren\'t next to each other?', a: 'Yes — list the page numbers separated by commas, like <strong>2, 5, 9</strong>; they don\'t need to be consecutive or entered in ascending order.' },
            { q: 'What\'s the difference between Remove Pages and Split PDF?', a: 'Remove Pages deletes the pages you choose and gives back one edited version of the same document. Split PDF instead cuts the whole file into several new PDFs at once — useful when you want every page as its own separate download rather than one document with a few pages missing.' },
            { q: 'Will the pages I keep be re-compressed or otherwise changed?', a: 'No. Nothing about the pages you keep is re-rendered or recompressed — deleting a page just takes that page object out and re-saves the rest untouched.' },
            { q: 'Can I remove just the first or last page of a PDF?', a: 'Yes — enter that single page number and DocShift deletes only that page, leaving the rest of the document untouched.' }
        ]
    },
    {
        slug: 'extract-pages', name: 'Extract Pages', shortDesc: 'Pull out selected pages.', desc: 'Extract specific pages from a PDF into a new document while leaving the original untouched.', icon: 'FolderOpen', category: 'organize', color: '#F05B25', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf', hasThumbnails: true,
        seoTitle: 'Extract Pages from PDF Online | Free & Secure',
        seoDesc: 'Pull specific pages out of any PDF document, free and with no signup. Your file is deleted from our server right after processing.',
        seoKeywords: 'extract pages from pdf, pull out pdf pages, online pdf extractor, save selected pages from pdf',
        seoArticle: '<p>Extract Pages copies the pages you choose out of a single PDF into a brand-new file and leaves your original document completely alone, so you can come back and pull a different set of pages later without starting from scratch. Mix single pages and ranges in one entry — something like 1, 3-5, 9 — and the result always comes back in ascending document order, even if you typed the ranges out of sequence; list a page twice and DocShift just keeps one copy of it. Nothing about the source file changes in the process, since extracting only ever reads from it and writes a separate output alongside it.</p><p>That\'s a different outcome from <a href="/tool/remove-pages">Remove Pages</a>, which deletes pages directly from the source file instead of copying them elsewhere, and from <a href="/tool/split-pdf">Split PDF</a>, which breaks an entire document into many separate files delivered as one ZIP. Extract Pages fits best when you want a single new PDF built from just a chapter, a signed section, or a handful of pages worth sharing on their own — a report excerpt for a colleague, or the one clause of a contract someone actually needs — while the rest of the original stays exactly as it was, ready to extract from again whenever you need a different slice of it.</p><p>Once you\'ve pulled the pages you need, <a href="/tool/merge-pdf">Merge PDF</a> can combine that excerpt with another document, or <a href="/tool/compress-pdf">Compress PDF</a> can shrink it further before you send it on. If it turns out you wanted those pages gone from the original rather than copied out, <a href="/tool/remove-pages">Remove Pages</a> is the tool built for that instead.</p>',
        steps: [
            'Drop the PDF you want to pull pages from onto <strong>Extract Pages</strong>, or click to browse for it.',
            'Specify which pages to pull out — mix single pages and ranges, like <strong>1, 3-5, 9</strong>.',
            'Click <strong>Process Extract Pages</strong> — DocShift copies just those pages into a brand-new PDF and leaves your original file completely untouched.',
            'Download the new, shorter PDF. The pages come out in their original document order, even if you typed the ranges out of sequence.',
            'Want those same pages gone from the original instead of just copied out? Use <strong>Remove Pages</strong> instead — Extract leaves the source file alone, Remove deletes from it directly.'
        ],
        updated: '2026-07-27',
        faqs: [
            { q: 'Will the original PDF stay exactly the same?', a: 'Yes. Extract only copies pages out — the source file is never modified, so you can extract the same or a different set of pages again later.' },
            { q: 'Do the extracted pages keep the order I typed them in?', a: 'Not necessarily the order you typed — DocShift always places extracted pages in their original ascending document order. Entering <strong>9, 1, 3-5</strong> still comes back as pages 1, 3, 4, 5, 9, and any page listed twice is only included once.' },
            { q: 'What format do I use to pick pages?', a: 'Mix single numbers and ranges separated by commas, such as <strong>1, 3-5, 9</strong>.' },
            { q: 'Can I extract just a single page?', a: 'Yes — enter one page number and DocShift creates a new one-page PDF from just that page.' },
            { q: 'How is this different from Split PDF?', a: 'Extract Pages gives you one new PDF containing just the pages you chose. <a href="/tool/split-pdf">Split PDF</a> instead breaks the entire document into many separate files at once, delivered as a ZIP — pick Split when every page needs to end up as its own file, not just the handful you\'re pulling out here.' }
        ]
    },
    { 
        slug: 'organize-pdf', name: 'Organize PDF', shortDesc: 'Adjust your PDF page layout.', desc: 'Make adjustments to the order and orientation of your PDF pages.', icon: 'LayoutGrid', category: 'organize', color: '#F05B25', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf', hasThumbnails: true,
        seoTitle: 'Adjust PDF Pages Online Free | No Signup',
        seoDesc: 'Make changes to the order and orientation of your PDF pages, free and with no signup. Files are deleted right after processing.',
        seoKeywords: 'adjust pdf pages online, organize pdf free, pdf page tool online, pdf organizer',
        seoArticle: 'Make adjustments to your PDF pages — your file is deleted from our server right after processing. If you need to fix page orientation specifically, DocShift\'s dedicated <a href="/tool/rotate-pdf">Rotate PDF</a> tool gives you precise control over rotation. You can also <a href="/tool/remove-pages">permanently delete unwanted pages</a> or <a href="/tool/merge-pdf">combine multiple PDFs</a> using their dedicated tools.',
        updated: '2026-07-27',
        faqs: [
            { q: 'What does Organize PDF do?', a: 'It lets you make adjustments to your PDF pages. For precise page-by-page rotation, use <a href="/tool/rotate-pdf">Rotate PDF</a>; to remove specific pages, use <a href="/tool/remove-pages">Remove Pages</a>.' },
            { q: 'Can I use this on my phone?', a: 'Yes. It works in any mobile browser, with no app to install.' }
        ]
    },
    {
        slug: 'scan-to-pdf', name: 'Scan to PDF', shortDesc: 'Turn scans into a PDF.', desc: 'Convert camera scans, JPG, PNG and WebP images into a single searchable, shareable PDF document.', icon: 'ScanLine', category: 'organize', color: '#F05B25', accept: { 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'], 'image/webp': ['.webp'] }, multiple: true, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf',
        seoTitle: 'Scan to PDF Without an App | Free Online Tool',
        seoDesc: 'Turn photos, JPG, PNG or WebP scans into a PDF, free and with no app to install. Your images are deleted from our server right after processing.',
        seoKeywords: 'scan to pdf without an app, scan to pdf online free, convert phone photos to pdf, no app pdf scanner',
        seoArticle: '<p>Scan to PDF turns a batch of camera photos or existing image files into one multi-page PDF, accepting JPG, JPEG, PNG, and WebP images combined in whatever sequence you add them. Each photo becomes its own page sized to match that image\'s exact pixel dimensions, so a portrait phone photo and a landscape scan can sit inside the same document without either one being stretched or cropped to fit a fixed page size. There\'s no scanning app or physical scanner required, and no limit to a single image at a time — load one photo or drop in an entire stack together and DocShift lines them up into one file, first added to last.</p><p>Formats can be mixed freely within one batch, so a folder of JPGs next to a couple of PNG screenshots and a WebP photo will combine into a single PDF with no conversion step beforehand. If you need the result to be text-searchable rather than just a stack of images, run it through <a href="/tool/ocr-pdf">OCR PDF</a> afterward to add a selectable text layer, and a pass through <a href="/tool/compress-pdf">Compress PDF</a> will trim things back down once several full-resolution photos have pushed the file size up.</p><p>It\'s built for anything you\'d otherwise photograph one page at a time — receipts, whiteboard notes from a meeting, or a multi-page form shot with a phone camera — turning that folder of loose images into one shareable file instead. Working from existing JPG or PNG files and want margin or orientation controls too? <a href="/tool/jpg-to-pdf">JPG to PDF</a> is built for that layout-focused case.</p>',
        steps: [
            'Drop your JPG, PNG, or WebP images onto <strong>Scan to PDF</strong>, or click to browse — add one photo or a whole batch at once.',
            'Add your photos in the order you want them to appear in the finished document — the page order follows the sequence you load them in.',
            'Mix formats freely: JPG, JPEG, PNG, and WebP photos can all go into the same batch and combine into one PDF.',
            'Click <strong>Process Scan to PDF</strong> — every image becomes its own page, sized to match that photo\'s original resolution.',
            'Download the finished multi-page PDF — perfect for a stack of receipts, whiteboard photos, or any camera-scanned pages you want as one shareable file.'
        ],
        updated: '2026-07-27',
        faqs: [
            { q: 'What image formats are supported?', a: 'JPG, JPEG, PNG, and WebP. You can mix formats in a single batch — they combine into one PDF in the sequence you added them.' },
            { q: 'Is the original image quality preserved?', a: 'Yes. Each image is embedded at its own resolution rather than being resized down, so a run through <a href="/tool/compress-pdf">Compress PDF</a> afterward is the way to shrink the file if it comes out large.' },
            { q: 'Does each photo become its own page, or are they combined onto one page?', a: 'Each image becomes its own full page in the PDF, sized to match that photo\'s own dimensions rather than being squeezed onto a fixed page size.' },
            { q: 'Can I combine photos of different sizes into one PDF?', a: 'Yes — since every page is sized to match its own image, a portrait phone photo next to a landscape scan works fine; the pages just come out in different sizes within the same document.' },
            { q: 'What is Scan to PDF useful for beyond a flatbed scanner?', a: 'Anything you\'d otherwise photograph one page at a time — receipts, a stack of handwritten notes, whiteboard photos from a meeting, or a multi-page form shot with a phone camera — combined into a single PDF instead of a folder of loose images.' }
        ]
    },

    // ── OPTIMIZE ────────────────────────────────────────────────────────────
    { 
        slug: 'compress-pdf', name: 'Compress PDF', shortDesc: 'Shrink PDF file size.', desc: 'Reduce file size while optimizing for maximum quality.', icon: 'Minimize2', category: 'optimize', color: '#F05B25', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf',
        seoTitle: 'Compress PDF Online Free | Reduce File Size Fast',
        seoDesc: 'Reduce your PDF file size instantly, free and with no signup. Your file is deleted from our server right after processing.',
        seoKeywords: 'compress pdf online free, reduce pdf size, shrink pdf, optimize pdf size',
        seoArticle: '<p>Compress PDF runs your file through Ghostscript\'s /screen preset, the most aggressive of Ghostscript\'s four output-quality tiers, which recompresses and downsamples embedded photos and scanned pages while your document\'s actual text and vector graphics typically stay sharp. There\'s no light, medium, or heavy setting to pick, and no options panel at all — you drop in one PDF and click one button. Every upload gets the exact same fixed, aggressive pass, which shrinks a stack of scanned receipts or a photo-heavy report dramatically but won\'t do much for a file that\'s already mostly vector text and has little left to recompress.</p><p>Compression only works on a file that already opens cleanly; if Ghostscript can\'t parse the structure at all, run <a href="/tool/repair-pdf">Repair PDF</a> first and compress the fixed copy afterward. Because the preset is fixed rather than adjustable, a handful of very large, image-dense files can still come back bigger than you\'d like even after this aggressive pass — there\'s no way to squeeze harder by choosing a lower-quality setting, since none exists. When that happens, <a href="/tool/split-pdf">splitting the file into smaller parts</a> gets each piece under an email attachment or upload-portal limit, which solves the "still too big" problem more reliably than hoping for a stronger compression option.</p><p>The result downloads as a standard compressed-result.pdf with the same page count and content as your original, just smaller — ready to attach to an email, upload to a portal with a size cap, or feed straight into <a href="/tool/merge-pdf">Merge PDF</a> alongside other files once every file in the batch is a manageable size.</p>',
        steps: [
            'Drop a single PDF into the upload panel — <strong>Compress PDF</strong> processes one file per run.',
            'Click <strong>Process Compress PDF</strong>. There are no quality settings to choose — every file runs through the same fixed, aggressive optimization pass.',
            'Wait for the progress bar to finish; large, image-heavy PDFs take longer to recompress than small text-only ones.',
            'Download the result, saved as <strong>compressed-result.pdf</strong>, and compare the new file size to the original.',
            'Still too big? The preset cannot be turned up further — <strong>Split PDF</strong> is a better next step for a file that needs to fit a hard size limit.'
        ],
        updated: '2026-07-27',
        faqs: [
            { q: 'Will compressing my PDF ruin the quality?', a: 'Image-heavy pages are recompressed and downsampled by Ghostscript\'s /screen preset, so scans and photos lose some detail — that preset is deliberately aggressive. Vector text and line art are typically preserved sharp, since only raster images get recompressed.' },
            { q: 'Can I choose a lighter or stronger compression level?', a: 'No. The tool always applies the same fixed /screen preset — there is no light, medium, or heavy option. If you need to preserve high-resolution photos, this fixed aggressive setting may not be the right fit for that particular file.' },
            { q: 'My PDF is still too large after compressing — what now?', a: 'Because the compression setting is fixed rather than adjustable, a handful of very image-dense files will not shrink much further. Try <a href="/tool/split-pdf">splitting it into smaller parts</a> so each piece fits your upload or email limit instead.' },
            { q: 'Why did compression fail on my file?', a: 'Compress PDF assumes the file already opens correctly. If the PDF is damaged, run <a href="/tool/repair-pdf">Repair PDF</a> first, then compress the repaired copy.' },
            { q: 'What do I get back?', a: 'A single compressed-result.pdf with the same pages and content as your original, just a smaller file size.' }
        ]
    },
    {
        slug: 'repair-pdf', name: 'Repair PDF', shortDesc: 'Fix corrupted PDF files.', desc: 'Repair a damaged or corrupt PDF, rebuild its cross-reference table, and recover readable content from broken files.', icon: 'Wrench', category: 'optimize', color: '#F05B25', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf',
        seoTitle: 'Fix "There was an error opening this document"',
        seoDesc: 'Seeing "There was an error opening this document"? Our free tool repairs corrupted PDFs and recovers your content, no signup required.',
        seoKeywords: 'there was an error opening this document, fix corrupted pdf, repair broken pdf online, recover damaged pdf free, pdf wont open fix',
        seoArticle: '<p>If your PDF shows "There was an error opening this document" or refuses to open at all, Repair PDF runs it through Ghostscript at its highest-fidelity /prepress setting — the same print-ready tier Ghostscript reserves for final output, so nothing gets aggressively recompressed the way it does in Compress PDF — which re-parses the file\'s internal structure and rewrites it from scratch into a clean new PDF. There are no options to configure — drop in the broken file and click one button.</p><p>Ghostscript isn\'t running a dedicated repair algorithm here — it\'s reading as much of the damaged file as it can and re-serializing everything it understood, rebuilding the cross-reference table, stream dictionaries, and object links along the way. That full rewrite is what resolves most "won\'t open" errors, which are commonly caused by an interrupted upload, a partial download, or a disk error that truncated the file mid-write. But the process can only recover what it can actually parse: a file that\'s heavily truncated or missing entire object streams may still come back missing some pages rather than fully restored, and if the damage is too severe for Ghostscript to read at all, the tool reports that the file might be too heavily corrupted rather than returning a broken result.</p><p>This is a different job from <a href="/tool/compress-pdf">Compress PDF</a>, which only optimizes a file that already opens fine, or <a href="/tool/unlock-pdf">Unlock PDF</a>, which removes a password from an otherwise-valid document rather than fixing structural damage. The fixed file downloads as repaired-result.pdf, and once it opens normally again, you can shrink it for sharing or <a href="/tool/pdf-to-pdfa">convert it to PDF/A</a> for long-term archiving.</p>',
        steps: [
            'Drop the PDF that will not open, or that shows <strong>"There was an error opening this document"</strong>, into the upload panel.',
            'Click <strong>Process Repair PDF</strong> — there is nothing to configure; Ghostscript rewrites the file at its highest-fidelity setting automatically.',
            'Wait for processing to finish; a damaged file can take longer to repair than a healthy PDF of the same size, since Ghostscript has to parse the whole thing.',
            'Download the fixed file, saved as <strong>repaired-result.pdf</strong>, and confirm it now opens normally in your PDF viewer.',
            'If it still fails with a message that the file might be too heavily corrupted, the damage was too severe for Ghostscript to parse — some heavily truncated files cannot be fully recovered.'
        ],
        updated: '2026-07-27',
        faqs: [
            { q: 'Why do I see "There was an error opening this document"?', a: 'That message means the PDF\'s internal structure is damaged — a broken cross-reference table, a truncated file, or a corrupted stream — so most viewers refuse to open it. Repair PDF re-parses whatever Ghostscript can read and rewrites it into a clean new file, which resolves this error in most cases.' },
            { q: 'What kinds of corruption can this tool fix?', a: 'It rebuilds the cross-reference table and stream dictionaries by having Ghostscript re-parse and rewrite the entire file at its highest-quality setting. Heavily truncated files may still come back missing pages that Ghostscript cannot parse at all.' },
            { q: 'Is there a difference between "repair" and "unlock"?', a: 'Yes. Repair fixes structural damage inside the file itself; <a href="/tool/unlock-pdf">Unlock PDF</a> only removes an owner or user password from a file that already opens fine.' },
            { q: 'Will repairing change how my PDF looks?', a: 'No. Repair uses Ghostscript\'s /prepress preset — a print-fidelity tier, not a compression one — so unlike <a href="/tool/compress-pdf">Compress PDF</a>, it does not recompress or downsample anything; it only rewrites the file\'s internal structure.' },
            { q: 'What happens if the file cannot be repaired?', a: 'You will get an error saying the file might be too heavily corrupted. That means the damage goes beyond what Ghostscript\'s parser can read — there is no guaranteed recovery for every broken PDF.' }
        ]
    },
    { 
        slug: 'ocr-pdf', name: 'OCR PDF', shortDesc: 'Extract text from scanned PDFs.', desc: 'Run text recognition on scanned image PDFs and extract all readable text.', icon: 'ScanText', category: 'optimize', color: '#F05B25', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.txt', outputMime: 'text/plain',
        seoTitle: 'OCR PDF Online Free | Extract Text from Scans',
        seoDesc: 'Run Optical Character Recognition (OCR) on scanned PDFs to extract the text, free and with no signup. Output is a plain text file.',
        seoKeywords: 'ocr pdf online free, extract text from scanned pdf, convert scan to text, text recognition pdf',
        seoArticle: '<p>OCR PDF renders each page of a scanned PDF to an image, runs Tesseract text recognition on it, and returns the recognized text as a single plain-text file — one ocr-result.txt transcript covering every page it processed, with each page\'s text labeled and separated, rather than a new searchable PDF.</p><p>This step only matters for pages that are pictures of text in the first place — a scan, a fax, or a photographed document — since that\'s the only kind of page without real text to read directly. A PDF exported from Word, a browser, or any app that already has selectable text doesn\'t need OCR at all; extracting that existing text directly will always be more accurate than re-reading a rendered image of the same page. Recognition is also capped at the first 30 pages of any upload, a limit DocShift applies to keep processing time reasonable, so a longer scanned document needs to run in batches — <a href="/tool/extract-pages">extract the page range</a> you need first, or <a href="/tool/split-pdf">split the file</a> into 30-page chunks before running each part through separately.</p><p>A language dropdown matches recognition to the document: English by default, plus Spanish, French, German, Italian, Portuguese, Hindi, Russian, Japanese, Simplified Chinese, Arabic, and Korean. Recognition is most reliable on clean, printed text in the language you select — handwriting, low-resolution scans, and unusual fonts all come back with more mistakes no matter which language you pick. Starting from raw photos instead of a PDF? Run <a href="/tool/scan-to-pdf">Scan to PDF</a> first to build the file, then run this tool on the result.</p>',
        steps: [
            'Drop a single scanned PDF into the upload panel — <strong>OCR PDF</strong> takes one file at a time.',
            'Choose the <strong>Document Language</strong> from the dropdown; it defaults to English and also covers Spanish, French, German, Hindi, Japanese, Arabic, and more.',
            'Click <strong>Process OCR PDF</strong> to start recognition.',
            'Wait for processing — Tesseract reads every page as an image, so more pages (up to the 30-page cap) take more time.',
            'Download the result: a plain-text <strong>ocr-result.txt</strong> file with the recognized text from each page, labeled by page number.'
        ],
        updated: '2026-07-27',
        faqs: [
            { q: 'Does OCR PDF give me back a searchable PDF?', a: 'No — it returns a plain-text (.txt) file containing the text Tesseract recognized on each page, not a new PDF with a text layer added. Copy the transcript into whatever document format you need next.' },
            { q: 'Which PDFs actually need OCR?', a: 'Only ones where the pages are pictures of text — scans, faxes, or photographed documents. If your PDF already has selectable, copyable text, it does not need OCR; that existing text is already more accurate than anything recognition would produce from an image of the same page.' },
            { q: 'Is there a page limit?', a: 'Yes. Recognition only processes the first 30 pages of any upload, a limit DocShift applies to keep processing time reasonable. For a longer scanned document, <a href="/tool/split-pdf">split it</a> into smaller files first and run each through separately.' },
            { q: 'Which languages can it recognize?', a: 'The Document Language dropdown covers English (default), Spanish, French, German, Italian, Portuguese, Hindi, Russian, Japanese, Simplified Chinese, Arabic, and Korean. Recognition is most accurate on clear, printed text in the language you select.' },
            { q: 'Can I OCR photos instead of a PDF?', a: 'Not directly — this tool takes a PDF. Turn your photos into one first with <a href="/tool/scan-to-pdf">Scan to PDF</a>, then run OCR on the result.' }
        ]
    },

    // ── CONVERT TO PDF ──────────────────────────────────────────────────────
    { 
        slug: 'jpg-to-pdf', name: 'JPG to PDF', shortDesc: 'Convert images to PDF.', desc: 'Convert JPG and PNG images to PDF with adjustable orientation and margins.', icon: 'Images', category: 'convertTo', color: '#F05B25', accept: { 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'] }, multiple: true, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf',
        seoTitle: 'Combine JPG to PDF Online Free | No Signup',
        seoDesc: 'Combine JPG and PNG images into one PDF, free and with no signup. Your photos are deleted from our server right after processing.',
        seoKeywords: 'combine jpg to pdf online, jpg to pdf converter free, merge images into pdf, png to pdf converter, photos to pdf',
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
        seoTitle: 'Word to PDF Converter Free | No Signup Required',
        seoDesc: 'Convert Word DOC and DOCX files to PDF, free and with no signup. Your document is deleted from our server right after processing.',
        seoKeywords: 'word to pdf converter free, convert docx to pdf, doc to pdf online, free word to pdf converter',
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
        seoTitle: 'PowerPoint to PDF Converter Free | No Signup',
        seoDesc: 'Convert PPT and PPTX slideshows to PDF, free and with no signup. Your presentation is deleted from our server right after processing.',
        seoKeywords: 'powerpoint to pdf converter free, convert pptx to pdf, ppt to pdf online, slideshow to pdf converter',
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
        seoTitle: 'Excel to PDF Converter Free | No Signup Required',
        seoDesc: 'Convert Excel spreadsheets to PDF, free and with no signup. Your financial data is deleted from our server right after processing.',
        seoKeywords: 'excel to pdf converter free, convert xlsx to pdf, spreadsheet to pdf online, xls to pdf converter',
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
        seoTitle: 'PDF to JPG Converter Free | High Resolution',
        seoDesc: 'Convert PDF pages to high-resolution JPG images, free and with no signup. Your file is deleted from our server right after processing.',
        seoKeywords: 'pdf to jpg converter free, high resolution pdf to jpg, convert pdf to image, extract images from pdf, pdf page to picture',
        seoArticle: '<p>PDF to JPG turns every page of a PDF into its own image file, rendering each one at 150 DPI so text and graphics stay sharp on screen and in everyday printing. Pick JPG, PNG, or WEBP as the output format before you convert — each page renders through the same JPEG pass first, so PNG and WEBP are re-encoded from that result rather than rendered fresh, meaning JPG is the smallest and most direct option of the three. Leave the format untouched and you get a standard JPG at 85% quality, which is plenty for sharing or printing without producing a bloated file.</p><p>A single-page PDF comes back as one image file ready to save immediately. Anything longer is packaged into a ZIP holding one numbered image per page, so a forty-page report becomes page-1.jpg through page-40.jpg in a single download instead of forty separate saves. Pull out the pages you actually need first with <a href="/tool/extract-pages">our page extractor</a> if you only want images of a handful of pages rather than the whole document — it saves you from unzipping a folder just to find the two pages you wanted. It doesn\'t matter whether the source pages are typed text or scanned images either, since this tool renders whatever is visually on the page rather than reading text out of it.</p><p>From there, <a href="/tool/jpg-to-pdf">rebuild a new PDF from a set of JPGs</a> any time you need to, or run a live webpage through <a href="/tool/html-to-pdf">our URL-to-PDF converter</a> first if the source material starts out as a page rather than a file you already have saved.</p>',
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
            { q: 'Can I get PNG or WEBP instead of JPG?', a: 'Yes. Choose PNG, JPG, or WEBP before converting. Each page is rendered through the same JPEG pass first, then PNG or WEBP re-encodes that result — so JPG stays the smallest, most direct option of the three.' },
            { q: 'Does it matter if my PDF is scanned or typed text?', a: 'No. This tool renders whatever is visually on the page into an image, so scanned and text-based PDFs convert the same way — unlike <a href="/tool/pdf-to-word">PDF to Word</a> or <a href="/tool/pdf-to-excel">PDF to Excel</a>, which need a real text layer underneath to work with.' }
        ]
    },
    { 
        slug: 'pdf-to-word', name: 'PDF to Word', shortDesc: 'Convert PDF to editable DOCX.', desc: 'Easily convert PDF files into editable DOC and DOCX documents.', icon: 'FileOutput', category: 'convertFrom', color: '#F05B25', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.docx', outputMime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        seoTitle: 'PDF to Word Converter Free | No Signup Required',
        seoDesc: 'Convert PDF to editable Word DOCX, free and with no signup. Your document is deleted from our server right after processing.',
        seoKeywords: 'pdf to word converter free, convert pdf to docx, editable pdf to word, pdf text extraction online',
        seoArticle: '<p>PDF to Word turns a text-based PDF into an editable .docx file by reading the document\'s paragraphs, fonts, and tables with Python\'s pdf2docx engine and rebuilding that same structure as native Word elements you can click into and change.</p><p>Because pdf2docx works from the text and layout already inside the PDF, results are strongest on documents that started out digital — reports, contracts, exported slides, anything typed rather than photographed. Paragraph breaks, fonts, and table grids carry over with only minor cleanup on files like that, and a table with a clear grid usually lands as a real, editable Word table rather than a block of loose text. Multi-column layouts and unusually dense pages are the ones most likely to need a manual nudge afterward, since a PDF has no reflow information for pdf2docx to fall back on. Scanned or photographed pages are a different story: underneath the picture there\'s no real text for pdf2docx to read at all, so it has nothing to rebuild. Run <a href="/tool/ocr-pdf">OCR PDF</a> first to pull the words out separately, then treat that as your starting point rather than expecting a fully formatted document to fall out the other side.</p><p>The output is a standard .docx file that opens fine in Microsoft Word, Google Docs, or LibreOffice Writer — no separate app or plugin needed on your end beyond whichever of those you already use. Once you\'ve cleaned it up, <a href="/tool/word-to-pdf">convert it back into a PDF</a> to share a locked-down copy again, or skip the round trip entirely and make small text changes with our <a href="/tool/edit-pdf">PDF editor</a> instead.</p>',
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
        seoTitle: 'Convert PDF to PowerPoint (PPTX) Free | No Signup',
        seoDesc: 'Turn your PDF documents into editable PPTX slideshow presentations, free and with no signup. Files are deleted right after processing.',
        seoKeywords: 'pdf to powerpoint converter free, convert pdf to pptx online, free pdf to slide deck, editable pdf to ppt',
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
        slug: 'pdf-to-excel', name: 'PDF to Excel', shortDesc: 'Extract PDF tables to a spreadsheet.', desc: 'Pull data straight from PDFs into a spreadsheet file in seconds.', icon: 'Sheet', category: 'convertFrom', color: '#F05B25', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.xlsx', outputMime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        seoTitle: 'Convert PDF to Excel Online Free | Extract Tables',
        seoDesc: 'Pull table data straight from PDFs into a spreadsheet, free and with no signup. Instant, accurate PDF table extraction online.',
        seoKeywords: 'pdf to excel converter online, convert pdf tables to spreadsheet, free spreadsheet extractor, pull data to excel',
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
        slug: 'pdf-to-pdfa', name: 'PDF to PDF/A', shortDesc: 'Convert to archival PDF format.', desc: 'Transform your PDF to PDF/A, the format built for long-term document archiving.', icon: 'Archive', category: 'convertFrom', color: '#F05B25', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf',
        seoTitle: 'PDF to PDF/A Converter Free | Long-Term Archiving',
        seoDesc: 'Convert PDF to PDF/A, the archival format built for long-term document storage — free, fast, and no signup ever required.',
        seoKeywords: 'pdf to pdf/a converter, pdf archival format, long term pdf archiving, pdf/a converter online',
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
        seoDesc: 'Insert custom page numbers into a PDF document, free and with no signup. Select from multiple positions and numbering styles.',
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
        seoDesc: 'Stamp a text watermark over your PDF pages, free and with no signup required. Fully customizable opacity, position, and placement.',
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
            { q: 'How do I add a watermark to a PDF for free?', a: 'Type your watermark text, pick a position and opacity, and download the stamped file — free, with no signup required.' },
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
        slug: 'edit-pdf', name: 'Edit PDF', shortDesc: 'Make simple additions to a PDF.', desc: 'Make simple additions to a PDF document online.', icon: 'PenLine', category: 'edit', color: '#D7263D', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf', hasCanvas: true,
        seoTitle: 'PDF Editor Online | Free, No Signup',
        seoDesc: 'Make simple additions to a PDF document, free and with no signup. Your file is deleted from our server right after processing.',
        seoKeywords: 'pdf editor online free, edit pdf no signup, simple pdf editing tool',
        seoArticle: 'Make simple additions to a PDF document without needing an account — your file is deleted from our server right after processing. For a specific task, DocShift also offers dedicated tools built for exactly that job: <a href="/tool/add-watermark">add a watermark</a>, <a href="/tool/page-numbers">insert page numbers</a>, or <a href="/tool/sign-pdf">add a signature</a>.',
        updated: '2026-07-27',
        faqs: [
            { q: 'What can I do with the PDF editor?', a: 'Make simple additions to your document. For a specific task like watermarking, page numbering, or signing, DocShift\'s dedicated tools — <a href="/tool/add-watermark">Add Watermark</a>, <a href="/tool/page-numbers">Add Page Numbers</a>, <a href="/tool/sign-pdf">Sign PDF</a> — are built exactly for that.' },
            { q: 'Is it free and private?', a: 'Yes. Free, with no sign-up, and your file is deleted from our server right after processing.' }
        ]
    },

    // ── SECURITY ────────────────────────────────────────────────────────────
    { 
        slug: 'unlock-pdf', name: 'Unlock PDF', shortDesc: 'Remove PDF password.', desc: 'Remove PDF password security, giving you the freedom to use your PDF as you want.', icon: 'Unlock', category: 'security', color: '#FF4D4D', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf',
        seoTitle: 'Unlock PDF Password Restrictions | Remove Password Free',
        seoDesc: 'Remove file passwords and security restrictions from your PDFs, granting you freedom to use your document without friction.',
        seoKeywords: 'unlock pdf password online, remove pdf security free, clear pdf password free, unprotect pdf',
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
        seoTitle: 'Sign PDF Online Free | No Signup Required',
        seoDesc: 'Draw, type, or upload a signature and place it on your PDF, free and with no signup. Your document is deleted from our server right after processing.',
        seoKeywords: 'sign pdf online free, esignature free, draw signature on pdf, add signature to pdf online, sign document online',
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
        seoDesc: 'Mark sensitive text and graphics on a PDF page so they are blacked out before sharing. Your file is deleted from our server right after.',
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
        seoDesc: 'Compare two PDF files and instantly see every line that changed, was added, or removed — free, accurate, and no signup required.',
        seoKeywords: 'compare two pdfs online, pdf diff tool free, spot differences between pdf files, pdf comparison tool, find changes in pdf',
        seoArticle: '<p>Compare PDF extracts the text from two PDF files, lines it up with a line-by-line diff, and returns a plain-text report listing exactly which lines were added and which were removed between the two versions.</p><p>Both PDFs are converted to plain text first, then the report opens with a header giving each document\'s line count, and page count when it\'s available, followed by a result line — either that the text is identical, in which case the diff body is skipped entirely, or an exact count of lines removed and added. Every changed line below that is marked with a leading "-" (found only in the first file) or "+" (found only in the second), with unmarked lines left as-is where both versions match. For a contract or lease redline, that means a literal list of which lines of text changed between v1 and v2, in document order, rather than a visual side-by-side render: there\'s no color highlighting or annotated PDF, just a downloadable comparison-report.txt of the differences.</p><p>Upload order matters — the first PDF you add becomes Document A and the second becomes Document B in the report — and the tool needs exactly two files; a third file or a single upload won\'t run. Each document\'s text is compared up to 5,000 lines, enough for most contracts and reports, and the comparison only looks at extracted text — image content, formatting, and page-layout differences don\'t appear in the report at all. Once a version checks out, <a href="/tool/merge-pdf">merge it</a> with related files, or <a href="/tool/protect-pdf">lock whichever version you keep</a> with a password before sending it onward.</p>',
        steps: [
            'Select both PDF files together in one drag or file-browser action — <strong>Compare PDF</strong> needs exactly two files at once, since adding them one at a time replaces the previous selection instead of adding to it.',
            'Check the order in the <strong>Files Loaded</strong> list: the first file becomes Document A, the second becomes Document B in the report.',
            'Click <strong>Process Compare PDF</strong> to run the comparison.',
            'Download the result — a plain-text <strong>comparison-report.txt</strong> listing every line that was added or removed.',
            'Read the header first: it states each document\'s line count (and page count when available) and whether the text is identical, before the line-by-line diff.'
        ],
        updated: '2026-07-27',
        faqs: [
            { q: 'Do the two PDFs need to be the same length?', a: 'No — different lengths work fine. The diff is not page-by-page; it is a straight line-level comparison across each file\'s full extracted text, so an entire added page just shows up as a run of consecutive "+" lines rather than a labeled "page added" event.' },
            { q: 'Does the comparison detect image changes?', a: 'No — it is a text-only comparison. Text is extracted from both PDFs and diffed line by line, so differences in images, formatting, or layout that do not change the extracted text will not appear in the report.' },
            { q: 'What do the + and - symbols mean in the report?', a: 'A line starting with "-" exists only in the first PDF you uploaded (Document A); a line starting with "+" exists only in the second (Document B). Unmarked lines are unchanged and appear in both.' },
            { q: 'Is there a limit to how much text it compares?', a: 'Yes — each document is compared up to 5,000 extracted text lines, which covers the vast majority of contracts, letters, and reports.' },
            { q: 'Which file is "Document A" versus "Document B"?', a: 'Whichever PDF you added to the upload panel first becomes Document A; the second one becomes Document B. Swap the upload order if you want the diff read the other way around.' }
        ]
    },

    // ── INTELLIGENCE ────────────────────────────────────────────────────────
    { 
        slug: 'translate-pdf', name: 'Translate PDF', shortDesc: 'Extract and translate PDF text.', desc: 'Extract the text from a PDF and translate it into your target language as a plain text file.', icon: 'Languages', category: 'intelligence', color: '#F05B25', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf', isNew: true,
        seoTitle: 'Translate PDF Text Online Free | No Signup',
        seoDesc: 'Extract the text from a PDF and translate it into your target language, free and with no signup. Output is a plain text file.',
        seoKeywords: 'translate pdf text online, pdf text translator free, extract and translate pdf, convert pdf language',
        seoArticle: '<p>Translate PDF pulls the plain text out of your PDF, sends it in chunks to the free MyMemory translation API, and returns the result as a plain-text file in your target language — not a translated PDF.</p><p>The original file\'s fonts, images, and page layout are discarded at the text-extraction step, so what comes back is one continuous block of translated text rather than a page-for-page replica of the source document. Text is split into roughly 450-character chunks before translation; if an individual chunk\'s request fails, that chunk is merged back into the output untranslated rather than left blank or flagged, so an occasional sentence in a long document may quietly stay in the source language. There\'s also no source-language picker in the target-language dropdown — extraction assumes the source text is English by default, and you only choose where it\'s going: Spanish, French, German, Italian, Portuguese, Japanese, Chinese, Hindi, Arabic, Russian, or Korean. The download itself — translated-result.txt — is plain text through and through, so treat it as raw translated words rather than a finished, ready-to-send document.</p><p>Because extraction only finds text that\'s already real text in the PDF, a scanned or photographed page won\'t produce anything meaningful to translate — it\'s just a picture as far as extraction is concerned, no matter how readable it looks to a person. If your source is a scan, run <a href="/tool/ocr-pdf">OCR PDF</a> first to get a plain-text transcript of what it actually says, since this converter\'s own extraction step only works on PDFs that already contain real, selectable text.</p>',
        steps: [
            'Drop a single PDF into the upload panel — <strong>Translate PDF</strong> reads one file per run.',
            'Pick the <strong>Target Language</strong> from the dropdown: Spanish, French, German, Italian, Portuguese, Japanese, Chinese, Hindi, Arabic, Russian, or Korean.',
            'Click <strong>Process Translate PDF</strong>. There is no source-language option — text extraction assumes the source is English.',
            'Wait while the tool extracts the PDF\'s text, splits it into chunks, and sends each chunk to the translation API.',
            'Download <strong>translated-result.txt</strong> — a plain-text file of the translation, not a new PDF.'
        ],
        updated: '2026-07-27',
        faqs: [
            { q: 'Does the translated file keep my PDF\'s formatting?', a: 'No. The tool extracts plain text from the PDF and translates that text — fonts, layout, images, and page structure are not carried over. You get back a plain .txt file of the translation, not a formatted document.' },
            { q: 'Does this use AI translation?', a: 'No. Extracted text is sent to MyMemory, a free translation-memory API, not a language model — treat the result like standard machine translation rather than an AI rewrite of your document.' },
            { q: 'Why does part of my document come back untranslated?', a: 'Text is translated in roughly 450-character chunks; if an individual chunk\'s translation request fails, that chunk is inserted back in its original language rather than retried, so an occasional sentence in a long document may not get translated.' },
            { q: 'Can I translate a scanned PDF?', a: 'Only if it already contains real text. Extraction cannot read text baked into a scanned image — for a scan, run <a href="/tool/ocr-pdf">OCR PDF</a> first to get a transcript of what it says.' },
            { q: 'Does it detect my PDF\'s source language automatically?', a: 'No — there is no source-language selector; extraction assumes the source text is English. You only choose the target language from the dropdown.' }
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
