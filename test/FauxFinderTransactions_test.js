const { assert } = require('chai');
let FauxFinderTransactions = artifacts.require("FauxFinderTransactions.sol");
require('chai')
	.use(require('chai-as-promised'))
	.should();


contract("FauxFinderTransactions", (accounts) => {

    const [owner, Manufacturer, c1, c2] = accounts;

    let FauxFinder

    before(async () => { 
        FauxFinder = await FauxFinderTransactions.deployed();
    })

    it('Deployed Successfully', async () => {

        let address = await FauxFinder.address
        assert.notEqual(address, 0x0)
        assert.notEqual(address, '')
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)

        let ownerAddress = await FauxFinder.owner();
        assert.equal(ownerAddress.toLowerCase(), owner.toLowerCase())
      })
    
    it("Should Allow the owner to create a new Manufacturer", async () => {

        let result = await FauxFinder.createManufacturer("M0", Manufacturer, {from:owner})
        result = await FauxFinder.Manufacturers(Manufacturer)
        assert.equal(result.exists, true);
        assert.equal(result.mName,"M0");
        assert.equal(result.mAddress.toLowerCase(),Manufacturer.toLowerCase());
    })

    it("Should allow a manufacturer to create a new product", async () => {

        await FauxFinder.createProduct("P0", "Model0", {from:Manufacturer});

        const p = await FauxFinder.getProduct(0)
        
        assert.equal(p.exists, true);
        assert.equal(p.pName,"P0");
        assert.equal(p.pDesc, "Model0")
        assert.equal(p.pManufacturer.toLowerCase(),Manufacturer.toLowerCase());
        assert.equal(p.currentOwner.toLowerCase(),Manufacturer.toLowerCase());
        assert.equal(p.listOfOwners[0].toLowerCase(),Manufacturer.toLowerCase());
    })

    it('allows Manufacturer to sell p0 to customer', async () => {

        await FauxFinder.ownershipChange(0, c1, {from: Manufacturer});

        const p0 = await FauxFinder.getProduct(0);

        assert.equal(p0.currentOwner.toLowerCase(), c1.toLowerCase());
        assert.equal(p0.listOfOwners[0].toLowerCase(),Manufacturer.toLowerCase());
        assert.equal(p0.listOfOwners[1].toLowerCase(),c1.toLowerCase());

    })

    it('allows customer 1 to sell to customer 2', async () => {

        await FauxFinder.ownershipChange(0, c2, {from: c1,});
        const p0 = await FauxFinder.getProduct(0)
        
        assert.equal(p0.currentOwner.toLowerCase(), c2.toLowerCase());
        assert.equal(p0.listOfOwners[0].toLowerCase(),Manufacturer.toLowerCase());
        assert(p0.listOfOwners[1].toLowerCase(),c1.toLowerCase())
        assert(p0.listOfOwners[2].toLowerCase(),c2.toLowerCase())
    }) 

})