// Tabella di sostituzione
const baseSubstitutionTable = {
    'A': '#', 'B': ';', 'C': "'", 'D': '_', 'E': '3', 'F': '&', 'G': '-', 'H': '+', 
    'I': '8', 'J': '(', 'K': ')', 'L': '/', 'M': '?', 'N': '!', 'O': '9', 'P': '0', 
    'Q': '1', 'R': '4', 'S': '$', 'T': '5', 'U': '7', 'V': ':', 'W': '2', 'X': '"', 
    'Y': '6', 'Z': '*'
};

// Tabella ASCII
const asciiTable = { '0': 'p', '1': 'q', '2': 'w', '3': 'e', '4': 'r', '5': 't', '6': 'y', '7': 'u', '8': 'i', '9': 'o' };
const reverseAsciiTable = Object.fromEntries(Object.entries(asciiTable).map(([k, v]) => [v, k]));

// Rotazione della tabella
function rotateTable(baseTable, day, key) {
    const values = Object.values(baseTable);
    const rotation = (day + Array.from(key).reduce((acc, char) => acc + char.charCodeAt(0), 0)) % values.length;
    const rotatedValues = [...values.slice(rotation), ...values.slice(0, rotation)];
    return Object.fromEntries(Object.keys(baseTable).map((k, i) => [k, rotatedValues[i]]));
}

// Funzione di cifratura
function encryptWithKey(text, baseTable, key) {
    const day = new Date().getDate(); // Ottieni il giorno del mese
    const rotatedTable = rotateTable(baseTable, day, key);
    const encryptedText = text.split('').map(char => rotatedTable[char] || char).join('');
    const asciiValues = encryptedText.split('').map(char => char.charCodeAt(0).toString().padStart(3, '0')).join('');
    return asciiValues.split('').map(digit => asciiTable[digit] || digit).join('');
}

// Funzione di decifratura
function decryptWithKey(text, baseTable, key) {
    const day = new Date().getDate(); // Ottieni il giorno del mese
    const rotatedTable = rotateTable(baseTable, day, key);
    const reverseTable = Object.fromEntries(Object.entries(rotatedTable).map(([k, v]) => [v, k]));
    const asciiValues = text.split('').map(char => reverseAsciiTable[char] || char).join('');
    const substituted = asciiValues.match(/.{1,3}/g).map(num => String.fromCharCode(Number(num))).join('');
    return substituted.split('').map(char => reverseTable[char] || char).join('');
}

// Eventi del sito
document.getElementById('cypher').addEventListener('click', function() {
    const key = document.getElementById('keyInput').value;
    const plainText = document.getElementById('plainText').value.toUpperCase();
    const encryptedText = encryptWithKey(plainText, baseSubstitutionTable, key);
    document.getElementById('result').textContent = `${encryptedText}`;});

document.getElementById('decryptButton').addEventListener('click', function() {
    const key = document.getElementById('keyInput').value;
    const encryptedText = document.getElementById('plainText').value;
    const decryptedText = decryptWithKey(encryptedText, baseSubstitutionTable, key);
    document.getElementById('result').textContent = `${decryptedText}`;
});