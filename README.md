# SanitAlly, egészségügyi eseményfoglalási rendszer

## A projekt áttekintése

Az eseményfoglalási rendszer lehetőséget biztosít egészségügy szolgáltatásokra történő időpont foglalásra.

## A projekt rövid leírása

Látogató megtekintheti a létesítmény szolgáltatóinak bemutatkozását, szolgáltatásának rövid leírását, esetleg javaslatát az időpont foglalására. Regisztrációt követően, időpontot foglalhat választott szolgáltatójánál.

## Szerepkörök

### Nem regisztrált felhasználó:

- Megtekinteheti valamennyi egészségügyi szolgáltató bemutatkozását, szolgáltatásának rövid leírását.

### Regisztrált felhasználó:

- időpontot foglalhat egy kiválasztott egészségügyi szolgáltatónál,
- Aktív foglalásait megtekintheti, szerkesztheti,
- egészségügyi profil szerkesztése

### Regisztrált szolgáltató:

- megtekintheti a szolgáltatására foglalt események részleteit,
- Események szerkesztése,
- szolgálatói profil szerkesztése

### Adminisztrátor:

- Új szolgálatót rögzíthet a rendszerben,
- regisztrált felhasználó jogosultságát módosíthatja

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
