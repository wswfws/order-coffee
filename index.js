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

    // Update the name attribute for radio buttons to ensure uniqueness
    const milkRadios = clone.querySelectorAll('input[name="milk"]');
    milkRadios.forEach(radio => {
        radio.setAttribute('name', `milk-${item_key}`);
    });

    removeBtn.addEventListener("click", () => {
        remove(clone)
    })

    const textarea = document.querySelector(`.item-${item_key} .additional-notes`);
    const formattedTextDiv = document.querySelector(`.item-${item_key} .formatted-text`);

    textarea.addEventListener('input', () => {
        const userInput = textarea.value;
        formattedTextDiv.innerHTML = formatText(userInput);
    });

    function formatText(text) {
        const keywords = ["срочно", "быстрее", "побыстрее", "скорее", "поскорее", "очень нужно"];
        const regex = new RegExp(keywords.join("|"), "gi");
        const formattedText = text.replace(regex, "<b>$&</b>");
        console.log('Original:', text, 'Formatted:', formattedText);
        return formattedText;
    }

    item_key++;
}

function remove(clone) {
    if (getOrderItems().length > 1) {
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

    // Get additional notes if they exist
    const additionalNotes = document.querySelector('#additional-notes')?.value || '';

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

    // Add notes to the order if they exist
    if (additionalNotes.trim()) {
        const notesHeader = document.createElement('h4');
        notesHeader.textContent = 'Дополнительные пожелания:';
        orderMessage.appendChild(notesHeader);

        const notesDiv = document.createElement('div');
        notesDiv.innerHTML = formatText(additionalNotes);
        notesDiv.classList.add('formatted-notes');
        orderMessage.appendChild(notesDiv);
    }

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

        const milkRadio = beverageElement.querySelector(`input[type=radio]:checked`);
        let milk = '';
        if (milkRadio) {
            switch (milkRadio.value) {
                case 'usual':
                    milk = 'обычное';
                    break;
                case 'no-fat':
                    milk = 'обезжиренное';
                    break;
                case 'soy':
                    milk = 'соевое';
                    break;
                case 'coconut':
                    milk = 'кокосовое';
                    break;
            }
        }

        const optionsCheckboxes = beverageElement.querySelectorAll('input[name="options"]:checked');
        const options = Array.from(optionsCheckboxes).map(checkbox => {
            switch (checkbox.value) {
                case 'whipped cream':
                    return 'взбитые сливки';
                case 'marshmallow':
                    return 'зефирки';
                case 'chocolate':
                    return 'шоколад';
                case 'cinnamon':
                    return 'корица';
                default:
                    return checkbox.value;
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


document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.querySelector('#additional-notes');
    const formattedTextDiv = document.querySelector('#formatted-text');

    textarea.addEventListener('input', () => {
        const userInput = textarea.value;
        formattedTextDiv.innerHTML = formatText(userInput);
    });

    function formatText(text) {
        const keywords = ["срочно", "быстрее", "побыстрее", "скорее", "поскорее", "очень нужно"];
        const regex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'gi');
        return text.replace(regex, '<b>$1</b>');
    }
});


const submitOrderButton = document.querySelector('.submit-order');
const orderTimeInput = document.getElementById('orderTime');
submitOrderButton.addEventListener('click', function() {
    const selectedTime = orderTimeInput.value;

    if (!selectedTime) {
        orderTimeInput.classList.add('error');
        alert('Пожалуйста, выберите время заказа');
        return;
    }

    const now = new Date();
    const currentHours = now.getHours().toString().padStart(2, '0');
    const currentMinutes = now.getMinutes().toString().padStart(2, '0');
    const currentTime = `${currentHours}:${currentMinutes}`;

    if (selectedTime < currentTime) {
        orderTimeInput.classList.add('error');
        alert('Мы не умеем перемещаться во времени. Выберите время позже, чем текущее');
    } else {
        hideModal();
    }
});