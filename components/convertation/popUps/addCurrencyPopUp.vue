<template>
  <div class="popUp">
    <div class="popup__content">
      <button class="popup__button" @click="showModal()">
        Show addition exchange currencies
      </button>
      <BasePopUp title-modal="additionCurrenciesModal">
        <template #default>
          <label class="popup__label">
            Currencies:
            <select v-model="currenCyrrency" class="popup__select">
              <option v-for="currency of exchangeCurrencies" :key="currency.id" class="popup__option">{{ currency.name }}</option>
            </select>
            <button class="popup__button" @click="addCurrencies()">Add currencies</button>
          </label>
        </template>
      </BasePopUp>
    </div>
  </div>
</template>
<script>
import BasePopUp from '@/components/utilities/popUps/basePopUp.vue'

export default {
  components: {
    BasePopUp
  },
  props: {
    exchangeCurrencies: {
      type: Array,
      require: true,
      default: () => []
    }
  },
  data () {
    return {
      currenCyrrency: null
    }
  },
  mounted () {
    this.currenCyrrency = this.exchangeCurrencies[0].name
  },
  methods: {
    async addCurrencies () {
      if (this.currenCyrrency) {
        await this.$emit('addCurrency', this.currenCyrrency)
        this.currenCyrrency = this.exchangeCurrencies[0].name
      }
    },
    showModal () {
      this.$modal.show('additionCurrenciesModal')
    }
  }
}
</script>
<style lang="scss" scoped>
  .popUp  {
    margin-top: 20px;
  }
</style>
