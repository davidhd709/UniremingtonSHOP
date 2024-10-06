// Definimos la URL de la API para los productos
const API_URL = 'http://localhost:3000/api/products';

// Obtenemos referencias a elementos del DOM
const productList = document.getElementById('productList');
const productForm = document.getElementById('productForm');
const filterButton = document.getElementById('filterButton');
const categorySelect = document.getElementById('categorySelect');
const promotionList = document.getElementById('promotionList');

// Variables para almacenar todos los productos y categorías
let allProducts = [];
let categories = [];

// Función asíncrona para cargar los productos
async function loadProducts() {
    try {
        // Realizamos una solicitud GET a la API para obtener los productos
        const response = await fetch(API_URL);
        allProducts = await response.json();
        displayProducts(allProducts);
        loadCategories();
        displayPromotions();
        // Actualizamos las promociones cada 5 segundos
        setInterval(displayPromotions, 5000);
    } catch (error) {
        console.error('Error al cargar productos:', error);
    }
}

// Función asíncrona para cargar las categorías
async function loadCategories() {
    try {
        const response = await fetch('http://localhost:3000/api/categories');
        categories = await response.json();
        fillCategorySelect(categories);
    } catch (error) {
        console.error('Error al cargar categorías:', error);
    }
}

// Función para llenar el select de categorías
function fillCategorySelect(categories) {
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        categorySelect.appendChild(option);
    });
}

// Event listener para el botón de filtrado
filterButton.addEventListener('click', () => {
    const filterValue = filterInput.value.trim().toLowerCase();
    const selectedCategory = categorySelect.value;

    // Filtramos los productos basándonos en el nombre y la categoría
    const filteredProducts = allProducts.filter(product => {
        const matchesName = product.name.toLowerCase().includes(filterValue);
        const matchesCategory = selectedCategory ? product.categoryId === selectedCategory : true;

        return matchesName && matchesCategory;
    });

    displayProducts(filteredProducts);
});

// Función para mostrar los productos en la página
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

// Función para editar un producto
async function editProduct(id) {
    window.location.href = `edit-product.html?id=${id}`;
}

// Función para eliminar un producto
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

// Función para obtener productos aleatorios
function getRandomProducts(num) {
    const shuffled = allProducts.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

// Función para mostrar productos en promoción
function displayPromotions() {
    promotionList.innerHTML = '';
    const randomProducts = getRandomProducts(4);

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

// Cargamos los productos cuando se carga la página
document.addEventListener('DOMContentLoaded', loadProducts);