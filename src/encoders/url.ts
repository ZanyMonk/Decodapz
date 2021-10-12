import Encoder from '@/types/Encoder'
import GenericSetting from "@/types/GenericSetting";

export class Url extends Encoder {
  settings = {
    all: new GenericSetting({
      icon: 'asterisk',
      label: 'Encode all characters',
      value: false
    })
  }

  encode(string: string) {
    if (this.settings.all.value) {
      return ('' + string)
          .split('')
          .map((c) => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
          .join('')
    }

    return encodeURIComponent(string);
  }

  decode(string: string) {
    return decodeURIComponent(string);
  }
}

export default Url