'use client';

export function AmbientBackground() {
  return (
    <div
      aria-hidden
      className='fixed inset-0'
      style={{ zIndex: -10, pointerEvents: 'none', overflow: 'hidden' }}
    >
      {/* Mesh gradient orbs */}
      <div
        className='absolute h-[600px] w-[600px] rounded-full opacity-20 blur-[120px]'
        style={{
          background: 'var(--mesh-1)',
          top: '-10%',
          left: '-5%',
        }}
      />
      <div
        className='absolute h-[500px] w-[500px] rounded-full opacity-15 blur-[120px]'
        style={{
          background: 'var(--mesh-2)',
          top: '20%',
          right: '-10%',
        }}
      />
      <div
        className='absolute h-[400px] w-[400px] rounded-full opacity-10 blur-[100px]'
        style={{
          background: 'var(--mesh-3)',
          bottom: '5%',
          left: '30%',
        }}
      />
      <div
        className='absolute h-[350px] w-[350px] rounded-full opacity-10 blur-[100px]'
        style={{
          background: 'var(--mesh-4)',
          bottom: '20%',
          right: '15%',
        }}
      />
      {/* Noise texture overlay for depth */}
      <div
        className='absolute inset-0 opacity-[0.015]'
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />
    </div>
  );
}

export default AmbientBackground;
