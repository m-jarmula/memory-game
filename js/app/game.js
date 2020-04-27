class Game {
  constructor (deck) {
    this.discoveredCards = {};
    this.searchedCard = null;
    this.deck = deck;
    this._registerEvents()
  }

  start() {
    this.deck.toHtml();
  }

  deal (card) {
    if(this.searchedCard == null) return this._setSearchedCard(card)

    if(this._isCardFound(card)) {
      this._setSearchedCard(null);
    } else {
      window.setTimeout(function(){
        this.searchedCard.close();
        card.close();
        this._setSearchedCard(null);
      }.bind(this), 500)
    }
  }

  // Private

  _isCardFound (card) {
    return card.value == this.searchedCard.value;
  }

  _setSearchedCard(card) {
    this.searchedCard = card;
  }

  _registerEvents () {
    window.observables.cardDisclosed.addObserver('cardDisclosed', this.deal.bind(this));
  }
}
