# red-bicicletas
My first App with NodeJS and Express

You can clone this repository with
```
git clone https://github.com/pybegginer/first_node.git
```

To execute this project you should be at

```
/first_node/red-bicicletas
```
then run:
```
    npm install
```

With requirements up-to-date you can run:
    npm run devstart
to run your local server with express.

localhost:3000 --> Open homepage from project: Here you can see a map (using Leaftleft) to visualize current avaliable Bicycle.
localhost:3000/bicicletas --> Open current available bicycles with option to Create, Update and Delete bicycles.

## API Endpoints

**[GET]** [localhost:3000/api/bicicletas](localhost:3000/api/bicicletas): 

Lista todas las bicicletas disponibles

Respuesta(Array):

 ```
{
    ubicacion(Array): un array con lat,lng de la ubicación actual de la bicicleta,
    id(String): Identificador único dado por MongoDB para reconocer este objeto,
    code(Number): Id general para reconocer la bicicleta,
    color(String): Color de cada bicicleta,
    modelo(String): Tipo de bicicleta
}
 ```

**[POST]** [localhost:3000/api/bicicletas/create](localhost:3000/api/bicicletas/create): 

Crea una bicicleta y la agrega  al moedlo de MongoDB

 ```
 body params: {
        code(Number): Código dado para reconocer la bicicleta (diferente del ID dado por MongoDB),
        color(String): Color de la bicicleta,         
        modelo(String): Tipo de bicicleta (e.g., Montaña, Urbana, BMX, Enduro),
        lat(Number): Latitud de la ubicación de la bicicleta,
        lng(Number): Longitud de la ubicación de la bicicleta
    }
 ```
    
**[DELETE]** [localhost:3000/api/bicicletas/delete](localhost:3000/api/bicicletas/delete):

Elimina una bicicleta basado en el código de identificacion general (code)

 ```
    -body params: {    
        code(Number): Número de identificación general de la bicicleta
    }
```  

**[GET]** [localhost:3000/api/usuarios](localhost:3000/api/usuarios)

    Muestra todos los usuarios activos en la base de datos
    
    Respuesta (Array):
    
 ```
    [{
        _id(String): Identificador único de Mongoose,
        nombre(String): Nombre asignado al usuario,
    }]
 ```

**[POST]** [localhost:3000/api/usuarios/create](localhost:3000/api/usuarios/create)

    Crea un nuevo usuario en la base de datos
    
 ```
    -body params : {
        nombre(String): Nombre con el cual guardar el usuario en la base de datos.
    }
 ```

 **[POST]** [localhost:3000/api/usuarios/reservar](localhost:3000/api/usuarios/reservar)
 
    Reserva una bicicleta para un usuario en entre un par de días específicos
    
 ```
    body params : {
        id(String): String identificador único de usuario dado por MongoDB,
        biciId(String): Identificador único de bicicleta dado por MongoDB,
        desde(DateString): Fecha con formato yyyy-mm-dd desde la cual inicia la reserva
        hasta(DateString): Fecha con formato yyyy-mm-dd hasta la cual tendrá la reserva
    }
 ```
