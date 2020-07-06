
/**
 * testing function findPageType
 */
describe('Testing pageType that determines enabling/disabling of buttons depending on URL', ()=>{
  it('Should enable Settings button on appSettings url (case 1)', ()=>{
    let pageType = findPageType("https://admin.google.com/u/4/ac/appsettings/725740718362/videoSettings");
    expect(pageType).toEqual(1);
  })

  it('Should enable Settings button on settings/serviceonoff url (case 1)', ()=>{
    let pageType = findPageType("https://admin.google.com/u/4/ac/settings/serviceonoff?iid=646&aid=725740718362");
    expect(pageType).toEqual(1);
  })

  it('Should enable Settings button on appsettings url WITHOUT u/[num](case 1)', ()=>{
    let pageType = findPageType("https://admin.google.com/ac/appsettings/725740718362/videoSettings");
    expect(pageType).toEqual(1);
  })

  it('Should enable Add/Remove button on OUlist url (case 0)', ()=>{
    let pageType = findPageType("https://admin.google.com/u/4/ac/orgunits");
    expect(pageType).toEqual(0);
  })
  it('Should disable extension on any other admin console url (case 2)', ()=>{
    let pageType = findPageType("https://admin.google.com/u/4/ac/apps");
    expect(pageType).toEqual(2);
  })
  it('Should disable extension on any other console url (case 2)', ()=>{
    let pageType = findPageType("https://github.com/");
    expect(pageType).toEqual(2);
  })
})

/**
 * testing function disableButtons
 */
function initTest()
{
  const addRemoveButton = document.createElement('BUTTON')
  addRemoveButton.setAttribute("id", "addRemove");
  const selectButton = document.createElement('BUTTON')
  selectButton.setAttribute("id", "select");
  document.body.appendChild(addRemoveButton);
  document.body.appendChild(selectButton);
}

function restoreDOM()
{
  document.getElementById("select").remove();
  document.getElementById("addRemove").remove();
}

describe('Testing enabling and disabling of buttons depending on pageType', ()=>
{
  beforeEach(function() 
  {
    initTest();
    selectButton = document.getElementById("select");
    addRemoveButton = document.getElementById("addRemove");
  });

  afterEach(function() 
  {
    restoreDOM();
  });

  it('Should disable add/remove button on settings url for pageType 1', ()=>{ 
    disableButtons(selectButton, addRemoveButton, 1);
    expect(addRemoveButton.disabled).toBeTruthy();
  })

  it('Should disable select button on settings url for pageType 0', ()=>{ 
    disableButtons(selectButton, addRemoveButton, 0);
    expect(selectButton.disabled).toBeTruthy();
  })

  it('Should disable neither buttons for pageType 2 as any other url disables extension', ()=>{ 
    disableButtons(selectButton, addRemoveButton, 2);
    expect(selectButton.disabled).toBeFalsy();
    expect(addRemoveButton.disabled).toBeFalsy();
  })
})
