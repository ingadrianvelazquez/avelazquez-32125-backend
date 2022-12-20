# Curso backend CoderHouse

## Ejecutar localmente

```bash
  git clone https://github.com/ingadrianvelazquez/avelazquez-32125-backend.git
  cd avelazquez-32125-backend/challenge16
  npm i
  nodemon server.js --port 8080
```


## Changelog / Desafíos realizados

`Desafío #15: Server con Balanceador de Carga`

- Basándonos en el desafío anterior (Usando el Objeto Process), se realizan los siguientes cambios:
- Se agrega un nuevo parámetro/argumento de ejecución para indicar si levanta el servidor en modo FORK o CLUSTER
  - por default FORK
  - se emplea el alias ***m: 'mode'***
- Se agrega a la ruta /info la información sobre la cantidad de procesadores/hilos que posee el server
- Se brindan los comandos ejecutados para levantar el server en modo FORK y CLUSTER, desde:
  - nodemon
  - forever
  - pm2
- Se configura y levanta **NGNIX** para:
  - redirigir */api/randoms* a un cluster (creado desde node) sobre el puerto 8081
  - el resto de las consultas sobre un server individual en el puerto 8080
- Se modifica **NGNIX** y recarga (*reload*) para:
  - redirigir */api/randoms* a un cluster de servidores gestionado por **NGINX** repartidos equitativamente escuchando sobre los puertos 8082 al 8085
- ***[extra]*** se brindan el archivo de configuración de **NGINX**


`Desafío #14: Usando el Objeto Process`

- Basándonos en el desafío anterior (Inicio de Sesión), se realizan los siguientes cambios:
- Se mueven todas las credenciales y algunos otros datos de configuración al archivo ***.env*** y se carga mediante la librería **dotenv**
- Se emplea **yargs** para tomar el puerto desde los argumentos pasados por línea de comandos
  - por default 8080
  - se emplea el alias ***p: 'port'***
- Se brinda la ruta **/info** para mostrar información del proceso, sistema y proyecto
- Se brinda la ruta **/randoms/:count?**  para calcular *count* numeros al azar entre 1 y 1000, para luego mostrar las veces que estos se repitieron
  - si no se brinda el parametro *count* por defecto será 100.000.000
  - para que la operación **NO** sea bloqueante, se implementa ***fork***
- ***[extra]*** se brindan las pruebas realizadas mediante la extension RestClient
- **nota** debido a emplear mysql/mariadb para los productos no lo he subido a Glitch, sin embargo pruede probarse ya que esto es ajeno a las bases


`Desafío #13: Inicio de Sesión`

- Basándonos en el desafío anterior (datos de sesión en Mongo Atlas), emplearemos passport-local para permitir registrarse y loguearse a los usuarios
- La persistencia de los datos de sesión y usuarios será sobre Mongo Atlas
- El formulario de registro, solicita usuario (email) y contraseña
  - si el usuario ya se encuentra registrado, informa el error
  - si la registracion es exitosa, lo redirige a la pantalla de login
- El formulario de login, solicita las credenciales
    - si son incorrectas (el usuario no existe o la contraseña no coincide) se alerta el error
    - caso contrario, le brinda acceso a la página principal, donde operar mensajes y productos
- ***[extra]*** se brindan las pruebas realizadas mediante la extension RestClient
- **nota** debido a emplear mysql/mariadb para los productos no lo he subido a Glitch


`Desafío #12: Persistir datos de sesión en Mongo Atlas`

- Basándonos en el desafío anterior (mocks y normalización), permitiremos loguear a un cliente y asociarle una sesión
- La persistencia de los datos de sesión será sobre Mongo Atlas
- La página inicial, muestra:
  - el formulario de login, si el usuario no inicio sesión aún o expiró la misma
    - se contempla y alerta sobre credenciales incorrectas
  - la página principal, donde operar mensajes y productos si el usuario se logueó exitosamente
    - en el header de esta se lo saluda y brinda el botón para cerrar sesión
- Para las pruebas se emplea y parametriza como variable de entorno, el usuario *WillyWonka*
- La acción de logout, despide al usuario, destruye la sesión y luego de 2 segundos lo redirige nuevamente al formulario de login
- Cada nuevo request sobre la página principal, mantiene la sesión activa si esta no expiró aún
  - caso contrario, se redirige al usuario visitante al formulario de login
