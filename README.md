# Private-Ethereum-Network
Setup your own private Ethereum network and kickstart your Blockchain development.
I hope you will find it useful!

# Project Description
This is a containerized private network that uses the Proof of Authority consensus mechanism.
It comes with a bootnode, a miner, two non-miner nodes, and a faucet application (front end and a back end) that also serves as a simple example of a decentralized application (DApp).
The genesis.json holds the network configuration information. The network's first block ( also called the genesis block is built out of this and hence it's name ).
The consenus mechanism (clique refers to proof of authority, period is the average time taken to mine a new block), chain id is also defined here. Customize this if you want to.
This configuration has ten pre-funded accounts that serve the faucet application. All the nodes in the network hold the private keys to these accounts so you can use them to easily build txns, without worrying about storing private keys, building raw txns, retrieving the private keys to sign the raw txns and then send it to the node.
You can create your own account using Metamask, Geth client or other wallet applicatons, faucet to get it funded and use it!
The average block time is the same as the actual Ethereum network


# Project requirements
docker(v18.03.1 or higher) and docker-compose(v1.21.2 or higher)

# Project setup
Open a terminal, navigate to the project directory and execute the following command :
docker-compose build
then, execute the following command :
docker-compose up
Miner: exposes rpc ports at 8545(http), 8546(ws) and 30303(peer to peer communication)
Node1: exposes rpc ports at 8547(http), 8548(ws) and 30305(peer to peer communication)
Node1: exposes rpc ports at 8549(http), 8550(ws) and 30307(peer to peer communication)
Faucet-backend: exposes a port at 3000(http)
Faucet-frontend: exposes a port at 80

stopping the private network :
docker-compose down

Will write a detailed description about each of the components soon!
