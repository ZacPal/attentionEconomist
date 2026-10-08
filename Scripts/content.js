 /* async function getCurrentTab() {
    let queryOptions = {active: true};
    // `tab` will either be a `tabs.Tab` instance or `undefined`. Will probably need a try-catch eventually
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;

const sitesObject = await chrome.storage.local.get("blockedSites");
const blockedSites = sitesObject.blockedSites;

const tab = await getCurrentTab();

for (const site of blockedSites) {
    if (tab.url.includes(site)) {
        createOverlay();
    }
}


  } */

function createOverlay() {

  const overlay = document.createElement("div");
  overlay.id = "block-overlay";
  overlay.innerHTML = "Block mode active";

  Object.assign(overlay.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "#ffffff",
    color: "#000000",
    zIndex: "999999",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "32px"
  });
  
  document.body.appendChild(overlay);
}

function removeOverlay() {
  document.getElementById("block-overlay")?.remove();
}

chrome.runtime.onMessage.addListener((msg) => {
    if (msg.action === "block") {
    console.log("Block Overlay attempted");
    createOverlay();
  }

  if (msg.action === "unblock") {
    console.log("Overlay removaL attempted");
    removeOverlay();
  }
});