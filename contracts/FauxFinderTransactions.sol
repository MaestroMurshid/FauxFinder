pragma solidity >=0.4.22 <0.7.0;

contract FauxFinderTransactions {
    uint256 Tcount;

    event transfer(address from, address receiver, uint amount, string message, uint256 timestamp, string keyword);

    struct TransferStruct {

        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;

    }

    TransferStruct[] Transactions;

    function addToBlockChain(address payable receiver, uint amount, string memory message, string memory keyword) public{
        Tcount = Tcount + 1;
        Transactions.push(TransferStruct(msg.sender, receiver, amount, message, block.timestamp, keyword));

        emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword);
    }

    function getAllTransactions() public view returns (TransferStruct[] memory){
        return Transactions;
    }

    function getTcount() public view returns(uint256 Tcount){
        return Tcount;
    }
}