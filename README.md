# Queens-attack Code Challenge

Write a program that should present an HTML form that represents a standard 8x8 chess board.  Having 
selected two positions on the board, the program will report whether chess queens in those positions can
attack one another.

In the game of chess, a queen can attack pieces that are on the same
row, column, or diagonal.

## Instructions for Running Program

This website was generated with the help of the Ruby Middleman static site generator. This tool enabled me
to incorporate some of my preferred web design syntax, including HAML, SCSS, and Javascript ES6. The project
has been built and compiled into native HTML, CSS, and Javascript and is in the `/build` directory. All you need
to do is open `/build/index.html` in your web browser to run.

The files that I coded are all found in the `/source` directory. Of particular interest should be
`/index.html.haml` (the single-page application), `/javascripts/react-components.js.jsx` (the React.js
classes powering the app), and `/stylesheets/site.css.scss` (front end design work).

## Resources Used

Chess Maya Font - http://www.enpassant.dk/chess/fonteng.htm
TTF to OTF converter - https://everythingfonts.com/ttf-to-otf

## Refactoring Wish List

Due to time constraints, I shortcut a few aspects of the behind-the-scenes logic. My goal was to focus on the
user experience with the goal of getting a minimal viable product up and running. Refactoring to make the
code neater and more efficient could be introduced later. Here are things I would change 

### Computation of diagonals

To determine whether the queens can attack on a diagonal, I a reference list of all the diagonal
combinations on the board. There are 13 up-sloping diagonal vectors, and 13 down-sloping diagonal 
vectors. An attack possibility is confirmed if both queens coordinates fall within a diagonal. 
This method works, but its inefficient because you have to create a list of all the diagonals. On a larger
board, it would be more effective for the computer to calculate the diagonal vectors beginning with the
square that a particular piece is on, but I decided not to take that approach due to time constraints. YAGNI.

### Incorporate Flux pattern

This single page application is powered by React.js. React's design encourages a unidirectional flow of
data through its components. So the application's components are structured like this:
  
```
QueensAttackApplication 
 |-> Chessboard 
        |-> ChessboardCell
```
  
This poses a problem of maintaining the state of the chessboard at the application logic. When a user 
interacts with a square (cell) on the chessboard, information doesn't automatically transmit up the chain 
to the application's state. To get around this problem I use a 
[callback method](https://facebook.github.io/react/docs/tutorial.html#callbacks-as-props)
that is passed down to children components, but executes and maintains state at the top component level. This 
is how it tracks where the pieces are on the board.

A better way of solving this problem is to use the [Flux](https://facebook.github.io/flux/) design
architecture. Flux uses a dispatcher to handle events and circulate any state changes back through
the application in a unidirectional loop. The dispatcher interacts with an object called a store, which acts 
similar to a model in an MVC framework, except that the store and dispatcher act as singleton points of control
for all of the data in the application. If I implemented flux, the positions of the pieces on the chessboard
could be persisted in the store. I am still learning the Flux design pattern will have to implement at a 
later time.

### Chessboard grid

Rather than dynamically generating the chessboard grid, I found it more convenient to cut and paste
the command to generate each square. Quick and dirty, but worked for this instance.

### Abstraction of chessboard piece data

In the code I use two React props for recording the locations of the queen chessboard pieces, named 
`chesspieceRed` and `chesspieceBlue`. If we were to expand this application I'd structure the data differently,
such as an array of json-like data that could store the locations of multiple pieces. That would also
allow us to clean up some of the `if` statements in the code by handling such cases more systematically.

### Test Coverage

I'm still new to React and the approach I took on solving this was experimental to me, so test coverage is 
lacking at the moment. If I had time to write tests, I could use Mocha or Jasmine testing frameworks.