
//Imports
const {random } = require('faker');

//Global variables
const book_test_1 ={
    name: random.words(1),
    author: random.words(1)
   //
} 
const {
    BASE_URL,
    TIME_OUT
 } = require('../../../utils/utils')

 //Tests
describe("When the user wants to delete a book in the app", () =>{
    before(()=>{
        cy.visit(BASE_URL);
        cy.get('.ant-btn-primary > .ng-star-inserted').click();
        cy.wait(TIME_OUT);
        cy.get("#name").type(book_test_1.name);
        cy.wait(TIME_OUT);
        cy.get("#author").type(book_test_1.author);
        cy.get('.ant-modal-footer > .ant-btn-primary > .ng-star-inserted').click();
        cy.contains('10 / page').click();
        cy.contains('50 / page').click();
        cy.get("table").contains('tr', book_test_1.name).invoke("index").then((i) =>{
            cy.get(`:nth-child(${i+1}) > .ant-table-selection-column > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input`).click();
        })
        cy.get('[nztype="default"]').click();

    })
    it("Then the book should not be listed with the name which name it was created", ()=>{
        cy.get('table').contains('td',book_test_1.name).should('not.exist');
    })
    it("Then the book should not be listed with the author which author it was created", ()=>{
        cy.get('table').contains('td',book_test_1.author).should('not.exist');
        //final test
    })

})