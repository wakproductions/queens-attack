ChessboardCell = class ChessboardCell extends React.Component {
  render() {
    return(
      <td className={this.props.squareColor + ' ' + this.props.team}>{this.props.content}</td>
    );
  }
}

ChessboardCell.propTypes = {
  content: React.PropTypes.oneOf(['w']),  // w
  coordinates: React.PropTypes.string.required,  // should be a1 through h8
  squareColor: React.PropTypes.oneOf(['light', 'dark']).isRequired,
  team: React.PropTypes.oneOf(['chesspiece-red', 'chesspiece-blue']),

  // Used to determine whether to flash a queen piece on mouseover for setting purposes - should be a state?
  mouseoverContent: React.PropTypes.string, // content to display on a mouseover, if no property
  settingPiece: React.PropTypes.oneOf(['chesspiece-red', 'chesspiece-blue'])
}

class Chessboard extends React.Component {
  render() {
    return(
      <table className="chessboard center">
        <tbody>
        <tr>
          <ChessboardCell coordinates="h1" squareColor="light" />
          <ChessboardCell coordinates="h2" squareColor="dark" />
          <ChessboardCell coordinates="h3" squareColor="light" content="w" team="chesspiece-red" />
          <ChessboardCell coordinates="h4" squareColor="dark" />
          <ChessboardCell coordinates="h5" squareColor="light" />
          <ChessboardCell coordinates="h6" squareColor="dark" />
          <ChessboardCell coordinates="h7" squareColor="light" />
          <ChessboardCell coordinates="h8" squareColor="dark" />
        </tr>
        <tr>
          <ChessboardCell coordinates="g1" squareColor="dark" />
          <ChessboardCell coordinates="g2" squareColor="light" />
          <ChessboardCell coordinates="g3" squareColor="dark" />
          <ChessboardCell coordinates="g4" squareColor="light" />
          <ChessboardCell coordinates="g5" squareColor="dark" />
          <ChessboardCell coordinates="g6" squareColor="light" />
          <ChessboardCell coordinates="g7" squareColor="dark" />
          <ChessboardCell coordinates="g8" squareColor="light" />
        </tr>
        <tr>
          <ChessboardCell coordinates="f1" squareColor="light" />
          <ChessboardCell coordinates="f2" squareColor="dark" />
          <ChessboardCell coordinates="f3" squareColor="light" />
          <ChessboardCell coordinates="f4" squareColor="dark" />
          <ChessboardCell coordinates="f5" squareColor="light" />
          <ChessboardCell coordinates="f6" squareColor="dark" />
          <ChessboardCell coordinates="f7" squareColor="light" />
          <ChessboardCell coordinates="f8" squareColor="dark" />
        </tr>
        <tr>
          <ChessboardCell coordinates="e1" squareColor="dark" />
          <ChessboardCell coordinates="e2" squareColor="light" />
          <ChessboardCell coordinates="e3" squareColor="dark" />
          <ChessboardCell coordinates="e4" squareColor="light" />
          <ChessboardCell coordinates="e5" squareColor="dark" />
          <ChessboardCell coordinates="e6" squareColor="light" />
          <ChessboardCell coordinates="e7" squareColor="dark" />
          <ChessboardCell coordinates="e8" squareColor="light" />
        </tr>
        <tr>
          <ChessboardCell coordinates="d1" squareColor="light" />
          <ChessboardCell coordinates="d2" squareColor="dark" />
          <ChessboardCell coordinates="d3" squareColor="light" />
          <ChessboardCell coordinates="d4" squareColor="dark" />
          <ChessboardCell coordinates="d5" squareColor="light" />
          <ChessboardCell coordinates="d6" squareColor="dark" />
          <ChessboardCell coordinates="d7" squareColor="light" />
          <ChessboardCell coordinates="d8" squareColor="dark" />
        </tr>
        <tr>
          <ChessboardCell coordinates="c1" squareColor="dark" />
          <ChessboardCell coordinates="c2" squareColor="light" />
          <ChessboardCell coordinates="c3" squareColor="dark" />
          <ChessboardCell coordinates="c4" squareColor="light" />
          <ChessboardCell coordinates="c5" squareColor="dark" />
          <ChessboardCell coordinates="c6" squareColor="light" />
          <ChessboardCell coordinates="c7" squareColor="dark" />
          <ChessboardCell coordinates="c8" squareColor="light" />
        </tr>
        <tr>
          <ChessboardCell coordinates="b1" squareColor="light" />
          <ChessboardCell coordinates="b2" squareColor="dark" />
          <ChessboardCell coordinates="b3" squareColor="light" />
          <ChessboardCell coordinates="b4" squareColor="dark" />
          <ChessboardCell coordinates="b5" squareColor="light" />
          <ChessboardCell coordinates="b6" squareColor="dark" />
          <ChessboardCell coordinates="b7" squareColor="light" />
          <ChessboardCell coordinates="b8" squareColor="dark" />
        </tr>
        <tr>
          <ChessboardCell coordinates="a1" squareColor="dark" />
          <ChessboardCell coordinates="a2" squareColor="light" />
          <ChessboardCell coordinates="a3" squareColor="dark" />
          <ChessboardCell coordinates="a4" squareColor="light" />
          <ChessboardCell coordinates="a5" squareColor="dark" />
          <ChessboardCell coordinates="a6" squareColor="light" />
          <ChessboardCell coordinates="a7" squareColor="dark" />
          <ChessboardCell coordinates="a8" squareColor="light" />
        </tr>
        </tbody>
      </table>
    );
  }
}

