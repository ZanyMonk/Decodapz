<template>
  <div class="setting setting-string">
    <button :class="[{open: visible}, ('btn-' + (visible ? 'primary' : 'dark')), 'btn btn-sm']"
            @click="debouncedOnButtonClicked()"
            @focus="debouncedOnButtonClicked()"
            data-bs-toggle="tooltip" data-bs-placement="bottom" :title="setting.label || setting.name"
    >
      <i :class="setting.icon ? 'bi-' + setting.icon : 'bi-hash'"></i>
    </button>
    <input type="text" ref="fieldInput"
           v-bind:value="setting.value" v-show="visible"
           @keyup.esc="onInputBlur()"
           @input="$emit('input', $event)"
           @blur="onInputBlur()"
    >
  </div>
</template>

<script>
import { debounce } from "debounce";

export default {
  name: 'TextSetting',
  props: {
    setting: {
      type: Object,
      required: true
    }
  },
  created() {
    this.debouncedOnButtonClicked = debounce(this.onButtonClicked, 200)
  },
  data() {
    return {
      visible: false
    }
  },
  methods: {
    onButtonClicked() {
      console.log('onButtonClicked');
      if (this.visible) {
        this.visible = false;
      } else {
        this.visible = true
        this.$nextTick(() => {
          this.$refs.fieldInput.select()
        })
      }
    },
    onInputBlur() {
      console.log('onInputBlur');
      setTimeout(() => {
        this.visible = false
      }, 300)
    }
  }
}
</script>

<style lang="scss" scoped>
@import './src/scss/variables';

.setting-string {
  button,
  input {
    bottom: 0;
  }

  button {
    transition: all .5s;
    padding: 0 2px;
    height: $setting-height;
    width: $setting-height;
    z-index: 2;

    &.open {
      position: absolute;
      left: 0;
      border-radius: 3px 0 0 3px;
    }

    i {
      font-size: 16px;

      &.bi-paint-bucket {
        padding-left: 1px;
        margin-right: -1px;
      }
    }
  }

  input {
    position: absolute;
    left: 0;
    transition: all .5s, bottom .5s;
    height: $setting-height;
    width: $setting-height;
    font-size: 14px;
    border: 1px solid #d4d4d4;
    border-left: none;
    border-radius: 5px 3px 3px 5px;
    padding-left: $setting-height + 5px;
    z-index: 1;

    &:focus {
      outline: none;
      width: 100%;
    }
  }
}
</style>
