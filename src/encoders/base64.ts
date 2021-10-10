module.exports = {
  encode(string: string) {
    return this.$libs.CryptoJS.enc.Base64.stringify(this.$libs.CryptoJS.enc.Utf8.parse(string));
  },

  decode(string: string) {
    return this.$libs.CryptoJS.enc.Base64.parse(string).toString(this.$libs.CryptoJS.enc.Utf8);
  }
}