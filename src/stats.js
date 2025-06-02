function updateStats(obstacles) {
    const speed = 350; // m/min
    let distance = 0;

    for (let i = 0; i < obstacles.length - 1; i++) {
        const from = obstacles[i];
        const to = obstacles[i + 1];
        const p1 = { x: from.x, y: from.y };
        const p2 = { x: to.x, y: to.y };
        const cp = from.controlPoint;

        if (cp) {
            distance += getQuadraticCurveLength(p1, cp, p2);
        } else {
            distance += getDistance(p1, p2);
        }
    }

    const meters = Math.round(pxToMeters(distance));
    const timeAllowed = Math.round((meters / speed) * 60);
    const timeLimit = timeAllowed * 2;
    const efforts = obstacles.length;

    document.getElementById("stat-speed").textContent = speed;
    document.getElementById("stat-distance").textContent = meters;
    document.getElementById("stat-allowed").textContent = timeAllowed;
    document.getElementById("stat-limit").textContent = timeLimit;
    document.getElementById("stat-obstacles").textContent = obstacles.length;
    document.getElementById("stat-efforts").textContent = efforts;
}
