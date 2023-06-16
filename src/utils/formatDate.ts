export const formatDate = (date: Date): string => {
  const formattedDate = new Date(date)
  return formattedDate.toLocaleString('en-US')
}
