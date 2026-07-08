let canvas = document.getElementById("chart");
let ctx = canvas.getContext("2d");
let square;
let allBars = {};
const salesData = {
    Jan: 10,
    Feb: 20,
    Mar: 43,
    Apr: 12,
    May: 12,
    Jun: 10,
    July: 23,
    Aug: 26,
    Sep: 19,
    Oct: 18,
    Nov: 29,
    Dec: 25,
};
function drawLine(ctx, startX, startY, endX, endY, color) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    ctx.restore();
}
function drawBar(
    ctx,
    upperLeftCornerX,
    upperLeftCornerY,
    width,
    height,
    color
) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.fillRect(upperLeftCornerX, upperLeftCornerY, width, height);
    ctx.restore();
}
const padding = 40;
const canvasHeight = canvas.offsetHeight - padding - 2;
const canvasWidth = canvas.offsetWidth - padding - 2;

const originalHeight = canvasHeight - padding;
const originalWidth = canvasWidth - padding;
const chartYaxis = originalHeight - 50;
function drawChart(ctx, data) {
    drawLine(
        ctx,
        padding,
        originalHeight,
        originalWidth,
        originalHeight,
        "black"
    );
    drawLine(ctx, padding, originalHeight, padding, 20, "black");
    let val = Object.values(salesData);
    let keys = Object.keys(salesData);
    let max = 0;
    for (let i of val) {
        max = Math.max(max, i);
    }
    max = Math.ceil(max / 10) * 10;

    let gridDiff = Math.ceil(chartYaxis / max) + 1;
    let lineDiff = Math.floor(chartYaxis / gridDiff);
    // console.log(lineDiff);
    for (let i = 1; i <= lineDiff; i++) {
        drawLine(
            ctx,
            padding,
            originalHeight - i * lineDiff,
            originalHeight,
            originalHeight - i * lineDiff,
            "grey"
        );
        ctx.fillText(
            (max / gridDiff) * i,
            25,
            originalHeight + 5 - i * lineDiff
        );
    }
    let gap = 10;
    let x = 0;
    for (let key of keys) {
        let start;
        const width =
            (originalWidth - padding - 10 * keys.length) / keys.length;
        const val = salesData[key];
        const diff = max / gridDiff;
        const height = (val / diff) * lineDiff;
        const xp = padding + x * width + gap;
        start = undefined;

        requestAnimationFrame((time) =>
            animateBar(time, width, height, xp, start, key)
        );
        ctx.fillText(key, padding + x * width + gap, originalHeight + 15);
        gap += 10;
        x++;
    }

    function animateBar(timestamp, width, height, xpos, start, month) {
        if (start === undefined) {
            start = timestamp;
        }
        const elapsed = timestamp - start;
        const shift = Math.floor(Math.min((height / 1000) * elapsed, height));
        square = new Path2D();
        square.rect(xpos + 20, originalHeight - height, width, height);
        allBars[month] = { square, x: xpos + 20, y: originalHeight - height };
        drawBar(ctx, xpos, originalHeight - shift, width, shift, "red");
        if (elapsed < 1000) {
            requestAnimationFrame((time) =>
                animateBar(time, width, height, xpos, start, month)
            );
        }
    }
}
drawChart(ctx, salesData);
console.log(allBars);
canvas.addEventListener("mousemove", (e) => {
    for (let sq in allBars) {
        if (ctx.isPointInPath(allBars[sq].square, e.offsetX, e.offsetY)) {
            document.querySelector(".tooltip").textContent = `${salesData[sq]}`;
            document.querySelector(".tooltip").style.top = `${allBars[sq].y}px`;
            document.querySelector(".tooltip").style.left =
                `${allBars[sq].x + 5}px`;
        }
    }
});
function downloadChart() {
    const link = document.querySelector("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "chart.png";
}
