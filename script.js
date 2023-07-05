const bar = document.getElementById('bar');
const nav = document.getElementById('navbar');
const close = document.getElementById('close');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}

const API_URL = 'https://fakestoreapi.com/products';
const card = document.getElementById('pro-card');

getProducts(API_URL);

async function getProducts(url) {
    const resp = await fetch(url);
    const data = await resp.json();

    if (window.location.pathname.includes('shop.html')) {
        // Display all products on the shop page
        showProducts(data);
      } else {
        // Filter products by category for home page
        const filteredProducts = data.filter(
          (product) =>
            product.category === "men's clothing" || product.category === "women's clothing"
        );
    
        const selectedProducts = filteredProducts.slice(0, 8);
    
        showProducts(selectedProducts);
      }
}

function showProducts(products) {
    let data1 = "";
    products.map((values) => {
        const { id, title, price, image } = values;
        data1 += `
        <div class="pro" id="product" onclick="openProductPage(${id})">
            <img src=${image} alt="">
            <div class="description">
                <span>adidas</span>
                <h5>${title}</h5>
                <div class="star">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
                <h4>${price}</h4>
            </div>
            <a href="#"><i id="cart" class="fal fa-shopping-cart" aria-hidden="true"></i></a>
        </div>
        `
    });
    card.innerHTML = data1;
}

function openProductPage(id) {
    window.location.href = `product.html?id=${id}`;
}