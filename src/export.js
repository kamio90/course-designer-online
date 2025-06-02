function exportToJSON() {
    const blob = new Blob([JSON.stringify(obstacles)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "parkour.json";
    link.click();
}

function importFromJSON() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = e => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = evt => {
            try {
                obstacles = JSON.parse(evt.target.result);
                draw();
            } catch {
                alert("Niepoprawny plik JSON");
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

function exportToPNG() {
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "parkour.png";
    link.click();
}
