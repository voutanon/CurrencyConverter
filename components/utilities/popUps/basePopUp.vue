<template>
  <modal :name="titleModal">
    <button class="modal__closeButton" @click="hideModal()">
      Close
    </button>
    <slot />
  </modal>
</template>
<script>
export default {
  props: {
    titleModal: {
      type: String,
      require: true,
      default: ''
    }
  },
  methods: {
    hideModal () {
      this.$modal.hide(this.titleModal)
    }
  }
}
</script>
