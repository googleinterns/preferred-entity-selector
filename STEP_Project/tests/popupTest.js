/**
 * testing function findPagecase
 */
describe('Testing pageType that determines enabling/disabling of buttons depending on URL', ()=>{
  it('Should enable Settings button on appSettings url (case 1)', ()=>{
    let pageType = findPagecase("https://admin.google.com/u/4/ac/appsettings/725740718362/videoSettings");
    expect(pageType).toEqual(1);
  })

  it('Should enable Settings button on settings/serviceonoff url (case 1)', ()=>{
    let pageType = findPagecase("https://admin.google.com/u/4/ac/settings/serviceonoff?iid=646&aid=725740718362");
    expect(pageType).toEqual(1);
  })

  it('Should enable Add/Remove button on OUlist url (case 0)', ()=>{
    let pageType = findPagecase("https://admin.google.com/u/4/ac/orgunits");
    expect(pageType).toEqual(0);
  })
  it('Should disable extension on any other admin console url (case 2)', ()=>{
    let pageType = findPagecase("https://admin.google.com/u/4/ac/apps");
    expect(pageType).toEqual(2);
  })
  it('Should disable extension on any other console url (case 2)', ()=>{
    let pageType = findPagecase("https://github.com/");
    expect(pageType).toEqual(2);
  })
})

/**
 * testing function disableButtons
 */

describe('Testing enabling and disabling of buttons depending on pageType', ()=>{
  it('Should disable add/remove button on settings url for pageType 1', ()=>{ 
    let ar = document.getElementById("addRemove");
    let s = document.getElementById("select");
    disableButtons(s, ar, 1);
    expect(ar.disabled).toBeTruthy();
    ar.disabled = false; //back to default for future tests
  })
  it('Should disable select button on settings url for pageType 0', ()=>{ 
    let ar = document.getElementById("addRemove");
    let s = document.getElementById("select");
    disableButtons(s, ar, 0);
    expect(s.disabled).toBeTruthy();
    s.disabled = false; //back to default for future tests
  })
  it('Should disable neither buttons for pageType 2 as any other url disables extension', ()=>{ 
    let ar = document.getElementById("addRemove");
    let s = document.getElementById("select");
    disableButtons(s, ar, 2);
    expect(s.disabled).toBeFalsy();
    expect(ar.disabled).toBeFalsy();
    s.disabled = false; //back to default for future tests
    ar.disabled = false; //back to default for future tests
    ar.remove();
    s.remove();
  })
})

 

 
  
