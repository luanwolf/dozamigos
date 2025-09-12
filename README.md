# 🖥️ Terminal Web Interativo - Dozamigos

Um terminal web elegante com estética retrô hacker, perfeito para criar sua própria página de links personalizada com comandos interativos.

## ✨ Características

- 🎨 **Design Retrô**: Interface estilo terminal com efeitos de glow e scanlines
- 🖼️ **Banner ASCII Personalizado**: Banner "Dozamigos" centralizado
- 🔗 **Links Rápidos**: Acesso direto aos seus sites favoritos
- ⌨️ **Sistema de Comandos**: Comandos interativos fáceis de configurar
- 📚 **Histórico de Comandos**: Navegue pelo histórico com ↑/↓
- 🔍 **Auto-complete**: Use TAB para completar comandos
- 📱 **Responsivo**: Funciona perfeitamente em desktop e mobile

## 🛠️ Como Personalizar

### 📝 Arquivo Principal de Configuração

**`src/lib/terminal-config.ts`** - Este é o arquivo mais importante para personalizar:

```typescript
export const terminalConfig: TerminalConfig = {
  // 1. BANNER ASCII - Substitua pelo seu próprio banner
  banner: `
...
`,
  
  // 2. PROMPT DO TERMINAL
  prompt: "seunome@terminal:~$",
  
  // 3. MENSAGEM DE BOAS-VINDAS
  welcomeMessage: "Bem-vindo! Digite 'help' para ver os comandos.",
  
  // 4. LINKS RÁPIDOS - Adicione/edite seus links aqui
  links: {
    github: "https://github.com/seuusuario",
    portfolio: "https://seuportfolio.com",
    blog: "https://seublog.com",
    linkedin: "https://linkedin.com/in/seuusuario",
    twitter: "https://twitter.com/seuusuario"
  },

  // 5. COMANDOS PERSONALIZADOS - Adicione novos comandos aqui
  commands: [
    // Seus comandos customizados...
  ]
}
```

### 🎨 Personalização de Cores e Estilo

**`src/index.css`** - Para ajustar cores do terminal:
```css
:root {
  --terminal-bg: 10 10 10;           /* Cor de fundo */
  --terminal-green: 0 255 0;         /* Verde principal */
  --terminal-green-bright: 50 255 50; /* Verde claro */
  --terminal-yellow: 255 255 0;      /* Amarelo para destaques */
}
```

**`tailwind.config.ts`** - Configurações adicionais do Tailwind.

### 🔧 Adicionando Novos Comandos

No arquivo `src/lib/terminal-config.ts`, adicione comandos no array `commands`:

```typescript
{
  name: "projeto",
  description: "Mostra informações sobre meus projetos",
  aliases: ["proj", "p"],
  action: () => {
    return `Meus Projetos:
    
🚀 Projeto 1 - Descrição incrível
🎯 Projeto 2 - Outra descrição legal
💡 Projeto 3 - Mais um projeto incrível

Use 'open github' para ver o código!`;
  }
},
```

## 🚀 Como Usar Como Base

### 1. **Clone/Fork este projeto**
```bash
git clone <URL_DO_SEU_REPO>
cd <NOME_DO_PROJETO>
npm install
```

### 2. **Personalize o conteúdo**
- Edite `src/lib/terminal-config.ts` com seus dados
- Ajuste cores em `src/index.css` se desejar
- Modifique o título em `index.html`

### 3. **Teste localmente**
```bash
npm run dev
```

### 4. **Faça o deploy!**

## 📦 Deploy no Vercel

### Método 1: Interface Web (Mais Fácil)

1. **Acesse [vercel.com](https://vercel.com)** e faça login com GitHub
2. **Clique em "New Project"**
3. **Selecione seu repositório** da lista
4. **Configure o projeto:**
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. **Clique em "Deploy"**
6. **Pronto!** Seu terminal estará online em alguns segundos

### Método 2: Via CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Na pasta do projeto
vercel

# Siga as instruções:
# ? Set up and deploy "~/seu-projeto"? [Y/n] y
# ? Which scope? [Use arrows to move] Seu Username
# ? Link to existing project? [y/N] n
# ? What's your project's name? terminal-dozamigos
# ? In which directory is your code located? ./
```

### ⚡ Deploy Automático

Configure deploy automático conectando seu GitHub ao Vercel:

1. No painel do Vercel, vá em **Settings > Git**
2. Conecte seu repositório GitHub
3. Agora **cada commit na branch main** fará deploy automático!

## 🔧 Comandos Disponíveis

### Desenvolvimento
```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview do build
npm run lint         # Verificar código
```

### Terminal (no site)
```bash
help                 # Lista todos os comandos
links               # Mostra links disponíveis
open <nome>         # Abre um link específico
clear / cls         # Limpa o terminal
about               # Informações sobre o terminal
whoami              # Mostra usuário atual
date                # Data e hora atual
```

## 🛠️ Tecnologias Utilizadas

- **React 18** - Interface de usuário
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Vite** - Build tool super rápida
- **Shadcn/UI** - Componentes de UI

## 🎯 Casos de Uso Ideais

- ✅ **Portfólio Pessoal** com estilo único
- ✅ **Página de Links** alternativa ao Linktree
- ✅ **Landing Page** para desenvolvedores
- ✅ **Dashboard de Projetos** interativo
- ✅ **CV/Resume** online diferenciado

## 🤝 Contribuições

Sinta-se livre para fazer fork, modificar e melhorar este projeto! 

## 📄 Licença

MIT License - Use como quiser!

---

💡 **Dica**: Personalize o banner ASCII em sites como [patorjk.com](http://patorjk.com/software/taag/) para criar o seu próprio!
