import * as admin from 'firebase-admin';

export function isAuthenticated(req: any) {
  return req && !!req.headers && !!req.headers.authorization;
}

export async function decodeAuthTokenToId(req: any) {
  if (!isAuthenticated(req)) {
    return undefined;
  }

  const token = req.headers.authorization.split('Bearer ')[1];

  if (!token) {
    return undefined;
  }

  const decoded = await admin.auth().verifyIdToken(token, true);

  return decoded && decoded.uid;
}
