
//Imports
const {random } = require('faker');
//Global variables
const book_test_1 ={
    name: random.words(1),
    author: random.words(1)
   
} 
const book_test_2 ={
    name: random.words(1),
    author: random.words(1) 
} 
const {
    BASE_URL,
    TIME_OUT
 } = require('../../../utils/utils')

describe("When the user wants to edit a book in the app", () =>{
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
        cy.get(`:nth-child(${i+1}) > :nth-child(4) > .ant-btn`).click();
     });

        cy.wait(TIME_OUT);
        cy.get("#name").clear().type(book_test_2.name);
        cy.wait(TIME_OUT);
        cy.get("#author").clear().type(book_test_2.author);    
        cy.get('.ant-modal-footer > .ant-btn-primary > .ng-star-inserted').click();    

    })
    after(() =>{
        cy.get("table").contains('tr', book_test_2.name).invoke("index").then((i) =>{
            cy.get(`:nth-child(${i+1}) > .ant-table-selection-column > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input`).click();
        })
        cy.get('[nztype="default"]').click();
    });

    it("Then the book updated should have the new name", ()=>{
        cy.get('table').contains('td', book_test_2.name).should('be.visible');
    })

    it("Then the book updated should have the new author", ()=>{
        cy.get('table').contains('td', book_test_2.author).should('be.visible');
    })

    it("Then the book with the previous name should not exist in the app", ()=>{
        cy.get('table').contains('td', book_test_1.name).should('not.exist');
    })


})
//
describe("When the user wants to cancel the edition of a book in the app", () =>{
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
            cy.get(`:nth-child(${i+1}) > :nth-child(4) > .ant-btn`).click();
        });
        cy.wait(TIME_OUT);
        cy.get("#name").clear().type(book_test_2.name);
        cy.wait(TIME_OUT);
        cy.get("#author").clear().type(book_test_2.author);    
        cy.get('.ant-modal-footer > [nztype="default"] > .ng-star-inserted').click();   
    });

    after(() =>{
        cy.get("table").contains('tr', book_test_1.name).invoke("index").then((i) =>{
            cy.get(`:nth-child(${i+1}) > .ant-table-selection-column > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input`).click();
        })
        cy.get('[nztype="default"]').click();
    });

    it("Then the book with the current name should exist in the app", ()=>{
        cy.get('table').contains('td', book_test_1.name).should('be.visible');
    })

    it("Then the book with the current author should exist in the app", ()=>{
        cy.get('table').contains('td', book_test_1.author).should('be.visible');
    })

});
describe("When the user wants to edit a book without author in the app", () =>{
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
            cy.get(`:nth-child(${i+1}) > :nth-child(4) > .ant-btn`).click();
        });
        cy.wait(TIME_OUT);
        cy.get("#name").clear().type(book_test_2.name);
        cy.wait(TIME_OUT);
        cy.get("#author").clear();   

    });
    after(() =>{
        cy.get('.ant-modal-footer > [nztype="default"] > .ng-star-inserted').click(); 
        cy.get("table").contains('tr', book_test_1.name).invoke("index").then((i) =>{
        cy.get(`:nth-child(${i+1}) > .ant-table-selection-column > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input`).click();
        })
        cy.get('[nztype="default"]').click();
    });

    it("Then the Save button should be disabled", ()=>{
        cy.get('.ant-modal-footer > .ant-btn-primary').should("be.disabled");
    })
});

describe("When the user wants to edit a book without name in the app", () =>{
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
            cy.get(`:nth-child(${i+1}) > :nth-child(4) > .ant-btn`).click();
        });
        cy.wait(TIME_OUT);
        cy.get("#name").clear();
        cy.wait(TIME_OUT);
        cy.get("#author").clear().type(book_test_2.author);   
    });

    after(() =>{
        cy.get('.ant-modal-footer > [nztype="default"] > .ng-star-inserted').click(); 
        cy.get("table").contains('tr', book_test_1.name).invoke("index").then((i) =>{
        cy.get(`:nth-child(${i+1}) > .ant-table-selection-column > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input`).click();
        })
        cy.get('[nztype="default"]').click();
    });

    it("Then the Save button should be disabled", ()=>{
        cy.get('.ant-modal-footer > .ant-btn-primary').should("be.disabled");
    }) 
})