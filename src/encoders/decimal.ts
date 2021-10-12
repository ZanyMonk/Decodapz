import Encoder from '@/types/Encoder'
import GenericSetting from "@/types/GenericSetting";

export class Decimal extends Encoder {
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
    const encoded: string[] = []
    new TextEncoder().encode('' + input).forEach((d) => {
      encoded.push(this.settings.prefix.value + d)
    })

    return encoded.join(this.settings.separator.value);
  }

  decode(input: string): string {
    const separator = this.settings.separator.value || ' ';
    return String.fromCharCode(...(
      ('' + input)
        .replace(this.settings.prefix.value, '')
        .replace(/[^0-9]+/, separator)
        .split(separator)
        .map((d) => parseInt(d))
    ))
  }
}

export default Decimal