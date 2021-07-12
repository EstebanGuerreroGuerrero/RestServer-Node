const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');



class Server {

    
    constructor() {
        // Aqui para convertir cualquier cosa en una variable que queramos utilizar en muchos lados por ejemplo:
        this.app            = express();
        this.port           = process.env.PORT;

        this.usuariosPath   = '/api/usuarios';
        this.authPath       = '/api/auth';
        this.categoriasPath = '/api/categorias';
        this.productosPath  = '/api/productos';
    

        // Conectar a la BD
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }



    // Conectar DB
    async conectarDB() {
        // <--- Aquí podemos crear mas conexiones para, POR EJEMPLO: si estamos en PRODUCCIÓN utilizar una BD u otra si estamos en DESARROLLO.
        await dbConnection();
    }
    

    // Middlewares necesarios en el server
    middlewares() {
        // CORS: Restringe el acceso a la API, nosotros elegimos que sitios pueden acceder a este backend.
        this.app.use( cors() );

        // Directorio Publico
        this.app.use( express.static('public') );
    }


    // Rutas
    routes() {
        this.app.use( this.authPath , express.json() , require('../routes/auth-routes') );
        this.app.use( this.usuariosPath , express.json() , require('../routes/usuarios-routes') );
        this.app.use( this.categoriasPath , express.json() , require('../routes/categorias-routes') );
        this.app.use( this.productosPath , express.json() , require('../routes/productos-routes') );
    }


    // Escuchar puertoS
    listen() {
        this.app.listen( this.port , () => {
            console.log('Servidor corriendo en el puerto: ', process.env.PORT );
        } );
    }
}

module.exports = Server;