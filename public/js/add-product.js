// Definimos la URL de la API para los productos
const API_URL = 'http://localhost:3000/api/products';

// Obtenemos una referencia al formulario de productos en el DOM
const productForm = document.getElementById('productForm');

// Añadimos un event listener para el evento 'submit' del formulario
productForm.addEventListener('submit', async (e) => {
    // Prevenimos el comportamiento por defecto del formulario
    e.preventDefault();
    
    // Obtenemos los valores de los campos del formulario
    const name = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;
    const image_url = document.getElementById('productImage').value;
    const description = document.getElementById('productDescription').value;

    try {
        // Realizamos una solicitud POST a la API para crear un nuevo producto
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, price, image_url, description }),
        });
        
        // Si la respuesta es exitosa, mostramos un mensaje y reseteamos el formulario
        if (response.ok) {
            alert('Producto agregado con éxito!');
            productForm.reset();
        } else {
            // Si hay un error, mostramos un mensaje de error
            alert('Error al agregar el producto. Por favor, inténtalo de nuevo.');
        }
    } catch (error) {
        // Si ocurre una excepción, la registramos en la consola y mostramos un mensaje de error
        console.error('Error al agregar producto:', error);
        alert('Hubo un error al agregar el producto. Por favor, inténtalo de nuevo.');
    }
});