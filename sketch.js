let palette;
let graphic;

const circleStroke = false;

function setup() {
    graphic = createGraphics(window.innerWidth, window.innerHeight)
    graphic.noStroke();
    graphic.angleMode(DEGREES);
    graphic.pixelDensity(1);

    createCanvas(window.innerWidth, window.innerHeight);
    angleMode(DEGREES);
    pixelDensity(1);

    palette = COLOR_PALETTES.happy.map((p) => p.color) // random(Object.values(COLOR_PALETTES)).map((p) => p.color);


    for (let i = 0; i < 5000; i++) {
        graphic.push();
        graphic.translate(random(-80, width + 80), random(-80, height + 80));
        graphic.fill(random(palette));
        createTriangle();
        graphic.pop();
    }
    
    copy(graphic, 0, 0, width, height, 0, 0, width, height);
    
    for (let i = 0; i < 30; i++) {
        push();
        copyCircle();
        pop();
    }
}

function copyCircle() {
    let size = min(width, floor(random(85, 600)));
    let radius = floor(size / 2);
    let cx = floor(random(radius, width - radius));
    let cy = floor(random(radius, height - radius));

    let data = [];

    const temp = createGraphics(size, size);
    temp.pixelDensity(1);
    temp.translate(radius, radius);
    temp.rotate(random(TWO_PI));
    temp.copy(graphic, cx - radius, cy - radius, size, size, -radius, -radius, size, size);
    let d = temp.pixelDensity();

    temp.loadPixels();
    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            if (dist(x, y, radius, radius) > radius) continue;

            const index = 4 * ((y * d) * temp.width * d + (x * d));
            data.push({
                x: x - radius,
                y: y - radius,
                pixels: [
                    temp.pixels[index + 0],
                    temp.pixels[index + 1],
                    temp.pixels[index + 2],
                    temp.pixels[index + 3],
                ],
            });
        }
    }
    temp.updatePixels();

    d = pixelDensity();
    cx = floor(random(radius, width - radius));
    cy = floor(random(radius, height - radius));
    loadPixels();
    for (const pix of data) {
        const index = 4 * (((cy + pix.y) * d) * width * d + ((cx + pix.x) * d));
        if (index >= 0 && index < pixels.length) {
            pixels[index + 0] = pix.pixels[0];
            pixels[index + 1] = pix.pixels[1];
            pixels[index + 2] = pix.pixels[2];
            pixels[index + 3] = pix.pixels[3];
        }
    }
    updatePixels();

    if (circleStroke) {
        stroke(255);
        strokeWeight(3);
        noFill();
        circle(cx, cy, size);
    }
}

function createTriangle() {
    graphic.rotate(30);
    const size = random(120, 300);
    const current = createVector();
    graphic.beginShape();
    graphic.vertex(current.x, current.y);
    current.setHeading(60);
    current.add(size, 0);
    graphic.vertex(current.x, current.y);
    current.setHeading(120);
    current.add(size, 0);
    graphic.vertex(current.x, current.y);
    graphic.endShape(CLOSE);
}
