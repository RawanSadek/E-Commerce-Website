var user = document.querySelector(".nav-item span")
var prodsDiv = document.querySelector(".container .prods")
var favsDiv = document.querySelector(".favs .prods")

user.innerHTML = localStorage.getItem("username")

var products = JSON.parse(localStorage.getItem("products"))

var favsID
if(localStorage.getItem("favs"))
{
    favsID = localStorage.getItem("favs")
    favsID = favsID.split(',')
    for(var i=0;i<favsID.length;i++)
    {
        favsID[i]=parseInt( favsID[i])
    }
    var favProds = products.filter((product)=>favsID.includes(product.id))
    drawFavProducts(favProds)
}


var totalPriceDiv = document.querySelector(".totalPrice")
if(JSON.parse(localStorage.getItem("cartItems")))
{
    var cartProds = JSON.parse(localStorage.getItem("cartItems"))
    drawCartProducts(cartProds)
    calcTotalPrice()
}
else
    totalPriceDiv.innerHTML=("Total Price: $0")


function drawCartProducts(cartProds)
{
    let y=cartProds.map((item)=>{
        if(item.count!=0)
        {
            return `
            <div class="cartProd" id="item${item.id}">
                <img src="Images/${item.imageUrl}" draggable="false">
                <div class="cartProd-details">
                    <p>${item.name}</p>
                    <p>$${item.price}</p>
                    <i class="fas fa-minus dec" onClick = "decrement(${item.id})"></i>
                    <span>${item.count}</span>
                    <i class="fas fa-plus inc" onClick = "increment(${item.id})"></i>
                    <button onClick = "removeItem(${item.id})">Remove</button> 
                </div>
            </div>
        `}
    })
    prodsDiv.innerHTML = y.join("")
    localStorage.setItem("cartItems",JSON.stringify(cartProds))
}

  

function increment(itemID)
{
    var index = products.findIndex((item)=>item.id==itemID)
    products[index].count++
    var cartIndex = cartProds.findIndex((item)=>item.id==itemID)
    cartProds[cartIndex].count++
    drawCartProducts(cartProds)
    calcTotalPrice()
    localStorage.setItem("products",JSON.stringify(products))
    localStorage.setItem("cartItems",JSON.stringify(cartProds))
}

// var Div
function decrement(itemID)
{
    var index = products.findIndex((item)=>item.id==itemID)
    products[index].count--
    var cartIndex = cartProds.findIndex((item)=>item.id==itemID)
    cartProds[cartIndex].count--

    if( products[index].count==0)
    {
        removeItem(itemID)
        cartProds.splice(cartIndex,1)
    }
    drawCartProducts(cartProds)
    calcTotalPrice()
    localStorage.setItem("products",JSON.stringify(products))
    localStorage.setItem("cartItems",JSON.stringify(cartProds))
}

function removeItem(itemID)
{
    var index = products.findIndex((item)=>item.id==itemID)
    products[index].count=0
    var cartIndex = cartProds.findIndex((item)=>item.id==itemID)
    cartProds[cartIndex].count=0
    let Div = document.querySelector(`#item${itemID}`);
    Div.remove()
    calcTotalPrice()
    localStorage.setItem("products",JSON.stringify(products))
    localStorage.setItem("cartItems",JSON.stringify(cartProds))
}


function calcTotalPrice()
{
    var total=0
    for(var i=0;i<cartProds.length;i++)
    {
        var index = products.findIndex((item)=>item.id==cartProds[i].id)
        total+=(products[index].price*products[index].count)
    }
    totalPriceDiv.innerHTML=("Total Price: $"+total)
}


function drawFavProducts(favProds)
{
    let y=favProds.map((item)=>{
        return `
        <div class="favProd col-3" id="fav${item.id}">
            <img src="Images/${item.imageUrl}" draggable="false">
            <br>
            <div class="fav-details">
                <span>${item.name}</span>
                <i class="fas fa-heart" onClick = "removeFromFavs(${item.id})"></i>
            </div>
        </div>
        `
    })
    favsDiv.innerHTML = y.join("")
}



function removeFromFavs(itemID)
{
    Div = document.querySelector(`#fav${itemID}`);
    Div.remove()
    var index = favsID.findIndex((id)=>id==itemID)
    favsID.splice(index,1)
    localStorage.setItem("favs",favsID)
}