- ***[extra]*** simplifiqué el archivo que levanta el server, diviendo su contenido en los controladores y routers necesarios
- **nota** debido a emplear mysql/mariadb para los productos no lo he subido a Glitch


`Desafío #11: Mocks Y Normalización`

- Basándonos en el desafío#8 (nuestra primer base de datos), empleamos **faker** para crear productos al azar
  - bajo la ruta '/api/products-test/:count?' se listarán *count* productos generados al azar o 5 por defecto
- Sobre los mensajes del chat, ampliamos su formato para aplicar **normalizr**
- La persistencia de los mensajes ahora se hace bajo contenedor de archivos, para permitir objetos anidados
- Se aplica el mismo esquema de normalización al server como frontend para que puedan operar correctamente
- La lista de mensajes registrados, deben viajar al front normalizados y allí ser desnormalizados para su correcta visualización
- Se informa el porcentaje de compresión que se realizó en la operación
  - Sobre la prueba realizada (dejo archivo generado) su valor fue de 78,05%
- ***[extra]*** agrego un botón extra a cada formulario para agregar elementos generados al azar mediante *faker*
- ***[extra]*** se brindan las pruebas realizadas mediante la extensión RestClient, sobre la ruta de productos al azar
- **nota** debido a emplear mysql/mariadb para los productos no lo he subido a Glitch


`Desafío #10: Primer entrega del Proyecto Final`

- Basándonos en los contenedores ya desarrollados (memoria, archivos) crear uno para Firebase y otro para MongoDB
- Para cada contenedor, se crean sus clases derivadas DAOs, una para trabajar con Productos y otra con Carritos
- Se separan los elementos en sus correspondientes carpetas:
  - containers
  - daos
  - datafiles (*para los archivos*)
  - models
  - persistence (*donde tambien reside la configuración de las bases*)
  - routes (*desde donde se opera la variable de entorno, para levantar el container solicitado*)
  - test (*pruebas realizadas mediante RestClient*)
- Se opera un container u otro mediante la variable de entorno CONNECTOR
- ***[extra]*** se suma el container Knex para MariaDB y SQLite3


`Desafío #9: MongoDB`

- Crear la base de datos *ecommerce* con 2 colecciones:; *mensajes* y *productos*
- Agregar 10 documentos a cada una de ellas respectando el formato empleado en el desafío anterior
- Listar todos los documentos de cada colección y mostrar la cantidad almacenados en ellas
- Realizar operaciones CRUD sobre la colección de productos:
  - agregar un nuevo producto
  - listar los productos con precio menor a 1000 pesos
  - listar los productos con precio entre los 1000 a 3000 pesos
  - listar los productos con precio mayor a 3000 pesos
- Realizar una consulta que traiga sólo el nombre del tercer producto más barato
- Agregar el campo stock a todos los productos con un valor de 100
- Cambiar el stock a cero de los productos con precios mayores a 4000 pesos
- Borrar los productos con precio menor a 1000 pesos
- Crear un usuario 'pepe' clave: 'asd456' que sólo pueda leer la base de datos ecommerce
  - Verificar que pepe no pueda cambiar la información
- ***[extra]*** se brindan los comandos realizados y el contenido final de cada colección


`Desafío #8: Nuestra Primera Base de Datos`

- Basado en el Desafío #6: WebSocket, cambiamos la persistencia de archivo/memoria a MySql/SQLite3 respectivamente
- La persistencia de los mensajes cambian de memoria a SQLite3
- La persistencia de los productos cambian de filesystem a MariaDB
- Se agrega un script para crear las tablas necesarias e insertar un registro para pruebas en cada una de ellas
- ***[extra]*** se brindan la acción de eliminar sobre los productos


`Desafío #7: Primer entrega del Proyecto Final`
### DEMO en [Glitch](https://warp-wool-lantern.glitch.me/)

