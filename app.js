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
// buble sort
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("container");
    const sizeInput = document.getElementById("size");
    const speedInput = document.getElementById("speed");
    const generateButton = document.getElementById("generate");
    const sortButton = document.getElementById("sort");
    var beep = new Audio('beep3.mp3')
    var finded = new Audio('finded.mp3')

    let array = [];
    let delay = 500;//miliseconds

      // Initial array generation
      generateArray(sizeInput.value);

    function generateArray(size) {
        array = [];
        // container.innerHTML = "";
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
    
    async function bubbleSort(arr) {
        const bars = document.getElementsByClassName("bar");
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = 0; j < arr.length - 1 - i; j++) {
                bars[j].style.backgroundColor = "red";
                bars[j + 1].style.backgroundColor = "red";
                if (arr[j] > arr[j + 1]) {
                    await new Promise(resolve => setTimeout(resolve, delay));
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    // renderArray(arr);
                    bars[j].style.height = `${arr[j]}px`;
                    bars[j + 1].style.height = `${arr[j + 1]}px`;
                    beep.play();

                }
                bars[j].style.backgroundColor = "#4CAF50";
                bars[j + 1].style.backgroundColor = "#4CAF50";

            }
            bars[arr.length - 1 - i].style.backgroundColor = "yellow";


        }
        bars[0].style.backgroundColor = "yellow";
        finded.play();
        // alert("sorting is completed");

    }
    // alert("sorting is completed");
   

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
        bubbleSort(array);
    });

  
});


