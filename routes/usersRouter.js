import {Router} from 'express';
import usersList from '../datas/users.js';

const usersRouter = Router();

// Show all users
usersRouter.get('/users', (req, res) => {
    return res.json(usersList);
})

// Show single user
usersRouter.get('/user/:id', (req, res) => {
    const {id} = req.params;

    const getUser = usersList.find(user => user.id === parseInt(id));
    
    if(!getUser){
        return res.status(404).json({error : 404 , message : 'Utilisateur introuvable'});
    }else{
        return res.status(200).json(getUser);

    }
})

//Add new user
usersRouter.post('/user/add', (req, res) => {

    const {firstName,lastName,telephone,address,hobbies} = req.body;

    if(!firstName || !lastName || !telephone || !address || !hobbies){
        return res.status(400).json({message : `Tous les champs sont requis`})
    }else{
        const addNewUser = {
            id : usersList.length + 1,
            firstName,
            lastName,
            telephone,
            address,
            hobbies : hobbies.split(",")
        }
        
        usersList.push(addNewUser);
        return res.status(200).json({message : `L'utilisateur ${firstName} à bien été ajouté !`})
    }
});


// update user
usersRouter.put('/user/edit/:id', (req, res) => {
    const {id} = req.params;

    let getUser = usersList.find(user => user.id === parseInt(id));

    if(!getUser) {
        return res.status(404).json({message : `Utilisateur introuvable`})
    }else{        
        const {firstName,lastName,telephone,address,hobbies} = req.body;
        
        if(firstName){
            getUser.firstName = firstName;
        }
        
        if(lastName){
            getUser.lastName = lastName;
        }
        
        if(telephone){
            getUser.telephone = telephone;
        }
        
        if(address){
            getUser.address = address;
        }
        
        if(hobbies){
            getUser.hobbies = hobbies.split(","); 
        }
        
        return res.status(200).json(getUser);
    }
})

export default usersRouter;