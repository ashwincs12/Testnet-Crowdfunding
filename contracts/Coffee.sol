//SPDX-License-Identifier:MIT
pragma solidity ^0.8.24;
pragma experimental ABIEncoderV2;

contract Coffee
{
  struct Memo
  {
    string name;
    string memo;
    uint timestamp;
    address from;
    uint value;
  }

  Memo[] memos;
  address payable owner;

  constructor()
  {
    owner=payable(msg.sender);
  }

  function buyCoffee(string memory name,string memory memo) public payable
  {
    require(msg.value>0, "Please sent ether greather than value 0!");
    owner.transfer(msg.value);
    memos.push(Memo(name,memo,block.timestamp,msg.sender,msg.value));
  }

  function viewMemos() public view returns(Memo[] memory)
  {
    return memos;
  }
}