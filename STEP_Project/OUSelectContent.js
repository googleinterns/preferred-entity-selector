var storageObj;
if (chrome.storage !== undefined)
{
    storageObj = chrome.storage.sync;
}

/**
 * Updates names of preferred entities in storage. 
 * This is injected when the select button is clicked.
 */
function selectClick () 
{
    storageObj.get(null, function (data) 
    {
        let tabl = document.querySelector('ul[role=group]');
        let orgUnits = tabl.getElementsByTagName("li");
        let numOrgUnits = orgUnits.length;

        for (let i = 0; i < numOrgUnits; i++)
        {
            let row = orgUnits[i];
            let dataid = row.children[0].getAttribute("data-node-id");
            let dataname = (row.innerText).replace(/[^\x20-\x7E]/g, ''); //remove stray non-ASCII characters

            if (data[dataid] != undefined)
            {
                data[dataid] = dataname;
                storageObj.set({[dataid]: dataname});
            }
        }
    });
}

/**
 * This functions adds a message listener to this content script
 * Received message is expected to be the data id from preferred.js
 * It then performs a "click" on the required OU button.
 */
function applySelect()
{
  chrome.runtime.onMessage.addListener(
    function(request) 
    {
      let queryVar = "[data-content-id='" + request.dataId + "']";
      let OU = document.querySelectorAll(queryVar);
      OU[0].children[1].children[0].click();
    });
}

(function()
{
    applySelect();
    selectClick();
}()
);
