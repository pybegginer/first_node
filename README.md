# first_node
My first App with NodeJS and Express

You can clone this repository with

git clone https://github.com/pybegginer/first_node.git

To execute this project you should be at

/first_node/red-bicicletas
then run:
    npm install

With requirements up-to-date you can run:
    npm run devstart
to run your local server with express.

localhost:3000 --> Open homepage from project: Here you can see a map (using Leaftleft) to visualize current avaliable Bicycle.
localhost:3000/bicicletas --> Open current available bicycles with option to Create, Update and Delete bicycles.

//---API endpoints----//

**[GET]** ```localhost:3000/api/bicicletas```: List all available bicycles

**[POST]** ```localhost:3000/api/bicicletas/create```: 

    body params: ```{
        "id": id,        
        "color": color de la bicicleta,        
        "modelo": modelo de bicicleta,        
        "lat": Latitud de la ubicación de la bicicleta,        
        "lng": Longitud de la ubicación de la bicicleta,        
    }```
    
**[POST]** localhost:3000/api/bicicletas/delete:

    -body params: {    
        "id": id de la bicicleta a eliminar        
    }
    

