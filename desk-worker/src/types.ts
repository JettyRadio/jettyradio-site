export interface Env {
  DB: D1Database;
  CLERK_JWT_KEY: string;
  CLERK_ISSUER: string;
  CLERK_ALLOWED_USER_IDS: string;
  CLERK_ALLOWED_EMAILS?: string;
  CLERK_SECRET_KEY?: string;
  ALLOWED_ORIGINS: string;
  AZURACAST_API_KEY: string;
  SUBMISSIONS_WEBHOOK_SECRET?: string;
}
