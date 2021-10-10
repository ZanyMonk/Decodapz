module.exports = {
  encode(string: string) {
    return btoa(string);
  },

  decode(string: string) {
    return atob(string);
  }
}