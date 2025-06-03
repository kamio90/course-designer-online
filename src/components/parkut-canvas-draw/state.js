export function createParkurState(config = {}) {
    const {
        place = '',
        pxPerMeter = 20,
        width = 3000,
        height = 2000,
        polygon = [],
        objects = []
    } = config;

    return {
        place,
        pxPerMeter,
        width,
        height,
        points: polygon.length ? polygon.map(p => ({...p})) : [],
        objects: objects || [],
        draggingIdx: null,
        hoverIdx: null,
        hoverEdge: null,
        editingEdge: null,
        drawing: polygon.length === 0,
        undoStack: [],
        redoStack: [],
        lastArea: 0,
        edgeLengths: [],
        panX: 0,
        panY: 0,
        zoom: 1,
        isPanning: false,
        panOrigin: {x: 0, y: 0},
        hoverTooltip: null,
        mode: 'edit-area' // 'edit-area' | 'static-objects'
    };
}

export function edgeLength(p1, p2) {
    const dx = p2.x - p1.x, dy = p2.y - p1.y;
    return Math.sqrt(dx * dx + dy * dy);
}

export function pxToMeters(px, pxPerMeter) {
    return +(px / pxPerMeter).toFixed(2);
}

export function metersToPx(m, pxPerMeter) {
    return m * pxPerMeter;
}

export function polygonArea(vertices, pxPerMeter) {
    let area = 0, n = vertices.length;
    for (let i = 0; i < n; i++) {
        let j = (i + 1) % n;
        area += (vertices[i].x * vertices[j].y - vertices[j].x * vertices[i].y);
    }
    return Math.abs(area / 2) / (pxPerMeter * pxPerMeter);
}

// --- Pole elementu prostokątnego ---
export function rectArea(rect, pxPerMeter) {
    return Math.abs(rect.w * rect.h) / (pxPerMeter * pxPerMeter);
}
