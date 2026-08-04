import 'package:flutter/material.dart';
import '../services/api_service.dart';
import '../theme/app_theme.dart';
import '../widgets/neumorphic_button.dart';
import '../widgets/neumorphic_card.dart';

class SettingsScreen extends StatefulWidget {
  const SettingsScreen({super.key});

  @override
  State<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  final TextEditingController _urlController = TextEditingController();
  bool _isLoading = true;
  String? _statusMsg;

  @override
  void initState() {
    super.initState();
    _loadSettings();
  }

  Future<void> _loadSettings() async {
    final currentUrl = await ApiService.getBaseUrl();
    setState(() {
      _urlController.text = currentUrl;
      _isLoading = false;
    });
  }

  Future<void> _saveSettings() async {
    final newUrl = _urlController.text.trim();
    if (newUrl.isEmpty) return;

    await ApiService.setBaseUrl(newUrl);
    setState(() {
      _statusMsg = 'API Base URL updated successfully!';
    });

    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('API Server URL saved!'),
          backgroundColor: AppTheme.actionGreen,
        ),
      );
    }
  }

  Future<void> _resetDefault() async {
    final defaultUrl = ApiService.defaultBaseUrl;
    _urlController.text = defaultUrl;
    await ApiService.setBaseUrl(defaultUrl);
    setState(() {
      _statusMsg = 'Reset to default API URL: $defaultUrl';
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('API Settings'),
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : Padding(
              padding: const EdgeInsets.all(20.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  NeumorphicCard(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'BACKEND SERVER CONFIGURATION',
                          style: AppTheme.monoTextStyle(
                            fontSize: 11,
                            fontWeight: FontWeight.bold,
                            color: AppTheme.textMuted,
                          ),
                        ),
                        const SizedBox(height: 12),
                        Text(
                          'Configure the backend API server endpoint for PDF operations:',
                          style: Theme.of(context).textTheme.bodyMedium,
                        ),
                        const SizedBox(height: 16),
                        TextField(
                          controller: _urlController,
                          decoration: InputDecoration(
                            labelText: 'API Base URL',
                            hintText: 'e.g. http://10.0.2.2:4000 or https://api.docshift.tech',
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(10),
                              borderSide: const BorderSide(color: AppTheme.border),
                            ),
                            enabledBorder: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(10),
                              borderSide: const BorderSide(color: AppTheme.border),
                            ),
                            focusedBorder: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(10),
                              borderSide: const BorderSide(color: AppTheme.border, width: 2),
                            ),
                          ),
                        ),
                        const SizedBox(height: 20),
                        Row(
                          children: [
                            Expanded(
                              child: NeumorphicButton(
                                onPressed: _saveSettings,
                                variant: ButtonVariant.actionGreen,
                                child: const Text('Save Server URL'),
                              ),
                            ),
                            const SizedBox(width: 10),
                            IconButton(
                              tooltip: 'Reset to Default',
                              icon: const Icon(Icons.refresh),
                              onPressed: _resetDefault,
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                  if (_statusMsg != null) ...[
                    const SizedBox(height: 20),
                    Container(
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: AppTheme.actionGreen,
                        borderRadius: BorderRadius.circular(8),
                        border: Border.all(color: AppTheme.border),
                      ),
                      child: Row(
                        children: [
                          const Icon(Icons.check_circle, size: 18),
                          const SizedBox(width: 8),
                          Expanded(
                            child: Text(
                              _statusMsg!,
                              style: AppTheme.monoTextStyle(fontSize: 11),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ],
              ),
            ),
    );
  }
}
