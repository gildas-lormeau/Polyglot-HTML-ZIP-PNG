chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    onMessage(request, sender, sendResponse);
    return true;
});

async function onMessage(request, sender, sendResponse) {
    if (request.type === "proxy-fetch") {
        const { url, options } = request;
        try {
            const response = await fetch(url, options);
            sendResponse({
                url,
                array: Array.from(new Uint8Array(await response.arrayBuffer()))
            });

        } catch (error) {
            sendResponse({
                url,
                error: error.message
            });
        }
    }
}