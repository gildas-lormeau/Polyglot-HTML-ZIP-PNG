function encodeText(text) {
    return new TextEncoder().encode(text);
}

function minifyScript(script) {
    return script.replace(/[ \t\n]+/g, " ");
}

export {
    encodeText,
    minifyScript
};