

document.addEventListener("DOMContentLoaded",fetchStocks)

function fetchStocks(){
    fetch("")
    .then((res)=res.json())
    .then((data)=>{
        data.forEach((stocks)=>{
            addStocks(stocks)
        })
    })
}

function addStocks(stocks){
    const politicianImages = document.getElementsByClassName("politician-images")
    const images =document.createElement("img")

    politicianImages.append(images)

    // images.addEventListener("mouseover",()=>{

    // })

}

const form = document.getElementById("search-policticans")

form.addEventListener("submit",(e)=>{
    e.preventDefault()
    

})