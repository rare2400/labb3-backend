# Lagersystem API med autentisering

Ett REST API byggt med Hapi.js och MongoDB för att hantera ett lager med produkter. Det hanterar även
autentisering med JWT och hashing av lösenord med bcrypt för säkerhet samt CRUD-funktionalitet 
(Create, Read, Update, Delete) för produkter och användare. 

**Länk till publicerat API:** [https://labb3-backend.onrender.com/api/products](https://labb3-backend.onrender.com/api/products)

## Verktyg
- Node.js
- Hapi.js
- TypeScript
- MongoDB/mongoose
- JWT (jsonwebtoken)
- bcrypt

## Installation
1. **Klona repot:**
```bash
git clone https://github.com/rare2400/labb3-backend.git
```

2. **Installera beroenden:**
```bash
npm install
```

3. **Installera nodemon för utveckling:**
```bash
npm install nodemon --save-dev
```

4. **Skapa `.env`-fil i rotmappen och fyll i databasuppgifter:**

| Variabel     | Beskrivning                     |
|--------------|---------------------------------|
| `PORT=`      | Porten servern lyssnar på       |
| `DATABASE=`  | Anslutningssträng till MongoDB  |
| `JWT_SECRET=`| Hemlig nyckel för JWT-signering |

5. **Starta server:**
```bash
npm run dev
```



## API-endpoints
### Autentisering
| Metod | Endpoint           | Skyddad | Beskrivning              |
|-------|--------------------|---------|--------------------------|
| POST  | /api/auth/register | Nej     | Registrera ny användare  |
| POST  | /api/auth/login    | Nej     | Logga in och få JWT-token|
| GET   | /api/auth/me       | Ja      | Hämta inloggad användare |

### Produkter
| Metod  | Endpoint          | Skyddad | Beskrivning          |
|--------|-------------------|---------|----------------------|
| GET    | /api/products     | Nej     | Hämtar alla produkter|
| PUT    | /api/products/:id | Nej     | Hämtar en produkt    |
| POST   | /api/products     | Ja      | Skapar en ny produkt |
| PUT    | /api/products/:id | Ja      | Uppdaterar en produkt|
| DELETE | /api/products/:id | Ja      | Tar bort en produkt  |

### Användare
| Metod  | Endpoint       | Skyddad | Beskrivning            |
|--------|----------------|---------|------------------------|
| GET    | /api/users     | Ja      | Hämta alla användare   |
| GET    | /api/users/:id | Ja      | Hämta en användare     |
| PUT    | /api/users/:id | Ja      | Uppdatera en användare |
| DELETE | /api/users/:id | Ja      | Ta bort användare      |

## Produkt-objekt
Exempel: GET `/api/products/:id`    
id = 69dcc13c970e143ab6bd5bc3
```json
{
  "id": 69dcc13c970e143ab6bd5bc3,
  "name": "Handtvål parfymfri",
  "price": 20,
  "quantity": 0,
  "category": "Hygien",
  "createdAt": "2026-04-13T10:11:08.146Z",
  "updatedAt": "2026-04-13T10:11:08.146Z",
}
```

## Testning
API:t kan testas med program som:
- Thunder Client (vsc extension)
- Postman
- Advanced REST Client

## Användning i frontend
API:t kan kopplas till ett simpelt formulär i en frontendapplikation som visar, lägger till, uppdaterar status och tar bort uppgifter.    
Repo till frontend-applikation: 
```bash
git clone https://github.com/rare2400/inventory-frontend.git
```

## Skapad av
Skapad som en del av en skoluppgift   
Mittuniversitetet, Webbutvecklingsprogrammet    
Ramona Reinholdz   
[rare2400@student.miun.se](rare2400@student.miun.se)      
2026-04-13
