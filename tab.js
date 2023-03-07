function Product(id, name, image, price){
  this.id = id;
  this.name = name;
  this.image = image;
  this.price = price;
}
function Cart(id, total){
  this.id = id;
  this.total = total;
  this.date = new Date();
  this.cartIems = [];
}
function CartItem(idProduct, quantity){
  this.idProduct = idProduct;
  this.quantity = quantity;
}
let products = []
let cart = new Cart(1, 0);
function initData(){
  let p1 = new Product(1, "Moonstone","2.png", "$3.500");
  let p2 = new Product(2, "Pearl","4.png", "$2.000");
  let p3 = new Product(3, "Peridot","5.png", "$3.450");
  let p4 = new Product(4, "Opal","6.png", "$5.100");
  let p5 = new Product(5, "Aquamarine","7.png", "$3.099");
  let p6 = new Product(6, "Agalmatolite","3.png", "$10.399");
  let p7 = new Product(7, "Lapis Lazuli","1.png", "$3.010");
  let p8 = new Product(8, "Citrine","8.png", "$3.499");
  products = [p1, p2, p3, p4, p5, p6,p7,p8];
}

function drawProduct(){
  let strProducts = products.map((product)=>{
      return `
      <div class="products_tab">
            <img src="${product.image}" alt=""><br>
            <li>${product.name}</li>
            <span>${product.price}</span>
            <button type="button" onclick="handleAddToCart(${product.id})"  class="cart-btn"><i class="fa-sharp fa-solid fa-cart-plus"></i></button>
      </div>
      `
  });
  document.getElementById("tbProduct").innerHTML = strProducts.join("");
}

initData();
drawProduct();

drawCart();

  function drawProductsFilter(productsFilter){
    let strProducts = productsFilter.map((product)=>{
        return `
        <div class="products_tab">
            <img src="${product.image}" alt=""><br>
            <li>${product.name}</li>
            <span>${product.price}</span>
            <button type="button"  class="cart-btn"><i class="fa-sharp fa-solid fa-cart-plus"></i></button>
        </div>
        `
    });
    document.getElementById("tbProduct").innerHTML = strProducts.join("");
}

  function handleSearchChange(){
    let txtSearch = document.getElementById("search").value;

    let productFilters = [];
    for(let i=0;i<products.length;i++){
        if(products[i].name.toUpperCase().includes(txtSearch.toUpperCase())){
            productFilters.push(products[i]);
        }
    }
    drawProductsFilter(productFilters);
}


function handleAddToCart(id){
    if(checkIdProduct(id, cart) == false){
        let cartItem = new CartItem(id, 1);
        cart.cartIems.push(cartItem);
    }else{
        for(let i=0;i<cart.cartIems.length;i++){
            if(cart.cartIems[i].idProduct == id){
                cart.cartIems[i].quantity = cart.cartIems[i].quantity + 1;
            }
        }
    }
    drawCart();
}
function drawCart(){
  let strProducts = cart.cartIems.map((cartItem)=>{
      let product = findProductById(cartItem.idProduct)
      return `
          <tr class="tb_color">
          <td><img style="height: 30px; width: 30px;" src="${product.image}" alt=""></td>
          <td>${product.name}</td>
          <td><input type="number" style="width: 30px;" value="${cartItem.quantity}" min="1"></td>
          <td>${product.price}</td>
          <td><button onclick="Cancel(${cartItem.idProduct})">Delete</button></td>
  </tr>
      `
  });
  document.getElementById("tbCart").innerHTML = strProducts.join("");
}
function findProductById(id){
  let product = products.find((product)=>{
      if(id==product.id){
          return true;
      }
  })
  return product;
}
function checkIdProduct(id, cart){
  let exists = false;
  for(let i=0;i<cart.cartIems.length;i++){
      if(cart.cartIems[i].idProduct==id){
          exists = true;
          break;
      }
  }
  return exists;
}


function Cancel(idProduct){
    let index = cart.cartIems.findIndex((value)=>{
      return value.idProduct == idProduct;
    });

    cart.cartIems.splice(index, 1);
    drawCart();

}