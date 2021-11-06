# Desafio Técnico - LuizaLabs/Magalu

Esta documentação descreve a estrutura da API de clientes e lista de produtos favoritos.

## Scrips
- Instalar dependências: `npm install`
- Testes: `npm run test`
- Rodar o projeto: `docker-compose up`

# Cliente
### Estrutura:

- `id`: id do cliente
- `name`: nome do cliente
- `email`: email do cliente
- `password`: senha do cliente

## Rotas

### Criar um cliente

#### Request:
- Método: `POST`
- URL: `http://localhost:3000/api/customers`
- Body:
```
{
    "name": "Test",
    "email": "test@test.com",
    "password": "123456",
    "confirmPassword": "123456"
}
```
#### Response:
- Status: 201
- Body:
```
{
    "id": "57658c86-f291-4dce-a617-cab044f493c8",
    "name": "Test",
    "email": "test@test.com",
}
```

### Autenticação
#### Request:
- Método: `POST`
- URL: `http://localhost:3000/api/sessions`
- Body:
```
{
    "email": "test@test.com",
    "password": "123456"
}
```
#### Response:
- Status: 201
- Body:
```
{
    "user": {
        "id": "57658c86-f291-4dce-a617-cab044f493c8",
        "name": "Test",
        "email": "test@test.com"
    },
    "token": "bearerToken"
}
```
### Detalhes

#### Request:
- Método: `GET`
- URL: `http://localhost:3000/api/customers`
- Autorização: `Bearer Token`
#### Response:
- Status: 200
- Body:
```
{
    "id": "57658c86-f291-4dce-a617-cab044f493c8",
    "name": "Test",
    "email": "test@test.com"
}
```
### Edição
#### Request:
- Método: `PUT`
- URL: `http://localhost:3000/api/customers`
- Autorização: `Bearer Token`
- Body:
```
{
    "name": "Update Name",
    "email": "update@test.com"
}
```
#### Response:
- Status: 200
- Body:
```
{
    "id": "57658c86-f291-4dce-a617-cab044f493c8",
    "name": "Update Name",
    "email": "update@test.com"
}
```
### Deleção
#### Request:
- Método: `DELETE`
- URL: `http://localhost:3000/api/customers`
- Autorização: `Bearer Token`
#### Response:
- Status: 204

# Lista de Favoritos
### Estrutura:

- `id`: id da relação entre cliente e produto
- `customerId`: id do cliente
- `productId`: id do produto

## Rotas

### Adicionar um produto da lista de favoritos

#### Request:
- Método: `PATCH`
- URL: `http://localhost:3000/api/favoriteProducts/create/<productId>`
- Autorização: `Bearer Token`
#### Response:
- Status: 201
- Body:
```
{
    "customerId": "88aa2bf6-c9a8-474c-9296-ae015e7a0ce1",
    "productId": "6c097dc3-0c93-65fe-d88b-3b53acbf1fd7",
    "id": "273144c2-cf2b-4de6-b528-36647318ffcd"
}
```
### Remover um produto da lista de favoritos

#### Request:
- Método: `PATCH`
- URL: `http://localhost:3000/api/favoriteProducts/remove/<productId>`
- Autorização: `Bearer Token`
#### Response:
- Status: 204

### Listar produtos favoritos

#### Request:
- Método: `GET`
- URL: `http://localhost:3000/api/favoriteProducts`
- Autorização: `Bearer Token`
#### Response:
- Status: 200
- Body:
```
[
    {
        "price": 499.99,
        "image": "http://challenge-api.luizalabs.com/images/6c097dc3-0c93-65fe-d88b-3b53acbf1fd7.jpg",
        "brand": "lego",
        "id": "6c097dc3-0c93-65fe-d88b-3b53acbf1fd7",
        "title": "LEGO Ninjago Ninja DBX"
    }
]
```
