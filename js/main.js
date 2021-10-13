

let acumulador = ``;
let productos = [];

fetch('datos.json')
.then(producto => producto.json())

.then(data =>{
  productos = data;
  data.forEach((producto) => {
    acumulador += `
    <div class="card mb-4 ml-4 mr-4 mt-4 col-sm-12 col-md-5 col-lg-3" style="width: 18rem; id="${producto.idProduc}">
      <img src="${producto.img}" class="card-img-top" alt="combo1">
      <div class="card-body text-center card text-white bg-secondary">
        <h5 class="card-title bg-dark">${producto.title}</h5>
        <p class="card-text">${producto.description}</p>
        <p>${producto.price}</p>
        <button type="button" class=" butttton btn btn-primary" data-toggle="modal" data-target="#exampleModal" onclick="agregarAlCarrito('${producto.idProduc}')">
        Comprar
        </button>
        <!-- Modal -->
        <div class=" cierre modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" >
          <div class=" modal-dialog">
            <div class=" modal-content">
              <div class="modal-header">
                <h5 class="colorBlack modal-title" id="exampleModalLabel">Producto Agregado</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  });

  $("#cuadroProducto").append(acumulador).innerHTML; // jQuery insertar DOM
  
  $(".card").fadeOut(1000, function() {  
    $(".card").fadeIn(1000);
  })
})



$(".colorBlack").css("color", "black") 






let productoCarrito =[];




function agregarAlCarrito(id) {
          
  if (localStorage.getItem('miCarritoDeCompras')){
  const carritoStoraje = localStorage.getItem('miCarritoDeCompras');
  productoCarrito = JSON.parse(carritoStoraje)
  }
  
  const productoEncontrado = productoCarrito.find(
    producto => producto.idProduc == id
  );
          
  if (productoEncontrado) {
    productoEncontrado.quantity += 1;

          
  } else {
    const productoAGuardar = productos.find(p => p.idProduc == id);
    productoCarrito.push(productoAGuardar);
  }

  localStorage.setItem(
    "miCarritoDeCompras",
    JSON.stringify(productoCarrito)
  );
 

}
