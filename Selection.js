const feature=document.querySelector(".feat-btn");
const show=document.querySelector(".feat-show")
feature.addEventListener('click',()=>{
    show.classList.toggle('feat-show');
    // show.classList.toggle('rotate');
    
});
const menubtn=document.querySelector(".menu-btn");
const sidebar=document.querySelector('.sidebar');
const menuicon=document.querySelector(".menu-btn i");
menubtn.addEventListener('click',()=>{
    menubtn.classList.toggle('clickme');
    sidebar.classList.toggle('show');
    menuicon.classList.toggle('bx-x');

})


document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("container");
    const sizeInput = document.getElementById("size");
    const speedInput = document.getElementById("speed");
    const generateButton = document.getElementById("generate");
    const sortButton = document.getElementById("sort");
    var beep = new Audio('beep3.mp3');
    var finded = new Audio('finded.mp3');

    let array = [];
    let delay = 500; // milliseconds

    // Initial array generation
    generateArray(sizeInput.value);

    function generateArray(size) {
        array = [];
        for (let i = 0; i < size; i++) {
            array.push(Math.floor(Math.random() * 450) + 1);
        }
        renderArray(array);
    }

    function renderArray(arr) {
        container.innerHTML = "";
        const barWidth = container.clientWidth / arr.length - 4;
        arr.forEach(value => {
            const bar = document.createElement("div");
            bar.classList.add("bar");
            bar.style.height = `${value}px`;
            bar.style.width = `${barWidth}px`;
            container.appendChild(bar);
        });
    }

    async function selectionSort(arr) {
        const bars = document.getElementsByClassName("bar");
        for (let i = 0; i < arr.length - 1; i++) {
            let minIndex = i;
             bars[minIndex].style.backgroundColor = "blue";
            for (let j = i + 1; j < arr.length; j++) {
                bars[j].style.backgroundColor = "red";
                await new Promise(resolve => setTimeout(resolve, delay));
                if (arr[j] < arr[minIndex]) {
                    bars[minIndex].style.backgroundColor = "#4CAF50";
                    minIndex = j;
                    bars[minIndex].style.backgroundColor = "red";
                } else {
                    bars[j].style.backgroundColor = "#4CAF50";
                }
            }
            if (minIndex !== i) {
                [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
                bars[i].style.height = `${arr[i]}px`;
                bars[minIndex].style.height = `${arr[minIndex]}px`;
                beep.play();
            }
            bars[i].style.backgroundColor = "yellow";
        }
        bars[arr.length - 1].style.backgroundColor = "yellow";
        finded.play();
    }

    sizeInput.addEventListener("input", (e) => {
        const size = e.target.value;
        generateArray(size);
    });

    speedInput.addEventListener("input", (e) => {
        delay = 1000 - e.target.value;
    });

    generateButton.addEventListener("click", () => {
        const size = sizeInput.value;
        generateArray(size);
    });

    sortButton.addEventListener("click", () => {
        selectionSort(array);
    });
});
