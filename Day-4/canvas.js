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
const salesArray = [...Object.values(salesData)];
// const average =
//     salesArray.reduce((sum, value) => sum + value, 0) / salesArray.length;
const average = 28;
console.log(average);
const padding = 40;
const canvasHeight = canvas.offsetHeight - padding - 2;
const canvasWidth = canvas.offsetWidth - padding - 2;
function drawLine(ctx, startX, startY, endX, endY, color) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    ctx.restore();
}
function drawDashedLine(ctx, startX, startY, endX, endY, color) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.setLineDash([5, 10]);
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

    ctx.fillRect(upperLeftCornerX, upperLeftCornerY, width, height);
    ctx.restore();
    const gradient = ctx.createLinearGradient(0, canvasHeight, 0, 0);
    gradient.addColorStop(0, "red");
    gradient.addColorStop(0.5, "orange");
    gradient.addColorStop(1, "yellow");
    ctx.fillStyle = gradient;
}

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
    const diff1 = max / gridDiff;
    const height1 = (average / diff1) * lineDiff;
    drawDashedLine(ctx, padding, height1, originalWidth, height1, "red");
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
        square.rect(xpos, originalHeight - height, width, height);
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
        if (ctx.isPointInPath(allBars[sq].square, e.offsetX - 20, e.offsetY)) {
            document.querySelector(".tooltip").textContent = `${salesData[sq]}`;
            document.querySelector(".tooltip").style.top = `${allBars[sq].y}px`;
            document.querySelector(".tooltip").style.left =
                `${allBars[sq].x + 5}px`;
            ctx.save();
            ctx.fillStyle = "blue";
            ctx.fill(allBars[sq].square);
            ctx.restore();
        } else {
            ctx.save();
            const gradient = ctx.createLinearGradient(0, canvasHeight, 0, 0);
            gradient.addColorStop(0, "red");
            gradient.addColorStop(0.5, "orange");
            gradient.addColorStop(1, "yellow");
            ctx.fillStyle = gradient;
            ctx.fill(allBars[sq].square);
            ctx.restore();
        }
    }
});
function downloadChart() {
    const link = document.querySelector("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "chart.png";
}
