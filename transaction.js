const sha256 = require("crypto-js/sha256");

class Transaction {
    constructor(sender, reciever, amount) {
        this.sender   = sender;
        this.reciever = reciever;
        this.amount   = amount;
    };
}

class Block {
    constructor(timestamp, transaction, previousHash = ""){
        this.timestamp = timestamp;
        this.transaction = transaction;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    };

    calculateHash() {
        return sha256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.transaction) + this.nonce).toString() ;
    };

    mineBlock(difficulty) {
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Mining "+this.hash);
    };
}

class Blockchain {
    constructor(){
        this.chain = [this.createGensisBlock()];
        this.difficulty = 2;
        this.pendingTranscution = [];
        this.miningReward = 100;
    };

    createGensisBlock() {
        return new Block("29/10/1992", "Gensis block", "0");
    };

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    };

    minePendingTranscation(miningAddress) {
        let block = new Block(Date.now(), this.pendingTranscution);
        block.mineBlock(this.difficulty);
        console.log("Mined Block successfully ");
        this.chain.push(block);
        this.pendingTranscution [
            new Transaction(null, miningAddress, this.miningReward)
        ];
    };

    createTranscation(transaction) {
        this.pendingTranscution.push(transaction);
    };

    isChainValid() {
        for(let i = 1;  i < this.chain.length; i++) {
            const currentBlock  = this.chain[i];
            const previousBlock = this.chain[i - 1];
            console.log(currentBlock);

            if(currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    };
};

let addBLock = new Blockchain();
