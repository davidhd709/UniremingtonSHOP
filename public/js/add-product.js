const API_URL = 'http://localhost:3000/api/products';
const productForm = document.getElementById('productForm');

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
            alert('Producto agregado con éxito!');
            productForm.reset();
        } else {
            alert('Error al agregar el producto. Por favor, inténtalo de nuevo.');
        }
    } catch (error) {
        console.error('Error al agregar producto:', error);
        alert('Hubo un error al agregar el producto. Por favor, inténtalo de nuevo.');
    }
});
