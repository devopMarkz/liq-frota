# 🚛 LiqRota — Calculadora de Frete (Front-end)

<div align="center">
  <img src="https://img.shields.io/badge/Vue.js-2.x-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white" alt="Vue.js">
  <img src="https://img.shields.io/badge/Capacitor-3.x-3EC1D3?style=for-the-badge&logo=capacitor&logoColor=white" alt="Capacitor">
  <img src="https://img.shields.io/badge/Vuex-3.x-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white" alt="Vuex">
  <img src="https://img.shields.io/badge/Axios-latest-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios">
</div>

<div align="center">
  <h3>🎯 App mobile‑first para cálculo e gestão de fretes</h3>
  <p>Interface responsiva, focada no uso em celulares. Pronto para Android/iOS via Capacitor.</p>
</div>

---

## ✨ Funcionalidades

### 🔐 Autenticação (JWT)
- Login com **JWT Bearer**.
- Interceptor **anexa o token** e, em **401**, redireciona para o login.
- *(Opcional)* tela de cadastro usando `POST /usuarios` (público).

### 🚚 Gestão de Viagens
- **Criar individualmente** ou **em lote** (lista de viagens).
- **Editar** e **excluir** viagens salvas.
- **Filtros** por **origem** e **destino**.
- **Listagem paginada** (Spring Page).

### 🧮 Simulações de Frete (sem persistir)
- Simulação **individual** (`/calculos/frete`) e **em lote** (`/calculos/frete/lote`).
- Exibição de métricas:
  - Distância considerada (ida/volta)
  - Custo de combustível
  - Gastos adicionais
  - Valor do frete
  - Valor **líquido**
  - **Ganho por km**
- **Recalcular viagem salva** sem alterar o banco: `POST /trips/{id}/calcular`.

### 📊 Relatórios
- **Por intervalo** (início/fim).
- **Mensal** (por ano).
- **Anual** (faixa de anos).
- Cartões/tabelas responsivos para leitura rápida em mobile.

### 🎨 UI/UX (mobile-first)
- Inputs numéricos com `inputmode="decimal"` (teclado numérico).
- Formatação BRL com 2 casas; ganho/km com 2 casas.
- *(Opcional)* tema escuro/visual minimalista.

---

## 🧱 Tecnologias

| Tecnologia | Versão | Observações |
|---|---|---|
| **Vue.js** | 2.x | SPA |
| **Vue Router** | 3.x | Guards para rotas autenticadas |
| **Vuex** | 3.x *(opcional)* | Armazenar auth/token |
| **Axios** | latest | Interceptors (token/erros) |
| **Capacitor** | 3.x | Android/iOS (APK/App) |
| **CSS3** | — | Flexbox/Grid, mobile-first |

---

## ⚙️ Instalação & Configuração

### Pré‑requisitos
- **Node.js 16+**
- **npm** ou **yarn**
- **Backend** rodando (veja base URL abaixo)

### 1) Clonar
```bash
git clone https://github.com/seu-usuario/liqrota-frontend.git
cd liqrota-frontend
```

### 2) Instalar deps
```bash
npm install
```

### 3) Variáveis de ambiente
Crie um `.env` na raiz:
```env
VUE_APP_API_BASE_URL=http://localhost:8080
```

### 4) Rodar
```bash
# Dev
npm run serve

# Build (web)
npm run build

# Lint
npm run lint
```

### 5) Empacotar Mobile (Capacitor) — opcional
```bash
# adicionar plataformas (uma vez)
npx cap add android
npx cap add ios

# build + sync
npm run build
npx cap sync

# abrir IDEs
npx cap open android   # Android Studio
npx cap open ios       # Xcode
```

> Se preferir **Cordova**, adapte com `config.xml` e scripts equivalentes.

---

## 🔌 Integração com a API

**Base**: `${VUE_APP_API_BASE_URL}`  
**Padrão de erro** (sempre tratar):  
```json
{ "timestamp": "...", "status": 400, "path": "/endpoint", "erros": ["mensagem"] }
```

### Autenticação
| Método | Endpoint | Body | Observações |
|---|---|---|---|
| `POST` | `/auth/login` | `{ "username": "...", "senha": "..." }` | Guarda `access_token`, `role`, `expires_in` |
| `POST` | `/usuarios` | `{ "username": "...", "senha": "..." }` | Público; 201 sem corpo |

> Nas rotas autenticadas enviar `Authorization: Bearer <token>` e `Content-Type: application/json`.

### Viagens & Simulações
| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/api/v1/trips?origem=&destino=&page=0&size=10` | Lista paginada (page inicia em 0) |
| `GET` | `/api/v1/trips/{id}` | Detalhe |
| `POST` | `/api/v1/trips` | Criar viagem (individual) |
| `POST` | `/api/v1/trips/lote` | Criar em lote |
| `PUT` | `/api/v1/trips/{id}` | Atualizar |
| `DELETE` | `/api/v1/trips/{id}` | Remover |
| `POST` | `/api/v1/trips/{id}/calcular` | **Recalcular (prévia)** sem persistir |
| `POST` | `/api/v1/calculos/frete` | **Simulação** individual |
| `POST` | `/api/v1/calculos/frete/lote` | **Simulação** em lote (retorna itens + **totais**) |

### Relatórios
| Método | Endpoint | Exemplo |
|---|---|---|
| `GET` | `/api/v1/relatorios/intervalo?inicio=YYYY-MM-DD&fim=YYYY-MM-DD` | `/intervalo?inicio=2025-08-01&fim=2025-08-31` |
| `GET` | `/api/v1/relatorios/mensal?ano=YYYY` | `/mensal?ano=2025` |
| `GET` | `/api/v1/relatorios/anual?de=YYYY&ate=YYYY` | `/anual?de=2024&ate=2025` |

### Interceptor Axios (exemplo)
```js
// src/api/http.js
import axios from 'axios';

const api = axios.create({ baseURL: process.env.VUE_APP_API_BASE_URL });

api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

api.interceptors.response.use(
  res => res,
  err => {
    const status = err?.response?.status;
    const msgs = err?.response?.data?.erros || ['Erro inesperado'];
    if (status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    // exiba msgs em um toast/alert global, se existir
    return Promise.reject(err);
  }
);

export default api;
```

---

## 📁 Estrutura sugerida
```
src/
├─ api/                 # axios instance/clients
├─ router/              # rotas e guards
├─ store/               # (opcional) Vuex p/ auth
├─ views/               # Login.vue, TripsList.vue, TripForm.vue, Reports.vue
├─ components/          # LotItemForm.vue, TotalsBlock.vue, TripItemCard.vue
└─ utils/               # formatadores (moeda, número, data)
```

---

## 📱 Dicas de uso
- **Tela única** de frete: alternar **Individual/Lote**.
- Dois botões grandes: **Simular** (não persiste) e **Persistir** (salva).
- Na simulação **em lote**, exibir o bloco de **Totais**.
- Campos numéricos enviam **ponto** como separador decimal (ex.: `5.99`).

---

## 🤝 Contribuição
1. Faça um fork
2. Crie uma branch: `git checkout -b feature/minha-feature`
3. Commit: `git commit -m "feat: minha-feature"`
4. Push: `git push origin feature/minha-feature`
5. Abra um PR

---

## 📄 Licença
Este projeto está sob a licença **MIT**. Veja [LICENSE](LICENSE) para detalhes.

<div align="center">
  <br/>
  <strong>LiqRota</strong> — tecnologia simples para resolver problemas reais. 🚛
</div>
