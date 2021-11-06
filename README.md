# Desafio Técnico - LuizaLabs/Magalu

Esta documentação descreve a estrutura da API de clientes e lista de produtos favoritos.

# Cliente
### Estrutura:

- `id`: id do cliente
- `name`: nome do cliente
- `email`: email do cliente
- `password`: senha do cliente

## Rotas

### Criar um cliente

- Método: `POST`
- URL: `http://localhost:3000/api/customers`
- Request:
```
{
    "name": "Test",
    "email": "test@test.com",
    "password": "123456",
    "confirmPassword": "123456"
}
```
- Response:
```
{
    "id": "57658c86-f291-4dce-a617-cab044f493c8",
    "name": "Test",
    "email": "test@test.com",
}
```

### Autenticação
- Método: `POST`
- URL: `http://localhost:3000/api/sessions`
- Request:
```
{
    "email": "test@test.com",
    "password": "123456"
}
```
- Response:
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

### Edição
- Método: `POST`
- URL: `http://localhost:3000/api/sessions`
- Autorização: `Bearer Token`
- Request:
```
{
    "name": "Update Name",
    "email": "update@test.com"
}
```
- Response:
```
{
    "id": "57658c86-f291-4dce-a617-cab044f493c8",
    "name": "Update Name",
    "email": "update@test.com"
}
```
