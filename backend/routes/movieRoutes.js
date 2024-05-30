import express from 'express';
import {
  createMovieList,
  addMovieToList,
  getUserLists,
  getPublicList,
  toggleVisibility,deleteList
} from '../controllers/movieController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, createMovieList).get(protect, getUserLists);
router.route('/add').post(protect, addMovieToList);
router.route('/public/:id').get(getPublicList);
router.route('/public/:id').patch(protect,toggleVisibility)
router.route('/delete/:id').delete(protect,deleteList)

export default router;
