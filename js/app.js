// #### VARIABLES ####
const cart = document.querySelector('#cart');
const courseList = document.querySelector('#courseList');
const cartContainer = document.querySelector('#cartList tbody');
const emptyCartBtn = document.querySelector('#emptyCartBtn');
// Carrito vacio
let cartItems = [];

// #### Funcion que registra todos los listener ####
logEventListener();
function logEventListener() {

    courseList.addEventListener('click', addCourse);

    cart.addEventListener('click', deleteCourse);

    emptyCartBtn.addEventListener('click', emptyCart);
}

// ##### FUNCIONES DE LOS LISTENERS#####
// Agrega un curso al carrito
function addCourse(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const selectedCourse = e.target.parentElement.parentElement
        readDataCourse(selectedCourse);
    }
}
// Elimina un curso del carrito
function deleteCourse(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const courseId = e.target.getAttribute('data-id');

        // Elimina del arreglo por el data-id
        cartItems = cartItems.filter(course => course.id !== courseId);

        showHtmlCart(); // Iterar sobre el carrito y mostrar su html 
    }
}

function emptyCart() {
    cartItems = []; //Reseteamos el arreglo
    cleanHtml();
}

// #### FUNCIONES ####
// Lee el contenido del html al que le dimos click y extrae la informacion del curso
function readDataCourse(course) {
    // console.log(selectedCourse)

    // Crear objeto con el contenido del curso actual
    const courseInfo = {
        image: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector('.precio span').textContent,
        id: course.querySelector('a').getAttribute('data-id'),
        amount: 1
    }

    //Revisa si un elemento ya existe en el carrito
    const existsItem = cartItems.some(course => course.id === courseInfo.id);

    if (existsItem) {
        // Actualizar la cantidad
        const courses = cartItems.map(course => {
            if (course.id === courseInfo.id) {
                course.amount++;
                return course; // Retorna el objeto actualizado
            } else {
                return course; // Retorna los objetos que no son los duplicados
            }
        });
        cartItems = [...courses];
    } else {
        // Agrega elementos al arreglo de carrito
        cartItems = [...cartItems, courseInfo];
    }




    console.log(cartItems);

    showHtmlCart()
}

// Muestra el carrito en el html
function showHtmlCart() {

    // Limpiar el html previo
    cleanHtml();

    // Recorre el carrito y genera el html
    cartItems.forEach(item => {
        const { image, title, price, amount, id } = item;

        const row = document.createElement('tr');

        row.innerHTML = `
            <td><img src="${image}" width="100"</img></td>
            <td>${title}</td>
            <td>${price}</td>
            <td>${amount}</td>
            <td><a href="#" class="borrar-curso" data-id="${id}">X</a></td>

        `;

        // Agrega el html del carrito en el tbody
        cartContainer.appendChild(row);
    })
}

// Elimina los items o cursos duplicados
function cleanHtml() {
    // Forma lenta
    // cartContainer.innerHTML = '';

    // Forma rapida
    while (cartContainer.firstChild) {
        cartContainer.removeChild(cartContainer.firstChild)
    }
}