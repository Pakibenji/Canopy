export const isUserSession = (sessionUserId, id, redirect, url) =>
  sessionUserId !== id && redirect(url);
