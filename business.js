let carts = document.querySelectorAll('#add-cart');

const products =[
    {
        name: "leather watch",
        tag: 'leatherwatch',
        price: 370.99,
        inCart: 0,
    },
    {
        name: "snicker",
        tag: 'snicker',
        price: 370.99,
        inCart: 0,
    },
    {
        name: "shade",
        tag: 'shade',
        price: 370.99,
        inCart: 0,
    },
    {
        name: "sun shades",
        tag: "sunshades",
        price: 370.99,
        inCart: 0,
    },
    {
        name: "white foot wear",
        tag: "WhiteFootWear",
        price: 370.99,
        instock: 20,
    },
    {
        name: "poursche GT",
        tag: "poursche-GT",
        price: 370.99,
        inCart: 0,
    },
    {
        name: "men solid watch",
        tag: "MenSolidWatch",
        price: 370.99,
        inCart: 0,
    },
    {
        name: "Ford GT",
        tag: "Ford-GT",
        price: 2999.99,
        inCart: 0,   
    },
    {
        name: "Chevrolet",
        tag: "Chev-Camaro",
        price: 3000,
        inCart: 0,
    },
    {
        name: "House And Land",
        tag: "House & Land",
        price: 20000,
        inCart: 0,
    },
    {
        name: "Games",
        tag: "Games",
        price: 500.00,
        inCart: 0,
    },
    {
        name: "Real Estate",
        tag: "RealEstate",
        price: 1000000.00,
        inCart: 0,
    },
];

for (let i=0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

// cart should still be there when reload
function onLoadCartNumbers() {
    // console.log("the product clicked is", products)
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers) {
        document.querySelector('#cart span');textContent = productNumbers;
    }
}
// note this for null
function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);
    
    if(productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('#cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('#cart span').textContent = 1;
    }
    setItems(product);
}

function setItems (product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {
        if(cartItems[product.tag] === undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}
// Total Cart Cost
function totalCost(product) {  
    let cartCost = localStorage.getItem("totalCost");
    console.log("My CartCost is", cartCost);
    console.log(typeof cartCost);

    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem("productsIncart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");

    // console.log(cartItems);
    if( cartItems && productContainer ) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class=product">
                <ion-icon name="close-circle-outline"></ion-icon>
                <img scr="./images/${item.tag}.jpg">
                <span>${item.name}</span>
            </div>
            `
        })
    }
}

displayCart();
onLoadCartNumbers();