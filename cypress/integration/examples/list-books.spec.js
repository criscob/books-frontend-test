
//Imports

//Global variables
const book_test_1 ={
    name: "authordetele",
    author: "testbookdelete"
   
} 
const {
    BASE_URL
 } = require('../../../utils/utils')
describe("When the user wants to list all the books", () =>{
    before(()=>{
        cy.visit(BASE_URL);
    });
    it("There is not empty",() =>{
        cy.get('table').find('tr').should('have.length.greaterThan', 0);
    });

})