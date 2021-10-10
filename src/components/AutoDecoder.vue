<template>
  <div :class="['auto-decoder col-12', {'col-lg-4': !encoder.large}]">
    <div :class="[{focused: isFocused, error: hasError}, 'field']">
      <textarea :class="encoder.class" v-model="encodedValue"
                :readonly="encoder.readonly"
                @keyup="valueChanged(encodedValue)"
                @focus="isFocused = true" @blur="isFocused = false"
      ></textarea>
      <label>{{ encoder.label || type }}</label>
      <div class="settings">
        <TextSetting v-for="(setting, name) in stringSettings" :key="name"
                     :setting="setting" @input="settingChanged(setting, $event.target.value)"
        />
        <CheckboxSetting v-for="(setting, name) in booleanSettings" :key="name"
                     :setting="setting" @input="settingChanged(setting, $event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { Tooltip } from 'bootstrap';

import TextSetting from './TextSetting.vue'
import CheckboxSetting from './CheckboxSetting.vue'

function pick(obj, predicate) {
  if (!obj || typeof obj !== 'object') return obj

  const newObj = {};

  for (const [name, value] of Object.entries(obj)) {
    if (!predicate(name, value)) continue
    newObj[name] = value
  }
  return newObj;
}

export default {
  name: 'AutoDecoder',
  components: {
    TextSetting,
    CheckboxSetting
  },
  props: {
    value: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  data() {
    const encoder = this.getEncoder(this.type)

    Promise.resolve(encoder.encode(this.value)).then((value) => {
      this.encodedValue = value
    })

    return {
      encoder: encoder,
      encodedValue: '',
      hasError: false,
      isFocused: false
    }
  },
  watch: {
    async value(newValue, oldValue) {
      this.hasError = false
      const decoded = await this.decode(this.encodedValue)

      if (newValue === oldValue                                      // Value has not changed
          || newValue.length === decoded.length && newValue === decoded // Own modification
      ) return;

      if (newValue === false) {
        this.encodedValue = 'Could not decode';
        this.hasError = true;
      } else {
        this.encodedValue = await this.encode(newValue);
      }
    }
  },
  methods: {
    async decode(string) {
      return await this.decodeValue(this.type.toLowerCase(), string)
    },
    async encode(string) {
      return await this.encodeValue(this.type.toLowerCase(), string)
    },
    async settingChanged(setting, value) {
      setting.value = value
      this.encodedValue = await this.encode(this.value);
    },
    async valueChanged(value) {
      if (value.length === this.value.length && value === this.value) return false;

      this.hasError = false
      const decoded = await this.decode(value)

      if (decoded === false) {
        this.hasError = true
        this.$emit('error')
        return false;
      }

      this.$emit('value-changed', decoded)
      return decoded
    }
  },
  computed: {
    stringSettings() {
      return pick(this.encoder.settings, (name, setting) => setting.type === String)
    },
    booleanSettings() {
      return pick(this.encoder.settings, (name, setting) => setting.type === Boolean)
    }
  },
  mounted() {
    // Initialize tooltips
    [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map(function (el) {
      return new Tooltip(el)
    })
  }
}
</script>

<style lang="scss" scoped>
@import './src/scss/variables';

.field {
  position: relative;
  background: $decoder-bg-color;
  border-radius: 3px;
  margin-bottom: 1rem;
  transition: all .5s;

  &.error {
    box-shadow: inset 0 0 10px $danger;
  }

  &.focused {
    box-shadow: 0 3px 30px 2px $primary;
  }

  &.error.focused {
    box-shadow: inset 0 0 10px $danger, 0 3px 30px 2px $primary;
  }
}

label {
  position: absolute;
  right: 5px;
  bottom: 0;
  z-index: 1;
  color: #000;
  pointer-events: none;
}

textarea {
  padding: 5px 7px $setting-height 7px;
  width: 100%;
  resize: none;
  min-height: 15em;
  font-family: Consolas, monaco, monospace;
  background: transparent;
  border: none;
  border-radius: 3px;

  &:focus {
    outline: none;
  }
}

.settings {
  position: absolute;
  bottom: 1px;
  left: 1px;
  right: 0;
  background: transparent;
  display: flex;

  .setting {
    margin-right: 1px;
  }
}
</style>
