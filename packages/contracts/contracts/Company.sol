pragma solidity ^0.5.0;

import './Tokens/CertificateToken.sol';


contract Cert {
  struct Reward {
    bytes32 id;
    string name;
    uint cost;
  }
  
  struct User {
    string name;
    bytes32[] awards;
    uint256 awardsRecieved;
  }

  struct Sponsor {
    address _id;
    string name;
    uint cerificatesAwarded;
    bytes32 certficates;
  }
  uint256 usersAwards = 0;
  
  uint256 rewardCount = 0;

  mapping(address => Sponsor) sponsors;

  mapping(address => User) users;

  mapping(bytes32 => Reward) rewards;

  Reward[] public rewardRecords;

  address[] usersByAddress;

  mapping(bytes32 => uint8) public rewardsAvalible;

  constructor(string memory _name) public {
    name = _name;
  }

  function addReward(Reward reward) public {
    rewardRecords[rewardCount] = reward;

    rewardCount += 1;

    rewards[reward.id] = reward;
  }

  function addSponsor(Sponsor sponsor) public {
    sponsors[sponsor._id] = sponsor;
  }

  function issueReward(address to, string memory awardName, string memory location) public {
    require(sponsors[msg.sender], 'error invalid sponsor');
    users[to].awardsRecieved += 1;

    Award certificate = Award(
      awardName,
      users[to].name,
      now,
      location
    );
    
    users[to][users[to].awardsRecieved] = certificate;

    emit Issued(sponsors[msg.sender], to, certificate);
  }

  event Issued(address indexed operator, address indexed to, Award award);
}