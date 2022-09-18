const express = require('express')
const mysql = require('mysql')
const cors = require('cors') 
const { json } = require('express')
const app = express()

// 2 - Para poder capturar los datos del formulario (sin urlencoded nos devuelve "undefined")
app.use(express.urlencoded({ extended: false }));

app.use(express.json())
app.use(cors())


//4 -seteamos el directorio de assets
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));

app.set("view engine", "ejs")

const bcrypt = require('bcryptjs');


// variables de session
const session = require('express-session');
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));


//BECAS
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Pakistan92',
    database: 'becas'
})


//enlazando base de datos Auth
// const conexionAuth = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'Pakistan92',
//     database: 'becas'
// })

//CONEXION A DATABASE
conexion.connect(function (error) {
    if (error) {
        throw error
    } else {
        console.log("Estás requetefuerte haz podido conectar la db (DATABASE : Becas)")
    }
})


//CONEXION A DATABASE Auth
// conexionAuth.connect(function (error) {
//     if (error) {
//         throw error
//     } else {
//         console.log("You're the Mr Olympia")
//     }
// })

// app.get('/', function (req, res) {
//     res.render("home");
// })

app.get('/login', (req, res) => {
    res.render("login");
})

app.get('/register', (req, res) => {
    res.render("register");
})

// app.get('/becas', (req, res) => {
//     res.render("becas");
// })



//BECAS
app.get('/api/trabajo:id', (req, res) => {
    conexion.query('SELECT * FROM trabajo WHERE id = ?', [req.params.id], (error, filas) => {
        if (error) {
            throw error
        } else {
            res.send(filas)
        }
    })
})

app.get('/api/trabajo', (req, res) => {
    conexion.query('SELECT * FROM trabajo WHERE id_taxidriver = ?', [req.params.id], (error, filas) => {
        if (error) {
            throw error
        } else {
            res.send(filas)
        }
    })
})

// //BECAS
// app.get('/api/becas/:id', (req, res) => {
//     conexionBecas.query('SELECT * FROM becas id = ?', [req.params.id], (error, fila) => {
//         if (error) {
//             throw error
//         } else {
//             res.send(fila)
//         }
//     })
// })



//BECAS
app.post('/api/trabajo', (req, res) => {
    let data = { 
        fecha: req.body.fecha, 
        trabajo: req.body.trabajo, 
        email: req.body.email
        // requisitos: req.body.requisitos, 
        // dotacion: req.body.dotacion, 
        // masinfo: req.body.masinfo,
        // id_user: req.body.id_user
    }
    let sql = "INSERT INTO trabajo SET ?"
    conexion.query(sql, data, function (err, result) {
        if (err) {
            throw err
        } else {
            /*Esto es lo nuevo que agregamos para el CRUD con Javascript*/
            Object.assign(data, { id: result.insertId, id_Taxista: result.insertId }) //agregamos el ID al objeto data             
            res.send(data) //enviamos los valores                         
        }
    })
})


//BECAS
app.put('/api/trabajo/:id', (req, res) => {
    let id = req.params.id
    let id_taxidriver = req.params.id_taxidriver
    let fecha = req.body.fecha
    let trabajo = req.body.trabajo
    let email = req.body.email
    // let requisitos = req.body.requisitos
    // let dotacion = req.body.dotacion
    // let masinfo = req.body.masinfo
    // let id_user = req.body.id_user
    let sql = "UPDATE trabajo SET fecha = ?, trabajo = ?, email = ? , id_taxidriver = ? WHERE id = ?"
    conexion.query(sql, [fecha, trabajo, email, id_taxidriver, id], function (error, results) {
        if (error) {
            throw error
        } else {
            res.send(results)
        }
    })
})



// const puerto = process.env.PUERTO || 3000
// app.listen(puerto, function(){
//     console.log("Servidor Ok en puerto:"+puerto)
// })

