let container = document.querySelector('.container');
let dimensionDiv = document.querySelector('#size');
let dimension = dimensionDiv.value;
let dimLabel = document.querySelector('#currentDimension');
let divs;
let currentColor = 'black';
let colorPicker = document.querySelector('#color');
let clearButton = document.querySelector('.clear');
let rainbowButton = document.querySelector('.rainbow');
let rainbow = false;
let gridButton = document.querySelector('.gridLine');

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

changeDimension(dimension);

function changeDimension(dimension){
    clear();
    let step = dimension**2;
    for(let i = 0; i<step; i++){
        const div = document.createElement('div');
        div.classList.add('outline');
        div.style.backgroundColor = 'white'; 
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
    if (rainbow){
        currentColor = getRandomColor();
    }
    e.target.style.backgroundColor = `${currentColor}`;
}

function getRandomColor(){
    return `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`
}

function attachEvent(){
    divs.forEach(div => {
        div.addEventListener('mouseover', color);
        div.addEventListener('mousedown', color);
    });
}


divs.forEach(div=>{
    div.addEventListener('mouseenter',()=>{
        if (div.style.backgroundColor == 'white'){
            div.style.backgroundColor = "lightgray"
        }
    });
    div.addEventListener('mouseleave',()=>{
        if (div.style.backgroundColor == 'lightgray'){
            div.style.backgroundColor = "white"
        }
    });
});


dimensionDiv.addEventListener('change', (e)=>{
    changeDimension(e.target.value);
 });
 
 dimensionDiv.addEventListener('input', updateLabel);

colorPicker.addEventListener('input', (e)=>{
    rainbow = false;
    currentColor = e.target.value;
})

clearButton.addEventListener('click', ()=>{
    divs.forEach(div =>{
        div.style.backgroundColor = 'white';
    })
})

rainbowButton.addEventListener('click', ()=>{
    if (rainbow){
        rainbow = false;
        currentColor = 'black'
    }else{
        rainbow = true
    }
});

gridButton.addEventListener('click', ()=>{
    divs.forEach(div=>{
        div.classList.toggle('outline');  
    })
})