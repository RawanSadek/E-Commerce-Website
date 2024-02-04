var email = document.querySelector("input[type = 'email']");
var username = document.querySelector("input[type = 'text']");
var password = document.querySelector("input[type = 'password']");
var signupButton = document.querySelector(".inputs button");

signupButton.addEventListener("click", signUp)
function signUp()
{
    if(email.value=="" || username.value=="" || password.value=="")
    {
        alert("Please fill your data")
    }
    else
    {
        localStorage.setItem("username",username.value)
        localStorage.setItem("password",password.value)

        setTimeout(()=>{window.location = "login.html"}, 1000)
    }
}

