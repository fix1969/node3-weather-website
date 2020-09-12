// Librearia di funzioni per stringhe

// 1° carattere in maiuscolo
/**
 * @param  {string} strIn Riceve una stringa in ingresso
 * @return {string} Ritorna stringa con primo carattere maiuscolo
 */
const fistCharacterLow = (strIn) => {
    if (!strIn) {
        return '';
    }
    let strOut = strIn[0].toUpperCase();
    for (let index = 1; index < strIn.length; index++) {
        strOut = strOut + strIn[index];
    }
    return strOut;
};

module.exports = {
    fistCharacterLow: fistCharacterLow
}
