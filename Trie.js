import TrieNode from "./TrieNode.js";
import fs from "fs";
//const TrieNode = require('./TrieNode');
//const fs = require('fs');
//import * as fs from "fs";
//delete require.cache[require.resolve('./TrieNode')];

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
    }

    contains(input, currentNode = this.root, index = 0) {
        const word = Array.from(input);

        if ( index === word.length ) {
            if ( currentNode.isWord === true ) {
                return true;
            }
            else return false
        }

        if ( word[index] in currentNode.children) {
            currentNode = currentNode.children[word[index]];
            return this.contains(input, currentNode, index + 1);
        }
        else return false;
    }
}

const myTree = new Trie();
myTree.insert("HELLO");
myTree.insert("HELIPAD");
console.log("HELLO in tree: " + myTree.contains("HELLO"));
console.log("HELIPAD in tree: " + myTree.contains("HELIPAD"));
console.log("HELL in tree: " + myTree.contains("HELL"));
console.log("HELIPADD in tree: " + myTree.contains("HELIPADD"));
//myTree.insert("HELKORT");
//myTree.insert("HELICOPTER");