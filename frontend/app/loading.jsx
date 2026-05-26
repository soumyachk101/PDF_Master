export default function Loading() {
  return (
    <div style={{
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
      backgroundColor: '#C0C0C0',
      backgroundImage: 'linear-gradient(45deg, #b8b8b8 25%, transparent 25%), linear-gradient(-45deg, #b8b8b8 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #b8b8b8 75%), linear-gradient(-45deg, transparent 75%, #b8b8b8 75%)',
      backgroundSize: '4px 4px',
      backgroundPosition: '0 0, 0 2px, 2px -2px, -2px 0px',
      gap: '12px'
    }}>
      <div className="win95-loader" />
      <p style={{
        fontFamily: '"Arial Black", Impact, sans-serif',
        fontWeight: 900,
        textTransform: 'uppercase',
        fontSize: '12px',
        letterSpacing: '2px',
        color: '#000000',
        animation: 'pulseGlow 1.5s ease-in-out infinite'
      }}>
        Loading...
      </p>
    </div>
  );
}
