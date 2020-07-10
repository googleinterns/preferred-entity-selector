let selectForm;
describe('Testing the createForm function', ()=>{
    beforeEach(function()
    {
        let mockChrome = 
        {
            dict: {},
            get : function(arg1, arg2)
            {
                arg2(this.dict);
            },
            set : function(pair)
            {
                for (let key in pair)
                {
                    mockChrome.dict[key] = pair[key];
                }
            },
            remove : function(dataid)
            {
                this.dict[dataid] = undefined;
            }
        };
        storageObj = mockChrome;

        selectForm = document.createElement('form');
        selectForm.setAttribute('id','radioButtons');
        document.body.appendChild(selectForm);
        selectForm = document.getElementById('radioButtons');

        //adding three items to storage
        storageObj.set({1: 'org1'});
        storageObj.set({2: 'org2'});
        storageObj.set({3: 'org3'});
    })

    afterEach(function()
    {
        document.getElementById('radioButtons').remove();
    })
    
    it('Should have as many valid items as in storage', ()=>{
        createForm();

        numValidItems = 0;
        for (let i = 0; i < selectForm.length; i++)
        {
            if (selectForm[i].parentElement.textContent != 'undefined')
            {
                numValidItems = numValidItems + 1;
            }
        }

        expect(numValidItems).toEqual(3);
    })

    it('Should not add keys with undefined values/keys that have been removed to the form', ()=>{
        storageObj.remove(1);
        createForm();

        numValidItems = 0;
        for (let i = 0; i < selectForm.length; i++)
        {
            if (selectForm[i].parentElement.textContent != 'undefined')
            {
                numValidItems = numValidItems + 1;
            }
        }

        expect(numValidItems).toEqual(2);
    })
})

describe('Testing the enableApplyButton function', ()=>{
    beforeEach(function()
    {
        let mockChrome = 
        {
            dict: {},
            get : function(arg1, arg2)
            {
                arg2(this.dict);
            },
            set : function(pair)
            {
                for (let key in pair)
                {
                    mockChrome.dict[key] = pair[key];
                }
            },
            remove : function(dataid)
            {
                this.dict[dataid] = undefined;
            }
        };
        storageObj = mockChrome;

        selectForm = document.createElement('form');
        selectForm.setAttribute('id','radioButtons');
        document.body.appendChild(selectForm);
        selectForm = document.getElementById('radioButtons');

        //adding three items to storage
        storageObj.set({1: 'org1'});
        storageObj.set({2: 'org2'});
        storageObj.set({3: 'org3'});

        let applyButton = document.createElement('button');
        applyButton.setAttribute('id','apply');
        document.body.appendChild(applyButton);
        applyButton = document.getElementById("apply");
        applyButton.disabled = true;
    })

    afterEach(function()
    {
        document.getElementById('radioButtons').remove();
        document.getElementById('apply').remove();
    })
    
    it('Should enable applyButton only after one of the radio buttons has been selected', ()=>{
        
        createForm();
        let applyButton = document.getElementById("apply");
        expect(applyButton.disabled).toBeTruthy();
        selectForm.click();
        expect(applyButton.disabled).toBeTruthy();
        selectForm[0].checked = true;
        selectForm.click();
        expect(applyButton.disabled).toBeFalsy();        
    })
})

describe('Testing the applyFunc function', ()=>{
    beforeEach(function()
    {
        let mockChrome = 
        {
            dict: {},
            get : function(arg1, arg2)
            {
                arg2(this.dict);
            },
            set : function(pair)
            {
                for (let key in pair)
                {
                    mockChrome.dict[key] = pair[key];
                }
            },
            remove : function(dataid)
            {
                this.dict[dataid] = undefined;
            }
        };
        storageObj = mockChrome;

        selectForm = document.createElement('form');
        selectForm.setAttribute('id','radioButtons');
        document.body.appendChild(selectForm);
        selectForm = document.getElementById('radioButtons');

        //adding three items to storage
        storageObj.set({1: 'org1'});
        storageObj.set({2: 'org2'});
        storageObj.set({3: 'org3'});
    })

    afterEach(function()
    {
        document.getElementById('radioButtons').remove();
    })

    it('Should return the dataRowId of the chosen entity', ()=>{
        createForm();
        selectForm[0].checked = true;

        let dataRowId = applyFunc();

        expect(dataRowId).toEqual('1');
    })
})
