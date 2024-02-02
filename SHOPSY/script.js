async function fetchData() {
    try {
        const response = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
        const data = await response.json();
        return data.categories;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function showTab(category) {
    document.getElementById('menProducts').style.display = 'none';
    document.getElementById('womenProducts').style.display = 'none';
    document.getElementById('kidsProducts').style.display = 'none';

    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('selected');
    });

    document.getElementById(category).classList.add('selected');

    if (category !== 'men' && category !== 'women' && category !== 'kids') {
        return;
    }

   
    fetchData().then(categories => {
        const selectedCategory = categories.find(cat => cat.category_name.toLowerCase() === category.toLowerCase());
        if (selectedCategory) {
            renderProductCards(category, selectedCategory.category_products);
        }
    });
}

function renderProductCards(containerId, products) {
    const container = document.getElementById(containerId + 'Products');
    container.style.display = 'flex';

    container.innerHTML = '';

    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product-section');

      
        const price = parseFloat(product.price);
        const comparePrice = parseFloat(product.compare_at_price);
        const discountPercentage = ((comparePrice - price) / comparePrice) * 100;

        card.innerHTML = `
           <div> <img src="${product.image}" alt="${product.title}"></div>
            <div class="title">${product.title}  .</div>
            <div class="vendor">${product.vendor}</div>
            <div class="price-label">RS  ${product.price}.00</div>
            <div class="compare-price">${product.compare_at_price}</div>
            <div class="discount">${Math.round(discountPercentage)}% Off</div>
            <button>Add to Cart</button>
        `;

        container.appendChild(card);
    });
}

