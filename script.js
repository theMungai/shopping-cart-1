let cart = []
let productsHTML = ""
products.forEach((product) => {
    productsHTML += `
        <div class="product-grid-cell">

            <div class="image-container">
                <picture>
                    <source media="(max-width:480px)" srcset="${product.image.mobile}">
                    <source media="(min-width:481px) and (max-width:1199px)" srcset="${product.image.tablet}">
                    <source media="(min-width:1200px) and (max-width:1900px)" srcset="${product.image.desktop}">
                    <img src="${product.image.thumbnail}" alt="">
                </picture>
            </div>

            <div class="button-container">
                <button class="add-to-cart js-add-to-cart-btn" data-product-name = "${product.name}" data-product-price = "${product.price.toFixed(2)}">
                    <img src="/assets/images/icon-add-to-cart.svg" alt="">
                    Add to cart
                </button>
            </div>

            <div class="product-details">
                <p class="main-product">${product.category}</p>
                <p class="full-product">${product.name}</p>
                <p class="product-price">$${product.price.toFixed(2)}</p>
            </div>
        </div>
    `;
})

document.querySelector(".products-grid").innerHTML = productsHTML


// Looping through the buttons 
const addToCartButtons = document.querySelectorAll(".js-add-to-cart-btn");
addToCartButtons.forEach((addButton) => {
    addButton.addEventListener("click", () => {
        const productName = addButton.dataset.productName;
        const productPrice = parseFloat(addButton.dataset.productPrice);

        const existingProduct = cart.find((product) => product.name === productName); 
        if(existingProduct){
            existingProduct.quantity += 1;
        }else{
            cart.push({
                name : productName,
                price : productPrice,
                quantity : 1
            })
        }
        updateCart()   
    });
});

function updateCart(){
    const cartContainer = document.querySelector(".cart-with-added-items");
    const cartQuantity = document.querySelector(".js-cart-quantity");

    let totalAmount = 0;

    cartContainer.innerHTML = ""
    cart.forEach((item) => {
        let cartHTML = `
            <div class="cart-added-items">
                <div class="added-items-details">
                    <div class="added-item-name">
                        <p class="full-name-product">${item.name}</p>
                    </div>
                    <div class="quantity-and-price">
                        <div class="item-quantity">${item.quantity}x</div>
                        <div class="price-per-item">@$${(item.price * 1).toFixed(2)}</div>
                        <div class="product-of-price-and-quantity">$${(item.quantity * item.price).toFixed(2)}</div>
                    </div>
                </div>

                <button class="remove-item-container">
                    <img src="/assets/images/icon-remove-item.svg" alt="">
                </button>
            </div>
            
        `;

        cartContainer.innerHTML += cartHTML
        totalAmount += item.price * item.quantity;
    })

    
    cartQuantity.textContent = cart.reduce((acc, item) => item.quantity + acc, 0)

    const totalHTML = `
        <div class="total">
            <p>Total</p>
            <h1>$${totalAmount.toFixed(2)}</h1>
        </div>
        <div class="confirm-order">
            <button class="confirm-order-btn">Confirm Order</button>
        </div>
    `;
    
    cartContainer.innerHTML += totalHTML;

}