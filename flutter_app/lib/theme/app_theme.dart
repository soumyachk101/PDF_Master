import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  // Industrial Color Palette
  static const Color background = Color(0xFFE5E7EB);
  static const Color cardBackground = Color(0xFFFFFFFF);
  static const Color border = Color(0xFF000000);
  static const Color actionGreen = Color(0xFFD1FFCA);
  static const Color alertYellow = Color(0xFFFFF100);
  static const Color errorRed = Color(0xFFDC2626);
  static const Color textPrimary = Color(0xFF000000);
  static const Color textMuted = Color(0xFF444444);

  static ThemeData get theme {
    return ThemeData(
      scaffoldBackgroundColor: background,
      primaryColor: border,
      colorScheme: const ColorScheme.light(
        primary: border,
        secondary: actionGreen,
        surface: cardBackground,
        error: errorRed,
      ),
      textTheme: GoogleFonts.interTextTheme().copyWith(
        displayLarge: GoogleFonts.inter(
          color: textPrimary,
          fontWeight: FontWeight.w800,
          letterSpacing: -0.5,
        ),
        titleLarge: GoogleFonts.inter(
          color: textPrimary,
          fontWeight: FontWeight.bold,
        ),
        bodyLarge: GoogleFonts.inter(
          color: textPrimary,
        ),
        bodyMedium: GoogleFonts.inter(
          color: textMuted,
        ),
      ),
      appBarTheme: AppBarTheme(
        backgroundColor: cardBackground,
        elevation: 0,
        scrolledUnderElevation: 0,
        iconTheme: const IconThemeData(color: textPrimary),
        titleTextStyle: GoogleFonts.inter(
          color: textPrimary,
          fontSize: 18,
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  }

  static TextStyle monoTextStyle({
    double fontSize = 12,
    FontWeight fontWeight = FontWeight.normal,
    Color color = textPrimary,
  }) {
    return GoogleFonts.spaceMono(
      fontSize: fontSize,
      fontWeight: fontWeight,
      color: color,
    );
  }
}
