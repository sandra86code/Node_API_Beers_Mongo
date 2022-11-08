const { response, request } = require('express');
const Bar = require('../models/bar');

//Método que muestra los bares filtrados
async function getBars(req = request, res = response){
    const {Nombre, Direccion, Ciudad="Stockholm", Telefono } = req.query;
    const query = {Nombre, Direccion, Ciudad, Telefono};
    for(const key in query) {
        if(query[key] === undefined) {
            delete query[key];
        }
    }
    const bars = await Bar.find(query);
    if(bars.length) {
        res.json(bars);
    }else {
        res.json({ message: 'La búsqueda no ha arrojado ningún resultado'})
    }
    
}



//Método que muestra un bar a partir de su id
async function getBar(req = request, res = response){
    const barId = req.params.id;
    const bar = await Bar.find({ _id: barId });
    if (bar.length) {
        res.json(bar);
    } else {
        res.json({ message: `El bar con id ${barId} no existe` })
    }
}

//Método que añade un nuevo bar
async function addBar(req = request, res = response){
    const { Nombre, Direccion, Ciudad, Telefono } = req.body;
    const bar = new Bar({Nombre, Direccion, Ciudad, Telefono});
    const barNameDB = await Bar.find({ Nombre: bar.Nombre });
    const barAddressDB = await Bar.find({ Direccion: bar.Direccion });
    if(barNameDB.length) {
        res.json({ message: 'Nombre ya registrado' });
    }else if(bar.Nombre===undefined) {
        res.json({ message: 'Nombre es obligatoria.' });
    }else if(bar.Nombre.trim().length<2 || bar.Nombre.trim().length>25) {
        res.json({ message: 'El nombre del bar debe estar entre 2 y 25 caracteres.' });
    }else if(barAddressDB.length) {
        res.json({ message: 'Direccion ya registrada' });
    }else if(bar.Direccion===undefined) {
        res.json({ message: 'Direccion es obligatoria.' });
    }else if(bar.Direccion.trim().length<4 || bar.Direccion.trim().length>70) {
        res.json({ message: 'La dirección del bar debe estar entre 4 y 70 caracteres.' });
    }else if(bar.Ciudad.trim().length<2 || bar.Ciudad.trim().length>40) {
        res.json({ message: 'La ciudad debe estar entre 2 y 40 caracteres.' });
    }else if(bar.Telefono.trim().length<7 || bar.Telefono.trim().length>14) {
        res.json({ message: 'El télefono debe estar entre 7 y 14 caracteres.' });
    }else {
        bar.Nombre = bar.Nombre.trim();
        bar.Direccion = bar.Direccion.trim();
        bar.Ciudad = bar.Ciudad.trim();
        bar.Telefono = bar.Telefono.trim();
        //Guardar en BD
        await bar.save();    
        console.log('Añadido nuevo bar: ', bar);
        res.json({
            bar
        });
    }
}


//Método que elimina un bar a partir de su id
async function deleteBar(req = request, res = response){
    const barId = req.params.id;
    const bar = await Bar.find({ _id: barId });
    if (bar.length) {
        await Bar.deleteOne({ _id: barId });
        console.log("Borrado bar con id: ", barId);
        res.json(bar);
    } else {
        res.json({ message: `El bar con id ${barId} no existe` })
    }
}


//Método que actualiza un bar a partir de su id
async function editBar(req = request, res = response){
    const barId = req.params.id;
    const bar = req.body;
    const updatedBar = await Bar.find({ _id: barId });
    if (updatedBar.length) {
        const barNameDB = await Bar.find({ Nombre: bar.Nombre });
        const barAddressDB = await Bar.find({ Direccion: bar.Direccion });
        if(barNameDB.length && (updatedBar[0].Nombre !== bar.Nombre)) {
            res.json({ message: 'Nombre ya registrado' });
        }else if(bar.Nombre===undefined) {
            res.json({ message: 'Nombre es obligatoria.' });
        }else if(bar.Nombre.trim().length<2 || bar.Nombre.trim().length>25) {
            res.json({ message: 'El nombre del bar debe estar entre 2 y 25 caracteres.' });
        }else if(barAddressDB.length && (updatedBar[0].Direccion !== bar.Direccion)) {
            res.json({ message: 'Direccion ya registrada' });
        }else if(bar.Direccion===undefined) {
            res.json({ message: 'Direccion es obligatoria.' });
        }else if(bar.Direccion.trim().length<4 || bar.Direccion.trim().length>70) {
            res.json({ message: 'La dirección del bar debe estar entre 4 y 70 caracteres.' });
        }else if(bar.Ciudad.trim().length<2 || bar.Ciudad.trim().length>40) {
            res.json({ message: 'La ciudad debe estar entre 2 y 40 caracteres.' });
        }else if(bar.Telefono.trim().length<7 || bar.Telefono.trim().length>14) {
            res.json({ message: 'El télefono debe estar entre 7 y 14 caracteres.' });
        }else {
            bar.Nombre = bar.Nombre.trim();
            bar.Direccion = bar.Direccion.trim();
            bar.Ciudad = bar.Ciudad.trim();
            bar.Telefono = bar.Telefono.trim();
            //Actualizar bar en la BBDD
            await Bar.updateOne({ _id: barId }, bar);
            console.log("Editando bar con id: ", barId);
            res.json(await Bar.find({ _id: barId }));
        }
    } else {
        res.json({ message: `El bar con id ${barId} no existe` })
    }
}


module.exports = { getBars, getBar, addBar, deleteBar, editBar }