const form = document.querySelector('#rfq');
const result = document.querySelector('#rfq-result');
const output = document.querySelector('#rfq-text');
const status = document.querySelector('#copy-status');
let accent = 'Лаймовий';
const suitPreview = document.querySelector('#suit-preview');
const suitVariants = {
  'Лаймовий': 'assets/brand/product-suits-v2.jpg',
  'Помаранчевий': 'assets/brand/product-suits-orange-v3.jpg',
  'Блакитний': 'assets/brand/product-suits-blue-v3.jpg'
};
Object.values(suitVariants).forEach(src => { const image = new Image(); image.src = src; });

document.querySelectorAll('[data-product]').forEach(card => {
  card.addEventListener('click', () => { form.elements.product.value = card.dataset.product; });
});

document.querySelectorAll('[data-accent]').forEach(button => {
  button.addEventListener('click', () => {
    accent = button.dataset.accent;
    document.querySelectorAll('[data-accent]').forEach(item => {
      item.classList.toggle('is-active', item === button);
      item.setAttribute('aria-pressed', String(item === button));
    });
    document.querySelector('.custom-preview').style.setProperty('--picked', getComputedStyle(button).getPropertyValue('--swatch'));
    document.querySelector('#accent-name').textContent = accent.toLocaleUpperCase('uk');
    suitPreview.src = suitVariants[accent];
    suitPreview.alt = `Робочий костюм: колір акцентів — ${accent.toLocaleLowerCase('uk')}`;
  });
});

form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  output.value = `Запит на робочий одяг КОЛЯН\n\nІм’я: ${data.get('name')}\nКонтакт: ${data.get('contact')}\nНапрямок: ${data.get('product')}\nОрієнтовна кількість: ${data.get('quantity')}\nКолір акценту: ${accent}\nДодаткові побажання: ${data.get('details') || '—'}\n\nПрошу обговорити можливий комплект.`;
  result.hidden = false;
  status.textContent = 'Заявку сформовано. Скопіюйте текст для подальшого використання.';
  result.scrollIntoView({behavior:'smooth', block:'nearest'});
});

document.querySelector('#copy-rfq').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(output.value);
    status.textContent = 'Текст заявки скопійовано.';
  } catch {
    output.focus();
    output.select();
    status.textContent = 'Виділіть текст і скопіюйте його вручну.';
  }
});
