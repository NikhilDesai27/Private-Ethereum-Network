const express = require('express');
const bodyparser = require('body-parser');
var cors = require('cors');
const conf = require('./config');
const web3c = require('./web3-connector');

const port = conf.port;
const host = conf.host;

var urlencodedParser = bodyparser.urlencoded({ extended: false });

var active_accounts;

app = express();

app.use(express.json());

app.use(cors());

app.listen(port, host, async () => {
    try {
        active_accounts = await web3c.getAccounts();
        if(active_accounts) {
            console.log("logging the accounts retrieved from : server.js ");
            console.log(active_accounts);
            console.log("server is running and ready to accept requests at " + host + ":" + port.toString());
        }
        else {
            console.log("Failed to get accounts' information");
        }
    }
    catch (err) {
        console.log("error in app.listen() code : ");
        console.log(err);
    }
});

app.post("/fundMe", urlencodedParser, async(req, res) => {
    try {
        console.log("************************ /fundMe ***********************");
        console.log(typeof req.body);
        console.log(JSON.stringify(req.body));
        var to_address = req.body.to;
        var amount_in_ETH = req.body.amount;
        //validate to_address, don't allow empty and addresses of invalid length
        if(!to_address || to_address.length != 42) {
            res.status(400).send({result: false, message: "The address you provided is invalid or empty!"});
        }
        else {
            var addressValidity = web3c.isAValidAddress(to_address);
            if(addressValidity) {
                if(!amount_in_ETH) {
                    amount_in_ETH = conf.default_transfer_amount;
                    console.log("amount not sent in the request body, using default");
                }
                else {
                    if (amount_in_ETH > 0.0 && amount_in_ETH <= conf.maximum_transfer_amount) {
                        console.log("amount is well within the valid range");
                    }
                    else {
                        console.log("amount is not within the valid range");
                        var msg = "amount should be greater than 0.0 and less than " + conf.maximum_transfer_amount.toString();
                        res.status(400).send({result: false, message: msg});
                    }
                }
                var faucet_address = false;
                for(var i = 0; i < active_accounts.length; i++) {
                    var balance = await web3c.checkBalance(active_accounts[i]);
                    if ( balance && balance >= amount_in_ETH ) {
                        faucet_address = active_accounts[i];
                        break;
                    }
                }
                if(faucet_address) {
                    var txnHash = await web3c.transfer(faucet_address, to_address, amount_in_ETH.toString());
                    res.status(200).send({result: true, message: "Requested amount has been credited to your account", transactionHash: txnHash});
                }
                else {
                    console.log("All accounts seem to be depleted of Ether!");
                    res.status(500).send({result: false, message: "All accounts seem to be depleted of Ether. :( "});
                }
            }
            else {
                res.status(400).send({result: false, message: "The address you provided is invalid!"});
            }
        }
    }
    catch (err) {
        console.log("error in /fundMe route");
        console.log(err);
        res.status(500).send({result: false, message: "Your request couldn't be processed due to an internal server error"});
    }
});