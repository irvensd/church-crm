import Tokens from 'csrf';
import cookieParser from 'cookie-parser';

const tokens = new Tokens();

export const csrfProtection = (req, res, next) => {
  // Parse cookies
  cookieParser()(req, res, () => {});

  // Skip CSRF check for GET, HEAD, OPTIONS requests
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return next();
  }

  // Get the CSRF token from the request header or form
  const token = req.headers['x-csrf-token'] || req.body._csrf;
  const secret = req.cookies['csrf-secret'];

  if (!token || !secret) {
    return res.status(403).json({ error: 'CSRF token missing' });
  }

  // Verify the token
  if (!tokens.verify(secret, token)) {
    return res.status(403).json({ error: 'Invalid CSRF token' });
  }

  next();
};

export const generateToken = (req, res, next) => {
  // Generate a new secret if one doesn't exist
  if (!req.cookies['csrf-secret']) {
    const secret = tokens.secretSync();
    res.cookie('csrf-secret', secret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });
  }

  // Generate a new token
  const token = tokens.create(req.cookies['csrf-secret']);
  res.locals.csrfToken = token;

  next();
}; 