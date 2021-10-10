async function digestMessage(message: string, algo = 'SHA-256') {
  const msgUint8 = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest(algo, msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

module.exports = {
  label: 'Information',
  large: true,
  readonly: true,
  class: 'no-wrap',

  async encode(string: string) {
    let report = '';

    report += 'Chars\t: ' + string.length + '\n'
    report += 'Bytes\t: ' + new TextEncoder().encode(string).length + '\n'
    report += 'Words\t: ' + (string.replace(/[^\s]?($|\s+)/g, ' ')
                                   .replace(/[^\s]+/g, '').length - 1) + '\n'

    report += 'SHA-1\t: ' + await digestMessage(string, 'SHA-1') + '\n'
    report += 'SHA-256\t: ' + await digestMessage(string) + '\n'
    report += 'SHA-384\t: ' + await digestMessage(string, 'SHA-384') + '\n'
    report += 'SHA-512\t: ' + await digestMessage(string, 'SHA-512') + '\n'

    return report;
  },

  decode(string: string) {
    return false;
  }
}