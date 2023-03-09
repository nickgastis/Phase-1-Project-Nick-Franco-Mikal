

document.addEventListener("DOMContentLoaded", () => {
    fetchStocks()
    populateWatchlist()
})

function fetchStocks() {
    fetch("http://localhost:3000/senators/")
    .then(res => res.json())
    .then(data => {
        data.forEach(senator => {
            addSenators(senator)
            
        });
    })
}



// Creates span of senators

function addSenators(senator) {
    const politicianImages = document.querySelector(".politician-images");
    const politicianSpan = document.createElement("span");
  
    politicianSpan.dataset.id = senator.id;
    politicianSpan.dataset.party = senator.party;
  
    const names = document.createElement("h2");
    names.innerText = senator.name;
    const images = document.createElement("img");
    images.src = senator.image;
  
    images.dataset.id = senator.id;
  
    images.addEventListener("click", handleImageclick);
  
    politicianSpan.append(images, names);
    politicianImages.append(politicianSpan);

   //Filter Buttons
    
    const filterButtonAll = document.querySelector("#filter-buttonAll");
    filterButtonAll.addEventListener("click", () => {
      handleFilterAll();
    });
  
    function handleFilterAll() {
      const spans = document.querySelectorAll(".politician-images span");
      spans.forEach((span) => {
        span.style.display = "block";
      });
    }
  }
  
   const filterbutton2 = document.querySelector("#filter-button2");
    filterbutton2.addEventListener("click", () => {
      handleFilter2('Republicans');
    });
    
    function handleFilter2(filterValue2) {
        const spans = document.querySelectorAll(".politician-images span");
        const filterButton2 = document.querySelector("#filter-button2");
        spans.forEach((span) => {
          if (span.dataset.party === "Republican") {
            span.style.display = "block";
          } else {
            span.style.display = "none";
          }
        });
      }
      
               const filterbutton = document.querySelector("#filter-button1");
      filterbutton.addEventListener("click", () => {
        handleFilter("Democrat");
      });
    
    function handleFilter(filterValue) {
        const spans = document.querySelectorAll(".politician-images span");
        const filterButton = document.querySelector("#filter-button1");
        spans.forEach((span) => {
          if (span.dataset.party === "Democrat") {
            span.style.display = "block";
          } else {
            span.style.display = "none";
          }
        });    
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
    }
    
    stockList.addEventListener('click', (e) => {
        const stockId = parseInt(e.target.dataset.id.split('-')[1]);
        const clickedStock = politician.stocks.find(stock => stockId === politician.stocks.indexOf(stock));
        addStockContainer(clickedStock);
    });
    
    
   detailContainer.append(featureImg, name, party, stocksSpan, stockList)
    appendContainer.append(detailContainer)
  
    setTimeout(() => {
      window.scrollTo({
        top: 1120,
        behavior: 'smooth'
      });
    }, 100);
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
        watchlistButton.innerText = 'Add to Watchlist'
        watchlistButton.id = 'watchlist-button'

        watchlistButton.addEventListener('click', handleWatchlistSubmit)


        iFRameDiv.append(graphImg)
        stockDetailSquare.append(stockName, iFRameDiv, watchlistButton, aboutStockTitle, stockInfo)
        stockDetail.append(stockDetailSquare)
        
        setTimeout(() => {
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: 'smooth'
            });
          }, 100);
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
        
        watchlistItem.addEventListener('click', handleWatchlistItemClick)



        //add delete button on click

        const deleteButton = document.createElement('button')
        deleteButton.innerText = 'X'
         watchlistItem.append(deleteButton)


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
       
        function handleWatchlistItemClick(e){
            console.log('click')
        }
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
                watchlistItem.dataset.id = stock.id
                
                
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