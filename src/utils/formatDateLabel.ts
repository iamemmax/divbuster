export const formatDateLabel = (timestamp: string) => {
  const messageDate = new Date(timestamp)
  const now = new Date()

  const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate())

  const diffInDays =
    (startOfDay(now).getTime() - startOfDay(messageDate).getTime()) / (1000 * 60 * 60 * 24)

  if (diffInDays === 0) return 'Today'
  if (diffInDays === 1) return 'Yesterday'
  if (diffInDays > 1 && diffInDays < 7) {
    return messageDate.toLocaleDateString('en-US', { weekday: 'long' })
  }

  return messageDate.toLocaleDateString('en-US')
}
