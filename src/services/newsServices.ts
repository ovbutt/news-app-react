import { NewsResponse } from '../types/NewsTypes'
import { api } from '../utils/api'

export const getAllNews = async (country: string, category?: string, query?: string): Promise<NewsResponse> => {
  let endPoint = `/top-headlines?country=${country}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
  if (category) {
    endPoint += `&category=${category}`
  }
  if (query) {
    endPoint += `&q=${query}`
  }

  return await api.get(endPoint).then((response) => response.data)
}
