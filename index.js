const template = document.getElementById("beverage-template");
const orderCoffee = document.getElementById("order-coffee");


let item_key = 1;

const addOrderItem = () => {
    const clone = template.cloneNode(true);
    clone.style.display = "block";
    clone.classList.add(`item-${item_key}`);
    clone.classList.remove(`beverage-template`);
    orderCoffee.insertBefore(clone, orderCoffee.firstChild);

    const name = document.querySelector(`.item-${item_key} > h4`);
    name.textContent = `Напиток №${item_key}`;
    const removeBtn = document.querySelector(`.item-${item_key} > .remove-button`);

    removeBtn.addEventListener("click", ()=>{
        remove(clone)
    })

    item_key++;
}

function remove(clone) {
    if (item_key > 2) {
        clone.remove();
    }
}

document.getElementById("add-button").addEventListener("click", addOrderItem);

const form = document.querySelector('form');
const modal = document.getElementById('orderModal');
const closeCross = modal.querySelector('.modal-close');
const overlay = modal.querySelector('.modal-overlay');
const orderMessage = modal.querySelector('#orderMessage');

form.addEventListener('submit', e => {
    e.preventDefault();

    const beverages = getOrderItems();
    const count = beverages.length;

    // Склонение слова "напиток"
    let drinkWord;
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastDigit === 1 && lastTwoDigits !== 11) {
        drinkWord = "напиток";
    } else if ([2, 3, 4].includes(lastDigit) && ![12, 13, 14].includes(lastTwoDigits)) {
        drinkWord = "напитка";
    } else {
        drinkWord = "напитков";
    }

    orderMessage.innerHTML = `Вы заказали ${count} ${drinkWord}<br><br>`;

    // Создаем таблицу
    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Напиток</th>
                <th>Молоко</th>
                <th>Дополнительно</th>
            </tr>
        </thead>
        <tbody>
            ${beverages.map(beverage => `
                <tr>
                    <td>${beverage.type}</td>
                    <td>${beverage.milk}</td>
                    <td>${beverage.options.join(', ')}</td>
                </tr>
            `).join('')}
        </tbody>
    `;

    // Очищаем предыдущее содержимое и добавляем новое
    orderMessage.innerHTML = `Вы заказали ${count} ${drinkWord}<br><br>`;
    orderMessage.appendChild(table);

    modal.classList.remove('hidden');
});

function hideModal() {
    modal.classList.add('hidden');
}

const getOrderItems = () => {
    const beverages = [];
    const beverageElements = document.querySelectorAll('.beverage:not(.beverage-template)');

    beverageElements.forEach(beverageElement => {
        const typeSelect = beverageElement.querySelector('select');
        const type = typeSelect.options[typeSelect.selectedIndex].text;

        const milkRadio = beverageElement.querySelector('input[name="milk"]:checked');
        let milk = '';
        if (milkRadio) {
            switch(milkRadio.value) {
                case 'usual': milk = 'обычное'; break;
                case 'no-fat': milk = 'обезжиренное'; break;
                case 'soy': milk = 'соевое'; break;
                case 'coconut': milk = 'кокосовое'; break;
            }
        }

        const optionsCheckboxes = beverageElement.querySelectorAll('input[name="options"]:checked');
        const options = Array.from(optionsCheckboxes).map(checkbox => {
            switch(checkbox.value) {
                case 'whipped cream': return 'взбитые сливки';
                case 'marshmallow': return 'зефирки';
                case 'chocolate': return 'шоколад';
                case 'cinnamon': return 'корица';
                default: return checkbox.value;
            }
        });

        beverages.push({
            type,
            milk,
            options
        });
    });

    return beverages;
}

closeCross.addEventListener('click', hideModal);
overlay.addEventListener('click', hideModal);