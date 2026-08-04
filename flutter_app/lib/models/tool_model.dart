import 'package:flutter/material.dart';

enum ToolCategory {
  organize,
  optimize,
  convertToPdf,
  convertFromPdf,
  edit,
  security,
  intelligence,
}

extension ToolCategoryExtension on ToolCategory {
  String get displayName {
    switch (this) {
      case ToolCategory.organize:
        return 'ORGANIZE';
      case ToolCategory.optimize:
        return 'OPTIMIZE';
      case ToolCategory.convertToPdf:
        return 'CONVERT TO PDF';
      case ToolCategory.convertFromPdf:
        return 'CONVERT FROM PDF';
      case ToolCategory.edit:
        return 'EDIT';
      case ToolCategory.security:
        return 'SECURITY';
      case ToolCategory.intelligence:
        return 'INTELLIGENCE';
    }
  }
}

class PdfTool {
  final String slug;
  final String name;
  final String shortDesc;
  final String desc;
  final IconData icon;
  final ToolCategory category;
  final bool multiple;
  final int minFiles;
  final String outputExt;
  final bool hasUrlInput;
  final List<String> allowedExtensions;

  const PdfTool({
    required this.slug,
    required this.name,
    required this.shortDesc,
    required this.desc,
    required this.icon,
    required this.category,
    this.multiple = false,
    this.minFiles = 1,
    this.outputExt = '.pdf',
    this.hasUrlInput = false,
    this.allowedExtensions = const ['pdf'],
  });
}

