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
    const encoded: string[] = [];

    new TextEncoder().encode('' + string)
      .forEach((c) => {
        encoded.push(c.toString(16));
      })

    return encoded.join(this.settings.separator.value);
  },

  decode(string: string) {
    return (
        ('' + string)
          .replace(this.settings.prefix.value, '')
          .replace(/[^a-f0-9]/ig, '')
          .match(/.{1,2}/g)
        || []
    ).map((h) => String.fromCharCode(parseInt(h, 16)))
     .join('');
  }
}