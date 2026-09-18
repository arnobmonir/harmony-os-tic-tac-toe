const winningLines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

export default {
    data: {
        board: ['', '', '', '', '', '', '', '', ''],
        currentPlayer: 'X',
        winner: '',
        winningLineClass: '',
        gameOver: false,
        showReset: false
    },
    onInit() {
        this.restartTimer = null;
    },
    makeMove(index) {
        if (this.gameOver || this.board[index]) {
            return;
        }
        const nextBoard = this.board.slice();
        nextBoard[index] = this.currentPlayer;
        this.board = nextBoard;
        const line = this.getWinningLine();
        if (line) {
            this.winner = this.currentPlayer;
            this.winningLineClass = this.getLineClass(line);
            this.gameOver = true;
            this.scheduleReset();
            return;
        }
        if (this.board.every((cell) => cell)) {
            this.winner = 'Draw';
            this.gameOver = true;
            this.scheduleReset();
            return;
        }
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    },
    getWinningLine() {
        for (let index = 0; index < winningLines.length; index += 1) {
            const line = winningLines[index];
            if (this.board[line[0]] &&
                this.board[line[0]] === this.board[line[1]] &&
                this.board[line[1]] === this.board[line[2]]) {
                return line;
            }
        }
        return null;
    },
    getLineClass(line) {
        const classes = {
            '0,1,2': 'win-line-row-one', '3,4,5': 'win-line-row-two',
            '6,7,8': 'win-line-row-three', '0,3,6': 'win-line-column-one',
            '1,4,7': 'win-line-column-two', '2,5,8': 'win-line-column-three',
            '0,4,8': 'win-line-diagonal-down', '2,4,6': 'win-line-diagonal-up'
        };
        return classes[line.join(',')];
    },
    scheduleReset() {
        this.restartTimer = setTimeout(() => {
            if (this.gameOver) {
                this.showReset = true;
            }
        }, 3000);
    },
    resetGame() {
        if (this.restartTimer) {
            clearTimeout(this.restartTimer);
        }
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = 'X';
        this.winner = '';
        this.winningLineClass = '';
        this.gameOver = false;
        this.showReset = false;
    }
};
