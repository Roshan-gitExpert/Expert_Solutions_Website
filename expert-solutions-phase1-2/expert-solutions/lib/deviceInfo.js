// Lightweight, dependency-free User-Agent parsing. Good enough to
// tell "mobile vs desktop vs tablet" and "which browser/OS" for the
// admin Visits view - not a precise device-fingerprinting library,
// and nothing here is exposed through any public API.
export function parseUserAgent(ua) {
  const s = String(ua || '');

  let deviceType = 'desktop';
  if (/iPad|Tablet(?!.*Mobile)/i.test(s)) deviceType = 'tablet';
  else if (/Mobi|Android(?=.*Mobile)|iPhone|iPod/i.test(s)) deviceType = 'mobile';

  let browser = 'Other';
  if (/Edg\//i.test(s)) browser = 'Edge';
  else if (/OPR\/|Opera/i.test(s)) browser = 'Opera';
  else if (/Chrome\//i.test(s) && !/Chromium/i.test(s)) browser = 'Chrome';
  else if (/CriOS/i.test(s)) browser = 'Chrome (iOS)';
  else if (/FxiOS/i.test(s)) browser = 'Firefox (iOS)';
  else if (/Firefox\//i.test(s)) browser = 'Firefox';
  else if (/Safari\//i.test(s) && /Version\//i.test(s)) browser = 'Safari';

  let os = 'Other';
  if (/Windows NT/i.test(s)) os = 'Windows';
  else if (/Mac OS X/i.test(s) && !/iPhone|iPad|iPod/i.test(s)) os = 'macOS';
  else if (/Android/i.test(s)) os = 'Android';
  else if (/iPhone|iPad|iPod/i.test(s)) os = 'iOS';
  else if (/Linux/i.test(s)) os = 'Linux';

  return { deviceType, browser, os };
}

export default parseUserAgent;
