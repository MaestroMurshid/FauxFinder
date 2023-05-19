const FauxFinderTransactions = artifacts.require('FauxFinderTransactions');
const assert = require('assert');
const { it } = require('node:test');

contract("FauxFinderTransactions", (accounts) => {

    let FauxFinder
    const [owner, Manufacturer, c1, c2] = accounts;

    before(async () => { 
        FauxFinder = await FauxFinderTransactions.deployed();
    })

    it('Deployed Successfully', async () => {

        let address = await FauxFinder.address
        assert.notEqual(address, 0x0)
        assert.notEqual(address, '')
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)

        let ownerAddress = await FauxFinder.owner()
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
        assert.equal(result.address.toLowerCase(),Manufacturer.toLowerCase());
    })

    

})