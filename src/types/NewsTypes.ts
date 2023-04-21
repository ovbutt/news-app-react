export interface NewsI {
  author: string
  content: string
  publishedAt: string
  source: any
  title: string
  description: string
  urlToImage: string
  url: string
}
export interface NewsResponse {
  totalResults: number
  status: string
  articles: NewsI[]
}
