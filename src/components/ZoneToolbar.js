export const ZoneToolbar = {
    init() {
        const aside = document.getElementById('zone-toolbar');
        aside.innerHTML = `
          <div class="zone-toolbar">
            <div>Dodaj strefę:</div>
            <button data-zone="green">Zielona</button>
            <button data-zone="altana">Altana</button>
            <button data-zone="oczko">Oczko wodne</button>
            <button data-zone="drzewo">Drzewo</button>
            <button data-zone="krzak">Krzak</button>
          </div>
        `;
    }
};
