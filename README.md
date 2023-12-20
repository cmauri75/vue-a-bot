# build-a-bot

### Creazione progetti:
Ho due possibilità:
* VueCli: usa webpack. Usi ``vue-cli-service serve/build``
* create-vue: usa vite. non specifico per vue e molto veloce. Usi ``vite / vite build``

### Componenti
Può essere un piccolo modulo o anche tutta l'applicazione

Due approcci differenti alla parte script dei componenti
* Option API --> usi \<script> ed esporti metodi e attributi. Ae: puoi avere created() {this.getParts();}
  * Qui i componenti devo importarli, dopo di che devo riesportarti per poterli usare nel template
  * Riguardo i dati li includo come dato di ritorno della funzione  "data()" posso anche usare chiamate rest
  * Le funzioni nell'oggetto methods

* Composition API --> usi \<script setup> non esporti ma dichiari. Ae: puoi avere onCreated(() => {this.getParts();}); *
  * In questo caso ad esempio i componenti importati posso usarli direttamente.

Due tipi:
* Local component: li importo localmente e li uso. Preferibile.
* Global component: li dichiaro nel main.js e poi li utilizzo ovunque mi servano senza bisogno di dichiararli. Hanno gli stessi problemi delle variabili globali.
## Customize configuration


### Istruzioni
v-bind: dice a vue di valutare l'espressione passata nel contesto del componente
v-on: inietta callback ad eventi

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
