/**
 * Updates names of preferred entities in storage. 
 * This is injected when the select button is clicked.
 */
function selectClick () 
{
    chrome.storage.sync.get(null, function (data) 
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
                chrome.storage.sync.set({[dataid]: dataname});
            }
        }
    });
}

(function()
{
    selectClick();
}()
);
