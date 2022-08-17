// const url = "http://localhost:3000/api/empresas/"
// const contenedor = document.getElementById("tablebodyEmpresas")
// let resultados = ""
// const nombre = document.getElementById("nombre")
// const direccion = document.getElementById("direccion")
// const tipo = document.getElementById("tipo")
// const responsable = document.getElementById("responsable")
// const email = document.getElementById("email")
// const telefono = document.getElementById("telefono")


const urlBecas = "http://localhost:3000/api/becas/"
const contenedorBecas = document.getElementById("tablebodyBecas")
let resultadosBecas = ""
const formBeca = document.getElementById("formBeca")
const modalBecas = new bootstrap.Modal(document.getElementById('modalBeca'))
const descripcion = document.getElementById("descripcion")
const destinatarios = document.getElementById("destinatarios")
const numeroplazas = document.getElementById("numeroplazas")
const requisitos = document.getElementById("requisitos")
const dotacion = document.getElementById("dotacion")
const masinfo = document.getElementById("masinfo")
let opcion = ""

// const urlLogin = "http://localhost:3000/login/"

const inputBuscar = document.getElementById("buscar")
const celdas = document.getElementsByClassName("filas")
const ths = document.getElementsByClassName("ths")

inputBuscar.addEventListener("keyup", (e) => {

    // ths.style.display = "none"

    
    let texto = e.target.value
    let er = new RegExp(texto, "i")
    for(let i=0; i<celdas.length; i++) {
        let valor = celdas[i]
        // console.log(valor)
        
        if(er.test(valor.innerText)){
            valor.classList.remove("ocultar")
        }else {
            console.log(valor)
            // ths.classList.add("ocultar")
            valor.classList.add("ocultar")
        }
    }


})


// btnCrear.addEventListener("click", () => {
//     descripcion.value = "";
//     destinatarios.value = "";
//     numeroplazas.value = "";
//     requisitos.value = "";
//     dotacion.value = "";
//     masinfo.value = "";
//     modalBecas.show()
//     opcion = "crear"
// })

//funcion para mostrar los resultados
// const mostrar = (empresas) => {
//     empresas.forEach(empresa => {
//         resultados += `
//                         <tr>
//                             <td>${empresa.id}</td>
//                             <td>${empresa.nombre}</td>
//                             <td>${empresa.direccion}</td>
//                             <td>${empresa.tipo}</td>
//                             <td>${empresa.responsable}</td>
//                             <td>${empresa.email}</td>
//                             <td>${empresa.telefono}</td>
//                         </tr>
//         `
//     });
//     contenedor.innerHTML = resultados
// }

//becas funcion mostrar
const mostrarBecas = (becas) => {
    becas.forEach(beca => {
        resultadosBecas += `
                        <tr class="filas">
                            <td>${beca.id}</td>
                            <td>${beca.descripcion}</td>
                            <td>${beca.destinatarios}</td>
                            <td>${beca.numeroplazas}</td>
                            <td>${beca.requisitos}</td>
                            <td>${beca.dotacion}</td>
                            <td>${beca.masinfo}</td>
                        </tr>
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


fetch(urlBecas)
    .then(resp => resp.json()) //meaning --> when you try to fetch(obtener) data from a server, it will send you a RESPONSE which contains tons of irrelevant information. To target only the BODY part information of the response and to convert it from JSON to javascript, you use res. json().
    // .then(resp => console.log(resp.json()))
    // .then(data => console.log(data))
    .then(data => mostrarBecas(data))
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

    alertify.confirm("This is a confirm dialog.",
        function () {
            fetch(urlBecas + id, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(() => location.reload())
            //alertify.success('Ok')
        },
        function () {
            alertify.error('Cancel')
        })
})

//Procedimiento de boton editar, solo mostrara los mismos campos en los inputs del modal, no dejara guardar esta funcion

let idForm = 0;
on(document, "click", ".btnEditar", e => {
    const fila = e.target.parentNode.parentNode //nos selecciona toda la fila
    console.log(fila)
    idForm = fila.children[0].innerHTML //estamos capturando el child 0 que seria el id, esta es la segunda manera tambien se podria de la primera que hemos hecho en la funcion de arriba
    console.log(idForm)
    const descripcionForm = fila.children[1].innerHTML //estamos capturando el child 1 que seria la descripcion, el child 2 seria el numero, y el 3 provincia
    //console.log(direccionForm)
    const destinatariosForm = fila.children[2].innerHTML //estamos capturando el child 1 que seria la descripcion, el child 2 seria el numero, y el 3 provincia
    //console.log(numeroForm)
    const numeroplazasForm = fila.children[3].innerHTML //estamos capturando el child 1 que seria la descripcion, el child 2 seria el numero, y el 3 provincia
    //console.log(provinciaForm)
    //console.log(`ID: ${idForm} , direccion: ${direccionForm}, numero: ${numeroForm}, provincia: ${provinciaForm}`)
    const requisitosForm = fila.children[4].innerHTML //estamos capturando el child 1 que seria la descripcion, el child 2 seria el numero, y el 3 provincia
    const dotacionForm = fila.children[5].innerHTML //estamos capturando el child 1 que seria la descripcion, el child 2 seria el numero, y el 3 provincia
    const masinfoForm = fila.children[6].innerHTML //estamos capturando el child 1 que seria la descripcion, el child 2 seria el numero, y el 3 provincia

    descripcion.value = descripcionForm
    destinatarios.value = destinatariosForm
    numeroplazas.value = numeroplazasForm
    requisitos.value = requisitosForm
    dotacion.value = dotacionForm
    masinfo.value = masinfoForm
    opcion = "editar"
    modalBecas.show()
})

//Procedimiento para crear y guardar inputs
formBeca.addEventListener("submit", (e) => {
    e.preventDefault()

    if (opcion == "crear") {
        //console.log("opcion crear")
        fetch(urlBecas, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                descripcion: descripcion.value,
                destinatarios: destinatarios.value,
                numeroplazas: numeroplazas.value,
                requisitos: requisitos.value,
                dotacion: dotacion.value,
                masinfo: masinfo.value,

            })
        })
            .then(resp => resp.json())
            .then(data => {
                const nuevabeca = []
                nuevabeca.push(data)
                mostrarBecas(nuevabeca)
            })
    }

    if (opcion == "editar") {
        console.log("opcion editar")
        console.log(urlBecas+idForm)
        fetch(urlBecas + idForm, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                descripcion: descripcion.value,
                destinatarios: destinatarios.value,
                numeroplazas: numeroplazas.value,
                requisitos: requisitos.value,
                dotacion: dotacion.value,
                masinfo: masinfo.value,

            })
        })
            .then(resp => resp.json())
            .then(resp => location.reload())
    }

    modalBecas.hide()
})
