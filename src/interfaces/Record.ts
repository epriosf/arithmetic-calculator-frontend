export interface Record {
  _id: string
  operation_id: string
  user_id: string
  amount: string
  user_balance: string
  operation_response: string
  is_deleted: boolean
  created_at: Date
  updated_at: Date
}
export interface FormatRecord {
  _id: string
  operation_id: string
  user_id: string
  amount: string
  user_balance: string
  operation_response: string
  is_deleted: boolean
  created_at: String
  updated_at: Date
}
export interface Records {
  records: Record[]
  total_records: number
}
