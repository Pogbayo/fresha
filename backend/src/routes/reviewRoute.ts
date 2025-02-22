import express from "express"
import { getReviews,createReview } from "../controllers/reviewController"


const router = express.Router();
router.get('/reviews', getReviews);
router.post('/reviews',createReview)
export {router as reviewRoute}