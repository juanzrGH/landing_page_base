// ======== VARIABLES ========
let carrito = [];

// ======== AGREGAR PRODUCTO ========
function agregarAlCarrito(nombre, precio) {
  let producto = carrito.find(item => item.nombre === nombre);
  if (producto) {
    producto.cantidad++;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }
  mostrarCarrito();
}

// ======== MOSTRAR CARRITO ========
function mostrarCarrito() {
  let tabla = document.querySelector("#tablaCarrito tbody");
  tabla.innerHTML = "";
  let subtotalGeneral = 0;

  carrito.forEach((item, index) => {
    let subtotal = item.precio * item.cantidad;
    subtotalGeneral += subtotal;

    tabla.innerHTML += `
      <tr>
        <td>${item.nombre}</td>
        <td>$${item.precio.toLocaleString()}</td>
        <td><input type="number" min="1" value="${item.cantidad}" onchange="cambiarCantidad(${index}, this.value)"></td>
        <td>$${subtotal.toLocaleString()}</td>
        <td><button class="btn-eliminar" onclick="eliminarProducto(${index})">X</button></td>
      </tr>
    `;
  });

  // Descuento automático 10% si supera $200,000
  let descuento = subtotalGeneral > 200000 ? subtotalGeneral * 0.1 : 0;
  let totalFinal = subtotalGeneral - descuento;

  document.getElementById("subtotal").innerText = subtotalGeneral.toLocaleString();
  document.getElementById("descuento").innerText = descuento.toLocaleString();
  document.getElementById("total").innerText = totalFinal.toLocaleString();
}

// ======== CAMBIAR CANTIDAD ========
function cambiarCantidad(index, cantidad) {
  carrito[index].cantidad = parseInt(cantidad);
  mostrarCarrito();
}

// ======== ELIMINAR PRODUCTO ========
function eliminarProducto(index) {
  carrito.splice(index, 1);
  mostrarCarrito();
}

// ======== FINALIZAR PEDIDO ========
function finalizarPedido() {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  const direccion = document.getElementById("direccion").value;
  if (!direccion) {
    alert("Por favor ingresa tu dirección de envío.");
    return;
  }

  const metodo = document.querySelector("input[name='metodoPago']:checked");
  if (!metodo) {
    alert("Selecciona un método de pago.");
    return;
  }

  let detalle = carrito.map(item => `${item.nombre} x${item.cantidad} = $${(item.precio * item.cantidad).toLocaleString()}`).join("\n");
  let subtotalGeneral = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  let descuento = subtotalGeneral > 200000 ? subtotalGeneral * 0.1 : 0;
  let totalFinal = subtotalGeneral - descuento;

  if (metodo.value === "pse") {
    window.location.href = "https://www.pse.com.co"; // Aquí integras el portal real de PSE
  } else {
    document.getElementById("datosTransferencia").style.display = "block";
    alert("Tu pedido:\n" + detalle + "\nSubtotal: $" + subtotalGeneral.toLocaleString() + "\nDescuento: $" + descuento.toLocaleString() + "\nTotal: $" + totalFinal.toLocaleString() + "\n\nMétodo de pago: Transferencia Bancaria\nDirección de envío: " + direccion);
  }
}
