import {Router} from 'express';
import usersList from '../datas/users.js';

const usersRouter = Router();

usersRouter.get('/users', (req, res) => {
    return res.json(usersList);
})

usersRouter.get('/user/:id', (req, res) => {
    const {id} = parseInt(req.params);
    console.log(typeof id);
    
})
export default usersRouter;