# RPG de texto
## ¿Qué vamos a usar?
Recomiendo usar <https://code.visualstudio.com/download>
### API de discord
La documentación de la api de discord se encuentra en: <https://discord.com/developers/docs/intro>

Aca hay un tutorial de como se programa un bot de discord usando discord.js en node.js

<https://discordjs.guide/preparations/setting-up-a-bot-application.html#what-is-a-token-anyway>

### Node.js
Lo más sencillo es programar desde Node.js que se descarga desde aca <https://nodejs.org/>

Dentro de Node.js hay que ejecutar:

*npm install discord.js*

Eso instala la API de discord. Si en el instalador de Node.js tocaron la casilla de que instale lo que necesite entonces no es necesario ejecutar el npm.

Explicación completa de que es node.js y como usarlo <https://www.nodebeginner.org/index-es.html>
## ¿Qué vamos a programar?
### Este programa debe poder:
- Crear un personaje con una clase.
- El personaje debe tener un nombre, una cantidad de experiencia y debe poder devolver su nivel.
- Cada nivel equivale a 1000 de experiencia
- Cada clase tiene n ítems y n poderes. El primer ítem y el primer poder están definidos por la clase
- El segundo ítem y poder se pueden adquirir mientras se juega.
- Los ítems son propios de la clase pero deben ser polimórficos por comodidad
- Los personajes tienen una cantidad de ataque y defensa
- Los ítems tienen propiedades. Estas propiedades son objetos que devuelven alguna reacción.
- Los eventos buscan propiedades en los ítems o poderes para crear opciones de interacción.


### La narrativa
- Cada evento es un objeto que desencadena otros eventos
- El texto de cada evento se define con la creación del objeto
- Existen diferentes tipos de eventos.
- Los eventos pueden ser: puerta, habitación, pasillo, mueble, combate, etc. De manera que los resultados y respuestas sean coherentes para el jugador. Ej.: todas las puertas pueden a) abrirse, b) no abrirse c) desencadenar una trampa.
- La lista de eventos que se desencadenan se llaman opciones
- Cada opción tiene asignado un texto que se imprime cuando se selecciona el evento
  - Ej: 
    Evento1: Hay una puerta en frente tuyo
1) Opción 1: Intentar abrir
1) Opcion 2: golpear



`		`Si se selecciona opciones 1 debe devolver: “la puerta está trabada”. Este evento retorna al evento 1 lo que vuelve a imprimir el texto con las opciones.

- Los ítems pueden retornar opciones específicas de la clase de evento

Ej.: Evento1: Hay una puerta en frente tuyo

1) Opción 1: Intentar abrir
1) Opcion 2: golpear
1) Opción 3(masa): Golpear con la masa

`	`Esta última opción sólo aparece si el personaje tiene una masa.

- Los eventos desencadenados por un ítem pueden tener su propio resultado.
- Los eventos se cargan de un archivo JSON

### Flujo del juego
1. Crear partida con el comando /nuevapartida
1. Jugador crea el personaje en el menú que aparece en pantalla
1. Se imprime el primer evento usando narrativa.imprimirOpciones()
1. Jugador elije una opcion del menu que llama narrativa.seleccionaOpcion(opt) que hace narrativa.evento = narrativa.evento.seleccionaOpcion(opt) e imprime las opciones
1. Continua así hasta el último evento llamado “end” en donde imprime el enunciado.

### API de discord
Necesitamos averiguar:

