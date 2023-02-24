<template>
  <div class="container">
    <ConvertationForm v-if="getExchangeCurrencies.length > 0" :exchange-currencies="getExchangeCurrencies" @updateCurrencyAPI="updateExchangeCurrencies" />
    <ExchangeCurrenciesList v-if="getListExchangeCurrencies.length > 0" :exchange-currencies="getListExchangeCurrencies" :currencies="baseCurrencies" />
    <button class="container__buttonUpdateApi" :disabled="isDisable" @click="manualUpdateExchangeCurrencies()">
      Update exchange&nbsp;<span v-show="isDisable">{{ timer / 1000 }}</span>
    </button>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import ConvertationForm from '@/components/convertation/forms/convertationForm.vue'
import ExchangeCurrenciesList from '~/components/convertation/lists/exchangeCurrenciesList.vue'

export default {
  name: 'IndexPage',
  components: {
    ConvertationForm,
    ExchangeCurrenciesList
  },
  data () {
    return {
      isDisable: false,
      baseCurrencies: ['USD', 'EUR', 'UAH'],
      timer: 5000
    }
  },
  computed: {
    ...mapGetters({
      getCryptoExchange: 'cryptoCurrency/getCryptoExchange',
      getBaseCryptoCurrency: 'cryptoCurrency/getBaseCryptoCurrency',
      getFiatExchange: 'fiatCurrency/getFiatExchange',
      getBaseFiatCurrency: 'fiatCurrency/getBaseFiatCurrency',
      getFiatBaseData: 'fiatCurrency/getFiatBaseData',
      getExchangeCurrencies: 'currency/getExchangeCurrencies',
      getTypesListExchangeCurrencies: 'currency/getTypesListExchangeCurrencies'
    }),
    getListExchangeCurrencies () {
      return this.getExchangeCurrencies.filter(currency => this.getTypesListExchangeCurrencies.includes(currency.name))
    }
  },
  mounted () {
    this.updateExchangeCurrencies()
  },
  methods: {
    ...mapMutations({
      setExchangeCurrensies: 'currency/setExchangeCurrensies'
    }),
    ...mapActions({
      requestCryptoExchange: 'cryptoCurrency/getCryptoExchange',
      requestFiatExchange: 'fiatCurrency/getFiatExchange'
    }),
    async manualUpdateExchangeCurrencies () {
      this.updateExchangeCurrencies()
      this.isDisable = true
      const timerInterval = setInterval(() => {
        this.timer -= 1000
      }, 1000)
      await setTimeout(() => {
        clearInterval(timerInterval)
        this.isDisable = false
        this.timer = 5000
      }, this.timer)
    },
    async updateExchangeCurrencies () {
      await this.requestCryptoExchange()
      await this.requestFiatExchange()
      this.setExchangeCurrensies({ fiatExchange: this.getFiatExchange, cryptoExchange: this.getCryptoExchange, USDdata: this.getFiatBaseData })
    }
  }
}
</script>
<style lang="scss" scoped>
  .container {
    &__buttonUpdateApi {
      display: flex;
      margin-top: 20px;
    }
  }
</style>
