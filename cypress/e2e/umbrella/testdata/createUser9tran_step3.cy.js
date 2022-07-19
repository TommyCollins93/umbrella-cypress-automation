
describe("creating user account for iso 9001 transfer - 3rd step", function(){

    it("creating user account for iso 9001 transfer - 3rd step", function(){

        //1st step
        cy.visit("/");
        //cy.wait(2000);
        cy.get(".btn").click();
        cy.get("#ISO_9001_button").click();
        cy.get("#multiSite").find(".text").contains("No").click();
        cy.get("#hasCertificate_ISO_9001").find(".text").contains("Yes").click();
        cy.get('input[formcontrolname="firstName"]').type("FirstName9tran3step");
        cy.get('input[formcontrolname="lastName"]').type("LastName");
        cy.get('input[formcontrolname="jobTitle"]').type("JobTitle");
        cy.get('input[formcontrolname="email"]').type("autouser9tran-step3@qq.qq");
        cy.get('input[formcontrolname="phone"]').type("(512) 512 -  5122");
        cy.get('input[formcontrolname="companyName"]').type("Company9tran3step");
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
        cy.get('#company-description_-iso_9001').type("We do something");
        cy.get('#total-employeesiso_9001').type(2025);
        cy.get("#scope-description-needs-narrowing--iso_9001").find(".text").contains("Yes").click();
        cy.get('#company-scopes').click();
        cy.get(".ng-dropdown-panel-items").find("#item-2-iso_9001").click();
        cy.get("#catastrophic-risk-iso_9001").find(".text").contains("No").click({force: true}); //ISO 9001 related
        cy.get("#part-time-employees-included-iso_9001").find(".text").contains("Yes").click();
        cy.get("#employees-count-description-iso_9001").type("1000");
        cy.get("#shifts_iso_9001").find(".text").contains("More").click();
        cy.get("#shifts-number-more_iso_9001").click().find(".ng-option-label").contains("8").click();
        /**/
        cy.get("#price-factor-performing_design-iso_9001").find(".text").contains("No").click();
        cy.get("#price-factor-translator_required-iso_9001").find(".text").contains("Yes").click();
        cy.get("#attached-question-translator_required-iso_9001-specify_language").type("Deutsch");
        cy.get("#price-factor-high_degree_of_regulation-iso_9001").find(".text").contains("No").click();
        cy.get("#price-factor-complex_process-iso_9001").find(".text").contains("Yes").click();
        cy.get("#price-factor-outsourcing_processes-iso_9001").find(".text").contains("No").click();
        cy.get("#price-factor-highly_automated_processes-iso_9001").find(".text").contains("Yes").click();
        cy.get("#price-factor-employees_working_off_location-iso_9001").find(".text").contains("No").click();
        cy.get("#price-factor-low_risk-iso_9001").find(".text").contains("Yes").click();
        /**/
        cy.get('.submit-button').click()
        cy.wait(2000);

        //3rd step
    })
})