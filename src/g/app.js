// JavaScript för att implementera kraven A-E.
//let products; //Här deklareras products globalt. Edit: gör funktionen global istället.

let stuffContainer = document.getElementById("stuff");

fetch('http://demo.edument.se/api/products')
    .then(response => response.json())
    .then(products => {

        let shopStuff = products.map(data => `
    <div class="mapStuff" data-value="${data.Id}">
    <img src="${data.Image}"><br>
    <h3 class="detail">${data.Name}</h3>
    ${data.Description} <br>
    <a href="${data.Url}">${data.Url}</a><br>
    $ ${data.Price}  <br>
    <button class="buy" data-value="${data.Id}">Add to cart</button>
     <hr>
     </div>
    `);

    let shopStuffs = shopStuff.join(" ");    //Plockar bort kommatecken,
    stuffContainer.innerHTML=shopStuffs;     //Publicering
    //console.log(products);




// var myRequest = new XMLHttpRequest();
// myRequest.open('GET', 'http://demo.edument.se/api/products');
// myRequest.onload = function(){
//     //console.log(myRequest.responseText);
//     let myData = JSON.parse(myRequest.responseText);
//     //console.log(myData[0]);
//     let shopStuff = myData.map(data=> `
//     <div class="mapStuff" data-value="${data.Id}">
//     <img src="${data.Image}"><br>
//     <h3 class="detail">${data.Name}</h3>
//     ${data.Description} <br>
//     <a href="${data.Url}">${data.Url}</a><br>
//     $ ${data.Price}  <br>
//     <button class="buy" data-value="${data.Id}">Add to cart</button>
//      <hr>
//      </div>
//     `);
//
//     let shopStuffs = shopStuff.join(" ");    //Plockar bort kommatecken,
//     stuffContainer.innerHTML=shopStuffs;     //Publicering
//     console.log(myData);
//
// };
//
// myRequest.send();


//console.log("My Data: ", products);            //Här är myData ändå inte åtkomligt!!! Körs INNAN myRequest är färdigt.

///////////////////////////// Växla vy/////////////////////////////////////////////
let kassa = document.getElementById("kassa").addEventListener("click", betala);     //För att toggla mellan shop och checkout

function betala(){
    this.style.backgroundColor = "yellow";
    document.getElementById("stuff").style.display = "none";
    document.getElementById("checkout").style.display = "flex";
    document.getElementById("shoppa").style.backgroundColor = "grey";
    //document.getElementById("detail").style.display = "none";
}

let shoppa = document.getElementById("shoppa").addEventListener("click", browse);

function browse(){
    this.style.backgroundColor = "yellow";
    document.getElementById("stuff").style.display = "block";
    document.getElementById("checkout").style.display = "none";
    document.getElementById("kassa").style.backgroundColor = "grey";
    //$('#detail').hide();
}

//////////////////////Varukorgsfunktioner////////////////////////////////////
let cartObject = {

};

/*
document.getElementsByClassName("buy").addEventListener("click", bag);  //getElementsByClassName returnerar array. Duger inte här!
  //  buy(this.data('value'));
*/

// Leta upp alla element med klass "buy" = alla knappar
var buyButtons = document.getElementsByClassName('buy');

// Sätt en event-lyssnare på resp. knapp
for ( var i = 0; i < buyButtons.length; i++ ) {
    buyButtons[i].addEventListener('click', function() {

        // Vid tryck på en knapp triggas funktionen add_to_cart som får ett värde från data-value-attributet
        add_to_cart( this.getAttribute("data-value") );

    });
}

function add_to_cart(id){
    if (cartObject[id]){
        cartObject[id]++;
    } else {
        cartObject[id] = 1;
    }
    //console.log("DATAVALUE", id, cartObject);
    displayBasket();
}


/*
function bag(e){
    let id = e.target.getAttribute("data-value");
    cartObject.push(id);
    let basket = document.getElementById("basket").innerHTML = cartArray;
    console.log("Cart", cartArray);
}
*/

console.log(products);

function displayBasket() {
    var basket = document.getElementById("basket");
    basket.innerHTML = " ";
    for (let key in cartObject) {
        let qty = cartObject[key];
        //let product = products.find(p => p.id == key);
        let product;
        for (let i = 0; i < products.length; i++) {
            if (products[i].id == key) {
                product = products[i];
            }
        }
        if (qty) {
            basket.innerHTML += `                                                                                                             
            <li><h5>${product.Name}</h5></li>                                                                                                                
            <li>${product.price}:- </li>
            <button class="decrease" data-value="${product.id}">-</button> 
            <input type="text" value="${cartObject[key]}" size="4" class="bagged">
            <button class="increase" data-value="${product.id}">+</button>  
            <li>${product.price * cartObject[key]}</li>
             <hr>                                                                             
        `;
        }
    }


    let minusBtns = document.getElementsByClassName("decrease");
    let plusBtns = document.getElementsByClassName("increase");
    /*
    for(let i=0; i < minusBtns.length; i--); {
        minusBtns[i].addEventListener("click", function(event){

              event.target()
        });
    }
    */

    for (var i = 0; i < minusBtns.length; i++) {
        minusBtns[i].addEventListener('click', function (e) {
            remove_from_cart(this.getAttribute("data-value"));
            // console.log('Target is: ' + e.target.getAttribute("data-value"))
            //console.log('CLICKED ON MINUS ' + this.getAttribute("data-value"));
            // remove_from_cart( this.getAttribute("data-value") );


        });
    }
    for (var i = 0; i < plusBtns.length; i++) {
        plusBtns[i].addEventListener('click', function (e) {
            add_to_cart(this.getAttribute("data-value"));
            // console.log('Target is: ' + e.target.getAttribute("data-value"))
            //console.log('CLICKED ON PLUS ' + this.getAttribute("data-value"));
            // remove_from_cart( this.getAttribute("data-value") );
        });
    }

    let total = Array.from(document.getElementsByClassName("bagged"));
    let totalItems = total.reduce(function(accumulator, node){
        return accumulator+parseInt(node.getAttribute("value"));
    }, 0);
    //console.log("Totalt antal", totalItems);
    //document.getElementById("itemCount").innerHTML = totalItems;
    $("#itemCount").html(totalItems);
}
function remove_from_cart(id) {

    if (cartObject[id]) {
        cartObject[id]--;
    }
    displayBasket();
    //console.log("DATAVALUE", id, cartObject);
}

/////Varje FETCH returnerar promise. Vänta in alla PROMISE, THEN alert och töm varukorg.
    }); // then avslutas här...