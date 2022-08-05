const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const { json } = require('express')
const app = express()


app.use(express.json())
app.use(cors())

//Establecemos los prámetros de conexión
const conexion = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Pakistan92',
    database:'empresas'
})

//BECAS
const conexionBecas = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Pakistan92',
    database:'becas'
})

//Conexión a la database
conexion.connect(function(error){
    if(error){
        throw error
    }else{
        console.log("Estás fuerte haz podido conectar la db")
    }
})

//CONEXION A DATABASE BECAS
conexionBecas.connect(function(error){
    if(error){
        throw error
    }else{
        console.log("Estás requetefuerte haz podido conectar la db")
    }
})

app.get('/', function(req,res){
    res.send('Ruta INICIO')
})

//Mostrar todos las empresas
app.get('/api/empresas', (req,res)=>{
    conexion.query('SELECT * FROM empresas', (error,filas)=>{
        if(error){
            throw error
        }else{
            res.send(filas)
        }
    })
})

//BECAS
app.get('/api/becas', (req,res)=>{
    conexionBecas.query('SELECT * FROM becas', (error,filas)=>{
        if(error){
            throw error
        }else{
            res.send(filas)
        }
    })
})

//Mostrar una SOLA Ubicacion
app.get('/api/empresas/:id', (req,res)=>{
    conexion.query('SELECT * FROM empresas WHERE id = ?', [req.params.id], (error, fila)=>{
        if(error){
            throw error
        }else{
            res.send(fila)
        }
    })
})

//BECAS
app.get('/api/becas/:id', (req,res)=>{
    conexionBecas.query('SELECT * FROM becas WHERE id = ?', [req.params.id], (error, fila)=>{
        if(error){
            throw error
        }else{
            res.send(fila)
        }
    })
})

//Crear una FILA DE EMPRESA
app.post('/api/empresas', (req,res)=>{
    let data = {nombre:req.body.nombre, direccion:req.body.direccion, tipo:req.body.tipo, responsable:req.body.responsable, email:req.body.email, telefono:req.body.telefono}
    let sql = "INSERT INTO empresas SET ?"
    conexion.query(sql, data, function(err, result){
            if(err){
               throw err
            }else{              
             /*Esto es lo nuevo que agregamos para el CRUD con Javascript*/
             Object.assign(data, {id: result.insertId }) //agregamos el ID al objeto data             
             res.send(data) //enviamos los valores                         
        }
    })
})


//BECAS
app.post('/api/becas', (req,res)=>{
    let data = {descripcion:req.body.descripcion, destinatarios:req.body.destinatarios, numeroplazas:req.body.numeroplazas, requisitos:req.body.requisitos, dotacion:req.body.dotacion, masinfo:req.body.masinfo}
    let sql = "INSERT INTO becas SET ?"
    conexionBecas.query(sql, data, function(err, result){
            if(err){
               throw err
            }else{              
             /*Esto es lo nuevo que agregamos para el CRUD con Javascript*/
             Object.assign(data, {id: result.insertId }) //agregamos el ID al objeto data             
             res.send(data) //enviamos los valores                         
        }
    })
})

//Editar ubicacion
 app.put('/api/empresas/:id', (req, res)=>{
     let id = req.params.id
     let nombre = req.body.nombre
     let direccion = req.body.direccion
     let tipo = req.body.tipo
     let responsable = req.body.responsable
     let email = req.body.email
     let telefono = req.body.telefono
     let sql = "UPDATE empresas SET nombre = ?, direccion = ?, tipo = ? , responsable = ?, email = ?, telefono = ? WHERE id = ?"
     conexion.query(sql, [nombre, direccion, tipo, responsable, email, telefono, id], function(error, results){
         if(error){
             throw error
         }else{              
             res.send(results)
         }
     })
})


//BECAS
app.put('/api/becas/:id', (req, res)=>{
    let id = req.params.id
    let descripcion = req.body.descripcion
    let destinatarios = req.body.destinatarios
    let numeroplazas = req.body.numeroplazas
    let requisitos = req.body.requisitos
    let dotacion = req.body.dotacion
    let masinfo = req.body.masinfo
    let sql = "UPDATE becas SET descripcion = ?, destinatarios = ?, numeroplazas = ? , requisitos = ?, dotacion = ?, masinfo = ? WHERE id = ?"
    conexionBecas.query(sql, [descripcion, destinatarios, numeroplazas, requisitos, dotacion, masinfo, id], function(error, results){
        if(error){
            throw error
        }else{              
            res.send(results)
        }
    })
})

//Eliminar ubicacion
app.delete('/api/empresas/:id', (req,res)=>{
     conexion.query('DELETE FROM empresas WHERE id = ?', [req.params.id], function(error, filas){
         if(error){
             throw error
         }else{              
             res.send(filas)
         }
     })
})


// const puerto = process.env.PUERTO || 3000
// app.listen(puerto, function(){
//     console.log("Servidor Ok en puerto:"+puerto)
// })

//BECAS
app.delete('/api/becas/:id', (req,res)=>{
    conexionBecas.query('DELETE FROM becas WHERE id = ?', [req.params.id], function(error, filas){
        if(error){
            throw error
        }else{              
            res.send(filas)
        }
    })
})
// const puertoBecas = process.env.PUERTO || 3001
// app.listen(puerto, function(){
//     console.log("Servidor Ok en puerto:"+puertoBecas)
// })

const puerto = process.env.PUERTO || 3000
app.listen(puerto, function(){
    console.log("Servidor Ok en puerto:"+puerto)
})







///Hasta aqui ---------------------------------------------------------------






// const dbConnection = require('./dbConnection.js');

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({extended : false}));

// //Create
// app.post('/insert',(request,response)=>{
//     const {name}=request.body;
//     const db = dbConnection.getDbConnectionInstancia();

//     const result = db.insertarNombre(name);

//     result
//     .then(data => response.json({data:data}))
//     .catch(err => console.log(err));

// });


// //Read
// app.get('/getAll',(request,response)=>{
//     console.log('test');
//     const db = dbConnection.getDbConnectionInstancia();
//     const result = db.getAllData();

//     result
//     .then(data => response.json({data:data}))
//     .catch(err => console.log(err));
// })


// //Update
 


// //Delete

// app.listen(process.env.PORT, ()=> console.log('app is runnig'));