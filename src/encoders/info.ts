module.exports = {
  label: 'Information',
  large: true,
  readonly: true,
  class: 'no-wrap',

  async digestMessage(message: string, algo = 'SHA-256') {
    const msgUint8 = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest(algo, msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  },

  async encode(string: string) {
    let report = '';

    report += 'Chars\t: ' + string.length + '\n'
    report += 'Bytes\t: ' + new TextEncoder().encode(string).length + '\n'
    report += 'Words\t: ' + (string.replace(/[^\s]?($|\s+)/g, ' ')
                                   .replace(/[^\s]+/g, '').length - 1) + '\n'

    report += '-'.repeat(100) + '\n'

    report += 'MD5\t: ' + this.$libs.CryptoJS.MD5(string) + '\n'
    report += 'SHA-1\t: ' + await this.digestMessage(string, 'SHA-1') + '\n'
    report += 'SHA-224\t: ' + this.$libs.CryptoJS.SHA224(string) + '\n'
    report += 'SHA-256\t: ' + await this.digestMessage(string) + '\n'
    report += 'SHA-384\t: ' + await this.digestMessage(string, 'SHA-384') + '\n'
    report += 'SHA-512\t: ' + await this.digestMessage(string, 'SHA-512') + '\n'
    report += 'SHA-3\t: ' + this.$libs.CryptoJS.SHA3(string) + '\n'

    report += '-'.repeat(100) + '\n'

    return report;
  },

  decode(string: string) {
    return false;
  }
}