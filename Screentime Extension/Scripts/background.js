
chrome.tabs.onUpdated.addListener(async (tabID, changeInfo, tab) => {

    const { blockedTabID } = await chrome.storage.local.get("blockedTabID");

    if (changeInfo.status === "complete") {
        if (tabID === blockedTabID ) {
            chrome.tabs.sendMessage(tab.id, { action: "block" });
        }
    }

});

chrome.action.onClicked.addListener(async (tab) => {
 
 /*   chrome.scripting.executeScript({
    target: {tabId: tab.id},
    files: ['scripts/content.js']
  }); */

  chrome.alarms.create("Block", {
        delayInMinutes: 1
    });

    await chrome.storage.local.set({
    blockedTabID: tab.id
    });

    chrome.tabs.sendMessage(tab.id, { action: "block" });
    /*await chrome.scripting.insertCSS({
        files: ["block-mode.html"],
        target: { tabId: tab.id },
    }); */
});

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === "Block") {

    const { blockedTabID } = await chrome.storage.local.get("blockedTabId");

    chrome.tabs.sendMessage(blockedTabID, { action: "unblock" });
    /*await chrome.scripting.removeCSS({
        files: ["block-mode.html"],
        target: { tabId: blockedTabId },
      }); */
    
    
  }
});