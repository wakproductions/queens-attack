class AttackCalculator {
  constructor(chesspieceRedCoordinates, chesspieceBlueCoordinates) {
    this.chesspieceRedCoordinates = chesspieceRedCoordinates;
    this.chesspieceBlueCoordinates = chesspieceBlueCoordinates;
  }

  // returns false if not under attack
  attacking() {
    return(this._horizontal_overlap() || this._vertical_overlap() || this._diagonal_overlap());
  }

  _column(coordinates) {
    return((coordinates && coordinates[1]) || null);
  }

  _row(coordinates) {
    return((coordinates && coordinates[0]) || null);
  }

  _diagonal_overlap() {
    // TODO This method of checking diagonals by listing all of them is inefficient. I would rather
    // TODO dynamically calculate them. Will consider implementation of dynamic calculation at a later time.
    // TODO One danger of using this method is that if the diagonal tables have a mistake there could be
    // TODO a combination of pieces that are attacking that will not report!
    var diagonals = [
      ['g1', 'h2'],
      ['f1', 'g2', 'h3'],
      ['e1', 'f2', 'g3', 'h4'],
      ['d1', 'e2', 'f3', 'g4', 'h5'],
      ['c1', 'd2', 'e3', 'f4', 'g5', 'h6'],
      ['b1', 'c2', 'd3', 'e4', 'f5', 'g6', 'h7'],
      ['a1', 'b2', 'c3', 'd4', 'e5', 'f6', 'g7', 'h8'],
      ['a2', 'b3', 'c4', 'd5', 'e6', 'f7', 'g8'],
      ['a3', 'b4', 'c5', 'd6', 'e7', 'f8'],
      ['a4', 'b5', 'c6', 'd7', 'e8'],
      ['a5', 'b6', 'c7', 'd8'],
      ['a6', 'b7', 'c8'],
      ['a7', 'b8'],
      ['h7', 'g8'],
      ['h6', 'g7', 'f8'],
      ['h5', 'g6', 'f7', 'e8'],
      ['h4', 'g5', 'f6', 'e7', 'd8'],
      ['h3', 'g4', 'f5', 'e6', 'd7', 'c8'],
      ['h2', 'g3', 'f4', 'e5', 'd6', 'c7', 'b8'],
      ['h1', 'g2', 'f3', 'e4', 'd5', 'c6', 'b7', 'a8'],
      ['g1', 'f2', 'e3', 'd4', 'c5', 'b6', 'a7'],
      ['f1', 'e2', 'd3', 'c4', 'b5', 'a6'],
      ['e1', 'd2', 'c3', 'b2', 'a5'],
      ['d1', 'c2', 'b3', 'a4'],
      ['c1', 'b2', 'a3'],
      ['b1', 'a2']
    ]

    var overlapping_diagonals = diagonals.filter((d)=> (d.indexOf(this.chesspieceRedCoordinates) > -1) && (d.indexOf(this.chesspieceBlueCoordinates) > -1) );
    return((overlapping_diagonals.length > 0 && overlapping_diagonals[0]) || false);
  }

  _horizontal_overlap() {
    return(this._row(this.chesspieceRedCoordinates) == this._row(this.chesspieceBlueCoordinates));
  }

  _vertical_overlap() {
    return(this._column(this.chesspieceRedCoordinates) == this._column(this.chesspieceBlueCoordinates));
  }
}

class ChessboardCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: null
    }
  }

  componentWillReceiveProps() {
    this._clearTemporaryContentState();
  }

  render() {
    return(
      React.createElement("td", {
        className: this.props.squareColor + ' ' + this._cellTeamClasses(), 
        onClick: () => this._handleClick(), 
        onMouseEnter: () => this._handleMouseEnter(), 
        onMouseLeave: () => this._handleMouseLeave()
      }, 
        this._propContent() ? this._propContent() : this.state.content
      )
    );
  }

  _cellTeamClasses() {
    return(
      this._propTeamColor() ||
      (this.props.selectedChesspiece ? this.props.selectedChesspiece + ' ' + 'cursor-pointer' : '') ||
      ''
    );
  }

  _clearTemporaryContentState() {
    this.setState({content: null});
  }

  _handleClick()  {
    if(this.props.selectedChesspiece) this.props.onSetChesspieceCoordinates(this.props.coordinates);
  }

  _handleMouseEnter() {
    if(this.props.selectedChesspiece) this.setState({content: 'w'});
  }

  _handleMouseLeave() {
    this.setState({content: this._propContent()});
  }

  _propContent() {
    if([this.props.chesspieceRedCoordinates, this.props.chesspieceBlueCoordinates].indexOf(this.props.coordinates) > -1) {
      return 'w';
    } else {
      return null;
    }
  }

  _propTeamColor() {
    if(this.props.chesspieceRedCoordinates==this.props.coordinates) {
      return 'chesspiece-red';
    } else if(this.props.chesspieceBlueCoordinates==this.props.coordinates) {
      return 'chesspiece-blue';
    } else {
      return null;
    }
  }

}

