class Deck {
  constructor (params) {
    this.domNode = $('<div id="deck" class="clearfix">');
    this.suits = params.suits;
    this.getDeck();
    this.appendDeckDomNode();
  }

  static heartsSuit () {
    return 'HEARTS';
  }

  static spadesSuit () {
    return 'SPADES';
  }

  toHtml () {
    this.domNode.append(this.cards.map((card) => { return card.toHtml() }))
  }

  // Private

  appendDeckDomNode () {
    $('body').append(this.domNode);
  }

  getDeck () {
    $.ajax({
      url: "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1",
      async: false
    }).done((response) => {
      this.setCards(response.deck_id)
    });
  }

  setCards (deckId) {
    $.ajax({
      url: `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=52`,
      async: false
    }).done((response) => {
      this.cards = response.cards
                           .filter(this.filterByPlayableSuits.bind(this))
                           .map((card, index) => { return new Card(card, index) })
    });
  }

  filterByPlayableSuits (card) {
    return this.suits.includes(card.suit);
  }
}
