FROM ethereum/client-go:alltools-stable

RUN mkdir datadir

RUN mkdir datadir/keystore

COPY ./datadir/keystore/* ./datadir/keystore/

COPY ./genesis.json ./

COPY ./password.txt ./

RUN geth --datadir ./datadir init genesis.json

ENV bootnodeId=""

ENV bootnodeIp=""

CMD geth --datadir ./datadir --nat extip:`hostname -i` --bootnodes "enode://$bootnodeId@$bootnodeIp:30301" --networkid="58721" --ws --wsaddr 0.0.0.0 --wsport 8546 --wsorigins="*" --rpc --rpcport 8545 --rpcaddr 0.0.0.0 --rpccorsdomain "*" --rpcapi "db,eth,net,web3,personal" --allow-insecure-unlock --unlock "0,1,2,3,4,5,6,7,8,9" --password password.txt
