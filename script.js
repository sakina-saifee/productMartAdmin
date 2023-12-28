// import { app, initializeApp, getDatabase, ref, set, child, get, update, remove } from './firebase.js'

// set product to FIREBASE START//
import {
  app,
  initializeApp,
  getDatabase,
  ref,
  set,
  child,
  get,
  update,
  remove,
  getStorage,
  sref,
  uploadBytesResumable,
  getDownloadURL,
} from "./firebase.js";
// const firebaseConfig = {
//   apiKey: "AIzaSyAU310lN1zbWINmANqwx0a-cUkdQA47njk",
//   authDomain: "productmartdb.firebaseapp.com",
//   projectId: "productmartdb",
//   storageBucket: "productmartdb.appspot.com",
//   messagingSenderId: "919638342079",
//   appId: "1:919638342079:web:d53cccb50611b1cb8cc90a",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
//values declare and initialization
let showCartSlider = document.querySelector(".addtocartdiv");
let closebtn = document.querySelector(".closebtn");
let body = document.querySelector('body');
let listProductHTML = document.querySelector('.listProductOuter');
let listCartHTML = document.querySelector(".items-cart-outer");
let cart_quantity = document.getElementById('addedtocartnumber')
let listproducts = [];
// console.log("the length",listproducts.length);
let carts = [];
const db = getDatabase(app);
let product_name = document.querySelector("#prodnameInp");
let price = document.querySelector("#priceInp");
const addproduct_btn = document.getElementById("addproductbtn");
// var product_id=0;

function uploadImage() {
   const file = document.querySelector("#formFile").files[0];

  const name = file.name;
  const metadata = {
    contentType: file.type,
  };
  const storage = getStorage();

  const storageRef = sref(storage, "images/" + file.name);
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);

  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress =
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          break;
        case "storage/canceled":
          // User canceled the upload
          break;

        // ...

        case "storage/unknown":
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL);
        set(ref(db, "AddProduct/"+listproducts.length), {
          ProductName: product_name.value,
          Price: price.value,
          Image: downloadURL
        })
          .then(() => {
            alert("Data inserted Successfully!");
       initApp();
          })
          .catch((error) => {
            alert("Data inserted unsuccessfully!");
          });
      });
    }
  );


}

//new code

function isEmptyOrSpaces(str) {
  if (str == "") {
    return true;
  } else {
    return false;
  }
}

function validation() {
  let nameregex = /^[a-zA-Z]+$/;
  let emailregex = /^[a-zA-Z0-9]+@(gmail|yahoo|outlook)\.com$/;
  let usernameregex = /^[a-zA-Z0-9]{5,}$/

  if (
    isEmptyOrSpaces(product_name.value) ||
    isEmptyOrSpaces(price.value)
  ) {
    alert("You cannot leave any field empty!");
    return false;
  }
  return true;
}

function insertProduct() {


  if (!validation()) {
    return;
  }

  uploadImage();

}

if(addproduct_btn){
addproduct_btn.addEventListener("click", insertProduct);
}



// set product to FIREBASE START//


///
// function SignupForm(){
// window.location.href="signup.html";
// }


// window.onload=function(){
//     let acc= document.querySelector(".btn-acc");
// acc.addEventListener('click', SignupForm);
// //console.log(acc);

// }

//firebase start//



// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAU310lN1zbWINmANqwx0a-cUkdQA47njk",
//   authDomain: "productmartdb.firebaseapp.com",
//   projectId: "productmartdb",
//   storageBucket: "productmartdb.appspot.com",
//   messagingSenderId: "919638342079",
//   appId: "1:919638342079:web:d53cccb50611b1cb8cc90a"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);
// const db = getDatabase(app);





//  function BringDataToHTML() {


//      const dbref = ref(db);


//     get(child(dbref, "AddProduct/")).then((snapshot)=>{
//         if(snapshot.exists()){
//             console.log("Snapshot",snapshot);
//              product_namedb=snapshot.val().ProductName;
//              product_pricedb=snapshot.val().Price;
//              image_urldb=snapshot.val().Image;

//             if(product_namedb==inp_prod_name && product_pricedb==inp_prod_price && image_urldb==file){
//                alert("Product Added To The Website Successfully!");

//             }

//         }else{
//             alert("Product Not Added To The Website Successfully!");
//         }
//     });

// }
// //firebase end//

// BringDataToHTML();
//  console.log("runn")
function ShowSlider() {

  body.classList.toggle('showCart');
}

if(showCartSlider){
showCartSlider.addEventListener('click', ShowSlider)
}

if(closebtn){
closebtn.addEventListener('click', ShowSlider)
}




//show and close buy now cart slider

