import type { Codec, CodecConstructor } from './types';

const HEADER_LENGTH = 4;

const read4Bytes = (buf: Uint8Array) => {
  return new Int32Array(buf)[0];
}
interface None {}

const VLenBytes: CodecConstructor<None> = class VLenBytes implements Codec {
  public static codecId = 'wkb';

  constructor() {}

  static fromConfig({}): VLenBytes {
    return new VLenBytes();
  }

  /*TODO: implement encode of VLenBytes*/  
  encode(data: Uint8Array[]): Uint8Array {return new Uint8Array()}
  

  decode(data: Uint8Array, out?: Uint8Array[]): Uint8Array[] {
    let ptr = 0;
    const dataEnd = ptr + data.length;
    const length = read4Bytes(data.slice(0, HEADER_LENGTH));

    if (data.length < HEADER_LENGTH) {
      throw new Error('corrupt buffer, missing or truncated header');
    }

    ptr += HEADER_LENGTH;

    const output = new Array<Uint8Array>(length);
    for (let i = 0; i < length; i += 1) {
      if (ptr + 4 > dataEnd) {
        throw new Error('corrupt buffer, data seem truncated');
      }
      const l = read4Bytes(data.slice(ptr, ptr + 4));
      ptr += 4;
      if (ptr + l > dataEnd) {
        throw new Error('corrupt buffer, data seem truncated');
      }
      output[i] = data.slice(ptr, ptr + l);
      ptr += l;
    }
    if (out !== undefined) {
      out = output.slice();
    }
    return output;
  }
};

export default VLenBytes;
