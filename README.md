# Asksuite mrcrawler (challenge)

### Setup 
```sh
$ git clone https://github.com/thaioliva/asksuite-mrcrawler 
$ npm install
$ cp .env.example .env
```

### Config
Arquivo .env esta pré configurado
- PORT=3000
- URL_DEFAULT="https://myreservations.omnibees.com"
- URL_SEARCH

### Start server
Em modo dev:
```sh
$ npm run dev
```
Em modo prod:
```sh
$ npm start
```

API

**Show User**
----
  Retorna json dos tipos de quarto disponiveis.

* **URL**

  /buscar 

* **Method:**

  `POST`
  
* **Data Params**

  `{
    "checkin": "DDMMYYYY",
    "checkout": "DDMMYYYY"
  }`

DD: dia
MM:mês
YYYY: ano

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
        "data": [
          {
            "title": "Exemplo",
            "images": [
              "image01.jpg",
              "image02.jpg",
              "image03.jpg"
            ],
            "price": 000.0,
            "priceDescription": "A partir de R$ 000,00 Por Noite",
            "description": "Descrição"
          },
        ],
        "length": x,
        "errors": null
      }`
 
* **Error Response:**

  * **Code:** 500 NOT FOUND 
    **Content:** `{
            "data": [
            ],
            "length": x,
            "errors": ["erros"]
          }`
