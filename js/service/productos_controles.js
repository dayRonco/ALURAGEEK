const BASE_UR = "https://6780ad1085151f714b076db6.mockapi.io/productos";

const productosLista = async () => {
    try {
        const response = await fetch(BASE_UR);
        const data = await response.json();
        return data;
    }catch (error){
        console.log("error al listar productos: ", error);
    }
}

const creaProducto = async (nombre,precio,imagen) => {
    try{
        const response= await fetch(BASE_UR, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({nombre,precio,imagen})
        });
        const data= await response.json();
        return data;
    }catch(error){
        console.log("error al crear producto", error);
    }
}

const deleteProductos = async (id) => {
    try {
      await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(`Producto con id ${id} eliminado exitosamente`);
    } catch (error) {
      console.error("Error en la solicitud DELETE:", error);
    }
  };

export const serviceProduct = {
    productosLista,
    creaProducto,
    deleteProductos,

};