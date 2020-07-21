let storageObj;
if (chrome.storage !== undefined)
{
    storageObj = chrome.storage.sync;
}

function identifyEntityClass(button)
{
    button.addEventListener('click',function(e)
    {
        let entity = e.target.getAttribute('id');
        storageObj.set({'entity-to-display': entity});
    });
}

(function()
{
    let OUButton = document.getElementById('OU');
    let groupButton = document.getElementById('group');
    let userButton = document.getElementById('user');

    identifyEntityClass(OUButton);
    identifyEntityClass(groupButton);
    identifyEntityClass(userButton);
}()
);
