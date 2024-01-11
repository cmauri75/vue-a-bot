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
* ``>>>`` --> Ad uno stile scoped posso aggiungere ``>>>`` questo si chiama deep selector e permette di estendere lo stile anche ai figli
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
  
## Routing e navigation
Il routing server per navigare tra varie pagine, cambiando l'url nel browser.
* Per utilizzarlo devo installare il componente vue-route e nel main.js dichiarare il .use(router), il router è una directory che contiene file js dove definisco le mie rotte e la configurazione del componente
* Una volta definito <route-view/> mostrerà il componente associato alla rotta corrente
* I link tra le rotte le creo con <router-link>, usando "to: path" oppure ":to obj", nell'obj posso usare ad esempio il nome della rotta
* I link avranno in automatico lo stile ".nav-link" quello uguale all'url corrente avrà in più la classe ".router-link-active" 
  * Se voglio usare una classe specifica uso: "linkActiveClass" dentro a createRouter
  * Volendo ho anche l'attributo active-class che posso specificare elemento per elemento
* Il route può avere anche parametri. In dichiarazione li dichiaro anteponendo ":", nel route-link uso il tag "params". Per l'utilizzo ho l'oggetto useRoute.params
  * Posso anche passare i parametri come props ("props: true" in dichiarazione) semplificandone l'utilizzo via "defineProps"
* Nell'url tutto ciò che va dopo lo # non viene inviato al server ma gestito lato client. Questo ha un side-effect con la SEO, se uso in setup createWebHistory ho url tradizionali.
  * Il metodo tradizionale per funzionare ha bisogno che in fase di prod il server (nginx, apache, ...) torni sempre il contenuto di "/" a prescindere dall'url richiesto.

## State management
Lo strumento raccomandato per la gestione dello stato è Pinia. Un'alternativa è Vuex.
* Ho diversi tipi di stato:
  * Local: le variabili di stato interne ad un componente (ae: menu aperto/chiuso)
  * Shared: variabili condivise tra più componenti (ae: il carrello) --> qui uso lo state manager
  * Server: risiedono su servizi esterni (ae: account utente)
* Per utilizzarla devo dichiararne l'uso nel main.js, quindi definisco gli store che voglio utilizzare in una dir stores (as: useCartStore, come da naming convention) e lo esporto, così che qualsiasi componente lo possa utilizzare. 
  * NB: non serve usare .value, ci pensa Pinia a unboxare
  * NB: posso modificare lo stato direttamente tramite ae push su array, una volta che ho recuperato il reference.
  * NBB: Usa sempre il cartStore per accedere alle proprietà e non usare oggetti di supporto intermedi, altrimenti potresti rompere la reattività ae riassegnando la variabile non cambi il valore nello store ma solo nella var locale.
    * Se proprio vuoi farlo si può usare la "storeToRefs" di Pinia, poi però dovrà usare ".value" per accedere ai valori.
* Pinia fornisce due modalità di utilizzo, con sintassi leggermente differenti:
  * Option Store, se uso le OptionAPI, dentro cui trovo
    * States: sono i dati
    * Actions: i metodi per modificare i dati
    * Getters: metodi per recuperare viste sui dati (come coi computed)
  * Setup Store, nel caso delle CompositionAPI, in cui ho rispettivamente:
    * Properties
    * Methods
    * Computed
* Pinia è utile anche per eseguire il fetch di dati da una API
  * NDA: per il fetch locale ho creato un server con express, per evitare problemi di cors ho usato il proxy in vite.config.js

### Advance state management
* Devo fare attenzione a non rompere la reattività quando uso lo store ad esempio in questo modo:
  * ```
      cart = useCartstore().cart;
      cartTotal = userCartStore().cartTotal;
    ```
    In questo caso se assegno qualcosa a cart questo sovrascriverà la variabile locale, quindi se ci faccio un push non aggiornerò lo stato
    Con "cartTotal" (è un computed) il problema si ha perchè pinia mi fa l'unrefering del ref, quindi valorizza solo la prima volta il campo e se varia non ho aggiornamenti
    (NB: nel secondo caso credo si possa risolvere usando "ref()" ma non ho testato)
    Posso utilizzare sempre "useCartstore().xxx" quando devo utilizzare l'oggetto oppure posso comunque usare variabili usando il metodo "destructed values" di Pinia:
    ```
      import {storeToRefs} from 'pinia;
      let {cart,cartTotal} = storeToRefs(userCartStore());
    ```
    Questo mi torna i ref alle variabili, così mantengo la reattività. Ora però ho ref, quindi devo posporre ".value" quando li utilizzo.
  * Se ho un array in uno store posso mutarlo direttamente tramite un push
    ```
      cartStore.cart.push({...product});
    ```
    oppure posso usare il "patch"
    ```
    const newCart = [...cartStore.cart, product]
    cartStore.$patch({
      cart: newCart
    });
    
    oppure
    
    cartStore.$patch((state) => {
      state.cart.push({...product});
    });
    ```
    il primo è equivalente a ``cartStore.cart = newCart`` con la differenza che posso aggiornare atomicamente più proprietà nello stesso store ed è più esplicativo.
  *  Se recupero dati da servizi rest devo eseguire call asincrone, quindi il rendering deve poter prevedere che i dati non siano ancora aggiornati, magari con un v-if che nasconde un elemento e mostra una "waiting..."
    * Posso anche decidere di non montare del tutto un componente sino a che non ho tutti i dati pronti
      1. Aggiungo un await prima della chiamata alla "partStore.getParts()"
      2. Wrappo l'utilizzo del componente (nella pagina padre) all'interno del tag <Suspense>, così il rendering dello stesso avverrà solo al termine dell'await.
