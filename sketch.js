let palette;
let graphic;

function setup() {
    graphic = createGraphics(window.innerWidth, window.innerHeight)
    // graphic.stroke(255);
    graphic.noStroke();
    graphic.angleMode(DEGREES);
    graphic.pixelDensity(1);
    
    createCanvas(window.innerWidth, window.innerHeight);
    angleMode(DEGREES);
    pixelDensity(1);

    palette = COLOR_PALETTES.happy.map((p) => p.color) // random(Object.values(COLOR_PALETTES)).map((p) => p.color);
}

function draw() {
    if (frameCount <= 3000 && frameCount % 30 === 0) {
        console.log(frameCount);
        copy(graphic, 0, 0, width, height, 0, 0, width, height);
    }

    if (frameCount < 3000) {
        graphic.push();
        graphic.translate(random(-80, width + 80), random(-80, height + 80));
        graphic.fill(random(palette));
        createTriangle();
        graphic.pop();
    } else if (frameCount < 3040) {
        push();
        rotate(random(360));
        copyCircle();
        pop();
    }
}

function copyCircle() {
    let size = floor(random(85, 600));
    let radius = size / 2;
    let cx = floor(random(radius, width - radius));
    let cy = floor(random(radius, height - radius));

    const d = pixelDensity();
    let data = [];
    graphic.loadPixels();

    // Loop over the circle's bounding box
    for (let x = cx - radius; x < cx + radius; x++) {
        for (let y = cy - radius; y < cy + radius; y++) {
            if (dist(x, y, cx, cy) > radius) continue;

            const index = 4 * ((y * d) * width * d + (x * d));
            data.push({
                x: x - cx,
                y: y - cy,
                pixels: [
                    graphic.pixels[index + 0],
                    graphic.pixels[index + 1],
                    graphic.pixels[index + 2],
                    graphic.pixels[index + 3],
                ],
            });
        }
    }
    graphic.updatePixels();

    cx = floor(random(radius, width - radius));
    cy = floor(random(radius, height - radius));

    const angle = random(TWO_PI);

    loadPixels();
    for (const pix of data) {
        const rx = pix.x * cos(angle) - pix.y * sin(angle);
        const ry = pix.x * sin(angle) + pix.y * cos(angle);

        const index = 4 * (((cy + floor(ry)) * d) * width * d + ((cx + floor(rx)) * d));
        if (index >= 0 && index < pixels.length) {
            pixels[index + 0] = pix.pixels[0];
            pixels[index + 1] = pix.pixels[1];
            pixels[index + 2] = pix.pixels[2];
            pixels[index + 3] = pix.pixels[3];
        }
    }
    updatePixels();
}

function createTriangle() {
    graphic.rotate(30);
    const size = random(80, 200);
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

