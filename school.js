// 検索と性別フィルター
const searchBox = document.getElementById('searchBox');
const filterCheckboxes = document.querySelectorAll('#filterSex input[type="checkbox"]');
const table = document.getElementById('schoolTable').getElementsByTagName('tbody')[0];
const rows = table.getElementsByTagName('tr');

searchBox.addEventListener('input', filterTable);
filterCheckboxes.forEach(cb => cb.addEventListener('change', filterTable));

function filterTable() {
  const keyword = searchBox.value.toLowerCase();
  const selectedSex = Array.from(filterCheckboxes).filter(cb => cb.checked).map(cb => cb.value);

  for (let row of rows) {
    const name = row.cells[1].textContent.toLowerCase();
    const sex = row.getAttribute('data-sex');

    if (name.includes(keyword) && selectedSex.includes(sex)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  }
}

// モーダル表示
const modal = document.getElementById('modal');
const modalName = document.getElementById('modal-name');
const modalDesc = document.getElementById('modal-desc');
const modalDev = document.getElementById('modal-dev');
const modalSex = document.getElementById('modal-sex');
const modalPlace = document.getElementById('modal-place');
const closeBtn = document.querySelector('.close-btn');

for (let row of rows) {
  const nameCell = row.querySelector('.school-name');
  nameCell.addEventListener('click', () => {
    modalName.textContent = nameCell.textContent;
    modalDesc.textContent = row.getAttribute('data-desc');
    modalDev.textContent = row.getAttribute('data-dev');
    modalSex.textContent = row.getAttribute('data-sex');
    modalPlace.textContent = row.getAttribute('data-place');
    modal.style.display = 'block';
  });
}

closeBtn.addEventListener('click', () => { modal.style.display = 'none'; });
window.addEventListener('click', e => { if(e.target == modal) modal.style.display = 'none'; });

// 偏差値ソート
const devHeader = document.getElementById('devHeader');
let asc = false;
devHeader.addEventListener('click', () => {
  const sortedRows = Array.from(rows).sort((a,b) => {
    return asc ? a.getAttribute('data-dev') - b.getAttribute('data-dev') : b.getAttribute('data-dev') - a.getAttribute('data-dev');
  });
  asc = !asc;
  sortedRows.forEach(r => table.appendChild(r));
});
