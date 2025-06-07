const btn_changeText = document.getElementById('btn_changeText');
btn_changeText.addEventListener('click', () => {
    btn_changeText.textContent = 'Changed';
});


function sum(a, b, c) {
    if (arguments.length < 3) {
        return a + b;
    } else {
        return a + b + c;
    }
}

window.onload = () => {
    document.getElementById('p_changeText').textContent = "Hello JavaScript";
}

document.getElementById('input_text').addEventListener('input', () => {
    document.getElementById('output_text').textContent = document.getElementById('input_text').value;
})

const p_toggleVisibility = document.getElementById('p_toggleVisibility');
const btn_toggleVisibility = document.getElementById('btn_toggleVisibility');
btn_toggleVisibility.addEventListener('click', () => {
    p_toggleVisibility.style.display = p_toggleVisibility.style.display === 'none' ? 'block' : 'none';
    let randomcolor = Math.floor(Math.random() * 16777215).toString(16);
    btn_toggleVisibility.style.backgroundColor = "#" + randomcolor;
})

let str = "";

function cal(num) {
    if (num === 'C') {
        str = "";
        document.getElementById('cal_input').textContent = str;
    }
    else if (num === '=') {
        document.getElementById('cal_input').textContent = eval(str);
        str = eval(str);
    } else {
        str += num + "";
        document.getElementById('cal_input').textContent = str;
    }
}

const timer = document.getElementById('timer');
const start = document.getElementById('start');
const stop = document.getElementById('stop');
const reset = document.getElementById('reset');
let time = Number(timer.textContent);
let intervalId = null;

start.addEventListener('click', () => {
    if (!intervalId) {
        intervalId = setInterval(() => {
            if (time === 0) {
                timer.textContent = 10;
                time = 10;
                clearInterval(intervalId);
                intervalId = null;
                return;
            }
            time--;
            timer.textContent = time;
        }, 1000);
    }
})

stop.addEventListener('click', () => {
    clearInterval(intervalId);
    intervalId = null;
})

reset.addEventListener('click', () => {
    clearInterval(intervalId);
    intervalId = null;
    time = 10;
    timer.textContent = time;
})


const show_pass = document.getElementById('show_pass');
const input_pass = document.getElementById('input_pass');
show_pass.addEventListener('change', () => {
    if (show_pass.checked) {
        input_pass.type = 'text';
    } else {
        input_pass.type = 'password';
    }
})