const API_URL = 'http://localhost:3000/api/products';
const productList = document.getElementById('productList');
const productForm = document.getElementById('productForm');
const filterButton = document.getElementById('filterButton');
const categorySelect = document.getElementById('categorySelect');
const promotionList = document.getElementById('promotionList');

let allProducts = []; // Variable para almacenar todos los productos
let categories = []; // Variable para almacenar todas las categorías

async function loadProducts() {
    try {
        const response = await fetch(API_URL);
        allProducts = await response.json(); // Guardamos todos los productos
        displayProducts(allProducts); // Mostramos todos los productos al cargar
        loadCategories(); // Cargamos las categorías
        displayPromotions(); // Muestra productos aleatorios en promociones
        setInterval(displayPromotions, 5000); // Cambia las promociones cada 3 segundos
    } catch (error) {
        console.error('Error al cargar productos:', error);
    }
}

async function loadCategories() {
    try {
        const response = await fetch('http://localhost:3000/api/categories');
        categories = await response.json();
        fillCategorySelect(categories);
    } catch (error) {
        console.error('Error al cargar categorías:', error);
    }
}

function fillCategorySelect(categories) {
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id; 
        option.textContent = category.name;
        categorySelect.appendChild(option);
    });
}

filterButton.addEventListener('click', () => {
    const filterValue = filterInput.value.trim().toLowerCase();
    const selectedCategory = categorySelect.value;

    const filteredProducts = allProducts.filter(product => {
        const matchesName = product.name.toLowerCase().includes(filterValue);
        const matchesCategory = selectedCategory ? product.categoryId === selectedCategory : true; // Filtrar por categoría

        return matchesName && matchesCategory;
    });

    displayProducts(filteredProducts);
});

function displayProducts(products) {
    productList.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image_url}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description || 'Descripción no disponible'}</p>
            <div class="price">$${product.price}</div>
            <button class="edit" onclick="editProduct(${product.id})">Editar</button>
            <button class="delete" onclick="deleteProduct(${product.id})">Eliminar</button>
            <button class="buy">Comprar</button>
        `;
        productList.appendChild(productCard);
    });
}

async function editProduct(id) {
    window.location.href = `edit-product.html?id=${id}`;
}

async function deleteProduct(id) {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                loadProducts();
            } else {
                throw new Error('No se pudo eliminar el producto');
            }
        } catch (error) {
            console.error('Error al eliminar producto:', error);
            alert('Hubo un error al eliminar el producto. Por favor, inténtalo de nuevo.');
        }
    }
}

function getRandomProducts(num) {
    const shuffled = allProducts.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

function displayPromotions() {
    promotionList.innerHTML = '';
    const randomProducts = getRandomProducts(4); // Cambia el número según lo que desees mostrar

    randomProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image_url}" alt="${product.name}">
            <h3>${product.name}</h3>
            <div class="price">$${product.price}</div>
            <button class="buy">Comprar</button>
        `;
        promotionList.appendChild(productCard);
    });
}

// Llama a la función al cargar la página
document.addEventListener('DOMContentLoaded', loadProducts);
