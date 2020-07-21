let localStorageObj;
if (chrome.storage !== undefined)
{
    localStorageObj = chrome.storage.local;
}

function identifyEntityClass(button)
{
    button.addEventListener('click',function(e)
    {
        let entity = e.target.getAttribute('id');
        localStorageObj.set({'entity-to-display': entity});
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
