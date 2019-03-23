const contract = require('truffle-contract');
const contractJson = require('../build/contracts/BehaviourTracking.json');

const behaviourTracker = contract( contractJson );

async function getParameters( address ) {
    const contract = await behaviourTracker.deployed();
    const params = await contract.getParameters( address );
    console.log( params );
    return params;
}

async function setParameters( address, params ) {
    const contract = await behaviourTracker.deployed();
    const receipt = await behaviourTracker.setParameters( address, params );
    console.log( receipt );
    return receipt;
}

module.exports = {
    getParameters,
    setParameters
}