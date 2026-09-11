const botonesAgregar = document.querySelectorAll(".btn-agregar");

const listaCarrito = document.getElementById("lista-carrito");

const contador = document.getElementById("contador");

const totalPrecio = document.getElementById("total-precio");

const btnVaciar = document.getElementById("vaciar-carrito");


const btnWhatsapp = document.getElementById("comprar-whatsapp");
const formularioPedido = document.getElementById("formulario-pedido");

if(btnWhatsapp){

    btnWhatsapp.addEventListener("click", () => {

        if(carrito.length === 0){

            alert("Tu carrito está vacío. Agrega productos antes de continuar.");

            return;
        }

        actualizarResumenPedido();

        formularioPedido.scrollIntoView({
            behavior:"smooth"
        });

    });

}

function actualizarResumenPedido(){

    const resumen = document.getElementById("resumen-productos");
    const resumenTotal = document.getElementById("resumen-total");

    resumen.innerHTML = "";

    let totalPedido = 0;

    carrito.forEach((producto) => {

        totalPedido += producto.precio;

        const productoHTML = document.createElement("div");

        productoHTML.classList.add("producto-resumen");

        productoHTML.innerHTML = `
            <span>${producto.nombre}</span>
            <strong>$${producto.precio.toLocaleString()}</strong>
        `;

        resumen.appendChild(productoHTML);

    });

    resumenTotal.textContent =
        "$" + totalPedido.toLocaleString();

}


const formPedido = document.getElementById("form-pedido");

formPedido.addEventListener("submit", (e) => {

    e.preventDefault();

    if(carrito.length === 0){

        alert("Tu carrito está vacío.");

        return;
    }

    const nombre =
        document.getElementById("nombre").value;

    const telefono =
        document.getElementById("telefono").value;

    const direccion =
        document.getElementById("direccion").value;

    const pago =
        document.getElementById("pago").value;

    const observaciones =
        document.getElementById("observaciones").value;



    let productosTexto = "";

    carrito.forEach((producto) => {

        productosTexto +=
            `• ${producto.nombre} - $${producto.precio.toLocaleString()}\n`;

    });


    let totalPedido = 0;

    carrito.forEach((producto) => {

        totalPedido += producto.precio;

    });


    const mensaje =

`Hola, GomiCham. Quiero realizar el siguiente pedido:

👤 Nombre: ${nombre}

📱 Teléfono: ${telefono}

📍 Dirección: ${direccion}

🛍️ Productos:
${productosTexto}
💰 Total: $${totalPedido.toLocaleString()}

💳 Método de pago: ${pago}

📝 Observaciones:
${observaciones || "Ninguna"}

¡Gracias!`;


    const numeroWhatsApp = "+57**********";


    const url =
        `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;


    window.open(url, "_blank");

});


let carrito = [];

let total = 0;



botonesAgregar.forEach((boton)=>{

    boton.addEventListener("click",()=>{

        const card = boton.parentElement;

        const nombre = card.querySelector("h3").textContent;

        const precioTexto = card.querySelector(".precio").textContent;

        const precio = Number(precioTexto.replace("$","").replace(".",""));

        carrito.push({

            nombre,

            precio

        });

        actualizarCarrito();

    });

});


function actualizarCarrito(){

    listaCarrito.innerHTML="";

    total=0;

    carrito.forEach((producto,index)=>{

        total += producto.precio;

        const li = document.createElement("li");

        li.innerHTML=`

            <span>

                <strong>${producto.nombre}</strong>

                - $${producto.precio.toLocaleString()}

            </span>

            <button class="eliminar"

            onclick="eliminarProducto(${index})">

            ❌

            </button>

        `;

        listaCarrito.appendChild(li);

    });


    contador.textContent = carrito.length;
    actualizarResumenPedido()
    totalPrecio.textContent = "$"+total.toLocaleString();


}

function vaciarCarrito(){
        carrito=[];
        actualizarCarrito();
    }

function eliminarProducto(index){

    carrito.splice(index,1);

    actualizarCarrito();

}

window.eliminarProducto = eliminarProducto;

const menuBtn = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");

if (menuBtn && nav) {

    menuBtn.addEventListener("click", () => {

        nav.classList.toggle("activo");
        menuBtn.classList.toggle("activo");

    });

}


const elementos = document.querySelectorAll(
    ".card, .beneficio, .comentario, .nosotros-contenido"
);

const mostrarElementos = () => {

    elementos.forEach((elemento) => {

        const posicion = elemento.getBoundingClientRect().top;

        if (posicion < window.innerHeight - 100) {

            elemento.classList.add("mostrar");

        }

    });

};

window.addEventListener("scroll", mostrarElementos);
window.addEventListener("load", mostrarElementos);


const botonComprar = document.querySelector(".hero button");

if (botonComprar) {

    botonComprar.addEventListener("click", () => {

        document.querySelector("#productos").scrollIntoView({

            behavior: "smooth"

        });

    });

}

const botonSubir = document.querySelector(".volver-arriba");

window.addEventListener("scroll", () => {

    if (!botonSubir) return;

    if (window.scrollY > 500) {

        botonSubir.classList.add("mostrar");

    } else {

        botonSubir.classList.remove("mostrar");

    }

});

if (botonSubir) {

    botonSubir.addEventListener("click", () => {

        window.scrollTo({

            top: 0,
            behavior: "smooth"

        });

    });

}

console.log("GomiCham cargado correctamente.");
