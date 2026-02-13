# Router

All routes are defined in `index.ts`. Lazy-loaded except HomeView.

## Routes

| Path | Name | View | Lazy |
|------|------|------|------|
| `/` | home | HomeView | No |
| `/quem-somos` | quem-somos | QuemSomosView | Yes |
| `/servicos` | servicos | ServicosView | Yes |
| `/servicos/dog-spa` | dog-spa | DogSpaView | Yes |
| `/servicos/hospedagem` | hospedagem | HospedagemView | Yes |
| `/servicos/dog-taxi` | dog-taxi | DogTaxiView | Yes |
| `/servicos/pagamento` | pagamento | PagamentoView | Yes |
| `/contato` | contato | ContatoView | Yes |
| `/entrar` | entrar | EntrarView | Yes |
| `/cadastro` | cadastro | CadastroView | Yes |

## Behavior

- `scrollBehavior` always returns `{ top: 0 }` (pages start at top)
- Uses `createWebHistory` (HTML5 history mode)
