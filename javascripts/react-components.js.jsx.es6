'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var AttackCalculator = (function () {
  function AttackCalculator(chesspieceRedCoordinates, chesspieceBlueCoordinates) {
    _classCallCheck(this, AttackCalculator);

    this.chesspieceRedCoordinates = chesspieceRedCoordinates;
    this.chesspieceBlueCoordinates = chesspieceBlueCoordinates;
  }

  // returns false if not under attack

  _createClass(AttackCalculator, [{
    key: 'attacking',
    value: function attacking() {
      return this._horizontal_overlap() || this._vertical_overlap() || this._diagonal_overlap();
    }
  }, {
    key: '_column',
    value: function _column(coordinates) {
      return coordinates && coordinates[1] || null;
    }
  }, {
    key: '_row',
    value: function _row(coordinates) {
      return coordinates && coordinates[0] || null;
    }
  }, {
    key: '_diagonal_overlap',
    value: function _diagonal_overlap() {
      var _this = this;

      // TODO This method of checking diagonals by listing all of them is inefficient. I would rather
      // TODO dynamically calculate them. Will consider implementation of dynamic calculation at a later time.
      // TODO One danger of using this method is that if the diagonal tables have a mistake there could be
      // TODO a combination of pieces that are attacking that will not report!
      var diagonals = [['g1', 'h2'], ['f1', 'g2', 'h3'], ['e1', 'f2', 'g3', 'h4'], ['d1', 'e2', 'f3', 'g4', 'h5'], ['c1', 'd2', 'e3', 'f4', 'g5', 'h6'], ['b1', 'c2', 'd3', 'e4', 'f5', 'g6', 'h7'], ['a1', 'b2', 'c3', 'd4', 'e5', 'f6', 'g7', 'h8'], ['a2', 'b3', 'c4', 'd5', 'e6', 'f7', 'g8'], ['a3', 'b4', 'c5', 'd6', 'e7', 'f8'], ['a4', 'b5', 'c6', 'd7', 'e8'], ['a5', 'b6', 'c7', 'd8'], ['a6', 'b7', 'c8'], ['a7', 'b8'], ['h7', 'g8'], ['h6', 'g7', 'f8'], ['h5', 'g6', 'f7', 'e8'], ['h4', 'g5', 'f6', 'e7', 'd8'], ['h3', 'g4', 'f5', 'e6', 'd7', 'c8'], ['h2', 'g3', 'f4', 'e5', 'd6', 'c7', 'b8'], ['h1', 'g2', 'f3', 'e4', 'd5', 'c6', 'b7', 'a8'], ['g1', 'f2', 'e3', 'd4', 'c5', 'b6', 'a7'], ['f1', 'e2', 'd3', 'c4', 'b5', 'a6'], ['e1', 'd2', 'c3', 'b2', 'a5'], ['d1', 'c2', 'b3', 'a4'], ['c1', 'b2', 'a3'], ['b1', 'a2']];

      var overlapping_diagonals = diagonals.filter(function (d) {
        return d.indexOf(_this.chesspieceRedCoordinates) > -1 && d.indexOf(_this.chesspieceBlueCoordinates) > -1;
      });
      return overlapping_diagonals.length > 0 && overlapping_diagonals[0] || false;
    }
  }, {
    key: '_horizontal_overlap',
    value: function _horizontal_overlap() {
      return this._row(this.chesspieceRedCoordinates) == this._row(this.chesspieceBlueCoordinates);
    }
  }, {
    key: '_vertical_overlap',
    value: function _vertical_overlap() {
      return this._column(this.chesspieceRedCoordinates) == this._column(this.chesspieceBlueCoordinates);
    }
  }]);

  return AttackCalculator;
})();

