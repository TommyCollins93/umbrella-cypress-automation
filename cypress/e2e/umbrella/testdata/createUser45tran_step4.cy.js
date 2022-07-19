describe("creating user account for iso 45001 transfer - 4th step", function(){
    
    it("creating user account for iso 45001 transfer - 4th step", function(){

        //1st step
        cy.visit("/");
        //cy.wait(2000);
        cy.get(".btn").click();
        cy.get("#ISO_45001_button").click();
        cy.get("#multiSite").find(".text").contains("No").click();
        cy.get("#hasCertificate_ISO_45001").find(".text").contains("Yes").click();
        cy.get('input[formcontrolname="firstName"]').type("FirstName45tran4step");
        cy.get('input[formcontrolname="lastName"]').type("LastName");
        cy.get('input[formcontrolname="jobTitle"]').type("JobTitle");
        cy.get('input[formcontrolname="email"]').type("autouser45tran-step4@qq.qq");
        cy.get('input[formcontrolname="phone"]').type("(512) 512 -  5122");
        cy.get('input[formcontrolname="companyName"]').type("Company45tran4step");
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
        /**/
        cy.get('#company-description_-iso_45001').type("We do something");
        cy.get('#total-employeesiso_45001').type(2025);
        cy.get("#scope-description-needs-narrowing--iso_45001").find(".text").contains("Yes").click();
        cy.get('#company-scopes').click();
        cy.get(".ng-dropdown-panel-items").find("#item-2-iso_45001").click();
        cy.get("#part-time-employees-included-iso_45001").find(".text").contains("Yes").click({force: true});
        cy.get("#employees-count-description-iso_45001").type("1000");
        cy.get("#shifts_iso_45001").find(".text").contains("More").click();
        cy.get("#shifts-number-more_iso_45001").click().find(".ng-option-label").contains("8").click();
        /**/
        cy.get("#price-factor-translator_required-iso_45001").find(".text").contains("Yes").click();
        cy.get("#attached-question-translator_required-iso_45001-specify_language").type("Deutsch");
        cy.get("#price-factor-high_degree_of_regulation-iso_45001").find(".text").contains("No").click();
        cy.get("#price-factor-complex_process-iso_45001").find(".text").contains("Yes").click();
        cy.get("#price-factor-dangerous_substances_present-iso_45001").find(".text").contains("No").click(); //ISO 45001
        cy.get('.submit-button').click();
        cy.wait(1000);

        //3rd step
        //======additional transfer section - next audit calendar, second box
        cy.get("#desired-next-audit-date").click();
        for(let n = 0 ; n < 2 ; n++){
            cy.get(".cdk-overlay-pane").find("g[data-name='chevron-right']").click()
        }
        cy.get(".cdk-overlay-pane").find(".day-cell").contains("17").click();
        cy.get("#transfer-reason-iso_45001-certificate").type("Some reason");
        cy.get("#isCurrentCertificationBodyAccredited-iso_45001-certificate").find(".text").contains("No").click();
        cy.get("#hasOpenNonConformities-iso_45001-certificate").find(".text").contains("Yes").click();
        cy.get("#hasCorrectiveActionPlans-iso_45001-certificate").find(".text").contains("No").click();
        cy.get("#major-non-conformities-iso_45001-certificate").click();
        cy.get(".ng-dropdown-panel-items").find(".ng-option").contains("50").click();
        cy.get("#minor-non-conformities-iso_45001-certificate").click();
        cy.get(".ng-dropdown-panel-items").find(".ng-option").contains("99").click();
        cy.get("#last-audit-performed-date").click();
        for(let n=0 ; n<2 ; n++){
            cy.get(".cdk-overlay-pane").find("g[data-name='chevron-left']").click();
        }
        cy.get(".cdk-overlay-pane").find(".day-cell").contains("15").click();
        cy.get("#expiration-date").click();
        for(let n=0 ; n<2 ; n++){
            cy.get(".cdk-overlay-pane").find("g[data-name='chevron-right']").click();
        }
        cy.get(".cdk-overlay-pane").find(".day-cell").contains("16").click();
        //======
        cy.get("[formcontrolname=outsourced_process_1ISO_45001]").click();
        cy.get("#binary-question-radio-0ISO_45001-iso_45001").find(".text").contains("No").click();
        cy.get("#binary-question-radio-1ISO_45001-iso_45001").find(".text").contains("Yes").click();
        cy.get("#binary-question-description-1ISO_45001-iso_45001").type("Not really");
        cy.get("#binary-question-radio-2ISO_45001-iso_45001").find(".text").contains("No").click();
        cy.get("#binary-question-radio-3ISO_45001-iso_45001").find(".text").contains("Yes").click();
        cy.get("#binary-question-description-3ISO_45001-iso_45001").type("Full name and company example");
        cy.get("#binary-question-radio-4ISO_45001-iso_45001").find(".text").contains("No").click();
        cy.get("#binary-question-radio-5ISO_45001-iso_45001").find(".text").contains("Yes").click(); //ISO 45001
        cy.get("#binary-question-radio-6ISO_45001-iso_45001").find(".text").contains("Yes").click(); //ISO 45001
        cy.get("#binary-question-radio-7ISO_45001-iso_45001").find(".text").contains("No").click(); //ISO 45001
        cy.get("#text-question-0ISO_45001-iso_45001").type("Alloy, gold.");
        cy.get("#text-question-1ISO_45001-iso_45001").type("Air, water, waste."); //ISO 45001
        cy.get("#text-question-2ISO_45001-iso_45001").type("None to list."); //ISO 45001
        cy.get('.submit-button').click();
        cy.wait(1000);

        //4th step
    })
})