

var confirmPassword=document.getElementById('confirm_password')
console.log(confirmPassword.value)
var msg= document.getElementById("msg")

confirmPassword.addEventListener("input",function(){
    var password=document.getElementById('password').value;
    var chck_password=document.getElementById('confirm_password').value;

if (password!='' && chck_password!='') {
    console.log(chck_password ,password);
    if (password===chck_password)
    {  msg.textContent = "";
    }
    else if (document.getElementById("password").value!=document.getElementById('confirm_password')){
        
        msg.textContent ="Passwords do not match";
        msg.style.color = 'red';
    }
}

})