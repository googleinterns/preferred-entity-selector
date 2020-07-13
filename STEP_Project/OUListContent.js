let storageObj;
if (chrome.storage !== undefined)
{
    storageObj = chrome.storage.sync;
}

/**
 * Function that will later have Add/Remove functionality
 * @param {JS event} event - expect click event
 */
function addRemoveButtonClick (event) 
{
    let classname = event.target.getAttribute('class');
    if (classname !== 'pClass' && classname !== 'mClass')
    {
        return;
    }

    let row = event.target.parentElement;
    var dataid = row.getAttribute('data-row-id');

    if (classname === 'pClass')
    { 
        event.target.innerHTML = '-';
        event.target.setAttribute('class','mClass'); 
        let dataname = '';
        if (row === undefined || row.firstChild === undefined)
        {
            alert('error in DOM');
        }
        else if (row.children[0].children[0] !== undefined) //if there is an orgUnit tree in the DOM
        {
            dataname = row.children[0].children[0].children[0].children[1].innerHTML;
        }
        storageObj.set({[dataid]: dataname});
        return;
    }
    else
    {
        event.target.innerHTML = '+';
        event.target.setAttribute('class','pClass');
        storageObj.remove(dataid);
        return;
    }
}

/**
 * Adds a button to every visible row when the page is first loaded.
 * @param {HTML Object} tabl - contains orgUnit rows
 */
function initButtons(tabl)
{
    let orgUnits = tabl.rows;
    let numOrgUnits = orgUnits.length;
    
    // This is to handle an edge case:
    // It deals with the last row in the table that doesn't actually correspond to an orgUnit
    let row = orgUnits[numOrgUnits-1];
    const button = document.createElement('p');
    button.setAttribute('class','pClass');
    row.appendChild(button);

    addButtons();
}

/**
 * 
 * @param {dictionary} data - This is the collection of key-value pairs of preferred entities.
 */
function addButtonsToRows(data)
{
    let tabl = document.querySelector('table[role=grid]');
    let orgUnits = tabl.rows;
    let numOrgUnits = orgUnits.length;
    let numRows = numOrgUnits;
  
    //skip the first row as that's the heading row and does not represent an orgUnit.
    for (let i = 1; i < numRows; i++) 
    {
        let row = orgUnits[i];
        let plusButtons = row.getElementsByClassName('pClass');
        let minusButtons = row.getElementsByClassName('mClass');
        if (plusButtons.length === 0 && minusButtons.length === 0)
        {
            const button = document.createElement('td');
            let dataid = row.getAttribute('data-row-id');
            let dataname = data[dataid];
            button.setAttribute('class','pClass');
            if (dataname != undefined)
            {
                button.innerHTML = '-';
                button.setAttribute('class','mClass');
            }
            else
            {
                button.innerHTML = '+';
            }        
            row = orgUnits[i];
            row.appendChild(button);
        }
    }
}

/**
 * This adds a button to every row in the table
 * If the row already has a button, it skips that row
 */
function addButtons()
{
    storageObj.get(null, addButtonsToRows);
}

/**
 * This function implements Mutation Observer
 * It checks if new orgUnits are visible and adds buttons to new rows if required
 */
function monitorChanges()
{
    // let allRowNodes = document.querySelectorAll("tbody[role=rowgroup]");
    let allRowNodes = document.querySelectorAll('tbody');

    let rootNode = allRowNodes[0];

    let MutationObserver = window.MutationObserver;

    let observer = new MutationObserver(function(mutations) 
    {
        addButtons();
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
    let p = document.getElementsByClassName('pClass');
    let m = document.getElementsByClassName('mClass');
    if (p.length !== 0 || m.length !== 0)
    {
        return;
    }

    let tabl = document.querySelector('table[role=grid]');
    tabl.addEventListener('click',addRemoveButtonClick); //event delegation
    initButtons(tabl);
    monitorChanges();
}()
);