var ChessboardCell = (function (_React$Component) {
  _inherits(ChessboardCell, _React$Component);

  function ChessboardCell(props) {
    _classCallCheck(this, ChessboardCell);

    _get(Object.getPrototypeOf(ChessboardCell.prototype), 'constructor', this).call(this, props);
    this.state = {
      content: null
    };
  }

  _createClass(ChessboardCell, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {
      this._clearTemporaryContentState();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement(
        'td',
        {
          className: this.props.squareColor + ' ' + this._cellTeamClasses(),
          onClick: function () {
            return _this2._handleClick();
          },
          onMouseEnter: function () {
            return _this2._handleMouseEnter();
          },
          onMouseLeave: function () {
            return _this2._handleMouseLeave();
          }
        },
        this._propContent() ? this._propContent() : this.state.content
      );
    }
  }, {
    key: '_cellTeamClasses',
    value: function _cellTeamClasses() {
      return this._propTeamColor() || (this.props.selectedChesspiece ? this.props.selectedChesspiece + ' ' + 'cursor-pointer' : '') || '';
    }
  }, {
    key: '_clearTemporaryContentState',
    value: function _clearTemporaryContentState() {
      this.setState({ content: null });
    }
  }, {
    key: '_handleClick',
    value: function _handleClick() {
      if (this.props.selectedChesspiece) this.props.onSetChesspieceCoordinates(this.props.coordinates);
    }
  }, {
    key: '_handleMouseEnter',
    value: function _handleMouseEnter() {
      if (this.props.selectedChesspiece) this.setState({ content: 'w' });
    }
  }, {
    key: '_handleMouseLeave',
    value: function _handleMouseLeave() {
      this.setState({ content: this._propContent() });
    }
  }, {
    key: '_propContent',
    value: function _propContent() {
      if ([this.props.chesspieceRedCoordinates, this.props.chesspieceBlueCoordinates].indexOf(this.props.coordinates) > -1) {
        return 'w';
      } else {
        return null;
      }
    }
  }, {
    key: '_propTeamColor',
    value: function _propTeamColor() {
      if (this.props.chesspieceRedCoordinates == this.props.coordinates) {
        return 'chesspiece-red';
      } else if (this.props.chesspieceBlueCoordinates == this.props.coordinates) {
        return 'chesspiece-blue';
      } else {
        return null;
      }
    }
  }]);

  return ChessboardCell;
})(React.Component);

ChessboardCell.propTypes = {
  coordinates: React.PropTypes.string.isRequired, // should be a1 through h8
  squareColor: React.PropTypes.oneOf(['light', 'dark']).isRequired,

  // Used to determine whether to flash a queen piece on mouseover for setting purposes - should be a state?
  selectedChesspiece: React.PropTypes.oneOf(['chesspiece-red', 'chesspiece-blue']),

  // For populated a fixed chesspiece as determined by the chessboard
  chesspieceRedCoordinates: React.PropTypes.string,
  chesspieceBlueCoordinates: React.PropTypes.string
};