class SelectChesspiece extends React.Component {
  render() {
    return(
      <div className="select-chesspiece">
        <div className="inline"> Select piece to place:</div>
        <div className="select-team chesspiece-red inline">w</div>
        <div className="select-team chesspiece-blue inline">w</div>
      </div>
    );
  }
}

class AttackStatus extends React.Component {
  render() {
    return(
      <div className="attack-status">
        <div className="inline">Attack Status:</div>
        <div className="inline label label-danger">Queens Can Attack!</div>
      </div>
    );
  }
}

class QueensAttackApplication extends React.Component {
  render() {
    return(
      <div>
        <SelectChesspiece />
        <Chessboard />
        <AttackStatus />
      </div>
    );
  }
}



//class ErrorBox extends React.Component {
//  render() {
//    if(this.props.errorMessages.length > 0) {
//      return(
//        <div className="alert alert-danger" role="alert" ref="errorNotifications">
//          <ul>
//            {this.props.errorMessages.map((message) => {
//              return(<li>{message}</li>)
//            })}
//          </ul>
//        </div>
//      );
//    } else {
//      return(false);
//    }
//  }
//}
//ErrorBox.propTypes = {
//  errorMessages: React.PropTypes.array
//}
//ErrorBox.defaultProps = {
//  errorMessages: []
//}
//
//class SuccessBox extends React.Component {
//  render() {
//    if(this.props.showSuccessMessage) {
//      return(
//        <h2 className="alert alert-success">Thank you for your letter. We'll mail this to CBS/Paramount on your behalf!</h2>
//      );
//    } else {
//      return(false);
//    }
//  }
//}
//SuccessBox.propTypes = {
//  errorMessages: React.PropTypes.string
//}
//SuccessBox.defaultProps = {
//  displaySuccessMessage: false
//}
//
//
//class WriteLetterForm extends React.Component {
//  constructor(props) {
//    super(props);
//    this.state = { errorMessages: [], showSuccessMessage: false };
//
//    this._create_letter_path = '/letters.json';
//  }
//
//  _handleSubmit(event) {
//    event.preventDefault();
//    let email          = this._email.value;
//    let return_address = this._return_address.value;
//    let body           = this._body.value;
//    let closing        = this._closing.value;
//    let name           = this._authorName.value;
//    let letter = {
//      letter: {
//        email: email,
//        return_address: return_address,
//        body: body,
//        closing: closing,
//        name: name
//      }
//    }
//
//    var context = this;
//    $.post(
//      this._create_letter_path,
//      letter,
//      (data) => {
//        context.setState({errorMessages: [], showSuccessMessage: true});
//      }
//    ).fail((data) => {
//        context.setState({errorMessages: data.responseJSON.errors});
//      });
//  }
//
//  render() {
//    if(this.state.showSuccessMessage) {
//      return(<SuccessBox showSuccessMessage={true} />);
//    } else {
//      return (
//        <form className="write-letter-form" onSubmit={this._handleSubmit.bind(this)}>
//          <div>
//            <ErrorBox errorMessages={this.state.errorMessages} />
//            <div>
//              <input
//                className="form-element email"
//                placeholder="Your Email Address (so you can receive updates)"
//                ref={(r) => this._email = r}
//                />
//            </div>
//            <div>
//            <textarea
//              className="form-element return-address"
//              placeholder="Enter Your Return Mailing Address Here. This is how CBS/Paramount will likely respond to your letter."
//              ref={(r) => this._return_address = r}
//              >
//            </textarea>
//            </div>
//            <div className="letter-text">Dear Mr. Van Citters:</div>
//            <div>
//            <textarea
//              className="form-element body"
//              placeholder="Type the body of your letter here. What do you think of the new fan film guidelines?"
//              ref={(r) => this._body = r}
//              >
//            </textarea>
//            </div>
//            <div>
//              <input
//                className="form-element closing"
//                placeholder="Sincerely"
//                ref={(r) => this._closing = r}
//                />,
//            </div>
//            <div>
//              <input
//                className="form-element name"
//                placeholder="Your Name"
//                ref={(r) => this._authorName = r}
//                />
//            </div>
//            <div>
//              <input
//                className="btn btn-primary"
//                type="submit"
//                />
//            </div>
//          </div>
//        </form>
//      )
//    }
//  }
//}