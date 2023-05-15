import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'LaCocherita',
  webDir: 'build',
  // bundledWebRuntime: false,
  server: {
    androidScheme: 'https'
    // url: 'http://192.168.1.8:3000',
    // cleartext: true
  }
};

export default config;
