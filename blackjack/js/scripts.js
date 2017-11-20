// console.log('sanity check');
$(document).ready(function(){
	// Wait for the DOM JS...
	// BlackJack deal function
	// 	Create deck function
	// 	Shuffle deck function
	// 	Add card[0] and card[2] to player hand, 1 and 3 to dealer
	// 	Place card function
	// 	Push card onto players array

	var playersHand = [];
	var dealersHand = [];
	// freshDeck is the return value of the function createDeck
	const freshDeck = createDeck();
	console.log(freshDeck);
	// Make a FULL copy of teh freshDeck with slice, don't point at it.
	var theDeck = freshDeck.slice();
	// shuffleDeck();
	var playerScore = 0;
	var dealerScore = 0;
	var hitGameOn = true;
	var standGameOn = true;
	var startingTotal = 0;
	var betAmount = 0;

	$('button').prop('disabled',true);
	$('.game-reset-button, .start-button').prop('disabled', false);

	$('.game-reset-button').click(()=>{
		reset();
		$(".dealer-cards .card-1").html('<img src="images/cards/deck.png">');
		$(".dealer-cards .card-2").html('<img src="images/cards/deck.png">');
		$(".player-cards .card-1").html('<img src="images/cards/deck.png">');
		$(".player-cards .card-2").html('<img src="images/cards/deck.png">');
		$('.start-button').prop('disabled',false);
		$('.hit-button').prop('disabled',true);
		$('.deal-button').prop('disabled',true);
		$('.stand-button').prop('disabled',true);
		$('.bet25-button').prop('disabled',true);
		$('.bet50-button').prop('disabled',true);
		$('.bet100-button').prop('disabled',true);
		playerScore = 0;
		dealerScore = 0;
		startingTotal = 0;
		$('.player-win-count').html(playerScore);
		$('.dealer-win-count').html(dealerScore);
		$('.player-bet-total').html('0');
		$('.check-message').html("");
		var playersHand = [];
		var dealersHand = [];
	})

	$('.start-button').click(()=>{
		$('.start-button').prop('disabled',true);
		$('.deal-button').prop('disabled',false);
		startingTotal = (Math.floor(Math.random() * 101) * 5) + 100;
		$('.player-bet-total').html(startingTotal);
	})

	$('.deal-button').click(()=>{
		$('.deal-button').prop('disabled',true);
		if(startingTotal < 25){
			$('.bet25-button').prop('disabled',true);
			$('.bet50-button').prop('disabled',true);
			$('.bet100-button').prop('disabled',true);
		}else if(startingTotal < 50){
			$('.bet25-button').prop('disabled',false);
			$('.bet50-button').prop('disabled',true);
			$('.bet100-button').prop('disabled',true);
		}else if(startingTotal < 100){
			$('.bet25-button').prop('disabled',false);
			$('.bet50-button').prop('disabled',false);
			$('.bet100-button').prop('disabled',true);
		}else{
			$('.bet25-button').prop('disabled',false);
			$('.bet50-button').prop('disabled',false);
			$('.bet100-button').prop('disabled',false);
		}
		$('.check-message').html("");
		hitGameOn = true;
		standGameOn = true;
		reset();
		// We will create and shuffle a new deck
		theDeck = freshDeck.slice();
		theDeck = shuffleDeck(theDeck);
		playersHand = [];
		dealersHand = [];
		// console.log(theDeck);
		// Update the player and dealer hand arrays...
		// The player ALWAYS gets teh first card in teh deck...
		console.log(theDeck)
		// console.log(theDeck.length);
		var topCard = theDeck.shift();
		// console.log(topCard);
		// console.log(theDeck.length);
		playersHand.push(topCard);

		// Give the dealer the next top card
		topCard = theDeck.shift();
		dealersHand.push(topCard);

		// Give the player the next top card
		topCard = theDeck.shift();
		playersHand.push(topCard);

		// Give the dealer the next top card
		topCard = theDeck.shift();
		dealersHand.push(topCard);

		console.log(dealersHand);
		console.log(playersHand);

		// Call placeCard for each of the 4 cards.
		// arg 1: who
		// arg 2: where
		// arg 3: what (card to place in teh DOM)
		placeCard('player',1,playersHand[0]);
		placeCard('dealer',1,dealersHand[0]);
		placeCard('player',2,playersHand[1]);
		placeCard('dealer',2,dealersHand[1]);

		hideCard('dealer',2);

		// Figure teh total and put it in teh dom
		// arg1: entire hand
		// arg2: who
		calculateTotal(playersHand,'player');
		// calculateTotal(dealersHand,'dealer')
		$('.bet25-button').click(()=>{
			betAmount = 25;
			$('.bet25-button').prop('disabled',true);
			$('.bet50-button').prop('disabled',true);
			$('.bet100-button').prop('disabled',true);
			$('.hit-button').prop('disabled',false);
			$('.stand-button').prop('disabled',false);
		})

		$('.bet50-button').click(()=>{
			betAmount = 50;
			$('.bet25-button').prop('disabled',true);
			$('.bet50-button').prop('disabled',true);
			$('.bet100-button').prop('disabled',true);
			$('.hit-button').prop('disabled',false);
			$('.stand-button').prop('disabled',false);
		})

		$('.bet100-button').click(()=>{
			betAmount = 100;
			$('.bet25-button').prop('disabled',true);
			$('.bet50-button').prop('disabled',true);
			$('.bet100-button').prop('disabled',true);
			$('.hit-button').prop('disabled',false);
			$('.stand-button').prop('disabled',false);
		})
	})

	$('.hit-button').click(()=>{
		if(hitGameOn == true){
			// Hit functionallity...
			console.log("User clicked the hit button")
			// get the top card
			var topCard = theDeck.shift();
			// push it on to the playersHand
			playersHand.push(topCard);
			// put the card in teh DOM
			placeCard('player',playersHand.length, topCard)
			// calculate teh new total
			calculateTotal(playersHand,'player');
			var checkTotal = calculateTotal(playersHand, 'player');
			if(checkTotal >= 21){
				hitGameOn = false;
			}
		}
	})	

	$('.stand-button').click(()=>{
		$('.hit-button').prop("disabled", true);
		$('.stand-button').prop("disabled", true);
		if(standGameOn == true){
		// Stand functionallity...
		// console.log("User clicked the stand button")
		// What happens to teh players hand on "Stand"?
		// - Nothing.
		// Control passes over the dealer.
		// Rules for the dealer:
		// 1. If I have less than 17... I MUST hit
		// 2. If I have 17 or more, I CANNOT hit (even if it means losing)
			var dealersTotal = calculateTotal(dealersHand,'dealer');
			var playersTotal = calculateTotal(playersHand,'player');
			while(dealersTotal < 17){
				if(playersTotal <= 21){
					var topCard = theDeck.shift();
					dealersHand.push(topCard);
					placeCard('dealer', dealersHand.length, topCard);
					dealersTotal = calculateTotal(dealersHand,'dealer');
				}else if(playersTotal > 21){
					// var dealersTotal = calculateTotal(dealersHand,'dealer');
					break;
				}
			}
			placeCard('dealer',2,dealersHand[1]);
			calculateTotal(dealersHand, "dealer");
			checkWin();
			standGameOn = false;
			hitGameOn = false;
			$('.deal-button').prop('disabled',false);
			checkGameWin();
		}

	})

	function hideCard(who, where){
		var cardToHide = `.${who}-cards .card-${where}`;
		$(cardToHide).html('<img src="images/cards/deck.png">');
	}

	function checkGameWin(){
		if(startingTotal >= 1000){
			$('.check-message').html("YOU WON :)");
			$('.deal-button').prop('disabled', true);
		}else if(startingTotal <= 24){
			$('.check-message').html("YOU LOST :(");
			$('.deal-button').prop('disabled', true);
		}
	}

	function checkWin(){
		var playerTotal = calculateTotal(playersHand,'player');
		var dealerTotal = calculateTotal(dealersHand,'dealer');
		if(playerTotal > 21){
			dealerScore += 1;
			$(".dealer-win-count").html(dealerScore);
			startingTotal -= betAmount;
			$(".player-bet-total").html(startingTotal);
			$('.check-message').html(`PLAYER LOST ${betAmount} CHIPS`);
		}else if(playerTotal <= 21){
			if(dealerTotal > 21){
				playerScore += 1;
				$(".player-win-count").html(playerScore);
				startingTotal += betAmount;
				$(".player-bet-total").html(startingTotal);
				$('.check-message').html(`PLAYER WIN ${betAmount} CHIPS`);
			}else if(dealerTotal >= playerTotal){	
				dealerScore += 1;
				$(".dealer-win-count").html(dealerScore);
				startingTotal -= betAmount;
				$(".player-bet-total").html(startingTotal);
				$('.check-message').html(`PLAYER LOST ${betAmount} CHIPS`)
			}else if(dealerTotal < playerTotal){
				playerScore += 1;
				$(".player-win-count").html(playerScore);
				startingTotal += betAmount;
				$(".player-bet-total").html(startingTotal);
				$('.check-message').html(`PLAYER WIN ${betAmount} CHIPS`);
			}
		}
		// 1. If the player has > 21, player busts and loses.
		// 2. If the dealer has > 21, dealer busts and loses.
		// 3. If playersHand.length == 2 AND playerTotal == 21... BLACKJACK
		// 4. If dealerHand.length == 2 AND dealersTotal == 21... BLACKJACK
		// 5. If player > dealer, player wins
		// 6. if dealer > player, dealer wins
		// 7. else... push (tie)
	}

	function calculateTotal(hand, who){
		// purpose:
		// 1. Find out the number and return it
		// 2. Update the DOM with the right number for the right player
		// init counter at 0
		var handTotal = 0;
		// As we loop through the hand, we need a var for each card's value
		var thisCardsValue = 0;
		var totalAce = 0;
		var hasAce = false;
		for(let i = 0; i < hand.length; i++){
			// copy onto thisCardsValue the entire string EXCEPT for the last char (which is the suit)
			// then, convert it to a number			
			thisCardsValue = Number(hand[i].slice(0,-1));
			if(thisCardsValue > 10){
				thisCardsValue = 10;
			}else if(thisCardsValue == 1){
				totalAce++;
				hasAce = true;
				thisCardsValue = 11;
			}
			handTotal += thisCardsValue
		}
		for(let i = 0; i < totalAce; i++){
			if(handTotal > 21){
				handTotal -= 10;
			}
		}
		var classSelector = `.${who}-total`;
		$(classSelector).html(handTotal);
		return handTotal;
	}

	function reset(){
		$(".dealer-total").html('CALCULATING');
		$(".player-total").html('CALCULATING');
		$(".dealer-cards .card-3").html('<img src="images/cards/deck.png">');
		$(".dealer-cards .card-4").html('<img src="images/cards/deck.png">');
		$(".dealer-cards .card-5").html('<img src="images/cards/deck.png">');
		$(".dealer-cards .card-6").html('<img src="images/cards/deck.png">');
		$(".player-cards .card-3").html('<img src="images/cards/deck.png">');
		$(".player-cards .card-4").html('<img src="images/cards/deck.png">');
		$(".player-cards .card-5").html('<img src="images/cards/deck.png">');
		$(".player-cards .card-6").html('<img src="images/cards/deck.png">');
	}

	function placeCard(who,where,whatToPlace){
						// who = "dealer"
						// where = 1
		var classSelector = `.${who}-cards .card-${where}`;
							 // $('.dealer-cards .card-1')
		// Set the HTML of the div with .who-cards .card-where with the image...
		// $(classSelector).html('<img src="images/cards/'+whatToPlace+'.png" />');
		$(classSelector).html(`<img src="images/cards/${whatToPlace}.png" />`);

	}

	function createDeck(){
		// local var. Per JS scope, no one knows about this var but me (createDeck function)
		var newDeck = [];
		// Card = suit + value
		// suits is a constant. It cannot be reassigned. 
		const suits = ['h','s','d','c'];
		// suits.push("special") //will error!!!
		// outer loop for suit
		// suits.map((s)=>{
		// })
		for(let s = 0; s < suits.length; s++){
			// inner loop for value
			for(let c = 1; c <= 13; c++){
				newDeck.push(c+suits[s]);
			}
		}
		// console.log(newDeck);
		return newDeck;
	}

	function shuffleDeck(aDeckToBeShuffled){
		// Loop. A lot. Like those machines in casinos. 
		// Each time through the loop, we will switch to indicies (cards)
		// When the loop (lots of times) is done, the array (Deck) will be shuffled
		for(let i = 0; i < 50000; i++){
			var rand1 = Math.floor(Math.random() * aDeckToBeShuffled.length);
			var rand2 = Math.floor(Math.random() * aDeckToBeShuffled.length);
			// switch theDeck[rand1] with theDeck[rand2]
			// Stash teh value of theDeck[rand1] inside card1Defender so
			// we can get it back after overwriting theDeck[rand1] with tehDeck[rand2]
			var card1Defender = aDeckToBeShuffled[rand1]; 
			// now it's safe to overwrite theDeck[rand1], becasue we saved it
			aDeckToBeShuffled[rand1] = aDeckToBeShuffled[rand2];
			aDeckToBeShuffled[rand2] = card1Defender;
		}
		// console.log(theDeck);
		return aDeckToBeShuffled;
	}


});

