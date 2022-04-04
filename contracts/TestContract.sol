// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TestContract {
  uint256 public data;

  function setData(uint256 _data) public {
      data = _data;
  }
}
