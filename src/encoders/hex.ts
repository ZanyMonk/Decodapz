import Encoder from '@/types/Encoder'
import GenericSetting from "@/types/GenericSetting";

export class Hex extends Encoder {
  settings = {
    prefix: new GenericSetting<string>({
      icon: 'chevron-up',
      label: 'Prefix',
      value: ''
    }),
    separator: new GenericSetting<string>({
      icon: 'paint-bucket',
      label: 'Separator',
      value: ' '
    })
  }

  encode(input: string): string {
    const encoded: string[] = [];

    new TextEncoder().encode('' + input)
      .forEach((c) => {
        encoded.push(c.toString(16));
      })

    return encoded.join(this.settings.separator.value);
  }

  decode(string: string) {
    return (
        ('' + string)
          .replace(this.settings.prefix.value, '')
          .replace(/[^a-f0-9]/ig, '')
          .match(/.{1,2}/g)
        || []
    ).map((h) => String.fromCharCode(parseInt(h, 16)))
     .join('');
  }
}

export default Hex