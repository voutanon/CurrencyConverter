import { fiatApi } from '@/services/api'

export async function apiGetFiatExchange () {
  try {
    // const response = await fiatApi().get('/bank/currency')
    const response = await fiatApi().get('/statdirectory/exchange?json')
    return response.data
  } catch (error) {
    console.error(error)
  }
}
