<template>
  <button class="bg-green-400 text-white font-bold text-gray-800 py-3 px-3 rounded text-sm" :class="disabled ? 'opacity-50 cursor-default' : 'hover:bg-green-500'" v-text="label" @click="btnClick"></button>
</template>

<script>
export default {
  name: 'custom-button',
  props: {
    label: {
      type: String,
      default: 'Ok'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    btnClick() {
      if (!this.disabled) {
        this.$emit('btn-click')
      }
    }
  }
}
</script>
