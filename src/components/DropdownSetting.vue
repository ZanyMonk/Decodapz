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
             :placeholder="placeholder"
             v-model="value"
             @blur="close()"
             @keyup.esc="close()"
             @keyup.down="navigate(1)"
             @keyup.up="navigate(-1)"
             @keyup.enter="chooseSelected()"
             @focusin="dropdownVisible = true"
      >
      <div :class="[{active: dropdownVisible}, 'arrow']"
           @click="dropdownVisible = !dropdownVisible"
      >
        <i class="bi-chevron-down"></i>
      </div>
      <div class="dropdown" v-show="dropdownVisible">
        <div v-for="(choice, name) in filteredChoices" :key="name"
             :class="[{active: selected === name}, 'choice']"
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

/**
 * @TODO Abstract button-field widget
 */
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
      selected: null,
      visible: false,
      closedRecently: false,
      dropdownVisible: true
    }
  },
  computed: {
    filteredChoices() {
      const value = this.value
      if (!value) return this.setting.choices

      const choices = {}
      for (const [name, choice] of Object.entries(this.setting.choices)) {
        if (choice.label.toLowerCase().includes(value.toLowerCase())){
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
      setTimeout(() => {
        this.visible = false
        this.selected = null

        if (this.closedRecently) clearTimeout(this.closedRecently)
        this.closedRecently = setTimeout(() => {
          this.closedRecently = false
        }, 500)
      }, 200)
    },
    choose(choice) {
      this.$emit('input', choice)
      this.selected = choice
      this.placeholder = `${choice.label} (${choice.value})`
      this.value = ''
      this.dropdownVisible = false
      this.close()
    },
    navigate(step = 1) {
      const choices = this.filteredChoices
      const keys = Object.keys(choices)

      if (!keys.length) return

      let index = Math.max(0, keys.indexOf(this.selected))
      if (index > -1 && this.selected) {
        step = Math.max(-1, Math.min(step, 1))
        const newIndex = (((index+step) % keys.length) + keys.length) % keys.length // Modulo that's not broken ...
        this.selected = keys[newIndex]
      } else {
        this.selected = keys[step > 0 ? 0 : keys.length-1]
      }

      const choice = choices[this.selected]
      this.$emit('input', choice)
      this.placeholder = `${choice.label} (${choice.value})`
      this.value = ''
    },
    chooseSelected() {
      const choices = this.filteredChoices
      console.log(choices, this.selected, this.selected in choices)
      if (!this.selected || !(this.selected in choices)) this.value = choices[Object.keys(choices)[0]]
      const choice = this.filteredChoices[this.selected]
      this.$emit('input', choice)
      this.placeholder = `${choice.label} (${choice.value})`
      this.value = ''
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

      &:hover,
      &.active {
        background-color: $decoder-border-color;
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
