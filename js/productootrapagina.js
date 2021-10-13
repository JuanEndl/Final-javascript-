

const carritoStoraje = localStorage.getItem('miCarritoDeCompras');
const carritoParseado = JSON.parse(carritoStoraje)



let acumulador = ``;


carritoParseado.forEach((producto) => {
  acumulador += ` 
  <tr id=${producto.idProduc} class="">
  <th scope="row">${producto.idProduc}</th>
  <td>${producto.quantity}</td>        
  <td>${producto.title}</td>
  <td>$ ${producto.price}</td>
  <td>$ ${producto.quantity * producto.price}</td>
  <td>
  <button onclick="quitarCarrito(${producto.idProduc})">borrar</button>
  </td>
  </tr>
  `;
});


function quitarCarrito(id) {
  let productosFiltrados = [];
  // Busco el producto a borrar

  const encontrarProducto = carritoParseado.find(
    producto => producto.idProduc == id
  ); 

  // Elimino el Nodo de HTML siempre y cuando el localStorage tenga 1 producto y ese producto encontrado tenga una cantidad igual a 1
  if (carritoParseado.length==1 && encontrarProducto.quantity==1){
  document.getElementById(encontrarProducto.idProduc).remove();
  } else {
  // si no significa que quiero que se actualize la pagina para ver las cantidades correctamente.
    location.reload();
  }
  
// Si el producto encontrado para borrar es mas de 1, guardo el localstorage en producto filtrado
// luego comparo del arreglo cada producto y si matchea con el que quiero borrar le resto 1 a cantidad
  if (encontrarProducto.quantity > 1){
    productosFiltrados = carritoParseado;

  productosFiltrados.forEach(producto => {
      if(producto.idProduc == id){
        producto.quantity -= 1; 
      }
    })

  } else {
//ahora si el producto es unico (no es mas de uno) no lo necesito actualizar, filtro los demas (guardo en un nuevo 
//arreglo "productosFiltrado" los productos que tengan un id diferente al que quiero borrar.
    productosFiltrados = carritoParseado.filter(idSearch => idSearch.idProduc != id);
  }  
  
  // Si tengo un solo producto y el mismo tiene una unidad borro todo el localStorage
  if (carritoParseado.length==1 && encontrarProducto.quantity==1){
    localStorage.removeItem("miCarritoDeCompras")
  }
  else {
  //En caso contrario piso el localSotrage anterior con los productos filtrados que necesito.
    localStorage.setItem(
      "miCarritoDeCompras",
      JSON.stringify(productosFiltrados))
  }

}


document.getElementById("cards").innerHTML=acumulador;


