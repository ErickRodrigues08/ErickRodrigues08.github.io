# Portfólio — Erick Rodrigues Pedroso

Site de portfólio pessoal single-page com tema dark/light (preto e vermelho), animações com GSAP e IntersectionObserver, e design responsivo. Feito com HTML, CSS e JavaScript puros.

> **Status:** em desenvolvimento ativo

---

## Funcionalidades

- Modo claro/escuro com persistência (`localStorage`) e respeito a `prefers-color-scheme`
- Preloader com animação de carregamento (~1.8s, pulável, exibido 1x por sessão)
- Animação de entrada do hero com fade-in e deslocamento vertical, usando GSAP ou Web Animations API como fallback
- Revelação de elementos das seções com fade-in e deslocamento vertical conforme entram na tela
- Animações de rolagem complementares: foto com clip-path, contadores e parallax na galeria
- Barra de progresso de rolagem (sabre de luz)
- Efeito de digitação no cargo do hero
- Galeria de capturas dos projetos com fundo desfocado, entrada suave e transição crossfade
- Navegação da galeria por botões e teclado (setas e Escape), com suporte a movimento reduzido
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
| JavaScript (vanilla) | Interatividade, tema, digitação, cursor e revelações com IntersectionObserver |
| GSAP 3.12.5 | Entrada do hero e animações complementares |
| ScrollTrigger | Animações complementares vinculadas ao scroll |
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
    ├── imagem_portfolio.jpeg
    ├── projetos/
    │   ├── passe-livre/
    │   │   ├── index.png
    │   │   └── index2.png
    │   ├── projeto-frontend/
    │   ├── imc/
    │   ├── barbearia/
    │   ├── conecta-facil/
    │   └── interclasse-sesi/
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

## Capturas e galeria dos projetos

Salve as capturas dentro de `assets/projetos/`, em uma pasta por projeto. Use nomes numerados para manter a ordem:

```text
assets/projetos/
├── passe-livre/
│   ├── 01.webp
│   ├── 02.webp
│   └── 03.webp
└── imc/
    ├── 01.webp
    └── 02.webp
```

Prefira capturas reais do projeto, em formato `.webp` e proporção próxima de 16:9. No card correspondente em `index.html`, preencha `data-gallery` com os caminhos relativos à raiz do site, separados por `|`:

```html
<button
  class="project-cover project-gallery-trigger"
  type="button"
  data-gallery="assets/projetos/passe-livre/index.png|assets/projetos/passe-livre/index2.png"
  aria-label="Ver imagens de Passe Livre">
```

O próprio `index.js` habilita a capa quando encontra caminhos em `data-gallery`. Enquanto o atributo estiver vazio, a galeria daquele projeto permanece desativada. Ao clicar em uma capa habilitada, a primeira imagem abre em uma janela ampliada; os controles inferiores e as setas do teclado avançam/voltam, e `Escape` fecha a visualização. Caminhos ou nomes incorretos aparecem como mensagem dentro da galeria para facilitar a correção.

---

## Identidade visual

Paleta inspirada em vermelho-corrida, preto e branco. O vermelho principal (`#D60407`) fica reservado a chamadas para ação, links, ícones e detalhes de marca; fundos e superfícies neutras mantêm hierarquia visual e legibilidade. No tema escuro, o texto de destaque usa um vermelho mais claro para preservar contraste. No tema claro, o fundo branco e o vermelho profundo mantêm a mesma identidade.

### Tema escuro (padrão)

| Token | Valor | Uso |
|---|---|---|
| `--bg-0` | `#121212` | Fundo da página |
| `--bg-1` | `#181818` | Seções |
| `--bg-2` | `#1e1e1e` | Cards |
| `--bg-3` | `#282828` | Superfícies secundárias |
| `--text` | `#ffffff` | Texto principal |
| `--text-dim` | `#b8b8b8` | Texto secundário |
| `--text-muted` | `#929292` | Texto discreto |
| `--red` | `#D60407` | Botões, ícones e detalhes de marca |
| `--red-text` | `#ff6669` | Texto vermelho com contraste no fundo escuro |
| `--red-hot` | `#f02a2e` | Destaque intenso e hover |
| `--red-deep` | `#8f0305` | Gradientes e tons profundos |

### Tema claro

| Token | Valor | Uso |
|---|---|---|
| `--bg-0` | `#ffffff` | Fundo da página |
| `--bg-1` | `#f8f7f7` | Seções |
| `--bg-2` | `#ffffff` | Cards |
| `--bg-3` | `#f1eeee` | Superfícies secundárias |
| `--text` | `#171717` | Texto principal |
| `--text-dim` | `#555555` | Texto secundário |
| `--text-muted` | `#737373` | Texto discreto |
| `--red` | `#D60407` | Botões, ícones e detalhes de marca |
| `--red-text` | `#c00407` | Texto vermelho com contraste no fundo claro |

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

### Abertura
1. Preloader com barra de progresso e contador
2. Navbar desliza de cima e a grade do hero aparece em fade (GSAP)
3. Conteúdo do hero entra com fade-in e deslocamento vertical escalonado
4. Digitação do cargo começa após a entrada do hero

### Rolagem
- Títulos, cards, galeria e conteúdo das seções: fade-in e deslocamento vertical via IntersectionObserver
- Foto do Sobre: `clip-path: inset()` + colchetes animados + parallax (ScrollTrigger)
- Galeria: parallax por coluna (desktop)
- Galeria de projetos: entrada suave do modal, fundo desfocado e crossfade entre capturas
- Barra de progresso: `scaleX` vinculado ao scroll
- Movimento reduzido respeita `prefers-reduced-motion`

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

- [ ] Adicionar prints dos projetos em `assets/projetos/<slug>/` e preencher `data-gallery` nos cards
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
