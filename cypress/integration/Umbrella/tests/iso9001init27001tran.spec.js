//<reference types="Cypress" />
/**/

describe("9001 initial and 27001 transfer - sent to dekra", function(){

    it("happy path scenario", function(){

        //1st step
        cy.visit("/");
        //cy.wait(2000);
        cy.get(".btn").click();
        cy.get("#ISO_9001_button").click();
        cy.get("#ISO_27001_button").click();
        cy.get("#multiSite").find(".text").contains("No").click();
        cy.get("#hasCertificate_ISO_9001").find(".text").contains("No").click();
        cy.get("#hasCertificate_ISO_27001").find(".text").contains("Yes").click();
        cy.get('input[formcontrolname="firstName"]').type("FirstName");
        cy.get('input[formcontrolname="lastName"]').type("LastName");
        cy.get('input[formcontrolname="jobTitle"]').type("JobTitle");
        cy.get('input[formcontrolname="email"]').type("mail"+Math.random()+"@qq.qq");
        cy.get('input[formcontrolname="phone"]').type("(512) 512 -  5122");
        cy.get('input[formcontrolname="companyName"]').type("Company");
        cy.get('input[formcontrolname="street"]').type("Street");
        cy.get('input[formcontrolname="city"]').type("City");
        cy.get('company-address ng-select[formcontrolname="country"]').click()
        cy.get(".ng-dropdown-panel-items").find(".ng-option-label").contains("CA").click();
        cy.get('company-address ng-select[formcontrolname="usState"]').click()
        cy.get(".ng-dropdown-panel-items").find(".ng-option-label").contains("Newfoundland and Labrador").click();
        cy.get('input[formcontrolname="zipCode"]').type("q2w3e4");
        cy.get('#get-a-quote-button').click();
        cy.wait(2000);
        
        //2nd step
        //ISO 9001
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
        //copy function
        cy.get(".copy-button").click();
        //ISO 27001
        //======additional transfer section - other cb and last audit event
        cy.get(".cb-select").find(".text").contains("other").click();
        cy.get(".other-cb").click();
        cy.get(".ng-dropdown-panel").find(".ng-option").contains("INTERTEK").click();
        cy.get("#current-certification-last-audit-event-radio-group").find(".text").contains("Surveillance 1").click();
        /**/
        cy.get(".question-options").each(($random)=>{
            var i = Math.floor(Math.random() * 2);
            cy.get($random).find(".question-option").eq(i).click();
        });
        cy.get('#estimate-question-long_option_single_choice-iso_27001-previously_documented_performance_description').type('Some documented performance');
        cy.get('#estimate-question-long_option_single_choice-iso_27001-edit_rights_to_isms').contains("No").click();
        /**/
        cy.get('.submit-button').click();
        cy.wait(2000);

        //3rd step
        //ISO 9001
        cy.get("#target-pre-audit-date").click();
        for(let n = 0; n < 2; n ++){
            cy.get(".cdk-overlay-pane").find("g[data-name='chevron-right']").click();
        }
        cy.get(".cdk-overlay-pane").find(".day-cell").contains("15").click();
        cy.get(".custom-checkbox.checked").should("exist");

        cy.get("#target-stage1-audit-date").click();
        for(let n = 0; n < 2; n++){
            cy.get(".cdk-overlay-pane").find("g[data-name='chevron-right']").click();
        }
        cy.get(".cdk-overlay-pane").find(".day-cell").contains("16").click();

        cy.get("#target-stage2-audit-date").click();
        for(let n = 0; n < 2; n++){
            cy.get(".cdk-overlay-pane").find("g[data-name='chevron-right']").click();
        }
        cy.get(".cdk-overlay-pane").find(".day-cell").contains("17").click();
        /**/
        cy.get("[formcontrolname=outsourced_process_1ISO_9001]").click();
        cy.get("#binary-question-radio-0ISO_9001-iso_9001").find(".text").contains("No").click();
        cy.get("#binary-question-radio-1ISO_9001-iso_9001").find(".text").contains("Yes").click();
        cy.get("#binary-question-description-1ISO_9001-iso_9001").type("Not really");
        cy.get("#binary-question-radio-2ISO_9001-iso_9001").find(".text").contains("No").click();
        cy.get("#binary-question-radio-3ISO_9001-iso_9001").find(".text").contains("Yes").click();
        cy.get("#binary-question-description-3ISO_9001-iso_9001").type("Full name and company example");
        cy.get("#binary-question-radio-4ISO_9001-iso_9001").find(".text").contains("No").click();
        cy.get("#text-question-0ISO_9001-iso_9001").type("Alloy, gold");
        //copy function
        cy.get(".copy-button").click();
        //ISO 27001
        cy.get("#desired-next-audit-date").click();
        for(let n = 0 ; n < 2 ; n++){
            cy.get(".cdk-overlay-pane").find("g[data-name='chevron-right']").click()
        }
        cy.get(".cdk-overlay-pane").find(".day-cell").contains("17").click();

        cy.get("#transfer-reason-iso_27001-certificate").type("Some reason");
        cy.get("#isCurrentCertificationBodyAccredited-iso_27001-certificate").find(".text").contains("No").click();
        cy.get("#hasOpenNonConformities-iso_27001-certificate").find(".text").contains("Yes").click();
        cy.get("#hasCorrectiveActionPlans-iso_27001-certificate").find(".text").contains("No").click();
        cy.get("#major-non-conformities-iso_27001-certificate").click();
        cy.get(".ng-dropdown-panel-items").find(".ng-option").contains("50").click();
        cy.get("#minor-non-conformities-iso_27001-certificate").click();
        cy.get(".ng-dropdown-panel-items").find(".ng-option").contains("99").click();
        cy.get("#last-audit-performed-date").click();
        for(let n = 0 ; n < 2 ; n++){
            cy.get(".cdk-overlay-pane").find("g[data-name='chevron-left']").click();
        }
        cy.get(".cdk-overlay-pane").find(".day-cell").contains("15").click();
        cy.get("#expiration-date").click();
        for(let n=0 ; n<2 ; n++){
            cy.get(".cdk-overlay-pane").find("g[data-name='chevron-right']").click();
        }
        cy.get(".cdk-overlay-pane").find(".day-cell").contains("15").click();
        //
        cy.get('.submit-button').click();
        cy.wait(2000);

        //4th step
        cy.get("#read-and-accepted-checkbox").find(".custom-checkbox").click({force: true});
        cy.get("#terms-and-conditions-checkbox").find(".custom-checkbox").click({force: true});
        cy.get('.submit-button').click();
        cy.wait(2000);

        //5th step - ONLY TRANSFER - upload documents
        cy.get("[for='CERTIFICATE-upload-document-button']").selectFile('cypress/fixtures/pdf/Estimate-1retest5136.pdf');
        cy.get("[for='REPORTS-AND-NONCONFORMITIES-upload-document-button']").selectFile('cypress/fixtures/pdf/Estimate-1retest5121.pdf');
        cy.get("#get-a-quote-button").click();
        cy.wait(2000);

        //expected result - order page
        cy.url().should('include', '/under-review');
    })
})