<template>
  <div class="setting setting-boolean">
    <button :class="[('btn-' + (setting.value ? 'primary' : 'dark')), 'btn btn-sm']"
            @click="$emit('input', setting.choices.urlSafe)"
            data-bs-toggle="tooltip" data-bs-placement="bottom" :title="setting.label || setting.name"
    >
      <i :class="setting.icon ? 'bi-' + setting.icon : 'bi-sliders'"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: 'DropdownSetting',
  props: {
    setting: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import './src/scss/variables';

.setting-boolean {
  button {
    bottom: 0;
  }

  button {
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
