

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
  

  const encontrarProducto = carritoParseado.find(
    producto => producto.idProduc == id
  ); 

  
  if (carritoParseado.length==1 && encontrarProducto.quantity==1){
  document.getElementById(encontrarProducto.idProduc).remove();
  } else {
  
    location.reload();
  }
  

  if (encontrarProducto.quantity > 1){
    productosFiltrados = carritoParseado;

  productosFiltrados.forEach(producto => {
      if(producto.idProduc == id){
        producto.quantity -= 1; 
      }
    })

  } else {


    productosFiltrados = carritoParseado.filter(idSearch => idSearch.idProduc != id);
  }  
  
  
  if (carritoParseado.length==1 && encontrarProducto.quantity==1){
    localStorage.removeItem("miCarritoDeCompras")
  }
  else {
  
    localStorage.setItem(
      "miCarritoDeCompras",
      JSON.stringify(productosFiltrados))
  }

}


document.getElementById("cards").innerHTML=acumulador;


