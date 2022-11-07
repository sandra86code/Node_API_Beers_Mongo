const { response, request } = require('express');
const Cerveza = require('../models/cerveza');


//Método que muestra todas las cervezas
async function getBeers(req = request, res = response){
    const {Nombre, Descripcion, Graduacion, Envase, Precio='1€' } = req.query;
    const query = {Nombre, Descripcion, Graduacion, Envase, Precio};
    for(const key in query) {
        if(query[key] === undefined) {
            delete query[key];
        }
    }
    const beers = await Cerveza.find(query)
    if(beers.length) {
        res.json(beers);
    }else {
        res.json({ message: 'La búsqueda no ha arrojado ningún resultado'})
    }
}

//Método que muestra una cerveza a partir de su id
async function getBeer(req = request, res = response) {
    const id = req.params.id
    const beer = await Cerveza.find({ _id: id });
    if (beer.length) {
        res.json(beer);
    } else {
        res.json({ message: `La cerveza ${id} no existe` })
    }
}

//Método que añade una nueva cerveza
async function addBeer(req = request, res = response) {
    const { Nombre, Descripcion, Graduacion, Envase, Precio } = req.body;
    const beer = new Cerveza({ Nombre, Descripcion, Graduacion, Envase, Precio });
    const beerNameDB = await Cerveza.find({ Nombre: beer.Nombre });
    if(beerNameDB.length) {
        res.json({ message: 'Nombre ya registrado.' });
    }else if(beer.Nombre===undefined) {
        res.json({ message: 'Nombre obligatorio.' });
    }else if(beer.Nombre.trim().length<2 || beer.Nombre.trim().length>30) {
        res.json({ message: 'El nombre debe estar entre 2 y 30 caracteres.' });
    }else if(beer.Descripcion===undefined) {
        res.json({ message: 'Descripcion es obligatoria.' });
    }else if(beer.Descripcion.trim().length<5 || beer.Descripcion.trim().length>240) {
        res.json({ message: 'La descripción debe estar entre 5 y 240 caracteres.' });
    }else if(beer.Graduacion===undefined) {
        res.json({ message: 'Graduacion es obligatoria.' });
    }else if(isNaN(parseFloat(beer.Graduacion))) {
        res.json({ message: 'La graduación debe ser un número con o sin decimales.' });
    }else if(parseFloat(beer.Graduacion)<=0 || parseFloat(beer.Graduacion)>=70) {
        res.json({ message: 'La graduación debe estar entre 0 y 70º'});
    }else if(beer.Envase===undefined) {
        res.json({ message: 'Envase es obligatorio.' });
    }else if(beer.Envase.trim().length<4 || beer.Envase.trim().length>60) {
        res.json({ message: 'El envase debe estar entre 4 y 60 caracteres.' });
    }else if(beer.Precio===undefined) {
        res.json({ message: 'Precio es obligatorio.' });
    }else if(isNaN(parseFloat(beer.Precio))) {
        res.json({ message: 'El precio debe ser un número con o sin decimales.' });
    }else if(parseFloat(beer.Precio)<=0 || parseFloat(beer.Precio)>=200) {
        res.json({ message: 'El precio debe estar ser mayor de 0 y menor de 200.' });
    }else {
        beer.Nombre = beer.Nombre.trim();
        beer.Descripcion = beer.Descripcion.trim();
        beer.Graduacion = parseFloat(beer.Graduacion);
        beer.Envase = beer.Envase.trim();
        beer.Precio = parseFloat(beer.Precio);
        // Guardar en BD
        await beer.save();
        console.log('Cerveza añadida')
        console.log(parseFloat(beer.Graduacion));
        res.json({
         beer
        });
    }
}

//Método que elimina una cerveza a partir de su id
async function deleteBeer(req = request, res = response) {
    const beerId = req.params.id;
    const beer = await Cerveza.find({ _id: beerId });
    if (beer.length) {
        await Cerveza.deleteOne({ _id: beerId });
        console.log("Borrada cerveza con id: ", beerId);
        res.json(beer);
    } else {
        res.json({ message: `La cerveza con id ${beerId} no existe` })
    }
}

async function editBeer(req = request, res = response) {
    const beerId = req.params.id;
    const beer = req.body;
    const updatedBeer = await Cerveza.find({ _id: beerId });
    if (updatedBeer.length) {
        const beerNameDB = await Cerveza.find({ Nombre: beer.Nombre });
        if(beerNameDB.length) {
            res.json({ message: 'Nombre ya registrado' });
        }else if(beer.Nombre===undefined) {
            res.json({ message: 'Nombre obligatorio.' });
        }else if(beer.Nombre.trim().length<2 || beer.Nombre.trim().length>30) {
            res.json({ message: 'El nombre debe estar entre 2 y 30 caracteres.' });
        }else if(beer.Descripcion===undefined) {
            res.json({ message: 'Descripcion es obligatoria.' });
        }else if(beer.Descripcion.trim().length<5 || beer.Descripcion.trim().length>240) {
            res.json({ message: 'La descripción debe estar entre 5 y 240 caracteres.' });
        }else if(beer.Graduacion===undefined) {
            res.json({ message: 'Graduacion es obligatoria.' });
        }else if(isNaN(parseFloat(beer.Graduacion))) {
            res.json({ message: 'La graduación debe ser un número con o sin decimales.' });
        }else if(parseFloat(beer.Graduacion)<=0 || parseFloat(beer.Graduacion)>=70) {
            res.json({ message: 'La graduación debe estar entre 0 y 70º'});
        }else if(beer.Envase===undefined) {
            res.json({ message: 'Envase es obligatorio.' });
        }else if(beer.Envase.trim().length<4 || beer.Envase.trim().length>60) {
            res.json({ message: 'El envase debe estar entre 4 y 60 caracteres.' });
        }else if(beer.Precio===undefined) {
            res.json({ message: 'Precio es obligatorio.' });
        }else if(isNaN(parseFloat(beer.Precio))) {
            res.json({ message: 'El precio debe ser un número con o sin decimales.' });
        }else if(parseFloat(beer.Precio)<=0 || parseFloat(beer.Precio)>=200) {
            res.json({ message: 'El precio debe estar ser mayor de 0 y menor de 200.' });
        }else {
            beer.Nombre = beer.Nombre.trim();
            beer.Descripcion = beer.Descripcion.trim();
            beer.Graduacion = parseFloat(beer.Graduacion);
            beer.Envase = beer.Envase.trim();
            beer.Precio = parseFloat(beer.Precio);
            //Actualizar cerveza en BD
            await Cerveza.updateOne({ _id: beerId}, beer);
            console.log("Editando cerveza con id: ", beerId);
            res.json( await Cerveza.find({ _id: beerId }));
        }
    } else {
        res.json({ message: `La cerveza con id ${beerId} no existe` })
    }
}

module.exports = { getBeers, getBeer, addBeer, deleteBeer, editBeer }