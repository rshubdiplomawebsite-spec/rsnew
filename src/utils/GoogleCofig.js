import { google } from "googleapis";
const GOOGLE_CLIENT_ID =
  "908554430875-nsba5aje061c0rmqijsqi6eh27cn2kke.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
export const oauth2client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  "postmessage"
);
