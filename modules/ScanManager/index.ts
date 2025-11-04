// Reexport the native module. On web, it will be resolved to ScanermanagerModule.web.ts
// and on native platforms to ScanermanagerModule.ts
export { default } from './src/ScanermanagerModule';
export { default as ScanermanagerView } from './src/ScanermanagerView';
export * from  './src/Scanermanager.types';