- Avance de la aplicación eCommerce Backend
- La persistencia de productos y del carrito de compras se realiza sobre el filesystem
- Se implementan 2 conjuntos de rutas: /api/products y /api/cart
- Sobre el router de productos, se tiene:
  - GET /:id? para traer todos los productos o solo uno
  - POST / para incorporar nuevos *[solo disponible para ADMIN]*
  - PUT /:id para actualizar uno existente *[solo disponible para ADMIN]*
  - DELETE /:id para eliminar uno existente *[solo disponible para ADMIN]*
- Sobre el router del carrito, se tiene:
  - POST / para crear uno nuevo
  - DELETE /:id para eliminar uno existente
  - GET /:id/products para traer los productos de un carrito puntual
  - POST /:id/products para agregar un producto al carrito mediante su identificador (id_prod)
  - DELETE /:id/products/:id_prod para eliminar un producto existente sobre un carrito puntual
- Se implementa la variable *admin* para autorizar o no la acción sobre el router de productos
  - ***[extra]*** Para que pueda ser empleada sin modificar el código, se puede sumar al header del request *Authorization: admin*
- Se implementa un mensaje por default 404 ante cualquier otra ruta/acción/método
- ***[extra]*** se brindan las pruebas realizadas mediante la extension RestClient, tanto de productos como el carrito


`Desafío #6: WebSocket`
### DEMO en [Glitch](https://functional-chalk-house.glitch.me//)

- Basado en la entrega anterior sobre HandleBars, implementar sockets
- Listar los productos que se van agregando en tiempo real debajo del formulario
- Implementar un chat listando los mensajes en tiempo real para todos los usuarios conectados
- ***[extra]*** empleado FETCH para el template del listado de productos y mensajes


`Desafío #5: Motores de Plantillas`
### DEMO *HBS* en [Glitch](https://wonderful-sheer-okapi.glitch.me/)

- Utilizando la API de productos ya creada, aplicar visual mediante templates
- En la raíz debe estar el formulario, cuya acción (POST) impacta en /products
- En la dirección /products (GET) listar los productos agregados
- Ambas páginas deben tener un enlace a la otra
- ***[extra]*** en EJS incorporé un condicional para incluir el listado o el formulario segun parámetros


`Desafío #4: API RESTfull con Router`
### DEMO en [Glitch](https://power-peppermint-jodhpur.glitch.me/)

- Implementar una API RESTfull para operar productos
- Utilizar una clase separada con soporte de persistencia en memoria
- Incorporar un Router sobre la url base '/api/productos/'
- Brindar un formulario para la carga de productos
- ***[extra]*** se brindan las pruebas realizadas mediante la extension RestClient


`Desafío #3: Servidor con EXPRESS`
### DEMO en [Glitch](https://river-woolen-square.glitch.me/)

- Levantar un servidor node.js mediante el modulo express
- Utilizar la clase Contenedor del desafío anterior
- Implementar el endpoint /products, que consulte el fichero de productos y retorne todos
- Implementar el endpoint /randomProduct, que informe un producto al azar del fichero mencionado
- ***[extra]*** se aplica un template html para hacer mas agradable su visualización


`Desafío #2: Manejo de archivos mediante FS`
### DEMO en [StackBlitz](https://stackblitz.com/edit/node-engdmq?file=index.js)

- Crear la clase Contenedor cuyo constructor es la ruta al archivo
- Agregar los métodos para guardar, obtener/eliminar uno puntual o todo, mediante promesas aplicando async/await
- Registrar en el archivo: datos de productos (título, precio, imagen miniatura) asignando ID incremental sin repetir
- Crear un objeto con valores arbitrarios e invocar todos sus métodos
- ***[extra]*** si el archivo no existe, se crea. Se suma método para obtener la cantidad de productos registrados


`Desafío #1: Declarar una clase Usuario`
### DEMO en [StackBlitz](https://stackblitz.com/edit/node-4gxwge?file=challenge1.js)

- Crear la clase con los atributos: nombre, apellido, libros y mascotas
- Asociar los atributos mediante un constructor
- Crear los métodos: getFullName, addMascota, countMascota, addBook, getBookNames
- Crear un objeto con valores arbitrarios e invocar todos sus métodos
- ***[extra]*** Se suman los métodos: countBooks, getPets, removePet y, removeBookByTitle / removeBookByAuthor, utilizando removeBook