* Quando uso store multipli devo far attenzione alle invocazioni cicliche:
  * Una funzione non può chiamarne un'altra che la richiama a sua volta, ovviamente
  * Due store possono chiamarsi reciprocamente ma solo internamente ad un metodo, non posso fare chiamate direttamente dal setup method (il main)
    * Posso usare "const cartStore = useCartStore;" nella setup function e poi usare cartStore nelle closure successive, ma non ad esempio faccio console.log(cartStore) ritorna undefined, lo store è broken. 
    * Altra regola importante è che all'interno di funzioni che fanno chiamate asincrone devo eseguire le chiamate a store esterni PRIMA della call e mai dopo, asltrimenti potrei usare una istanza di Pinia errata.
* Gli store sono ideali anche per contenere la business logic lo faccio dichiarando funzioni che lavorano su quello store (service vicini ai dao)
  * In questo modo posso evitare di esportare lo stato interno, ma solo i metodi per operarci (Setter) e le computed per accederci (getter). 
    * Attenzione: se non esporto lo stato potrei non triggerare mutation nei plugin a seguito di modifiche interne.
  * NB: se recupero i componenti dallo store usando il ref destructuring ( let {a,b,c} = storeToRef(cartStore)) posso farlo solo per gli state e le computed properties, non posso recuperare anche le action.
* Se cambio un template ho l'hot replacement, questo però non è abilitato di default per gli store pinia, posso farlo store per store usando il codice sottostante, in fondo al js che dichiara lo store:
  ```
  if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(cartStore, import.meta.hot))
  }
  ```
### Pinia plugin
* Se necessario posso sottoscrivermi a modifiche all'interno di uno store tramite: "myStore.$onAction((name,store,args,after, onError) => {}) la funzione viene invocata prima dell'azione
  * All'interno posso anche specificare onError() e after() che verranno eseguiti nei rispettivi casi. Posso così ae settare un flag e resettarlo al termine dell'esecuzione
  * Inoltre posso anche specificare un metodo $subscribe che si sottoscrive ad ogni modifica di stato
* I metodi di sopra vanno specificati store per store, posso però creare un plug-in che si applica a tutti gli store contemporaneamente.
  * Creo un file "local-storage-plugin.js", qui posso usare la keyword store che ciclerà su tutti quelli disponibili. Va aggiungo all'oggetto pinia in fase di dichiarazione.
  * Questo metodo può tornare un oggetto con delle proprietà, queste verranno aggiunte a tutti gli store
* Quando creo uno store ho un terzo parametro, le option. All'interno posso mettere oggetti a piacere.
  * Queste opzioni sono accessibili ai plugin che possono usarle per customizzare il proprio comportamento in base allo store su cui stanno operando.
* Per aggiungere funzionalità a Pinia posso usare, oltre ai plugin che si basano sull'augmentation, i composable, che utilizzano la composition. Sono concetti non specifici di Pinia
  * Sono le funzioni che iniziano per "use", ae: useLocalStorage 
  * Si utilizzano installando con @vueuse/core, 

## Custom directives
Posso creare direttive custom (tipo la build-in v-if) da riutilizzare nei miei componenti.
* Per convenzione le chiamo v-XXXXX, si costruisce creand un js (XXXX-directive.js) con un metodo di default che si aggancia al mount.
  * Ho element come parametro che è il tag stesso, quindi posso manipolarlo a piacere (vedi v-pin)
  * Per usarlo devo importarlo dandogli lo stesso nome del tag, ma camelcase (es: vPin)
* Posso passare parametri usando i modifiers. Si usano aggiungendo dopo il tag .MOD1.MOD2... e così via. Li ricevo tramite il parametro "binding" che contiene la proprietà "modifiers"
* Un secondo metodo, meno espressivo ma più flessibile, è l'utilizzo dei binding, ossia dei parametri da dare al valore del tag sotto forma di oggetto. Ho sempre il binding ma uso "value"
  * NB: in questo modo eventuali modifiche non vengono applicate se cambia qualcosa in quanto mi sono agganciato al mounted, se mi serve posso usare l'updated
  * Ho anche, ma molto meno usate di mounted e updated:
    * "created" invocato quando è stato creato il padre ma non ho ancora agganciato gli attributi
    * "beforeMound" prima di essere agganciato al DOM
    * "beforeUpdate" prima di eseguire eventuali modifiche
    * "beforeUmount" quando rimuovo il parent element dal dom
    * "unounted" dopo che l'ho rimosso
  * Ho anche una sintassi più concisa che invoca l'update. Rimuovo "updated: (element, binding)" ed esporto direttamente una funzione coi due parametri, semplificando la sintassi
* Se la mia direttiva è molto utilizzata posso dichiararla globalmente al posto di importarla in ogni elemento
  * la importo nel main.js e prima del mount uso ".directive('XXX',direttiva_imoportata)" facendo attenzione a non includere "v-"

## Deploy app in produzione
* Basta invocare ```npm run build``` questo creerà una directory "dist" che posso servire come plain html app.
* default è equivalente a usare ```npm run build -- --mode=production```, ma posso usare modi differenti:
  * --node=XXX: posso creare dei modi custom con le ottimizzazioni di prod ma magari da usare in staging per test. Mi basta creare file .env.XXX con gli env specifici per quella versione. 
  * in sviluppo il modo è "development". Posso accedere agli env tramite "process.env.VITE_APP_YYYY"
  * NB! Le chiavi devono tutte iniziare per "VITE_APP_". Questo per maggiore sicurezza.
  * il file .env viene caricato in tutti i modi
  * Ho anche il rispettivo process.env.VUE_APP_YYY usabile se non usi vite ma vue_cli
* Se ho bisogno di servire un singolo url (es: /) devo usare il createwebhash nel router, così da avere un solo url. A questo 

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
