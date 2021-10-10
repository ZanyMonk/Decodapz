import { createApp } from 'vue'
import App from './App.vue'

import 'bootstrap-icons/font/bootstrap-icons.css'
import './scss/custom.scss'

(async () => {
  const app = createApp(App)
  const encoders = Object.fromEntries(await Promise.all([
    'hex', 'url', 'xor', 'ascii', 'base64', 'decimal', 'info'
  ].map(async (name) => [name, await import('./encoders/' + name)])));

  app.mixin({
    methods: {
      slugify(string: string) {
        return ('' + string).toLowerCase().replace(' ', '-')
      },
      getEncoder(type: string) {
        const slug = this.slugify(type);
        if (!(slug in encoders)) return false;
        return encoders[slug];
      },
      store(value: string) {
        return this.value = value;
      },
      getValue() {
        return this.value;
      },
      async transcode(decode: boolean, encoding: string, value: string) {
        try {
          const encoder = encoders[encoding]
          return await Promise.resolve((decode ? encoder.decode : encoder.encode).bind(encoder)(value));
        } catch (err) {
          console.error(err);
          return false;
        }
      },
      async decodeValue(encoding: string, value: string) {
        return await this.transcode(true, encoding, value);
      },
      async encodeValue(encoding: string, value: string) {
        return await this.transcode(false, encoding, value);
      }
    }
  })

  app.mount('#app')
})();