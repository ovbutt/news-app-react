import './Home.css'
import { Typography, Tabs, Tab, Box, Switch, Stack } from '@mui/material'
// import { Add } from '@mui/icons-material'
import { useQuery } from '@tanstack/react-query'
import { getAllNews } from '../../services/newsServices'
import { useState } from 'react'
import TopNews from '../TopNews'
import Categories from '../Categories'
import Search from '../Search'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

function Home() {
  const [value, setValue] = useState(0)
  const [country, setCountry] = useState('us')
  const { isLoading, data: allNews } = useQuery(['news', country], () => getAllNews(country))

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const handleChangeSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setCountry('gb')
    } else {
      setCountry('us')
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Top News" {...a11yProps(0)} />
          <Tab label="Categories" {...a11yProps(1)} />
          <Tab label="Search" {...a11yProps(2)} />
        </Tabs>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          style={{ position: 'absolute', right: 10, alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
          <Typography>US</Typography>
          <Switch
            checked={country === 'gb' ? true : false}
            onChange={handleChangeSwitch}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          <Typography>GB</Typography>
        </Stack>
      </Box>
      <TabPanel value={value} index={0}>
        <TopNews loading={isLoading} data={allNews} country={country} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Categories country={country} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Search country={country} />
      </TabPanel>
    </Box>
  )
}

export default Home
