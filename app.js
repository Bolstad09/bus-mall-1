var imageBox = document.getElementById('imageContainer');
var startSurvey = document.getElementById('startSurvey');


var userClicks = 0;
var imagesDisplayedOnScreen = 3;

var allProducts = [];
var displayedProducts = [];

var productNames = [];
var votes = [];

function Product(name, src, displayed, clicked) {
    this.name = name;
    this.src = src;
    this.displayed = displayed;
    this.clicked = clicked;
    allProducts.push(this);
    productNames.push(this.name);
}

new Product("bag", './imgdir/bag.jpg', 0, 0);
new Product("banana", './imgdir/banana.jpg', 0, 0);
new Product("bathroom", './imgdir/bathroom.jpg', 0, 0);
new Product("boots", './imgdir/boots.jpg', 0, 0);
new Product("breakfast", './imgdir/breakfast.jpg', 0, 0);
new Product("bubblegum", './imgdir/bubblegum.jpg', 0, 0);
new Product("chair", './imgdir/chair.jpg', 0, 0);
new Product("cthulhu", './imgdir/cthulhu.jpg', 0, 0);
new Product("duckDog", './imgdir/dog-duck.jpg', 0, 0);
new Product("dragon", './imgdir/dragon.jpg', 0, 0);
new Product("pen", './imgdir/pen.jpg', 0, 0);
new Product("pet-sweep", './imgdir/pet-sweep.jpg', 0, 0);
new Product("scissors", './imgdir/scissors.jpg', 0, 0);
new Product("shark", './imgdir/shark.jpg', 0, 0);
new Product("tauntaun", './imgdir/tauntaun.jpg', 0, 0);
new Product("unicorn", './imgdir/unicorn.jpg', 0, 0);
new Product("water-can", './imgdir/water-can.jpg', 0, 0);
new Product("wine-glass", './imgdir/wine-glass.jpg', 0, 0);


function handleStart() {
    createRandomImages();
    startSurvey.innerHTML = '';
}


function createRandomImages() {

    if(allProducts.length < imagesDisplayedOnScreen) {
        resetArrays();
    }

    for(var i=0; i < imagesDisplayedOnScreen; i++) {
        var image = document.createElement('img');
        var randomIndex = Math.floor(Math.random() * allProducts.length);

        image.src = allProducts[randomIndex].src;
        image.id = allProducts[randomIndex].name;
        imageContainer.appendChild(image);

        allProducts[randomIndex].displayed += 1;

        displayedProducts.push(allProducts[randomIndex]);
        allProducts.splice(randomIndex, 1);
    }
    return;
}



function clearImages() {
    imageBox.innerHTML = '';
}

function resetArrays() {
    allProducts = allProducts.concat(displayedProducts);
    displayedProducts = [];
}



function handleRandomize(event) {
    event.preventDefault();

    if(event.target === event.currentTarget) {
        alert('Please select an image!');
        return;
    }

    if(userClicks === 25) {
        endSurvey();
        return;
    }

    userClicks += 1;
    for(var i=0; i < displayedProducts.length; i++) {
        if(event.target.id === displayedProducts[i].name) {
            displayedProducts[i].clicked += 1;
            clearImages();
            createRandomImages();
            break;
        }
    }
}




function endSurvey(){
    clearImages();
    resetArrays();
    alert("Out of clicks");
    imageBox.removeEventListener('click', handleRandomize);


    for(var i = 0; i < allProducts.length; i++) {
        votes[i] = allProducts[i].clicked;
    }
    console.log(votes);

    var resultsListButtonHere = document.getElementById('resultsListButtonHere');
    var resultListButton = document.createElement('button');
        resultListButton.type = 'submit';
        resultListButton.textContent = 'Show list Results';
        resultsListButtonHere.appendChild(resultListButton);
        resultsListButtonHere.addEventListener('click', showListResults);

    var chartButtonHere = document.getElementById('chartButtonHere');
    var chartButton = document.createElement('button');
        chartButton.type = 'submit';
        chartButton.textContent = 'Show Chart Results';
        chartButtonHere.appendChild(chartButton);
        chartButtonHere.addEventListener('click', showChartResults);
}


function showListResults(event){
    event.preventDefault();
    resultsListButtonHere.innerHTML = '';
    resultsListButtonHere.removeEventListener('click', showListResults);
    var resultsList = document.getElementById('resultsList');
    for(var i=0; i < allProducts.length; i++) {
        var liEl = document.createElement('li');
        liEl.textContent=allProducts[i].name + ' was clicked ' + allProducts[i].clicked + ' times, after being displayed ' + allProducts[i].displayed + ' times.';
        resultsList.appendChild(liEl);
    }
}


var barData = {
    labels : productNames,
    datasets : [
        {
        data : votes,
        }
    ]
};

function showChartResults(event){
    event.preventDefault();
    chartButtonHere.innerHTML = '';
    chartButtonHere.removeEventListener('click', showChartResults);

    var results = document.getElementById('results').getContext('2d');
    var resultChart = new Chart(results).Bar(barData);
}


startSurvey.addEventListener('click', handleStart);

imageBox.addEventListener('click', handleRandomize);
