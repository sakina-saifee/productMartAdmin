
function SignupForm(){
window.location.href="signup.html";
}


window.onload=function(){
    let acc= document.querySelector(".btn-acc");
acc.addEventListener('click', SignupForm);
console.log(acc);

}


//show and close buy now cart slider
let showCartSlider= document.querySelector(".addtocartdiv");
let closebtn= document.querySelector(".closebtn");
let body =document.querySelector('body');
 let listProductHTML=document.querySelector('.listProductOuter');
 let listCartHTML=document.querySelector(".items-cart-outer");
 let iconCartNumber=document.querySelector("#addedtocartnumber");

showCartSlider.addEventListener('click',ShowSlider)
closebtn.addEventListener('click',ShowSlider)
function ShowSlider(){
    // console.log("Hello");
    body.classList.toggle('showCart');
}

//bring json data

let listproducts=[];
let carts=[];

const initApp=()=>{
fetch('product.json').then(response=>response.json()).then(data=>{
    listproducts=data;
    // console.log(listproducts);
    addDataToHTML();
    
})
}

initApp();

//add to cart event
// listProductHTML.addEventListener('click',AddToCart);

// function AddToCart(e){
//     let positionClick=e.target;
//     console.log(positionClick)
//    console.log( positionClick.parentElement);
//     if(positionClick.classList.contains('addtocartbtn')){

//         let product_id=positionClick.parentElement.dataset.id;
//         alert(product_id)
//     }
// }

function AddToCartFunction(id){
    let positionThisProductinCart=carts.findIndex((value)=> value.product_id==id);
    if(carts.length<=0){ //cart empty
carts=[{
    product_id:id,
    quantity: 1
}]
    }else if(positionThisProductinCart<0) //no product of this kind in a cart
{
    carts.push({
        product_id:id,
        quantity: 1
    })
}else{
    carts[positionThisProductinCart].quantity+=1;
}

    console.log(carts);
}

function addDataToHTML(){
listProductHTML.innerHTML='';

  if(listproducts.length>0){
    listproducts.forEach(product=>{
        let newProduct=document.createElement('div');
        newProduct.classList.add('col-lg-3');
        newProduct.classList.add('col-xl-3');
        newProduct.dataset.id=product.id;
        newProduct.innerHTML=`
        <div class="card product1 listProduct" >
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
        console.log(product)
    })
  }

}