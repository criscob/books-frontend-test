
//Imports
const {random } = require('faker');
const book_test_1 ={
    author: random.words(1),
    name: random.words(1)
} 
//Global variables
const book_test_2 = {
    author: random.words(1),
    name:random.words(1)
}  
const {
    BASE_URL,
    TIME_OUT
 } = require('../../../utils/utils')

 //Tests
describe("When the user wants to create a new book in the app", () =>{
    before(() =>{
        cy.visit(BASE_URL);
        cy.get('.ant-btn-primary > .ng-star-inserted').click();
        cy.wait(TIME_OUT)
        cy.get("#name").type(book_test_1.name);
        cy.wait(TIME_OUT)
        cy.get("#author").type(book_test_1.author);
        cy.get('.ant-modal-footer > .ant-btn-primary > .ng-star-inserted').click();
        cy.contains('10 / page').click();
        cy.contains('50 / page').click();
    });

    after(() =>{
        cy.get("table").contains('tr', book_test_1.name).invoke("index").then((i) =>{
        cy.get(`:nth-child(${i+1}) > .ant-table-selection-column > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input`).click();
        })
        cy.get('[nztype="default"]').click();
    });
    
    it("Then the book should be listed with the name", () =>{
        cy.get('table').contains('td', book_test_1.name).should('be.visible');

    });

    it("Then the book should be listed with the author", () =>{
        cy.get('table').contains('td', book_test_1.author).should('be.visible');
    });

});

describe("When the user wants to cancel add a book", () =>{
    before(() =>{
        cy.visit(BASE_URL);
        cy.get('.ant-btn-primary > .ng-star-inserted').click();
        cy.wait(TIME_OUT)
        cy.get("#name").type(book_test_2.name);
        cy.wait(TIME_OUT)
        cy.get("#author").type(book_test_2.author);
        cy.get('.ant-modal-footer > [nztype="default"] > .ng-star-inserted').click();
        cy.contains('10 / page').click();
        cy.contains('50 / page').click();


    });

    it("Then the book should not be listed with the name", () =>{
        cy.get('table').contains('td', book_test_2.name).should('not.exist');
    });

    it("Then the book should not be listed with the author", () =>{
        cy.get('table').contains('td', book_test_2.author).should('not.exist');
    });

});

describe("When the user wants to create a book without name field", () =>{
    before(() =>{
        cy.visit(BASE_URL);
        cy.get('.ant-btn-primary > .ng-star-inserted').click();
        cy.wait(TIME_OUT)
        cy.get("#name").type(book_test_1.name); 
    });

    it("Then the Save button should be disabled", () =>{
        cy.get('.ant-modal-footer > .ant-btn-primary').should("be.disabled");
    });
    

});

describe("When the user wants to create a book without author field", () =>{
    
    before(() =>{
        cy.visit(BASE_URL);
        cy.get('.ant-btn-primary > .ng-star-inserted').click();
        cy.wait(TIME_OUT)
        cy.get("#author").type(book_test_1.author);
    });

    it("Then the Save button should be disabled", () =>{
        cy.get('.ant-modal-footer > .ant-btn-primary').should("be.disabled");
        cy.get('.ant-modal-footer > [nztype="default"]').click();
    });
    //fin

});
