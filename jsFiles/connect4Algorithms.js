var redP = {
	player: 'red',
	winner: false,
	valid: null,
	currentPosition: null,
	token: 1
};

var yellowP = {
	player: 'yellow',
	winner: false,
	valid: null,
	currentPosition: null,
	token: 0
};

var currentPlayer = redP;

//instantiation of the playing board "7x7"
var daGrid = [];
for (var row = 0; row < 7; row++) {
	var wholeRow = []
	for (var col = 0; col <7; col++) {
		wholeRow.push('X');
	}
	daGrid.push(wholeRow);
}

var switchPlayer = function() {
	//current version always puts red player ie "1" as the first move
	//switches the current player after a move
	if (currentPlayer === redP) {
		currentPlayer = yellowP;
	} else if (currentPlayer === yellowP){
		currentPlayer = redP;
	}
}



var plotApoint = function(daGrid, col, player) {
	//plots a token, and changes the player object, logs current token position
	var validMove = false;
	var token = 1;
	if (player === yellowP) {
		token = 0;
	}
	var int = 0;
	while (int <= daGrid.length-1) {
		if (daGrid[int][col] === 1 || daGrid[int][col] === 0) {
			daGrid[int-=1][col] = token;
			validMove = !validMove;
			break;
		} else if (int === 6 && (daGrid[int][col] === 'X')) {
			daGrid[int][col] = token;
			validMove = !validMove;
			break;
		}
		int++;
	}
	player.valid = validMove;
	//currentPosition is zero indexed
	player.currentPosition = [int,col];
	if (!winCheck(currentPlayer)) {
		//switch current player
		switchPlayer();
		return false;
	} else {
		return true; 
	};
}

var validColEntry = function(num) {
	//decides if an entry is valid and places the token on daGrid
	num -= 1;
	if ((num < 7 && num >= 0) && fullColumnCheck(num)) {
		return plotApoint(daGrid, num, currentPlayer);
	} else {
		//my version of an error catch
		console.log('try another move buckaroo');
		return false;
	}
};

var fullColumnCheck = function(num) {
	//checks if column is full of tokens or not
	if (daGrid[0][num] === 1 || daGrid[0][num] === 0) {
		return false;
	}
	return true;
};

var winCheck = function(player) {
	var dirKeeper = ['NE','E','SE','S','SW','W','NW'];
	for (var i = 0; i < dirKeeper.length; i++) {
		var direction = dirKeeper[i];
		var	win = winLoop(player, direction); //goes through all 7 directions and return the maximum number matched
		if (win) {
			return true;
		}
	}
	return false;
};

var winLoop = function(player, direction) {
	var maxMatch = 1;
	var pThatPlaceToken = player.token;
	var row = player.currentPosition[0];
	var column = player.currentPosition[1];
	if (direction === 'NE') {
		// console.log(direction);
		for (var i = 0; i < 4; i++) {
			row--;
			column++;
			if ((row >= 0 && column < 7) && daGrid[row][column] === pThatPlaceToken) {
				maxMatch++;
			} else {
				return false;
			}
		}
	}
	if (direction === 'E') {
		// console.log(direction);
		for (var i = 0; i < 4; i++) {
			column++;
			if (column < 7 && daGrid[row][column] === pThatPlaceToken) {
				maxMatch++;
			} else {
				return false;
			}
		}
	}
	if (direction === 'SE') {
		// console.log(direction);
		for (var i = 0; i < 4; i++) {
			row++;
			column++;
			if ((row < 7 && column < 7)&& daGrid[row][column] === pThatPlaceToken) {
				maxMatch++;
			} else {
				return false;
			}
		}
	}
	if (direction === 'S') {
		// console.log(direction);
		for (var i = 0; i < 3; i++) {
			row++;
			// console.log(row, column)
			if (row < 7 && daGrid[row][column] === pThatPlaceToken) {
				// console.log(maxMatch, '<= amount of matches')
				maxMatch++;
			} else {
				return false;
			}
		}
	}
	if (direction === 'SW') {
		// console.log(direction);
		for (var i = 0; i < 3; i++) {
			row++;
			column--;
			if ((row < 7 && column >= 0) && daGrid[row][column] === pThatPlaceToken) {
				maxMatch++;
			} else {
				return false;
			}
		}
	}
	if (direction === 'W') {
		// console.log(direction);
		for (var i = 0; i < 3; i++) {
			column--;
			if (column >= 0 && daGrid[row][column] === pThatPlaceToken) {
				maxMatch++;
			} else {
				return false;
			}
		}
	}
	if (direction === 'NW') {
		// console.log(direction);
		for (var i = 0; i < 3; i++) {
			row--;
			column--;
			if ((row >= 0 && column >= 0) && daGrid[row][column] === pThatPlaceToken) {
				maxMatch++;
			} else {
				return false;
			}
		}
	}
	if (maxMatch === 4) {
		return true;
	}
};

 

