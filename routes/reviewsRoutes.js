import { addReview, deleteReviewById, getAllReviews, getReviewById, updateReview } from './reviews.js'; // Importerar controller-funktionerna från reviews.js

export async function routes(fastify) {
    // Registrerar GET-route och kopplar till controller-funktionen
    fastify.get('/reviews', getAllReviews); // Route för att hämta alla recensioner
    fastify.get('/reviews/:id', getReviewById); // Route för att hämta en recension med specifikt id
    fastify.post('/reviews', addReview); // Route för att lägga till ny recension
    fastify.put('/reviews/:id', updateReview); // Route för att uppdatera en recension med specifikt id
    fastify.delete('/reviews/:id', deleteReviewById); // Route för att radera en recension med specifikt id
};