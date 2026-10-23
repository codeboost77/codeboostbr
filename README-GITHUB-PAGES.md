# CodeBoost — publicação no GitHub Pages

## 1. Envie os arquivos para o GitHub
Crie um repositório e envie o conteúdo deste ZIP para a raiz do repositório
(os arquivos `package.json`, `vite.config.ts`, `index.html` e as pastas `src/` e `public/`).

## 2. Configure o GitHub Pages
1. Abra **Settings → Pages** no repositório.
2. Em **Build and deployment**, selecione **GitHub Actions**.
3. Crie o arquivo `.github/workflows/deploy.yml` com o conteúdo abaixo.

```yaml
name: Deploy Vite site to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - name: Setup Pages
        uses: actions/configure-pages@v5
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy
        id: deployment
        uses: actions/deploy-pages@v4
```

## Observações
- O `vite.config.ts` já está configurado com `base: './'`, para carregar os arquivos
  estáticos tanto em páginas de projeto quanto em domínio raiz.
- Se a branch principal do seu repositório não se chamar `main`, ajuste o nome no YAML.
