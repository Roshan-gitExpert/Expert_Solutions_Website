import { NextResponse } from 'next/server';

// ============================================================
// VISITOR ALERT -> Telegram
// ------------------------------------------------------------
// Called once per browser session by components/LiveChat.js the
// moment a visitor lands, so the team's phones/desktops ring
// straight away (Tawk.to itself only alerts once a visitor types).
// The alert carries the page, search keyword (if any), whether it
// was an ad click, and approximate city/country only - NEVER the
// raw IP address or anything personal.
//
// Needs two environment variables (set in Vercel, never in code):
//   TELEGRAM_BOT_TOKEN   token from @BotFather
//   TELEGRAM_CHAT_ID     id of the team's Telegram group
// Optional:
//   VISITOR_ALERT_ADS_ONLY=true  -> only alert for Google Ads clicks
//   VISITOR_ALERT_DISABLED=true  -> switch alerts off entirely
//
// This route stores nothing and fails quietly on any problem, so it
// can never affect the page, the lead form or the lead API.
// ============================================================

const BOT_RE = /bot|crawl|spider|slurp|headless|lighthouse|pagespeed|preview|monitor|uptime|curl|wget|python|axios|postman|facebookexternalhit/i;
const PER_VISITOR_MS = 60 * 1000;
const MAX_ALERTS_PER_HOUR = 120;

// Best-effort protection against spam. On serverless these live per
// warm instance, which is enough to stop a casual flood.
const lastSeen = new Map();
let windowStart = Date.now();
let windowCount = 0;

function clean(value, max) {
  return String(value || '')
    .replace(/[\r\n\t]+/g, ' ')
    .trim()
    .slice(0, max);
}

function done(ok, reason) {
  return NextResponse.json({ ok, reason }, { status: 200 });
}

function isOwnSite(request) {
  try {
    const host = new URL(request.headers.get('origin') || '').hostname;
    return host === 'expertbridgesolutions.co.uk' || host.endsWith('.expertbridgesolutions.co.uk');
  } catch (e) {
    return false;
  }
}

export async function POST(request) {
  try {
    if (process.env.VISITOR_ALERT_DISABLED === 'true') return done(false, 'disabled');

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!token || !chatId) return done(false, 'not_configured');

    if (!isOwnSite(request)) return done(false, 'origin');

    const ua = request.headers.get('user-agent') || '';
    if (!ua || BOT_RE.test(ua)) return done(false, 'bot');

    let body = {};
    try {
      body = await request.json();
    } catch (e) {
      return done(false, 'invalid_json');
    }

    const adClick = body && body.adClick === true;
    if (process.env.VISITOR_ALERT_ADS_ONLY === 'true' && !adClick) return done(false, 'not_ad');

    const ip = (request.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown';
    const now = Date.now();
    if (now - windowStart > 60 * 60 * 1000) {
      windowStart = now;
      windowCount = 0;
    }
    if (windowCount >= MAX_ALERTS_PER_HOUR) return done(false, 'rate_limited');
    const prev = lastSeen.get(ip);
    if (prev && now - prev < PER_VISITOR_MS) return done(false, 'duplicate');
    lastSeen.set(ip, now);
    if (lastSeen.size > 500) lastSeen.clear();
    windowCount += 1;

    const city = request.headers.get('x-vercel-ip-city');
    const country = request.headers.get('x-vercel-ip-country');
    let place = 'unknown';
    try {
      place = [city ? decodeURIComponent(city) : '', country || ''].filter(Boolean).join(', ') || 'unknown';
    } catch (e) {
      place = country || 'unknown';
    }

    const keyword = clean(body.keyword, 80) || '-';
    const text = [
      'New website visitor',
      `Page: ${clean(body.landingPage, 120) || '-'}`,
      `Search keyword: ${keyword}`,
      `From Google Ad: ${adClick ? 'YES' : 'no'}`,
      `Campaign: ${clean(body.campaign, 60) || '-'}`,
      `Location: ${place}`,
      '',
      'Open the chat: https://dashboard.tawk.to/#/chat',
    ].join('\n');

    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
      signal: AbortSignal.timeout(4000),
    });

    return done(true, 'sent');
  } catch (e) {
    return done(false, 'error');
  }
}
