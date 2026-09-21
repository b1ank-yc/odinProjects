const btn = document.querySelectorAll('.btn');
const scr = document.querySelector('.screen');
const opk = document.querySelectorAll('.op');
const del = document.querySelectorAll('.opk');
const eq = document.querySelector('.eq');


function calculate(n, o, c) {
    let n1 = parseFloat(n);
    let n2 = parseFloat(c);
    let r;

    switch (o) {
        case '+': r = n1 + n2; break;
        case '-': r = n1 - n2; break;
        case '/': r = n1 / n2; break; 
        case '*': r = n1 * n2; break;
    }

    if (Number.isInteger(r)) {
        return r;
    } else {
        return r.toFixed(2);
    }

};

let n = '';
let o = '';
let c = '';


function updateScreen() {    
    if (!n == false && !o == false) {
        scr.textContent = `${n} ${o} ${c}`;
    } else {
        scr.textContent = c || 0;
    }
};

updateScreen();

btn.forEach(btn => {
    btn.addEventListener('click', (e) => {
        let l = e.currentTarget.textContent;

        if (c.includes('.') && e.currentTarget.textContent === '.') {
            return;
        } else if (c.split('')[0] === '0') {
            if (e.currentTarget.textContent !== '0') {
                c = l;
            } else {
                return;
            }
        } else {
            c += l;
        }
        
        updateScreen();
    });
});

opk.forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (!n == false && !o == false && !c == false) {
            let r = calculate(n, o, c).toString();
            n = r;
            c = '';
            o = e.currentTarget.textContent;

            updateScreen();
        }

        if (!c == false && !o) {
            n = c;
            o = e.currentTarget.textContent;
            c = '';
            updateScreen();
        } else if (!n == false && !o == false) {
            o = e.currentTarget.textContent;
            updateScreen();
        }
    });
});

del.forEach(btn => {
    btn.addEventListener('click', (e) => {
        let b = e.currentTarget.textContent;

        if (b === "AC") {
            n = '';
            o = '';
            c = '';

            updateScreen();
        } else if (b === "C") {
            c = '';

            updateScreen();
        } else {
            c = c.slice(0, -1);

            updateScreen();
        }
    });
});

eq.addEventListener('click', () => {
    if (!n == false && !o == false && !c == false) {
        let r = calculate(n, o, c);

        n = '';
        o = '';
        c = r.toString();
        
        updateScreen();
    }
});
