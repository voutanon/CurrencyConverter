<template>
  <div class="exchangeCurrencies shadowBlock">
    <label class="exchangeCurrencies__label">
      Current currency:
      <select v-model="currentCurrency" class="exchangeCurrencies__select">
        <option v-for="currency of getBaseCurrency" :key="currency.id" class="exchangeCurrencies__option">{{ currency.name }}</option>
      </select>
    </label>
    <ul class="exchangeCurrencies__list">
      <li v-for="currency of getListExchangeCurrencies" :key="currency.id" class="exchangeCurrencies__item">
        <span class="exchangeCurrencies__currency">{{ currency.name }}</span>
        <span class="exchangeCurrencies__exchange">{{ currency.price }}</span>
      </li>
    </ul>
    <AddCurrencyPopUp v-if="getAdditionExchangeCurrencies.length > 0" :exchange-currencies="getAdditionExchangeCurrencies" @addCurrency="addCurrencyToList" />
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import AddCurrencyPopUp from '@/components/convertation/popUps/addCurrencyPopUp.vue'

export default {
  components: {
    AddCurrencyPopUp
  },
  props: {
    exchangeCurrencies: {
      type: Array,
      require: true,
      default: () => []
    },
    currencies: {
      type: Array,
      require: true,
      default: () => []
    }
  },
  data () {
    return {
      currentCurrency: '',
      listExchangeCurrencies: []
    }
  },
  computed: {
    ...mapGetters({
      getBaseFiatCurrency: 'fiatCurrency/getBaseFiatCurrency',
      getTypesListExchangeCurrencies: 'currency/getTypesListExchangeCurrencies',
      getExchangeCurrencies: 'currency/getExchangeCurrencies'
    }),
    getBaseCurrency () {
      return this.exchangeCurrencies.filter(currency => this.currencies.includes(currency.name))
    },
    getCurrentCurrency () {
      return this.exchangeCurrencies.find(currency => currency.name === this.currentCurrency)
    },
    getListExchangeCurrencies () {
      return this.exchangeCurrencies.map((currency) => {
        const currencyPrice = currency.type === 'fiat'
          ? Math.round(currency.price / this.getCurrentCurrency.price * 100) / 100
          : currency.price / this.getCurrentCurrency.price
        return { ...currency, price: currencyPrice }
      })
    },
    getAdditionExchangeCurrencies () {
      return this.getExchangeCurrencies.filter(currency => !this.getTypesListExchangeCurrencies.includes(currency.name))
    }
  },
  created () {
    this.currentCurrency = this.getBaseFiatCurrency
  },
  methods: {
    ...mapMutations({
      addCurrencyToStoreList: 'currency/addCurrencyToList'
    }),
    addCurrencyToList (additionalCurrency) {
      this.addCurrencyToStoreList(additionalCurrency)
    }
  }
}
</script>
<style lang="scss" scoped>
  .exchangeCurrencies {
    margin-top: 30px;
    padding-bottom: 30px;
    &__label {
      font-weight: 500;
    }
    &__list {
      margin-top: 10px;
    }
    &__item {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      padding-bottom: 10px;
      border-bottom: 1px solid $darkGray;
    }
  }
</style>
