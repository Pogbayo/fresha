import express from "express"
import { getReviews,createReview } from "../../src/controllers/reviewController"


const router = express.Router();
router.get('/reviews', getReviews);
router.post('/reviews',createReview)
export {router as reviewRoute}