document.getElementById('inputText').addEventListener('input', function() {
    updateOutputText();
});

function updateOutputText() {
    const inputText = document.getElementById('inputText').value;
    const outputText = transliterate(inputText);
    document.getElementById('outputText').value = outputText;
}

const letters = {
    "А": "A", "Б": "B", "В": "V", "Г": "G", "Д": "D", "Е": "E", "Ё": "O", "Ж": "Ž", "З": "Z", "И": "I", "Й": "J",
    "К": "K", "Л": "L", "М": "M", "Н": "N", "О": "O", "П": "P", "Р": "R", "С": "S", "Т": "T", "У": "U", "Ф": "F",
    "Х": "H", "Ц": "C", "Ч": "Č", "Ш": "Š", "Щ": "Šč", "Ъ": "", "Ы": "I", "Ь": "", "Э": "E", "Ю": "U", "Я": "A",
    "Ӕ": "Ä", "Ѣ": "E", "Ҥ": "N", "І": "I", "Ѳ": "Kv",
    "а": "a", "б": "b", "в": "v", "г": "g", "д": "d", "е": "e", "ё": "o", "ж": "ž", "з": "z", "и": "i", "й": "j",
    "к": "k", "л": "l", "м": "m", "н": "n", "о": "o", "п": "p", "р": "r", "с": "s", "т": "t", "у": "u", "ф": "f",
    "х": "h", "ц": "c", "ч": "č", "ш": "š", "щ": "šč", "ь": "", "ъ": "", "ы": "i", "э": "e", "ю": "u", "я": "a",
    "ӕ": "ä", "ѣ": "e", "ҥ": "n", "і": "i", "ѳ": "kv"
};

const palatals = {
    "Д": "Ď", "З": "Ź", "Л": "Ĺ", "Н": "Ń", "Р": "Ŕ", "С": "Ś", "Т": "Ť", "Ц": "Ć",
    "д": "ď", "з": "ź", "л": "ĺ", "н": "ń", "р": "ŕ", "с": "ś", "т": "ť", "ц": "ć"
};

const vowels = "АОУЫЭЯЁЮИЕЪЬаоуыэяёюиеъь";
const front = "ЕЁИЮЯеёиюя";
const nondentals = "БВГЖКПМШбвгжкпмш";

function transliterate(text) {
    text = " " + text + " ";

    text = text.replace(/([дзнрстц])ь(?=[дзнрстц]+[еёияіь])/g, '$1');
    text = text.replace(/([дзнрстц])ь(?=[дзнрстц]+[эы])/g, '$1');
    text = text.replace(/([дзлнрстц])ь(?=[еёияіь])/g, '$1j');

    text = text.replace(/([\u0301])/g, '');

    text = text.replace(/([е])([и])([я])([і])/g, '$1j$2j$3');
    text = text.replace(/([аоуыэяёюиеъьіӕ])([еёюя])/g, '$1j$2');
    text = text.replace(/([АОУЫЭЯЁЮИЕЪЬІӔ])([еёюя])/g, '$1j$2');
    text = text.replace(/([аоуыэяёюиеъіӕ])([иі])/g, '$1j$2');
    text = text.replace(/([АОУЫЭЯЁЮИЕЪІӔ])([иі])/g, '$1j$2');

    text = text.replace(/(^|\s|[.,!?;:()\[\]{}"“”«»\-])([ёюя])/g, '$1j$2');
    text = text.replace(/(^|\s|[.,!?;:()\[\]{}"“”«»\-])([ЁЮЯ])/g, '$1J$2');
    text = text.replace(/-([ёюя])/g, '-j$1');
    text = text.replace(/-([ЁЮЯ])/g, '-J$1');

    text = text.replace(/([аеёиоуыэюя])э/g, '$1e')
    text = text.replace(/([АЕЁИОУЫЭЮЯ])Э/g, '$1e')
    text = text.replace(/(^|\s|[.,!?;:()\[\]{}"“”«»\-])э/g, '$1e');
    text = text.replace(/(^|\s|[.,!?;:()\[\]{}"“”«»\-])Э/g, '$1E');
    text = text.replace(/(^|\s|[.,!?;:()\[\]{}"“”«»\-])і/g, '$1i');
    text = text.replace(/(^|\s|[.,!?;:()\[\]{}"“”«»\-])І/g, '$1I');


    text = text.replace(/([бвгжкмпфхчшщ])ь/g, '$1');
    text = text.replace(/ъ/g, '');
    text = text.replace(/(\s|^)і/g, '$1j');
    text = text.replace(/і([аеёиоуыэюяАЕЁИОУЫЭЮЯ])/g, 'j$1');
    text = text.replace(/й([аеёиоуыэюяАЕЁИОУЫЭЮЯ])/g, 'j-$1');
    text = text.replace(/([БВГЖКПМШбвгжкпмш])ь/g, '$1');
    
    text = text.replace(/И/g, 'I');
    text = text.replace(/Е/g, 'E');
    text = text.replace(/([ИЕЁЮЯ])([^А-Я])/g, function(match, p1, p2) {
        return p1.toLowerCase() + p2;
    });

    text = text.replace(/«/g, '„').replace(/»/g, '“');

    text = text.replace(/([дзнрстц]+)ь/g, (match, cluster) => {
        return cluster.split('').map(c => palatals[c] || c).join('');
    });

    text = text.replace(new RegExp(`([дзнрстц]+)([${front}])`, 'g'), (match, cluster, frontVowel) => {
        return cluster.split('').map(c => palatals[c] || c).join('') + frontVowel;
    });

    for (const [key, value] of Object.entries(palatals)) {
    const regexVowel = new RegExp(key + 'ь([аеёиоуыэюяАЕЁИОУЫЭЮЯ])', 'g');
    text = text.replace(regexVowel, value + '-$1');

    const regexNoVowel = new RegExp(key + 'ь', 'g');
    text = text.replace(regexNoVowel, value);

    text = text.replace(new RegExp(key + `([${front}])`, 'g'), value + '$1');
}

    return text.trim().split('').map(char => letters[char] || char).join('');
    
}
