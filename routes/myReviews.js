import { excuteQuery } from "../config/db.js";

// Hämta inloggad användares recensioner
export const getMyReviews = async (req, reply) => {
    const userId = req.user.id;

    try {
        const reviewsData = await excuteQuery(
            "SELECT * FROM reviews WHERE user_id = ? ORDER BY created_at DESC",
            [userId]
        );

        reply.status(200).send(reviewsData);
    } catch (err) {
        reply.status(500).send({ error: "Kunde inte hämta recensioner." });
    }
};

// Uppdatera inloggad användares recension
export const updateMyReview = async (req, reply) => {
    const userId = req.user.id;
    const id = req.params.id;
    const { rating, review_text } = req.body;

    try {
        if (typeof rating !== "number" || rating < 1 || rating > 5) {
            return reply.status(400).send({ error: "Betyg måste vara mellan 1 och 5." });
        }

        if (!review_text || review_text.trim() === "") {
            return reply.status(400).send({ error: "Recensionen får inte vara tom." });
        }

        const reviewsData = await excuteQuery(
            "UPDATE reviews SET rating = ?, review_text = ? WHERE id = ? AND user_id = ?",
            [rating, review_text, id, userId]
        );

        if (reviewsData.affectedRows === 0) {
            return reply.status(404).send({ error: "Recensionen hittades inte." });
        }

        reply.status(200).send({ message: "Recension uppdaterad!" });
    } catch (err) {
        reply.status(500).send({ error: "Kunde inte uppdatera recensionen." });
    }
};

// Radera inloggad användares recension
export const deleteMyReview = async (req, reply) => {
    const userId = req.user.id;
    const id = req.params.id;

    try {
        const reviewsData = await excuteQuery(
            "DELETE FROM reviews WHERE id = ? AND user_id = ?",
            [id, userId]
        );

        if (reviewsData.affectedRows === 0) {
            return reply.status(404).send({ error: "Recensionen hittades inte." });
        }

        reply.status(200).send({ message: "Recension raderad!" });
    } catch (err) {
        reply.status(500).send({ error: "Kunde inte radera recensionen." });
    }
};