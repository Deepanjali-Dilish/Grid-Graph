const maxXInput = document.getElementById('maxX');
const maxYInput = document.getElementById('maxY');
const actionBtn = document.getElementById('actionBtn');
const xValInput = document.getElementById('xVal');
const yValInput = document.getElementById('yVal');
const resetBtn = document.getElementById('resetBtn');
const gridContainer = document.getElementById('gridContainer');

let grid = [];
let maxX = 0; maxY = 0;

xValInput.disabled = true;
yValInput.disabled = true;

actionBtn.onclick = () => {
    const currentLabel = actionBtn.textContent;

    if(currentLabel === 'Draw'){
        maxX = parseInt(maxXInput.value);
        maxY = parseInt(maxYInput.value);

        maxXInput.style.border = "";
        maxYInput.style.border = "";

        if(!maxX && !maxY){
            alert("Enter a vaild Max X and Y");
            maxXInput.style.border = "2px solid red"
            maxYInput.style.border = "2px solid red"
            return
        }

        if(!maxX){
            alert("Enter a valid Max X")
            maxXInput.style.border = "2px solid red"
            return;
        }

        if(!maxY){
            alert("Enter a vaild Max Y")
            maxYInput.style.border = "2px solid red";
            return;
        }

        gridContainer.innerHTML = '';
        gridContainer.style.gridTemplateColumns = `repeat(${maxX}, 1fr)`;

        for (let y = maxY - 1; y >= 0; y--){
            for(let x =0; x<maxX; x++){
                const cell = document.createElement('div')
                    cell.className = 'cell';
                    cell.textContent = `${x},${y}`;
                    cell.dataset.x = x;
                    cell.dataset.y = y;
                    gridContainer.appendChild(cell);
                    grid.push(cell);
            }
        }

        maxXInput.disabled = true;
        maxYInput.disabled = true;
        xValInput.disabled = false;
        yValInput .disabled = false;
        actionBtn.textContent = 'Mark';
    
    } else if (currentLabel === 'Mark') {
        const x = parseInt(xValInput.value);
        const y = parseInt(yValInput.value);
    
        xValInput.style.border = "";
        yValInput.style.border = "";
    
    
        if (x < 0 || x >= maxX) {
            alert("Enter a valid X value");
            xValInput.style.border = "2px solid red";
            return;
        }
    
        if (y < 0 || y >= maxY) {
            alert("Enter a valid Y value");
            yValInput.style.border = "2px solid red";
            return;
        }
    
        if (x < 0 || x >= maxX || y < 0 || y >= maxY) {
            alert("Coordinates out of range");
            xValInput.style.border = "2px solid red";
            yValInput.style.border = "2px solid red";
            return;
        }

        const cell = grid.find(c => parseInt(c.dataset.x) === x && parseInt(c.dataset.y) === y);
        if (cell) cell.classList.add('marked');
    
        actionBtn.textContent = 'Clear';
    

    }else if(currentLabel === 'Clear') {
        grid.forEach(cell => cell.classList.remove('marked'));
        actionBtn.textContent = 'Mark';
    }
    
}

resetBtn.onclick = () => {
    maxXInput.value = '';
    maxYInput.value = '';
    xValInput.value = '';
    yValInput.value = '';
    maxXInput.style.border = '';
    maxYInput.style.border = '';
    xValInput.style.border = '';
    yValInput.style.border = '';
    maxXInput.disabled = false;
    maxYInput.disabled = false;
    xValInput.disabled = true;
    yValInput.disabled = true;
    actionBtn.textContent = 'Draw';
    gridContainer.innerHTML = '';
    grid = [];
};

