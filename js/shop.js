var user = document.querySelector(".nav-item span")
var prods = document.querySelector(".prods")
var counter = document.querySelector(".counter")
var searchBy = document.querySelector(".searchBy select")
var searchByName = document.querySelector(".searchValue input")
var searchByCategory = document.querySelector(".searchValue select")



user.innerHTML = localStorage.getItem("username")
var cartItems=[]
if(JSON.parse(localStorage.getItem('cartItems')))
    cartItems=JSON.parse(localStorage.getItem('cartItems'))



var products = [
    {
        id: 1,
        name: "Curvy Classic Chair",
        price: 145,
        category: "chairs",
        imageUrl: "chair1.png",
        count: 0
    },
    {
        id: 2,
        name: "Cozy Curved Chair",
        price: 150,
        category: "chairs",
        imageUrl: "chair2.png",
        count: 0
    },
    {
        id: 3,
        name: "Enveloping Elegance Chair",
        price: 145,
        category: "chairs",
        imageUrl: "chair3.png",
        count: 0

    },
    {
        id: 4,
        name: "Sunny Retro Chair",
        price: 160,
        category: "chairs",
        imageUrl: "chair4.png",
        count: 0

    },


    {
        id: 5,
        name: "Wingback Bed",
        price: 160,
        category: "beds",
        imageUrl: "bed1.png",
        count: 0

    },
    {
        id: 6,
        name: "The Modern Elegance Bed",
        price: 160,
        category: "beds",
        imageUrl: "bed2.png",
        count: 0

    },
    {
        id: 7,
        name: "Scandi Bed",
        price: 160,
        category: "beds",
        imageUrl: "bed3.png",
        count: 0

    },
    {
        id: 8,
        name: "The Luxe Tufted Bed",
        price: 160,
        category: "beds",
        imageUrl: "bed4.png",
        count: 0

    },

    {
        id: 9,
        name: "The Modern Comfort Sofa",
        price: 160,
        category: "sofas",
        imageUrl: "sofa1.png",
        count: 0

    },
    {
        id: 10,
        name: "The Sleek Comfort Sofa",
        price: 160,
        category: "sofas",
        imageUrl: "sofa2.png",
        count: 0

    },
    {
        id: 11,
        name: "The Gray Elegance Sofa",
        price: 160,
        category: "sofas",
        imageUrl: "sofa3.png",
        count: 0

    },
    {
        id: 12,
        name: "The Crimson Comfort Sofa",
        price: 160,
        category: "sofas",
        imageUrl: "sofa4.png",
        count: 0
        
    },
    
    {
        id: 13,
        name: "Round Wooden Table",
        price: 160,
        category: "tables",
        imageUrl: "table1.png",
        count: 0
        
    },
    {
        id: 14,
        name: "The Duo Oval Coffee Table",
        price: 160,
        category: "tables",
        imageUrl: "table2.png",
        count: 0
        
    },
    {
        id: 15,
        name: "Hunter Round Dining Table",
        price: 160,
        category: "tables",
        imageUrl: "table3.png",
        count: 0
        
    },
    {
        id: 16,
        name: "Nested Industrial Coffee Table",
        price: 160,
        category: "tables",
        imageUrl: "table4.png",
        count: 0
        
    }
]

if(JSON.parse(localStorage.getItem('products')))
{
    products=JSON.parse(localStorage.getItem('products'))
    JSON.parse(localStorage.getItem('products'))
    
}

function drawProducts(Products)
{
    let y=Products.map((item)=>{
        var itemDiv = document.getElementById(item.id);
        if(itemDiv!=null)
        {
            var buttonText = "Remove from Cart"
        }
        else
        {
            var buttonText = "Add to Cart"
        }
        return `
        <div class="item col-lg-4 col-md-5 col-sm-7">
        <img src="Images/${item.imageUrl}" draggable="false">
        <p>${item.name}</p>
        <p>$${item.price}</p>
        <button onClick = "addToCart(${item.id}, this)">${buttonText}</button> 
        <i class="fas fa-heart" onClick = "addToFav(${item.id}, this)"></i>
        </div>
        `
    })
    prods.innerHTML = y.join("")
    
    
}
drawProducts(products)
localStorage.setItem("products",JSON.stringify(products))



//////////////// Search

var filteredItems
searchByName.addEventListener("input", search)
searchBy.addEventListener("change", search)

function search()
{
    if(searchBy.value=="Search by Category")
    {
        searchByName.style.display="none"
        searchByCategory.style.display="block"

        searchByCategory.addEventListener("change", function(){
            filteredItems=products.filter((item)=>item.category==(searchByCategory.value).toLowerCase())
            drawProducts(filteredItems)
        });
    }
    else
    {
        searchByCategory.style.display="none"
        searchByName.style.display="block"

        searchByName.addEventListener("input", function() {
            filteredItems = products.filter((item) => (item.name.toLowerCase()).includes(searchByName.value.toLowerCase()));
            drawProducts(filteredItems);
        });
    }
}



