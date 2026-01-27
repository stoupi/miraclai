import { ImageResponse } from 'next/og';

export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'white',
          borderRadius: '22%',
        }}
      >
        <svg
          width="140"
          height="140"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Pixelated heart design matching MIRACL logo */}
          {/* Row 1 */}
          <rect x="4" y="4" width="4" height="4" fill="#F33349" />
          <rect x="8" y="4" width="4" height="4" fill="#F33349" />
          <rect x="16" y="4" width="4" height="4" fill="#F33349" />
          <rect x="20" y="4" width="4" height="4" fill="#F33349" />

          {/* Row 2 */}
          <rect x="0" y="8" width="4" height="4" fill="#F33349" />
          <rect x="4" y="8" width="4" height="4" fill="#FF6B7A" />
          <rect x="8" y="8" width="4" height="4" fill="#F33349" />
          <rect x="12" y="8" width="4" height="4" fill="#F33349" />
          <rect x="16" y="8" width="4" height="4" fill="#F33349" />
          <rect x="20" y="8" width="4" height="4" fill="#F33349" />
          <rect x="24" y="8" width="4" height="4" fill="#F33349" />

          {/* Row 3 */}
          <rect x="0" y="12" width="4" height="4" fill="#F33349" />
          <rect x="4" y="12" width="4" height="4" fill="#F33349" />
          <rect x="8" y="12" width="4" height="4" fill="#F33349" />
          <rect x="12" y="12" width="4" height="4" fill="#F33349" />
          <rect x="16" y="12" width="4" height="4" fill="#F33349" />
          <rect x="20" y="12" width="4" height="4" fill="#F33349" />
          <rect x="24" y="12" width="4" height="4" fill="#C41E3A" />

          {/* Row 4 */}
          <rect x="4" y="16" width="4" height="4" fill="#F33349" />
          <rect x="8" y="16" width="4" height="4" fill="#F33349" />
          <rect x="12" y="16" width="4" height="4" fill="#F33349" />
          <rect x="16" y="16" width="4" height="4" fill="#F33349" />
          <rect x="20" y="16" width="4" height="4" fill="#C41E3A" />

          {/* Row 5 */}
          <rect x="8" y="20" width="4" height="4" fill="#F33349" />
          <rect x="12" y="20" width="4" height="4" fill="#F33349" />
          <rect x="16" y="20" width="4" height="4" fill="#C41E3A" />

          {/* Row 6 - Bottom */}
          <rect x="12" y="24" width="4" height="4" fill="#C41E3A" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
