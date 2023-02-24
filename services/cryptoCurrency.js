import { cryptoApi } from '@/services/api'

export async function apiGetCryptoExchange () {
  try {
    const response = await cryptoApi().get('/tickers')
    return response.data
  } catch (error) {
    console.error(error)
  }
}
