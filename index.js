const express =  require('express');
const bodyParser = require('body-parser');
const users = require('./routes/user');
const customers = require('./routes/customer');
const app = express();
const mongoose = require('mongoose');
const config = { useNewUrlParser: true, useUnifiedTopology: true };
app.use(bodyParser.json());
const port = process.env.APP_PORT || 5000;


mongoose.connect(process.env.CON_STRING,config,err=>{

    if (err) {
        console.log('failed to connect!');
    } else {
        console.log('connected to the database!');
        app.listen(port, ()=>{
            console.log('server has been started!');
            console.log(`listening at port ${port}`);

            app.use('/users', users);
            app.use('/customers', customers);
        });
    }

    console.log('server is starting...');
});