ChessboardCell.propTypes = {
  coordinates: React.PropTypes.string.isRequired,  // should be a1 through h8
  squareColor: React.PropTypes.oneOf(['light', 'dark']).isRequired,

  // Used to determine whether to flash a queen piece on mouseover for setting purposes - should be a state?
  selectedChesspiece: React.PropTypes.oneOf(['chesspiece-red', 'chesspiece-blue']),

  // For populated a fixed chesspiece as determined by the chessboard
  chesspieceRedCoordinates: React.PropTypes.string,
  chesspieceBlueCoordinates: React.PropTypes.string
}

class Chessboard extends React.Component {
  constructor(props) {
    super(props);
    this._chessboardCells = [];
  }

  render() {

    // TODO Refactor to dynamically generate and populate cells. This would also allow us to not have to
    // TODO pass the cell numbers containing the pieces down to every ChessboardCell. Flux pattern would
    // TODO also improve the design by giving us a central store to reference.

    return(
      React.createElement("table", {className: "chessboard center"}, 
        React.createElement("tbody", null, 
        React.createElement("tr", null, 
          React.createElement(ChessboardCell, React.__spread({coordinates: "h1", squareColor: "light", ref: "onecell"},  this.props)), 
          React.createElement(ChessboardCell, React.__spread({coordinates: "h2", squareColor: "dark"},  this.props)), 
          React.createElement(ChessboardCell, React.__spread({coordinates: "h3", squareColor: "light"},  this.props)), 
          React.createElement(ChessboardCell, React.__spread({coordinates: "h4", squareColor: "dark"},  this.props)), 
          React.createElement(ChessboardCell, React.__spread({coordinates: "h5", squareColor: "light"},  this.props)), 
          React.createElement(ChessboardCell, React.__spread({coordinates: "h6", squareColor: "dark"},  this.props)), 
          React.createElement(ChessboardCell, React.__spread({coordinates: "h7", squareColor: "light"},  this.props)), 
          React.createElement(ChessboardCell, React.__spread({coordinates: "h8", squareColor: "dark"},  this.props))
        ), 
        React.createElement("tr", null, 
          React.createElement(ChessboardCell, React.__spread({coordinates: "g1", squareColor: "dark"},  this.props)), 
          React.createElement(ChessboardCell, React.__spread({coordinates: "g2", squareColor: "light"},  this.props)), 
          React.createElement(ChessboardCell, React.__spread({coordinates: "g3", squareColor: "dark"},  this.props)), 
          React.createElement(ChessboardCell, React.__spread({coordinates: "g4", squareColor: "light"},  this.props)), 
          React.createElement(ChessboardCell, React.__spread({coordinates: "g5", squareColor: "dark"},  this.props)), 
          React.createElement(ChessboardCell, React.__spread({coordinates: "g6", squareColor: "light"},  this.props)), 
          React.createElement(ChessboardCell, React.__spread({coordinates: "g7", squareColor: "dark"},  this.props)), 
          React.createElement(ChessboardCell, React.__spread({coordinates: "g8", squareColor: "light"},  this.props))
        ), 
        React.createElement("tr", null, 
          React.createElement(ChessboardCell, React.__spread({coordinates: "f1", squareColor: "light"},  this.props)), 
          React.createElement(ChessboardCell, React.__spread({coordinates: "f2", squareColor: "dark"},  this.props)), 
          React.createElement(ChessboardCell, React.__spread({coordinates: "f3", squareColor: "light"},  this.props)), 
          React.createElement(ChessboardCell, React.__spread({coordinates: "f4", squareColor: "dark"},  this.props)), 
          React.createElement(ChessboardCell, React.__spread({coordinates: "f5", squareColor: "light"},  this.props)), 
          React.createElement(ChessboardCell, React.__spread({coordinates: "f6", squareColor: "dark"},  this.props)), 
          React.createElement(ChessboardCell, React.__spread({coordinates: "f7", squareColor: "light"},  this.props)), 
          React.createElement(ChessboardCell, React.__spread({coordinates: "f8", squareColor: "dark"},  this.props))
        ), 
        React.createElement("tr", null, 
          React.createElement(ChessboardCell, React.__spread({coordinates: "e1", squareColor: "dark"},  this.props)), 
          React.createElement(ChessboardCell, React.__spread({coordinates: "e2", squareColor: "light"},  this.props)), 
          React.createElement(ChessboardCell, React.__spread({coordinates: "e3", squareColor: "dark"},  this.props)), 
          React.createElement(ChessboardCell, React.__spread({coordinates: "e4", squareColor: "light"},  this.props)), 
          React.createElement(ChessboardCell, React.__spread({coordinates: "e5", squareColor: "dark"},  this.props)), 
          React.createElement(ChessboardCell, React.__spread({coordinates: "e6", squareColor: "light"},  this.props)), 
          React.createElement(ChessboardCell, React.__spread({coordinates: "e7", squareColor: "dark"},  this.props)), 
          React.createElement(ChessboardCell, React.__spread({coordinates: "e8", squareColor: "light"},  this.props))
        ), 
        React.createElement("tr", null, 
          React.createElement(ChessboardCell, React.__spread({coordinates: "d1", squareColor: "light"},  this.props)), 
          React.createElement(ChessboardCell, React.__spread({coordinates: "d2", squareColor: "dark"},  this.props)), 
          React.createElement(ChessboardCell, React.__spread({coordinates: "d3", squareColor: "light"},  this.props)), 
          React.createElement(ChessboardCell, React.__spread({coordinates: "d4", squareColor: "dark"},  this.props)), 
          React.createElement(ChessboardCell, React.__spread({coordinates: "d5", squareColor: "light"},  this.props)), 
          React.createElement(ChessboardCell, React.__spread({coordinates: "d6", squareColor: "dark"},  this.props)), 
          React.createElement(ChessboardCell, React.__spread({coordinates: "d7", squareColor: "light"},  this.props)), 
          React.createElement(ChessboardCell, React.__spread({coordinates: "d8", squareColor: "dark"},  this.props))
        ), 
        React.createElement("tr", null, 
          React.createElement(ChessboardCell, React.__spread({coordinates: "c1", squareColor: "dark"},  this.props)), 
          React.createElement(ChessboardCell, React.__spread({coordinates: "c2", squareColor: "light"},  this.props)), 
          React.createElement(ChessboardCell, React.__spread({coordinates: "c3", squareColor: "dark"},  this.props)), 
          React.createElement(ChessboardCell, React.__spread({coordinates: "c4", squareColor: "light"},  this.props)), 
          React.createElement(ChessboardCell, React.__spread({coordinates: "c5", squareColor: "dark"},  this.props)), 
          React.createElement(ChessboardCell, React.__spread({coordinates: "c6", squareColor: "light"},  this.props)), 
          React.createElement(ChessboardCell, React.__spread({coordinates: "c7", squareColor: "dark"},  this.props)), 
          React.createElement(ChessboardCell, React.__spread({coordinates: "c8", squareColor: "light"},  this.props))
        ), 
        React.createElement("tr", null, 
          React.createElement(ChessboardCell, React.__spread({coordinates: "b1", squareColor: "light"},  this.props)), 
          React.createElement(ChessboardCell, React.__spread({coordinates: "b2", squareColor: "dark"},  this.props)), 
          React.createElement(ChessboardCell, React.__spread({coordinates: "b3", squareColor: "light"},  this.props)), 
          React.createElement(ChessboardCell, React.__spread({coordinates: "b4", squareColor: "dark"},  this.props)), 
          React.createElement(ChessboardCell, React.__spread({coordinates: "b5", squareColor: "light"},  this.props)), 
          React.createElement(ChessboardCell, React.__spread({coordinates: "b6", squareColor: "dark"},  this.props)), 
          React.createElement(ChessboardCell, React.__spread({coordinates: "b7", squareColor: "light"},  this.props)), 
          React.createElement(ChessboardCell, React.__spread({coordinates: "b8", squareColor: "dark"},  this.props))
        ), 
        React.createElement("tr", null, 
          React.createElement(ChessboardCell, React.__spread({coordinates: "a1", squareColor: "dark"},  this.props)), 
          React.createElement(ChessboardCell, React.__spread({coordinates: "a2", squareColor: "light"},  this.props)), 
          React.createElement(ChessboardCell, React.__spread({coordinates: "a3", squareColor: "dark"},  this.props)), 
          React.createElement(ChessboardCell, React.__spread({coordinates: "a4", squareColor: "light"},  this.props)), 
          React.createElement(ChessboardCell, React.__spread({coordinates: "a5", squareColor: "dark"},  this.props)), 
          React.createElement(ChessboardCell, React.__spread({coordinates: "a6", squareColor: "light"},  this.props)), 
          React.createElement(ChessboardCell, React.__spread({coordinates: "a7", squareColor: "dark"},  this.props)), 
          React.createElement(ChessboardCell, React.__spread({coordinates: "a8", squareColor: "light"},  this.props))
        )
        )
      )
    );
  }
}

