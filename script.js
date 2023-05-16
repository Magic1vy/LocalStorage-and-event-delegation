const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];
const deleteAllButton = document.getElementById('deleteAll');
const checkAllButton = document.getElementById('checkAll');
const uncheckAllButton = document.getElementById('uncheckAll');


function addItem(e) {
    e.preventDefault();
    const text = (this.querySelector('[name=item')).value;
    const item = {
        text,
        done: false, 
    };
    items.push(item);
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items ));
    this.reset();
}

function populateList( plates = [], platesList){
    platesList.innerHTML = plates.map((plate, i ) => {
        return `
        <li>
        <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ?'checked' : ''} />
        <label for="item${i}">${plate.text} </label>
        </li>
        `;
    }).join(' ')
}

function toggleDone( ){
    if (!e.target.matches('input')) return;
    const el = e.target; 
    const index = el.dataset.index; 
    items[index].done = !items[index].done;
    localStorage.setItem('items', JSON.stringify(items ));
    populateList(items, itemsList); 
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click ', toggleDone);
populateList(items, itemsList);

function deleteAll() {
    items.length = 0;
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
}

function checkAll() {
    items.forEach(item => item.done = true);
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
}

function uncheckAll() {
    items.forEach(item => item.done = false);
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
}

deleteAllButton.addEventListener('click', deleteAll);
checkAllButton.addEventListener('click', checkAll);
uncheckAllButton.addEventListener('click', uncheckAll);
