const { response, request } = require('express');

const { subirArchivo } = require('../helpers');
const Producto = require('../models/producto');
const Usuario = require('../models/usuario');


    const cargarArchivo = async ( req , res = response ) => {
    
        try {
            // Imagenes
            const ext = [ 'txt' , 'md' , 'jpg' ]
            const nombre = await subirArchivo( req.files , ext , 'Archivos' ) // Argumentos: files , extensiones que se permiten , carpeta
            res.json({ nombre })
            
        } catch ( error ) {
            res.status(400).json({ error })
        }
            
        
    }



    const actualizarImagen = async( req , res ) => {

        const { coleccion , id } = req.params;

        let modelo;

        // Validacion de existencia de Modelos a Actualizar
        switch ( coleccion ) {
            case 'usuarios':
                modelo = await Usuario.findById( id );
                if( !modelo ) {
                    return res.status(500).json({
                        msg: `No existe un Usuario con id: ${ id }`
                    });
                }    
            break;
        
            case 'productos':
                modelo = await Producto.findById( id );
                if( !modelo ) {
                    return res.status(400).json({
                        msg: `No existe un Producto con id: ${ id }`
                    });
                }
            default:
                return res.status(500).json({ msg: 'Se me olvido validar esto :P' });
        }
        
        const nombre = await subirArchivo( req.files , undefined , coleccion )
        modelo.img = nombre;

        await modelo.save();

        res.json({ modelo })

    }


module.exports = {
    cargarArchivo,
    actualizarImagen
}