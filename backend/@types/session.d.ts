declare module 'express-session' {
  export interface SessionData {
    returnTo?: string;
  }
}

//empty export needed so that typescript recognizes file as s module
export {};
