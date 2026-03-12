import { excuteQuery } from '../config/db.js' // Importera hjälpfunktionen för att köra SQL-frågor mot MySQL
import bcrypt from "bcrypt"; // Importera bcrypt för hashade lösenord

// Funktion som hämtar alla användare från databasen
export const getAllUsers = async(req, reply) => {
    try {
        // Anropar excuteQuery för att skicka SQL till databasen
        // Resultatet returneras som ett Promise och hanteras med await
        let usersData = await excuteQuery("select * from users", []);
        reply.status(200).send(usersData);
    } catch (err) {
        reply.status(500).send(err);
    }
};

// Funktion som hämtar en specifik användare baserat på ID
export const getUserById = async(req, reply) => {
    let id = req.params.id;
    try {
        let usersData = await excuteQuery("select * from users where id=?", [id]);
        reply.status(200).send(usersData);
    } catch (err) {
        reply.status(500).send(err);
    }
};

// Funktion som lägger till ny användare
export const addUser = async(req, reply) => {
    try {
        const { username, password } = req.body;

        // Hashat lösenord
        const hashedPassword = await bcrypt.hash(password, 10);

        // Kontrollera att username är en icke-tom sträng
        if (!username || typeof username !== 'string' || username.trim() === '') {
            return reply.status(400).send({ error: "Användarnamn måste fyllas i korrekt." });
        }

        // Kontrollera att password är en icke-tom sträng
        if (!password || typeof password !== 'string' || password.trim() === '') {
            return reply.status(400).send({ error: "Password måste fyllas i korrekt." });
        }        

        // SQL-fråga för att lägga till användare
        let usersData = await excuteQuery("insert into users(username, password) values(?, ?)",
            [
                username,
                hashedPassword
            ]
        );
        reply.status(201).send({ message: "Användare skapad!", usersData});
    } catch (err) {
        reply.status(400).send(err);
    }
};

// Funktion som uppdaterar en specifik användare baserad på ID
export const updateUser = async(req, reply) => {
    let id = req.params.id;
    try {
        const { username, password } = req.body;

        // Hasha nytt lösenord
        const hashedPassword = await bcrypt.hash(password, 10);

        // Kontrollera att username är en icke-tom sträng
        if (!username || typeof username !== 'string' || username.trim() === '') {
            return reply.status(400).send({ error: "Användarnamn måste fyllas i korrekt." });
        }

        // Kontrollera att password är en icke-tom sträng
        if (!password || typeof password !== 'string' || password.trim() === '') {
            return reply.status(400).send({ error: "Password måste fyllas i korrekt." });
        }  

        // SQL-fråga för att uppdatera recension
        let usersData = await excuteQuery(`update users set username=?, password=? where id=?`,[id]
            [ 
                username,
                hashedPassword
            ]
        );
        reply.status(200).send({ message: "Användare uppdaterad!", usersData});
    } catch (err) {
        reply.status(400).send(err);
    }
};

// Funktion som raderar en specifik användare baserat på ID
export const deleteUserById = async(req, reply) => {
    let id = req.params.id;
    try {
        let usersData = await excuteQuery("delete from users where id=?", [id]);
        reply.status(200).send({ message: "Användare raderad!", usersData});
    } catch (err) {
        reply.status(500).send(err);
    }
};