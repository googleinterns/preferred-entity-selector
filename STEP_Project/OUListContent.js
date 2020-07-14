var storageObj;
if (chrome.storage !== undefined)
{
    storageObj = chrome.storage.sync;
}

/**
 * This function adds the selected entity to Chrome's storage
 * @param {HTML tr object} row Each row in the table of entities
 * @param {string} dataid The data-row-id for each entity
 */
function addEntity(row, dataid)
{
    event.target.innerHTML = '-';
    event.target.setAttribute('class','mClass'); 
    let dataname = ''; 
    var key = dataid; 

    //if DOM structure is not as expected
    if (row === undefined || row.firstChild === undefined)
    {
        alert('error in DOM');
    }

    //if entity is a group
    else if (row.getAttribute('data-group-name') !== null)
    {
        dataname = row.getAttribute('data-group-name');
        key = 'group-' + dataid;
    }

    //if entitiy is a user
    else if (row.getAttribute('data-url') !== null)
    {
        dataname = (row.children[1].children[1].children[0].children[1].children[0].getAttribute('title'));
        key = 'user-' + dataid;
    }

    //if entity is an OU
    else if (row.children[0].children[0] !== undefined) //if there is an entity tree in the DOM
    {
        dataname = row.children[0].children[0].children[0].children[1].innerHTML;
        key = 'OU-' + dataid;  
    }

    storageObj.set({[key]: dataname});
}

/**
 * This function removes the selected entity from Chrome's storage
 * @param {HTML tr object} row Each row in the table of entities
 * @param {string} dataid The data-row-id for each entity
 */
function removeEntity(row, dataid)
{
    event.target.innerHTML = '+';
    event.target.setAttribute('class','pClass');
    var key = dataid;
    
    //entity is a group
    if (row.getAttribute('data-group-name') !== null)
    {
        key = 'group-' + dataid;
    }

    //entity is a user
    else if (row.getAttribute('data-url') !== null)
    {
        key = 'user-' + dataid;
    }

    //entitiy is an OU
    else
    {
        key = 'OU-' + dataid;
    }
    
    storageObj.remove(key);
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
        addEntity(row, dataid);
    }

    else
    {
        removeEntity(row, dataid);
    }
}

/**
 * Adds +/- buttons to each row
 * @param {dictionary} data - This is the collection of key-value pairs of preferred entities.
 */
function addButtonsToRows(data)
{
    let tabl = document.querySelector('table[role=grid]');
    let entities = tabl.rows;
    let numEntities = entities.length;
    let numRows = numEntities;
  
    //skip the first row as that's the heading row and does not represent an entity.
    for (let i = 1; i < numRows; i++) 
    {
        let row = entities[i];
        let dataRowId = row.getAttribute('data-row-id');
        if (dataRowId === null)
        {
            continue;
        }
        
        let plusButtons = row.getElementsByClassName('pClass');
        let minusButtons = row.getElementsByClassName('mClass');
        if (plusButtons.length === 0 && minusButtons.length === 0)
        {
            const button = document.createElement('td');
            let dataid = row.getAttribute('data-row-id');
            let dataname;

            //entity is a group
            if (row.getAttribute('data-group-name') !== null)
            {
                dataname = data['group-' + dataid];
            }

            //entity is a user
            else if (row.getAttribute('data-url') !== null)
            {
                dataname = data['user-' + dataid];
            }

            //entity is an OU
            else
            {
                dataname = data['OU-' + dataid];
            }
            
            button.setAttribute('class','pClass');
            if (dataname !== undefined)
            {
                button.innerHTML = '-';
                button.setAttribute('class','mClass');
            }
            else
            {
                button.innerHTML = '+';
            }              
            row = entities[i];
            
            //hide unnecessary buttons
            if (row.lastChild !== null)
            {
                row.lastChild.style.opacity = 0;
                row.lastChild.style.pointerEvents = 'none';
            }
        
            //add +/- button to row
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
 * It checks if new entities are visible and adds buttons to new rows if required
 */
function monitorChanges()
{
    // let allRowNodes = document.querySelectorAll('tbody[role=rowgroup]');
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
    addButtons();
    monitorChanges();
}()
);
