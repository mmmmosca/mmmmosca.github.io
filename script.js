const substitutionTable = {
    'A': '#', 'B': ';', 'C': "'", 'D': '_', 'E': '3', 'F': '&', 'G': '-', 
    'H': '+', 'I': '8', 'L': '/', 'M': '?', 'N': '!', 'O': '9', 'P': '0', 
    'Q': '1', 'R': '4', 'S': '$', 'T': '5', 'U': '7', 'V': ':', 'Z': '*'
};

const reverseSubstitutionTable = Object.fromEntries(
    Object.entries(substitutionTable).map(([key, value]) => [value, key])
);

const asciiTable = {
    '0': 'p', '1': 'q', '2': 'w', '3': 'e', '4': 'r', '5': 't', 
    '6': 'y', '7': 'u', '8': 'i', '9': 'o'
};

const reverseAsciiTable = Object.fromEntries(
    Object.entries(asciiTable).map(([key, value]) => [value, key])
);

function encryptText() {
    const input = document.getElementById("inputText").value.toUpperCase();
    const substituted = input.split('').map(char => substitutionTable[char] || char).join('');
    const asciiValues = substituted.split('').map(char => char.charCodeAt(0).toString()).join('');
    const encrypted = asciiValues.split('').map(num => asciiTable[num] || num).join('');
    document.getElementById("result").innerText = `Risultato: ${encrypted}`;
}

function decryptText() {
    const input = document.getElementById("inputText").value;
    const asciiValues = input.split('').map(char => reverseAsciiTable[char] || char).join('');
    const substituted = asciiValues.match(/.{1,2}/g).map(num => String.fromCharCode(Number(num))).join('');
    const decrypted = substituted.split('').map(char => reverseSubstitutionTable[char] || char).join('');
    document.getElementById("result").innerText = `Risultato: ${decrypted}`;
}
