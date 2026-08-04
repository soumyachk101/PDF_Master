import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:open_filex/open_filex.dart';
import '../models/tool_model.dart';
import '../services/api_service.dart';
import '../theme/app_theme.dart';
import '../widgets/neumorphic_button.dart';
import '../widgets/neumorphic_card.dart';

class ToolDetailScreen extends StatefulWidget {
  final PdfTool tool;

  const ToolDetailScreen({super.key, required this.tool});

  @override
  State<ToolDetailScreen> createState() => _ToolDetailScreenState();
}

enum AppProcessState { upload, processing, success, error }

class _ToolDetailScreenState extends State<ToolDetailScreen> {
  AppProcessState _state = AppProcessState.upload;
  List<PlatformFile> _selectedFiles = [];

  // Dynamic tool parameters
  final TextEditingController _rangesController = TextEditingController();
  final TextEditingController _watermarkTextController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController _confirmPasswordController = TextEditingController();
  final TextEditingController _signTextController = TextEditingController();
  final TextEditingController _urlController = TextEditingController();

  String _watermarkPosition = 'diagonal';
  final String _watermarkOpacity = '0.3';
  String _rotateDegrees = '90';
  final String _pageNumberPosition = 'bottom-right';
  final String _ocrLang = 'eng';
  String _translateLang = 'es';

  String? _errorMsg;
  String? _resultFilePath;
  String? _resultFilename;

  Future<void> _pickFiles() async {
    try {
      final result = await FilePicker.pickFiles(
        allowMultiple: widget.tool.multiple,
        type: widget.tool.allowedExtensions.contains('pdf')
            ? FileType.custom
            : FileType.any,
        allowedExtensions: widget.tool.allowedExtensions.contains('pdf')
            ? widget.tool.allowedExtensions
            : null,
      );

      if (result != null && result.files.isNotEmpty) {
        setState(() {
          if (widget.tool.multiple) {
            _selectedFiles.addAll(result.files);
          } else {
            _selectedFiles = [result.files.first];
          }
          _errorMsg = null;
        });
      }
    } catch (e) {
      setState(() {
        _errorMsg = 'Failed to pick file: $e';
      });
    }
  }

  void _removeFile(int index) {
    setState(() {
      _selectedFiles.removeAt(index);
    });
  }

  void _reset() {
    setState(() {
      _state = AppProcessState.upload;
      _selectedFiles.clear();
      _rangesController.clear();
      _watermarkTextController.clear();
      _passwordController.clear();
      _confirmPasswordController.clear();
      _signTextController.clear();
      _urlController.clear();
      _errorMsg = null;
      _resultFilePath = null;
      _resultFilename = null;
    });
  }

