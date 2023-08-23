pragma solidity ^0.8.10;

contract Gomoku {
  uint256 constant BOARD_SIZE = 15;
  uint256 constant EMPTY = 0;
  uint256 constant BLACK = 1;
  uint256 constant WHITE = 2;
  uint256 constant BLOCK_LIMIT = 10;

  struct Player {
    address addr;
    uint16 wins;
    uint16 losses;
  }

  enum GameState {
    Waiting,
    Started,
    Ended
  }

  enum Position {
    EMPTY,
    BLACK,
    WHITE
  }

  struct Room {
    uint256 roomId;
    uint256 lastMoveBlock;
    address blackPlayer;
    address whitePlayer;
    Position currentPlayer;
    uint8 moveCount;
    Position[BOARD_SIZE][BOARD_SIZE] board;
    GameState gameState;
    address winner;
  }

  mapping(address => Player) public players;
  mapping(uint256 => Room) public rooms;
  uint256 public nextRoomId;

  event RoomCreated(uint256 roomId, address player, Position position);
  event GameStarted(uint256 roomId, address blackPlayer, address whitePlayer);
  event MoveMade(uint256 roomId, Position position, uint256 x, uint256 y);
  event GameEnded(uint256 roomId, address winner);

  event GameReset(uint256 roomId); //TODO

  event PlayerLeft(uint256 roomId, address player); //TODO

  modifier onlyPlayers(uint256 roomId) {
    require(
      msg.sender == rooms[roomId].blackPlayer ||
        msg.sender == rooms[roomId].whitePlayer,
      "Only players can make a move"
    );
    _;
  }

  modifier onlyCurrentPlayer(uint256 roomId) {
    require(
      (rooms[roomId].currentPlayer == Position.BLACK &&
        msg.sender == rooms[roomId].blackPlayer) ||
        (rooms[roomId].currentPlayer == Position.WHITE &&
          msg.sender == rooms[roomId].whitePlayer),
      "It's not your turn"
    );
    _;
  }

  modifier validMove(
    uint256 roomId,
    uint8 x,
    uint8 y
  ) {
    require(x < BOARD_SIZE && y < BOARD_SIZE, "Invalid move");
    require(
      rooms[roomId].board[x][y] == Position.EMPTY,
      "Cell is already occupied"
    );
    _;
  }

  modifier checkBlockLimit(uint256 roomId) {
    require(
      block.number - rooms[roomId].lastMoveBlock <= BLOCK_LIMIT,
      "Exceeded block limit"
    );
    _;
  }

  function createRoom(Position position) external {
    uint256 roomId = nextRoomId++;
    rooms[roomId].roomId = roomId;
    rooms[roomId].currentPlayer = position;
    if (position == Position.WHITE) {
      rooms[roomId].whitePlayer = msg.sender;
    } else {
      rooms[roomId].blackPlayer = msg.sender;
    }
    emit RoomCreated(roomId, msg.sender, position);
  }

  function joinRoom(uint256 roomId) external {
    require(rooms[roomId].gameState == GameState.Waiting, "Game room is full");
    Room storage room = rooms[roomId];
    if (room.currentPlayer == Position.BLACK) {
      rooms[roomId].whitePlayer = msg.sender;
    } else {
      rooms[roomId].blackPlayer = msg.sender;
    }
    rooms[roomId].gameState = GameState.Started;
    rooms[roomId].lastMoveBlock = block.number;

    emit GameStarted(
      roomId,
      rooms[roomId].blackPlayer,
      rooms[roomId].whitePlayer
    );
  }

  function makeMove(
    uint256 roomId,
    uint8 x,
    uint8 y
  )
    public
    onlyPlayers(roomId)
    onlyCurrentPlayer(roomId)
    validMove(roomId, x, y)
    checkBlockLimit(roomId)
  {
    Position currentPlayer = rooms[roomId].currentPlayer;
    rooms[roomId].board[x][y] = rooms[roomId].currentPlayer;
    rooms[roomId].lastMoveBlock = block.number;
    emit MoveMade(roomId, rooms[roomId].currentPlayer, x, y);
    rooms[roomId].moveCount++;
    if (rooms[roomId].moveCount == BOARD_SIZE * BOARD_SIZE) {
      rooms[roomId].gameState = GameState.Ended;
      emit GameEnded(roomId, address(0)); // Draw
      return;
    }

    rooms[roomId].currentPlayer = (rooms[roomId].currentPlayer ==
      Position.BLACK)
      ? Position.WHITE
      : Position.BLACK;
  }

  function checkWin(uint256 roomId, uint256[][] memory list) external {
    require(list.length == 5, "Invalid winner list");
    uint256 x = list[0][0];
    uint256 y = list[0][1];
    Position position = getCell(roomId, x, y);

    require(
      x >= 0 && x <= BOARD_SIZE && y >= 0 && y <= BOARD_SIZE,
      "Invalid cheese index"
    );

    for (uint256 i; i < 5; i++) {
      uint256 x1 = list[i + 1][0];
      uint256 y1 = list[i + 1][1];
      require(getCell(roomId, x1, y1) == position, "Invalid position");
      require(
        x1 >= 0 && x1 <= BOARD_SIZE && y1 >= 0 && y1 <= BOARD_SIZE,
        "Invalid cheese index"
      );
      bool ischain = !(abs(int(x - x1)) > 1 || abs(int(y - y1)) > 1);
      require(ischain, "not in a line");
      x = x1;
      y = y1;
    }
    rooms[roomId].gameState = GameState.Ended;

    address winner = (position == Position.BLACK)
      ? rooms[roomId].blackPlayer
      : rooms[roomId].whitePlayer;
    rooms[roomId].winner = winner;
    players[winner].wins++;
    players[
      (winner == rooms[roomId].blackPlayer)
        ? rooms[roomId].whitePlayer
        : rooms[roomId].blackPlayer
    ].losses++;
    emit GameEnded(roomId, winner);
  }

  function abs(int x) private pure returns (uint) {
    return x >= 0 ? uint256(x) : uint256(-x);
  }

  function getCell(
    uint256 roomId,
    uint256 x,
    uint256 y
  ) internal view returns (Position) {
    require(x <= BOARD_SIZE && y <= BOARD_SIZE, "Invalid cell");
    return rooms[roomId].board[x][y];
  }
}
