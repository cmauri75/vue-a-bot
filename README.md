# build-a-bot

### Creazione progetti:
Ho due possibilità:
* VueCli: usa webpack. Usi ``vue-cli-service serve/build``
* create-vue: usa vite. non specifico per vue e molto veloce. Usi ``vite / vite build``

### Components
Può essere un piccolo modulo o anche tutta l'applicazione, sono i file .vue

Due approcci differenti alla parte script dei componenti 
#### Option API
- Semplici
- Ho tutto assieme in un file
- Usi `<script>` ed esporti metodi e attributi.
  * Qui i componenti devo importarli, dopo di che devo riesportarti per poterli usare nel template
  * data() --> Riguardo i dati li includo come dato di ritorno della funzione  "data()". Sono lo stato del componente
  * methods --> Contiene le funzioni che devono essere accessibili nel template
  * compute --> Contiene le computed properties, si tratta di proprietà che hanno una logica per generarle, è meglio tenere fuori dal template, così posso anche testarle.
    * Bisogna creare una funzione che ritorna la computed property che mi interessa.
  * created() --> è lanciato quando il componente viene creato, tipicamente qui si fa la fetch dei dati dal server.
  * mounted() --> come sopra, ma rieseguito più volte ad ogni mount
    * NB: mixins[] --> posso riutilizzare gli hook inserendo le funzioni in un file e poi inserendole nella proprietà mixins
  * Nei template posso usare {{}} per elaborare espressioni javascript e mostrarne l'output (binding), si chiamano interpolation expression. Quando diventano troppo complesse meglio muoverle dentro le computed properties e li lasciare solo il rendering.

#### Composition API
- Introdotti in vue3 permettono astrazione e composizione
- Posso separare in file separati
- Usi `<script setup>` non esporti ma dichiari.
  * In verità posso usare ancora script ma inserire una funzione setup() che contiene tutto quello che prima avevo nel file stesso.
  * i data diventano dichiarazioni dentro il setup
  * le computed properties diventano una lambda che esporto, ma va prima wrappata dentro il metodo computed di vue
  * eventuali funzioni di utilità posso esportarle allo stesso modo
  * lo stesso per le funzioni, vanno dichiarate nel setup e poi ritornate
  * i componenti importati posso usarli direttamente.
  * i mixins non servono più, posso già comporre direttamente
  * posso rimuovere tutti i "this."
- Ora però ho perso la reattività perchè avviene tutto nel setup
  * Uso ref per rendere reattive le proprietà, mi basta wrapparle (come con computed() per le computed properties)
    * NB: quando poi però le uso dovrò invocare il metodo value. I componenti nel template invece si arrangiano da soli
  * Invece per i non primitivi (ad esempio gli array) si può usare "reactive", questo non ha bisogno di .value per essere acceduto. Tuttavia è sconsigliato, meglio usare sempre ref, questo per consistenza, non devo ricordare se usaare o meno .value, lo uso sempre.
    * NB: ref e computed sono costanti, non vanno modificati, per mutarli devo usare O.value=newValue, coi reactive è più complesso e devo stare molto attento (caso degli array), motivo maggiore per non usarlo.
- NB: posso usare un metodo più veloce, lo script setup, così non posso controllare in modo fine l'incapsulamento, tutto ciò che dichiaro viene esportato, ma è più conciso.
  * Rimuovo un po' di strutture tra cui il nome (viene preso di default dal nome file), ora ho solo le dichiarazioni
  * il lifecycle si gestisce direttamente con gli onEVENT, il created è già il setup

Due visibilità:
* Local component: li importo localmente e li uso. Preferibile.
* Global component: li dichiaro nel main.js e poi li utilizzo ovunque mi servano senza bisogno di dichiararli. Hanno gli stessi problemi delle variabili globali.

### Istruzioni
* "v-bind:" dice a vue di valutare l'espressione passata nel contesto del componente (abbreviabile con ":")
* "v-on:" inietta callback ad eventi (abbrieviabile con "@")
* "v-once": se lo metto in un elemento il contenuto viene interpolato solo una volta e non aggiornato continuamente, buono per performance se qualcosa non cambia
* "v-if": rende un oggetto solo se la funzione all'interno torna true. Da usare se il rendering non è molto impegnativo.
* "v-show": come sopra, ma l'elemento è sempre presente seppur nascosto. Più veloce del precedente se ho qualcosa che compare e scompare difficile da generare.
* "v-for": per ripetere, posso fare un ciclo in tutti gli elementi in una lista, con ``(list,index) in item" :key="index"`` ho l'indice dell'elemento corrente che posso usare come chiave per referenziarlo.
  * NB: non mettere mai v-if e v-for nello stesso elemento

### Form
* L'accesso ai valori in una textbox la ottengo con ``@input="myVal = $event.target.value" />`` myVal deve essere un ref

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
