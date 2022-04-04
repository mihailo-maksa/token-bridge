// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract NumberContract {
  uint public number = 1;

  event MyEvent(address indexed from, uint indexed currentNumber);

  function incrementNumber() external {
    number += 1;
  }

  function emitAnEvent() external {
    emit MyEvent(msg.sender, number);
  }

  function deposit() external payable {}

  function getBalance() external view returns (uint) {
    return address(this).balance;
  }
}
