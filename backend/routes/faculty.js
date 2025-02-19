import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js';
import {addFaculty,upload,getFaculties,getFaculty} from '../controllers/facultyController.js'

const router = express. Router()

router.get('/', authMiddleware, getFaculties)
router.post('/add', authMiddleware,upload.single('image'), addFaculty )
 router.get('/:id', authMiddleware, getFaculty)
// router.put('/:id', authMiddleware, updateDepartment)
// router.delete('/:id', authMiddleware, deleteDepartment)

export default router