// ===============================
// INICIALIZACIÓN DEL CARRITO
// ===============================
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let total = 0;

// Elementos comunes en las páginas
const contador = document.getElementById("contador");
const listaCarrito = document.getElementById("lista-carrito");
const totalPrecio = document.getElementById("total-precio");

// Actualizar el contador del carrito apenas carga la página
actualizarContadorGlobal();

// ===============================
// 1. FUNCIONALIDAD EN INDEX.HTML (AGREGAR)
// ===============================
const botonesAgregar = document.querySelectorAll(".btn-agregar");

botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", () => {
        const card = boton.closest(".card");
        if (!card) return;

        const nombre = card.querySelector("h3").textContent;
        const precioTexto = card.querySelector(".precio").textContent;
        const precio = Number(precioTexto.replace(/\D/g, ""));

        // Agregar producto al array
        carrito.push({ nombre, precio });

        // Guardar en localStorage
        localStorage.setItem("carrito", JSON.stringify(carrito));

        // Actualizar contador visual
        actualizarContadorGlobal();

        // Alerta o feedback visual opcional
        alert(`¡Agregaste "${nombre}" al carrito! 🛒`);
    });
});

function actualizarContadorGlobal() {
    if (contador) {
        contador.textContent = carrito.length;
    }
}

// ===============================
// 2. FUNCIONALIDAD EN CARRITO.HTML
// ===============================
function actualizarCarrito() {
    if (!listaCarrito) return;

    listaCarrito.innerHTML = "";
    total = 0;

    if (carrito.length === 0) {
        listaCarrito.innerHTML = "<p style='text-align:center; padding: 20px;'>Tu carrito está vacío.</p>";
    }

    carrito.forEach((producto, index) => {
        total += producto.precio;

        const li = document.createElement("li");
        li.innerHTML = `
            <span>
                <strong>${producto.nombre}</strong>
                - $${producto.precio.toLocaleString()}
            </span>
            <button class="eliminar" onclick="eliminarProducto(${index})">
                ❌
            </button>
        `;
        listaCarrito.appendChild(li);
    });

    if (totalPrecio) {
        totalPrecio.textContent = "$" + total.toLocaleString();
    }

    actualizarContadorGlobal();
    actualizarResumenPedido();
}

function eliminarProducto(index) {
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}
window.eliminarProducto = eliminarProducto;

function vaciarCarrito() {
    carrito = [];
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}
window.vaciarCarrito = vaciarCarrito;

function actualizarResumenPedido() {
    const resumen = document.getElementById("resumen-productos");
    const resumenTotal = document.getElementById("resumen-total");

    if (!resumen || !resumenTotal) return;

    resumen.innerHTML = "";
    let totalPedido = 0;

    if (carrito.length === 0) {
        resumen.innerHTML = "Tu carrito está vacío.";
        resumenTotal.textContent = "$0";
        return;
    }

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

    resumenTotal.textContent = "$" + totalPedido.toLocaleString();
}

// Ejecutar actualización de carrito si estamos en la página del carrito
if (listaCarrito) {
    actualizarCarrito();
}

// ===============================
// 3. FORMULARIO Y WHATSAPP
// ===============================
const btnWhatsapp = document.getElementById("comprar-whatsapp");
const formularioPedido = document.getElementById("formulario-pedido");

if (btnWhatsapp) {
    btnWhatsapp.addEventListener("click", () => {
        if (carrito.length === 0) {
            alert("Tu carrito está vacío. Agrega productos antes de continuar.");
            return;
        }

        if (formularioPedido) {
            actualizarResumenPedido();
            formularioPedido.scrollIntoView({ behavior: "smooth" });
        }
    });
}

const formPedido = document.getElementById("form-pedido");

if (formPedido) {
    formPedido.addEventListener("submit", (e) => {
        e.preventDefault();

        if (carrito.length === 0) {
            alert("Tu carrito está vacío.");
            return;
        }

        const nombre = document.getElementById("nombre").value;
        const telefono = document.getElementById("telefono").value;
        const direccion = document.getElementById("direccion").value;
        const pago = document.getElementById("pago").value;
        const observaciones = document.getElementById("observaciones").value;

        let productosTexto = "";
        carrito.forEach((producto) => {
            productosTexto += `• ${producto.nombre} - $${producto.precio.toLocaleString()}\n`;
        });

        const totalPedido = carrito.reduce((suma, producto) => suma + producto.precio, 0);

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

        const numeroWhatsApp = "573001234567"; // Reemplaza con tu número real
        const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

        window.open(url, "_blank");
    });
}

// ===============================
// OTROS EFECTOS VISUALES
// ===============================
const botonComprar = document.querySelector(".hero button");
if (botonComprar) {
    botonComprar.addEventListener("click", () => {
        const productos = document.querySelector("#productos");
        if (productos) {
            productos.scrollIntoView({ behavior: "smooth" });
        }
    });
}

console.log("GomiCham cargado correctamente.");