import type { StyleProp, ViewStyle } from 'react-native';

export type OnLoadEventPayload = {
  url: string;
};

export type ScanermanagerModuleEvents = {
  onChange: (params: ChangeEventPayload) => void;
  ISCANNING_EVENT_NAME: (data: boolean) => void;
  onContinuousSanData: (data: string) => void;
  useScanData: (data: string) => void;
  EXISTE_VALUE_EVENT_NAME: (data: string) => void;
  EVENT_ERROR_NAME: (json: string) => void;
};

export type ChangeEventPayload = {
  value: string;
};

export type ScanermanagerViewProps = {
  url: string;
  onLoad: (event: { nativeEvent: OnLoadEventPayload }) => void;
  style?: StyleProp<ViewStyle>;
};

export type ErrorCode =
  | 'E_100' | 'E_101' | 'E_102' | 'E_103' | 'E_104'
  | 'E_105' | 'E_106' | 'E_107' | 'E_108' | 'E_109' | 'E_110';

export interface ErrorScan { code: ErrorCode; message: string; }