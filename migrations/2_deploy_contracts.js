var safemath = artifacts.require("./SafeMath.sol");
//var ownable = artifacts.require("./Ownable.sol");
var behaviourtracking = artifacts.require("./BehaviourTracking.sol");

module.exports = function( deployer ) {
    //deployer.deploy( ownable );
    deployer.deploy( safemath );
    deployer.deploy( behaviourtracking );
}