addEventListener("proxy-fetch", async function (event) {
    const { url, options } = event.detail;
    const response = await chrome.runtime.sendMessage({ type: "proxy-fetch", url, options });
    dispatchEvent(new CustomEvent("proxy-fetch-response", { detail: response }));
});