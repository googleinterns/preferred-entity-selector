
describe('Testing the addButtons function', ()=>{
    it('Should not add a button to the first row', ()=>{
        let tabl = document.querySelector('table[role=grid]');
        let OUs = tabl.rows;
        let numRows = OUs.length;
        addButtons(tabl, OUs, numRows);
        let row = OUs[0];
        let temp = row.getElementsByClassName('bClass');
        expect(temp.length).toEqual(0);
    })
    it('Should add a button to any row that does not have a button except row 0', ()=>{
        let tabl = document.querySelector('table[role=grid]');
        let OUs = tabl.rows;
        let numRows = OUs.length;

        let row = OUs[1];
        let temp = row.getElementsByClassName('bClass');
        temp[0].remove();
        expect(temp.length).toEqual(0); 

        row = OUs[2];
        temp = row.getElementsByClassName('bClass');
        temp[0].remove();
        expect(temp.length).toEqual(0); 

        addButtons(tabl,OUs,numRows);

        row = OUs[1];
        temp = row.getElementsByClassName('bClass');
        expect(temp.length).toEqual(1); 

        row = OUs[2];
        temp = row.getElementsByClassName('bClass');
        expect(temp.length).toEqual(1); 
    })
})  
