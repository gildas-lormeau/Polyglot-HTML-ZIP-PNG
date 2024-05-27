await main();

async function main() {
    displayData();
}

function displayData() {
    const bodyChildNodes = Array.from(document.body.childNodes);
    const commentNode = bodyChildNodes.find(node => node.nodeType == Node.COMMENT_NODE);
    const zipData = commentNode.nodeValue;
    let result = "";
    let columnIndex = 0;
    for (let indexZipData = 0; indexZipData < zipData.length; indexZipData++) {
        const charChodeHex = getCharCodeHex(zipData, indexZipData);
        result += charChodeHex + " ";
        columnIndex++;
        if (columnIndex == 16) {
            result += "\n";
            columnIndex = 0;
        }
        if (columnIndex == 8) {
            result += "  ";
        }
    }
    document.body.innerHTML = result;

    function getCharCodeHex(data, index) {
        const charCode = data.charCodeAt(index);
        return charCode < 256 ? charCode.toString(16).padStart(2, "0") : `<span title=${charCode}>${charCode == 65533 ? ".." : "XX"}</span>`;
    }
}