/////////////// Add to Cart


var itemsCount=0
var cartContainer = document.querySelector(".cartContainer")
var cartItemsContainer = document.querySelector(".cartContainer .cartItems")
var cartt = document.querySelector(".cartt")
var arrowUp = document.querySelector(".up")
var arrowDown = document.querySelector(".down")
cartt.addEventListener("click", showCart)

function showCart(e)
{
    e.preventDefault()
    if(cartContainer.style.display=="none")
    {
        cartContainer.style.display="block"
        arrowDown.style.display="none"
        arrowUp.style.display="inline"
    }
    else
    {
        cartContainer.style.display="none"
        arrowUp.style.display="none"
        arrowDown.style.display="inline"
    }
}


function addToCart(itemId ,itembtn)
{
    let index = products.findIndex(item=>item.id==itemId)
    if(itembtn.innerHTML=="Add to Cart")
    {
        itembtn.innerHTML="Remove from Cart"
        cartItems.push(products[index])
        itemsCount++
        products[index].count++
        drawCartItems(index,itemId,itembtn);
    }
    else
    {
        itembtn.innerHTML="Add to Cart"
        var cartIndex = cartItems.findIndex((item)=>item.id==itemId)
        cartItems.splice(cartIndex,1)
        itemsCount-=products[index].count
        counter.innerHTML=itemsCount
        products[index].count=0
        removeCartItem(itemId)
    }
    
    if(itemsCount!=0)
    {
        counter.style.display="block"
        counter.innerHTML=itemsCount
    }
    else
    {
        counter.style.display="none"
    }

    localStorage.setItem("cartItems",JSON.stringify(cartItems))
}

function drawCartItems(index,itemId,itembtn)
{
    let itemDiv = document.createElement("div");
    itemDiv.id = itemId;
    itemDiv.style.backgroundColor="white"
    itemDiv.style.padding="10px"
    itemDiv.style.borderRadius="5px"
    itemDiv.style.marginBottom="20px"


    // Display item name
    let itemName = document.createElement("span");
    itemName.textContent = products[index].name;
    itemName.style.color="black"
    itemDiv.appendChild(itemName);
    
    // Increment button
    let incrementIcon = document.createElement("i");
    incrementIcon.className = "fas fa-plus";
    incrementIcon.style.color="green"
    incrementIcon.style.float="right"
    incrementIcon.style.cursor="pointer"
    incrementIcon.style.padding="10px 0 0"
    itemDiv.appendChild(incrementIcon);
    incrementIcon.addEventListener("click", function() { 
        products[index].count++
        itemCount.textContent = products[index].count;
        itemsCount++
        counter.innerHTML=itemsCount
        localStorage.setItem("products",JSON.stringify(products))
        localStorage.setItem("cartItems",JSON.stringify(cartItems))
    });

    // Display item count
    let itemCount = document.createElement("span");
    itemCount.textContent = products[index].count;
    itemCount.style.float="right"
    itemCount.style.padding="0px 10px"
    itemCount.style.fontSize="20px"
    itemDiv.appendChild(itemCount);

    // Decrement button
    let decrementIcon= document.createElement("i");
    decrementIcon.className = "fas fa-minus";
    decrementIcon.style.color="red"
    decrementIcon.style.float="right"
    decrementIcon.style.cursor="pointer"
    decrementIcon.style.padding="10px 0 0"
    itemDiv.appendChild(decrementIcon);
    decrementIcon.addEventListener("click", function() { 
        products[index].count--
        itemCount.textContent = products[index].count;
        itemsCount--
        if(itemsCount==0)
        {
            counter.style.display="none"
            cartItems.splice(0,1)
            
        }
        counter.innerHTML=itemsCount

        if (products[index].count == 0) 
        {
            itemDiv.remove();
            itembtn.innerHTML="Add to Cart"
            var cartIndex = cartItems.findIndex((item)=>item.id==itemId)
            cartItems.splice(cartIndex,1)
        }
        localStorage.setItem("products",JSON.stringify(products))
        localStorage.setItem("cartItems",JSON.stringify(cartItems))
    });
    cartItemsContainer.appendChild(itemDiv);
    localStorage.setItem("cartItems",JSON.stringify(cartItems))
    localStorage.setItem("products",JSON.stringify(products))
}



function removeCartItem(itemID)
{
    var itemDiv = document.getElementById(itemID);
    itemDiv.remove();
}


var favItems=[]
function addToFav(itemId ,itemHeart)
{
    itemHeart.style.cursor="pointer"
    if(itemHeart.style.color=="red")
    {
        var index = favItems.findIndex(obj => obj === itemId);
        favItems.splice(index,1)
        itemHeart.style.color="rgb(187, 187, 187)"
    }
    else
    {
        itemHeart.style.color="red"
        favItems.push(itemId)
    }

    localStorage.setItem("favs",favItems)
}



