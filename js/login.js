var username = document.querySelector("input[type = 'text']");
var password = document.querySelector("input[type = 'password']");
var loginButton = document.querySelector(".inputs button");

loginButton.addEventListener("click",login)
function login()
{
    // e.preventDefault
    if(username.value==localStorage.getItem("username") && password.value==localStorage.getItem("password"))
    {
        setTimeout(()=>{window.location = "shop.html"}, 1000)
    }
    else
    {
        alert("Wrong username or password")
    }
}