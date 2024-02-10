
var all_url = [];
const btn = document.querySelector('.btn');
btn.addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: get_url,
    },
        async (injectioncoderes) => {
            var data = injectioncoderes[0].result;
            let count = 0;
            for (let i = 0; i < data.length; i++) {
                var newParagraph = document.createElement("a");
                newParagraph.href = data[i];
                newParagraph.innerHTML = data[i];
                newParagraph.target = "_blank";
                var existingDiv = document.getElementById("listofiurl");
                existingDiv.appendChild(newParagraph);
            }
        });
});
async function get_url() {
    const baseUrl = window.location.origin;
    const urls = [];
    document.querySelectorAll('a').forEach(link => {
        const href = link.href;
        if (href.startsWith(baseUrl)) {
            urls.push(href);
        }
    });

    return urls;
}

