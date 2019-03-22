pragma solidity ^0.4.24;

import "./ownable.sol";
import "./safemath.sol";

contract BehaviourTracking is Ownable {

  constructor() public {
    //constructor
  }

  using SafeMath for uint256;
    
  mapping ( address => uint[] ) public averageParameters;
  mapping ( address => uint[] ) public violationParameters;
  mapping ( address => uint ) paymentAmount;
  
  modifier ownerOf( address _user ) {
      require(msg.sender == _user);
      _;
  }
  
  function setParameters( address _user, uint[] _parameters ) external onlyOwner {
      averageParameters[_user] = _parameters;
  }

  function getParameters( address _user ) external view returns (uint[]) {
    return averageParameters[_user];
  }
  
  function setViolationParameters( address _user, uint[] _parameters ) external onlyOwner {
      violationParameters[_user] = _parameters;
  }

  function getViolationParameters( address _user ) external view returns (uint[]) {
    return violationParameters[_user];
  }
  
  function addPayment( address _user, uint _amount ) external onlyOwner {
      paymentAmount[_user] = paymentAmount[_user].add(_amount);
  }

  function payAmount( uint _amount ) external payable {
      require(_amount <= paymentAmount[msg.sender]);
      require(_amount == msg.value);
  }
  
  function getPaymentAmount( address _user ) external view ownerOf(_user) returns (uint) {
      return paymentAmount[_user];
  }

}
