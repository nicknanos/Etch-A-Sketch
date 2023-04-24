// DOM Selectors
let container = document.querySelector('.container');
let dimensionDiv = document.querySelector('#size');
let dimension = dimensionDiv.value;
let dimLabel = document.querySelector('#currentDimension');
let colorPicker = document.querySelector('#color');
let clearButton = document.querySelector('.clear');
let rainbowButton = document.querySelector('.rainbow');
let gridButton = document.querySelector('.gridLine');

//Grid Elements
let divs;

//Selected options
let currentColor = 'black';
let rainbow = false;

//Detect Mouse Hold
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

//Initialize
changeDimension(dimension);


//Creates new grid with given dimensions
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

//removes all grid elements
function clear(){
    container.innerHTML = '';
}

//displays selected dimensions
function updateLabel(e) {
    dimLabel.textContent = `${e.target.value}x${e.target.value}`
}

//Colors element
function color(e) { 
    if (e.type == 'mouseover' && !mouseDown) return;
    if (rainbow){
        currentColor = getRandomColor();
    }
    e.target.style.backgroundColor = `${currentColor}`;
}

//generates random color in the rgb spectrum
function getRandomColor(){
    return `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`
}

//gives generated divs their events
function attachEvent(){
    divs.forEach(div => {
        div.addEventListener('mouseover', color);
        div.addEventListener('mousedown', color);

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
}

//handles dimension change
dimensionDiv.addEventListener('change', (e)=>{
    changeDimension(e.target.value);
 });

 //updates selected dimension on scroll
dimensionDiv.addEventListener('input', updateLabel);

//chnages selected color on selections
colorPicker.addEventListener('input', (e)=>{
    rainbow = false; // removes rainbow brush
    currentColor = e.target.value;
})

//clears the board
clearButton.addEventListener('click', ()=>{
    divs.forEach(div =>{
        div.style.backgroundColor = 'white';
    })
})

//changes the brush to rainbow
rainbowButton.addEventListener('click', ()=>{
    if (rainbow){
        rainbow = false;
        currentColor = 'black'
    }else{
        rainbow = true
    }
});


//shows/hides grid
gridButton.addEventListener('click', ()=>{
    divs.forEach(div=>{
        div.classList.toggle('outline');  
    })
})