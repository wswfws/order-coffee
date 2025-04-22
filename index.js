const template = document.getElementById("beverage");
const orderCoffee = document.getElementById("order-coffee");


let items = 1;

const addOrderItem = () => {
    const clone = template.cloneNode(true);
    clone.style.display = "block";
    clone.classList.add(`item-${items}`);
    orderCoffee.insertBefore(clone, orderCoffee.firstChild);

    const name = document.querySelector(`.item-${items} > h4`);
    name.textContent = `Напиток №${items}`;
    items++;
}

document.getElementById("add-button").addEventListener("click", addOrderItem);

const form = document.querySelector('form');
const modal = document.getElementById('orderModal');
const closeCross = modal.querySelector('.modal-close');
const overlay = modal.querySelector('.modal-overlay');
const orderMessage = modal.querySelector('#orderMessage');

form.addEventListener('submit', e => {
    e.preventDefault();
    orderMessage.textContent = `Заказ принят!`;
    modal.classList.remove('hidden');
});

function hideModal() {
    modal.classList.add('hidden');
}

closeCross.addEventListener('click', hideModal);
overlay.addEventListener('click', hideModal);