//BECAS
app.delete('/api/trabajo/:id', (req, res) => {
    conexion.query('DELETE FROM trabajo WHERE id = ?', [req.params.id_taxidriver], function (error, filas) {
        if (error) {
            throw error
        } else {
            res.send(filas)
        }
    })
})




//FORMULARIO DE REGISTRO
app.post("/register", async (req, res) => {
    const id = req.body.id;
    const nombre = req.body.nombre;
    const apellido1 = req.body.apellido1;
    const apellido2 = req.body.apellido2;
    const email = req.body.email;
    const pass = req.body.pass;

    let passwordHash = await bcrypt.hash(pass, 8)

    conexion.query("INSERT INTO taxidriver SET ?", { Nombre: nombre, Apellido1: apellido1, Apellido2: apellido2, Email: email, pass: passwordHash }, async (error, results) => {
        if (error) {
            console.log(error)
        } else {
            res.render("register", {
                alert: true,
                alertTitle: "Registration",
                alertMessage: "!Successful Registration!",
                alertIcon: "success",
                showConfirmButton: "false",
                timer: 1500,
                ruta: "login"
            })
        }
    }) //en el pass:passwordHash ponemos passwordHash para que nos lo guarde en la base de datos el valor ya encriptado
})


// const user_id = 0;

// console.log(user)
//FORMULARIO DE INICIO SESION
app.post("/auth", async (req, res) => {
    // user_id: req.body.id
    const nombre = req.body.nombre;
    const pass = req.body.pass;
    let passwordHash = await bcrypt.hash(pass, 8)

    if(nombre && pass) {
        conexion.query("SELECT * FROM `taxidriver` WHERE `Nombre` = ? ", [nombre], async (error, results) => {
            // console.log(id)
            if(results.length == 0 || !(await bcrypt.compare(pass, results[0].pass))) {
                // console.log(results[0]) el result[0] quiere decir que almacena todos los datos que coje por el nombre de usuario en el results, entonces como en una consulta solo habra un dato por eso compara con el result[0] porque como hay un dato el index sera 0
                res.render("login", {
                    alert: true,
                    alertTitle: "Error",
                    alertMessage: "Usuario y/o password incorrectos",
                    alertIcon: "error",
                    showConfirmButton: true,
                    timer: false,
                    ruta: "login"
                })
            }else {
                req.session.loggedin = true;
                req.session.nombre = results[0].nombre;
                res.render("login", {
                    alert: true,
                    alertTitle: "Conexion Exitosa",
                    alertMessage: "!Login Correcto!",
                    alertIcon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                    ruta: ""
                })            
            }
        })
    }else {
        res.render("login", {
            alert: true,
            alertTitle: "Advertencia",
            alertMessage: "Por favor ingresa un usuario y/o contraseña!",
            alertIcon: "warning",
            showConfirmButton: true,
            timer: false,
            ruta: "login"
        })   
    }

})

//AUTENTICAR EN LAS DEMÁS PÁGINAS QUE ESTA LOGGED IN
app.get("/", (req, res) => {
    if(req.session.loggedin) {
        res.render("home", {
            login: true,
            nombre: req.session.nombre
        });
    }else {
        res.render("home", {
            login: false,
            nombre: "debe iniciar sesion"
        })
    }
})

app.get("/becas", (req, res) => {
    if(req.session.loggedin) {
        res.render("becas", {
            login: true,
            nombre: req.session.nombre
        });
    }else {
        res.render("becas", {
            login: false,
            nombre: "debe iniciar sesion"
        })
    }
})


app.get("/becasUsuario", (req, res) => {
    if(req.session.loggedin) {
        res.render("becasUsuario", {
            login: true,
            nombre: req.session.nombre
        });
    }else {
        res.render("becasUsuario", {
            login: false,
            nombre: "debe iniciar sesion"
        })
    }
})

app.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/")
    })
})

    const puerto = process.env.PUERTO || 3000
    app.listen(puerto, function () {
        console.log("Servidor Ok en puerto:" + puerto)
    })




