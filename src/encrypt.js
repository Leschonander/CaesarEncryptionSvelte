class Encrypt {
  //can't declare table and ll values up here rn, but can do later

  constructor() {
    this.plaintext = "The cake is a lie";
    this.cyphertext = "";
    this.caesarOffset = 0;
    this.table = [];
    this.list = [];
  }

  setPlainText(text) {
    this.plaintext = text;
  }
  
  getPlainText(){
    return this.plaintext
  }

  setcaesarOffset(offset) {
    if (offset >= 0 && offset <= 26) {
      this.caesarOffset = offset;
    } else {
      this.caesarOffset = 0;
    }
  }
  
  getaesarOffset(){
    return this.offset
  }

  getCipherLetter(plainLetter, offset) {
    let asciiNumber = plainLetter.charCodeAt(0) + offset;
    //wrap around the letters: a, b, ..., z, a, b, etc
    if (asciiNumber > 122) {
      asciiNumber = asciiNumber - 26;
    }
    let cipherLetter = String.fromCharCode(asciiNumber);
    return cipherLetter;
  }

  getValues() {
    console.log(`${this.plaintext} | ${this.caesarOffset}`);
  }

  buildTable() {
    let alphabet = "abcdefghijklmnopqrstuvwxyz";
    this.table = [alphabet.split(""), []];

    for (let i = 1; i < this.table.length; i++) {
      for (let j = 0; j < this.table[0].length; j++) {
        this.table[i][j] = this.getCipherLetter(
          this.table[0][j],
          this.caesarOffset
        );
      }
    }
  }

  textToList(text) {
    this.list = text.split(" ");
  }

  listToText() {
    let text = this.list;
    text = text.join(" ");
    return text;
  }

  invertWord(word) {
    let reversed = "";
    reversed = word
      .split("")
      .reverse()
      .join("");

    return reversed;
  }

  invertAllWordsInList() {
    // First called
    //this.list = this.plaintext.split(" ")

    for (let i = 0; i < this.list.length; i++) {
      this.list[i] = this.invertWord(this.list[i]);
    }
  }

  shiftArrayForward(arr) {
    for (var i = 0; i < 1; i++) {
      arr.unshift(arr.pop());
    }
  }

  shiftArrayBackward(arr) {
    let range = arr.length - 1;
    for (var i = 0; i < range; i++) {
      arr.unshift(arr.pop());
    }
  }

  getLetterFromTable(letter) {
    let output;
    let letterIndex = letter.charCodeAt(0) - 97;

    let outletter = this.table[1][letterIndex];

    return outletter;
  }

  reverseGetLetterFromTable(letter) {
    let output;
    let letterIndex = this.table[1].indexOf(letter);
    // 26 - (letter.charCodeAt(0) - 97) - this.caesarOffset
    // this.table[1].indexOf(letter)

    let outletter = this.table[0][letterIndex];

    return outletter;
  }

  applyCaesarToWord(word) {
    let outputWord = "";
    for (let i = 0; i < word.length; i++) {
      if (word[i] === word[i].toLowerCase()) {
        outputWord += this.getLetterFromTable(word[i]);
      } else {
        outputWord += word[i];
      }
    }
    return outputWord;
  }

  reverseApplyCaesarToWord(word) {
    let outputWord = "";
    for (let i = 0; i < word.length; i++) {
      if (word[i] === word[i].toLowerCase()) {
        outputWord += this.reverseGetLetterFromTable(word[i]);
      } else {
        outputWord += word[i];
      }
    }
    return outputWord;
  }

  applyCaesarToList() {
    for (let i = 0; i < this.list.length; i++) {
      this.list[i] = this.applyCaesarToWord(this.list[i]);
    }
  }
  reverseApplyCaesarToList() {
    for (let i = 0; i < this.list.length; i++) {
      this.list[i] = this.reverseApplyCaesarToWord(this.list[i]);
    }
  }

  encryptList() {
    this.textToList(this.plaintext);
    this.buildTable();
    this.invertAllWordsInList();
    this.applyCaesarToList();
    this.shiftArrayForward(this.list);
  }

  decryptList() {
    this.shiftArrayBackward(this.list);
    this.reverseApplyCaesarToList();
    this.invertAllWordsInList();
  }
}

module.exports = Encrypt