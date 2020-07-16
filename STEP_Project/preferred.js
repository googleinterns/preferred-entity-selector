var storageObj;
if (chrome.storage !== undefined)
{
    storageObj = chrome.storage.sync;
}

var Tabs;
if (chrome.tabs !== undefined)
{
    Tabs = chrome.tabs;
}

/**
 * Accesses chrome storage and displays the form of preferred entities with radio buttons
 */
function createForm()
{
    Tabs.query({active: true, lastFocusedWindow: true}, function(tabs) 
    {
        let url = tabs[0].url;
        storageObj.get(null, function (data) 
        {
            let urlRoot = url.split('/ac/')[0];
            urlRoot = urlRoot + '/ac/';

            let urlQueries = url.split('ac')[1].split('?')[1];

            let keys = Object.keys(data);
            let numKeys = keys.length;

            let selectForm = document.getElementById('radioButtons');

            let entityToDisplay = data['entity-to-display'];

            for (let i = 0; i < numKeys; i++)
            {
                if (keys[i] == 'entity-to-display')
                {
                    continue;
                }

                let elt = document.createElement('input');
                elt.setAttribute('type', 'radio');
                elt.setAttribute('value', keys[i]);
                elt.setAttribute('name', 'preferred');

                let prefEntity = keys[i].split('-')[0];

                let entityName = document.createTextNode(data[keys[i]]);
                var a = document.createElement('a');
                a.appendChild(elt);
                a.append(entityName);
                a.title = data[keys[i]];

                if (prefEntity == entityToDisplay)
                {
                    if (prefEntity == 'OU')
                    {
                        selectForm.appendChild(a);
                        let breakLine = document.createElement('br');
                        selectForm.appendChild(breakLine);
                    }
                    if (prefEntity == 'group')
                    {
                        a.href = urlRoot + 'groups/' + keys[i].split('-')[1] + '?' + urlQueries;
                        selectForm.appendChild(a);
                        let breakLine = document.createElement('br');
                        selectForm.appendChild(breakLine);
                    }
                    if (prefEntity == 'user')
                    {
                        a.href = urlRoot + 'users/' + keys[i].split('-')[1] + '?' + urlQueries;
                        selectForm.appendChild(a);
                        let breakLine = document.createElement('br');
                        selectForm.appendChild(breakLine);
                    }
                }
            }
        });
    });
}

/**
 * Enables applyButton if one of the preferred entities in the form has been selected.
 * @param {event} event - This is expected to be a click event.
 */
function enableApplyButton()
{
    let selectForm = document.getElementById('radioButtons');
    let numButtons = selectForm.length;

    for (let i = 0; i < numButtons; i++)
    {
        if (selectForm[i].checked == true)
        {
            let applyButton = document.getElementById('apply');
            applyButton.disabled = false;
            applyListener(applyButton); 
            return;
        }
    }
}

/**
 * Adds a listener to 'applyButton' in the extension that executes 'applyFunc' on click. 
 * @param {button object} applyButton - Button on the popup that allows the admin to choose a preferred entity.
 */
function applyListener(applyButton)
{
    applyButton.addEventListener('click', applyFunc);
}

/**
 * Gets the dataRowId from the name of the selected entity and sends it to the content script
 */
function applyFunc()
{
    let dataRowId = null;
    storageObj.get(null, function (data)
    {
        let selectForm = document.getElementById('radioButtons');
        let numButtons = selectForm.length;

        for (let i = 0; i < numButtons; i++)
        {
            if (selectForm[i].checked == true)
            {
                dataRowId = selectForm[i].value;
                break;
            }
        }
      
        //send dataRowId to OUSelectContent.js to perform a click on the required OU button
        if (chrome.tabs !== undefined)
        {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) 
            {
                chrome.tabs.sendMessage(tabs[0].id, {dataId: dataRowId});
            });
        }
    });
    return dataRowId; //required for testing purposes
}

(function()
{
    createForm();
    let selectForm = document.getElementById('radioButtons');
    selectForm.addEventListener('click',function(e)
    {
        if(e.target.href !== undefined)
        {
            chrome.tabs.create({url:e.target.href});
        }
        enableApplyButton();
    });
    let applyButton = document.getElementById('apply');
    applyListener(applyButton);
}()
);
