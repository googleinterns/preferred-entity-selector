var selectForm;
describe('Testing the identifyEntityClass function', ()=>
{
    beforeEach(function()
    {
        let mockLocalChrome = 
        {
            dict: {},
            set : function(pair)
            {
                for (let key in pair)
                {
                    mockLocalChrome.dict[key] = pair[key];
                }
            }
        };
        localStorageObj = mockLocalChrome;
    });
    
    it('Should set entity-to-display in storage to button\'s id', ()=>
    {
        let newButton = document.createElement('button');
        newButton.setAttribute("id", "entityType");
        identifyEntityClass(newButton);
        newButton.click();
        expect(localStorageObj.dict['entity-to-display']).toEqual("entityType");

    });
});
