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

Az alkalmazás gyökérkönyvtárában az alkalmazás `docker compose up` terminál-parancs megadásával indítható:
 

 
