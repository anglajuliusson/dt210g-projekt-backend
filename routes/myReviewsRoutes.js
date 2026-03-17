import { verifyToken } from '../middleware/login.js';
import { getMyReviews, updateMyReview, deleteMyReview } from "./myReviews.js";

export async function routes(fastify) {
    fastify.get("/reviews/my-reviews", { preHandler: verifyToken }, getMyReviews);
    fastify.put("/reviews/my-reviews/:id", { preHandler: verifyToken }, updateMyReview);
    fastify.delete("/reviews/my-reviews/:id", { preHandler: verifyToken }, deleteMyReview);
};