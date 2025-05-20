const maxXInput = document.getElementById('maxX');
const maxYInput = document.getElementById('maxY');
const xValInput = document.getElementById('xVal');
const yValInput = document.getElementById('yVal');
const actionBtn = document.getElementById('actionBtn');
const resetBtn = document.getElementById('resetBtn');
const deleteBtn = document.getElementById('deleteBtn');
const gridsList = document.getElementById('gridsList');

let grids = [];
let activeGridIndex = -1;

xValInput.disabled = true;
yValInput.disabled = true;

function createGridElement(maxX, maxY, index) {
    const container = document.createElement('div');
    container.className = 'grid-section';

    const heading = document.createElement('h3');
    heading.textContent = `Grid Graph ${index + 1}`;
    heading.style.cursor = 'pointer';

    const gridContainer = document.createElement('div');
    gridContainer.className = 'grid-container';
    gridContainer.style.display = 'grid';
    gridContainer.style.gridTemplateColumns = `repeat(${maxX}, 1fr)`; 
    gridContainer.style.gridTemplateRows = `repeat(${maxY}, 1fr)`; 
    gridContainer.style.gap = '2px';
    gridContainer.style.marginTop = '10px';

    const cells = [];

    for (let y = maxY - 1; y >= 0; y--) {
        for (let x = 0; x < maxX; x++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.x = x;
            cell.dataset.y = y;

            const subCell = document.createElement('div');
            subCell.className = 'sub-cell';
            subCell.textContent = `${x},${y}`;

            cell.appendChild(subCell);
            gridContainer.appendChild(cell);
            cells.push(cell);
        }
    }

    container.appendChild(heading);
    container.appendChild(gridContainer);
    gridsList.appendChild(container);

    heading.onclick = () => {
        activeGridIndex = index;
        maxXInput.value = grids[index].maxX;
        maxYInput.value = grids[index].maxY;
        xValInput.value = '';
        yValInput.value = '';
        maxXInput.disabled = true;
        maxYInput.disabled = true;
        xValInput.disabled = false;
        yValInput.disabled = false;
        actionBtn.textContent = 'Mark';
    };

    return { container, gridContainer, cells, maxX, maxY };
}



actionBtn.onclick = () => {
    const label = actionBtn.textContent;

    if (label === 'Add Graph') {
        const maxX = parseInt(maxXInput.value);
        const maxY = parseInt(maxYInput.value);

        maxXInput.style.border = '';
        maxYInput.style.border = '';

        if (!maxX && !maxY) {
            alert('Enter valid values for MaxX and MaxY.');
            maxXInput.style.border = '2px solid red';
            maxYInput.style.border = '2px solid red';
            return;
        }

        if(!maxX){
            alert('Invalid MaxX value');
            maxXInput.style.border = '2px solid red';
            return;
        }

        if(!maxY){
            alert('Invalid MaxY value');
            maxYInput.style.border = '2px solid red';
            return;
        }

        if (maxX > maxXInput.max && maxY > maxYInput.max) {
            alert(`Max values exceeded. Max allowed is ${maxXInput.max}.`);
            maxXInput.style.border = '2px solid red';
            maxYInput.style.border = '2px solid red';
            return;
        }

        if(maxX > parseInt (maxXInput.max)){
            alert(`Enter the valid value for Max X (row)`);
            maxXInput.style.border = '2px solid red';
            return;
        }

        if(maxY > parseInt (maxYInput.max)){
            alert('Enter the valid value for Max Y (column)');
            maxYInput.style.border = '2px solid red';
            return;
        }


        const newGrid = createGridElement(maxX, maxY, grids.length);
        grids.push({
            maxX,
            maxY,
            container: newGrid.container,
            gridContainer: newGrid.gridContainer,
            cells: newGrid.cells
        });

        maxXInput.value = '';
        maxYInput.value = '';
        xValInput.value = '';
        yValInput.value = '';
        maxXInput.disabled = false;
        maxYInput.disabled = false;
        xValInput.disabled = true;
        yValInput.disabled = true;
        activeGridIndex = -1;
        actionBtn.textContent = 'Add Graph';

    } else if (label === 'Mark') {
        const x = parseInt(xValInput.value);
        const y = parseInt(yValInput.value);

        xValInput.style.border = '';
        yValInput.style.border = '';

        if (activeGridIndex === -1) {
            alert("Select a grid first.");
            return;
        }

        const grid = grids[activeGridIndex];

        let xInvalid = x < 0 || x >= grid.maxX
        let yInvalid = y < 0 || y >= grid.maxY

        if (xInvalid && yInvalid){
            alert('Invalid X and Y value');
            xValInput.style.border = '2px solid red';
            yValInput.style.border = '2px solid red';
            return;
        }

        if (xInvalid){
            alert('Invalid X value');
            xValInput.style.border = '2px solid red';
            return;
        }

        if(yInvalid){
            alert('Invalid Y value');
            yValInput.style.border = '2px solid red';
            return;
        }

        grid.cells.forEach(cell => {
            const cx = parseInt(cell.dataset.x);
            const cy = parseInt(cell.dataset.y);
            if (cx === x && cy <= y) {
                const sub = cell.querySelector('.sub-cell');
                sub.classList.add('marked');
            }
        });

        actionBtn.textContent = 'Clear';

    } else if (label === 'Clear') {
        if (activeGridIndex === -1) {
            alert("Select a grid.");
            return;
        }

        const grid = grids[activeGridIndex];
        grid.cells.forEach(cell => {
            const sub = cell.querySelector('.sub-cell');
            sub.classList.remove('marked');
        });

        actionBtn.textContent = 'Mark';
    }
};

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
    actionBtn.textContent = 'Add Graph';
    activeGridIndex = -1;
};

