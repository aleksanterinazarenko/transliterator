document.getElementById('inputText').addEventListener('input', function() {
    // Automatically update output text as user types
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
    "Х": "H", "Ц": "C", "Ч": "Č", "Ш": "Š", "Щ": "Št", "Ъ": "", "Ы": "Ï", "Ь": "", "Э": "Ë", "Ю": "U", "Я": "A",
    "а": "a", "б": "b", "в": "v", "г": "g", "д": "d", "е": "e", "ё": "o", "ж": "ž", "з": "z", "и": "i", "й": "j",
    "к": "k", "л": "l", "м": "m", "н": "n", "о": "o", "п": "p", "р": "r", "с": "s", "т": "t", "у": "u", "ф": "f",
    "х": "h", "ц": "c", "ч": "č", "ш": "š", "щ": "št", "ь": "", "ъ": "", "ы": "ï", "э": "ë", "ю": "u", "я": "a",
    "ѣ": "e", "ҥ": "n", "і": "i"
};

const palatals = {
    "Д": "Ď", "З": "Ź", "Л": "Ľ", "Н": "Ń", "Р": "Ŕ", "С": "Ś", "Т": "Ť", "Ц": "Ć",
    "д": "ď", "з": "ź", "л": "ľ", "н": "ń", "р": "ŕ", "с": "ś", "т": "ť", "ц": "ć"
};

const vowels = "АОУЫЭЯЁЮИЕЪЬаоуыэяёюиеъь";
const front = "ЕЁИЮЯеёиюя";
const nondentals = "БВГЖКПМШбвгжкпмш";

function transliterate(text) {
    text = " " + text + " ";

    text = text.replace(/([е])([и])([я])/g, '$1j$2j$3');
    text = text.replace(/([аоуыэяёюиеъьі])([еёиюя])/g, '$1j$2');
    text = text.replace(/([АОУЫЭЯЁЮИЕЪЬІ])([еёиюя])/g, '$1j$2');

    text = text.replace(/(^|\s|[.,!?;:()\[\]{}"“”«»])([еёюя])/g, '$1j$2');
    text = text.replace(/(^|\s|[.,!?;:()\[\]{}"“”«»])([ЕЁЮЯ])/g, '$1J$2');
    text = text.replace(/-([еёюя])/g, '-j$1');
    text = text.replace(/-([ЕЁЮЯ])/g, '-J$1');

    text = text.replace(/([аеёиоуыэюя])э/g, '$1e').replace(/(?:^|\s)э/g, ' e');
    text = text.replace(/([АЕЁИОУЫЭЮЯ])Э/g, '$1e').replace(/(?:^|\s)Э/g, ' E');
    text = text.replace(/(?:^|\s)и/g, ' i');
    text = text.replace(/(?:^|\s)И/g, ' I');
    text = text.replace(/-([э])/g, '-e');
    text = text.replace(/-([Э])/g, '-E');

    text = text.replace(/([бвгджзйклмнпрстфхцчшщ])я/g, '$1ä');
    text = text.replace(/([БВГДЖЗЙКЛМНПРСТФХЦЧШЩ])я/g, '$1ä');
    text = text.replace(/([ДЗЛНРСТЦдзлнрстц])е/g, '$1e');
    text = text.replace(/([ДЗЛНРСТЦдзлнрстц])и/g, '$1i');

    text = text.replace(/дь(?=[дзлнрстц])/g, 'd');
    text = text.replace(/зь(?=[дзлнрстц])/g, 'z');
    text = text.replace(/ль(?=[дзлнрстц])/g, 'l');
    text = text.replace(/нь(?=[дзлнрстц])/g, 'n');
    text = text.replace(/рь(?=[дзлнрстц])/g, 'r');
    text = text.replace(/сь(?=[дзлнрстц])/g, 's');
    text = text.replace(/ть(?=[дзлнрстц])/g, 't');
    text = text.replace(/ць(?=[дзлнрстц])/g, 'c');
    text = text.replace(/ъ/g, '');
    text = text.replace(/(\s|^)і/g, '$1j');
    text = text.replace(/і([аеёиоуыэюяАЕЁИОУЫЭЮЯ])/g, 'j$1');
    text = text.replace(/([БВГЖКПМШбвгжкпмш])ь/g, '$1');
    
    
    text = text.replace(/([ИЕЁЮЯ])([^А-Я])/g, function(match, p1, p2) {
        return p1.toLowerCase() + p2;
    });

    for (const [key, value] of Object.entries(palatals)) {
        const regex = new RegExp(key + 'ь', 'g');
        text = text.replace(regex, value);
        text = text.replace(new RegExp(key + `([${front}])`, 'g'), value + '$1');
    }

    return text.trim().split('').map(char => letters[char] || char).join('');
    
}