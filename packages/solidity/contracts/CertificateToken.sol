pragma solidity >=0.4.22 <0.6.0;

import "./ERC777.sol";

contract Certificate is ERC777Token {
  string public certificateName;

  struct Award {
    string name;
    address issuer;
    address owner;
    uint16 dateIssued;
    string location;
  }

  function name() public view returns (string memory) {
    return certificateName;
  }
}