var Chessboard = (function (_React$Component2) {
  _inherits(Chessboard, _React$Component2);

  function Chessboard(props) {
    _classCallCheck(this, Chessboard);

    _get(Object.getPrototypeOf(Chessboard.prototype), 'constructor', this).call(this, props);
    this._chessboardCells = [];
  }

  _createClass(Chessboard, [{
    key: 'render',
    value: function render() {

      // TODO Refactor to dynamically generate and populate cells. This would also allow us to not have to
      // TODO pass the cell numbers containing the pieces down to every ChessboardCell. Flux pattern would
      // TODO also improve the design by giving us a central store to reference.

      return React.createElement(
        'table',
        { className: 'chessboard center' },
        React.createElement(
          'tbody',
          null,
          React.createElement(
            'tr',
            null,
            React.createElement(ChessboardCell, _extends({ coordinates: 'h1', squareColor: 'light', ref: 'onecell' }, this.props)),
            React.createElement(ChessboardCell, _extends({ coordinates: 'h2', squareColor: 'dark' }, this.props)),
            React.createElement(ChessboardCell, _extends({ coordinates: 'h3', squareColor: 'light' }, this.props)),
            React.createElement(ChessboardCell, _extends({ coordinates: 'h4', squareColor: 'dark' }, this.props)),
            React.createElement(ChessboardCell, _extends({ coordinates: 'h5', squareColor: 'light' }, this.props)),
            React.createElement(ChessboardCell, _extends({ coordinates: 'h6', squareColor: 'dark' }, this.props)),
            React.createElement(ChessboardCell, _extends({ coordinates: 'h7', squareColor: 'light' }, this.props)),
            React.createElement(ChessboardCell, _extends({ coordinates: 'h8', squareColor: 'dark' }, this.props))
          ),
          React.createElement(
            'tr',
            null,
            React.createElement(ChessboardCell, _extends({ coordinates: 'g1', squareColor: 'dark' }, this.props)),
            React.createElement(ChessboardCell, _extends({ coordinates: 'g2', squareColor: 'light' }, this.props)),
            React.createElement(ChessboardCell, _extends({ coordinates: 'g3', squareColor: 'dark' }, this.props)),
            React.createElement(ChessboardCell, _extends({ coordinates: 'g4', squareColor: 'light' }, this.props)),
            React.createElement(ChessboardCell, _extends({ coordinates: 'g5', squareColor: 'dark' }, this.props)),
            React.createElement(ChessboardCell, _extends({ coordinates: 'g6', squareColor: 'light' }, this.props)),
            React.createElement(ChessboardCell, _extends({ coordinates: 'g7', squareColor: 'dark' }, this.props)),
            React.createElement(ChessboardCell, _extends({ coordinates: 'g8', squareColor: 'light' }, this.props))
          ),
          React.createElement(
            'tr',
            null,
            React.createElement(ChessboardCell, _extends({ coordinates: 'f1', squareColor: 'light' }, this.props)),
            React.createElement(ChessboardCell, _extends({ coordinates: 'f2', squareColor: 'dark' }, this.props)),
            React.createElement(ChessboardCell, _extends({ coordinates: 'f3', squareColor: 'light' }, this.props)),
            React.createElement(ChessboardCell, _extends({ coordinates: 'f4', squareColor: 'dark' }, this.props)),
            React.createElement(ChessboardCell, _extends({ coordinates: 'f5', squareColor: 'light' }, this.props)),
            React.createElement(ChessboardCell, _extends({ coordinates: 'f6', squareColor: 'dark' }, this.props)),
            React.createElement(ChessboardCell, _extends({ coordinates: 'f7', squareColor: 'light' }, this.props)),
            React.createElement(ChessboardCell, _extends({ coordinates: 'f8', squareColor: 'dark' }, this.props))
          ),
          React.createElement(
            'tr',
            null,
            React.createElement(ChessboardCell, _extends({ coordinates: 'e1', squareColor: 'dark' }, this.props)),
            React.createElement(ChessboardCell, _extends({ coordinates: 'e2', squareColor: 'light' }, this.props)),
            React.createElement(ChessboardCell, _extends({ coordinates: 'e3', squareColor: 'dark' }, this.props)),
            React.createElement(ChessboardCell, _extends({ coordinates: 'e4', squareColor: 'light' }, this.props)),
            React.createElement(ChessboardCell, _extends({ coordinates: 'e5', squareColor: 'dark' }, this.props)),
            React.createElement(ChessboardCell, _extends({ coordinates: 'e6', squareColor: 'light' }, this.props)),
            React.createElement(ChessboardCell, _extends({ coordinates: 'e7', squareColor: 'dark' }, this.props)),
            React.createElement(ChessboardCell, _extends({ coordinates: 'e8', squareColor: 'light' }, this.props))
          ),
          React.createElement(
            'tr',
            null,
            React.createElement(ChessboardCell, _extends({ coordinates: 'd1', squareColor: 'light' }, this.props)),
            React.createElement(ChessboardCell, _extends({ coordinates: 'd2', squareColor: 'dark' }, this.props)),
            React.createElement(ChessboardCell, _extends({ coordinates: 'd3', squareColor: 'light' }, this.props)),
            React.createElement(ChessboardCell, _extends({ coordinates: 'd4', squareColor: 'dark' }, this.props)),
            React.createElement(ChessboardCell, _extends({ coordinates: 'd5', squareColor: 'light' }, this.props)),
            React.createElement(ChessboardCell, _extends({ coordinates: 'd6', squareColor: 'dark' }, this.props)),
            React.createElement(ChessboardCell, _extends({ coordinates: 'd7', squareColor: 'light' }, this.props)),
            React.createElement(ChessboardCell, _extends({ coordinates: 'd8', squareColor: 'dark' }, this.props))
          ),
          React.createElement(
            'tr',
            null,
            React.createElement(ChessboardCell, _extends({ coordinates: 'c1', squareColor: 'dark' }, this.props)),
            React.createElement(ChessboardCell, _extends({ coordinates: 'c2', squareColor: 'light' }, this.props)),
            React.createElement(ChessboardCell, _extends({ coordinates: 'c3', squareColor: 'dark' }, this.props)),
            React.createElement(ChessboardCell, _extends({ coordinates: 'c4', squareColor: 'light' }, this.props)),
            React.createElement(ChessboardCell, _extends({ coordinates: 'c5', squareColor: 'dark' }, this.props)),
            React.createElement(ChessboardCell, _extends({ coordinates: 'c6', squareColor: 'light' }, this.props)),
            React.createElement(ChessboardCell, _extends({ coordinates: 'c7', squareColor: 'dark' }, this.props)),
            React.createElement(ChessboardCell, _extends({ coordinates: 'c8', squareColor: 'light' }, this.props))
          ),
          React.createElement(
            'tr',
            null,
            React.createElement(ChessboardCell, _extends({ coordinates: 'b1', squareColor: 'light' }, this.props)),
            React.createElement(ChessboardCell, _extends({ coordinates: 'b2', squareColor: 'dark' }, this.props)),
            React.createElement(ChessboardCell, _extends({ coordinates: 'b3', squareColor: 'light' }, this.props)),
            React.createElement(ChessboardCell, _extends({ coordinates: 'b4', squareColor: 'dark' }, this.props)),
            React.createElement(ChessboardCell, _extends({ coordinates: 'b5', squareColor: 'light' }, this.props)),
            React.createElement(ChessboardCell, _extends({ coordinates: 'b6', squareColor: 'dark' }, this.props)),
            React.createElement(ChessboardCell, _extends({ coordinates: 'b7', squareColor: 'light' }, this.props)),
            React.createElement(ChessboardCell, _extends({ coordinates: 'b8', squareColor: 'dark' }, this.props))
          ),
          React.createElement(
            'tr',
            null,
            React.createElement(ChessboardCell, _extends({ coordinates: 'a1', squareColor: 'dark' }, this.props)),
            React.createElement(ChessboardCell, _extends({ coordinates: 'a2', squareColor: 'light' }, this.props)),
            React.createElement(ChessboardCell, _extends({ coordinates: 'a3', squareColor: 'dark' }, this.props)),
            React.createElement(ChessboardCell, _extends({ coordinates: 'a4', squareColor: 'light' }, this.props)),
            React.createElement(ChessboardCell, _extends({ coordinates: 'a5', squareColor: 'dark' }, this.props)),
            React.createElement(ChessboardCell, _extends({ coordinates: 'a6', squareColor: 'light' }, this.props)),
            React.createElement(ChessboardCell, _extends({ coordinates: 'a7', squareColor: 'dark' }, this.props)),
            React.createElement(ChessboardCell, _extends({ coordinates: 'a8', squareColor: 'light' }, this.props))
          )
        )
      );
    }
  }]);

  return Chessboard;
})(React.Component);

