pragma solidity^0.5.0;

contract ERC777Token {
  function name() public view returns (string memory);

  function symbol() public view returns (string memory);

  function totalSupply() public view returns (uint256);

  function granularity() public view returns (uint256);

  function balanceOf(address owner) public view returns (uint256);

  //transfer is modified to send in ERC-777

  function send(address to, uint256 amount) public;

  function send(address to, uint256 amount, bytes memory userData) public;

  function authorizeOperator(address operator) public;

  function revokeOperator(address operator) public;

  function isOperatorFor(address operator, address tokenHolder) public;

  function operatorSend(address from, address to, uint256 amount, bytes memory userData, bytes memory operatorData) public;

  event Sent(
    address indexed operator,
    address indexed from,
    address indexed to,
    uint256 amount,
    bytes userData,
    bytes operatorData
  );

  event Minted(address indexed operator, address indexed to, uint256 amount, bytes operatorData);
  event Burned(address indexed operator, address indexed from, uint256 amount, bytes userData, bytes operatorData);
  event AuthorizedOperator(address indexed operator, address indexed tokenHolder);
  event RevokedOperator(address indexed operator, address indexed tokenHolder);
}