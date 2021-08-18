# SanitAlly, egészségügyi eseményfoglalási rendszer

## A projekt áttekintése

Az eseményfoglalási rendszer lehetőséget biztosít egészségügy szolgáltatásokra történő időpont foglalásra.

## A projekt rövid leírása

Látogató megtekintheti a létesítmény szolgáltatóinak bemutatkozását, szolgáltatásának rövid leírását, esetleg javaslatát az időpont foglalására. Regisztrációt követően, időpontot foglalhat választott szolgáltatójánál.

## Szerepkörök

### Nem regisztrált felhasználó:

- Tájékozódhat az intézmény főbb szolgáltatásairól,
- Alapadatok megadásával (Vezetéknév, Keresztnév, e-mail cím, jelszó) regisztálhat az oldalra

### Regisztrált felhasználó:

- időpontot foglalhat egy kiválasztott egészségügyi szolgáltatónál,
- Aktív foglalásait megtekintheti,
- Számára felírt recepteket listázhatja

### Regisztrált szolgáltató (provider):

- megtekintheti a szolgáltatására foglalt események részleteit,
- recepteket rögzíthet pácienseinek, akik regisztrált felhasználó (user) jogkörrel rendelkeznek,

### Adminisztrátor:

- regisztrált felhasználó jogosultságát módosíthatja
- rögzíthet és szerkesztheti az egészségügyi szolgáltatásokat
- főoldali 'kategóriák' leírásait módosíthatja

## Főbb funkciók:

- Regisztráció: Vezetéknév, keresztnév, e-mail, és jelszó megadásával,
- Login e-mail és jelszó párossal,
- Szolgáltató- és szolgálatás leírások megtekintése, szerkesztése,
- Események létrehozása, szerkesztése,
- Események listázása

## Technikai követelmények:

#### Backend:

- Docker
- Express.js
- JSON Web Token
- MongoDB
- Node.js

#### Frontend

- React

## Telepítési útmutató

Az alkalmazás gyökérkönyvtárában az alkalmazás `docker compose up` terminál-parancs megadásával indítható.

## Az alkalmazás megjeleníthető oldalai

| Frontend URL        | Oldal leírása                      |
| ------------------- | ---------------------------------- |
| /                   | Főoldal, (landing page)            |
| /register           | Regisztráció                       |
| /login              | Bejelentkezés az applikációba      |
| /admin              | Adminisztráció menü                |
| /admin/users/:id    | Felhasználó adatainak szerkesztése |
| /admin/services     | Szolgálatások                      |
| /admin/services/:id | Szolgálatás szerkesztése           |
| /admin/services/new | Új szolgáltatás rögzítése          |
| /events             | Rögzített események                |
| /events/new         | Új esemény rögzítése               |
| /prescriptions      | Rögzített receptek                 |
| /prescriptions/new  | Új recept rögzítése                |

## API végpontok

| Végpont                                 | Leírása                                   |
| --------------------------------------- | ----------------------------------------- |
| POST:/api/login                         | Felhasználó bejelentkezése                |
| POST:/api/register                      | Felhasználói regisztráció                 |
| GET:/api/events                         | Események lekérése                        |
| GET:/api/events/:useremail              | Felhasználóhoz tartozó események lekérése |
| GET:/api/provider/events/:provideremail | Szolgáltatóhoz tartozó események lekérése |
| POST:/api/events/new                    | Új esemény létrehozása                    |
| GET:/api/admin/users                    | Felhaszálók lekérése                      |
| PUT:/api/admin/users                    | Felhasználó adatainak frissítése          |
| GET:/api/admin/users/:id                | Felhasználó lekérése ID alapján           |
| DELETE:/api/admin/users/:id             | Felhasználó törlése ID alapján            |
| GET:/api/services                       | Szolgáltatások lekérése                   |
| GET:/api/admin/services/:id             | Szolgáltatás lekérése ID alapján          |
| PUT:/api/admin/services/:id             | Szolgáltatás frissítése ID alapján        |
| DELETE:/api/admin/services/:id          | Szolgáltatás törlése ID alapján           |
| POST:/api/admin/services/new            | Új szolgáltatás rögzítése                 |
| GET:/api/categories                     | Kategóriák lekérése                       |
| POST:/api/categories/init               | Kategóriák inicializálása                 |
| PUT:/api/admin/categories               | Kategóriák frissítése                     |
| GET:/api/prescriptions/:email           | Receptek lekérése e-mail alapján          |
| POST:/api/provider/prescriptions/new    | Új recept létrehozása                     |

## Adatbázis kollekciók

| Kollekció neve | Leírása                            |
| -------------- | ---------------------------------- |
| User           | Az oldal regisztrált felhasználói  |
| Category       | Főoldalon megjelenített kategóriák |
| Event          | Rögzített események                |
| Prescription   | Rögzített receptek                 |
| Service        | Szolgáltatások                     |
