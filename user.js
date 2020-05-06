const express =  require('express');
const router = express.Router();
const USERS = require('../mock/users');
const User = require('../models/users');

router.get('/',(req,res)=>{
    User.find({}, (err, users)=> {
        if (err) res.sendStatus(500);
        res.send(users);
    });
});

router.post('/', (req,res)=>{
    const body = req.body;
    const user = new User(body);

    user.save((err, result)=>{
        if (err) res.sendStatus(500);
        res.send(result);
    });
});

router.get('/:username', (req,res)=>{
    const username = req.params.username;

    User.find({username: req.params.username}, (err, user)=>{
        if (err) res.status(500);
        if (user.length <=0) res.sendStatus(404);
        res.send(user[0]);
    });    
});

router.delete('/:username', (req, res)=>{
    User.deleteOne({username: req.params.username}, (err)=>{
        if (err) res.sendStatus(500);
        res.sendStatus(200);
    });
});

router.put('/:username', (req,res)=>{
    const {_id, username, ...data} = req.body;

    User.findOneAndUpdate({username : req.params.username}, {$set: data}, (err, result)=>{
        if (err) res.sendStatus(500);
        res.send(result);
    });
});

module.exports = router;


//Static Code...

/*router.get('/:username', (req,res)=>{
    const username = req.params.username;

    const user = USERS.find(user => user.username === username);
    if(!user) res.status(404);
    res.send(user);
}); 

router.post('/', (req,res)=>{

    const body =  req.body;
    USERS.push(body);
    res.sendStatus(200);

});

router.put('/:username',(req, res)=>{
    const username = req.params.username;
    const body = req.body;

    const index = USERS.findIndex(user => user.username === username);
    if (index < 0) res.status(404);

    USERS[index] = body;
    res.sendStatus(200);
})

router.delete('/:username',(req, res)=>{
    const username = req.params.username;
    const body = req.body;

    const index = USERS.findIndex(user => user.username === username);
    if (index < 0) res.status(404);

    USERS.splice(index, 1);
    res.sendStatus(200);
})*/










