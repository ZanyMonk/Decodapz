import Encoder from '@/types/Encoder'
import GenericSetting from "@/types/GenericSetting";

export class Xor extends Encoder {
  settings = {
    key: new GenericSetting<string>({
      icon: 'key-fill',
      label: 'Key string (UTF-8)',
      value: 'UTF-8 key'
    })
  }

  private xor(key: string, string: string): string {
    return ('' + string).split('').map((c, i) => {
      return String.fromCharCode(c.charCodeAt(0) ^ key.charCodeAt(i % key.length))
    }).join('')
  }

  encode(string: string) {
    return this.xor(this.settings.key.value, string)
  }

  decode(string: string) {
    return this.xor(this.settings.key.value, string)
  }
}

export default Xor