  Future<void> _handleSubmit() async {
    setState(() {
      _errorMsg = null;
    });

    if (_selectedFiles.isEmpty && !widget.tool.hasUrlInput) {
      setState(() {
        _errorMsg = 'Please select at least ${widget.tool.minFiles} file(s).';
      });
      return;
    }

    if (_selectedFiles.length < widget.tool.minFiles && !widget.tool.hasUrlInput) {
      setState(() {
        _errorMsg = 'Please select at least ${widget.tool.minFiles} files to ${widget.tool.name}.';
      });
      return;
    }

    final fields = <String, String>{};

    if (widget.tool.slug == 'split-pdf' || widget.tool.slug == 'extract-pages') {
      if (_rangesController.text.trim().isNotEmpty) {
        fields['ranges'] = _rangesController.text.trim();
      }
    }

    if (widget.tool.slug == 'remove-pages') {
      if (_rangesController.text.trim().isEmpty) {
        setState(() {
          _errorMsg = 'Please specify page numbers to remove (e.g. 2, 4).';
        });
        return;
      }
      fields['pages'] = _rangesController.text.trim();
    }

    if (widget.tool.slug == 'add-watermark') {
      fields['text'] = _watermarkTextController.text.trim();
      fields['position'] = _watermarkPosition;
      fields['opacity'] = _watermarkOpacity;
    }

    if (widget.tool.slug == 'rotate-pdf') {
      fields['degrees'] = _rotateDegrees;
    }

    if (widget.tool.slug == 'page-numbers') {
      fields['start'] = '1';
      fields['position'] = _pageNumberPosition;
      fields['format'] = 'full';
    }

    if (widget.tool.slug == 'ocr-pdf') {
      fields['lang'] = _ocrLang;
    }

    if (widget.tool.slug == 'sign-pdf') {
      if (_signTextController.text.trim().isEmpty) {
        setState(() {
          _errorMsg = 'Please enter text for signature.';
        });
        return;
      }
      fields['text'] = _signTextController.text.trim();
    }

    if (widget.tool.slug == 'protect-pdf') {
      if (_passwordController.text.isEmpty) {
        setState(() {
          _errorMsg = 'Please enter a password.';
        });
        return;
      }
      if (_passwordController.text != _confirmPasswordController.text) {
        setState(() {
          _errorMsg = 'Passwords do not match.';
        });
        return;
      }
      fields['password'] = _passwordController.text;
    }

    if (widget.tool.slug == 'unlock-pdf') {
      fields['password'] = _passwordController.text;
    }

    if (widget.tool.slug == 'translate-pdf') {
      fields['targetLang'] = _translateLang;
    }

    if (widget.tool.hasUrlInput) {
      if (_urlController.text.trim().isEmpty) {
        setState(() {
          _errorMsg = 'Please enter a valid website URL.';
        });
        return;
      }
      fields['url'] = _urlController.text.trim();
    }

    setState(() {
      _state = AppProcessState.processing;
    });

    final res = await ApiService.processFiles(
      toolSlug: widget.tool.slug,
      files: _selectedFiles,
      additionalFields: fields,
    );

    if (res['success'] == true) {
      setState(() {
        _state = AppProcessState.success;
        _resultFilePath = res['filePath'];
        _resultFilename = res['filename'];
      });
    } else {
      setState(() {
        _state = AppProcessState.error;
        _errorMsg = res['error'] ?? 'Processing failed.';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.tool.name.toUpperCase()),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20.0),
        child: AnimatedSwitcher(
          duration: const Duration(milliseconds: 300),
          child: _buildCurrentStateView(),
        ),
      ),
    );
  }

  Widget _buildCurrentStateView() {
    switch (_state) {
      case AppProcessState.upload:
        return _buildUploadState();
      case AppProcessState.processing:
        return _buildProcessingState();
      case AppProcessState.success:
        return _buildSuccessState();
      case AppProcessState.error:
        return _buildErrorState();
    }
  }

  Widget _buildUploadState() {
    return Column(
      key: const ValueKey('upload'),
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Header
        NeumorphicCard(
          child: Row(
            children: [
              Container(
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(
                  color: AppTheme.background,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: AppTheme.border),
                ),
                child: Icon(widget.tool.icon, size: 28, color: AppTheme.border),
              ),
              const SizedBox(width: 14),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      widget.tool.name,
                      style: const TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      widget.tool.desc,
                      style: const TextStyle(fontSize: 11, color: AppTheme.textMuted),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 20),

        // URL Input for html-to-pdf
        if (widget.tool.hasUrlInput) ...[
          TextField(
            controller: _urlController,
            decoration: InputDecoration(
              labelText: 'Website URL',
              hintText: 'https://example.com',
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
            ),
          ),
          const SizedBox(height: 16),
        ],

        // File Dropzone / Picker Button
        if (!widget.tool.hasUrlInput || _selectedFiles.isNotEmpty) ...[
          NeumorphicCard(
            onTap: _pickFiles,
            backgroundColor: AppTheme.actionGreen.withValues(alpha: 0.15),
            child: Padding(
              padding: const EdgeInsets.all(20),
              child: SizedBox(
                width: double.infinity,
                child: Column(
                  children: [
                    const Icon(Icons.cloud_upload_outlined, size: 44, color: AppTheme.border),
                    const SizedBox(height: 10),
                    Text(
                      _selectedFiles.isEmpty
                          ? 'Tap to select ${widget.tool.multiple ? "files" : "file"}'
                          : 'Tap to add more files',
                      style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      'Allowed formats: ${widget.tool.allowedExtensions.join(", ").toUpperCase()}',
                      style: AppTheme.monoTextStyle(fontSize: 10, color: AppTheme.textMuted),
                    ),
                  ],
                ),
              ),
            ),
          ),
          const SizedBox(height: 16),
        ],

        // Selected Files List
        if (_selectedFiles.isNotEmpty) ...[
          Text(
            'SELECTED FILES (${_selectedFiles.length})',
            style: AppTheme.monoTextStyle(fontSize: 11, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 8),
          ListView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            itemCount: _selectedFiles.length,
            itemBuilder: (context, index) {
              final file = _selectedFiles[index];
              final kb = ((file.size) / 1024).toStringAsFixed(1);
              return Padding(
                padding: const EdgeInsets.only(bottom: 8.0),
                child: NeumorphicCard(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                  child: Row(
                    children: [
                      const Icon(Icons.picture_as_pdf, color: AppTheme.border, size: 20),
                      const SizedBox(width: 10),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              file.name,
                              style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12),
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                            ),
                            Text(
                              '$kb KB',
                              style: AppTheme.monoTextStyle(fontSize: 9, color: AppTheme.textMuted),
                            ),
                          ],
                        ),
                      ),
                      IconButton(
                        icon: const Icon(Icons.close, size: 18, color: AppTheme.errorRed),
                        onPressed: () => _removeFile(index),
                      ),
                    ],
                  ),
                ),
              );
            },
          ),
          const SizedBox(height: 16),
        ],

        // Tool Specific Parameters Form
        _buildToolParametersForm(),

        if (_errorMsg != null) ...[
          const SizedBox(height: 16),
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: AppTheme.alertYellow.withValues(alpha: 0.4),
              border: Border.all(color: AppTheme.border),
              borderRadius: BorderRadius.circular(10),
            ),
            child: Row(
              children: [
                const Icon(Icons.warning_amber_rounded, color: AppTheme.errorRed, size: 20),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    _errorMsg!,
                    style: AppTheme.monoTextStyle(fontSize: 11, color: AppTheme.errorRed),
                  ),
                ),
              ],
            ),
          ),
        ],

        const SizedBox(height: 24),

        // Submit Button
        NeumorphicButton(
          onPressed: _handleSubmit,
          variant: ButtonVariant.primary,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(Icons.arrow_forward, size: 18),
              const SizedBox(width: 8),
              Text('Process ${widget.tool.name}'),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildToolParametersForm() {
    final slug = widget.tool.slug;

    if (slug == 'split-pdf' || slug == 'extract-pages' || slug == 'remove-pages') {
      return Padding(
        padding: const EdgeInsets.only(bottom: 16.0),
        child: TextField(
          controller: _rangesController,
          decoration: InputDecoration(
            labelText: slug == 'remove-pages' ? 'Pages to Remove' : 'Page Ranges (e.g. 1-3, 5)',
            hintText: 'e.g. 1-3, 5',
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
          ),
        ),
      );
    }

    if (slug == 'add-watermark') {
      return Column(
        children: [
          TextField(
            controller: _watermarkTextController,
            decoration: InputDecoration(
              labelText: 'Watermark Text',
              hintText: 'CONFIDENTIAL',
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
            ),
          ),
          const SizedBox(height: 12),
          DropdownButtonFormField<String>(
            initialValue: _watermarkPosition,
            decoration: InputDecoration(
              labelText: 'Position',
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
            ),
            items: const [
              DropdownMenuItem(value: 'diagonal', child: Text('Diagonal')),
              DropdownMenuItem(value: 'center', child: Text('Center')),
              DropdownMenuItem(value: 'top', child: Text('Top')),
              DropdownMenuItem(value: 'bottom', child: Text('Bottom')),
            ],
            onChanged: (val) => setState(() => _watermarkPosition = val!),
          ),
          const SizedBox(height: 16),
        ],
      );
    }

    if (slug == 'rotate-pdf') {
      return Padding(
        padding: const EdgeInsets.only(bottom: 16.0),
        child: DropdownButtonFormField<String>(
          initialValue: _rotateDegrees,
          decoration: InputDecoration(
            labelText: 'Rotation Degrees',
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
          ),
          items: const [
            DropdownMenuItem(value: '90', child: Text('90° Clockwise')),
            DropdownMenuItem(value: '180', child: Text('180° Flip')),
            DropdownMenuItem(value: '270', child: Text('270° Counter-Clockwise')),
          ],
          onChanged: (val) => setState(() => _rotateDegrees = val!),
        ),
      );
    }

    if (slug == 'protect-pdf') {
      return Column(
        children: [
          TextField(
            controller: _passwordController,
            obscureText: true,
            decoration: InputDecoration(
              labelText: 'Set Password',
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
            ),
          ),
          const SizedBox(height: 12),
          TextField(
            controller: _confirmPasswordController,
            obscureText: true,
            decoration: InputDecoration(
              labelText: 'Confirm Password',
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
            ),
          ),
          const SizedBox(height: 16),
        ],
      );
    }

    if (slug == 'unlock-pdf') {
      return Padding(
        padding: const EdgeInsets.only(bottom: 16.0),
        child: TextField(
          controller: _passwordController,
          obscureText: true,
          decoration: InputDecoration(
            labelText: 'PDF Password',
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
          ),
        ),
      );
    }

    if (slug == 'sign-pdf') {
      return Padding(
        padding: const EdgeInsets.only(bottom: 16.0),
        child: TextField(
          controller: _signTextController,
          decoration: InputDecoration(
            labelText: 'Signature Name / Text',
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
          ),
        ),
      );
    }

    if (slug == 'translate-pdf') {
      return Padding(
        padding: const EdgeInsets.only(bottom: 16.0),
        child: DropdownButtonFormField<String>(
          initialValue: _translateLang,
          decoration: InputDecoration(
            labelText: 'Target Language',
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
          ),
          items: const [
            DropdownMenuItem(value: 'es', child: Text('Spanish (Español)')),
            DropdownMenuItem(value: 'fr', child: Text('French (Français)')),
            DropdownMenuItem(value: 'de', child: Text('German (Deutsch)')),
            DropdownMenuItem(value: 'hi', child: Text('Hindi (हिन्दी)')),
            DropdownMenuItem(value: 'ja', child: Text('Japanese (日本語)')),
            DropdownMenuItem(value: 'zh', child: Text('Chinese (中文)')),
          ],
          onChanged: (val) => setState(() => _translateLang = val!),
        ),
      );
    }

    return const SizedBox.shrink();
  }

  Widget _buildProcessingState() {
    return Center(
      key: const ValueKey('processing'),
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 40.0),
        child: Column(
          children: [
            const SpinKitCubeGrid(
              color: AppTheme.border,
              size: 50.0,
            ),
            const SizedBox(height: 24),
            const Text(
              'PROCESSING...',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
            ),
            const SizedBox(height: 8),
            const Text(
              'Please wait while DocShift engine processes your document.',
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 12, color: AppTheme.textMuted),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSuccessState() {
    return Column(
      key: const ValueKey('success'),
      children: [
        Container(
          width: 80,
          height: 80,
          decoration: BoxDecoration(
            color: AppTheme.actionGreen,
            shape: BoxShape.circle,
            border: Border.all(color: AppTheme.border, width: 2),
          ),
          child: const Icon(Icons.check_circle_outline, size: 48, color: AppTheme.border),
        ),
        const SizedBox(height: 16),
        const Text(
          'COMPLETE!',
          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
        ),
        const SizedBox(height: 6),
        const Text(
          'File processed successfully and saved with original name:',
          style: TextStyle(fontSize: 12, color: AppTheme.textMuted),
        ),
        const SizedBox(height: 16),
        NeumorphicCard(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                _resultFilename ?? 'result.pdf',
                style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
              ),
              const SizedBox(height: 4),
              Text(
                'Saved at: ${_resultFilePath ?? ""}',
                style: AppTheme.monoTextStyle(fontSize: 10, color: AppTheme.textMuted),
              ),
            ],
          ),
        ),
        const SizedBox(height: 24),
        NeumorphicButton(
          variant: ButtonVariant.actionGreen,
          onPressed: () {
            if (_resultFilePath != null) {
              OpenFilex.open(_resultFilePath!);
            }
          },
          child: const Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(Icons.folder_open, size: 18),
              SizedBox(width: 8),
              Text('Open Output File'),
            ],
          ),
        ),
        const SizedBox(height: 12),
        NeumorphicButton(
          variant: ButtonVariant.secondary,
          onPressed: _reset,
          child: const Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(Icons.refresh, size: 18),
              SizedBox(width: 8),
              Text('Process Another Document'),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildErrorState() {
    return Column(
      key: const ValueKey('error'),
      children: [
        Container(
          width: 80,
          height: 80,
          decoration: BoxDecoration(
            color: AppTheme.alertYellow,
            shape: BoxShape.circle,
            border: Border.all(color: AppTheme.border, width: 2),
          ),
          child: const Icon(Icons.error_outline, size: 48, color: AppTheme.border),
        ),
        const SizedBox(height: 16),
        const Text(
          'PROCESSING ERROR',
          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
        ),
        const SizedBox(height: 16),
        NeumorphicCard(
          backgroundColor: Colors.white,
          child: Text(
            _errorMsg ?? 'An unexpected error occurred during execution.',
            style: AppTheme.monoTextStyle(fontSize: 11, color: AppTheme.errorRed),
          ),
        ),
        const SizedBox(height: 24),
        NeumorphicButton(
          variant: ButtonVariant.primary,
          onPressed: _reset,
          child: const Text('Try Again'),
        ),
      ],
    );
  }
}
