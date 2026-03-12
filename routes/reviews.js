import { excuteQuery } from '../config/db.js' // Importera hjälpfunktionen för att köra SQL-frågor mot MySQL

// Funktion som hämtar alla recensioner från databasen
export const getAllReviews = async(req, reply) => {
    try {
        // Anropar excuteQuery för att skicka SQL till databasen
        // Resultatet returneras som ett Promise och hanteras med await
        let reviewsData = await excuteQuery("select * from reviews", []);
        reply.status(200).send(reviewsData);
    } catch (err) {
        reply.status(500).send(err);
    }
};

// Funktion som hämtar en specifik recension baserat på ID
export const getReviewById = async(req, reply) => {
    let id = req.params.id;
    try {
        let reviewsData = await excuteQuery("select * from reviews where id=?", [id]);
        reply.status(200).send(reviewsData);
    } catch (err) {
        reply.status(500).send(err);
    }
};

// Funktion som lägger till ny recension
export const addReview = async(req, reply) => {
    try {
        const { book_id, book_title, rating, review_text } = req.body;

        // Kontrollera att book_id inte är en tom sträng
        if (!book_id || typeof book_id !== "string") {
            return reply.status(400).send({ error: "Book ID saknas." });
        }
    
        // Kontrollera att titel inte är en tom sträng
        if (!book_title || typeof book_title !== "string" || book_title.trim() === "") {
            return reply.status(400).send({ error: "Boktitel måste fyllas i." });
        }
    
        // Kontrollera att betyg är ett nummer mellan 1 och 5
        if (typeof rating !== "number" || rating < 1 || rating > 5) {
            return reply.status(400).send({ error: "Betyg måste vara mellan 1 och 5." });
        }
    
        // Kontrollera att recensionen inte är en tom stärng
        if (!review_text || review_text.trim() === "") {
            return reply.status(400).send({ error: "Recensionen får inte vara tom." });
        }         

        // SQL-fråga för att lägga till recension
        let reviewsData = await excuteQuery("insert into reviews(book_id, book_title, rating, review_text) values(?, ?, ?, ?)",
            [
                book_id, 
                book_title, 
                rating, 
                review_text
            ]
        );
        reply.status(201).send({ message: "Recension skapad!", reviewsData});
    } catch (err) {
        reply.status(400).send(err);
    }
};

// Funktion som uppdaterar en specifik recension baserad på ID
export const updateReview = async(req, reply) => {
    let id = req.params.id;
    try {
        const { book_id, book_title, rating, review_text } = req.body;

        // Kontrollera att book_id inte är en tom sträng
        if (!book_id || typeof book_id !== "string") {
            return reply.status(400).send({ error: "Book ID saknas." });
        }
    
        // Kontrollera att titel inte är en tom sträng
        if (!book_title || typeof book_title !== "string" || book_title.trim() === "") {
            return reply.status(400).send({ error: "Boktitel måste fyllas i." });
        }
    
        // Kontrollera att betyg är ett nummer mellan 1 och 5
        if (typeof rating !== "number" || rating < 1 || rating > 5) {
            return reply.status(400).send({ error: "Betyg måste vara mellan 1 och 5." });
        }
    
        // Kontrollera att recensionen inte är en tom stärng
        if (!review_text || review_text.trim() === "") {
            return reply.status(400).send({ error: "Recensionen får inte vara tom." });
        }   

        // SQL-fråga för att uppdatera recension
        let reviewsData = await excuteQuery(`update reviews set book_id=?, book_title=?, rating=?, review_text=? where id=${id}`,
            [ 
                book_id, 
                book_title, 
                rating, 
                review_text
            ]
        );
        reply.status(200).send({ message: "Recension uppdaterad!", reviewsData});
    } catch (err) {
        reply.status(400).send(err);
    }
};

// Funktion som raderar en specifik recension baserat på ID
export const deleteReviewById = async(req, reply) => {
    let id = req.params.id;
    try {
        let reviewsData = await excuteQuery("delete from reviews where id=?", [id]);
        reply.status(200).send({ message: "Recension raderad!", reviewsData});
    } catch (err) {
        reply.status(500).send(err);
    }
};