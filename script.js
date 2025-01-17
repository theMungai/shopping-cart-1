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
                <button class="add-to-cart">
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