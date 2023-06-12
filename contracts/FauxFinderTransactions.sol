// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract FauxFinderTransactions {
    address public owner = msg.sender;

    uint productID = 0;

    struct Manufacturer {
        bool exists;
        string mName;
        address mAddress;
    }

    struct Product {
        bool exists;
        uint pID;
        string pName;
        string brand;
        string sno;
        string pDesc;
        address pManufacturer;
        address currentOwner;
        address[] listOfOwners;
    }

    struct ProductwithManufacturer{
        uint[] pID;
        address pManufacturer;
    }
    
    mapping(address => ProductwithManufacturer) public pWithm;
    mapping(address => Manufacturer) public Manufacturers;
    mapping(uint => Product) public Products;

    event addManufacturer(string mName, address mAddress);
    event addProduct(uint pID, address pManufacturer);
    event changedOwnership(uint pid, address newOwner);

    function createManufacturer(
        string memory _mName,
        address _mAddress
    ) public {
        require(msg.sender == owner);

        Manufacturer storage m = Manufacturers[_mAddress];
        m.exists = true;
        m.mName = _mName;
        m.mAddress = _mAddress;

        emit addManufacturer(_mName, _mAddress);
    }

    function createProduct(string memory _name, string memory _desc) public {
        require(Manufacturers[msg.sender].exists == true);

        Product storage p = Products[productID];
        p.exists = true;
        p.pID = productID;
        p.pName = _name;
        p.pDesc = _desc;
        p.pManufacturer = msg.sender;
        p.currentOwner = msg.sender;
        p.listOfOwners.push(msg.sender);
        productID++;

        ProductwithManufacturer storage pWm = pWithm[msg.sender];
        pWm.pID.push(productID-1);

        emit addProduct(productID-1, msg.sender);
    }

    function getProduct(uint _id) public view returns(Product memory){

        return Products[_id];
    }

    function getManufacturerAndProduct(address _mAddress) public view returns(ProductwithManufacturer memory){

        
        return pWithm[_mAddress]; 
    }



    function ownershipChange(uint _id, address _newOwner) public {
        Product storage p = Products[_id];
        require(p.currentOwner == msg.sender);

        p.currentOwner = _newOwner;
        p.listOfOwners.push(_newOwner);
        emit changedOwnership(_id, _newOwner);
    }

} 
