
document.getElementById("blockButton").addEventListener("click", async () => {
    await chrome.runtime.sendMessage({action: "blockButton"});
});

let count = 0;
document.getElementById("unBlockButton").addEventListener("click", async () => {
        count++;
        document.getElementById("displayText").textContent = "Click to 70 to unblock! " + count;
        if (count >= 70) {
            await chrome.runtime.sendMessage({action: "unblockButton" });
            count = 0;
        }
});


