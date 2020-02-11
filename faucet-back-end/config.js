module.exports = {
    //provider_preference : ws (web-socket) or http rpc

    provider_preference : "ws",

    //the web-socket rpc address the server should connect to

    geth_rpc : "://172.25.0.3:8546",

    gas : 25000,

    //specify the port and host on which the server should run
    port : 3000,

    host : '0.0.0.0',

    //default amount, to be transferred when no amount is specified
    default_transfer_amount : 5.0,

    //maximum amount that could be requested
    maximum_transfer_amount : 10.0
}
