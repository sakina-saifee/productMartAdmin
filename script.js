
function SignupForm(){
window.location.href="signup.html";
}


window.onload=function(){
    let acc= document.querySelector(".btn-acc");
acc.addEventListener('click', SignupForm);
//console.log(acc);

}

//values declare and initialization
let showCartSlider= document.querySelector(".addtocartdiv");
let closebtn= document.querySelector(".closebtn");
let body =document.querySelector('body');
 let listProductHTML=document.querySelector('.listProductOuter');
 let listCartHTML=document.querySelector(".items-cart-outer");
 let cart_quantity=document.getElementById('addedtocartnumber')
 let listproducts=[];
 let carts=[];

//show and close buy now cart slider
showCartSlider.addEventListener('click',ShowSlider)
closebtn.addEventListener('click',ShowSlider)
function ShowSlider(){

    body.classList.toggle('showCart');
}



//bring json data
const initApp=()=>{
fetch('product.json').then(response=>response.json()).then(data=>{
    listproducts=data;
    // console.log(listproducts);
    addDataToHTML();

    //get cart info from local storage
    if(localStorage.getItem('carts')){
        carts=JSON.parse(localStorage.getItem('carts'));
        localStorage.removeItem("carts");
        addcartToHTML();
    }
    //add to cart red icon on window load
    let val;
    if(localStorage.getItem('cartslength')){
        val=JSON.parse(localStorage.getItem('cartslength'));
        // console.log("dsf",val);
cart_quantity.innerText=val;
    }
   


})
}

initApp();

//addtocart normal function
function AddToCartFunction(productId){
    let positionThisProductinCart=carts.findIndex((value)=> value.productId==productId);
if(carts.length<=0){
    carts=[{
        productId:productId,
        quantity:1
    }]
}else if(positionThisProductinCart<0){
    carts.push({ 
         productId:productId,
        quantity:1});
}else{
    carts[positionThisProductinCart].quantity+=1;
}

  console.log(carts);
  cart_quantity.innerHTML=carts.length;

  addcartToHTML();
  addCartToMemory();
}

//adding cart to HTML
function addcartToHTML(){
    // //card slider on js
    // console.log(listproducts)
    listCartHTML.innerHTML='';
    carts.forEach((value, key)=>{
        let position_in_listproduct_array=listproducts.findIndex((ind)=>
            ind.id==value.productId
        )
        // console.log(position_in_listproduct_array);
        let info=listproducts[position_in_listproduct_array];
        // console.log(info);
        listCartHTML.innerHTML+=`
        <div class="col-12 col-lg-12 col-xl-12">
        <div class="items-cart-inner">
      
          <div class="row inner-row ">
               <!--product image-->
            <div class="col-xl-3 col-sm-3  col-lg-3 ">
              <div class="product-image my-2">
                <img src="${info.image}" width="90px">
              </div>
        </div>
         <!--product name-->
        <div class="col-xl-3 col-sm-3  col-lg-3 d-flex justify-content-center align-items-center ">
          <div class="product-name">
            <p>${info.name}</p>
          </div>
          
          </div>

  <!--product price-->
          <div class="col-xl-3 col-sm-3  col-lg-3 d-flex justify-content-center align-items-center ">
          <div class="product-price">
            <p>${info.price * value.quantity} </p>
          </div>
            </div>
            <!--product price indicator-->
            <div class="product-price-indicator  d-flex justify-content-center align-items-center flex-row">
              <button class="minusindicator mx-2 border-0 btn-grad"  id="decrement" onclick="minus(${info.id})" > <span> < </span></button>
              <span id=" product-amount"> ${value.quantity} </span>
              <button class="plusindicator mx-2 border-0 btn-grad" id="increment" onclick="plus(${info.id})"> <span> > </span></button>
           
            </div>
        
           
      
          </div>
          
            
       </div>
      
       </div>
        `;
    })
}

//adding data to HTML
function addDataToHTML(){
listProductHTML.innerHTML='';

  if(listproducts.length>0){
    listproducts.forEach(product=>{
        let newProduct=document.createElement('div');
        newProduct.classList.add('col-lg-3');
        newProduct.classList.add('col-xl-3');
        newProduct.dataset.id=product.id;
        newProduct.innerHTML=`
        <div class="card" >
        <div class="item">
          <img
          src=${product.image}
          class="card-img-top"
          alt="..."
        />
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">$ <span class="price">${product.price}</span></p>
          <button class="btn btn-grad addtocartbtn " onclick="AddToCartFunction(${product.id})">Add To Cart</button> 
        </div>
        </div>
       
      </div>
        `;
        listProductHTML.appendChild(newProduct);
        //listProductHTML.dataset.id=product.id;
        //console.log(product)
    })
  }

}

// adding cart to memory
function addCartToMemory(){
localStorage.setItem('carts', JSON.stringify(carts));

localStorage.setItem('cartslength', JSON.stringify(carts.length));




}




//minus function
function minus(productId){
let positionCart=carts.findIndex((value)=>value.productId==productId)
carts[positionCart].quantity=carts[positionCart].quantity - 1;
if(carts[positionCart].quantity<1){
    carts.splice(positionCart,1);
 
}

addCartToMemory();
addcartToHTML();
}

//plus function
function plus(productId){
    let positionCart=carts.findIndex((value)=>value.productId==productId)
    console.log("psotin in the cart is", positionCart);
    carts[positionCart].quantity=carts[positionCart].quantity + 1;
    console.log("plus minus product id", productId);
    addCartToMemory();
    addcartToHTML();
    }

