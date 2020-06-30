
// Function that will later have Add/Remove functionality
function arButtonClick (event) 
{
    if (!event.target.matches('BUTTON')) return
    alert("hello");
}

// Adds a button to every visible row when the page is first loaded.
function initButtons(tabl)
{
    let OUs = tabl.rows;
    let numOUs = OUs.length;
    let numRows = numOUs-1;
    addButtons(tabl,OUs,numRows);

    // This is to handle an edge case:
    // This deals with the last row in the table 
    // that doesn't actually correspond to an OU
    let row = OUs[numOUs-1];
    const button = document.createElement('p');
    button.setAttribute('class','bClass');
    row.appendChild(button);
}

// This adds a button to every row in the table
// If the row already has a button, it skips that row
function addButtons(tabl,OUs,numRows)
{
    for (let i = 1; i < numRows; i++) 
    {
        let row = OUs[i];
        let temp = row.getElementsByClassName('bClass');
        if (temp.length == 0)
        {
            const button = document.createElement('BUTTON');
            button.innerHTML = 'click me';
            button.setAttribute('class','bClass');
            row = OUs[i];
            row.appendChild(button);
        }
    }
}

// This function implements Mutation Observer
// It checks if new OUs are visible and adds buttons to new rows if required
function monitorChanges()
{
    let allRowNodes = document.querySelectorAll("tbody[role=rowgroup]");
    let rootNode = allRowNodes[0];

    let MutationObserver = window.MutationObserver;

    let observer = new MutationObserver(function(mutations) 
    {
        let tabl = document.querySelector('table[role=grid]');
        let OUs = tabl.rows;
        let numOUs = OUs.length;

        addButtons(tabl,OUs,numOUs);
    });

    observer.observe(rootNode, 
    {
        attributes: false, 
        childList: true, 
        characterData: false,
        subtree: true
    });
}

(function()
{
    let tabl = document.querySelector('table[role=grid]');
    tabl.addEventListener('click',arButtonClick);//event delegation
    initButtons(tabl);
    monitorChanges();
}()
);
