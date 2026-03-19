import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'TechSynergy - Canadian Software Development';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #071237 0%, #1160f7 100%)',
          position: 'relative',
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: 'absolute',
            top: '50px',
            left: '50px',
            width: '240px',
            height: '240px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.03)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '50px',
            right: '50px',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.03)',
          }}
        />

        {/* Logo Icon - Network Pyramid */}
        <svg
          width="140"
          height="140"
          viewBox="0 0 32 32"
          style={{ marginBottom: '30px' }}
        >
          <line x1="16" y1="6" x2="9" y2="14" stroke="#60a5fa" strokeWidth="1.8" strokeOpacity="0.7"/>
          <line x1="16" y1="6" x2="23" y2="14" stroke="#60a5fa" strokeWidth="1.8" strokeOpacity="0.7"/>
          <line x1="9" y1="18" x2="3" y2="26" stroke="#93c5fd" strokeWidth="1.8" strokeOpacity="0.5"/>
          <line x1="9" y1="18" x2="16" y2="26" stroke="#60a5fa" strokeWidth="1.8" strokeOpacity="0.7"/>
          <line x1="23" y1="18" x2="16" y2="26" stroke="#60a5fa" strokeWidth="1.8" strokeOpacity="0.7"/>
          <line x1="23" y1="18" x2="29" y2="26" stroke="#93c5fd" strokeWidth="1.8" strokeOpacity="0.5"/>
          <circle cx="16" cy="3.5" r="3.5" fill="#60a5fa"/>
          <circle cx="9" cy="15.5" r="3.5" fill="#60a5fa"/>
          <circle cx="23" cy="15.5" r="3.5" fill="#60a5fa"/>
          <circle cx="3" cy="28" r="3" fill="#93c5fd"/>
          <circle cx="16" cy="28" r="3.5" fill="#60a5fa"/>
          <circle cx="29" cy="28" r="3" fill="#93c5fd"/>
        </svg>

        {/* Company Name */}
        <div
          style={{
            fontSize: '72px',
            fontWeight: 700,
            color: 'white',
            letterSpacing: '2px',
            marginBottom: '20px',
          }}
        >
          TechSynergy
        </div>

        {/* Main Headline */}
        <div
          style={{
            fontSize: '48px',
            fontWeight: 600,
            color: 'white',
            opacity: 0.95,
            marginBottom: '15px',
          }}
        >
          Canadian Software Development
        </div>

        {/* Subheadline */}
        <div
          style={{
            fontSize: '28px',
            fontWeight: 400,
            color: 'white',
            opacity: 0.8,
            marginBottom: '30px',
          }}
        >
          Privacy-First SaaS Products
        </div>

        {/* Divider */}
        <div
          style={{
            width: '400px',
            height: '2px',
            background: 'rgba(255,255,255,0.3)',
            marginBottom: '25px',
          }}
        />

        {/* Bottom tagline */}
        <div
          style={{
            fontSize: '22px',
            fontWeight: 500,
            color: 'white',
            opacity: 0.7,
            letterSpacing: '4px',
          }}
        >
          PIPEDA COMPLIANT • CANADIAN HOSTED
        </div>

        {/* Bottom accent bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '15px',
            background: 'rgba(17, 96, 247, 0.5)',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
