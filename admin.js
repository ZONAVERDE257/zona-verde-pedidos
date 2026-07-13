document.addEventListener("DOMContentLoaded", () => {
  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
  const tabla = document.getElementById("tablaPedidos");

  if (!tabla) return;

  if (pedidos.length === 0) {
    tabla.innerHTML = "<tr><td colspan='5'>No hay pedidos.</td></tr>";
    return;
  }

  pedidos.forEach((pedido, index) => {
    const fila = `
      <tr>
        <td>${pedido.nombre}</td>
        <td>${pedido.telefono}</td>
        <td>${pedido.direccion}</td>
        <td>${pedido.producto}</td>
        <td>
          <button onclick="eliminarPedido(${index})">
            Eliminar
          </button>
        </td>
      </tr>
    `;
    tabla.innerHTML += fila;
  });
});

function eliminarPedido(index) {
  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
  pedidos.splice(index, 1);
  localStorage.setItem("pedidos", JSON.stringify(pedidos));
  location.reload();
}
