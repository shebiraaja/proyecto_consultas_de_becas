const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const { json } = require('express')
const app = express()


app.use(express.json())
app.use(cors())

app.set("view engine", "ejs")

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

//enlazando base de datos cursos
const conexionCursos = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Pakistan92',
    database:'cursos'
})

//Conexión a la database
conexion.connect(function(error){
    if(error){
        throw error
    }else{
        console.log("Estás fuerte haz podido conectar la db (DATABASE : Empresas)")
    }
})

//CONEXION A DATABASE BECAS
conexionBecas.connect(function(error){
    if(error){
        throw error
    }else{
        console.log("Estás requetefuerte haz podido conectar la db (DATABASE : Becas)")
    }
})

//CONEXION A DATABASE Cursos
conexionCursos.connect(function(error){
    if(error){
        throw error
    }else{
        console.log("Estás ronniecollmen haz podido conectar la db (DATABASE : Cursos)")
    }
})

app.get('/', function(req,res){
    res.send('Ruta inicio')
})

app.get('/login',(req, res)=>{
    res.render("login");
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

//Mostrar todos los cursos
app.get('/api/cursos', (req,res)=>{
    conexionBecas.query('SELECT * FROM cursos', (error,filas)=>{
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

//Cursos
app.get('/api/cursos/:id', (req,res)=>{
    conexionBecas.query('SELECT * FROM cursos WHERE id = ?', [req.params.id], (error, fila)=>{
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

//cursos
app.post('/api/cursos', (req,res)=>{
    let data = {titulo:req.body.titulo, descripcion:req.body.descripcion, temario:req.body.temario, fechaIn:req.body.fechaIn, fechaFin:req.body.fechaFin, presencial:req.body.presencial, semipresencial:req.body.semipresencial, precio:req.body.precio, onlineCourse:req.body.onlineCourse}
    let sql = "INSERT INTO cursos SET ?"
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

//Editar empresas
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


//cursos
app.put('/api/cursos/:id', (req, res)=>{
    let id = req.params.id
    let titulo = req.body.titulo
    let descripcion = req.body.descripcion
    let temario = req.body.temario
    let fechaIn = req.body.fechaIn
    let fechaFin = req.body.fechaFin
    let presencial = req.body.presencial
    let semipresencial = req.body.semipresencial
    let precio = req.body.precio
    let onlineCourse = req.body.onlineCourse
    let sql = "UPDATE cursos SET titulo = ?, descripcion = ?, temario = ?, fechaIn = ? , fechaFin = ?, presencial = ?, precio = ?, semipresencial = ?, onlineCourse = ? WHERE id = ?"
    conexionBecas.query(sql, [titulo, descripcion, temario, fechaIn, fechaFin, presencial, precio, semipresencial, onlineCourse, id], function(error, results){
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

//cursos
app.delete('/api/cursos/:id', (req,res)=>{
    conexionBecas.query('DELETE FROM cursos WHERE id = ?', [req.params.id], function(error, filas){
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


