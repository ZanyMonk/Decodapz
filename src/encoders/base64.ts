function expandPattern(pattern: string) {
  return pattern.replace(/[a-zA-Z0-9]-[a-zA-Z0-9]/g, (match) => {
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

const STANDARD_PATTERN = 'A-Za-z0-9+/='
const STANDARD_CHARSET = expandPattern(STANDARD_PATTERN)

module.exports = {
  settings: {
    mode: {
      type: Object,
      choices: {
        standard: {
          label: 'Standard (RFC 4648)',
          charset: STANDARD_PATTERN
        },
        urlSafe: {
          label: 'URL safe (RFC 4648 §5)',
          charset: 'A-Za-z0-9-_='
        }
      }
    }
  },

  translate(base64: string, fromCharset: string, toCharset: string) {
    console.log(base64)
    console.log(fromCharset)
    console.log(toCharset)
    // let noNull = false

    // Throw ?
    if (fromCharset.length !== toCharset.length) return false
    if (fromCharset === toCharset) return base64

    const dict: {[index:string]: any} = {}
    fromCharset.split('').forEach((from, index) => {
      dict[from] = toCharset.charAt(index)
    })

    const translated = base64.replace(new RegExp('[' + fromCharset + ']', 'g'), (c) => dict[c] || c)

    // if (noNull) translated = translated.replace('=', '')

    return translated
  },

  encode(string: string) {
    return this.translate(
        this.$libs.CryptoJS.enc.Base64.stringify(this.$libs.CryptoJS.enc.Utf8.parse(string)),
        STANDARD_CHARSET,
        expandPattern((this.settings.mode.value || this.settings.mode.choices.standard).charset)
    )
  },

  decode(string: string) {
    return this.$libs.CryptoJS.enc.Base64.parse(string).toString(this.$libs.CryptoJS.enc.Utf8)
  }
}