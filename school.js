document.addEventListener('DOMContentLoaded', () => {
    const searchBox = document.getElementById('searchBox');
    const filterSex = document.getElementById('filterSex');
    const schoolTable = document.getElementById('schoolTable').querySelector('tbody');
    const devHeader = document.getElementById('devHeader');
    const modal = document.getElementById('modal');
    const modalName = document.getElementById('modal-name');
    const modalDesc = document.getElementById('modal-desc');
    const modalDev = document.getElementById('modal-dev');
    const modalSex = document.getElementById('modal-sex');
    const modalPlace = document.getElementById('modal-place');
    const closeModalBtn = document.querySelector('.close-btn');

    let rows = Array.from(schoolTable.querySelectorAll('tr'));
    let sortOrder = 'desc'; // デフォルトは降順

    // テーブルの表示を更新する関数
    const updateTableDisplay = () => {
        const searchText = searchBox.value.toLowerCase();
        const checkedGenders = Array.from(filterSex.querySelectorAll('input:checked')).map(checkbox => checkbox.value);

        rows.forEach(row => {
            const schoolName = row.cells[1].textContent.toLowerCase();
            const schoolSex = row.cells[3].textContent;

            const matchesSearch = schoolName.includes(searchText);
            const matchesGender = checkedGenders.includes(schoolSex);

            if (matchesSearch && matchesGender) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
        updateRankings();
    };

    // 順位を再計算して表示する関数
    const updateRankings = () => {
        let rank = 1;
        const visibleRows = schoolTable.querySelectorAll('tr:not([style*="display: none"])');
        visibleRows.forEach((row, index) => {
            row.cells[0].textContent = rank++;
        });
    };

    // 偏差値でソートする関数
    const sortTableByDev = () => {
        rows.sort((a, b) => {
            const devA = parseInt(a.dataset.dev);
            const devB = parseInt(b.dataset.dev);
            if (sortOrder === 'desc') {
                return devB - devA;
            } else {
                return devA - devB;
            }
        });

        rows.forEach(row => schoolTable.appendChild(row));
        updateRankings();

        // ソート順の表示を切り替える
        if (sortOrder === 'desc') {
            devHeader.textContent = '偏差値 ▲';
            sortOrder = 'asc';
        } else {
            devHeader.textContent = '偏差値 ▼';
            sortOrder = 'desc';
        }
    };

    // モーダル表示イベント
    schoolTable.addEventListener('click', (event) => {
        if (event.target.classList.contains('school-name')) {
            const row = event.target.closest('tr');
            modalName.textContent = event.target.textContent;
            modalDesc.textContent = row.dataset.desc;
            modalDev.textContent = row.dataset.dev;
            modalSex.textContent = row.dataset.sex;
            modalPlace.textContent = row.dataset.place;
            modal.style.display = 'block';
        }
    });

    // モーダルを閉じるイベント
    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // モーダルをウィンドウ外クリックで閉じる
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // 各イベントリスナーの設定
    searchBox.addEventListener('keyup', updateTableDisplay);
    filterSex.addEventListener('change', updateTableDisplay);
    devHeader.addEventListener('click', sortTableByDev);

    // 初期表示
    updateTableDisplay();
});
