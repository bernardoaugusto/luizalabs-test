# Desafio Técnico - LuizaLabs/Magalu

Esta documentação descreve a estrutura da API de produtos para desafios técnicos.

## Produtos

Os endpoints de listagem e detalhe possuem produtos com a mesma estrutura, sendo que esta é composta por:

- `price`: preço do produto
- `image`: URL da imagem do produto
- `brand`: marca do produto
- `id`: id do produto
- `title`: nome do produto
- `reviewScore`: média dos reviews para este produto

### Listagem

`<PAGINA>` representa o número da página requisitada, iniciando em `1`.

URL: `http://challenge-api.luizalabs.com/api/product/?page=<PAGINA>`

### Detalhe

`<ID>` representa o `id` do produto, a ser coletado no endpoint de listagem.

URL: `http://challenge-api.luizalabs.com/api/product/<ID>/`
