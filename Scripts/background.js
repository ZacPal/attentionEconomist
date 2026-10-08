async function blockOperation() {
    try {
            const [tab] = await chrome.tabs.query({
                active: true,
                currentWindow: true
            });

            await chrome.storage.local.set({
                blockedTabId: tab.id
            });

            await chrome.tabs.sendMessage(tab.id, { action: "block" });
            
            //Creates alarm
            console.log("Received alarm request.");
            chrome.alarms.create("Block", {
                delayInMinutes: 1
            });
            
        } catch (error) {
            console.error("Block operation failed:", error);
        }
}

async function unblockOperation() {
    const { blockedTabId } = await chrome.storage.local.get("blockedTabId");
    console.log("Sending unblock.");
    chrome.tabs.sendMessage(blockedTabId, { action: "unblock" });
}

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    const { blockedTabId } = await chrome.storage.local.get("blockedTabId");
    if (changeInfo.status === "complete") {
        if (tabId === blockedTabId ) {
            chrome.tabs.sendMessage(tab.id, { action: "block" });
        }
    }
});

chrome.runtime.onMessage.addListener((msg) => {
    if (msg.action === "blockButton") {
        blockOperation();
    } else if (msg.action === "unblockButton") {
        unblockOperation();
    }
});

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === "Block") {
    unblockOperation();
  }
});