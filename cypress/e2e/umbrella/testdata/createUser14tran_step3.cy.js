
describe("creating user account for iso 14001 transfer - 3rd step", function(){

    it("creating user account for iso 14001 transfer - 3rd step", function(){

        //1st step
        cy.visit("/");
        //cy.wait(2000);
        cy.get(".btn").click();
        cy.get("#ISO_14001_button").click();
        cy.get("#multiSite").find(".text").contains("No").click();
        cy.get("#hasCertificate_ISO_14001").find(".text").contains("Yes").click();
        cy.get('input[formcontrolname="firstName"]').type("FirstName14tran3step");
        cy.get('input[formcontrolname="lastName"]').type("LastName");
        cy.get('input[formcontrolname="jobTitle"]').type("JobTitle");
        cy.get('input[formcontrolname="email"]').type("autouser14tran-step3@qq.qq");
        cy.get('input[formcontrolname="phone"]').type("(512) 512 -  5122");
        cy.get('input[formcontrolname="companyName"]').type("Company14tran3step");
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
        //======additional transfer section - other cb and last audit event
        cy.get(".cb-select").find(".text").contains("other").click();
        cy.get(".other-cb").click();
        cy.get(".ng-dropdown-panel").find(".ng-option").contains("INTERTEK").click();
        cy.get("#current-certification-last-audit-event-radio-group").find(".text").contains("Recertification").click();
        //======
        cy.get('#company-description_-iso_14001').type("We do something");
        cy.get('#total-employeesiso_14001').type(2025);
        cy.get("#scope-description-needs-narrowing--iso_14001").find(".text").contains("Yes").click();
        cy.get('#company-scopes').click();
        cy.get(".ng-dropdown-panel-items").find("#item-2-iso_14001").click();
        cy.get("#part-time-employees-included-iso_14001").find(".text").contains("Yes").click({force: true});
        cy.get("#employees-count-description-iso_14001").type("1000");
        cy.get("#shifts_iso_14001").find(".text").contains("More").click();
        cy.get("#shifts-number-more_iso_14001").click().find(".ng-option-label").contains("8").click();
        /**/
        cy.get("#price-factor-performing_design-iso_14001").find(".text").contains("No").click();
        cy.get("#price-factor-translator_required-iso_14001").find(".text").contains("Yes").click();
        cy.get("#attached-question-translator_required-iso_14001-specify_language").type("Deutsch");
        cy.get("#price-factor-high_degree_of_regulation-iso_14001").find(".text").contains("No").click();
        cy.get("#price-factor-complex_process-iso_14001").find(".text").contains("Yes").click();
        cy.get("#price-factor-outsourcing_processes-iso_14001").find(".text").contains("No").click();
        cy.get("#price-factor-highly_automated_processes-iso_14001").find(".text").contains("Yes").click();
        cy.get("#price-factor-employees_working_off_location-iso_14001").find(".text").contains("No").click();
        cy.get("#price-factor-low_risk-iso_14001").find(".text").contains("Yes").click();
        /**/
        cy.get('.submit-button').click();
        cy.wait(1000);

        //3rd step
    })
})