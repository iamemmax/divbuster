// declarations.d.ts
declare module '*.json' {
    const value: any;
    export default value;
  }
  
  declare global {
    interface Window {
      google?: typeof google;
    }
  }