# Curso backend CoderHouse

## Ejecutar localmente

```bash
  git clone https://github.com/ingadrianvelazquez/avelazquez-32125-backend.git
```
*2do.* Ingresar al directorio del desafío
```bash
  cd avelazquez-32125-backend/challenge6
```
*3ro.* Ejecutar
```bash
  nodemon server.js
```


## Changelog / Desafíos realizados


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
