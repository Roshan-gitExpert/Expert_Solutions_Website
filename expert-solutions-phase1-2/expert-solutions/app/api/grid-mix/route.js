import { NextResponse } from 'next/server';

export async function GET() {
    try {
          const [intensityRes, generationRes] = await Promise.all([
                  fetch('https://api.carbonintensity.org.uk/intensity', { next: { revalidate: 280 } }),
                  fetch('https://api.carbonintensity.org.uk/generation', { next: { revalidate: 280 } }),
                ]);

      if (!intensityRes.ok || !generationRes.ok) {
              throw new Error('Upstream Carbon Intensity API error');
      }

      const intensityJson = await intensityRes.json();
          const generationJson = await generationRes.json();

      const period = intensityJson?.data?.[0] || null;
          const generationmix = generationJson?.data?.generationmix || [];

      return NextResponse.json({
              from: period?.from || null,
              to: period?.to || null,
              intensity: period?.intensity || null,
              generationmix,
      });
    } catch (err) {
          console.error('[api/grid-mix] failed to fetch Carbon Intensity API', err);
          return NextResponse.json({ error: 'Live grid data is temporarily unavailable.' }, { status: 502 });
    }
}

export const revalidate = 280;
