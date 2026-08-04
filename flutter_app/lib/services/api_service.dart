import 'dart:io';
import 'package:file_picker/file_picker.dart';
import 'package:http/http.dart' as http;
import 'package:path_provider/path_provider.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ApiService {
  static const String _defaultUrlKey = 'pdf_master_base_url';
  
  // Default connection endpoints
  static String get defaultBaseUrl {
    if (Platform.isAndroid) {
      return 'http://10.0.2.2:4000';
    } else {
      return 'http://localhost:4000';
    }
  }

  static Future<String> getBaseUrl() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(_defaultUrlKey) ?? defaultBaseUrl;
  }

  static Future<void> setBaseUrl(String url) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_defaultUrlKey, url.trim());
  }

  static Future<Map<String, dynamic>> processFiles({
    required String toolSlug,
    required List<PlatformFile> files,
    Map<String, String> additionalFields = const {},
  }) async {
    final baseUrl = await getBaseUrl();
    final uri = Uri.parse('$baseUrl/api/pdf/$toolSlug');
    final request = http.MultipartRequest('POST', uri);

    // Add files to request
    for (var file in files) {
      if (file.path != null) {
        request.files.add(
          await http.MultipartFile.fromPath(
            'files', // Matches Multer backend field name
            file.path!,
          ),
        );
      } else if (file.bytes != null) {
        request.files.add(
          http.MultipartFile.fromBytes(
            'files',
            file.bytes!,
            filename: file.name,
          ),
        );
      }
    }

    // Add additional text parameters
    additionalFields.forEach((key, value) {
      request.fields[key] = value;
    });

    try {
      final streamedResponse = await request.send().timeout(
        const Duration(minutes: 5),
      );

      final response = await http.Response.fromStream(streamedResponse);

      if (response.statusCode >= 200 && response.statusCode < 300) {
        // Extract filename from Content-Disposition header
        String? filename;
        final contentDisposition = response.headers['content-disposition'];
        if (contentDisposition != null) {
          final regExp = RegExp(r'''filename\*?=(?:UTF-8''|")?([^";\n]+)"?''', caseSensitive: false);
          final match = regExp.firstMatch(contentDisposition);
          if (match != null && match.group(1) != null) {
            try {
              filename = Uri.decodeComponent(match.group(1)!.replaceAll('"', ''));
            } catch (_) {
              filename = match.group(1)!.replaceAll('"', '');
            }
          }
        }

        // Fallback filename if header isn't parsed
        if (filename == null || filename.isEmpty) {
          if (files.isNotEmpty) {
            filename = files.first.name;
          } else {
            filename = '$toolSlug-result.pdf';
          }
        }

        // Save file to application document / download directory
        Directory? appDir;
        if (Platform.isAndroid) {
          appDir = Directory('/storage/emulated/0/Download');
          if (!await appDir.exists()) {
            appDir = await getExternalStorageDirectory();
          }
        } else {
          appDir = await getApplicationDocumentsDirectory();
        }

        final savePath = '${appDir?.path ?? ''}/$filename';
        final savedFile = File(savePath);
        await savedFile.writeAsBytes(response.bodyBytes);

        return {
          'success': true,
          'filePath': savePath,
          'filename': filename,
          'fileSize': response.bodyBytes.length,
        };
      } else {
        String errorMsg = 'An error occurred during file processing.';
        try {
          final bodyText = response.body;
          if (bodyText.contains('error')) {
            errorMsg = bodyText;
          }
        } catch (_) {}
        return {
          'success': false,
          'error': 'Server Error (${response.statusCode}): $errorMsg',
        };
      }
    } catch (e) {
      return {
        'success': false,
        'error': 'Network connection failed. Make sure the backend server is running ($baseUrl).\nDetails: $e',
      };
    }
  }
}
