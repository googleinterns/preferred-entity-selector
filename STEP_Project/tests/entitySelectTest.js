let selectForm;
describe('Testing the identifyEntityClass function', ()=>
{
    let mockChrome;
    beforeEach(function()
    {
        mockChrome = 
        {
            dict: {},
            set : function(pair)
            {
                for (let key in pair)
                {
                    mockChrome.dict[key] = pair[key];
                }
            }
        };
        storageObj = mockChrome;
    });
    
    it('Should set entity-to-display in storage to button\'s id', ()=>
    {
        let newButton = document.createElement('button');
        newButton.setAttribute("id", "entityType");
        identifyEntityClass(newButton);
        newButton.click();
        expect(mockChrome.dict['entity-to-display']).toEqual("entityType");
    });
});
