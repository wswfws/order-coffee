const template = document.getElementById("beverage-template");
const orderCoffee = document.getElementById("order-coffee");


let item_key = 1;

const addOrderItem = () => {
    const clone = template.cloneNode(true);
    clone.style.display = "block";
    clone.classList.add(`item-${item_key}`);
    orderCoffee.insertBefore(clone, orderCoffee.firstChild);

    const name = document.querySelector(`.item-${item_key} > h4`);
    name.textContent = `Напиток №${item_key}`;
    const removeBtn = document.querySelector(`.item-${item_key} > .remove-button`);

    removeBtn.addEventListener("click", ()=>{
        clone.remove();
    })

    item_key++;
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
    getOrderItems()
    modal.classList.remove('hidden');
});

function hideModal() {
    modal.classList.add('hidden');
}

const getOrderItems = () => {
    form.childNodes.forEach((item) => {
        console.log(item);
    })
}

closeCross.addEventListener('click', hideModal);
overlay.addEventListener('click', hideModal);

document.querySelectorAll('.remove-button').forEach(button => {
    button.addEventListener('click', function() {
        const beverageFieldset = this.closest('.beverage');
        console.log(beverageFieldset);
        beverageFieldset.remove();
    });
});