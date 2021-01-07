let suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
let values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
let deck = new Array();
let players = new Array();
let currentPlayer = 0;

function createDeck(){
  deck = new Array();
  for(let i = 0 ; i < values.length; i++){
      for(let x = 0; x < suits.length; x++){
        let weight = parseInt(values[i]);
        if (values[i] == "J" || values[i] == "Q" || values[i] == "K"){
            weight = 10;}
        if (values[i] == "A"){
            weight = 11;}
        let card = { Value: values[i], Suit: suits[x], Weight: weight };
        deck.push(card);
      }
    }
}

function createPlayers(num){
    players = new Array();
    for(let i = 1; i <= num; i++){
      let hand = new Array();
      let player = { Name: "Player ", ID: i, Points: 0, Hand: hand };
      players.push(player);
    }
}

function shuffle(){
  let randomCardA;
  let randomCardB;
  let temp;

  for(let i = 0; i < 500; i++){
      let randomCard1 = Math.floor((Math.random() * deck.length));
      let randomCard2 = Math.floor((Math.random() * deck.length));
      let temp = deck[randomCard1];

      deck[randomCard1] = deck[randomCard2];
      deck[randomCard2] = temp;
    }
}

function createPlayersUI(){
    document.getElementById("players").innerHTML = "";
    for(let i = 0; i < players.length; i++){
      let div_player = document.createElement("div");
      let div_playerid = document.createElement("div");
      let div_hand = document.createElement("div");
      let div_points = document.createElement("div");

      div_player.id = "player" + i;
      div_player.className = "player";
      div_hand.id = "hand" + i;
      div_points.id = "points" + i;
      div_points.className = "points";

      div_player.appendChild(div_playerid);
      div_player.appendChild(div_hand);
      div_player.appendChild(div_points);
      document.getElementById("players").appendChild(div_player);
    }
}

function getCardUI(card){
    let el = document.createElement("div");
    let icon = "";
    if (card.Suit == "Hearts"){
      icon= "&hearts;";
    }else if (card.Suit == "Spades"){
      icon = "&spades;";
    }else if (card.Suit == "Diamonds"){
      icon = "&diams;";
    }else{
      icon = "&clubs;";
    }

    el.className = "card";
    el.innerHTML = card.Value + icon;
    return el;
}

function renderCard(card, player){
    let hand = document.getElementById("hand" + player);
    hand.appendChild(getCardUI(card));
}

function getPoints(player){
    let points = 0;
    for(let i = 0; i < players[player].Hand.length; i++){
        points += players[player].Hand[i].Weight;
    }

    if (points > 21) {
      for(let i = 0; i < players[player].Hand.length; i++){
        if (points > 21) {
          if (players[player].Hand[i].Weight === 11) {
            players[player].Hand[i].Weight = 1;
            points -= 10;
          }
        }
      }
    }

    players[player].Points = points;
    return points;
}

function updatePoints(){
    for (let i = 0 ; i < players.length; i++){
        getPoints(i);
        document.getElementById("points" + i).innerHTML = players[i].Points;
    }
}

function updateDeck(){
    document.getElementById("deckcount").innerHTML = deck.length;
}

function dealHands(){
  for(let i = 0; i < 2; i++){
      for (let x = 0; x < players.length; x++){
          let card = deck.pop();
          players[x].Hand.push(card);
          renderCard(card, x);
          updatePoints();
        }
    }
    updateDeck();
}

function startblackjack(){
  document.getElementById("status").style.display = "none";

  currentPlayer = 0;
  createDeck();
  shuffle();
  createPlayers(1);
  createPlayersUI();
  dealHands();
  document.getElementById("player" + currentPlayer).classList.add("active");
}

function win(){
    let score = 0;

    for(let i = 0; i < players.length; i++){
        if (players[i].Points < 22){
            score = players[i].Points;
        }

    }

    document.getElementById("status").innerHTML = "You win!";
    document.getElementById("status").style.display = "inline-block";
}

function lose(){
    if (players[currentPlayer].Points > 21){
        document.getElementById("status").innerHTML = "You lose.";
        document.getElementById("status").style.display = "inline-block";

    }
    return true;
}


function stand(){
  if (players[currentPlayer].Points <= 21){
    win();
  } else {
    lose();
  }
}

function hit(){
  let card = deck.pop();
  players[currentPlayer].Hand.push(card);
  renderCard(card, currentPlayer);
  updatePoints();
  updateDeck();
  lose();
}
