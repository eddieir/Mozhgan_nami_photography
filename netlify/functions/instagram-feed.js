// Netlify serverless function — proxies Behold.so feed API
// Keeps BEHOLD_FEED_ID secret and caches at the CDN edge.
export async function handler() {
  const feedId = process.env.BEHOLD_FEED_ID

  if (!feedId) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'BEHOLD_FEED_ID env var not set' }),
    }
  }

  try {
    const res = await fetch(`https://feeds.behold.so/${feedId}`)
    const data = await res.json()

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
      body: JSON.stringify(data),
    }
  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message }),
    }
  }
}
