const TrieNode = require('./TrieNode');
const fs = require('fs');
//import * as fs from "fs";

class Trie {
    constructor() {
        this.root = new TrieNode(null);
        this.tree = [];
    }

    displayTree() {
        console.log("TREE: \n" + JSON.stringify(this.tree[0], null, 4));
        fs.writeFileSync('data.json', JSON.stringify(this.tree[0], null, 4), err => {
            if (err) {
              console.error(err);
            }
            // file written successfully
          });
    }

    insert(input, currentNode = this.root, index = 0) {

        if ( currentNode   ) {}
        // const array = Array.from(input);
        const array = Object.assign([], input);
        if ( index === array.length - 1) {
            const newNode = new TrieNode(array[index]);
            newNode.children = {};
            newNode.isWord = true;
            currentNode.children[array[index]] = newNode;
            this.tree.push(currentNode);
            currentNode = currentNode.children[array[index]];

            //this.tree.push(currentNode);
            console.log("----------");
            console.log("Index: " + index);
            console.log("Current Node: " + JSON.stringify(currentNode));
            //console.log("New Node: " + JSON.stringify(newNode));
            console.log("----------\n----------");
            this.displayTree();
        }
        else {

            if ( array[index] in currentNode.children ) {
                console.log("----------");
                console.log("Index: " + index);
                console.log("Passed Current Node: " + JSON.stringify(currentNode));

                currentNode = currentNode.children[array[index]];
                this.insert(input, currentNode, index + 1);
            }
            else {
                const newNode = new TrieNode(array[index]);
                currentNode.children[array[index]] = newNode;
                
                this.tree.push(currentNode);
                const prevNode = currentNode;
                currentNode = currentNode.children[array[index]];

                console.log("----------");
                console.log("Index: " + index);
                console.log("Previous: " + JSON.stringify(prevNode));
                console.log("Current Node: " + JSON.stringify(currentNode));
                //console.log("New Node: " + JSON.stringify(newNode));
                this.insert(input, currentNode, index + 1);
            }
        }
        //this.root.children[array[0]] = reverseNodes[array[0]];
    }
}

const test = new Trie();
test.insert("HELLO");
test.insert("HELIPAD");
//test.insert("HELKORT");
//test.insert("HELICOPTER");


module.exports = Trie;