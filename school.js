const table = document.getElementById('schoolTable');
const tbody = table.querySelector('tbody');
const header = document.getElementById('devHeader');
const searchBox = document.getElementById('searchBox');
let descending = true;

// 偏差値ソート
function sortByDev() {
  const trs = Array.from(tbody.querySelectorAll('tr'));
  trs.sort((a, b) =>
    descending
      ? parseFloat(b.dataset.dev) - parseFloat(a.dataset.dev)
      : parseFloat(a.dataset.dev) - parseFloat(b.dataset.dev)
  );
  trs.forEach((tr, i) => {
    tr.cells[0].textContent = i + 1;
    tbody.appendChild(tr);
  });
  header.textContent = `偏差値 ${descending ? '▼' : '▲'}`;
}
header.addEventListener('click', () => {
  descending = !descending;
  sortByDev();
});

// 検索機能
searchBox.addEventListener('input', () => {
  const keyword = searchBox.value.trim();
  Array.from(tbody.querySelectorAll('tr')).forEach(tr => {
    const nameCell = tr.cells[1].textContent;
    tr.style.display = nameCell.includes(keyword) ? '' : 'none';
  });
  const visible = Array.from(tbody.querySelectorAll('tr')).filter(tr => tr.style.display !== 'none');
  visible.forEach((tr, i) => tr.cells[0].textContent = i + 1);
});

// モーダル
const modal = document.getElementById('modal');
const closeBtn = document.querySelector('.close-btn');
const modalName = document.getElementById('modal-name');
const modalDesc = document.getElementById('modal-desc');
const modalDev = document.getElementById('modal-dev');
const modalSex = document.getElementById('modal-sex');
const modalPlace = document.getElementById('modal-place');

tbody.addEventListener('click', e => {
  if (e.target.classList.contains('school-name')) {
    const tr = e.target.closest('tr');
    modalName.textContent = e.target.textContent;
    modalDesc.textContent = tr.dataset.desc;
    modalDev.textContent = tr.dataset.dev;
    modalSex.textContent = tr.dataset.sex;
    modalPlace.textContent = tr.dataset.place;
    modal.style.display = 'block';
  }
});

closeBtn.addEventListener('click', () => modal.style.display = 'none');
window.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none'; });

// 初期ソート
window.addEventListener('DOMContentLoaded', sortByDev);
