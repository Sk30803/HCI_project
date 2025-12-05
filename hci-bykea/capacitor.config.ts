import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sahil.bykea',
  appName: 'hci-bykea',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
