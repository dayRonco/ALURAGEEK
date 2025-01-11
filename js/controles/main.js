
import { serviceProduct } from "../service/productos_controles.js";

const productContainer = document.querySelector("[data-lista]");
const formulario = document.querySelector("[data-formulario]");
const withoutProductsMessage = document.querySelector('#without-products-message');

function createCard ({nombre, precio, imagen, id}){
    const card = document.createElement ("div");
    card.classList.add("photo-box");
    card.innerHTML = `
       
         <div class="photo-box">
            <img src="${imagen}" alt="imagen de producto">
        </div>
        <div class="card-container--value">
             <p class="textoproductos">${nombre}</p>
             <div class="inferior">
                <p class="textoproductos_precio">${precio}</p>
                <i class='bx bxs-trash bx-burst-hover' data.id="${id}"></i>
             </div>
        </div>
       
    `;
 addDeleteEvent(card, id);
    return card; 
};

function addDeleteEvent(card, id) {
const deleteButton = card.querySelector('i');
    deleteButton.addEventListener("click", async () => {
      try {
        await serviceProduct.deleteProductos(id);
       card.remove();
       checkEmptyMessage();
        console.log(`Producto con id ${id} eliminado`);
          alert(`Producto con id ${id} eliminado`);
      } catch (error) {
        console.error(`Error al eliminar el producto con id ${id}:`, error);
      }
    });
  }
  
const renderProductos = async () => {
    try{
        const listaProductos = await serviceProduct.productosLista();
        listaProductos.forEach((product) => {
            const productCard = createCard(product);
            productContainer.appendChild(productCard);
            checkEmptyMessage();
        });
    }catch (error){
        console.log(error);
    }
};



formulario.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nombre = document.querySelector("[data-nombre]").value;
    const precio = document.querySelector("[data-precio]").value;
    const imagen = document.querySelector("[data-imagen]").value;

    try{
        const nuevoProducto = await serviceProduct.creaProducto(nombre,precio,imagen);
        const newCard = createCard(nuevoProducto);
        productContainer.appendChild(newCard);

        withoutProductsMessage.style.display = 'none'
    }catch(error){
        console.log(error);
    }
    formulario.reset();  

});

// Verifica si la lista de productos está vacía
function checkEmptyMessage() {
    if (productContainer.children.length === 0) {
        withoutProductsMessage.style.display = 'block'; // Muestra el mensaje si no hay productos
    } else {
        withoutProductsMessage.style.display = 'none'; // Asegura que se oculte si hay productos
    }
}

// Inicialmente, mostrar el mensaje si no hay productos
checkEmptyMessage();
renderProductos();
