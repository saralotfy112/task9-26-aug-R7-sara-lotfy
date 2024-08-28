
document.addEventListener('DOMContentLoaded', function () {
    loadProducts();
});

function addProduct() {
    var id = document.getElementById('id').value;
    var name = document.getElementById('name').value;
    var price = parseFloat(document.getElementById('price').value);
    var desc = document.getElementById('desc').value;
    var rate = parseInt(document.getElementById('rate').value);
    var quantity = parseInt(document.getElementById('quantity').value);

    if (!id || !name || isNaN(price) || !desc || isNaN(rate) || isNaN(quantity)) {
        alert('Please fill in all fields ');
        return;
    }

    var products = JSON.parse(localStorage.getItem('products'));

    var newProduct = { id, name, price, desc, rate, quantity };

    
        products.push(newProduct);
        localStorage.setItem('products', JSON.stringify(products));


    clearForm();


    loadProducts();
}

function loadProducts() {
    var products = JSON.parse(localStorage.getItem('products')) ;
    var tableBody = document.querySelector('#productTable tbody');
    
    // Clear the existing table rows
    tableBody.innerHTML = '';

    products.forEach(product => {
        var row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.desc}</td>
            <td>${product.rate}</td>
            <td>${product.quantity}</td>
            <td>
                <button onclick="editProduct('${product.id}')">EDIT</button>
                <button onclick="deleteProduct('${product.id}')">DELETE</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function clearForm() {
    document.getElementById('id').value = '';
    document.getElementById('name').value = '';
    document.getElementById('price').value = '';
    document.getElementById('desc').value = '';
    document.getElementById('rate').value = '';
    document.getElementById('quantity').value = '';
}

function editProduct(id) {
    var products = JSON.parse(localStorage.getItem('products')) || [];
    var product = products.find(p => p.id === id);

    if (product) {
        document.getElementById('id').value = product.id;
        document.getElementById('name').value = product.name;
        document.getElementById('price').value = product.price;
        document.getElementById('desc').value = product.desc;
        document.getElementById('rate').value = product.rate;
        document.getElementById('quantity').value = product.quantity;
    }
}

function deleteProduct(id) {
    var products = JSON.parse(localStorage.getItem('products')) || [];
    var updatedProducts = products.filter(p => p.id !== id);

    localStorage.setItem('products', JSON.stringify(updatedProducts));

    loadProducts();
}
