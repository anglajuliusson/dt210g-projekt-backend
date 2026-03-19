# Backend-API – Användare och bokrecensioner (CRUD + JWT)

Detta projekt är ett backend-API för en webbsida där besökare kan se bokrecensioner samt hantera sina egna recensioner om man är inloggad. 
API:et används av en frontend för att hämta och hantera recensioner. Alla besökare kan läsa recensioner, men endast inloggade användare kan skapa, uppdatera och ta bort sina recensioner.

## Funktionalitet

- CRUD för blogginlägg
  - **GET**: hämta alla recensioner / hämta en recension via id
  - **POST**: skapa ny recension (skyddad endpoint)
  - **PUT**: uppdatera recension (skyddad endpoint)
  - **DELETE**: ta bort recension (skyddad endpoint)
  - Autentisering med **JWT**
  - **Login-endpoint** som returnerar JWT-token
  - Validering av token för skyddade endpoints

---

## Teknikstack

- **Node.js**
- **Fastify**
- **MySQL**
- **JWT (jsonwebtoken)**
- **bcrypt** (hashning av lösenord)

---

## Installation
Installera beroenden:
```bash
npm install
```
Starta servern: 
```bash
npm run start
```

Servern körs på:
```
http://localhost:3000
```

## Databas

Skapa databas och tabeller:
```sql
CREATE DATABASE IF NOT EXISTS book_reviews;
USE book_reviews;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    book_id VARCHAR(100) NOT NULL,
    book_title VARCHAR(255) NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    review_text TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE (user_id, book_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

## Autentisering
Logga in:

POST /login

Request body:
```json
{
  "username": "anglajuliusson",
  "password": "password"
}
```

Svar:
```json
{
  "token": "JWT_TOKEN"
}
```


Token skickas sedan i skyddade anrop via header:
Authorization: Bearer <token>

## Endpoints
### Publika endpoints

GET /reviews
Hämtar alla recensioner

GET /reviews/:id
Hämtar en enskild recension

GET /users
Hämtar alla användare

GET /users/:id
Hämtar en enskild användare

POST /users
Skapar en ny användare

### Skyddade endpoints (kräver JWT)

POST /reviews
Skapar ny recension

PUT /reviews/:id
Uppdaterar befintlig recension

DELETE /reviews/:id
Tar bort recension

GET /reviews/my-reviews
Hämtar alla recensioner kopplat till inloggad användaren user_id

PUT /reviews/my-reviews/:id
Uppdaterar inloggad användares befintliga recension

DELETE /reviews/my-reviews/:id
Raderar inloggad användare befintliga recension
