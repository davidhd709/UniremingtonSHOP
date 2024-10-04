const API_URL = 'http://localhost:3000/api/products';
const editProductForm = document.getElementById('editProductForm');

// Función para cargar los datos del producto
async function loadProduct(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) {
            throw new Error('No se pudo obtener el producto');
        }
        const product = await response.json();
        
        // Rellenar el formulario con los datos del producto
        document.getElementById('productId').value = product.id;
        document.getElementById('productName').value = product.name;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productImage').value = product.image_url;
        document.getElementById('productDescription').value = product.description;
    } catch (error) {
        console.error('Error al cargar el producto:', error);
    }
}

// Manejador del evento de envío del formulario
editProductForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('productId').value;
    const name = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;
    const image_url = document.getElementById('productImage').value;
    const description = document.getElementById('productDescription').value;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, price, image_url, description }),
        });
        if (response.ok) {
            alert('Producto actualizado con éxito!');
            window.location.href = 'index.html'; // Redirige a la lista de productos
        } else {
            alert('Error al actualizar el producto. Por favor, inténtalo de nuevo.');
        }
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        alert('Hubo un error al actualizar el producto. Por favor, inténtalo de nuevo.');
    }
});

// Obtiene el ID del producto de la URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
if (productId) {
    loadProduct(productId); // Carga los datos del producto
} else {
    alert('No se proporcionó un ID de producto.');
}
