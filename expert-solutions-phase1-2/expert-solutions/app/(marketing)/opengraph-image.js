import { ImageResponse } from 'next/og';
import siteConfig from '@/lib/config';

// Default Open Graph share image for the whole marketing site. Uses
// only the site's own name/brand colours - no stock photography, no
// fabricated logos or accreditation badges, nothing that isn't
// already true of the site itself.
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundColor: '#071b33',
          padding: '80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              display: 'flex',
              width: 72,
              height: 72,
              borderRadius: 16,
              backgroundColor: '#2dd4bf',
              color: '#071b33',
              fontSize: 32,
              fontWeight: 800,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ES
          </div>
          <div style={{ display: 'flex', fontSize: 40, fontWeight: 800, color: '#ffffff' }}>
            {siteConfig.companyName}
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: 56, fontWeight: 800, color: '#ffffff', maxWidth: 950, lineHeight: 1.15 }}>
          UK Business Energy Comparison
        </div>
        <div style={{ display: 'flex', fontSize: 28, color: '#99f6e4', marginTop: 24 }}>
          Free, no-obligation commercial electricity &amp; gas review
        </div>
      </div>
    ),
    { ...size }
  );
}
