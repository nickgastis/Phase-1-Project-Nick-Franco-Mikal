

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
        stockListItem.dataset.id = `${politician.id}-${i}`;
        stockListItem.textContent = `${politician.stocks[i].name} : ${politician.stocks[i].symbol}`;
        stockList.appendChild(stockListItem);
      
        stockListItem.addEventListener('click', (e) => {
            
          fetch(`http://localhost:3000/senators/${politician.id}`)
            .then(resp => resp.json())
            .then(data => {
              const stockId = parseInt(e.target.dataset.id.split('-')[1]);
              const clickedStock = data.stocks.find(stock => stockId === data.stocks.indexOf(stock));
              addStockContainer(clickedStock);

              window.scrollTo(0,document.body.scrollHeight);
            });
        });
    }
     
    detailContainer.append(featureImg, name, party, stocksSpan, stockList)  
    appendContainer.append(detailContainer)
}

function addStockContainer(stock) {
        const stockDetail = document.querySelector('.stock-details')
        stockDetail.innerText = ''

        const stockDetailSquare = document.createElement('div')
        stockDetailSquare.className = 'stock-square'

        stockName = document.createElement('h1')
        stockName.innerText = `${stock.name} : ${stock.symbol}`
        stockName.id = 'stock-title'

        const sharePrice = document.createElement('h2')
        sharePrice.innerText = `Share Price: ${stock.sharePrice}`
        sharePrice.id = 'share-price'

        const sharesOwned = document.createElement('h2')
        sharesOwned.innerText = `Shares Owned: ${stock.sharesOwned}`
        sharesOwned.id = 'shares-owned'

        const amountInvested = document.createElement('h2')
        amountInvested.innerText = `Amount Invested ${stock.amountInvested}`
        amountInvested.id = 'amount-invested'

        const iGraph = document.createElement('iframe')
        iGraph.src = 'https://www.webull.com/quote/nasdaq-aapl'







    stockDetailSquare.append(stockName, sharePrice, sharesOwned, amountInvested, iGraph)
   stockDetail.append(stockDetailSquare)
  }
