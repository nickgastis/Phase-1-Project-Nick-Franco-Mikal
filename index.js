

document.addEventListener("DOMContentLoaded",fetchStocks)

function fetchStocks(){
    fetch("http://localhost:3000/senators/?_limit=6")
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

    images.dataset.id = senator.id

    images.addEventListener('click', handleImageclick)

    politicianSpan.append(images, names);
    politicianImages.append(politicianSpan);
}

function handleImageclick(e) {
    fetch(`http://localhost:3000/senators/${e.target.dataset.id}`)
    .then(res => res.json())
    .then(data => addDetailContainer(data))
}

function addDetailContainer(politician) {
    const appendContainer = document.querySelector('.append-container')
    appendContainer.innerText = ''
    
    const detailContainer = document.createElement('div')
    detailContainer.classList.add('detail-container');
    
    const featureImg = document.createElement('img')
    featureImg.src = politician.image
  
    const name = document.createElement('h2')
    name.innerText = politician.name
  
    const party = document.createElement('h3')
    party.innerText = `Party: ${politician.party}`
  
    const stocksSpan = document.createElement('h3');
    stocksSpan.innerText = 'Stocks Traded: ';
  
    const stockList = document.createElement('ul')
    stockList.className = 'stockUl'
    
    for (let i = 0; i < politician.stocks.length; i++) {
      const stockListItem = document.createElement('li');
      stockListItem.dataset.id = politician.id + i;
      stockListItem.textContent = `${politician.stocks[i].name} : ${politician.stocks[i].symbol}`;
      stockList.appendChild(stockListItem);
    }
  
    detailContainer.append(featureImg, name, party, stocksSpan, stockList)  
    appendContainer.append(detailContainer)
  }
