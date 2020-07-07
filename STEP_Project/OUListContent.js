/**
 * Function that will later have Add/Remove functionality
 * @param {JS event} event - expect click event
 */
function addRemoveButtonClick (event) 
{
    if (event.target.getAttribute("class")!=='bClass') return;
}

/**
 * Adds a button to every visible row when the page is first loaded.
 * @param {HTML Object} tabl - contains OU rows
 */
function initButtons(tabl)
{
    let orgUnits = tabl.rows;
    let numOrgUnits = orgUnits.length;
    let numRows = numOrgUnits-1;
    addButtons(orgUnits,numRows);

    // This is to handle an edge case:
    // It deals with the last row in the table that doesn't actually correspond to an OU
    
    let row = orgUnits[numOrgUnits-1];
    const button = document.createElement('p');
    button.setAttribute('class','bClass');
    row.appendChild(button);
}

/**
 * This adds a button to every row in the table
 * If the row already has a button, it skips that row
 * @param {HTML Object} OUs - List of OUs
 * @param {integer} numRows - Number of rows
 */
function addButtons(orgUnits, numRows)
{
    //skip the first row as that's the heading row and does not represent an OU.
    for (let i = 1; i < numRows; i++) 
    {
        let row = orgUnits[i];
        let temp = row.getElementsByClassName('bClass');
        if (temp.length == 0)
        {
            const button = document.createElement('td');
            button.innerHTML = 'click me';
            button.setAttribute('class','bClass');
            row = orgUnits[i];
            row.appendChild(button);
        }
    }
}

/**
 * This function implements Mutation Observer
 * It checks if new OUs are visible and adds buttons to new rows if required
 */
function monitorChanges()
{
    let allRowNodes = document.querySelectorAll("tbody[role=rowgroup]");
    let rootNode = allRowNodes[0];

    let MutationObserver = window.MutationObserver;

    let observer = new MutationObserver(function(mutations) 
    {
        let tabl = document.querySelector('table[role=grid]');
        let orgUnits = tabl.rows;
        let numOrgUnits = orgUnits.length;

        addButtons(orgUnits,numOrgUnits);
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
    tabl.addEventListener('click',addRemoveButtonClick); //event delegation
    initButtons(tabl);
    monitorChanges();
}()
);
