import { Box, Card, CardContent, CircularProgress, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { getAllNews } from '../../services/newsServices'
import { NewsList } from '../../components'

type NewsCategoryProps = {
  country: string
}

const Categories = ({ country }: NewsCategoryProps) => {
  const [newsCategories, setNewsCategories] = useState([
    { id: 0, type: 'Business', selected: true },
    { id: 1, type: 'Entertainment', selected: false },
    { id: 2, type: 'General', selected: false },
    { id: 3, type: 'Health', selected: false },
    { id: 4, type: 'Science', selected: false },
    { id: 5, type: 'Sports', selected: false },
    { id: 6, type: 'Technology', selected: false },
  ])
  const [selectedCategory, setSelectedCategory] = useState({ id: 0, type: 'Business', selected: true })
  const newsPerRow = useMemo(() => Math.floor(window.innerWidth / (window.innerHeight / 3)), [])
  const { isLoading, data: allNews } = useQuery(['news', country, selectedCategory.type.toLowerCase()], () =>
    getAllNews(country, selectedCategory.type.toLowerCase())
  )

  const updatedSelection = (item: any) => {
    let newsCat = [...newsCategories]
    newsCat[selectedCategory.id].selected = false
    newsCat[item.id].selected = true

    setSelectedCategory(item)
    setNewsCategories(newsCat)
  }

  return (
    <div style={{ width: '100%' }}>
      <Typography variant="h5" fontWeight={'500'}>
        Categories
      </Typography>
      <Box
        sx={{
          display: 'grid',
          columnGap: 2,
          rowGap: 1,
          gridTemplateColumns: `repeat(${newsPerRow}, 1fr)`,
          marginTop: 1,
        }}>
        {newsCategories?.map((item: any, index: number) => {
          return (
            <Card sx={{ maxWidth: 345, background: item.selected && 'red' }} onClick={(e) => updatedSelection(item)}>
              <CardContent>
                <Typography sx={{ fontWeight: 600 }}>{item.type}</Typography>
              </CardContent>
            </Card>
          )
        })}
      </Box>
      <>
        <Typography variant="h5" fontWeight={'500'}>
          Top News from {country === 'us' ? 'United States' : 'Great Britain'}
        </Typography>
        {isLoading ? (
          <div
            style={{
              height: '100%',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}>
            <CircularProgress />
            <Typography>Loading...</Typography>
          </div>
        ) : (
          <NewsList newsData={allNews?.articles} />
        )}
      </>
    </div>
  )
}

export default Categories
