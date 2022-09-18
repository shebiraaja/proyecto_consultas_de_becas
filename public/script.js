// const url = "http://localhost:3000/api/empresas/"
// const contenedor = document.getElementById("tablebodyEmpresas")
// let resultados = ""
// const nombre = document.getElementById("nombre")
// const direccion = document.getElementById("direccion")
// const tipo = document.getElementById("tipo")
// const responsable = document.getElementById("responsable")
// const email = document.getElementById("email")
// const telefono = document.getElementById("telefono")


const urlTrabajo = "http://localhost:3000/api/trabajo/"
const contenedorBecas = document.getElementById("tablebodyBecas")
let resultadosBecas = ""
const formBeca = document.getElementById("formBeca")
const modalBecas = new bootstrap.Modal(document.getElementById('modalBeca'))
const fecha = document.getElementById("fecha")
const trabajo = document.getElementById("trabajo")
const email = document.getElementById("email")
// const requisitos = document.getElementById("requisitos")
// const dotacion = document.getElementById("dotacion")
// const masinfo = document.getElementById("masinfo")
// const id_user = document.getElementById("id_user")
let opcion = ""

// const urlLogin = "http://localhost:3000/login/"

const btnCrear = document.getElementById("btnCrear")

btnCrear.addEventListener("click", () => {
    fecha.value = "";
    trabajo.value = "";
    email.value = "";
    // requisitos.value = "";
    // dotacion.value = "";
    // masinfo.value = "";
    // id_user.value = "";
    modalBecas.show()
    opcion = "crear"
})

//funcion para mostrar los resultados
// const mostrar = (empresas) => {
//     empresas.forEach(empresa => {
//         resultados += `
//                         <tr>
//                             <td>${empresa.fecha}</td>
//                             <td>${empresa.trabajo}</td>
//                             <td>${empresa.email}</td>
//                         </tr>
//         `
//     });
//     contenedor.innerHTML = resultados
// }

//becas funcion mostrar
const mostrarTrabajo = (becas) => {
    becas.forEach(beca => {
        resultadosBecas += `
                        <tbody>
                        <tr>
                            <td>${beca.id}</td>
                            <td>${beca.fecha}</td>
                            <td>${beca.trabajo}</td>
                            <td>${beca.email}</td>
                        </tr>
                            <td class="text-center"><a class="mb-3 btnEditar btn btn-primary">Editar</a>  <a class="btnBorrar btn btn-danger">Eliminar</a> </td>
                        </tbody>
        `
    });
    contenedorBecas.innerHTML = resultadosBecas
}

//procedimiento para mostrar los datos
// fetch(url)
//     .then(resp => resp.json()) //meaning --> when you try to fetch(obtener) data from a server, it will send you a RESPONSE which contains tons of irrelevant information. To target only the BODY part information of the response and to convert it from JSON to javascript, you use res. json().
//     // .then(resp => console.log(resp.json()))
//     // .then(data => console.log(data))
//     .then(data => mostrar(data))
//     .catch(error => console.log(error))


fetch(urlTrabajo)
    .then(resp => resp.json()) //meaning --> when you try to fetch(obtener) data from a server, it will send you a RESPONSE which contains tons of irrelevant information. To target only the BODY part information of the response and to convert it from JSON to javascript, you use res. json().
    // .then(resp => console.log(resp.json()))
    // .then(data => console.log(data))
    .then(data => mostrarTrabajo(data))
    .catch(error => console.log(error))

//Procedimiento de conseguir pulsar en boton eliminar
const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e)
        }
    })
}

//Procedimiento de borrar

on(document, "click", ".btnBorrar", e => {
    const fila = e.target.parentNode.parentNode //nos selecciona toda la fila
    // console.log(fila)
    const id = fila.firstElementChild.innerHTML //nos trae el id, si no ponemos innerHTML nos dará el id pero con lo HTML tags tambien
    // console.log(id)

    alertify.confirm("Eliminar","¿Estas seguro que quieres eliminar esta fila?",
        function () {
            fetch(urlTrabajo + id, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(() => location.reload())
            //alertify.success('Ok')
        },
        function () {
            alertify.error('Cancelado')
        })
})

//Procedimiento de boton editar, solo mostrara los mismos campos en los inputs del modal, no dejara guardar esta funcion

let idForm = 0;
on(document, "click", ".btnEditar", e => {
    const fila = e.target.parentNode.parentNode //nos selecciona toda la fila
    console.log(fila)
    idForm = fila.children[0].innerHTML //estamos capturando el child 0 que seria el id, esta es la segunda manera tambien se podria de la primera que hemos hecho en la funcion de arriba
    console.log(idForm)
    const fechaForm = fila.children[1].innerHTML //estamos capturando el child 1 que seria la descripcion, el child 2 seria el numero, y el 3 provincia
    //console.log(direccionForm)
    const trabajoForm = fila.children[2].innerHTML //estamos capturando el child 1 que seria la descripcion, el child 2 seria el numero, y el 3 provincia
    //console.log(numeroForm)
    const emailForm = fila.children[3].innerHTML //estamos capturando el child 1 que seria la descripcion, el child 2 seria el numero, y el 3 provincia
    //console.log(provinciaForm)
    //console.log(`ID: ${idForm} , direccion: ${direccionForm}, numero: ${numeroForm}, provincia: ${provinciaForm}`)
    // const requisitosForm = fila.children[4].innerHTML //estamos capturando el child 1 que seria la descripcion, el child 2 seria el numero, y el 3 provincia
    // const dotacionForm = fila.children[5].innerHTML //estamos capturando el child 1 que seria la descripcion, el child 2 seria el numero, y el 3 provincia
    // const masinfoForm = fila.children[6].innerHTML //estamos capturando el child 1 que seria la descripcion, el child 2 seria el numero, y el 3 provincia

    fecha.value = fechaForm
    trabajo.value = trabajoForm
    email.value = emailForm
    // requisitos.value = requisitosForm
    // dotacion.value = dotacionForm
    // masinfo.value = masinfoForm
    opcion = "editar"
    modalBecas.show()
})

//Procedimiento para crear y guardar inputs
formBeca.addEventListener("submit", (e) => {
    e.preventDefault()

    if (opcion == "crear") {
        //console.log("opcion crear")
        fetch(urlTrabajo, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fecha: fecha.value,
                trabajo: trabajo.value,
                email: email.value,
                // requisitos: requisitos.value,
                // dotacion: dotacion.value,
                // masinfo: masinfo.value,
                // id_user: id_user.value,

            })
        })
            .then(resp => resp.json())
            .then(data => {
                const nuevabeca = []
                nuevabeca.push(data)
                mostrarTrabajo(nuevabeca)
            })
    }

    if (opcion == "editar") {
        console.log("opcion editar")
        console.log(urlTrabajo+idForm)
        fetch(urlTrabajo + idForm, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fecha: fecha.value,
                trabajo: trabajo.value,
                email: email.value,

            })
        })
            .then(resp => resp.json())
            .then(resp => location.reload())
    }

    modalBecas.hide()
})
