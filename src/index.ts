import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-quick-utf8' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const QuickUtf8 = NativeModules.QuickUtf8
  ? NativeModules.QuickUtf8
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function installModule() {
  QuickUtf8.install();
}

export function stringToUtf8(input: string): Uint8Array {
  // @ts-expect-error TODO: Add library property to the global object
  return new Uint8Array(stringToUtf8Bytes(input));
}

export function utf8ToString(input: Uint8Array): string {
  // @ts-expect-error TODO: Add library property to the global object
  return utf8BytesToString(input.buffer);
}
