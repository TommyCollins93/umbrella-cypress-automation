
describe("NOT A TEST - revert edit changes", function(){

    it("NOT A TEST - revert edit changes - 9001 initial 3rd step", function(){

        //this is only for test repeatability - preventing test errors

        //login
        cy.visit("https://stage-iso14001.myaudit.net/system/login");
        cy.get("#email").type("autouser9init-step3@qq.qq");
        cy.get("#password").type("Qqqqqq11");
        cy.get("button").contains("LOGIN").click();
        cy.wait(3000);

        //basic info revert
        cy.get("order-details").find("#toggle-order-details").click();
        cy.get("order-details").find("#change-button").click();
        //
        cy.get('input[formcontrolname="firstName"]').clear().type("FirstName9init3step");
        cy.get('input[formcontrolname="lastName"]').clear().type("LastName");
        cy.get('input[formcontrolname="jobTitle"]').clear().type("JobTitle");
        cy.get('input[formcontrolname="phone"]').clear().type("(512) 512 -  5122");
        cy.get('input[formcontrolname="companyName"]').clear().type("Company9init3step");
        cy.get('input[formcontrolname="street"]').clear().type("Street");
        cy.get('input[formcontrolname="city"]').clear().type("City");
        cy.get('company-address ng-select[formcontrolname="country"]').click()
        cy.get(".ng-dropdown-panel-items").find(".ng-option-label").contains("US").click();
        cy.get('company-address ng-select[formcontrolname="usState"]').click()
        cy.get(".ng-dropdown-panel-items").find(".ng-option-label").contains("Alaska").click();
        cy.get('input[formcontrolname="zipCode"]').clear().type("44555");
        //
        cy.get('#company-description_-iso_9001').clear().type("We do something");
        cy.get('#total-employeesiso_9001').clear().type("2025");
        cy.get("#scope-description-needs-narrowing--iso_9001").find(".text").contains("Yes").click();
        cy.get("#scope-selector-iso_9001").find(".ng-value-icon.left").click();
        cy.get('#company-scopes').click();
        cy.get(".ng-dropdown-panel-items").find("#item-2-iso_9001").click();
        cy.get("#catastrophic-risk-iso_9001").find(".text").contains("No").click({force: true}); //ISO 9001 related
        cy.get("#part-time-employees-included-iso_9001").find(".text").contains("Yes").click();
        cy.get("#employees-count-description-iso_9001").type("1000");
        cy.get("#shifts_iso_9001").find(".text").contains("More").click();
        cy.get("#shifts-number-more_iso_9001").click().find(".ng-option-label").contains("8").click();
        //
        cy.get("#price-factor-performing_design-iso_9001").find(".text").contains("No").click();
        cy.get("#price-factor-translator_required-iso_9001").find(".text").contains("Yes").click();
        cy.get("#attached-question-translator_required-iso_9001-specify_language").clear().type("Deutsch");
        cy.get("#price-factor-high_degree_of_regulation-iso_9001").find(".text").contains("No").click();
        cy.get("#price-factor-complex_process-iso_9001").find(".text").contains("Yes").click();
        cy.get("#price-factor-outsourcing_processes-iso_9001").find(".text").contains("No").click();
        cy.get("#price-factor-highly_automated_processes-iso_9001").find(".text").contains("Yes").click();
        cy.get("#price-factor-employees_working_off_location-iso_9001").find(".text").contains("No").click();
        cy.get("#price-factor-low_risk-iso_9001").find(".text").contains("Yes").click();
        //
        cy.get("basic-order-edit").find('#change-button').click();
        cy.wait(5000);
        cy.get("price-change-approve").find("#approve-changes-button").click();
        cy.wait(5000);
        cy.get(".order-card").find("#toggle-order-details").should("have.text", " Show ");
        cy.get(".order-card").find("#order-details").should("not.exist");
        cy.get(".order-card").find(".change-button.collapsed").should("exist");

    })

})