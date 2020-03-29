# Be the Hero
This app intends to allow NGOs to create an account and register incidents in order to rise money to solve them.

## Backend
The back-end was developed in **Node.js** with the following tools:
 - Express.js
 - Knex
 - Sqlite

#### Run
Install dependencies:
```
npm install
```
run:
```
npm start
```
The API will listen on http://localhost:3001

#### API Endpoints

| URL             |       Method       | Description                    |Payload                    | Headers                   |                    
| ----------------| -------------------| ------------------------------ | --------------------------|---------------------------|
| `/login`        | `POST`             | Allows an NGO to log in        |`{ id: string }`           |                           |
| `/profile`      | `GET`              | Gets an especific NGO          |                           |`{ Authorization: ngo_id }`|
| `/ngos`         | `GET`              | Lists NGOs                     |                           |                           |
| `/ngos`         | `POST`             | Creates NGO                    |`{ name: String, email: string, whatsapp: string, city: string, uf: string }`| |
| `/incidents`    | `GET`              | Lists incidents                |                           |                           |
| `/incidents`    | `POST`             | Creates an incident            |`{ title: String, description: string, value: number }`|`{ Authorization: ngo_id }`|
| `/incidents`    | `DELETE`           | Deletes an incident            |                           |`{ Authorization: ngo_id }`|


## Frontend
The front-end was developed using **React** with the following tools:
 - Axios
 - react-router-dom
 - react-icons

## Mobile
The mobile app was developed using **React Native** with the following tools:
 - Expo
 - Axios
 - Intl