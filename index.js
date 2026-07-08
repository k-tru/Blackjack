let player = {
    name: "Per",
    chips: 200
}

let cards = []
let sum = 0
let blackJack = false
let bust = true

let dealerCards = []
let dealerSum = 0
let isGameActive = false

let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")

let dealerCardsEl = document.getElementById("dealer-cards-el")
let dealerSumEl = document.getElementById("dealer-sum-el")

playerEl.textContent = player.name + ": $" + player.chips

function getCardValue() {
    let card = Math.floor(Math.random() * 13 + 1)
    if (card >= 10) {
        return 10
    } else if (card === 1) {
        return 11
    }
    return card
}

function start() {
    if (player.chips <= 0) {
        messageEl.textContent = "You are out of money! Game Over! ❌"
        return
    }

    bust = false
    blackJack = false
    isGameActive = true
    
    player.chips -= 20
    playerEl.textContent = player.name + ": $" + player.chips

    cards = [getCardValue(), getCardValue()]
    sum = cards[0] + cards[1]

    dealerCards = [getCardValue(), getCardValue()]
    dealerSum = dealerCards[0] + dealerCards[1]

    render()
}

function render() {
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += " " + cards[i]
    }
    sumEl.textContent = "Sum: " + sum

    if (isGameActive) {
        dealerCardsEl.textContent = "Cards: " + dealerCards[0] + " ?"
        dealerSumEl.textContent = "Sum: " + dealerCards[0]
    } else {
        dealerCardsEl.textContent = "Cards: "
        for (let i = 0; i < dealerCards.length; i++) {
            dealerCardsEl.textContent += " " + dealerCards[i]
        }
        dealerSumEl.textContent = "Sum: " + dealerSum
    }

    if (sum < 21) {
        message = "Do you want to draw a new card or Stand? 🤔"
    } else if (sum === 21) {
        message = "You got 21! Press Stand to see dealer's hand. 💎"
        blackJack = true
    } else {
        message = "Busttttt :( You lost this round."
        bust = true
        isGameActive = false
        if (player.chips <= 0) {
            message = "Bust! You are completely out of money! 😭"
        }
    }
    messageEl.textContent = message
}

function newCard() {
    if (isGameActive && !bust && !blackJack) {
        let card = getCardValue()
        cards.push(card)
        sum += card
        render()
    }
}

function stand() {
    if (!isGameActive || bust) return

    isGameActive = false

    while (dealerSum < 17) {
        let card = getCardValue()
        dealerCards.push(card)
        dealerSum += card
    }

    render()

    if (blackJack && dealerSum != 21) {
        message = "BLACKJACK!!! You Win $60! 💰"
        player.chips += 60 
    } else if (dealerSum > 21) {
        message = "Dealer Busts! You Win $40! 🎉"
        player.chips += 40 
    } else if (sum > dealerSum) {
        message = "You beat the dealer! You Win $40! 🎉"
        player.chips += 40
    } else if (sum < dealerSum) {
        message = "Dealer wins this round! 💸"
    } else {
        message = "It's a tie (Push)! You get your $20 back. 🤝"
        player.chips += 20
    }

    playerEl.textContent = player.name + ": $" + player.chips
    messageEl.textContent = message
}