async function cargarProductos() {
  const respuesta = await fetch("productos.json");
  const productos = await respuesta.json();

  const contenedor = document.getElementById("menu");

  if (!contenedor) return;

  contenedor.innerHTML = "";

  const categorias = {};

  productos.forEach(producto => {
    if (!categorias[producto.categoria]) {
      categorias[producto.categoria] = [];
    }
    categorias[producto.categoria].push(producto);
  });

  for (const categoria in categorias) {
    const seccion = document.createElement("section");
    seccion.className = "categoria";

    seccion.innerHTML = `
      <h2>${categoria}</h2>
      <div class="productos">
        ${categorias[categoria].map(p => `
          <div class="producto">
            <h3>${p.nombre}</h3>
            <p>${p.descripcion}</p>
            <strong>$${p.precio.toLocaleString("es-CO")}</strong><br><br>
            <div class="controles">
  <button onclick="cambiarCantidad('${p.nombre}', -1)">➖</button>

  <span id="cant-${p.nombre.replace(/\s+/g,'-')}">0</span>

  <button onclick="cambiarCantidad('${p.nombre}', 1)">➕</button>
</div>
          </div>
        `).join("")}
      </div>
    `;

    contenedor.appendChild(seccion);
  }
}

cargarProductos();
const carrito = {};

function cambiarCantidad(nombre, cambio) {

  if (!carrito[nombre]) carrito[nombre] = 0;

  carrito[nombre] += cambio;

  if (carrito[nombre] < 0) carrito[nombre] = 0;

  const id = "cant-" + nombre.replace(/\s+/g,"-");

  document.getElementById(id).textContent = carrito[nombre];

  console.log(carrito);
}
