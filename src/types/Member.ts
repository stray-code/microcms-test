export type Member = {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  name: string
  department: string
  avatar_url: {
    height: number
    url: string
    width: number
  }
  biography: string
}
