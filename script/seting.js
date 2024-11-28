import state from "./set.json" with { type: "json" };
function renderFormulas(settingId) {
   const formulasList = document.querySelector('.formulas'); // Контейнер для формул
   const emptyState = document.querySelector('.empty-state'); // Порожній стан
   const table = document.querySelector('.fon'); // Таблиця для формул

   // Знаходимо налаштування за його id
   const setting = state.settings.find(s => s.id === settingId);

   // Якщо налаштування не знайдено або формули відсутні
   if (!setting || setting.formulas.length === 0) {
      emptyState.style.display = 'block';
      table.style.display = 'none';
      return;
   } else {
      emptyState.style.display = 'none';
      table.style.display = 'block';
   }

   // Очищаємо попередній рендеринг
   formulasList.innerHTML = '';
   // Додаємо кожну формулу
   setting.formulas.forEach(formula => {
      const formulaRow = document.createElement('div');
      formulaRow.classList.add('formula');
   
      
      formulaRow.setAttribute('data-id', formula.id);

      // Назва формули
      const nameDiv = document.createElement('div');
      nameDiv.classList.add('text');
      nameDiv.innerHTML = `<a>${formula.title}</a>`;
      formulaRow.appendChild(nameDiv);

      // Блок дій
      const actionDiv = document.createElement('div');
      actionDiv.classList.add('imgd');

      // Кнопка редагування
      const editButton = document.createElement('button');
      editButton.innerHTML = `<img src="image/change.jpg" alt="Edit">`;
      editButton.addEventListener('click', () => editFormula(formula.id));
      actionDiv.appendChild(editButton);

      // Кнопка видалення
      const deleteButton = document.createElement('button');
      deleteButton.innerHTML = `<img src="image/Trash.jpg" alt="Delete">`;
      deleteButton.addEventListener('click', () => deleteFormula(formula.id, settingId));
      actionDiv.appendChild(deleteButton);

      // Додаємо блок дій до рядка
      formulaRow.appendChild(actionDiv);

      // Додаємо формулу до списку
      formulasList.appendChild(formulaRow);
   });
}
state.settings.forEach(setting =>{
renderFormulas(setting.id) });
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
function deleteFormula(formulaId, settingId) {
   const setting = state.settings.find(s => s.id === settingId);
   if (setting) {
      // Видаляємо формулу зі списку формул
      setting.formulas = setting.formulas.filter(f => f.id !== formulaId);
      renderFormulas(settingId); // Оновлюємо рендеринг
   }
}
document.querySelectorAll('.form-del').forEach(button => {
   button.addEventListener('click', (event) => {
      const formulaId = parseInt(event.target.dataset.formulaId, 10); // ID формули
      const settingId = parseInt(event.target.dataset.settingId, 10); // ID налаштування
      deleteFormula(formulaId, settingId);
   });
});
const url = new URL(window.location.href);
function editFormula(formulaId) {
   window.location.href = `../formula.html${url.search}`;
}
function getUrlParams(url) {
   const params = new URL(url).searchParams;
   return Object.fromEntries(params.entries());
}

console.log("looooooooooooooooooooooooooooooooooooooooooooooooooooooooool")

const params = getUrlParams(window.location.href);
console.log('URL Parameters:', params);

