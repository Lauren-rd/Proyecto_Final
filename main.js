const productos=[
    {
        "id": "collar-01",
        "titulo": "Collares love en rodio",
        "imagen": "collar1.jpeg",
        "categoria": {
            "nombre": "Collares",
            "id": "collares"
        },
        "precio": 35000
    },
    {
        "id": "pulsera-01",
        "titulo": "Manillas con inicial y corazón",
        "imagen": "Pulsera1.jpeg",
        "categoria": {
            "nombre": "Pulseras",
            "id": "pulseras"
        },
        "precio": 27000
    },
    {
        "id": "pulsera-02",
        "titulo": "Manillas con inicial",
        "imagen": "pulsera2.jpeg",
        "categoria": {
            "nombre": "Pulseras",
            "id": "pulseras"
        },
        "precio": 20000
    },
    {
        "id": "collar-02",
        "titulo": "Collar Candy",
        "imagen": "collar2.jpeg",
        "categoria": {
            "nombre": "Collares",
            "id": "collares"
        },
        "precio": 35000
    },  
    {
        "id": "collar-03",
        "titulo": "Collar Frutal",
        "imagen": "collar3.jpeg",
        "categoria": {
            "nombre": "Collares",
            "id": "collares"
        },
        "precio": 45000
    },
      {
        "id": "pulsera-03",
        "titulo": "Manillas de Proteccion",
        "imagen": "pulseras3.jpeg",
        "categoria": {
            "nombre": "Pulseras",
            "id": "pulseras"
        },
        "precio": 20000
    },  
    {
        "id": "collar-04",
        "titulo": "Collar Celeste",
        "imagen": "collar4.jpeg",
        "categoria": {
            "nombre": "Collares",
            "id": "collares"
        },
        "precio": 35000
    },  
    {
        "id": "collar-05",
        "titulo": "Collar Celeste",
        "imagen": "collar 5.jpeg",
        "categoria": {
            "nombre": "Collares",
            "id": "collares"
        },
        "precio": 35000
    },  
    {
        "id": "collar-06",
        "titulo": "Collar Letras",
        "imagen": "collar 6.jpeg",
        "categoria": {
            "nombre": "Collares",
            "id": "collares"
        },
        "precio": 25000
    },  
    {
        "id": "collar-07",
        "titulo": "Collar Ojo Turco",
        "imagen": "collar 7.jpeg",
        "categoria": {
            "nombre": "Collares",
            "id": "collares"
        },
        "precio": 35000
    },
      {
        "id": "pulsera-04",
        "titulo": "Pulseras Acero",
        "imagen": "pulsera 4.jpeg",
        "categoria": {
            "nombre": "Pulseras",
            "id": "pulseras"
        },
        "precio": 25000
    },
      {
        "id": "pulsera-05",
        "titulo": "Manilla Virgen de Guadalupe",
        "imagen": "pulsera 5.jpeg",
        "categoria": {
            "nombre": "Pulseras",
            "id": "pulseras"
        },
        "precio": 27000
    }
];
const contenedorProductos = document.getElementById("contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const textoInicio = document.getElementById("texto-inicio");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector(".numerito");

function cargarProductos(productosElegidos) {
    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;
        contenedorProductos.append(div);
    });
    actualizarBotonesAgregar();
}

function mostrarInicio() {
    textoInicio.style.display = "block";
    contenedorProductos.innerHTML = "";
    contenedorProductos.style.display = "none";
}

function mostrarProductos(productosAMostrar) {
    textoInicio.style.display = "none";
    contenedorProductos.style.display = "grid";
    cargarProductos(productosAMostrar);
}

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
        botonesCategorias.forEach(b => b.classList.remove("active"));
        e.currentTarget.classList.add("active");

        const categoriaId = e.currentTarget.id;

        if (categoriaId === "inicio") {
            mostrarInicio();
        } else if (categoriaId === "accesorios") {
            mostrarProductos(productos); 
        } else {
            const productosFiltrados = productos.filter(producto => producto.categoria.id === categoriaId);
            mostrarProductos(productosFiltrados);
        }
    });
});
mostrarInicio();

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
} 

let productosEnCarrito;
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");
if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e){
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
    const productoParaAgregar = { ...productoAgregado, cantidad: 1 };
    productosEnCarrito.push(productoParaAgregar);
}
     actualizarNumerito();
     localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
} 

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}