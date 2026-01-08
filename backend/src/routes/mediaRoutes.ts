import express from 'express'
import { createGalleryItem, getGallery, updateGalleryItem, getAllGalleryAdmin } from '../modules/media/mediaController.ts'


const router = express.Router()

router.get('/public', getGallery) // public gallery
router.get('/admin', getAllGalleryAdmin)
router.post('/admin', upload.single('image'), createGalleryItem)
router.put('/admin/:id', upload.single('image'), updateGalleryItem)

export default router
