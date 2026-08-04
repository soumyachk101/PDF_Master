import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

enum ButtonVariant { primary, secondary, actionGreen, danger }

class NeumorphicButton extends StatelessWidget {
  final Widget child;
  final VoidCallback? onPressed;
  final ButtonVariant variant;
  final double height;
  final bool fullWidth;

  const NeumorphicButton({
    super.key,
    required this.child,
    this.onPressed,
    this.variant = ButtonVariant.primary,
    this.height = 48.0,
    this.fullWidth = true,
  });

  Color _getBackgroundColor() {
    switch (variant) {
      case ButtonVariant.primary:
        return AppTheme.border;
      case ButtonVariant.secondary:
        return AppTheme.cardBackground;
      case ButtonVariant.actionGreen:
        return AppTheme.actionGreen;
      case ButtonVariant.danger:
        return AppTheme.alertYellow;
    }
  }

  Color _getTextColor() {
    switch (variant) {
      case ButtonVariant.primary:
        return Colors.white;
      case ButtonVariant.secondary:
      case ButtonVariant.actionGreen:
      case ButtonVariant.danger:
        return AppTheme.textPrimary;
    }
  }

  @override
  Widget build(BuildContext context) {
    final bg = _getBackgroundColor();
    final fg = _getTextColor();
    final isDisabled = onPressed == null;

    Widget btn = AnimatedContainer(
      duration: const Duration(milliseconds: 150),
      height: height,
      decoration: BoxDecoration(
        color: isDisabled ? bg.withValues(alpha: 0.5) : bg,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AppTheme.border, width: 1.5),
        boxShadow: isDisabled
            ? []
            : const [
                BoxShadow(
                  color: Color(0x2A000000),
                  offset: Offset(2, 2),
                  blurRadius: 0,
                ),
              ],
      ),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          borderRadius: BorderRadius.circular(12),
          onTap: onPressed,
          child: Center(
            child: DefaultTextStyle(
              style: TextStyle(
                color: fg,
                fontWeight: FontWeight.bold,
                fontSize: 14,
              ),
              child: IconTheme(
                data: IconThemeData(color: fg, size: 18),
                child: child,
              ),
            ),
          ),
        ),
      ),
    );

    if (fullWidth) {
      return SizedBox(width: double.infinity, child: btn);
    }
    return btn;
  }
}
