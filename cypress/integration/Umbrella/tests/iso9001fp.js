//<reference types="Cypress" />
/**/

describe("9001 initial to 1st step", function(){

    it("fail path scenario", function(){

        //0 step
        cy.visit("https://stage-iso14001.myaudit.net/");
        cy.wait(2000);
        cy.get(".btn").click();
        cy.get("#ISO_9001_button").click();
        cy.get("#multiSite").find(".text").contains("No").click();
        cy.get("#hasCertificate_ISO_9001").find(".text").contains("No").click();
        cy.get('input[formcontrolname="firstName"]').type("FirstName");
        cy.get('input[formcontrolname="lastName"]').type("LastName");
        cy.get('input[formcontrolname="jobTitle"]').type("JobTitle");
        cy.get('input[formcontrolname="email"]').type("mail"+Math.random()+"@qq.qq");
        cy.get('input[formcontrolname="phone"]').type("(512) 512 -  5122");
        cy.get('input[formcontrolname="companyName"]').type("Company");
        cy.get('input[formcontrolname="street"]').type("Street");
        cy.get('input[formcontrolname="city"]').type("City");
        cy.get('company-address ng-select[formcontrolname="country"]').click()
        cy.get(".ng-dropdown-panel-items").find(".ng-option-label").contains("US").click();
        cy.get('company-address ng-select[formcontrolname="usState"]').click()
        cy.get(".ng-dropdown-panel-items").find(".ng-option-label").contains("Alaska").click();
        cy.get('input[formcontrolname="zipCode"]').type("44555");
        cy.get('#get-a-quote-button').click();
        cy.wait(1000);
        //fail result
        cy.url().should('include', '/under-review')

    })
})