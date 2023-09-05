addEventListener('DOMContentLoaded', () => {
    const boton_menu = document.querySelector('.boton_menu');

    if(boton_menu){
        boton_menu.addEventListener('click', () => {
            const menu_items = document.querySelector('.menu_items');
            menu_items.classList.toggle('show');
        })
    }
})