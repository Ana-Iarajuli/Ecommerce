const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
const product_details = document.getElementById('product-details');
const card = document.getElementById('pro-card');

const API_URL = `https://fakestoreapi.com/products/${productId}`;


getProduct(API_URL);

async function getProduct(url) {
    const resp = await fetch(url);
    const data = await resp.json();

    showProduct(data);
    similarproducts(data);
}

function showProduct(product) {

    let pro1 = `
    <div class="product-image">
        <img src="${product.image}" width="100%" alt="">
    </div>

    <div class="product-info">
        <h4>${product.category}</h4>
        <h2>$${product.price}</h2>
        <select name="" id="">
            <option value="">Select Size</option>
            <option value="">XL</option>
            <option value="">XXL</option>
            <option value="">Small</option>
            <option value="">Large</option>
        </select>
        <input type="number" value="1">
        <button class="normal">Add To Cart</button>
        <h4>Product Details</h4>
        <span>${product.description}</span>
    </div>
    `;

    product_details.innerHTML = pro1;
}

async function similarproducts(product) {
    const CATEGORY_API_URL = `https://fakestoreapi.com/products/category/${product.category}`;
    console.log(CATEGORY_API_URL);
  
    try {
      const resp = await fetch(CATEGORY_API_URL);
      const data = await resp.json();
  
      let data1 = "";
      let count = 0;
  
      data.forEach((values) => {
        if (count >= 4) {
          return;
        }
  
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
        `;
  
        count++;
      });
  
      card.innerHTML = data1;
    } catch (error) {
      console.error('Error:', error);
    }
}
  
function openProductPage(id) {
    window.location.href = `product.html?id=${id}`;
}