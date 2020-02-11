const Web3 = require('web3');

const configuration = require('./config');

const preference = configuration.provider_preference;

module.exports = {

    web3: new Web3(preference + configuration.geth_rpc),

    getAccounts : async function () {
        try {
            console.log("trying to get accounts");
            var accounts = await this.web3.eth.getAccounts();
            console.log("successfully retrieved the accounts, here you go : ");
            console.log(accounts);
            return accounts;
        }
        catch (err) {
            console.log("couldn't retrieve accounts due to : ");
            console.log(err);
            return false;
        }
    },
    
    transfer : function (from_addr, to_addr, eth_q) {

        var web3_inside = this.web3;
        return new Promise(function(resolve, reject) {
            //
            //
            //We are creating a new Promise object,
            //so 'this' will refer to the Promise object,
            //not the outer object.
            //hence we have another variable web3_inside which refers to web3
            //since 'this' refers to the outer object.
            // Now we can use it within our Promise object by referring to it.
            //
            //
            // console.log(web3_inside);
            web3_inside.eth.sendTransaction({from: from_addr, to: to_addr, value: web3_inside.utils.toWei(eth_q, "ether"), gas: configuration.gas})
            .on('transactionHash', function(hash){
                resolve(hash);
            })
            .on('error', function(err){
                console.log("error in sendTransaction");
                console.log(err);
                reject(false);
            })
        });
    },
    
    checkBalance : async function (address) {
        try {
            console.log("checking balance of " + address);
            var balance_in_wei = await this.web3.eth.getBalance(address);
            var balance = balance_in_wei.slice(0, balance_in_wei.length-18);
            console.log("balance of " + address + " is : " + balance);
            balance = parseFloat(balance);
            return balance;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    },

    isAValidAddress : function (address) {
        return this.web3.utils.isAddress(address);
    }
}



// async function run() {
//     try {
//         var accounts = await getAccounts();
//         await transfer(accounts[0], accounts[1], '10');
//         console.log("transferred");
//         var balance = await web3.eth.getBalance(accounts[1]);
//         console.log("balance is now : ");
//         console.log(balance);
//     }
//     catch (err) {
//         console.log("error in run");
//         console.log(err);
//     }
// }

// run();
