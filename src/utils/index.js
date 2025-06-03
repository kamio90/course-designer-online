export function formatDate(dt) {
    // YYYY-MM-DD → DD.MM.YYYY
    const [y, m, d] = dt.split('-');
    return `${d}.${m}.${y}`;
}
