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

// **************************** insertion sort ******************************
document.addEventListener("DOMContentLoaded",()=>{
    const container=document.getElementById("container");
    const  sizeInput=document.getElementById("size");
    const  speedInput=document.getElementById("speed");
    const generatebtn=document.getElementById("generate");
    const sortbtn=document.getElementById("sort");
    
//  audio file
const beep=new Audio('beep3.mp3');
const finded=new Audio('finded.mp3');

    let array=[];
    let delay=500;

    generateArray(sizeInput.value);

    function generateArray(size){
        array=[];
        for(let i=0;i<size;i++){
            array.push(Math.floor(Math.random()*450)+1);
        }
        renderArray(array);
    }

    function renderArray(arr){
        container.innerHTML="";
        const barWidth=container.clientWidth/arr.length-4;
        arr.forEach(value => {
            const bar=document.createElement("div");
            bar.classList.add("bar");
            bar.style.height=`${value}px`;
            bar.style.width=`${barWidth}px`;
            container.appendChild(bar);
        });
    }

    async function insertionSort(arr){
        const bars=document.getElementsByClassName("bar");

        for(let i=1;i<arr.length;i++){
            let key=arr[i];
            let  j=i-1;
            bars[i].style.backgroundColor="red";
            while( j>=0 && arr[j]>key){
                bars[j].style.backgroundColor="red";
                await new Promise(resolve =>setTimeout(resolve,delay));
                arr[j+1]=arr[j];
                bars[j+1].style.height=`${arr[j]}px`;
                bars[j].style.backgroundColor="#4CAF50";
                j--;
                beep.play();
            }
            arr[j+1]=key;
            bars[j+1].style.height=`${key}px`;
            bars[i].style.backgroundColor="#4CAF50";
        }
        for(let i=0; i<arr.length;i++){
            bars[i].style.backgroundColor="yellow";
        }
       finded.play();
    }

    sizeInput.addEventListener("input",(e)=>{
        const size=e.target.value;
        generateArray(size);
    });
    speedInput.addEventListener("input",(e)=>{
        delay=1000-e.target.value;
    });
    generatebtn.addEventListener("click",()=>{
        const size=sizeInput.value;
        generateArray(size);
    });

    sortbtn.addEventListener("click",()=>{
        insertionSort(array);
    })
});