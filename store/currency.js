const state = () => ({
  exchange: [],
  typesListExchangeCurrencies: ['USD', 'EUR', 'UAH', 'BTC', 'ETH']

})
const actions = {
}
const mutations = {
  setExchangeCurrensies (state, { fiatExchange, cryptoExchange, USDdata }) {
    state.exchange = fiatExchange.map((exchange, index) => {
      let price = 1
      if (exchange.cc !== USDdata.cc) {
        price = exchange.rate / USDdata.rate
      }
      return { name: exchange.cc, price, id: index, type: 'fiat' }
    })
    state.exchange = [...state.exchange, ...cryptoExchange.map((exchange, index) => {
      return { name: exchange.symbol, price: exchange.quotes.USD.price, id: state.exchange.length + index, type: 'crypto' }
    })]
  },
  addCurrencyToList (state, currency) {
    state.typesListExchangeCurrencies.push(currency)
  }
}
const getters = {
  getExchangeCurrencies: state => state.exchange,
  getTypesListExchangeCurrencies: state => state.typesListExchangeCurrencies
}
export default { namespaced: true, state, actions, mutations, getters }
