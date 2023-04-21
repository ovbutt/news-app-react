import { CircularProgress, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { getAllNews } from '../../services/newsServices'
import { NewsList } from '../../components'
import { DebounceInput } from 'react-debounce-input'

type NewsCategoryProps = {
  country: string
}

const Search = ({ country }: NewsCategoryProps) => {
  const [query, setQuery] = useState('')
  const { isLoading, data: allNews } = useQuery(['news', country, query], () => getAllNews(country, '', query))

  return (
    <div style={{ width: '100%' }}>
      <div>
        <DebounceInput
          minLength={2}
          debounceTimeout={300}
          onChange={(event) => {
            setQuery(event.target.value)
          }}
          style={{ width: '90%', height: 60, fontSize: 20 }}
          placeholder={'Enter Search here...'}
        />
      </div>
      <>
        <Typography variant="h5" fontWeight={'500'}>
          Searched News from {country === 'us' ? 'United States' : 'Great Britain'}
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

export default Search
