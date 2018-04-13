const sha256 = require("crypto-js/sha256");

class Block {
    constructor(index, timestamp, data, previousHash = ""){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    };

    calculateHash() {
        return sha256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.data) + this.nonce).toString() ;
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
        this.difficulty = 4;
    };

    createGensisBlock() {
        return new Block(0, "29/10/1992", "Gensis block", "0");
    };

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    };

    addNewBlock(newBlock = []) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
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

addBLock.addNewBlock(new Block(1, "19/10/1993", {'amount': 42}));
addBLock.addNewBlock(new Block(2, "19/10/1995", {'amount': 12}));
