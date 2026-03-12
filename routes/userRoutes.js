import { addUser, deleteUserById, getAllUsers, getUserById, updateUser } from './users.js'; // Importerar controller-funktionerna från users.js

export async function routes(fastify) {
    // Registrerar GET-route och kopplar till controller-funktionen
    fastify.get('/users', getAllUsers); // Route för att hämta alla användare
    fastify.get('/users/:id', getUserById); // Route för att hämta en användare med specifikt id
    fastify.post('/users', addUser); // Route för att lägga till ny användare
    fastify.put('/users/:id', updateUser); // Route för att uppdatera en användare med specifikt id
    fastify.delete('/users/:id', deleteUserById); // Route för att radera en användare med specifikt id
};