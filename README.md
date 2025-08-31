# 🚛 LiqRota - Calculadora de Frete

<div align="center">
  <img src="https://img.shields.io/badge/Vue.js-2.x-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white" alt="Vue.js">
  <img src="https://img.shields.io/badge/Capacitor-3EC1D3?style=for-the-badge&logo=capacitor&logoColor=white" alt="Capacitor">
  <img src="https://img.shields.io/badge/Vuex-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white" alt="Vuex">
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios">
</div>

<div align="center">
  <h3>🎯 Aplicação moderna para cálculo e gestão de fretes com design inspirado no Railway</h3>
  <p>Interface elegante, responsiva e otimizada para dispositivos móveis</p>
</div>

---

## ✨ Funcionalidades

### 🔐 **Autenticação Segura**
- Login e cadastro com JWT
- Validação de formulários em tempo real
- Modais informativos elegantes
- Interceptors automáticos para renovação de token

### 🚚 **Gestão de Viagens**
- **Criação Individual**: Formulário completo para viagens únicas
- **Criação em Lote**: Múltiplas viagens simultaneamente
- **Edição Avançada**: Atualização de dados existentes
- **Exclusão Segura**: Confirmação via modal
- **Filtros Inteligentes**: Por origem, destino e status

### 🧮 **Simulações de Frete**
- Cálculo automático de custos
- Simulação individual e em lote
- Métricas detalhadas:
  - Distância considerada
  - Custo de combustível
  - Gastos adicionais
  - Valor líquido
  - Ganho por quilômetro

### 📊 **Relatórios Completos**
- **Por Intervalo**: Período personalizado
- **Mensal**: Análise por mês/ano
- **Anual**: Comparativo entre anos
- Exportação de dados
- Visualização responsiva

### 🎨 **Design Moderno**
- Tema escuro inspirado no Railway
- Interface minimalista e profissional
- Acordeões para economia de espaço
- Animações suaves e micro-interações
- Totalmente responsivo (mobile-first)

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **Vue.js** | 2.x | Framework progressivo para interfaces |
| **Vuex** | 3.x | Gerenciamento de estado centralizado |
| **Vue Router** | 3.x | Roteamento SPA com history mode |
| **Axios** | Latest | Cliente HTTP com interceptors |
| **Capacitor** | 3.x | Empacotamento para iOS/Android |
| **CSS3** | - | Estilização moderna com flexbox/grid |

---

## 🚀 Instalação e Configuração

### **Pré-requisitos**
- Node.js 14+ 
- npm ou yarn
- API Backend rodando

### **1. Clone o Repositório**
\`\`\`bash
git clone https://github.com/seu-usuario/liqrota-frontend.git
cd liqrota-frontend
\`\`\`

### **2. Instale as Dependências**
\`\`\`bash
npm install
\`\`\`

### **3. Configure as Variáveis de Ambiente**
Crie um arquivo `.env` na raiz do projeto:
\`\`\`env
VUE_APP_API_BASE_URL=http://localhost:8080
\`\`\`

### **4. Execute o Projeto**
\`\`\`bash
# Desenvolvimento
npm run serve

# Build para produção
npm run build

# Linting
npm run lint
\`\`\`

### **5. Configuração Mobile (Opcional)**
\`\`\`bash
# Adicionar plataformas
npx cap add android
npx cap add ios

# Build e sincronização
npm run build
npx cap sync

# Abrir no Android Studio
npm run android

# Abrir no Xcode
npm run ios
\`\`\`

---

## 📱 Como Usar

### **1. Autenticação**
1. Acesse a tela de login
2. Cadastre-se se não tiver conta
3. Faça login com suas credenciais

### **2. Gerenciar Viagens**
1. Navegue para "Minhas Viagens"
2. Clique em "Nova Viagem"
3. Escolha entre modo Individual ou Lote
4. Preencha os dados necessários
5. Simule o frete antes de salvar

### **3. Visualizar Relatórios**
1. Acesse a aba "Relatórios"
2. Escolha o tipo de relatório
3. Configure o período desejado
4. Visualize as métricas detalhadas

---

## 📁 Estrutura do Projeto

\`\`\`
src/
├── components/          # Componentes reutilizáveis
│   ├── FloatingModal.vue    # Sistema de modais
│   ├── ReportCard.vue       # Cards de relatório
│   ├── SimulationCard.vue   # Cards de simulação
│   └── TripFormFields.vue   # Campos do formulário
├── views/              # Páginas da aplicação
│   ├── Login.vue           # Tela de login
│   ├── Register.vue        # Tela de cadastro
│   ├── TripsList.vue       # Lista de viagens
│   ├── TripForm.vue        # Formulário de viagens
│   └── Reports.vue         # Tela de relatórios
├── store/              # Gerenciamento de estado
│   ├── index.js            # Store principal
│   └── modules/
│       └── auth.js         # Módulo de autenticação
├── router/             # Configuração de rotas
├── plugins/            # Plugins e configurações
│   └── axios.js            # Configuração HTTP
└── utils/              # Utilitários
    └── formatters.js       # Formatação de dados
\`\`\`

---

## 🔌 Integração com API

### **Endpoints Utilizados**

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `POST` | `/auth/login` | Autenticação de usuário |
| `POST` | `/usuarios` | Cadastro de usuário |
| `GET` | `/api/v1/trips` | Listar viagens |
| `POST` | `/api/v1/trips` | Criar viagem |
| `POST` | `/api/v1/trips/lote` | Criar viagem em lote |
| `PUT` | `/api/v1/trips/:id` | Atualizar viagem |
| `DELETE` | `/api/v1/trips/:id` | Excluir viagem |
| `POST` | `/api/v1/calculos/frete` | Simular frete individual |
| `POST` | `/api/v1/calculos/frete/lote` | Simular frete em lote |
| `GET` | `/api/v1/relatorios/*` | Relatórios diversos |

### **Autenticação**
- JWT Bearer Token
- Renovação automática via interceptors
- Redirecionamento automático para login

---

## 🎨 Design System

### **Cores Principais**
- **Background**: `#0a0a0a` (Preto profundo)
- **Cards**: `#1a1a1a` (Cinza escuro)
- **Bordas**: `#2a2a2a` (Cinza médio)
- **Accent**: `#8b5cf6` → `#a855f7` (Gradiente roxo)
- **Texto**: `#ffffff` / `#e5e7eb` (Branco/Cinza claro)

### **Tipografia**
- **Fonte**: Inter, -apple-system, BlinkMacSystemFont
- **Pesos**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### **Componentes**
- Inputs com fundo escuro e bordas sutis
- Botões com gradientes e hover effects
- Modais flutuantes com animações
- Acordeões para economia de espaço

---

## 📱 Responsividade

- **Mobile First**: Design otimizado para dispositivos móveis
- **Breakpoints**: 480px, 768px, 1024px
- **Flexbox/Grid**: Layout moderno e flexível
- **Touch Friendly**: Elementos com tamanho adequado para toque

---

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<div align="center">
  <p>⭐ Se este projeto te ajudou, considere dar uma estrela!</p>
  <p>🚛 <strong>LiqRota</strong> - Transformando a gestão de fretes</p>
</div>
