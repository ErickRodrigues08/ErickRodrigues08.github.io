# Portfólio — Erick Rodrigues Pedroso

Site de portfólio pessoal single-page com tema dark/light (preto e vermelho), animações com GSAP e design responsivo. Feito com HTML, CSS e JavaScript puros.

> **Status:** em desenvolvimento ativo

---

## Funcionalidades

- Modo claro/escuro com persistência (`localStorage`) e respeito a `prefers-color-scheme`
- Preloader com animação de carregamento (~1.8s, pulável, exibido 1x por sessão)
- Animações de abertura orquestradas (hero entrance timeline com GSAP)
- Animações de rolagem: revelação de títulos, cards em lote, foto com clip-path, contadores, galeria com parallax
- Barra de progresso de rolagem (sabre de luz)
- Efeito de digitação no cargo do hero
- Microinterações: spotlight nos cards, tilt 3D em projetos, botões magnéticos, cursor customizado (apenas mouse)
- Citação final com palavras que acendem conforme a rolagem
- Responsividade testada de 360px a 1440px
- Acessibilidade: `prefers-reduced-motion`, `aria-label`, foco visível, contraste WCAG AA
- SEO básico: Open Graph, meta tags, favicon

---

## Tecnologias

| Tecnologia | Uso |
|---|---|
| HTML5 | Estrutura semântica |
| CSS3 | Variáveis CSS, Grid, Flexbox, animações, modo claro/escuro |
| JavaScript (vanilla) | Interatividade, tema, digitação, cursor |
| GSAP 3.12.5 | Animações de entrada e rolagem |
| ScrollTrigger | Animações vinculadas ao scroll |
| Bebas Neue | Fonte para títulos de seção e cards |
| Orbitron | Fonte para o nome no hero e logo |
| JetBrains Mono | Fonte para labels, tags e código |
| Inter | Fonte para texto corrido |
| Font Awesome 6.5 | Ícones |
| Devicon | Ícones de tecnologias |

---

## Estrutura de pastas

```
ErickRodrigues08.github.io/
├── index.html         # Página principal
├── style.css          # Estilos e tema claro/escuro
├── index.js           # Lógica de interatividade
├── animations.js      # Animações GSAP + ScrollTrigger
├── README.md
└── assets/
    ├── foto_portifolio.png
    ├── setup-cafe.png
    ├── anime-portrait.png
    ├── meu_setup.png
    ├── coding chill.jpeg
    ├── cars.png
    ├── basketball.png
    ├── vader.png
    ├── kylo-ren.png
    ├── mikey_willians.jpeg
    ├── download (14).jpeg
    └── ...
```

---

## Paleta de cores

### Tema escuro (padrão)

| Token | Valor | Uso |
|---|---|---|
| `--bg-0` | `#070707` | Fundo da página |
| `--bg-1` | `#0a0a0a` | Seções |
| `--bg-2` | `#111111` | Cards |
| `--bg-3` | `#1a1a1a` | Superfícies secundárias |
| `--text` | `#f2f2f2` | Texto principal |
| `--text-dim` | `#9b9b9b` | Texto secundário |
| `--text-muted` | `#6a6a6a` | Texto discreto |
| `--red` | `#e10600` | Fundos, botões, ícones |
| `--red-text` | `#ff3b30` | Texto vermelho (tags, labels) |
| `--red-hot` | `#ff1f1f` | Destaque intenso |
| `--red-deep` | `#8b0000` | Vermelho profundo |

### Tema claro

| Token | Valor | Uso |
|---|---|---|
| `--bg-0` | `#f6f4f1` | Fundo da página |
| `--bg-1` | `#fbfaf8` | Seções |
| `--bg-2` | `#ffffff` | Cards |
| `--bg-3` | `#edeae5` | Superfícies secundárias |
| `--text` | `#0b0b0c` | Texto principal |
| `--text-dim` | `#5b5b63` | Texto secundário |
| `--text-muted` | `#8a8a93` | Texto discreto |
| `--red-text` | `#c40500` | Texto vermelho (melhor contraste) |

---

## Tipografia

| Fonte | Uso |
|---|---|
| **Orbitron** | Nome no hero, logo |
| **Bebas Neue** | Títulos de seção e cards |
| **JetBrains Mono** | Labels, tags, pílulas, código |
| **Inter** | Texto corrido |

---

## Animações implementadas

### Abertura (timeline orquestrada)
1. Preloader com barra de progresso e contador
2. Navbar desliza de cima
3. Grade do hero aparece em fade
4. Label "// olá mundo" com efeito scramble
5. Nome letra por letra (máscara com overflow hidden)
6. Frase direta, subtítulo e selo de status
7. Botões com stagger
8. Indicador de scroll
9. Início da digitação do cargo

### Rolagem (ScrollTrigger)
- Títulos de seção: revelação com máscara
- Cards: entrada em lote (`batch`) com stagger
- Foto do Sobre: `clip-path: inset()` + colchetes animados + parallax
- Estatísticas: contadores animados
- Galeria: entrada escalonada + parallax por coluna (desktop)
- Citação final: palavras acendendo com scrub
- Barra de progresso: `scaleX` vinculado ao scroll

### Microinterações (apenas dispositivos com mouse)
- Spotlight radial nos cards
- Tilt 3D nos cards de projeto (máx. ~6°)
- Botões magnéticos nos CTAs
- Cursor customizado (ponto + anel)

---

## Como rodar

1. Clone o repositório:
   ```bash
   git clone https://github.com/ErickRodrigues08/ErickRodrigues08.github.io.git
   ```
2. Abra `index.html` no navegador, ou use um servidor local:
   ```bash
   npx serve
   ```

---

## Como personalizar

- **Cores:** edite as variáveis em `:root` e `:root[data-theme="light"]` no `style.css`
- **Textos:** edite diretamente o `index.html`
- **Frases da digitação:** altere o array `phrases` em `index.js`
- **Projetos:** adicione novos cards `<article class="project-card">` na seção `#projetos`
- **Galeria:** insira novas `<figure class="gallery-item">` apontando para imagens em `assets/`
- **Foto de perfil:** substitua `assets/foto_portifolio.png`

---

## Próximos passos (TODOs)

- [ ] Adicionar prints dos projetos em `assets/projetos/` (formato `.webp`)
- [ ] Criar e incluir o PDF do currículo em `assets/curriculo-erick.pdf`
- [ ] Criar imagem Open Graph 1200×630 para compartilhamento
- [ ] Revisar legendas da galeria (algumas imagens são de terceiros)
- [ ] Verificar direitos autorais das imagens de Star Wars, Spider-Verse e atletas
- [ ] Verificar se o projeto IMC realmente usa TypeScript (tag foi removida)
- [ ] Dar nomes mais descritivos aos projetos "HTML & CSS" e "Projeto Frontend"
- [ ] React está listado na Stack, mas nenhum projeto o utiliza — avaliar se deve permanecer
- [ ] Avaliar se dados pessoais públicos (telefone, idade) devem continuar exibidos

---

## Créditos e licenças

- **GSAP** (GreenSock): licença gratuita para uso não comercial. [gsap.com](https://gsap.com)
- **Google Fonts** (Bebas Neue, Inter, JetBrains Mono, Orbitron): licença SIL Open Font License
- **Font Awesome**: licença Font Awesome Free. [fontawesome.com](https://fontawesome.com)
- **Devicon**: licença MIT. [devicon.dev](https://devicon.dev)
