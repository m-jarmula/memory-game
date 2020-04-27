class Card {
  constructor (params, index) {
    this.code = params.code;
    this.imageOpen = params.image;
    this.value = params.value;
    this.suit = params.suit;
    this.index = index;
    this.setState('closed');

    this._setDomNode();
  }

  setState (state) {
    this.state = state;
  }

  toHtml = () => {
    return this.domNode
        .flip().flip(true)
        .on('click', this._onClick.bind(this))
  }

  isOpen() {
    return this.state == 'open'
  }

  open () {
    this.domNode.flip(false)
    this.setState('open');
  }

  close () {
    this.domNode.flip(true)
    this.setState('closed');
  }

  // Private

  _setDomNode () {
    this.domNode = $(`
      <div class="card" id="card-${this.index}">
        <img src=${this.imageOpen}
        class="card-img front">

        <img src=${Card.closedCoverImage()}
        class="card-img back">
      </div>
    `);
  }

  _cover () {
    return this.isOpen() ? this.openCover : Card.closedCoverImage();
  }

  _onClick () {
    this._changeCardState();
    // this.domNode.toggleClass('rotate')

    window.observables.cardDisclosed.trigger(this);
  }

  _changeCardState () {
    if(this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  static closedCoverImage () {
    return 'img/closed_cover.png'
  }
}
