import { Box, Typography } from '@mui/material';

export default function Loading() {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100%',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 9999,
      bgcolor: 'background.default',
      gap: 3
    }}>
      <div className="loader" />
      <Typography variant="body2" sx={{
        color: 'text.secondary',
        fontWeight: 600,
        letterSpacing: '2px',
        textTransform: 'uppercase',
        fontSize: '0.75rem',
        opacity: 0.8,
        animation: 'pulseText 1.5s ease-in-out infinite'
      }}>
        Preparing PDFs
      </Typography>
      <style>{`
        @keyframes pulseText {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </Box>
  );
}
