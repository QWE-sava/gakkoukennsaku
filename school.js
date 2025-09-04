const table = document.getElementById('schoolTable');
const tbody = table.querySelector('tbody');
const header = document.getElementById('devHeader');
const searchBox = document.getElementById('searchBox');
const filterCheckboxes = document.querySelectorAll('#filterSex input[type="checkbox"]');
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

// 検索と性別絞り込み
function filterTable() {
  const keyword = searchBox.value.trim();
  const selectedSex = Array.from(filterCheckboxes)
    .filter(cb => cb.checked)
    .map(cb => cb.value);

  Array.from(tbody.querySelectorAll('tr')).forEach(tr => {
    const name = tr.cells[1].textContent;
    const sex = tr.dataset.sex;
    const matchKeyword = name.includes(keyword);
    const matchSex = selectedSex.includes(sex);
    tr.style.display = matchKeyword && matchSex ? '' : 'none';
  });

  // 順位再計算
  const visible = Array.from(tbody.querySelectorAll('tr')).filter(tr => tr.style.display !== 'none');
  visible.forEach((tr, i) => tr.cells[0].textContent = i + 1);
}

searchBox.addEventListener('input', filterTable);
filterCheckboxes.forEach(cb => cb.addEventListener('change', filterTable));

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
