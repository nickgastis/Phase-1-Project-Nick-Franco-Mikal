

document.addEventListener("DOMContentLoaded",fetchStocks)

function fetchStocks(){
    fetch("http://localhost:3000/senators")
    .then(res => res.json())
    .then(data => data.forEach(senator => addSenators(senator)))
}


function addSenators(senator){
    const politicianImages = document.querySelector(".politician-images");
    const politicianSpan = document.createElement('span');

    politicianSpan.dataset.id = senator.id
    
    const names = document.createElement('h2');
    names.innerText = senator.name;
    const images = document.createElement("img");
    images.src = senator.image;

    politicianSpan.append(images, names);
    politicianImages.append(politicianSpan);
}


    // images.addEventListener("mouseover",()=>{

    // })

// }

// const form = document.getElementById("search-policticans")

// form.addEventListener("submit",(e)=>{
//     e.preventDefault()
    

// })