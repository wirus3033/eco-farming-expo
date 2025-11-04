import * as React from 'react';

import { ScanermanagerViewProps } from './Scanermanager.types';

export default function ScanermanagerView(props: ScanermanagerViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