Chessboard.propTypes = {
  selectedChesspiece: React.PropTypes.oneOf(['chesspiece-red', 'chesspiece-blue'])
};

var SelectChesspiece = (function (_React$Component3) {
  _inherits(SelectChesspiece, _React$Component3);

  function SelectChesspiece(props) {
    _classCallCheck(this, SelectChesspiece);

    _get(Object.getPrototypeOf(SelectChesspiece.prototype), 'constructor', this).call(this, props);
    this.state = {
      bananas: null
    };
  }

  _createClass(SelectChesspiece, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'select-chesspiece' },
        React.createElement(
          'div',
          { className: 'inline' },
          ' Select piece to place:'
        ),
        React.createElement(
          'div',
          { className: 'select-team' + this._selectingCss('chesspiece-red') + ' inline chesspiece-red', onClick: this.props.onSelectChesspiece.bind(this, 'chesspiece-red') },
          'w'
        ),
        React.createElement(
          'div',
          { className: 'select-team' + this._selectingCss('chesspiece-blue') + ' inline chesspiece-blue', onClick: this.props.onSelectChesspiece.bind(this, 'chesspiece-blue') },
          'w'
        )
      );
    }
  }, {
    key: '_selectingCss',
    value: function _selectingCss(team) {
      return this.props.selectedChesspiece == team ? '-selecting' : '';
    }
  }]);

  return SelectChesspiece;
})(React.Component);

