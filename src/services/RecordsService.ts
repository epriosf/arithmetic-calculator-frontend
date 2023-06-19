import { useApiPrivate } from '@/composables/useApi'
import { Records } from '@/interfaces/Record'
import { AxiosResponse } from 'axios'

export const getRecords = async (
  user_id: string,
  page: number = 0,
  limit: number = 5,
  sortField: string = '_id',
  sortOrder: number = 1 ,
  searchText: string = '',
  payload: any
): Promise<Records> => {
  try {
    const response: AxiosResponse<Records> = await useApiPrivate().get(
      `/api/records/${user_id}?page=${page}&limit=${limit}&sortField=${sortField}&sortOrder=${sortOrder}&searchText=${searchText}`,
      payload
    )
    return response.data
  } catch (error: Error | any) {
    throw error.response.data
  }
}
export const deleteRecord = async (record_id: string, payload: any): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await useApiPrivate().post(
      `/api/records/record/${record_id}`,
      payload
    )
    return response.data
  } catch (error: Error | any) {
    throw error.response.data
  }
}
