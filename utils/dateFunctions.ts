import { formatDistanceToNow } from 'date-fns'
import { enUS } from 'date-fns/locale'

export const getFormatDistanceToNow = (date: number) => {
  const fromNow = formatDistanceToNow(date, { addSuffix: true, locale: enUS })

  return `Created ${fromNow}`
}