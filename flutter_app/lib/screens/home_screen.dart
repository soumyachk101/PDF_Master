import 'package:flutter/material.dart';
import '../models/tool_model.dart';
import '../theme/app_theme.dart';
import '../widgets/neumorphic_card.dart';
import 'settings_screen.dart';
import 'tool_detail_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  String _searchQuery = '';

  @override
  Widget build(BuildContext context) {
    final filteredTools = ToolRegistry.tools.where((tool) {
      if (_searchQuery.isEmpty) return true;
      final q = _searchQuery.toLowerCase();
      return tool.name.toLowerCase().contains(q) ||
          tool.shortDesc.toLowerCase().contains(q) ||
          tool.desc.toLowerCase().contains(q);
    }).toList();

    return Scaffold(
      appBar: AppBar(
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            const Text('PDF MASTER'),
            Text(
              'DOCSHIFT ENGINE',
              style: AppTheme.monoTextStyle(
                fontSize: 9,
                fontWeight: FontWeight.bold,
                color: AppTheme.textMuted,
              ),
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.settings),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (_) => const SettingsScreen()),
              );
            },
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Search box
            TextField(
              onChanged: (val) {
                setState(() {
                  _searchQuery = val.trim();
                });
              },
              decoration: InputDecoration(
                hintText: 'Search tools (e.g. Merge, Compress, Split)...',
                prefixIcon: const Icon(Icons.search, color: AppTheme.border),
                filled: true,
                fillColor: AppTheme.cardBackground,
                contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(16),
                  borderSide: const BorderSide(color: AppTheme.border, width: 1.5),
                ),
                enabledBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(16),
                  borderSide: const BorderSide(color: AppTheme.border, width: 1.5),
                ),
                focusedBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(16),
                  borderSide: const BorderSide(color: AppTheme.border, width: 2),
                ),
              ),
            ),
            const SizedBox(height: 20),

            if (_searchQuery.isNotEmpty) ...[
              Text(
                'SEARCH RESULTS (${filteredTools.length})',
                style: AppTheme.monoTextStyle(
                  fontSize: 11,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 12),
              GridView.builder(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  childAspectRatio: 1.1,
                  crossAxisSpacing: 12,
                  mainAxisSpacing: 12,
                ),
                itemCount: filteredTools.length,
                itemBuilder: (context, index) {
                  return _buildToolCard(context, filteredTools[index]);
                },
              ),
            ] else ...[
              // Categorized lists
              for (var category in ToolCategory.values) ...[
                _buildCategorySection(context, category),
              ],
            ],
          ],
        ),
      ),
    );
  }

  Widget _buildCategorySection(BuildContext context, ToolCategory category) {
    final categoryTools = ToolRegistry.getByCategory(category);
    if (categoryTools.isEmpty) return const SizedBox.shrink();

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(vertical: 10.0),
          child: Text(
            category.displayName,
            style: AppTheme.monoTextStyle(
              fontSize: 11,
              fontWeight: FontWeight.bold,
              color: AppTheme.textPrimary,
            ),
          ),
        ),
        GridView.builder(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 2,
            childAspectRatio: 1.15,
            crossAxisSpacing: 12,
            mainAxisSpacing: 12,
          ),
          itemCount: categoryTools.length,
          itemBuilder: (context, index) {
            return _buildToolCard(context, categoryTools[index]);
          },
        ),
        const SizedBox(height: 16),
      ],
    );
  }

  Widget _buildToolCard(BuildContext context, PdfTool tool) {
    return NeumorphicCard(
      padding: const EdgeInsets.all(12),
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (_) => ToolDetailScreen(tool: tool),
          ),
        );
      },
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: AppTheme.background,
              borderRadius: BorderRadius.circular(10),
              border: Border.all(color: AppTheme.border),
            ),
            child: Icon(tool.icon, size: 22, color: AppTheme.border),
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                tool.name,
                style: const TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 13,
                ),
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
              ),
              const SizedBox(height: 2),
              Text(
                tool.shortDesc,
                style: const TextStyle(
                  fontSize: 10,
                  color: AppTheme.textMuted,
                ),
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
              ),
            ],
          ),
        ],
      ),
    );
  }
}
