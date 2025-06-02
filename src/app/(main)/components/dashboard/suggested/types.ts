export interface Diver {
  id: string
  name: string
  location: string
  date: string
  profileImage: string
  backgroundImage: string
  stats: {
    description: string
    timeIn: string
    timeOut: string
    maxDepth: string
    bottomTime: string
  }
}
