
function SignupForm(){
window.location.href="signup.html";
}


window.onload=function(){
    let acc= document.querySelector(".btn-acc");
acc.addEventListener('click', SignupForm);
console.log(acc);

}