import { useApiPrivate } from '@/composables/useApi'

export const getMathResult = async (payload: any) => {
  try {
    const { data } = await useApiPrivate().post(`/api/operation/math-operation`, payload)
    return data
  } catch (error: Error | any) {
    throw error.response.data
  }
}
