<template>
  <div :class="[{open: visible}, 'setting setting-string']">
    <button :class="['btn-' + (visible ? 'primary' : 'dark'), 'btn btn-sm']"
            @click="onButtonClicked()"
            @focus="onButtonClicked()"
            data-bs-toggle="tooltip" data-bs-placement="bottom" :title="setting.label || setting.name"
    >
      <i :class="setting.icon ? 'bi-' + setting.icon : 'bi-hash'"></i>
    </button>
    <div class="field" v-show="visible">
      <input type="text" ref="fieldInput"
             v-model="value"
             :placeholder="placeholder"
             @keyup.esc="close()"
             @blur="close()"
             @focusin="dropdownVisible = true"
      >
      <div :class="[{active: dropdownVisible}, 'arrow']"
           @click="dropdownVisible = !dropdownVisible"
      >
        <i class="bi-chevron-down"></i>
      </div>
      <div class="dropdown" v-show="dropdownVisible">
        <div class="choice" v-for="(choice, name) in filteredChoices" :key="name"
             @click="choose(choice)"
        >
          {{ choice.label }} ({{ choice.value }})
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {debounce} from 'debounce';

export default {
  name: 'DropdownSetting',
  props: {
    setting: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      value: '',
      placeholder: '',
      visible: false,
      closedRecently: false,
      dropdownVisible: true
    }
  },
  computed: {
    filteredChoices() {
      if (!this.value) return this.setting.choices

      const choices = {}
      for (const [name, choice] of Object.entries(this.setting.choices)) {
        if (choice.label.toLowerCase().includes(this.value.toLowerCase())){
          choices[name] = choice
        }
      }

      return choices
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
    choose(choice) {
      this.$emit('input', choice)
      this.placeholder = `${choice.label} (${choice.value})`
      this.value = ''
      this.dropdownVisible = false
      this.close()
    },
    onButtonClicked: debounce(function () {
      if (this.visible) this.close()
      else this.open()
    }, 200, true)
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

  .field {
    display: flex;
    width: 100%;
    z-index: 1;
    background-color: $decoder-bg-color;
  }

  input {
    height: $setting-height;
    width: 100%;
    font-size: 14px;
    border: 1px solid $decoder-border-color;
    border-left: none;
    border-right: none;
    outline: none;
  }

  .arrow {
    color: $decoder-color;
    font-size: .8rem;
    line-height: $setting-height;
    height: $setting-height;
    width: 20px;
    border: 1px solid $decoder-border-color;
    border-left: none;
    border-left: none;
    text-align: center;
    cursor: pointer;
    border-radius: 0 3px 3px 0;

    i::before {
      transform-origin: center 40%;
      transition: transform .5s;
    }

    &.active i::before {
      transform: rotate(-180deg);
    }
  }

  .dropdown {
    color: $decoder-color;
    position: absolute;
    top: $setting-height;
    left: $setting-height;
    right: 0;
    background-color: $decoder-bg-color;
    border: 1px solid $decoder-border-color;
    border-top: none;
    border-radius: 0 0 3px 3px;

    .choice {
      cursor: pointer;

      &:hover {
        background: $decoder-border-color;
      }
    }
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