- ~~Cómo se autentica un bot y que necesitamos para eso~~
- Cómo recibir comandos de chat con iniciador ( / # ! o alguno de esos)
- Cómo escribir en el chat
- ~~Cómo saber con quién está hablando el bot para no mezclar partidas~~

La interfaz a través de la API debe:

- Recibir comandos
- Recibir la opción que elija el usuario en un evento
- Transmitir al usuario el string que devuelve el evento en cada interacción
- Responder comandos sobre el estado del personaje
- Responder comandos administrativos: version, etc.

Aca esta todo lo que fui haciendo

<https://github.com/Magontek/Bot-discord-RPG>
## Clases y métodos
Glosario y aclaraciones:

**Clase** a veces es la clase de persona y otras una clase de objeto de programacion. Si no se entiende preguntar.

**Historia** una historia es una narrativa con su conjunto de objetoUsables, eventos y efectos.


### class Narrativa
Esta clase es la interfaz de los eventos. Siempre apunta al evento actual y va actualizando ese evento en función de las opciones elegidas.
#### Propiedades

|Nombre : Str|Nombre de la Historia|
| :- | :- |
|Enunciado : Str|La descripción de la historia|
|EventoActual : Obj(Evento)|Apunta al evento contra el que está interactuando el personaje|
#### SelecionarOpcion(int) : str
Llama a eventoActual.SelecionarOpcion(int) y retorna el resultado.
#### describirEvento() : str
Retorna eventoActual.enunciado
#### ImprimirOpciones(personaje) : array(str)
Llama a eventoActual.opciones(personaje) y retorna el resultado
### class Evento
Clase abstracta. No crear objetos de esta clase.
#### Propiedades

|nombre : Str|El nombre del evento, debe ser legible para humanos.|
| :- | :- |
|narrativa : Obj(Narrativa)|Apunta a su narrativa padre. Esto se usa para cambiar la narrativa actual.|
|enunciado : Str|El enunciado que se imprimida cuando se entra al evento.|
|efectoNecesario : Array(Efecto)|El efecto necesario para interactuar con el evento.|
|oculto : Bool|Indica si el objeto esta oculto al jugador.|
|consecuencias : Array(evento)|La lista de eventos a los que se accede desde las opciones de este evento.|
#### selecionaOpcion(int) : Obj(evento)
Este método toma un entero y devuelve el evento asignado a ese entero en el array Consecuencias.
#### opciones(personaje) : array(str)
Toma un personaje y devuelve todas las posibles opciones para ese personaje en ese evento.
### class Habitacion
Esta clase extiende la clase abstracta Evento.

Las consecuencias de esta clase no están ordenadas.
#### opciones(personaje) : array(str)
Extiende el método opciones de la clase Evento.  Retorna el nombre de cada evento de la habitación listado en consecuencias.

Devuelvo opciones para las siguientes condiciones:

- Solo si personaje.tieneEfecto(EfectoNecesario) == true
- Muestra los nombres de las consecuencias siguiendo las siguientes reglas
  - Si un elemento de consecuencias tiene el flag *oculto* y el personaje no posee el efectoNecesario no se muestra en la lista
  - Si el elemento no tiene el flag *oculto* se muestra en la lista

#### Explorar(personaje) : array(bool)
Esta clase es una sugerencia para implementar las opciones.

Retorna un array de booleanos que indican cual item de la lista de consecuencias puede ver el personaje.
### class Puerta
Esta clase extiende la clase abstracta Evento.

Consecuencias responde en el orden [abrir,abrircon,destruir,destruircon]
#### Propiedades

|abierta : Bool|Determina si la puerta a está abierta o trabada|
| :- | :- |
|dureza : Int|Determina qué tan difícil es romper la puerta|
#### opciones(personaje) : array(str)
Extiende el método opciones de la clase Evento.

- Agrega la opción “Abrir ”
- Agrega la opción “Abrir con: ” si el personaje tiene un ítem con el efecto abrirCerraduras
- Agrega la opción “Destruir puerta ”
- Agrega la opción “Destruir puerta con: ” si el personaje posee el ítem con efecto ataque.
#### defenderDe(personaje)
Este método recibe un personaje y devuelve True si el nivel del personaje supera la dureza de la puerta.
#### defenderDeItem(personaje, item) ; Bool
Este método recibe un personaje y un ítem y devuelve True si el nivel del personaje más el valor de potencia del efecto ataque del ítem supera la dureza de la puerta.
#### abrir(personaje) : Bool
Retorna True si abierto == True
#### abrirCon(personaje, Item) : Bool
Retorna True si ítem tiene el efecto abrirCerradura
### class Cofre
Esta clase extiende la clase abstracta Evento.

Consecuencias responde en el orden [abrir,abrircon,destruir,destruircon]
#### Propiedades


|abierta : Bool|Indica si se puede abrir o si esta cerrada con llave|
| :- | :- |
|dureza : Int|Indica el nivel de dureza. Se usa cuando se intenta destruir.|
|contenido : item|El contenido del cofre. Consta de un solo item.|
#### Opciones(personaje) : array(evento)
Extiende el método opciones de la clase Evento.

- Agrega la opción “Destruir cofre ”
- Agrega la opción “Destruir cofre con: ${objeto}” si el personaje posee el ítem con efecto ataque.
- Agrega la opción “Abrir”
- Agrega la opción “Abrir con: ${objeto}” si el personaje tiene un ítem con el efecto abrirCerraduras
#### abrir(personaje) : Bool
Retorna True si abierto == True. Le da al personaje el item si puede agarrarlo. Sino
#### abrirCon(personaje, Item) : Bool
Retorna True si ítem tiene el efecto abrirCerradura.
#### defenderDe(personaje) : Bool
Este método recibe un personaje y devuelve True si el nivel del personaje supera la dureza del cofre. En caso se False hay 50% de destruir el objeto.
#### defenderDeItem(personaje, item) : Bool
Este método recibe un personaje y un ítem y devuelve True si el nivel del personaje más el valor de potencia del efecto ataque del ítem supera la dureza del cofre. En caso de False hay 50% de destruir el objeto.
#### tomarItem(personaje) : Bool
Agrega el item del cofre a la lista de ítems si el personaje está usando personaje.personaje.agregarItem(item).

Declara contenido=null si logro asignar el objeto al personaje usando personaje.agregarItem(item)==true.
### class Biblioteca
Esta clase extiende la clase abstracta Evento.

Este objeto es similar al cofre pero puede tener una trampa.

Consecuencias responde en el orden:
[tomar,noTomar,detonarTrampa]


|trampa : Int|Indica si la biblioteca tiene o no una trampa|
| :- | :- |
|contenido : Obj(Poder)|El contenido de la biblioteca. Consta de un solo poder.|
#### Opciones(personaje) : array(evento)
Extiende el método opciones de la clase Evento.

- Agrega la opción “Buscar ”
- Agrega la opción “Buscar con: ${objeto}” si el personaje posee el ítem con efecto ataque.
- Agrega la opción “Tomar libro para adquirir poder”
- Agrega la opción “Tomar libro con ${objeto} para adquirir poder” para todos los ítems/poderes con desactivar trampa o defensa.
#### revisar(personaje) : Str
Si alguno de los ítems o poderes del jugador tiene el poder “detectarTrampas” detecta si tiene o no una trampa y cual es su poder. Tiene una trampa si la variable trampa>0.
#### tomarPoder(personaje) : Bool
Si el jugador intenta tomar el poder y la biblioteca tiene una trampa se compara el poder del primer item con defensa del jugador.
#### tomarPoderCon(personaje, Item/poder) : Bool
Sí el item/poder tiene el efecto “desactivarTrampa” el jugador toma el poder.

Si el ítem no tiene el poder “desactivarTrampa” pero tiene defensa se comparan los valores de trampa y la potencia del ítem con defensa.
### class Enemigo
Esta clase extiende la clase abstracta Evento.

Consecuencias responde en el orden:
` `[muerto, enemigoHuye, personajeHuye, personajeHuyeUsando]
#### Propiedades

|Personaje : Obj|Es un objeto de clase personaje que se usa para calcular el combate|
| :- | :- |
#### Opciones(personaje) : array(evento)
Extiende el método opciones de la clase Evento.

- Agrega la opción “Atacar ”
- Agrega la opción “Atacar con: ${objeto}” si el personaje posee el ítem con efecto ataque.
- Agrega la opción “Huir”
- Agrega la opción “Huir usando: ${objeto}” si el personaje posee el ítem con efecto sigilo o velocidad.
#### defenderDe(personaje) : Bool
Este método recibe un personaje y devuelve True si el nivel del personaje supera la dureza del enemigo mas el poder el primer objeto con un poder “defender”.
#### defenderDeItem(personaje, ObjetoUsable) : Bool
Este método recibe un personaje y un ítem y devuelve True si el nivel del personaje más el valor de potencia del efecto ataque del ítem supera la dureza del enemigo.
#### venceA(personaje,ObjetoUsable) : Bool
Este método recibe un personaje y un objetoUsable. Retorna True si su nivel más el valor de potencia del efecto de ataque que devuelva su primer arma es mayor que el nivel del personaje mas el poder del objeto que se paso como parametro.

Si no vence retorna false.
#### tieneArma() : Obj(Item)
Retorna el primer objeto que tenga la propiedad ataque.
#### ganaCombate(personaje) : Bool
Retorna True si defenderDe(personaje)==True y VenceA(Personaje)==True
### class Efecto
Este objeto es una propiedad de los Ítems y Poderes.

ID: deben ser ataque, defensa, buscartrampas, invisibilidad, abrircerraduras.
#### Propiedades

|Nombre : Str|Nombre del efecto, es legible por humanos.|
| :- | :- |
|id : Str|Este es su id, es lo que buscan los eventos para validar acciones. Estan predetermiandos|
|Potencia : Int|Es un valor abstracto que depende del tipo de efecto|
|CantidadDeUsos : Int|Es la cantidad de veces que puede ser usado este efecto. Un número negativo se considera infinito.|
#### usar() : bool
Si cantidadDeUsos>0 resta 1. Si después de eso puedeUsar()==true retorna true

Retorna false si cantidadDeUsos ==0.
#### puedeUsar() : bool
Retorna true si cantidadDeUsos != 0.
### class Personaje
Este es el personaje que usa el jugador.
#### Propiedades

|Nombre : Str|Nombre del personaje. Legible por humanos|
| :- | :- |
|ID : int|Un id único que identifica el personaje|
|Experiencia : Int|Cantidad de experiencia.|
|Items : Array(item)|Arreglo de objetos de clase item que posee el personaje|
|MaxItems : int|Número máximo de objetos en el array de items|
|Poderes : Array(poder)|Arreglo de objetos de clase poder que posee el personaje|
|MaxPoderes :Int|Número máximo de objetos en el array de poderes|
|Clase : Str|Clase del personaje. Es un string usado por los objetos para saber si puede ser usado.|
#### getNivel() : Int
Retorna el nivel del personaje calculado como experiencia/1000 redondeado hacia arriba
#### addExperiencia(int) :
Agrega la cantidad int de experiencia al personaje
#### tieneEfecto(efecto) : Array(Efecto)
Retorna todos los objetos que contengan el efecto.
#### cantidadDeItems() : Int
Retorna la cantidad de ítems que posee en este momento.
#### cantidadDePoderes() : Int
Retorna la cantidad de poderes que posee en este momento.
#### agregarItem(item) : Bool
Agrega un item a la lista si maxItems<cantidadDeItems(). Retorna True si es posible agregar el Item.
#### agregarPoder(poder) : Bool
Agrega un poder a la lista si maxPoderes<cantidadDeIPoderes(). Retorna True si es posible agregar el Item.
#### usarEfectoDeObjeto(objeto, efecto) : Str
Retorna el resultado de efecto.Usar(personaje,objeto)
### class ObjetoUsable
Esta es una clase. Ítem y Poderes aumentan esta clase solo configurando su nombre.
#### Propiedades

|nombre : Str|Nombre del objeto|
| :- | :- |
|efectos : Array(efecto)|Set de efectos que definen el objeto usable|
|tipo : Str|Es el tipo de objeto: Ítem o Poder|
|clase : Str|Es la clase de personaje que puede usar este objeto. Null indica cualquiera|

#### contieneEfecto(efecto) : efecto
Retorna el efecto si es que lo contiene. Sino retorna Null.
#### puedeUsar(efecto) : Bool
Retorna True si contieneEfecto(efecto)==efecto y efecto.puedeUsar()==true
#### usar(efecto) : Bool
Retorna True si contieneEfecto(efecto)==efecto y efecto.usar(self)==true.
### class Game
Esta clase es la que se usa para interactuar con la narrativa.


|partidas : Array(guld,user,obj(narrativa),personaje)|Este es un array que contiene cuatro campos: <br>guildID, userID, Obj(Narrativa), personaje|
| :- | :- |

#### crearNarrativa(guild,user,Str(Nombre),personaje) : Obj(Narrativa)
Este método crea todos los objetos de la historia con ese nombre, se queda con el handler del objeto narrativa y lo almacena en un nuevo elemento del array partidas junto con el user y guild que devuelve discord.js y el personaje.
Solo puede haber una partida para cada par user guild.
#### listarHistorias() : Array(Str)
Lista todos los nombres de las carpetas dentro de la carpeta historias.
La estructura de archivos de una historia es:
#### partidaDe(user, guild) : Obj(Narrativa)
Retorna el objeto narrativo que corresponde a ese user y guild.
#### nuevoPersonaje(nombre, clase)
Retorna un objeto nuevo de la clase personaje con las propiedades indicadas.
#### cargarHistoria(nombre) : Obj(Narrativa)
Retorna una nueva narrativa con ese nombre. Si el nombre no es válido crea una error.
#### clasesDePersonaje(historia) : array()
Carga todas las clases de personaje de los JSON en la carpeta ./historias/unaHistoria/clases. Retorna un array con los objetos
### class ClasesDePersonaje
Este objeto se usa para inicializar los personajes al comienzo de la partida.


|nombreDeClase : Str|Nombre de la clase|
| :- | :- |
|itemInicial : Arry(Obj(item))|La lista de items con las que comienza el personaje|
|MaxItems : Int|El número máximo de items que puede tener el personaje|
|poderInicial : Array(Obj(Poder))|La lista de poderes con las que comienza el personaje|
|MaxPoderes : Int|El número máximo de poderes que puede tener el personaje|

### class Editor
Esta clase tiene como objetivo crear las historias que luego serán usadas por la clase Game. 
Se deja planteado la carga y guardado de historias.


Ejemplo de uso.

Const editor = new Editor()

Const un efecto = editor.crearEfecto( parametros… )

….

editor.crearNarrtiva()

Editor.exportar todo( ‘./’ )

Esto debería crear todos los directorios y archivos.



|narrativa : Obj(Narrativa)||
| :- | :- |
|eventos : Array(Obj(Eventos))||
|clases :Array(Obj(ClasesDePersonaje))||
|enemigos :Array(Obj(personaje))||
|efectos :Array(Obj(efectos))||

#### crearNarrativa(Nombre,Enunciado,EventoActual) : Obj(Narrativa)
Crea una narrativa nueva y lo asigna a la variable narrativa.
#### crearPuerta( parametrosDePuerta ) : Obj(Eventos)
Crea un evento(puerta), lo agrega a la lista de eventos y lo retorna.
#### crearCofre( parametrosDeCofre ) : Obj(Eventos)
Crea un evento(cofre), lo agrega a la lista de eventos y lo retorna.
#### crearEnemigo( parametrosDeEnemigo ) : Obj(Eventos)
Crea un evento(enemigo), lo agrega a la lista de eventos y lo retorna.
#### crearHabitacion( parametrosDeHabitacion ) : Obj(Eventos)
Crea un evento(habitacion), lo agrega a la lista de eventos y lo retorna.
#### crearObjeto( parametrosDeObjetos) : Obj(ObjetoUsable)
Crea un objeto Usable nuevo y lo asigna al array objetos.
#### crearEfecto(parametrosDeEfecto) : Obj(Efecto)
Crea un efecto nuevo y lo agrega al array de efectos.
#### exportarTodo(Direccion) : null
Exporta todos los arrays que contienen los elementos de la historia y los guarda en la dirección relativa
#### importarTodo(direccion, nombreDeHistoria) : Obj(narrativa)
Carga todos los archivos de la dirección relativa que estén dentro de la historia con ese nombreDeHistoria en las propiedades del editor.
### getNarrativa() : Obj(Narrativa)
Retorna el objeto this.narrativa
## Comandos de discord
### /listarhistorias
Muestra una lista con todas las historias disponibles.
### /listarclases
Muestra una lista de las clases disponibles.
### /nuevapartida nombre [Nombre de personaje]
Busca una personaje en creación para este guild y user y le asigna nombre
### /nuevapartida clase [Clase de personaje]
Busca una personaje en creación para este guild y user y le asigna clase de personaje
### /nuevapartida historia [Nombre de historia]
Busca una personaje en creación para este guild y user y le asigna una historia
### /continuapartida
Repite el último evento asignado a ese user y guild.en el canal en el que se escribió el comando.
### /comenzarpartida
Imprime lo mismo que continuar partida pero con un mensaje de bienvenida.
### /terminarpartida
Muestra botones de eliminar, cancelar.

El botón eliminar elimina el elemento en el array de partidas asignado a ese user y guild.
### /personaje
Imprime las propiedades del personaje y sus objetos asignados a ese user y guild.
## Helpers de Discord
#### embedPersonaje(personaje) : Obj(Embed)
Retorna un embed que contiene:
Nombre : ${Nombre} Clase : ${Clase} 
Nivel : ${Nivel} Experiencia : ${Experiencia}

Items:

- Item 1 de [MaxItems]: ${poder.nombre}
  - Efectos: ….
  - ?Clase :

- Item 2 ….

Poderes:

- Poder 1 de [MaxPoderes]: ${poder.nombre}
  - Efectos: …
  - ?Clase :

- Poder 2 …
