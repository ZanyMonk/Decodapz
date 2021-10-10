<template>
  <div class="container">
    <div class="row">
      <h1 class="col">Decodapz</h1>
    </div>

    <div class="row">
      <AutoDecoder type="ASCII" :value="value" @valueChanged="value = this.store($event)"/>
      <AutoDecoder type="Hex" :value="value" @valueChanged="value = this.store($event)"/>
      <AutoDecoder type="Base64" :value="value" @valueChanged="value = this.store($event)"/>
      <AutoDecoder type="Decimal" :value="value" @valueChanged="value = this.store($event)"/>
      <AutoDecoder type="URL" :value="value" @valueChanged="value = this.store($event)"/>
      <AutoDecoder type="XOR" :value="value" @valueChanged="value = this.store($event)"/>
      <AutoDecoder type="Info" :value="value" @valueChanged="value = this.store($event)"/>
    </div>
  </div>
</template>

<script lang="ts">
import AutoDecoder from './components/AutoDecoder.vue'

export default {
  name: 'App',
  components: {
    AutoDecoder
  },
  data() {
    return {
      value: 'Welcome to Decodapz !'
    }
  }
}
</script>
