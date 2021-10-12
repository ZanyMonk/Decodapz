import Encoder from '@/types/Encoder'

export class Ascii extends Encoder {
  label = 'ASCII/UTF-8'

  encode(input: string): string {
    return input;
  }

  decode(input: string): string {
    return input;
  }
}

export default Ascii