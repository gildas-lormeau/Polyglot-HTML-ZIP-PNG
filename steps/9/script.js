// Charset values to test
const CHARSET_VALUES = [
    "ibm866",
    "iso-8859-2",
    "iso-8859-3",
    "iso-8859-4",
    "iso-8859-5",
    "iso-8859-6",
    "iso-8859-7",
    "iso-8859-8",
    "iso-8859-8i",
    "iso-8859-10",
    "iso-8859-13",
    "iso-8859-14",
    "iso-8859-15",
    "iso-8859-16",
    "koi8-r",
    "koi8-u",
    "macintosh",
    "windows-874",
    "windows-1250",
    "windows-1251",
    "windows-1252",
    "windows-1253",
    "windows-1254",
    "windows-1255",
    "windows-1256",
    "windows-1257",
    "windows-1258",
    "x-mac-cyrillic",
    "x-user-defined"
];
// Maximum length of the charset values (for padding)
const CHARSET_VALUE_MAX_LENGTH = CHARSET_VALUES.reduce((max, charset) => Math.max(max, charset.length), 0);
// Charset labels
const CHARSET_LABELS = CHARSET_VALUES.map((charset) => charset.padEnd(CHARSET_VALUE_MAX_LENGTH, " "));

// Replacement character in HTML
const REPLACEMENT_CHARACTER = 0xFFFD;
// Blank frame URL
const BLANK_FRAME_URL = "about:blank";

// Element to display the results
const mainElement = document.querySelector("main");
// Element to display the test page
const iframeElement = document.querySelector("iframe");

// Current index of the charset being tested
let charsetIndex = 0;
// Array to store the results of the tests
const result = [];

// Listen for messages from the iframe
onmessage = ({ data }) => onTestResult(data);
// Start the test with the first charset
testNextCharset();

/**
 * Test the next charset.
 */
function testNextCharset() {
    // Create the input data which is an array of ordered numbers from 0 to 255
    const input = new Array(256).fill(0).map((_, index) => index);
    // Create a blob with the test page content
    const charset = CHARSET_VALUES[charsetIndex];
    const blobContent = new Blob([
        `<!DOCTYPE html> 
            <html>
                <head>
                    <meta charset="${charset}">
                </head>
            <body>
                <!--`, new Uint8Array(input), `-->
                <script>
                    (${sendTestData.toString()})(${JSON.stringify(input)});
                <\/script>
            </body>
        </html>`
    ], { type: "text/html" });
    // Load the blob URI in the iframe
    document.querySelector("iframe").src = URL.createObjectURL(blobContent);

    function sendTestData(input) {
        // Find the comment node and extract its text content
        const commentNode = Array.from(document.body.childNodes).find(node => node.nodeType === Node.COMMENT_NODE);
        // Convert the text content to an array of character codes
        const output = Array.from(commentNode.textContent).map(value => value.charCodeAt(0));
        // Send the input and output data to the parent window
        parent.postMessage({ input, output }, "*");
    }
}

function onTestResult({ input, output } = {}) {
    if (input && output) {
        iframeElement.src = BLANK_FRAME_URL;
        result.push(getTestResult(input, output));
        charsetIndex++;
        if (charsetIndex < CHARSET_LABELS.length) {
            testNextCharset();
        } else {
            displayResult();
        }
    }
}

function getTestResult(input, output) {
    const charset = CHARSET_LABELS[charsetIndex];
    // Find the differences between the input and output data
    const differences = getDifferences(input, output);
    // Find the invalid values (those that were replaced by the replacement character)
    const invalidValues = differences.filter(([_, output]) => output == REPLACEMENT_CHARACTER);
    return {
        charset,
        invalid: invalidValues.length,
        different: differences.length - invalidValues.length,
        differences
    };
}

function getDifferences(input, output) {
    // Find the differences between the input and output data
    const differences = [];
    for (let index = 0; index < input.length; index++) {
        if (input[index] != output[index]) {
            differences.push([input[index], output[index]]);
        }
    }
    // Return the differences as an array of tuples
    return differences;
}

function displayResult() {
    // Sort the results by the number of invalid characters and then by the number of differences
    result.sort((resultLeft, resultRight) =>
        resultLeft.invalid - resultRight.invalid ||
        resultLeft.different - resultRight.different);
    // Display the results in the main element
    mainElement.innerHTML = result
        .map(({ charset, invalid, different, differences }) => {
            const label = `${charset} | ${String(invalid).padEnd(3)} | ${String(different).padEnd(3)}`;
            return `<details><summary>${label}</summary>${JSON.stringify(differences)}</details>`;
        })
        .join("");
}