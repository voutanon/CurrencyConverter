<template>
  <form class="form shadowBlock">
    <h1 class="form__title">Convertation currencies</h1>
    <label class="form__label">
      Sell:
      <div class="form__controls">
        <select v-model="convertationData.sellData.currency" class="form__select">
          <option v-for="currency of exchangeCurrencies" :key="currency.id" class="form__option">{{ currency.name }}</option>
        </select>
        <input min="0" id="fiatCurrency" v-model="convertationData.sellData.value" class="form__input" type="number">
      </div>
    </label>
    <label class="form__label">
      Buy:
      <div class="form__controls">
        <select v-model="convertationData.buyData.currency" class="form__select">
          <option v-for="currency of exchangeCurrencies" :key="currency.id" class="form__option">{{ currency.name }}</option>
        </select>
        <input min="0" v-model="convertationData.buyData.value" class="form__input" type="number">
      </div>
    </label>
  </form>
</template>
<script>
import { mapGetters } from 'vuex'
import { debounce } from 'lodash'

export default {
  props: {
    exchangeCurrencies: {
      type: Array,
      require: true,
      default: () => []
    }
  },
  data () {
    return {
      convertationData: {
        sellData: {
          currency: '',
          value: 0
        },
        buyData: {
          currency: '',
          value: 0
        }
      },
      typeCurrentCurrency: 'buy'
    }
  },
  computed: {
    ...mapGetters({
      getBaseCryptoCurrency: 'cryptoCurrency/getBaseCryptoCurrency',
      getBaseFiatCurrency: 'fiatCurrency/getBaseFiatCurrency'
    }),
    sellCurrencyData () {
      return this.exchangeCurrencies.find(currency => currency.name === this.convertationData.sellData.currency)
    },
    buyCurrencyData () {
      return this.exchangeCurrencies.find(currency => currency.name === this.convertationData.buyData.currency)
    },
    typeConvertationCurrency () {
      return this.typeCurrentCurrency === 'buy' ? 'sell' : 'buy'
    }
  },
  watch: {
    convertationData: {
      handler: debounce(function () {
        if (this.convertationData.sellData.value >= 0 && this.convertationData.buyData.value >= 0) {
          this.$emit('updateCurrencyAPI')
          this.calculateConvertationSum()
        }
      }, 300),
      deep: true
    },
    'convertationData.sellData': {
      handler () {
        this.typeCurrentCurrency = 'sell'
      },
      deep: true
    },
    'convertationData.buyData': {
      handler () {
        this.typeCurrentCurrency = 'buy'
      },
      deep: true
    }
  },
  created () {
    this.convertationData.sellData.currency = this.getBaseFiatCurrency
    this.convertationData.buyData.currency = this.getBaseCryptoCurrency
  },
  methods: {
    calculateConvertationSum () {
      let USDvalue = 0

      const currentCurrensy = this.exchangeCurrencies.find(currency => currency.name === this.convertationData[`${this.typeCurrentCurrency}Data`].currency)
      const convertationCurrency = this.exchangeCurrencies.find(currency => currency.name === this.convertationData[`${this.typeConvertationCurrency}Data`].currency)
      const priceCurrentCurrensy = currentCurrensy.price
      const priceConvertationCurrensy = convertationCurrency.price

      USDvalue = this.convertationData[`${this.typeCurrentCurrency}Data`].value * priceCurrentCurrensy

      this.convertationSum(USDvalue, priceCurrentCurrensy, priceConvertationCurrensy, convertationCurrency)
    },
    convertationSum (USDvalue, priceCurrentCurrensy, priceConvertationCurrensy, convertationCurrency) {
      if (USDvalue <= 10000) {
        this.convertationData[`${this.typeConvertationCurrency}Data`].value = convertationCurrency.type === 'fiat'
          ? Math.round(USDvalue / priceConvertationCurrensy * 100) / 100
          : USDvalue / priceConvertationCurrensy
      } else {
        let maxSumConvertation = 10000
        if (this.convertationData[`${this.typeCurrentCurrency}Data`].currency !== this.getBaseFiatCurrency) {
          maxSumConvertation = convertationCurrency.type === 'fiat'
            ? Math.round(maxSumConvertation / priceCurrentCurrensy * 100) / 100
            : maxSumConvertation / priceCurrentCurrensy
        }
        alert(`Maximum conversion amount ${maxSumConvertation + this.convertationData[`${this.typeCurrentCurrency}Data`].currency}`)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .form {
    &__controls {
      margin-top: 5px;
      padding: 10px 13px;
      border-radius: 4px;
      background: $gray;
      display: flex;
      justify-content: space-between;
    }
    &__label {
      background: $lightGray;
      margin-bottom: 15px;
      padding: 10px 10px 15px;
      width: calc(100% - 20px);
    }
    &__input {
      width: 100%;
    }
  }
</style>
