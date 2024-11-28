//import JSON from "./set.json";
//import data from './set.json';
import state from "./set.json" with { type: "json" };

const selectors = {
   stateJson: '#state',
   emptyState: '.empty-state',
   settingsTable: '.settings-table',
   createSettingButton: '[aria-controls="create-setting"]',
   settingsList: '.settings-list',
   settingTemplate: '#setting-line-template',
   settingLine: '.setting-line',
   settingLink: '.setting-link',
   settingStatusBadge: '.setting-status-badge',
   settingRemoveButton: '#delete-button-id'
}
function createSettingHandler() {
console.log("hello", state.products[2].price);
}

function removeSettingHandler(id) {
   // Видаляємо налаштування за ID
   state.settings = state.settings.filter(setting => setting.id !== id);

   // Оновлюємо рендеринг
   renderSettings();
}

createSettingHandler();
/**
 * Removes the setting from the state and the DOM.
 * @param {string} url
 * @param {string} elementId
 * @param {Object} settingLineElement - The setting line element to remove.
 */
function renderSettings() {
   const settingsList = document.querySelector('.settings-list');
   const emptyState = document.querySelector('.empty-state');
   const table = document.querySelector('.settings-table');

   // Очищаємо попередній рендеринг
   settingsList.innerHTML = '';

   // Якщо немає налаштувань, показуємо порожній стан
   if (state.settings.length === 0) {
      emptyState.style.display = 'block';
      table.style.display = 'none';
      return;
   } else {
      emptyState.style.display = 'none';
      table.style.display = 'table';
   }

   // Додаємо кожне налаштування
   state.settings.forEach(setting => {
      const row = document.createElement('tr');
      row.setAttribute('data-id', setting.id);

      // Назва налаштування
      const nameCell = document.createElement('td');
      nameCell.innerHTML = `<a href="setting.html?id=${setting.id}">${setting.title}</a>`;
      row.appendChild(nameCell);

      // Статус
      
      const statusCell = document.createElement('td');
      statusCell.innerText = setting.status;
      row.appendChild(statusCell);
      statusCell.classList.remove('draft', 'active'); // Очищаємо старі класи
      statusCell.classList.add(setting.status.toLowerCase());

      // Дії
      const actionCell = document.createElement('td');
      const deleteButton = document.createElement('button');
      deleteButton.classList.add('delete-icon');
      deleteButton.innerHTML = `<img src="image/Trash.jpg" alt="Delete" style="width: 20px; height: 20px;">`;
      
      deleteButton.addEventListener('click', () => removeSettingHandler(setting.id));
      actionCell.appendChild(deleteButton);
      row.appendChild(actionCell);

      // Додаємо рядок до таблиці
      settingsList.appendChild(row);
   });
}

renderSettings();
function addSettingHandler() {
   const newSetting = {
      id: Date.now(), // Генеруємо унікальний ID
      title: `New Setting ${state.settings.length + 1}`,
      status: 'draft'
   };

   // Додаємо нове налаштування до стану
   state.settings.push(newSetting);

   // Оновлюємо рендеринг
   renderSettings();
}
document.querySelector('.btn-create').addEventListener('click', addSettingHandler);
// Додаємо обробник для кнопки створення
document.querySelector('.btn-add').addEventListener('click', addSettingHandler);

deleteButton.addEventListener('click', () => removeSettingHandler(setting.id));
function redirectToPage(url) {
   if (url && typeof url === 'string') {
      window.location.href = url; // Використовуємо window.location для перенаправлення
      console.log(`Перенаправлення на: ${url}`);
   } else {
      console.error('Невірний URL для перенаправлення.');
   }
}
const button = document.getElementById('buttun-add');
button.addEventListener('click', () => {
   redirectToPage('../formula.html')
})
const button2 = document.getElementById('buttun-add-head');
button2.addEventListener('click', () => {
   redirectToPage('../formula.html')
})