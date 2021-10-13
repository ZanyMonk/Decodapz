import CryptoJS from 'crypto-js/index'
import Encoder from '@/types/Encoder'
import MultichoiceSetting from "@/types/MultichoiceSetting";

export class Base64 extends Encoder {
  settings = {
    mode: new MultichoiceSetting({
      label: '',
      alwaysShow: true,
      value: null,
      choices: {
        standard: {
          label: 'Standard (RFC 4648)',
          value: Base64.STANDARD_PATTERN
        },
        urlSafe: {
          label: 'URL safe (RFC 4648 §5)',
          value: 'A-Za-z0-9-_='
        }
      }
    })
  }

  private static get STANDARD_PATTERN(): string { return 'A-Za-z0-9+/=' }
  private static get STANDARD_CHARSET(): string { return Base64.expandPattern(Base64.STANDARD_PATTERN) }

  static expandPattern(pattern: string) {
    console.log(pattern);
    return ('' + pattern).replace(/[a-zA-Z0-9]-[a-zA-Z0-9]/g, (match) => {
      const [a, b] = match.split('-').map((s) => s.charCodeAt(0))

      if (a === b) return String.fromCharCode(a)

      const diff = a > b ? -1 : 1
      let result = ''
      for (let i = a; diff > 0 ? i <= b : i >= b; i += diff) {
        result += String.fromCharCode(i)
      }

      return result
    })
  }

  translate(base64: string, fromCharset: string, toCharset: string) {
    console.log(base64)
    console.log(fromCharset)
    console.log(toCharset)

    // Throw ?
    if (fromCharset.length !== toCharset.length) return false
    if (fromCharset === toCharset) return base64

    const dict: {[index:string]: any} = {}
    fromCharset.split('').forEach((from, index) => {
      dict[from] = toCharset.charAt(index)
    })

    return base64.replace(new RegExp('[' + fromCharset + ']', 'g'), (c) => dict[c] || c)
  }

  encode(string: string) {
    let charset = this.settings.mode.choices.standard.value

    if (this.settings.mode.value && 'value' in this.settings.mode.value) {
      // @ts-ignore
      charset = this.settings.mode.value.value
    }

    return this.translate(
        CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(string)),
        Base64.STANDARD_CHARSET,
        Base64.expandPattern(charset)
    )
  }

  decode(string: string) {
    return CryptoJS.enc.Base64.parse(string).toString(CryptoJS.enc.Utf8)
  }
}

export default Base64