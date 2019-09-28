pragma solidity >=0.4.22 <0.6.0;

import "./Token.sol";

contract Award {
    // address issuer;
    // address to;
    constructor(string memory _name, string memory _owner, uint16 date, string memory loc) public {
      name = _name;
      owner = _owner;
      dateIssued = date;
      location = loc;
    }

    string name;
    string owner;
    uint dateIssued;
    string location;
}

contract Certificate is Token {
  string public certificateName;

  string public ownerName;

  mapping(address => User) public owners;

  constructor(string memory name, string memory _owner) public {
    certificateName = name;
    ownerName = _owner;
  }

  function name() public view returns (string memory) {
    return certificateName;
  }

  function owner() public view returns (string memory) {
    return ownerName;
  }

  function send(address to, uint256 amount, string memory location, uint date) public returns (bool) {
    address payable sender = msg.sender;

    if(balances[sender] < 1) return false;
    
    Award award = Award(
      name(),
      owner(),
      date,
      location
    );

    balances[sender] -= 1;

    balances[reciever] += 1;

    emit Minted(sender, to, 1, award);
    return true;
  }
}

