var storageObj;
if (chrome.storage !== undefined)
{
    storageObj = chrome.storage.sync;
}

var runtimeObj;
if (chrome.runtime !== undefined)
{
    runtimeObj = chrome.runtime.onMessage;
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
        let orgUnits = tabl.getElementsByTagName('li');
        let numOrgUnits = orgUnits.length;

        for (let i = 0; i < numOrgUnits; i++)
        {
            let row = orgUnits[i];
            let dataid = row.children[0].getAttribute('data-node-id');
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
 * This function is called when a message is received from the port.
 * It performs a click on the required orgUnits button.
 * @param {request object} request received as a message from message passing port
 */
function onMessageFunction(request)
{
    let dataId = request.dataId[0];
    let dataName = request.dataId[1];
    let prefEntity = dataId.split("-")[0];
    if (prefEntity === 'OU')
    {
        let dataContentId = dataId.split("-")[1];
        let queryVar = '[data-content-id=\'' + dataContentId + '\']';
        let orgUnits = document.querySelectorAll(queryVar);
        orgUnits[0].children[1].firstChild.click();
    }
    
   //otherwise copy to clipboard
    else
   {
    const copyText = document.createElement('textarea');
    copyText.value = dataName;
    document.body.appendChild(copyText);
    copyText.select();
    document.execCommand('copy');
    document.body.removeChild(copyText);
   }
}

/**
 * This functions adds a message listener to this content script
 * Received message is expected to be the data id from preferred.js
 */
function applySelect()
{
    runtimeObj.addListener(
        function(request) 
        {
            onMessageFunction(request);
        });
}

(function()
{
    applySelect();
    selectClick();
}()
);
