import { apiGetFiatExchange } from '@/services/fiatCurrency'

const state = () => ({
  exchange: [],
  fiatCurrency: ['GBP', 'USD', 'EUR', 'UAH'],
  baseFiatCurrensy: 'USD'
})
const actions = {
  async getFiatExchange ({ commit }) {
    const response = await apiGetFiatExchange()
    commit('setFiatExchange', response)
  }
}
const mutations = {
  setFiatExchange (state, exchangeCurrentlies) {
    const exchangeFilters = exchangeCurrentlies.filter(exchange => state.fiatCurrency.includes(exchange.cc))
    const UAHCurrensy = {
      r030: 980,
      txt: 'Гривня',
      rate: 1,
      cc: 'UAH',
      exchangedate: exchangeCurrentlies[0].exchangedate
    }
    state.currentExchange = [...exchangeFilters, UAHCurrensy]
  }
}
const getters = {
  getFiatExchange: state => state.currentExchange,
  getFiatCurrencies: state => state.fiatCurrency,
  getBaseFiatCurrency: state => state.baseFiatCurrensy,
  getFiatBaseData: (state, getters) => getters.getFiatExchange.find(fiatCurrency => fiatCurrency.cc === getters.getBaseFiatCurrency)
}
export default { namespaced: true, state, actions, mutations, getters }
