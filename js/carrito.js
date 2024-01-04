//variables
const carrito = document.querySelector('#carrito');
const cursos = document.querySelector('#lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
//listeners
cargarEventListeners();

function cargarEventListeners(){
    //funciona cuando se clickea agregar al carrito
    cursos.addEventListener('click', comprarCurso);

    //Eliminar curso del carrito
    carrito.addEventListener('click', eliminarCurso);

    //al vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
};

//funciones
//funcion que añader el curso al carrito
function comprarCurso(e){
    e.preventDefault();
    //delegation para agregar-carrito
    if(e.target.classList.contains('agregar-carrito')){
    const curso = e.target.parentElement.parentElement;
    //enviamos el curso seleccionado
    leerDatosCurso(curso); 
    }
};
// Leer datos del curso
function leerDatosCurso (curso) {
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')

    }
    insertarCarrito(infoCurso);
}
//funcion para mostrar el curso seleccionado en el carrito
function insertarCarrito(curso){
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${curso.imagen}" width=100>
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>
    `;
    listaCursos.appendChild(row);
};
//funcion para eliminar curso del carrito
function eliminarCurso(e) {
    e.preventDefault();

    let curso;
    if(e.target.classList.contains('borrar-curso')){
        e.target.parentElement.parentElement.remove();
    }
};
//vaciar el carrito de compras
function vaciarCarrito(){
    while(listaCursos.firstChild){
        listaCursos.removeChild(listaCursos.firstChild);
    }
    return false;
};