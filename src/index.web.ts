let utf8Decoder: TextDecoder | null = null;
let utf8Encoder: TextEncoder | null = null;

if (!TextEncoder) {
  throw new Error(
    "The package 'react-native-quick-utf8' requires TextEncoder on web."
  );
}

if (!TextDecoder) {
  throw new Error(
    "The package 'react-native-quick-utf8' requires TextDecoder on web."
  );
}

export function stringToUtf8(input: string): Uint8Array {
  if (utf8Encoder === null) {
    utf8Encoder = new TextEncoder();
  }

  return utf8Encoder.encode(input);
}

export function utf8ToString(input: Uint8Array): string {
  if (utf8Decoder === null) {
    utf8Decoder = new TextDecoder('utf8');
  }

  return utf8Decoder.decode(input);
}
