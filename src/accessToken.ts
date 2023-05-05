export let accessToken = "";

export function setAccessToken(s: string) {
  accessToken = s;
};

export function getAccessToken() {
  return accessToken;
};