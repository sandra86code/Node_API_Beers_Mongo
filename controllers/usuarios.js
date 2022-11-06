const { response, request } = require('express');
const User = require('../models/usuario');

//Método que muestra los usuarios filtrados
async function getUsers(req = request, res = response){
    const { Nick, Password, Email, Nombre, Apellidos } = req.query;
    const query = { Nick, Password, Email, Nombre, Apellidos };
    for(const key in query) {
        if(query[key] === undefined) {
            delete query[key];
        }
    }
    const users = await User.find(query);
    if(users.length) {
        res.json(users);
    }else {
        res.json({ message: 'La búsqueda no ha arrojado ningún resultado'})
    }
}



//Método que muestra un usuario a partir de su id
async function getUser(req = request, res = response){
    const userId = req.params.id;
    const user = await User.find({ _id: userId });
    if (user.length) {
        res.json(user);
    } else {
        res.json({ message: `El usuario con id ${userId} no existe` });
    }
}

//Método que añade un nuevo usuario
async function addUser(req = request, res = response){
    const { Nick, Password, Email, Nombre, Apellidos } = req.body;
    const user = new User({Nick, Password, Email, Nombre, Apellidos});
    const userNickDB = await User.find({ Nick: user.Nick });
    const userEmailDB = await User.find({ Email: user.Email });
    if(userNickDB.length) {
        res.json({ message: 'Nick ya registrado' });
    }else if(userEmailDB.length) {
        res.json({ message: 'Email ya registrado' });
    }else if(user.Nick.trim().length<3 || user.Nick.trim().length>25) {
        res.json({ message: 'El nick del usuario debe estar entre 3 y 25 caracteres.' });
    }else if(user.Password.trim().length<5 || user.Password.trim().length>35) {
        res.json({ message: 'La contraseña del usuario debe estar entre 5 y 35 caracteres.' });
    }else if(!isEmailValid(user.Email)) {
        res.json({ message: 'Email no válido.' });
    }else if(user.Nombre.trim().length<2 || user.Nombre.trim().length>40) {
        res.json({ message: 'El nombre del usuario debe estar entre 2 y 40 caracteres.' });
    }else if(user.Apellidos.trim().length<2 || user.Apellidos.trim().length>60) {
        res.json({ message: 'Los apellidos del usuario deben estar entre 2 y 60 caracteres.' });
    }else {
        //Guardar en BD
        await user.save();    
        console.log('Añadido nuevo usuario: ', user);
        res.json({
            user
        });
    }
}

//Método que controla si el email es válido
const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};



//Método que elimina un usuario a partir de su id
async function deleteUser(req = request, res = response){
    const userId = req.params.id;
    const user = await User.find({ _id: userId });
    if (user.length) {
        await User.deleteOne({ _id: userId });
        console.log("Borrado usuario con id: ", user);
        res.json(user);
    } else {
        res.json({ message: `El usuario con id ${user} no existe` })
    }
}


//Método que actualiza un usuario a partir de su id
async function editUser(req = request, res = response){
    const userId = req.params.id;
    const user = req.body;
    const updatedUser = await User.find({ _id: userId });
    if (updatedUser.length) {
        await User.updateOne({ _id: userId }, user);
        console.log("Editando usuario con id: ", userId);
        res.json(await User.find({ _id: userId }));
    } else {
        res.json({ message: `El usuario con id ${userId} no existe` })
    }
}


module.exports = { getUsers, getUser, addUser, deleteUser, editUser }