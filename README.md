# Curso backend CoderHouse

## Ejecutar localmente

*1ro.* Clonar el proyecto
```bash
  git clone https://github.com/ingadrianvelazquez/avelazquez-32125-backend.git
```
*2do.* Ingresar al directorio creado
```bash
  cd avelazquez-32125-backend
```
*3ro.* Ejecutar
```bash
  nodemon challenge4.js
```


## Changelog / Desafíos realizados


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
