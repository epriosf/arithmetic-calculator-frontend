import { useApiPrivate } from '@/composables/useApi'

export const getRandomString = async (payload: any) => {
  try {
    const { data } = await useApiPrivate().post(`/operation/random-string`, payload)
    return data
  } catch (error: Error | any) {
    throw error.message
  }
}
