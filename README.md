# SanitAlly, egészségügyi eseményfoglalási rendszer

## A projekt áttekintése, célja, rövid leírása

Az időpontfoglalási rendszer célja lehetőséget biztosítani a felhasznólknak egy egészségügyi intézményben különböző szakterületekre történő időpont foglalására, megkönnyítve ezzel az intézmény adminisztrációs terheit, mind a pácienseknek, mind az egyes szakterületek képviselőinek.

## Szerepkörök

### Nem regisztrált felhasználó:

- Tájékozódhat az intézmény főbb szolgáltatásairól,
- Alapadatok megadásával (Vezetéknév, Keresztnév, e-mail cím, jelszó) regisztrálhat az oldalra

### Regisztrált felhasználó (user):

- időpontot foglalhat egy kiválasztott egészségügyi szolgáltatónál, szakterület alapján
- Aktív foglalásait megtekintheti,
- Számára felírt recepteket listázhatja

### Regisztrált szolgáltató (provider):

- megtekintheti a szolgáltatására foglalt események részleteit,
- recepteket rögzíthet pácienseinek, akik regisztrált felhasználó (user) jogkörrel rendelkeznek,

### Adminisztrátor (admin):

- regisztrált felhasználó jogosultságát módosíthatja
- szolgáltató (provider) jogú felhasználónak szakterületet rendelhet hozzá
- rögzíthet és szerkesztheti az egészségügyi szakterületeket
- főoldali 'Főbb szolgáltatásaink' (Category collection) nevét,leírását módosíthatja

## Főbb funkciók:

- Regisztráció: Vezetéknév, keresztnév, e-mail, és jelszó megadásával,
- Login e-mail és jelszó párossal,
- Események létrehozása, szerkesztése,
- Események listázása
- Receptek megtekintése

## Technikai követelmények:

#### Backend:

- Docker
- Express.js
- JSON Web Token
- MongoDB
- Node.js

#### Frontend

- React

#### API dokumentáció

- Open API/Swagger

## Telepítési útmutató

1. Környezeti változók beállítása

- A frontend, valamint backend mappákban található `.env.example ` fájl alapján állítsa be a környezeti változókat!

2. Dockerizált alkalmazás indítása

- Az alkalmazás gyökérkönyvtárában az alkalmazás `docker compose up` terminál-parancs megadásával indítható.

3. Az alkalmazás indítása böngészőben

- Frontend url: `http://localhost:3000`
- Backend url: `http://localhost:5000`
- Dokumentáció url: `http://localhost:4000/api-docs`

Első indítás alkalmával a rendszer (frontend) ellenőrzi a főoldali szolgálatáslista meglétét. Amennyiben még nem létezik (Category kollekció), úgy automatikusan létrehozza azt.

A rendszer az első regisztrált felhasználó jogkörét automatikusan 'admin' jogkörre állítja be.

Minden, ezt követően regisztrált felhasználó automatikusan felhasználó (user) jogkört kap.

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
| Service        | Szolgáltatások (Szakterületek)     |

## Az alkalmazás használata

Regisztráció, majd az alkalmazásba való belépést követően a felhasználó a navigációs menü segítségével megtekintheti a már rögzített eseményeit, receptjeit. (`Események`,`Receptek`).

Amennyiben új időpontot szeretne foglalni egy egészségügyi szolgáltatása, az `Új időpontot foglalok ` gombra kattintva, az űrlap kitöltésével teheti meg.

`Szolgáltató` jogkörű felhasználó az `Események` menüpont alatt a szakterületére rögzített eseményeket listaszerűen láthatja.

- Minden szolgáltató csak a saját szolgáltatására rögzített eseményt látja.
- Minden felhasználó csak a maga által létrehozott eseményeket látja.
- `Admin` jogú felhasználó a rendszerben rögzített összes eseményt látja.

`Szolgáltató` jogkörű felhasználó az `Receptek` menüpont alatt receptet állíthat ki páciensének.
A páciens csak `felhasználó` jogkörű felhasználó (user) lehet. Recept felírásakor megadható a gyógyszer neve, javasolt adagolása.

A felírt receptet `felhasználó` saját fiókjában szintén a `Receptek` menü alatt, listázva megtekintheti.
