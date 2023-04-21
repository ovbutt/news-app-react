import { CircularProgress, Typography } from '@mui/material'
import React from 'react'
import { NewsList } from '../../components'

type TopNewsProps = {
  loading: boolean
  data: any
  country: string
}

const TopNews = ({ loading, data, country }: TopNewsProps) => {
  return (
    <>
      <Typography variant="h5" fontWeight={'500'}>
        Top News from {country === 'us' ? 'United States' : 'Great Britain'}
      </Typography>
      {loading ? (
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
        <NewsList newsData={data?.articles} />
      )}
    </>
  )
}

export default TopNews
