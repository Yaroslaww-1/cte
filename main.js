import DiffMatchPatch from 'diff-match-patch';

const dmp = new DiffMatchPatch();
const TEXT_LENGTH = 1000;
const GENERATE_FILES = 60;
let seedText;
let texts = Array();
let diffs = Array();

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function generate_new_text(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function change_text(text) {
    let result = text;
    for (let i = 0; i < result.length; i += 5) {
        let action = getRandomInt(0, 4);
        if (action === 0) {
            result = [result.slice(0, i), generate_new_text(5), result.slice(i)].join('');
            i += 5;
        }
        else if (action === 1) {
            result = result.replace(result.substring(i, i + 5), '');
            result = [result.slice(0, i), generate_new_text(5), result.slice(i)].join('');
        }
        else if (action === 2) {
            result = result.replace(result.substring(i, i + 5), '');
            i -= 5;
        }
    }
    return result;
}

function generate_texts_for_test() {
    seedText = generate_new_text(TEXT_LENGTH);
    texts.push(seedText);
    for (let i = 0; i < GENERATE_FILES; i++) {
        texts.push(change_text(texts[texts.length - 1]));
    }
}

function time_diff_match_patch() {
    let startTime = Date.now();
    for (let i = 0; i < texts.length - 1; i++) {
        let diff = dmp.diff_main(texts[i], texts[i + 1]);
        diffs.push(diff);
    }
    console.log(Date.now() - startTime);
    // console.log("Time elapsed: " + (Date.now() - startTime) + "ms");
}

generate_texts_for_test();
time_diff_match_patch();
