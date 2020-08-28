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
```
-localhost:3000 --> Open homepage from project: Here you can see a map (using Leaftleft) to visualize current avaliable Bicycle.

-localhost:3000/bicicletas --> Open current available bicycles with option to Create, Update and Delete bicycles.

-http://localhost:3000/usuarios --> Open current users in db with option to create, update and delete them

```

# API Endpoints

Todas los ENDPOINT de api/bicicletas requieren el token generado para poder consultar/crear/borrar bicicletas

### **[GET]** [localhost:3000/api/bicicletas](localhost:3000/api/bicicletas): 
Lista todas las bicicletas disponibles

```
Headers:
{
    x-access-token(String): Token generado para el usuario y poder usarlo para conocer las bicicletas
}

```

#### Respuesta(Array):

 ```
 Headers:
{
    x-access-token(String): Token generado para el usuario y poder usarlo para conocer las bicicletas
}
body params:
{
    ubicacion(Array): un array con lat,lng de la ubicación actual de la bicicleta,
    id(String): Identificador único dado por MongoDB para reconocer este objeto,
    code(Number): Id general para reconocer la bicicleta,
    color(String): Color de cada bicicleta,
    modelo(String): Tipo de bicicleta
}
 ```

### **[POST]** [localhost:3000/api/bicicletas/create](localhost:3000/api/bicicletas/create): 

Crea una bicicleta y la agrega  al moedlo de MongoDB

 ```
 Headers:
{
    x-access-token(String): Token generado para el usuario y poder usarlo para conocer las bicicletas
}

 body params: {
        code(Number): Código dado para reconocer la bicicleta (diferente del ID dado por MongoDB),
        color(String): Color de la bicicleta,         
        modelo(String): Tipo de bicicleta (e.g., Montaña, Urbana, BMX, Enduro),
        lat(Number): Latitud de la ubicación de la bicicleta,
        lng(Number): Longitud de la ubicación de la bicicleta
    }
 ```
    
### **[DELETE]** [localhost:3000/api/bicicletas/delete](localhost:3000/api/bicicletas/delete):

Elimina una bicicleta basado en el código de identificacion general (code)

 ```
 Headers:
{
    x-access-token(String): Token generado para el usuario y poder usarlo para conocer las bicicletas
}

body params: 
{    
    code(Number): Número de identificación general de la bicicleta
}
```  

### **[POST]** [localhost:3000/api/auth/authenticate](localhost:3000/api/auth/authenticate):
Autentica al usuario para generarle un Token que puede usar para acceder a las bicicletas

```javascript
body params:
{
    email(String): Correo del usuario registrado,
    password(String): Contraseña del usuario,
}
```
#### _Success_:
```
{
message: "Usuario encontrado",
data(JSON): {
            usuario(Array):{
                        verificado(String): Muestra si el usuario ya está verificado,
                        _id(String): ID de MongoDB del usuario,
                        nombre(String): Nombre dado al usuario,
                        email(String): Correo eléctronico del usuario,
                        password(hashed-String): Contraseña del usuario encontrado
                    },
            token(String): Token entregado al usuario para consultar las bicicletas 
            }
}
```




#### **[GET]** [localhost:3000/api/usuarios](localhost:3000/api/usuarios)

    Muestra todos los usuarios activos en la base de datos
    
    Respuesta (Array):
    
 ```
    [{
        verificado(Boolean): Muestra si el usuario ha sido verificado con el token enviado por correo (Ethereal Mail)
        _id(String): Identificador único de Mongoose,
        nombre(String): Nombre asignado al usuario,
        email(String): Correo del usuario,
        password(String): Contraseña (Hasheada) del usuario
    }]
 ```

#### **[POST]** [localhost:3000/api/usuarios/create](localhost:3000/api/usuarios/create)

    Crea un nuevo usuario en la base de datos.
    
    
 ```
    -body params : {
        nombre(String): Nombre con el cual guardar el usuario en la base de datos.
        email(String): Email para registrarse en la base de datos.
        password(String): Contraseña para el ingreso mediante API o plataforma.
    }
 ```

 #### **[POST]** [localhost:3000/api/usuarios/reservar](localhost:3000/api/usuarios/reservar)
 
    Reserva una bicicleta para un usuario en entre un par de días específicos
    
 ```
    body params : {
        id(String): String identificador único de usuario dado por MongoDB,
        biciId(String): Identificador único de bicicleta dado por MongoDB,
        desde(DateString): Fecha con formato yyyy-mm-dd desde la cual inicia la reserva
        hasta(DateString): Fecha con formato yyyy-mm-dd hasta la cual tendrá la reserva
    }
 ```