//bring  data from Firebase
const initApp = () => {
  const dbref = ref(db);
  get(child(dbref, "AddProduct/")).then((snapshot) => {

    listproducts = snapshot.val();

    console.log("arrr", listproducts);
    addDataToHTML();

    //get cart info from local storage
    if (localStorage.getItem('carts')) {
      carts = JSON.parse(localStorage.getItem('carts'));

      addcartToHTML();
    }
    //add to cart red icon on window load
    let val;
    if (localStorage.getItem('cartslength')) {
      val = JSON.parse(localStorage.getItem('cartslength'));
      // console.log("dsf",val);
      cart_quantity.innerText = val;
    }

  })

}

initApp();

function addToCartFunction(productname_db) {
  console.log("runnn")
  let positionThisProductinCart = carts.findIndex((value) => value. product_name_cart == productname_db);
  if (carts.length <= 0) {
    carts = [{
      // productId: productId,
      quantity: 1,
      product_name_cart:productname_db
    }]
  } else if (positionThisProductinCart < 0) {
    carts.push({
      // productId: productId,
      quantity: 1,
      product_name_cart:productname_db
    });
  } else {
    carts[positionThisProductinCart].quantity += 1;
  }

  console.log(carts);
  if (cart_quantity) {
    cart_quantity.innerHTML = carts.length;
  }

  addcartToHTML();
  addCartToMemory();
}


const addDataToHTML=()=> {
  if (listProductHTML) {

    listProductHTML.innerHTML += '';

    if (listproducts.length > 0) {
      listproducts.forEach((product) => {
        console.log(product.ProductName)
      //     let position_in_listproduct_array = carts.findIndex((c_ind) =>
      //   c_ind.product_name_cart == product.ProductName
      // )
      // console.log("The index of slected item in db is:", position_in_listproduct_array)
        let newProduct = document.createElement('div');
        newProduct.classList.add('col-lg-3');
        newProduct.classList.add('col-xl-3');
        // newProduct.dataset.id =position_in_listproduct_array;

        newProduct.innerHTML =`
        <div class="card" >
        <div class="item">
          <img
          src=${product.Image}
          class="card-img-top"
          alt="..."
        />
        <div class="card-body">
          <h5 class="card-title">${product.ProductName}</h5>
          <p class="card-text">$ <span class="price">${product.Price}</span></p>
          <button class="btn btn-grad addtocartbtn" onclick="addToCartFunction(${product.ProductName})">Add To Cart</button> 
        </div>
        </div>
       
      </div>
        `;
        listProductHTML.appendChild(newProduct);
        //listProductHTML.dataset.id=product.id;
        //console.log(product)
      })
    }
    // id="${product.ProductName + " " + i }" 
  }
}




 


//addtocart normal function



//adding cart to HTML

function addcartToHTML() {
  // //card slider on js
  // console.log(listproducts)
  if (listCartHTML) {

    listCartHTML.innerHTML += '';
    carts.forEach((value, key) => {
      let position_in_listproduct_array = listproducts.findIndex((ind) =>
        ind.ProductName == value.product_name_cart
      )
      // console.log(position_in_listproduct_array);
      let info = listproducts[position_in_listproduct_array];
       outer_prod=info.ProductName;
      // console.log(info);
      listCartHTML.innerHTML += `
        <div class="col-12 col-lg-12 col-xl-12">
        <div class="items-cart-inner">
      
          <div class="row inner-row ">
               <!--product image-->
            <div class="col-xl-3 col-sm-3  col-lg-3 ">
              <div class="product-image my-2">
                <img src="${info.Image}" width="90px">
              </div>
        </div>
         <!--product name-->
        <div class="col-xl-3 col-sm-3  col-lg-3 d-flex justify-content-center align-items-center ">
          <div class="product-name">
            <p>${info.ProductName}</p>
          </div>
          
          </div>

  <!--product price-->
          <div class="col-xl-3 col-sm-3  col-lg-3 d-flex justify-content-center align-items-center ">
          <div class="product-price">
            <p>${info.Price * value.quantity} </p>
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

}

//adding data to HTML


// adding cart to memory
function addCartToMemory() {
  localStorage.setItem('carts', JSON.stringify(carts));

  localStorage.setItem('cartslength', JSON.stringify(carts.length));
}




//minus function
function minus(productId) {
  let positionCart = carts.findIndex((value) => value.productId == productId)
  carts[positionCart].quantity = carts[positionCart].quantity - 1;
  if (carts[positionCart].quantity < 1) {
    carts.splice(positionCart, 1);

  }

  addCartToMemory();
  addcartToHTML();
}

//plus function
function plus(productId) {
  let positionCart = carts.findIndex((value) => value.productId == productId)
  // console.log("psotin in the cart is", positionCart);
  carts[positionCart].quantity = carts[positionCart].quantity + 1;
  console.log("plus minus product id", productId);
  addCartToMemory();
  addcartToHTML();
}

