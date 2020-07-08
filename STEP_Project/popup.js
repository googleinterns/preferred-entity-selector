var pageType = undefined;

/** Enum for page types. */
const PAGE_TYPES = {
  ORG_LIST_PAGE: 0,
  SETTINGS_PAGE: 1, // includes onoff page
  OTHER: 2,
};

(function()
{
  checkTabUrl();
  addRemoveButton = document.getElementById("addRemove");
  injectContent(addRemoveButton);
  let selectButton = document.getElementById("select");
  injectSelectContent(selectButton);
}()
);

/**
 * Checks url of the current tab to detect settings or OU list page
 * @param {string} givenurl - url of current page
 */
function findPageType(givenurl)
{
  let orgunitspage = givenurl.match(/admin.google.com\/(u\/[0-9]\/)?ac\/orgunits/g);
  let settingspage = givenurl.match(/admin.google.com\/(u\/[0-9]\/)?ac\/appsettings\/[0-9]+\/.+/g);
  let onoffpage = givenurl.match(/admin.google.com\/(u\/[0-9]\/)?ac\/settings\/serviceonoff.*/g);
  pageType = PAGE_TYPES.OTHER;
  if (orgunitspage !== null) 
  {
    pageType = PAGE_TYPES.ORG_LIST_PAGE;
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
    selectButton = document.getElementById("select");
    addRemoveButton = document.getElementById("addRemove");
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
  }

//OU list page case --> disable select
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
 * inject OUListContent.js into DOM on click of the add/remove button
 */
function addRemovefunc () 
{
    window.close()
    chrome.tabs.executeScript({
        file: 'OUListContent.js'
      }); 
}

/**
 * attach listener to select button
 * @param {button object} selectButton
 */
function injectSelectContent(selectButton)
{
  selectButton.addEventListener('click', selectFunc);     
}

/**
 * inject OUSelectContent.js into DOM on click of the select button
 */
function selectFunc() 
{
    chrome.tabs.executeScript({
        file: 'OUSelectContent.js'
      }); 
}
