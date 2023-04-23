let container = document.querySelector('.container');
let dimensionDiv = document.querySelector('#size');
let dimension = dimensionDiv.value;
let dimLabel = document.querySelector('#currentDimension');
let divs;
let currentColor = 'black';
let colorPicker = document.querySelector('#color');
let clearButton = document.querySelector('.clear');

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

changeDimension(dimension);

function changeDimension(dimension){
    clear();
    let step = dimension**2;
    for(let i = 0; i<step; i++){
        const div = document.createElement('div');
        container.appendChild(div);
    }
    document.documentElement.style.setProperty('--size', `${480/dimension}px`);
    divs = document.querySelectorAll('div.container div');
    attachEvent();
}

function clear(){
    container.innerHTML = '';
}

function updateLabel(e) {
    dimLabel.textContent = `${e.target.value}x${e.target.value}`
}

function color(e) { 
    if (e.type == 'mouseover' && !mouseDown) return;
    e.target.style.backgroundColor = `${currentColor}`;
}

dimensionDiv.addEventListener('change', (e)=>{
   changeDimension(e.target.value);
});

dimensionDiv.addEventListener('input', updateLabel);

function attachEvent(){
    divs.forEach(div => {
        div.addEventListener('mouseover', color);
        div.addEventListener('mousedown', color);
    });
}

colorPicker.addEventListener('input', (e)=>{
    currentColor = e.target.value;
})

clearButton.addEventListener('click', ()=>{
    divs.forEach(div =>{
        div.style.backgroundColor = 'white';
    })
})