Chessboard.propTypes = {
  selectedChesspiece: React.PropTypes.oneOf(['chesspiece-red', 'chesspiece-blue'])
}

class SelectChesspiece extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bananas: null
    }
  }

  render() {
    return(
      React.createElement("div", {className: "select-chesspiece"}, 
        React.createElement("div", {className: "inline"}, " Select piece to place:"), 
        React.createElement("div", {className: `select-team${this._selectingCss('chesspiece-red')} inline chesspiece-red`, onClick: this.props.onSelectChesspiece.bind(this, 'chesspiece-red')}, "w"), 
        React.createElement("div", {className: `select-team${this._selectingCss('chesspiece-blue')} inline chesspiece-blue`, onClick: this.props.onSelectChesspiece.bind(this, 'chesspiece-blue')}, "w")
      )
    );
  }
  _selectingCss(team) {
    return(this.props.selectedChesspiece==team ? '-selecting' : '');
  }
}

SelectChesspiece.propTypes = {
  onSelectChesspiece: React.PropTypes.func.isRequired,
  selectedChesspiece: React.PropTypes.oneOf(['chesspiece-red', 'chesspiece-blue'])
}

class AttackStatus extends React.Component {
  render() {
    return(
      React.createElement("div", {className: "attack-status"}, 
        React.createElement("div", {className: "inline"}, "Attack Status:"), 
         this._statusLabel() 
      )
    );
  }

