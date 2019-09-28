pragma solidity ^0.5.0;

import "../ERC777.sol";

contract Token is ERC777Token {
  function name() public view returns (string memory) {
    return 'BigHero Reward Token';
  }


  function symbol() public view returns (string memory) {
    return 'BHR';
  }

  mapping (address => uint) balances;
}