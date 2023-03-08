

document.addEventListener("DOMContentLoaded", () => {
    fetchStocks()
    populateWatchlist()
})

function fetchStocks() {
    fetch("http://localhost:3000/senators/?_limit=6")
    .then(res => res.json())
    .then(data => {
        data.forEach(senator => {
            addSenators(senator)
            
        });
    })
}



// Creates span of senators

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

// Targets senator id when clicked

function handleImageclick(e) {
    fetch(`http://localhost:3000/senators/${e.target.dataset.id}`)
    .then(res => res.json())
    .then(data => addDetailContainer(data))
}




// creates Politician conatiner

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
        stockListItem.textContent = `${politician.stocks[i].name} : ${politician.stocks[i].symbol} | Shares Owned: ${politician.stocks[i].sharesOwned} | Invested: ${politician.stocks[i].amountInvested}`;
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





    // Creates the specific stock container

function addStockContainer(stock) {
        const stockDetail = document.querySelector('.stock-details')
        stockDetail.innerText = ''

        const stockDetailSquare = document.createElement('div')
        stockDetailSquare.className = 'stock-square'

        stockName = document.createElement('h1')
        stockName.innerText = `${stock.name} : ${stock.symbol}`
        stockName.id = 'stock-title'
        
        const aboutStockTitle = document.createElement('h2')
        aboutStockTitle.innerText = 'About'
        aboutStockTitle.id = 'aboutStock-title'

        const stockInfo = document.createElement('p')
        stockInfo.innerText = stock.info
        stockInfo.id = 'stock-info'
        
        const iFRameDiv = document.createElement('div')
        iFRameDiv.id = 'iFrame-div'

        const graphImg = document.createElement('img')
        graphImg.src = stock.stockImage
        graphImg.id = 'graph-img'

        const watchlistButton = document.createElement('button')
        watchlistButton.innerText = 'Add To watchlist'
        watchlistButton.id = 'watchlist-button'

        watchlistButton.addEventListener('click', handleWatchlistSubmit)


        iFRameDiv.append(graphImg)
        stockDetailSquare.append(stockName, iFRameDiv, watchlistButton, aboutStockTitle, stockInfo)
        stockDetail.append(stockDetailSquare)
        
    }




    // Adds a stock to the watchlist
    
    function handleWatchlistSubmit(e) {
        e.preventDefault()
        const watchlistUl = document.getElementById('watchlist-ul');
        const stockName = document.getElementById('stock-title').textContent;
        
        // Stops user from adding the same stock twice
        const existingItem = Array.from(watchlistUl.children).find(item => item.textContent === stockName);
        if (existingItem) {
            return;
        }

        const watchlistItem = document.createElement('li');
        watchlistItem.textContent = stockName;

        //add delete button on click
       
        
          watchlistUl.append(watchlistItem);
        
        const newWatchlistObj = { name: stockName };
        
        fetch('http://localhost:3000/watchlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newWatchlistObj)
        })
        .then(response => response.json())
        .then(data => handleWatchlistSubmit(e, data))
        .catch(error => console.error(error));
    }



    // Loads the stocks in the db.json watchlist
    
    function populateWatchlist() {
        const watchlistUl = document.getElementById('watchlist-ul');
      
        fetch('http://localhost:3000/watchlist')
        .then(response => response.json())
        .then(data => {
            data.forEach(stock => {
                const watchlistItem = document.createElement('li');
                watchlistItem.textContent = stock.name;
      
                const deleteStock = document.createElement('button')
                deleteStock.id = `delete-stock-${stock.id}` 
                deleteStock.innerText = 'X'
      
                deleteStock.addEventListener('click', handleDeleteStockClick)
      
                watchlistItem.append(deleteStock)
                watchlistUl.append(watchlistItem);
            });
        })
      }

      // Removes stock from watchlist
      
      function handleDeleteStockClick(e) {
          e.stopPropagation()
          const buttonId = e.target.id;
        const stockId = buttonId.split('-')[2];
          fetch(`http://localhost:3000/watchlist/${stockId}`, {
              method: 'DELETE'
          })
          .then(() => e.target.parentElement.remove())
      }
      
    
    
    
    
    
    
    
      
    