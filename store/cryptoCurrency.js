import { apiGetCryptoExchange } from '@/services/cryptoCurrency'

const state = () => ({
  exchange: [],
  currencyExchange: [],
  symbolCryptoCurrensy: ['BTC', 'ETH', 'BNB', 'XRP'],
  baseCryptoCurrensy: 'BTC'
})
const actions = {
  async getCryptoExchange ({ commit }) {
    const response = await apiGetCryptoExchange()
    commit('setCryptoExchange', response)
  }
}
const mutations = {
  setCryptoExchange (state, exchangeCurrentlies) {
    state.exchange = exchangeCurrentlies.filter(exchange => !state.symbolCryptoCurrensy.includes(exchange.symbol))
    state.currencyExchange = exchangeCurrentlies.filter(exchange => state.symbolCryptoCurrensy.includes(exchange.symbol))
  }
}
const getters = {
  getCryptoExchange: state => state.currencyExchange,
  getCryptoCurrencies: state => state.symbolCryptoCurrensy,
  getBaseCryptoCurrency: state => state.baseCryptoCurrensy
}
export default { namespaced: true, state, actions, mutations, getters }
