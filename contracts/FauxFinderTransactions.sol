pragma solidity >=0.4.22 <0.7.0;

contract FauxFinderTransactions {
    
    address public owner; 
    constructor(){
        owner = msg.sender;
    }

    uint productID = 0;
    


    struct Manufacturer{
        bool exists;
        string mName;
        address mAddress;

    }

    struct Product {
        bool exists;
        uint pID;
        string pName;
        string pDesc;
        address pManufacturer;
        address currentOwner;
        address[] listOfOwners;
    }


    mapping(address => Manufacturer) public Manufacturers;
    mapping(address => Product) public Products;


    event addManufacturer(string mName, address mAddress);
    event addProduct(uint pID, address pManufacturer);
    event changedOwnership(uint pid, address newOwner);



    function createManufacturer(string memory _mName, address _mAddress ) public{
        require(msg.sender == owner);

        Manufacturer storage m = Manufacturer[_mAddress];
        m.exists = true;
        m.mName = _mName;
        m.mAddress = _mAddress;
        emit addManufacturer(_mName, _mAddress);
    }

    function addProduct(string memory _name, string memory _desc) public{
        require(Manufacturer[msg.sender].exists == true);

        Product storage p = product[productID];
        p.exists = true;
        p.pID = productID;
        p.pName = _name;
        p.pDesc = _desc;
        p.pManufacturer = msg.sender;
        p.currentOwner = msg.sender;
        p.listOfOwners.push(msg.sender);
        productID++;

        emit addProduct(productID-1, msg.sender);
    }

    function getProduct(uint _id) public view returns(Product memory){
        return products[_id];
    }

    function ownershipChange(uint _id, address _newOwner) public {
        Product storage p = products[_id];
        require(p.currentOwner == msg.sender);

        p.currentOwner = _newOwner;
        p.listOfOwners.push(_newOwner);
        emit changedOwnership(_id, _newOwner);

    }
}