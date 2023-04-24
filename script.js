//Tämä on näkyvien tuotteiden määrä per sivu. Tässä tehtävässä haluamme 50 tuotetta per sivu.
const productsPerPage = 50;

//Tässä on valittujen yritysten products.json linkit, joista sivun tuotteet otetaan.
const urls = [
    'https://www.jungalow.com/products.json',
    'https://www.untuckit.com/products.json',
    'https://www.brooklinen.com/products.json',
    'https://www.ruohonjuuri.fi/products.json',
    'https://fi.fazer.com/products.json',
    'https://eu.danielwellington.com/products.json',
    'https://www.rebeccaminkoff.com/products.json',
    'https://www.kyliecosmetics.com/products.json',
    'https://www.gymshark.com/products.json'
  ];
  
  //Tämä osa koodia ottaa vastaan yllä olevien linkkien tuotteet ja luo niistä listan, jonka jälkeen ne on helppo laittaa näkyville sivulle. 
  Promise.all(urls.map(url =>
    fetch(url).then(response => response.json())
  ))
  .then(dataArray => {
    let products = [];
    dataArray.forEach(data => {
      products = products.concat(data.products);
    });

    let container = document.getElementById('products');

    // Tämä silmukka laittaa ensimmäiset tuotteet näkyville kun sivu avataan.
for (let i = 0; i < productsPerPage && i < products.length; i++) {
    const product = products[i];
    let productDiv = document.createElement('div');
    productDiv.classList.add('product');
    
    // Tämä if lause pitää huolen siitä, että koodi ei keskeydy kun vastaan tulee tuote jolla ei ole kuvaa.
    if(product.images[0] != undefined) {        
      productDiv.innerHTML = `
        <h2>${product.title}</h2>
        <p>Price: ${product.variants[0].price} &euro; </p>
        <img src="${product.images[0].src}">
      `;
    } 
    else {
      productDiv.innerHTML = `
        <h2>${product.title}</h2>
        <p>Price: ${product.variants[0].price} &euro; </p>
      `;
    }
    container.appendChild(productDiv);
  }

//Tämä funktio päivittää sivun kun siirrytään aikaisemmalle tai seuraavalle sivulle.
function updatePage() {
    container.innerHTML = '';
    for (let i = currentPage * productsPerPage; i < (currentPage + 1) * productsPerPage && i < products.length; i++) {
      const product = products[i];
      let productDiv = document.createElement('div');
      productDiv.classList.add('product');

      // Tämä if lause pitää huolen siitä, että koodi ei keskeydy kun vastaan tulee tuote jolla ei ole kuvaa.
      if(product.images[0] != undefined) {        
        productDiv.innerHTML = `
          <h2>${product.title}</h2>
          <p>Price: ${product.variants[0].price} &euro; </p>
          <img src="${product.images[0].src}">
        `;
      } 
      else {
        productDiv.innerHTML = `
          <h2>${product.title}</h2>
          <p>Price: ${product.variants[0].price} &euro; </p>
        `;
      }

      container.appendChild(productDiv);
      container.appendChild(previousButton);
      container.appendChild(nextButton);
    }
    window.scrollTo(0, 0);
    document.getElementById('currentPage').textContent = `Page ${currentPage + 1}`;

    //Luodaan if lauseet jotka piilottavat "Previous" ja "Next" napit jos kyseessä on ensimmäinen tai viimeinen sivu.
    if (currentPage === 0) {
        previousButton.style.display = 'none';
      } else {
        previousButton.style.display = 'block';
      }
      
      if (currentPage === 4 ) {
        nextButton.style.display = 'none';
      } else {
        nextButton.style.display = 'block';
      }
  }
  let currentPage = 0;

  //Luodaan nappi joka vie aikaisemmalle sivulle
  let previousButton = document.createElement('button');
  previousButton.textContent = 'Previous';
  previousButton.className = "previousButton";
  previousButton.addEventListener('click', () => {
    if (currentPage > 0) {
      currentPage--;
      updatePage();
    }
  });
  container.appendChild(previousButton);
  
  //Luodaan nappi joka vie seuraavalle sivulle
  let nextButton = document.createElement('button');
  nextButton.textContent = 'Next';
  nextButton.className = 'nextButton';
  nextButton.addEventListener('click', () => {
    if ((currentPage + 1) * productsPerPage < products.length) {
      currentPage++;
      updatePage();
    }
  });
  container.appendChild(nextButton);

  })
  .catch(error => console.error(error));
  