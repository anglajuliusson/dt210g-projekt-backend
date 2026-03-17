import { verifyToken } from '../middleware/login.js';
import { addReview, deleteReviewById, getAllReviews, getReviewById, getReviewsByBookId, updateReview } from './reviews.js'; // Importerar controller-funktionerna från reviews.js

export async function routes(fastify) {
    // Registrerar GET-route och kopplar till controller-funktionen
    fastify.get('/reviews', getAllReviews); // Route för att hämta alla recensioner
    fastify.get('/reviews/:id', getReviewById); // Route för att hämta en recension med specifikt id
    fastify.post('/reviews', {preHandler: verifyToken}, addReview); // Route för att lägga till ny recension
    fastify.put('/reviews/:id', {preHandler: verifyToken}, updateReview); // Route för att uppdatera en recension med specifikt id
    fastify.delete('/reviews/:id', {preHandler: verifyToken}, deleteReviewById); // Route för att radera en recension med specifikt id
    fastify.get("/reviews/book/:bookId", getReviewsByBookId); 
};