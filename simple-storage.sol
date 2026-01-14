// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleStorage {
    // owner variable
    address public owner;
    
    // Variabel existing 
    uint256 private storedValue;

    // Event OwnerSet
    event OwnerSet(address indexed oldOwner, address indexed newOwner);
    
    // Event existing 
    event ValueUpdated(uint256 newValue);
    
    // Constructor untuk set owner saat deploy
    constructor() {
        owner = msg.sender;
        emit OwnerSet(address(0), msg.sender); 
    }
    
    // Modifier untuk cek owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Hanya owner yang bisa!");
        _;
    }
    
    // Tambah onlyOwner ke function ini
    function setValue(uint256 _value) public onlyOwner { 
        storedValue = _value;
        emit ValueUpdated(_value); 
    }

    
    function getValue() public view returns (uint256) {
        return storedValue;
    }
}
