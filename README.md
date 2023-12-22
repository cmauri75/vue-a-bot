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

### Styling
* style scoped --> Gli stili possono essere scoped e allora si applicano solo all'interno del componente, se non specifico sono globali ma non dovrebbe essere mai usato se non nel componente padre che include gli altri
* >>> --> Ad uno stile scoped posso aggiungere >>> questo si chiama deep selector e permette di estendere lo stile anche ai figli
* :style="" --> Posso assegnare stili in modo dinamico con :style="", all'interno posso mettere javascript o meglio una computed property. 
* :class --> Con :class={ 'classe': booleanFunction} posso assegnare dinamicamente uno stile. Posso anche passare un array con gli stili da applicare.
* v-bind --> lo aggiungo direttamente nello stile in modo da modificare i css 

## Comunicazione tra componenti
* nel momento in cui ho componenti molto complessi posso spezzarli in sotto-parti, nel nostro esempio è evidente che un sottocomponente è il selettore della parte di robot
  * mi basta crearlo e importarlo, non serve registrarlo come fatto per quelli alla radice
* Il passaggio di variabili avviene definendo un tag custom (con prefisso : se sono espressioni, senza se è hardcoded), all'interno del componente uso defineProps(). Si tratta di una macro che non va dichiarata.
  * NB: posso passare ad defineProps un oggetto al posto di un array di stringhe, in questo modo posso definire il tipo degli oggetti che si aspetta di ricevere. Ma la validazione avviene comunque runtime
  * Con l'oggetto posso definire anche un default, required e dei validatori
* I dati di ritorno si passano usando gli events. Si dichiarano con defineEmits, macro come il fratello defineProps
  * Il padre deve sottoscriversi agli eventi nel momento in cui crea il figlio, usando il v-on, ho un evento custom che funziona come quelli built-in
  * Il figlio emette un evento tra quelli dichiarati, può agganciarci degli oggetti che viaggeranno con l'evento stesso.
  * L'inizializzazione posso farla direttamente nel setup, definiti emit e props.
  * NB: Posso usare l'hook onUpdate che viene invocato ogni volta cambia lo stato del componente per emettere il mio evento, così non devo fare un controllo fine nel punto in cui la modifica viene effettuata ma comunico ad ogni change.
* Se ho una catena di componenti passare variabili ed eventi può essere pesante
  * Per il passaggio di oggetti uso provide: {} nel padre e inject nel figlio, passo un oggetto direttamente da un ancestor ad un nipote
* Posso avere componenti che contengono al loro interno HTMl, viene passato come parametro. Ae: un componente che rende collassabile il contenuto. L'html verrà reso al posto dell'elemento <slot> presente nel componente figlio.
  * Il contenuto di slot verrà reso come default se non viene passato nulla dentro il componente quando viene utilizzato.
  * Posso avere più slot nel componente, per differenziarli uso l'attributo "name". Quello di default è quello senza name, queli aggiuntivi li definisco tramite il tag <template v-slot:name>
  * Posso iniettare html nei sub-componenti anche utilizzando il tag <Teleport>, è meno utilizzato ma esiste.
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
