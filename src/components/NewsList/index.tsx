import { useMemo, useState } from 'react'
import { Typography, Box, Card, CardMedia, CardContent } from '@mui/material'
import { NewsI } from '../../types/NewsTypes'
import NewsDetailModal from '../NewsDetailModal'

type NewsListProps = {
  newsData?: NewsI[]
}

function NewsList({ newsData }: NewsListProps) {
  const newsPerRow: number = useMemo(() => Math.floor(window.innerWidth / (window.innerHeight / 3)), [])
  const [openNewsDetailModal, setOpenNewsDetailModal] = useState<boolean>(false)
  const [selectedNews, setSelectedNews] = useState<NewsI>()

  return (
    <div style={{ width: '100%' }}>
      <Box
        sx={{
          display: 'grid',
          columnGap: 2,
          rowGap: 1,
          gridTemplateColumns: `repeat(${newsPerRow}, 1fr)`,
          marginTop: 1,
        }}>
        {newsData?.length ? (
          newsData?.map((item: NewsI, index: number) => {
            return (
              <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                  <Typography sx={{ fontWeight: 600 }}>{item.title}</Typography>
                </CardContent>
                <CardMedia
                  component="img"
                  height="194"
                  image={item?.urlToImage ? item?.urlToImage : require('../../assets/images/newsBg.jpg')}
                  alt="newsImage"></CardMedia>
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {item?.description?.substring(0, 100) + '...'}
                    <Typography
                      sx={{ color: 'blue', marginTop: 1, cursor: 'pointer' }}
                      onClick={() => {
                        setOpenNewsDetailModal(true)
                        setSelectedNews(item)
                      }}>
                      Read More
                    </Typography>
                  </Typography>
                </CardContent>
              </Card>
            )
          })
        ) : (
          <Typography fontSize={20} fontWeight={'bold'} style={{ marginTop: 20 }}>
            No News Found
          </Typography>
        )}
      </Box>
      <NewsDetailModal
        open={openNewsDetailModal}
        handleClose={() => setOpenNewsDetailModal(false)}
        newsData={selectedNews}
      />
    </div>
  )
}

export default NewsList
