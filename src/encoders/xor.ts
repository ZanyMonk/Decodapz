function xor(key: string, string: string): string {
  return ('' + string).split('').map((c, i) => {
    return String.fromCharCode(c.charCodeAt(0) ^ key.charCodeAt(i % key.length))
  }).join('')
}

module.exports = {
  settings: {
    key: {
      type: String,
      icon: 'key-fill',
      label: 'Key string (UTF-8)',
      value: 'UTF-8 key'
    }
  },

  encode(string: string) {
    return xor(this.settings.key.value, string)
  },
  decode(string: string) {
    return xor(this.settings.key.value, string)
  }
}