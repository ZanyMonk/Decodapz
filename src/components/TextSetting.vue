<template>
  <div :class="[{open: visible}, 'setting setting-string']">
    <button :class="['btn-' + (visible ? 'primary' : 'dark'), 'btn btn-sm']"
            @click="onButtonClicked()"
            @focus="onButtonClicked()"
            data-bs-toggle="tooltip" data-bs-placement="bottom" :title="setting.label || setting.name"
    >
      <i :class="setting.icon ? 'bi-' + setting.icon : 'bi-hash'"></i>
    </button>
    <input type="text" ref="fieldInput"
           v-bind:value="setting.value" v-show="visible"
           @input="$emit('input', $event)"
           @keyup.esc="close()"
           @blur="close()"
    >
  </div>
</template>

<script>
import { debounce } from 'debounce';

export default {
  name: 'TextSetting',
  props: {
    setting: {
      type: Object,
      required: true
    }
  },
  created() {
    console.log('MEH ?', this)
  },
  data() {
    return {
      visible: false,
      closedRecently: false
    }
  },
  methods: {
    open() {
      if (!this.closedRecently) {
        this.visible = true
        this.$nextTick(() => {
          this.$refs.fieldInput.select()
        })
      }
    },
    close() {
      this.visible = false

      if (this.closedRecently) clearTimeout(this.closedRecently)
      this.closedRecently = setTimeout(() => {
        this.closedRecently = false
      }, 500)
    },
    onButtonClicked: debounce(function () {
      if (this.visible) this.close()
      else this.open()
    }, 200, true),
  }
}
</script>

<style lang="scss" scoped>
@import './src/scss/variables';

.setting-string {
  button {
    transition: background-color .3s;
    padding: 0 2px;
    height: $setting-height;
    width: $setting-height;
    z-index: 2;
    border-radius: .3rem;

    i {
      font-size: 16px;

      &.bi-paint-bucket {
        padding-left: 1px;
        margin-right: -1px;
      }
    }
  }

  input {
    height: $setting-height;
    width: 100%;
    font-size: 14px;
    border: 1px solid #d4d4d4;
    border-left: none;
    border-radius: 0 3px 3px 0;
    z-index: 1;
    outline: none;
  }


  &.open {
    position: absolute;
    display: flex;
    left: 0;
    right: 0;
    bottom: 0;

    button {
      flex: 0 0 $setting-height;
      border-radius: .2rem 0 0 .2rem;
    }
  }
}
</style>