  _statusLabel() {
    if(this.props.attacking) {
      return(React.createElement("div", {className: "inline label label-danger"}, "Queens Can Attack!"));
    } else {
      return(React.createElement("div", {className: "inline label label-default"}, "Queens Are Safe"));
    }
  }
}

class QueensAttackApplication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attacking: false,
      chesspieceRedCoordinates: null,
      chesspieceBlueCoordinates: null,
      selectedChesspiece: null
    };
  }

  render() {
    return(
      React.createElement("div", null, 
        React.createElement(SelectChesspiece, React.__spread({onSelectChesspiece: this._handleSelectChesspiece.bind(this)},  this.state)), 
        React.createElement(Chessboard, React.__spread({onSetChesspieceCoordinates: this._handleSetChesspieceCoordinates.bind(this)},  this.props,  this.state)), 
        React.createElement(AttackStatus, React.__spread({},  this.state))
      )
    )
  }

  _handleSelectChesspiece(team) {
    if(team=='chesspiece-red') {
      this.setState({chesspieceRedCoordinates: null});
    } else if(team=='chesspiece-blue') {
      this.setState({chesspieceBlueCoordinates: null});
    }
    this.setState({selectedChesspiece: team});
  }

  _handleSetChesspieceCoordinates(coordinates) {
    var selectedChesspiece = this.state.selectedChesspiece;
    this.setState({selectedChesspiece: null});

    // TODO refactor - problem is that this.state doesn't get updated until the method finishes
    if(selectedChesspiece=='chesspiece-red') {
      this.setState({chesspieceRedCoordinates: coordinates});
      this.setState({
        attacking: new AttackCalculator(
          coordinates, this.state.chesspieceBlueCoordinates
        ).attacking()
      });
    } else if (selectedChesspiece=='chesspiece-blue') {
      this.setState({chesspieceBlueCoordinates: coordinates});
      this.setState({
        attacking: new AttackCalculator(
          this.state.chesspieceRedCoordinates, coordinates
        ).attacking()
      });
    }
  }
}