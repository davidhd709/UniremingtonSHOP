// Definimos la URL de la API para los productos
const API_URL = 'http://localhost:3000/api/products';

// Obtenemos una referencia al formulario de edición de productos en el DOM
const editProductForm = document.getElementById('editProductForm');

// Función asíncrona para cargar los datos del producto
async function loadProduct(id) {
    try {
        // Realizamos una solicitud GET a la API para obtener los datos del producto
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) {
            throw new Error('No se pudo obtener el producto');
        }
        const product = await response.json();
        
        // Rellenamos el formulario con los datos del producto
        document.getElementById('productId').value = product.id;
        document.getElementById('productName').value = product.name;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productImage').value = product.image_url;
        document.getElementById('productDescription').value = product.description;
    } catch (error) {
        console.error('Error al cargar el producto:', error);
    }
}

// Añadimos un event listener para el evento 'submit' del formulario
editProductForm.addEventListener('submit', async (e) => {
    // Prevenimos el comportamiento por defecto del formulario
    e.preventDefault();
    
    // Obtenemos los valores de los campos del formulario
    const id = document.getElementById('productId').value;
    const name = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;
    const image_url = document.getElementById('productImage').value;
    const description = document.getElementById('productDescription').value;

    try {
        // Realizamos una solicitud PUT a la API para actualizar el producto
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, price, image_url, description }),
        });
        
        // Si la respuesta es exitosa, mostramos un mensaje y redirigimos a la página principal
        if (response.ok) {
            alert('Producto actualizado con éxito!');
            window.location.href = 'index.html';
        } else {
            // Si hay un error, mostramos un mensaje de error
            alert('Error al actualizar el producto. Por favor, inténtalo de nuevo.');
        }
    } catch (error) {
        // Si ocurre una excepción, la registramos en la consola y mostramos un mensaje de error
        console.error('Error al actualizar producto:', error);
        alert('Hubo un error al actualizar el producto. Por favor, inténtalo de nuevo.');
    }
});

// Obtenemos el ID del producto de la URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
if (productId) {
    loadProduct(productId); // Cargamos los datos del producto
} else {
    alert('No se proporcionó un ID de producto.');
}