var storageObj;
var testFlag = 'testing';
if (chrome.storage !== undefined)
{
    storageObj = chrome.storage.sync;
    testFlag = 'browser';
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
        const orgUnits = tabl.getElementsByTagName('li');
        const numOrgUnits = orgUnits.length;

        for (let i = 0; i < numOrgUnits; i++)
        {
            let row = orgUnits[i];
            let dataid = row.children[0].getAttribute('data-node-id');
            let key = 'OU-' + dataid;
            let dataname = (row.innerText).replace(/[^\x20-\x7E]/g, ''); //remove stray non-ASCII characters

            if (data[key] != undefined)
            {
                storageObj.set({[key]: dataname});
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
    const dataId = request.dataId[0];
    const dataName = request.dataId[1];
    const prefEntity = dataId.split('-')[0];
    if (prefEntity === 'OU')
    {
        const dataContentId = dataId.split('-')[1];
        const queryVar = '[data-content-id=\'' + dataContentId + '\']';
        const orgUnits = document.querySelectorAll(queryVar);
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
        let parentDiv;
        if (prefEntity === 'group')
        {
            parentDiv = document.querySelectorAll('[data-index=\'1\']')[0];
        }
        else if (prefEntity === 'user')
        {
            parentDiv = document.querySelectorAll('[data-index=\'0\']')[0]; 
        }
        if (parentDiv !== undefined)
        {
            let expandEntity = parentDiv.firstChild.firstChild.firstChild.firstChild;
            if (parentDiv.getAttribute('aria-expanded') !== true) //if not already expanded
            {
                expandEntity.click();
                parentDiv.setAttribute('aria-expanded', 'true'); //mimic DOM behavior
            }
        }
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
    if (testFlag != 'testing')
    {
        applySelect();
        selectClick();
    }
}()
);
