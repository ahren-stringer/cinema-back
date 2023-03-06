const expess = require('express');
const mongoose = require('mongoose');
const Cors = require("cors");
const auth = require('./routes/auth.routes.js');
const category = require('./routes/category.routes.js');
const coments = require('./routes/coments.routes.js');
const email = require('./routes/email.routes.js');
const places = require('./routes/places.routes.js');
const path = require('path');
const { fileURLToPath } = require('url');
//const __filename = fileURLToPath(import.meta.url);
//export const __dirname = path.dirname(__filename);

//API Config
const app = expess();
const port = process.env.PORT || 8001;
const connection_url = 'mongodb+srv://Reacter:6Jf4B0YhZXRsZCAg@cluster0.8y24l.mongodb.net/myTinder?retryWrites=true&w=majority';

//Middlewares
app.use(expess.json())
app.use(Cors())
// Авторизация
app.use('',auth)
// Категории
app.use('',category)
// Коменты
app.use('',coments)
// Обратная связь
app.use('',email)
// Места
app.use('',places)

//DB Config
try{
  mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
}catch(error){
  console.log(error)
}

mongoose.connection.on('error', err => {
  console.log(err);
});

if (process.env.NODE_ENV ==='production'){
    app.use(expess.static('client/build'))

    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

//Listener

app.listen(port, () => console.log('Server Starts on localhost', port))
