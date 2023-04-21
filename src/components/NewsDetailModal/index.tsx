import { Box, Divider, Modal, Typography } from '@mui/material'
import React from 'react'
import { NewsI } from '../../types/NewsTypes'

type NewsModalProps = {
  open: boolean
  handleClose: any
  newsData?: NewsI
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const NewsDetailModal = ({ open, handleClose, newsData }: NewsModalProps) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h5" component="h2" fontWeight={700}>
          {newsData?.title}
        </Typography>
        <img
          style={{ marginTop: 10, marginBottom: 10 }}
          src={newsData?.urlToImage ? newsData?.urlToImage : require('../../assets/images/newsBg.jpg')}
          alt="news-bg"
          width={700}
        />
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          <Typography id="modal-news-author" sx={{ mt: 2 }}>
            Author: {newsData?.author}
          </Typography>
          <Typography id="modal-news-publish-date" sx={{ mt: 2 }}>
            Publish Date: {newsData?.publishedAt?.split('T')[0]}
          </Typography>
        </div>
        <Divider />
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {newsData?.description}
        </Typography>
      </Box>
    </Modal>
  )
}

export default NewsDetailModal
