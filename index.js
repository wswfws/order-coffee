const template = document.getElementById("beverage");
const orderCoffee = document.getElementById("order-coffee");


let items = 1;

const addOrderItem = ()=> {
    const clone = template.cloneNode(true);
    clone.style.display = "block";
    clone.classList.add(`item-${items}`);
    orderCoffee.insertBefore(clone, orderCoffee.firstChild);

    const name = document.querySelector(`.item-${items} > h4`);
    name.textContent = `Напиток №${items}`;
    items++;
}

document.getElementById("add-button").addEventListener("click", addOrderItem);