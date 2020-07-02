/**
 * Function that will later have Add/Remove functionality
 * @param {JS event} event - expect click event
 */
function arButtonClick (event) 
{
    if (!event.target.matches('BUTTON')) return
    alert("hello");
}

/**
 * This adds a button to every row in the table
 * If the row already has a button, it skips that row
 * @param {HTML Object} OUs - List of OUs
 * @param {integer} numRows - Number of rows
 */
function addButtons(OUs, numRows)
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

(function()
{
    let tabl = document.querySelector('table[role=grid]');
    tabl.addEventListener('click',arButtonClick); //event delegation
}()
);
