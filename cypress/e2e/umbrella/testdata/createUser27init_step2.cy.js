
describe("creating user account for iso 27001 initial - 2nd step", function(){

    it("creating user account for iso 27001 initial - 2nd step", function(){

        //1st step
        cy.visit("/");
        //cy.visit("https://stage.audits-iso9001.dekra.us/")
        cy.get(".btn").click();
        cy.get("#ISO_27001_button").click();
        cy.get("#multiSite").find(".text").contains("No").click();
        cy.get("#hasCertificate_ISO_27001").find(".text").contains("No").click();
        cy.get('input[formcontrolname="firstName"]').type("FirstName27init2step");
        cy.get('input[formcontrolname="lastName"]').type("LastName");
        cy.get('input[formcontrolname="jobTitle"]').type("JobTitle");
        cy.get('input[formcontrolname="email"]').type("autouser27init-step2@qq.qq");
        cy.get('input[formcontrolname="phone"]').type("(512) 512 -  5122");
        cy.get('input[formcontrolname="companyName"]').type("Company27init2step");
        cy.get('input[formcontrolname="street"]').type("Street");
        cy.get('input[formcontrolname="city"]').type("City");
        cy.get('company-address ng-select[formcontrolname="country"]').click()
        cy.get(".ng-dropdown-panel-items").find(".ng-option-label").contains("US").click();
        cy.get('company-address ng-select[formcontrolname="usState"]').click()
        cy.get(".ng-dropdown-panel-items").find(".ng-option-label").contains("Alaska").click();
        cy.get('input[formcontrolname="zipCode"]').type("44555");
        cy.get('#get-a-quote-button').click();
        cy.wait(1000);
        
        //2nd step
    });
})