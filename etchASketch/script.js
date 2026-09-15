
const cont = document.querySelector('.cont');
const number = document.querySelector('.input');
const button = document.querySelector('.render');

const colorSelected = document.querySelector('.canvasColor');
const applyColor = document.querySelector('.btn-clr');

let canvasColor = '#ffffff';

applyColor.addEventListener('click', () => {
    let val = colorSelected.value;
    colorSelected.value = '';
    canvasColor = val;
})

let canvasSize = '800px';

const canvasSizeInput = document.querySelector('.canvasSize');
const canvasSizeBtn = document.querySelector('.btn-size');

canvasSizeBtn.addEventListener('click', () => {
    let val = canvasSizeInput.value;
    canvasSizeInput.value = '';
    canvasSize = val;
});

// ---------------

button.addEventListener('click', function () {
    cont.innerHTML = '';

    let num = number.value;
    number.value = '';
    let isDrawing = false;
    let isErasing = false;
    let currentColor = '#000000';

    if (num <= 248) {
        
        if (!num || num < 0) num = 64;

        for (let i = 0; i < num; i++) {
            const div = document.createElement('div');
            div.classList.add('pixel');

            cont.appendChild(div);

            for (let j = 0; j < num; j++) {
                const divInside = document.createElement('div');
                divInside.classList.add('pixel2');

                div.appendChild(divInside);
            }
        }

        document.documentElement.style.setProperty('--bg-color', canvasColor);
        document.documentElement.style.setProperty('--canvas-size', canvasSize);

        // COLOR SECTION

        const swatches = document.querySelectorAll('.swatch');

        swatches.forEach(swatch => {
            swatch.addEventListener('click', () => {
                swatches.forEach(s => s.classList.remove('selected'));
                swatch.classList.add('selected');
                currentColor = swatch.style.backgroundColor;
            })
        })

        // DRAWING SECTION

        document.addEventListener('mousedown', (e) => {
            if (e.button === 2) isErasing = true;
        });
        document.addEventListener('mouseup', (e) => {
            if (e.button === 2) isErasing = false;
        });

        document.addEventListener('contextmenu', (e) => e.preventDefault());
        
        document.addEventListener('mousedown', (e) => {
            if (e.button === 0) isDrawing = true;
        });
        document.addEventListener('mouseup', (e) => {
            if (e.button === 0) isDrawing = false;
        });

        // RENDER SECTION
        const pixels = document.querySelectorAll('.pixel2');

        const erase = document.querySelector('.btn-erase');

        erase.addEventListener('click', () => {
            pixels.forEach(pix => {
                pix.style.backgroundColor = canvasColor;
            })
        })

        pixels.forEach(pix => {
            pix.addEventListener('mouseover', function (event) {
                if (isDrawing) {
                    event.currentTarget.style.backgroundColor = currentColor;
                } else if (isErasing) {
                    event.currentTarget.style.backgroundColor = canvasColor;
                }
            });
        });

        const stopProgram = document.querySelector('.stop');

        stopProgram.addEventListener('click', () => {
            cont.innerHTML = '';
            document.documentElement.style.setProperty('--canvas-size', '800px');
            swatches.forEach(swatch => swatch.classList.remove('selected'));
        });

        const defPreset = document.querySelector('.def');

        defPreset.addEventListener('click', () => {
            canvasColor = 'white';
            canvasSize = '800px';
        })
    }
});