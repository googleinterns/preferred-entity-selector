var pageType = undefined;
var storageObj;
var testFlag = 'testing';
if (chrome.storage !== undefined)
{
    storageObj = chrome.storage.sync;
    testFlag = 'browswer';
}

/** Enum for page types. */
const PAGE_TYPES = {
    ORG_LIST_PAGE: 0,
    SETTINGS_PAGE: 1, // includes onoff page
    OTHER: 2,
};

(function()
{
    if (testFlag != 'testing')
    {
        checkTabUrl();
        let addRemoveButton = document.getElementById('addRemove');
        injectContent(addRemoveButton);
        let selectButton = document.getElementById('select');
        selectListener(selectButton);
        updateNames();
    }
}()
);

/**
 * This function fetches the pages for each user and group in chrome's storage and checks name
 * The name is then updated in chrome's storage, thus reflecting renamed entities.
 */
function updateNames()
{
    storageObj.get(null, function (data) 
    {
        const keys = Object.keys(data);
        for (let i = 0; i < keys.length; i++)
        {
            var entityType = keys[i].split('-')[0];
            if (entityType === 'OU')
            {
                continue;   //OUs do not have their own pages
            }

            var dataId = keys[i].split('-')[1];
            var fetchLink = 'https://admin.google.com/ac/' + entityType + 's/' + dataId;
            fetch(fetchLink).then(r => 
            {
                return r.text();
            }).then(result => 
            {
                const dp = new DOMParser();
                const dom = dp.parseFromString(result, 'text/html');
                let cwiz = dom.getElementsByTagName('c-wiz');
                let error = dom.getElementById('af-error-container');//present in 404/500 page
                if(error !== null)
                {
                    storageObj.remove(keys[i]);//entity must be removed as it has been deleted
                }
                else
                {
                    var dataname = cwiz[3].firstChild.firstChild.children[1].children[1].firstChild.firstChild.innerText;
                    storageObj.set({[keys[i]]: dataname});
                }
            });
        }
    });
}

/**
 * Checks url of the current tab to detect settings or entity list page
 * @param {string} givenurl - url of current page
 */
function findPageType(givenurl)
{
    let entitypage = givenurl.match(/admin.google.com\/(u\/[0-9]\/)?ac\/(orgunits)|(users)|(groups)/g);
    let settingspage = givenurl.match(/admin.google.com\/(u\/[0-9]\/)?ac\/appsettings\/[0-9]+\/.+/g);
    let onoffpage = givenurl.match(/admin.google.com\/(u\/[0-9]\/)?ac\/settings\/serviceonoff.*/g);
    pageType = PAGE_TYPES.OTHER;

    if (entitypage !== null)
    {
        pageType = PAGE_TYPES.ORG_LIST_PAGE;

        let entityPageOU = givenurl.match(/admin.google.com\/(u\/[0-9]\/)?ac\/orgunits/g);
        let entityPageUser = givenurl.match(/admin.google.com\/(u\/[0-9]\/)?ac\/users/g);
        let entityPageGroup = givenurl.match(/admin.google.com\/(u\/[0-9]\/)?ac\/groups/g);

        let addRemoveButton = document.getElementById('addRemove');

        if (entityPageOU !== null)
        {
            addRemoveButton.innerHTML = 'ADD/REMOVE PREFERRED ORG UNITS';
        }
        else if (entityPageUser !== null)
        {
            addRemoveButton.innerHTML = 'ADD/REMOVE PREFERRED USERS';
        }
        else if (entityPageGroup !== null)
        {
            addRemoveButton.innerHTML = 'ADD/REMOVE PREFERRED GROUPS';
        }
    }
    else if (settingspage !== null || onoffpage !== null)
    {
        pageType = PAGE_TYPES.SETTINGS_PAGE;
    }
    return pageType;
}

/**
 * Asynchronous function, calls waitForPagecase for value to be defined
 */
function checkTabUrl()
{
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs =>
    {
        let url = tabs[0].url;
        findPageType(url);
    });
    waitForPagecase();
}

/**
 * waits for pageType to become defined
 * once value is defined, calls "disableButtons" to disable based on url
 */
function waitForPagecase()
{
    if( pageType === undefined)
    {
        setTimeout(waitForPagecase, 50);
    }
    else
    {
        let selectButton = document.getElementById('select');
        let addRemoveButton = document.getElementById('addRemove');
        disableButtons(selectButton, addRemoveButton, pageType);
    }
}

/**
 * disable select or add/remove button based on url
 * if neither url matches, background.js disables the extension.
 * @param {button object} selectButton - the select button
 * @param {button object} addRemoveButton - the add/remove button
 * @param {integer} pageType - type of page user is on
 */
function disableButtons(selectButton, addRemoveButton, pageType)
{

    //Settings page case --> disable Add/Remove
    if (pageType === PAGE_TYPES.SETTINGS_PAGE)
    {
        if(addRemoveButton !== null)
        {
            addRemoveButton.classList.add('disabled');
            addRemoveButton.disabled = true;
        }
        const buttonLink = document.createElement('a');
        buttonLink.setAttribute('href', 'entitySelect.html');
        selectButton.parentElement.appendChild(buttonLink);
        buttonLink.appendChild(selectButton);
    }

    //entity list page case --> disable select
    if (pageType === PAGE_TYPES.ORG_LIST_PAGE)
    {
        if(selectButton !== null)
        {
            selectButton.classList.add('disabled');
            selectButton.disabled = true;
        }
    }
}

/**
 * attach listener to add/remove button
 * @param {button object} addRemoveButton - add/remove button
 */
function injectContent(addRemoveButton)
{
    addRemoveButton.addEventListener('click', addRemovefunc);
}

/**
 * inject entityListContent.js into DOM on click of the add/remove button
 */
function addRemovefunc () 
{
    window.close();
    chrome.tabs.executeScript({
        file: 'entityListContent.js'
    });
}

/**
 * attach listener to select button
 * @param {button object} selectButton
 */
function selectListener(selectButton)
{
    selectButton.addEventListener('click', selectFunc);
}

/**
 * inject entitySelectContent.js into DOM on click of the select button
 */
function selectFunc() 
{
    chrome.tabs.executeScript({
        file: 'entitySelectContent.js'
    });
}
