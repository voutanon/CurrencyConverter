import axios from 'axios'

export const cryptoApi = () => {
  axios.defaults.baseURL = 'https://api.coinpaprika.com/v1'

  return axios.create()
}

export const fiatApi = () => {
  axios.defaults.baseURL = 'https://bank.gov.ua/NBUStatService/v1'
  // axios.defaults.baseURL = 'https://api.monobank.ua'

  return axios.create()
}
