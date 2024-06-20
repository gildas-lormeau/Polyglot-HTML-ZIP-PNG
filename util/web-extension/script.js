const { fetch } = globalThis;

window.fetch = async (url, options) => {
    url = new URL(url, location.href).href;
    if (url.startsWith("file://")) {
        return new Promise((resolve, reject) => {
            addEventListener("proxy-fetch-response", onResponse);
            dispatchEvent(new CustomEvent("proxy-fetch", {
                detail: { url, options }
            }));

            function onResponse(event) {
                const { detail: response } = event;
                if (response.url === url) {
                    if (response.error) {
                        reject(new Error(response.error));
                    } else {
                        const { array } = response;
                        response.blob = async () => new Blob([new Uint8Array(array)]);
                        delete response.array;
                        delete response.url;
                        resolve(response);
                        removeEventListener("proxy-fetch-response", onResponse);
                    }
                }
            }
        });
    } else {
        return fetch(url, options);
    }
};