deleteBtn.onclick = () => {
    if (activeGridIndex === -1) {
        alert('Select a grid to delete.');
        return;
    }

    grids[activeGridIndex].container.remove();
    grids.splice(activeGridIndex, 1);

    grids.forEach((grid, i) => {
        const heading = grid.container.querySelector('h3');
        heading.textContent = `Grid Graph ${i + 1}`;
        heading.onclick = () => {
            activeGridIndex = i;
            maxXInput.value = grid.maxX;
            maxYInput.value = grid.maxY;
            maxXInput.disabled = true;
            maxYInput.disabled = true;
            xValInput.disabled = false;
            yValInput.disabled = false;
            actionBtn.textContent = 'Mark';
        };
    });


    activeGridIndex = -1;
    maxXInput.disabled = false;
    maxYInput.disabled = false;
    xValInput.disabled = true;
    yValInput.disabled = true;
    maxXInput.value = '';
    maxYInput.value = '';
    xValInput.value = '';
    yValInput.value = '';
    actionBtn.textContent = 'Add Graph';
};


function setInputLimits() {
    const isMobile = window.innerWidth <= 768; 

    maxXInput.max = isMobile ? 10 : 20;
    maxYInput.max = isMobile ? 10 : 20;
}

setInputLimits();

window.addEventListener('resize', setInputLimits);


// previous code

// const maxXInput = document.getElementById('maxX');
// const maxYInput = document.getElementById('maxY');
// const actionBtn = document.getElementById('actionBtn');
// const xValInput = document.getElementById('xVal');
// const yValInput = document.getElementById('yVal');
// const resetBtn = document.getElementById('resetBtn');
// const gridContainer = document.getElementById('gridContainer');

// let grid = [];
// let maxX = 0; maxY = 0;

// xValInput.disabled = true;
// yValInput.disabled = true;

// actionBtn.onclick = () => {
//     const currentLabel = actionBtn.textContent;

//     if(currentLabel === 'Draw'){
//         maxX = parseInt(maxXInput.value);
//         maxY = parseInt(maxYInput.value);

//         maxXInput.style.border = "";
//         maxYInput.style.border = "";

//         if(!maxX && !maxY){
//             alert("Please enter the vaild numbers");
//             maxXInput.style.border = "2px solid red"
//             maxYInput.style.border = "2px solid red"
//             return
//         }

//         if(!maxX){
//             alert("Please enter a vaild number for row")
//             maxXInput.style.border = "2px solid red"
//             return;
//         }

//         if(!maxY){
//             alert("Please enter a vaild number for column")
//             maxYInput.style.border = "2px solid red";
//             return;
//         }

//         gridContainer.innerHTML = '';
//         gridContainer.style.gridTemplateColumns = `repeat(${maxX}, 1fr)`;

//         for (let y = maxY - 1; y >= 0; y--){
//             for(let x =0; x<maxX; x++){
//                 const cell = document.createElement('div')
//                     cell.className = 'cell';
//                     cell.textContent = `${x},${y}`;
//                     cell.dataset.x = x;
//                     cell.dataset.y = y;
//                     gridContainer.appendChild(cell);
//                     grid.push(cell);
//             }
//         }

//         maxXInput.disabled = true;
//         maxYInput.disabled = true;
//         xValInput.disabled = false;
//         yValInput .disabled = false;
//         actionBtn.textContent = 'Mark';
    
//     } else if (currentLabel === 'Mark') {
//         const x = parseInt(xValInput.value);
//         const y = parseInt(yValInput.value);
    
//         xValInput.style.border = "";
//         yValInput.style.border = "";
    
    
//         if (x < 0 || x >= maxX) {
//             alert("Enter a valid X value");
//             xValInput.style.border = "2px solid red";
//             return;
//         }
    
//         if (y < 0 || y >= maxY) {
//             alert("Enter a valid Y value");
//             yValInput.style.border = "2px solid red";
//             return;
//         }
    
//         if (x < 0 || x >= maxX || y < 0 || y >= maxY) {
//             alert("Coordinates out of range");
//             xValInput.style.border = "2px solid red";
//             yValInput.style.border = "2px solid red";
//             return;
//         }

//         const cell = grid.find(c => parseInt(c.dataset.x) === x && parseInt(c.dataset.y) === y);
//         if (cell) cell.classList.add('marked');
    
//         actionBtn.textContent = 'Clear';
    

//     }else if(currentLabel === 'Clear') {
//         grid.forEach(cell => cell.classList.remove('marked'));
//         actionBtn.textContent = 'Mark';
//     }
    
// }

// resetBtn.onclick = () => {
//     maxXInput.value = '';
//     maxYInput.value = '';
//     xValInput.value = '';
//     yValInput.value = '';
//     maxXInput.style.border = '';
//     maxYInput.style.border = '';
//     xValInput.style.border = '';
//     yValInput.style.border = '';
//     maxXInput.disabled = false;
//     maxYInput.disabled = false;
//     xValInput.disabled = true;
//     yValInput.disabled = true;
//     actionBtn.textContent = 'Draw';
//     gridContainer.innerHTML = '';
//     grid = [];
// };

// hello world