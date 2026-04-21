import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync, writeFileSync } from 'fs';

// Load fonts
const dmSerif = readFileSync('scripts/fonts/dm-serif-display-400.ttf');
const jetbrainsMono = readFileSync('scripts/fonts/jetbrains-mono-400.ttf');
const jetbrainsMonoBold = readFileSync('scripts/fonts/jetbrains-mono-600.ttf');

// Satori JSX-like element tree
const html = {
  type: 'div',
  props: {
    style: {
      width: '1200px',
      height: '630px',
      background: '#04080F',
      display: 'flex',
      alignItems: 'center',
      padding: '40px 72px',
      gap: '32px',
      borderLeft: '8px solid #00B4D7',
      position: 'relative',
    },
    children: [
      // Left text column
      {
        type: 'div',
        props: {
          style: { 
            display: 'flex', 
            flexDirection: 'column', 
            flex: 1,
            gap: '16px',
          },
          children: [
            // acm. brand
            {
              type: 'div',
              props: {
                style: { 
                  display: 'flex', 
                  fontFamily: 'JetBrains Mono', 
                  fontSize: '36px', 
                  fontWeight: 600,
                },
                children: [
                  { 
                    type: 'span', 
                    props: { 
                      style: { color: '#F0F0EB' }, 
                      children: 'acm' 
                    } 
                  },
                  { 
                    type: 'span', 
                    props: { 
                      style: { color: '#00B4D7', fontSize: '42px' }, 
                      children: '.' 
                    } 
                  },
                ],
              },
            },
            // Name (Alex\nCabrera)
            {
              type: 'div',
              props: {
                style: { 
                  fontFamily: 'DM Serif Display', 
                  fontSize: '60px', 
                  color: '#F0F0EB', 
                  lineHeight: 1.05,
                  display: 'flex',
                  flexDirection: 'column',
                },
                children: [
                  { type: 'div', props: { children: 'Alex' } },
                  { type: 'div', props: { children: 'Cabrera' } },
                ],
              },
            },
            // Tagline
            {
              type: 'div',
              props: {
                style: { 
                  fontFamily: 'DM Serif Display', 
                  fontSize: '22px', 
                  color: 'rgba(240,240,235,0.75)', 
                  lineHeight: 1.35,
                  display: 'flex',
                  flexDirection: 'column',
                  marginTop: '8px',
                },
                children: [
                  { type: 'div', props: { children: 'Enterprise AI by day.' } },
                  { type: 'div', props: { children: 'Rogue stack by night.' } },
                ],
              },
            },
          ],
        },
      },
      // Right: concentric circles
      {
        type: 'div',
        props: {
          style: {
            width: '260px',
            height: '260px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          },
          children: [
            // Outer ring
            { 
              type: 'div', 
              props: { 
                style: { 
                  width: '260px', 
                  height: '260px', 
                  borderRadius: '130px', 
                  border: '1px solid rgba(0,180,215,0.12)', 
                  position: 'absolute' 
                } 
              } 
            },
            // Middle ring
            { 
              type: 'div', 
              props: { 
                style: { 
                  width: '200px', 
                  height: '200px', 
                  borderRadius: '100px', 
                  border: '1px solid rgba(0,180,215,0.08)', 
                  position: 'absolute' 
                } 
              } 
            },
            // Inner ring with fill
            { 
              type: 'div', 
              props: { 
                style: { 
                  width: '150px', 
                  height: '150px', 
                  borderRadius: '75px', 
                  background: 'rgba(0,180,215,0.06)', 
                  border: '1.5px solid rgba(0,180,215,0.2)', 
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                } 
              },
            },
            // Seiryū character placeholder
            { 
              type: 'div', 
              props: { 
                style: { 
                  fontSize: '80px', 
                  color: '#00B4D7', 
                  fontFamily: 'JetBrains Mono', 
                  fontWeight: 600,
                  position: 'absolute',
                }, 
                children: '龍' 
              } 
            },
          ],
        },
      },
      // Domain bottom right
      {
        type: 'div',
        props: {
          style: { 
            position: 'absolute', 
            bottom: '20px', 
            right: '32px', 
            fontFamily: 'JetBrains Mono', 
            fontSize: '11px', 
            color: 'rgba(0,180,215,0.5)' 
          },
          children: 'acabreram.com',
        },
      },
    ],
  },
};

async function generate() {
  console.log('🎨 Generating OG image...');
  
  const svg = await satori(html, {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'DM Serif Display', data: dmSerif, weight: 400, style: 'normal' },
      { name: 'JetBrains Mono', data: jetbrainsMono, weight: 400, style: 'normal' },
      { name: 'JetBrains Mono', data: jetbrainsMonoBold, weight: 600, style: 'normal' },
    ],
  });

  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } });
  const png = resvg.render().asPng();
  writeFileSync('public/og-image.png', png);
  console.log('✅ Generated public/og-image.png (1200×630)');
}

generate().catch(err => {
  console.error('❌ Error generating OG image:', err);
  process.exit(1);
});
