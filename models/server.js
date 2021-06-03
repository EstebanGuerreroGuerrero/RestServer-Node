const express = require('express');
const cors = require('cors');



class Server {

    constructor() {
        // Aqui para convertir cualquier cosa en una variable que queramos utilizar en muchos lados por ejemplo:
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        this.routes();
    }


    middlewares() {

        // CORS: Restringe el acceso a la API, nosotros elegimos que sitios pueden acceder a este backend.
        this.app.use( cors() );


        // Directorio Publico
        app.use('/static', express.static(__dirname + '/public'));

    }



    routes() {

        this.app.use( this.usuariosPath , require('../routes/usuarios-routes') );

    }


    listen() {
        this.app.listen( this.port , () => {
            console.log('Servidor corriendo en el puerto: ', process.env.PORT );
        } );
    }
}

module.exports = Server;