let container = document.querySelector('.container');
let dimensionDiv = document.querySelector('#size');
let dimension = dimensionDiv.value;
let dimLabel = document.querySelector('#currentDimension');
changeDimension(dimension);

function changeDimension(dimension){
    clear();
    let step = dimension**2;
    for(let i = 0; i<step; i++){
        const div = document.createElement('div');
        container.appendChild(div);
    }
    document.documentElement.style.setProperty('--size', `${480/dimension}px`);
}

function clear(){
    container.innerHTML = '';
}

function updateLabel(e) {
    dimLabel.textContent = `${e.target.value}x${e.target.value}`
}


dimensionDiv.addEventListener('change', (e)=>{
   changeDimension(e.target.value);
})

dimensionDiv.addEventListener('input', updateLabel)