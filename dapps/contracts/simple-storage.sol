// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleStorage {
    // --- State Variables ---
    uint256 private storedValue; // Tempat nyimpen angka
    address public owner;        // Task 1: Nyimpen alamat Owner

    // --- Events (Log) ---
    // Task 2: Event buat validasi
    event ValueUpdated(uint256 newValue);
    event OwnerSet(address indexed newOwner);

    // --- Constructor ---
    // Jalan otomatis pas deploy
    constructor() {
        owner = msg.sender; // Yang deploy otomatis jadi BOS (Owner)
        emit OwnerSet(owner);
    }

    // --- Modifier ---
    // Task 4: Satpam penjaga pintu
    modifier onlyOwner() {
        require(msg.sender == owner, "Hanya owner yang boleh ganti!");
        _;
    }

    // --- Functions ---

    // 1. Write Function (Pakai Gas & Diproteksi onlyOwner)
    function setValue(uint256 _value) public onlyOwner {
        storedValue = _value;
        emit ValueUpdated(_value); // Emit event biar kebaca di Snowtrace
    }

    // 2. Read Function (Gratis)
    function getValue() public view returns (uint256) {
        return storedValue;
    }
}