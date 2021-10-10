module.exports = {
  settings: {
    prefix: {
      type: String,
      icon: 'chevron-up',
      label: 'Prefix',
      value: ''
    },
    separator: {
      type: String,
      icon: 'paint-bucket',
      label: 'Separator',
      value: ' '
    }
  },

  encode(string: string) {
    return new TextEncoder().encode('' + string)
        .map((d) => this.settings.prefix.value + d)
        .join(this.settings.separator.value);
  },

  decode(string: string) {
    const separator = this.settings.separator.value || ' ';
    return String.fromCharCode(...(
      ('' + string)
        .replace(this.settings.prefix.value, '')
        .replace(/[^0-9]+/, separator)
        .split(separator)
        .map((d) => parseInt(d))
    ))
  }
}