class ToolRegistry {
  static const List<PdfTool> tools = [
    // --- ORGANIZE ---
    PdfTool(
      slug: 'merge-pdf',
      name: 'Merge PDF',
      shortDesc: 'Combine PDFs into one.',
      desc: 'Combine multiple PDF files into one document in any order you choose.',
      icon: Icons.compress,
      category: ToolCategory.organize,
      multiple: true,
      minFiles: 2,
      outputExt: '.pdf',
    ),
    PdfTool(
      slug: 'split-pdf',
      name: 'Split PDF',
      shortDesc: 'Break a PDF into pages.',
      desc: 'Separate one page or a whole set into independent PDF files.',
      icon: Icons.call_split,
      category: ToolCategory.organize,
      outputExt: '.zip',
    ),
    PdfTool(
      slug: 'remove-pages',
      name: 'Remove Pages',
      shortDesc: 'Delete pages from a PDF.',
      desc: 'Select and permanently remove specific pages from your PDF document.',
      icon: Icons.delete_outline,
      category: ToolCategory.organize,
    ),
    PdfTool(
      slug: 'extract-pages',
      name: 'Extract Pages',
      shortDesc: 'Pull out selected pages.',
      desc: 'Extract specific pages from a PDF into a new document.',
      icon: Icons.unfold_more,
      category: ToolCategory.organize,
    ),
    PdfTool(
      slug: 'organize-pdf',
      name: 'Organize PDF',
      shortDesc: 'Adjust your PDF page layout.',
      desc: 'Make adjustments to the order and sequence of your PDF pages.',
      icon: Icons.grid_view,
      category: ToolCategory.organize,
    ),
    PdfTool(
      slug: 'scan-to-pdf',
      name: 'Scan to PDF',
      shortDesc: 'Turn camera scans into a PDF.',
      desc: 'Convert photos, JPG, PNG and WebP images into a single PDF.',
      icon: Icons.center_focus_strong,
      category: ToolCategory.organize,
      multiple: true,
      allowedExtensions: ['jpg', 'jpeg', 'png', 'webp'],
    ),

    // --- OPTIMIZE ---
    PdfTool(
      slug: 'compress-pdf',
      name: 'Compress PDF',
      shortDesc: 'Shrink PDF file size.',
      desc: 'Reduce file size while optimizing for maximum quality.',
      icon: Icons.tune,
      category: ToolCategory.optimize,
    ),
    PdfTool(
      slug: 'repair-pdf',
      name: 'Repair PDF',
      shortDesc: 'Fix corrupted PDF files.',
      desc: 'Repair a damaged or corrupt PDF and recover readable content.',
      icon: Icons.build,
      category: ToolCategory.optimize,
    ),
    PdfTool(
      slug: 'ocr-pdf',
      name: 'OCR PDF',
      shortDesc: 'Recognize text in scanned PDF.',
      desc: 'Convert scanned PDF documents into searchable text.',
      icon: Icons.document_scanner,
      category: ToolCategory.optimize,
      outputExt: '.txt',
    ),

    // --- CONVERT TO PDF ---
    PdfTool(
      slug: 'jpg-to-pdf',
      name: 'JPG to PDF',
      shortDesc: 'Convert JPG images to PDF.',
      desc: 'Transform images into a single structured PDF file.',
      icon: Icons.image,
      category: ToolCategory.convertToPdf,
      multiple: true,
      allowedExtensions: ['jpg', 'jpeg', 'png', 'webp'],
    ),
    PdfTool(
      slug: 'word-to-pdf',
      name: 'Word to PDF',
      shortDesc: 'Convert Word docs to PDF.',
      desc: 'Convert DOC and DOCX files into PDF documents.',
      icon: Icons.description,
      category: ToolCategory.convertToPdf,
      allowedExtensions: ['doc', 'docx'],
    ),
    PdfTool(
      slug: 'pptx-to-pdf',
      name: 'PowerPoint to PDF',
      shortDesc: 'Convert PPTX to PDF.',
      desc: 'Transform presentation slides into PDF format.',
      icon: Icons.slideshow,
      category: ToolCategory.convertToPdf,
      allowedExtensions: ['ppt', 'pptx'],
    ),
    PdfTool(
      slug: 'excel-to-pdf',
      name: 'Excel to PDF',
      shortDesc: 'Convert spreadsheets to PDF.',
      desc: 'Turn Excel spreadsheets into clean PDF documents.',
      icon: Icons.table_chart,
      category: ToolCategory.convertToPdf,
      allowedExtensions: ['xls', 'xlsx'],
    ),
    PdfTool(
      slug: 'html-to-pdf',
      name: 'HTML to PDF',
      shortDesc: 'Convert web pages to PDF.',
      desc: 'Render any website URL into a downloadable PDF document.',
      icon: Icons.language,
      category: ToolCategory.convertToPdf,
      hasUrlInput: true,
    ),

    // --- CONVERT FROM PDF ---
    PdfTool(
      slug: 'pdf-to-jpg',
      name: 'PDF to JPG',
      shortDesc: 'Extract PDF pages as images.',
      desc: 'Convert each PDF page into high quality images.',
      icon: Icons.collections,
      category: ToolCategory.convertFromPdf,
      outputExt: '.zip',
    ),
    PdfTool(
      slug: 'pdf-to-word',
      name: 'PDF to Word',
      shortDesc: 'Convert PDF to DOCX.',
      desc: 'Transform PDFs into editable Word documents.',
      icon: Icons.article,
      category: ToolCategory.convertFromPdf,
      outputExt: '.docx',
    ),
    PdfTool(
      slug: 'pdf-to-excel',
      name: 'PDF to Excel',
      shortDesc: 'Extract tables to CSV.',
      desc: 'Convert tabular data from PDFs into spreadsheet files.',
      icon: Icons.table_view,
      category: ToolCategory.convertFromPdf,
      outputExt: '.csv',
    ),
    PdfTool(
      slug: 'pdf-to-pptx',
      name: 'PDF to PowerPoint',
      shortDesc: 'Convert PDF to PPTX.',
      desc: 'Convert PDF pages into presentation slides.',
      icon: Icons.present_to_all,
      category: ToolCategory.convertFromPdf,
      outputExt: '.pptx',
    ),
    PdfTool(
      slug: 'pdf-to-pdfa',
      name: 'PDF to PDF/A',
      shortDesc: 'ISO archiving standard.',
      desc: 'Convert standard PDF documents into ISO-compliant PDF/A format.',
      icon: Icons.archive,
      category: ToolCategory.convertFromPdf,
    ),

    // --- EDIT ---
    PdfTool(
      slug: 'rotate-pdf',
      name: 'Rotate PDF',
      shortDesc: 'Rotate PDF pages.',
      desc: 'Rotate individual or all pages of your PDF document.',
      icon: Icons.rotate_right,
      category: ToolCategory.edit,
    ),
    PdfTool(
      slug: 'page-numbers',
      name: 'Page Numbers',
      shortDesc: 'Add page numbers.',
      desc: 'Insert customizable page numbers into your PDF.',
      icon: Icons.format_list_numbered,
      category: ToolCategory.edit,
    ),
    PdfTool(
      slug: 'add-watermark',
      name: 'Watermark PDF',
      shortDesc: 'Apply text watermark.',
      desc: 'Stamp a custom text watermark across your document pages.',
      icon: Icons.branding_watermark,
      category: ToolCategory.edit,
    ),
    PdfTool(
      slug: 'crop-pdf',
      name: 'Crop PDF',
      shortDesc: 'Trim page margins.',
      desc: 'Crop margins and resize document bounds.',
      icon: Icons.crop,
      category: ToolCategory.edit,
    ),
    PdfTool(
      slug: 'edit-pdf',
      name: 'Edit PDF',
      shortDesc: 'Annotate PDF document.',
      desc: 'Add text annotations and drawing markups to your PDF.',
      icon: Icons.edit_note,
      category: ToolCategory.edit,
    ),

    // --- SECURITY ---
    PdfTool(
      slug: 'unlock-pdf',
      name: 'Unlock PDF',
      shortDesc: 'Remove PDF password.',
      desc: 'Decrypt password-protected PDFs and remove access restrictions.',
      icon: Icons.lock_open,
      category: ToolCategory.security,
    ),
    PdfTool(
      slug: 'protect-pdf',
      name: 'Protect PDF',
      shortDesc: 'Encrypt PDF with password.',
      desc: 'Secure your PDF file with strong password protection.',
      icon: Icons.security,
      category: ToolCategory.security,
    ),
    PdfTool(
      slug: 'sign-pdf',
      name: 'Sign PDF',
      shortDesc: 'Add digital signature.',
      desc: 'Add a handwritten or typed signature block to your document.',
      icon: Icons.draw,
      category: ToolCategory.security,
    ),
    PdfTool(
      slug: 'redact-pdf',
      name: 'Redact PDF',
      shortDesc: 'Blackout sensitive content.',
      desc: 'Permanently remove or blackout sensitive text/areas.',
      icon: Icons.visibility_off,
      category: ToolCategory.security,
    ),
    PdfTool(
      slug: 'compare-pdf',
      name: 'Compare PDF',
      shortDesc: 'Compare two PDFs.',
      desc: 'Compare two PDF documents side by side for structural differences.',
      icon: Icons.compare,
      category: ToolCategory.security,
      multiple: true,
      minFiles: 2,
      outputExt: '.txt',
    ),

    // --- INTELLIGENCE ---
    PdfTool(
      slug: 'translate-pdf',
      name: 'Translate PDF',
      shortDesc: 'Translate PDF text content.',
      desc: 'Extract and translate document text into target languages.',
      icon: Icons.g_translate,
      category: ToolCategory.intelligence,
      outputExt: '.txt',
    ),
  ];

  static List<PdfTool> getByCategory(ToolCategory category) {
    return tools.where((t) => t.category == category).toList();
  }

  static PdfTool? getBySlug(String slug) {
    try {
      return tools.firstWhere((t) => t.slug == slug);
    } catch (_) {
      return null;
    }
  }
}
