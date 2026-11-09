import crypto from 'crypto';

// SERVER-ONLY. Signed, short-lived "this is a QA test submission"
// token - the secure replacement for a guessable public ?qa=1 flag.
//
// Why this is safe where a bare URL parameter is not: a visitor (or a
// bot) can set any query string they like, but they cannot produce a
// valid signature without TEST_LEAD_TOKEN_SECRET, which never leaves
// this server. The client never learns whether a token verified - it
// only learns the final `isTest` boolean that app/api/leads/route.js
// echoes back AFTER verifying it here. Any missing, malformed,
// tampered or expired token fails safe to isTest = false (a real
// lead), never the other way round.
//
// Token shape: base64url(JSON payload) + "." + base64url(HMAC-SHA256
// signature of that JSON, keyed with TEST_LEAD_TOKEN_SECRET).

const DEFAULT_TTL_MS = 60 * 60 * 1000; // 1 hour

function getSecret() {
  const secret = process.env.TEST_LEAD_TOKEN_SECRET || '';
  return secret.trim();
}

export const isTestTokenConfigured = Boolean(getSecret());

function b64urlEncode(input) {
  return Buffer.from(input).toString('base64url');
}
function b64urlDecode(input) {
  return Buffer.from(input, 'base64url').toString('utf8');
}

export function signTestToken({ ttlMs = DEFAULT_TTL_MS, createdBy = null } = {}) {
  const secret = getSecret();
  if (!secret) return null;

  const payload = {
    exp: Date.now() + ttlMs,
    createdBy,
  };
  const payloadB64 = b64urlEncode(JSON.stringify(payload));
  const signature = crypto.createHmac('sha256', secret).update(payloadB64).digest('base64url');
  return {
    token: `${payloadB64}.${signature}`,
    expiresAt: new Date(payload.exp).toISOString(),
  };
}

// Returns { valid, reason }. Never throws - any malformed input is
// just an invalid token, same as a missing one.
export function verifyTestToken(token) {
  const secret = getSecret();
  if (!secret) return { valid: false, reason: 'not_configured' };
  if (!token || typeof token !== 'string' || token.indexOf('.') === -1) {
    return { valid: false, reason: 'missing_or_malformed' };
  }

  const [payloadB64, signature] = token.split('.');
  let expectedSig;
  try {
    expectedSig = crypto.createHmac('sha256', secret).update(payloadB64).digest('base64url');
  } catch (e) {
    return { valid: false, reason: 'malformed' };
  }

  const sigBuf = Buffer.from(signature || '');
  const expectedBuf = Buffer.from(expectedSig);
  if (sigBuf.length !== expectedBuf.length || !crypto.timingSafeEqual(sigBuf, expectedBuf)) {
    return { valid: false, reason: 'bad_signature' };
  }

  let payload;
  try {
    payload = JSON.parse(b64urlDecode(payloadB64));
  } catch (e) {
    return { valid: false, reason: 'malformed_payload' };
  }

  if (!payload || typeof payload.exp !== 'number') {
    return { valid: false, reason: 'malformed_payload' };
  }
  if (Date.now() > payload.exp) {
    return { valid: false, reason: 'expired' };
  }

  return { valid: true, reason: null };
}
