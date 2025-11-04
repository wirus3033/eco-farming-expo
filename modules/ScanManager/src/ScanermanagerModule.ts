import { NativeModule, requireNativeModule } from 'expo';

import { ErrorScan, ScanermanagerModuleEvents } from './Scanermanager.types';
import { store } from '@/src/store/store';
import { useEffect } from 'react';
import { setNewAppSettingRedux , AppSettingRedux} from '@/src/store/slices/appSetting.slice';

declare class ScanermanagerModule extends NativeModule<ScanermanagerModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;

  initialization(): Promise<boolean>;
  beginContinuousScan(): void;
  startContinuousScan(): void;
  stopContinuousScan(): void;

  startScan(): void;
  stopScan(): void;

  setSoundState(state: boolean): Promise<boolean>;
  getSoundState(): Promise<boolean>;
  setVibrateState(state: boolean): Promise<boolean>;
  getVibrateState(): Promise<boolean>;

  isScannerOpen(): Promise<boolean>;
  openScanner(): Promise<boolean>;
  closeScanner(): Promise<boolean>;

  startDecode(): Promise<boolean>;
  stopDecode(): Promise<boolean>;

  resetScan(): void;
}

// This call loads the native module object from the JSI.
const Scanermanager = requireNativeModule<ScanermanagerModule>('Scanermanager');


/* -------- Surcharges Redux -------- */
const _startCont = Scanermanager.startContinuousScan.bind(Scanermanager);
const _stopCont  = Scanermanager.stopContinuousScan.bind(Scanermanager);

Scanermanager.startContinuousScan = () => {
  const app = store.getState().AppSettingRedux as AppSettingRedux;
  if (app.scanMode === 'scanner') _startCont();
  else store.dispatch(setNewAppSettingRedux({ scanMode: 'camera', isCameraActive: true }));
};

Scanermanager.stopContinuousScan = () => {
  const app = store.getState().AppSettingRedux as AppSettingRedux;
  if (app.scanMode === 'scanner') _stopCont();
  else store.dispatch(setNewAppSettingRedux({ scanMode: 'camera', isCameraActive: false }));
};

/* -------- Hooks -------- */
export const useScanningState = (cb: (isScanning: boolean) => void) => {
  useEffect(() => {
    const sub = Scanermanager.addListener('ISCANNING_EVENT_NAME', (data: boolean) => {
      cb(data);
    });
    return () => sub.remove();
  }, [cb]);
};

export const useContinuousScanData = (cb: (data: string) => void) => {
  useEffect(() => {
    const sub = Scanermanager.addListener('onContinuousSanData', (raw: string) => {
      console.log("mandhe vesssssssssssssssssssssssssssss", raw);
      
      cb(raw.replace(/[#\s]/g, ''));
    });
    return () => sub.remove();
  }, [cb]);
};

export const useScanData = (cb: (data: string) => void) => {
  useEffect(() => {
    const sub = Scanermanager.addListener('useScanData', cb);
    return () => sub.remove();
  }, [cb]);
};

export const useExistScanData = (cb: (data: string) => void) => {
  useEffect(() => {
    const sub = Scanermanager.addListener('EXISTE_VALUE_EVENT_NAME', cb);
    return () => sub.remove();
  }, [cb]);
};

export const useErrorScan = (cb: (err: ErrorScan) => void) => {
  useEffect(() => {
    const sub = Scanermanager.addListener('EVENT_ERROR_NAME', (json: string) => {
      try { cb(JSON.parse(json) as ErrorScan); }
      catch (e) { console.error('[Scanermanager] JSON error:', e);
      }
    });
    return () => sub.remove();
  }, [cb]);
};

/* -------- Test emit -------- */
export const emitContinuousScanData = (data: string) => {
  if (typeof Scanermanager.debugEmit === 'function') {
    Scanermanager.debugEmit('onContinuousSanData', data);
  } else {
    console.warn('[Scanermanager] debugEmit indisponible côté natif.');
  }
};

export { Scanermanager as ScanManager };
export default Scanermanager;
