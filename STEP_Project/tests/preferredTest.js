/*global storageObj,applyFunc,createForm*/
/*eslint no-undef: "error"*/

let selectForm;
describe('Testing the createForm function', ()=>{
    beforeEach(function()
    {
        let mockTabs = 
        {
            active: null,
            lastFocusedWindow: null,
            dict: {active: true, lastFocusedWindow: true},
            tabs: [{url: 'https://admin.google.com/u/3/ac/users'}],
            query : function(arg1, arg2)
            {
                arg2(this.tabs);
            },
        };
        Tabs = mockTabs;

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

        let mockLocalChrome = 
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
                    mockLocalChrome.dict[key] = pair[key];
                }
            },
            remove : function(dataid)
            {
                this.dict[dataid] = undefined;
            }
        };
        localStorageObj = mockLocalChrome;

        selectForm = document.createElement('form');
        selectForm.setAttribute('id','radioButtons');
        document.body.appendChild(selectForm);
        selectForm = document.getElementById('radioButtons');

        //adding 6 items to storage
        storageObj.set({'OU-1': 'o1'});
        storageObj.set({'user-1': 'u1'});
        storageObj.set({'user-2': 'u2'});
        storageObj.set({'group-1': 'g1'});
        storageObj.set({'group-2': 'g2'});
        storageObj.set({'group-3': 'g3'});
    });

    afterEach(function()
    {
        document.getElementById('radioButtons').remove();
    });
    
    it('Should have as many valid OUs as in storage', ()=>{
        localStorageObj.set({'entity-to-display': 'OU'});
        createForm();

        let numValidItems = 0;
        for (let i = 0; i < selectForm.length; i++)
        {
            if (selectForm[i].parentElement.textContent != 'undefined')
            {
                numValidItems = numValidItems + 1;
            }
        }

        expect(numValidItems).toEqual(1);
    });

    it('Should have as many valid users as in storage', ()=>{
        localStorageObj.set({'entity-to-display': 'user'});
        createForm();

        let numValidItems = 0;
        for (let i = 0; i < selectForm.length; i++)
        {
            if (selectForm[i].parentElement.textContent != 'undefined')
            {
                numValidItems = numValidItems + 1;
            }
        }

        expect(numValidItems).toEqual(2);
    });

    it('Should have as many valid groups as in storage', ()=>{
        localStorageObj.set({'entity-to-display': 'group'});
        createForm();

        let numValidItems = 0;
        for (let i = 0; i < selectForm.length; i++)
        {
            if (selectForm[i].parentElement.textContent != 'undefined')
            {
                numValidItems = numValidItems + 1;
            }
        }

        expect(numValidItems).toEqual(3);
    });

    it('Should not add keys with undefined values/keys that have been removed to the form', ()=>{
        storageObj.remove('group-1');
        localStorageObj.set({'entity-to-display': 'group'});
        createForm();

        let numValidItems = 0;
        for (let i = 0; i < selectForm.length; i++)
        {
            if (selectForm[i].parentElement.textContent != 'undefined')
            {
                numValidItems = numValidItems + 1;
            }
        }
        expect(numValidItems).toEqual(2);
    });
});

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

        let mockLocalChrome = 
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
                    mockLocalChrome.dict[key] = pair[key];
                }
            },
            remove : function(dataid)
            {
                this.dict[dataid] = undefined;
            }
        };
        localStorageObj = mockLocalChrome;

        selectForm = document.createElement('form');
        selectForm.setAttribute('id','radioButtons');
        document.body.appendChild(selectForm);
        selectForm = document.getElementById('radioButtons');

        //adding 6 items to storage
        storageObj.set({'OU-1': 'o1'});
        storageObj.set({'user-1': 'u1'});
        storageObj.set({'user-2': 'u2'});
        storageObj.set({'group-1': 'g1'});
        storageObj.set({'group-2': 'g2'});
        storageObj.set({'group-3': 'g3'});

        let applyButton = document.createElement('button');
        applyButton.setAttribute('id','apply');
        document.body.appendChild(applyButton);
        applyButton = document.getElementById('apply');
        applyButton.disabled = true;
    });

    afterEach(function()
    {
        document.getElementById('radioButtons').remove();
        document.getElementById('apply').remove();
    });
    
    it('Should enable applyButton only after one of the radio buttons has been selected', ()=>{
        
        localStorageObj.set({'entity-to-display': 'user'});
        createForm();
        selectForm.addEventListener('click',function(e)
        {
            enableApplyButton();
        })
        let applyButton = document.getElementById('apply');
        expect(applyButton.disabled).toBeTruthy();
        selectForm.click();
        expect(applyButton.disabled).toBeTruthy();
        selectForm[0].checked = true;
        selectForm.click();
        expect(applyButton.disabled).toBeFalsy();        
    });
});

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

        let mockLocalChrome = 
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
                    mockLocalChrome.dict[key] = pair[key];
                }
            },
            remove : function(dataid)
            {
                this.dict[dataid] = undefined;
            }
        };
        localStorageObj = mockLocalChrome;

        selectForm = document.createElement('form');
        selectForm.setAttribute('id','radioButtons');
        document.body.appendChild(selectForm);
        selectForm = document.getElementById('radioButtons');

        //adding 6 items to storage
        storageObj.set({'OU-1': 'o1'});
        storageObj.set({'user-1': 'u1'});
        storageObj.set({'user-2': 'u2'});
        storageObj.set({'group-1': 'g1'});
        storageObj.set({'group-2': 'g2'});
        storageObj.set({'group-3': 'g3'});
    });

    afterEach(function()
    {
        document.getElementById('radioButtons').remove();
    });

    it('Should return the dataRowId of the chosen entity', ()=>{
        localStorageObj.set({'entity-to-display': 'user'});
        createForm();
        selectForm.addEventListener('click',function(e)
        {
            enableApplyButton();
        })

        selectForm[0].checked = true;
        let dataRowId = applyFunc();
        expect(dataRowId).toEqual('user-1');
    });
});
