import { requireNativeView } from 'expo';
import * as React from 'react';

import { ScanermanagerViewProps } from './Scanermanager.types';

const NativeView: React.ComponentType<ScanermanagerViewProps> =
  requireNativeView('Scanermanager');

export default function ScanermanagerView(props: ScanermanagerViewProps) {
  return <NativeView {...props} />;
}
