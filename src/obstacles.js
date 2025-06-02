function drawStripedBar(ctx, x, y, length, height, rotation, stripeCount = 8) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);

    ctx.fillStyle = "#000";
    ctx.fillRect(-length / 2, -height / 2, length, height);

    const stripeWidth = length / stripeCount;
    ctx.fillStyle = "#fff";
    for (let i = 0; i < stripeCount; i += 2) {
        ctx.fillRect(-length / 2 + i * stripeWidth, -height / 2, stripeWidth, height);
    }

    ctx.strokeStyle = "#000";
    ctx.lineWidth = 1;
    ctx.strokeRect(-length / 2, -height / 2, length, height);

    ctx.restore();
}

function drawArrow(ctx, x, y, angle, totalLength = 70) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);

    const half = totalLength / 2;
    const arrowHeadSize = 6;

    ctx.strokeStyle = "#e53935";
    ctx.fillStyle = "#e53935";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(-half, 0);
    ctx.lineTo(half, 0);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(half, 0);
    ctx.lineTo(half - arrowHeadSize, -4);
    ctx.lineTo(half - arrowHeadSize, 4);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
}

function drawObstacle(ctx, obs, index, selected, mode) {
    ctx.save();
    ctx.translate(obs.x, obs.y);
    ctx.rotate((obs.rotation * Math.PI) / 180);

    const barLength = 50;
    const barHeight = 6;
    const spacing = 10;

    if (obs.type === "stacjonata") {
        drawStripedBar(ctx, 0, 0, barLength, barHeight, 0);
    } else if (obs.type === "okser") {
        drawStripedBar(ctx, 0, -spacing / 2, barLength, barHeight, 0);
        drawStripedBar(ctx, 0, spacing / 2 + barHeight, barLength, barHeight, 0);
    } else if (obs.type === "triple") {
        drawStripedBar(ctx, 0, -spacing, barLength, barHeight, 0);
        drawStripedBar(ctx, 0, 0, barLength, barHeight, 0);
        drawStripedBar(ctx, 0, spacing + barHeight, barLength, barHeight, 0);
    } else if (obs.type === "mur") {
        ctx.fillStyle = "#8d6e63";
        ctx.fillRect(-20, -15, 40, 30);
        ctx.strokeStyle = "#5d4037";
        for (let y = -15; y < 15; y += 6) {
            ctx.beginPath();
            ctx.moveTo(-20, y);
            ctx.lineTo(20, y);
            ctx.stroke();
        }
    } else if (obs.type === "row") {
        const grad = ctx.createLinearGradient(-30, 0, 30, 0);
        grad.addColorStop(0, "#2196f3");
        grad.addColorStop(1, "#bbdefb");
        ctx.fillStyle = grad;
        ctx.fillRect(-30, -10, 60, 20);
    }

    ctx.restore();

    // 🔴 Strzałka przez środek
    const angle = (obs.rotation + 90) * Math.PI / 180;
    drawArrow(ctx, obs.x, obs.y, angle, 70);

    // 🟠 Obręcz do rotacji
    if (obs === selected && mode === "rotate") {
        ctx.strokeStyle = "orange";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(obs.x, obs.y, 50, 0, 2 * Math.PI);
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = "#fff";
        ctx.strokeStyle = "orange";
        ctx.lineWidth = 2;
        ctx.arc(obs.x, obs.y - 50, 8, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }

    // 🔢 Numer przeszkody (poniżej przeszkody)
    ctx.beginPath();
    ctx.arc(obs.x, obs.y + 30, 12, 0, 2 * Math.PI);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.strokeStyle = "#ccc";
    ctx.stroke();

    ctx.fillStyle = "#333";
    ctx.font = "12px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(obs.label, obs.x, obs.y + 30);
}

// === CREATE OBSTACLE (pojedyncze i szereg) ===

function createObstacle(type, customLabel = "", config = null) {
    let label = "";

    if (customLabel) {
        label = customLabel;
    } else {
        const last = obstacles[obstacles.length - 1];
        if (last && typeof last.label === "string") {
            const match = /^(\d+)([A-Z]?)$/.exec(last.label);
            if (match) {
                const num = parseInt(match[1], 10);
                const letter = match[2];
                label = letter ? `${num}${String.fromCharCode(letter.charCodeAt(0) + 1)}` : `${num}A`;
            } else {
                label = `${obstacles.length + 1}`;
            }
        } else {
            label = "1";
        }
    }

    if (type === "szereg" && config) {
        const baseX = 100;
        const baseY = 100;
        const rotation = 0;
        const dx = Math.cos((rotation + 90) * Math.PI / 180);
        const dy = Math.sin((rotation + 90) * Math.PI / 180);
        const num = label.replace(/[A-Z]/g, "");
        const groupId = `szereg-${Date.now()}`;

        let posX = baseX;
        let posY = baseY;

        for (let i = 0; i < config.count; i++) {
            const subLabel = `${num}${String.fromCharCode(65 + i)}`;

            obstacles.push({
                type: config.types[i],
                label: subLabel,
                x: posX,
                y: posY,
                rotation,
                controlPoint: null,
                group: groupId
            });

            if (i < config.foulees.length) {
                posX += metersToPx(config.foulees[i]) * dx;
                posY += metersToPx(config.foulees[i]) * dy;
            }
        }

        document.getElementById("obstacle-label").value = "";
        draw();
        return;
    }

    // Pojedyncza przeszkoda
    obstacles.push({
        type,
        label,
        x: 100,
        y: 100,
        rotation: 0,
        controlPoint: null
    });

    document.getElementById("obstacle-label").value = "";
    draw();
}
