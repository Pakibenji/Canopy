export const isUserSession = (sessionUserId, id, redirect, url) =>
  sessionUserId !== id && redirect(url);

export const isProprietary = (userId, plant) => userId === plant.userId;
