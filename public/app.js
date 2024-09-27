const API_URL = 'http://localhost:3000/api/products';
const productList = document.getElementById('productList');
const productForm = document.getElementById('productForm');

async function loadProducts() {
    try {
        const response = await fetch(API_URL);
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error al cargar productos:', error);
    }
}

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

productForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;
    const image_url = document.getElementById('productImage').value;
    const description = document.getElementById('productDescription').value;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, price, image_url, description }),
        });
        if (response.ok) {
            loadProducts();
            productForm.reset();
        }
    } catch (error) {
        console.error('Error al agregar producto:', error);
    }
});

async function editProduct(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) {
            throw new Error('No se pudo obtener el producto');
        }
        const product = await response.json();

        const name = prompt('Nuevo nombre del producto:', product.name);
        const price = prompt('Nuevo precio del producto:', product.price);
        const image_url = prompt('Nueva URL de la imagen del producto:', product.image_url);
        const description = prompt('Nueva descripción del producto:', product.description);

        if (name && price && image_url && description) {
            const updateResponse = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, price, image_url, description }),
            });
            if (updateResponse.ok) {
                loadProducts();
            } else {
                throw new Error('No se pudo actualizar el producto');
            }
        }
    } catch (error) {
        console.error('Error al editar producto:', error);
        alert('Hubo un error al editar el producto. Por favor, inténtalo de nuevo.');
    }
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

loadProducts();