SelectChesspiece.propTypes = {
  onSelectChesspiece: React.PropTypes.func.isRequired,
  selectedChesspiece: React.PropTypes.oneOf(['chesspiece-red', 'chesspiece-blue'])
};

var AttackStatus = (function (_React$Component4) {
  _inherits(AttackStatus, _React$Component4);

  function AttackStatus() {
    _classCallCheck(this, AttackStatus);

    _get(Object.getPrototypeOf(AttackStatus.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(AttackStatus, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'attack-status' },
        React.createElement(
          'div',
          { className: 'inline' },
          'Attack Status:'
        ),
        this._statusLabel()
      );
    }
  }, {
    key: '_statusLabel',
    value: function _statusLabel() {
      if (this.props.attacking) {
        return React.createElement(
          'div',
          { className: 'inline label label-danger' },
          'Queens Can Attack!'
        );
      } else {
        return React.createElement(
          'div',
          { className: 'inline label label-default' },
          'Queens Are Safe'
        );
      }
    }
  }]);

  return AttackStatus;
})(React.Component);

var QueensAttackApplication = (function (_React$Component5) {
  _inherits(QueensAttackApplication, _React$Component5);

  function QueensAttackApplication(props) {
    _classCallCheck(this, QueensAttackApplication);

    _get(Object.getPrototypeOf(QueensAttackApplication.prototype), 'constructor', this).call(this, props);
    this.state = {
      attacking: false,
      chesspieceRedCoordinates: null,
      chesspieceBlueCoordinates: null,
      selectedChesspiece: null
    };
  }

  _createClass(QueensAttackApplication, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(SelectChesspiece, _extends({ onSelectChesspiece: this._handleSelectChesspiece.bind(this) }, this.state)),
        React.createElement(Chessboard, _extends({ onSetChesspieceCoordinates: this._handleSetChesspieceCoordinates.bind(this) }, this.props, this.state)),
        React.createElement(AttackStatus, this.state)
      );
    }
  }, {
    key: '_handleSelectChesspiece',
    value: function _handleSelectChesspiece(team) {
      if (team == 'chesspiece-red') {
        this.setState({ chesspieceRedCoordinates: null });
      } else if (team == 'chesspiece-blue') {
        this.setState({ chesspieceBlueCoordinates: null });
      }
      this.setState({ selectedChesspiece: team });
    }
  }, {
    key: '_handleSetChesspieceCoordinates',
    value: function _handleSetChesspieceCoordinates(coordinates) {
      var selectedChesspiece = this.state.selectedChesspiece;
      this.setState({ selectedChesspiece: null });

      // TODO refactor - problem is that this.state doesn't get updated until the method finishes
      if (selectedChesspiece == 'chesspiece-red') {
        this.setState({ chesspieceRedCoordinates: coordinates });
        this.setState({
          attacking: new AttackCalculator(coordinates, this.state.chesspieceBlueCoordinates).attacking()
        });
      } else if (selectedChesspiece == 'chesspiece-blue') {
        this.setState({ chesspieceBlueCoordinates: coordinates });
        this.setState({
          attacking: new AttackCalculator(this.state.chesspieceRedCoordinates, coordinates).attacking()
        });
      }
    }
  }]);

  return QueensAttackApplication;
})(React.Component);
