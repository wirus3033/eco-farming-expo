import { registerWebModule, NativeModule } from 'expo';

import { ChangeEventPayload } from './Scanermanager.types';

type ScanermanagerModuleEvents = {
  onChange: (params: ChangeEventPayload) => void;
}

class ScanermanagerModule extends NativeModule<ScanermanagerModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
};

export default registerWebModule(ScanermanagerModule);
