
describe("NOT A TEST - revert edit changes", function(){

    it("NOT A TEST - revert edit changes - 27001 transfer 4th step", function(){

        //this is only for test repeatability - preventing test errors
        
        //login
        cy.visit("https://stage-iso14001.myaudit.net/system/login");
        cy.get("#email").type("autouser27tran-step4@qq.qq");
        cy.get("#password").type("Qqqqqq11");
        cy.get("button").contains("LOGIN").click();
        cy.wait(3000);

        //billing info revert
        cy.get("#billing-details").find("#change-button").click();
        cy.get("nb-toggle[formcontrolname='sameCompanyAndContactPersonAsProvided']").find(".toggle").click();
        cy.get("nb-radio-group[formcontrolname='isPurchaseNumberRequiredForPayment']").find(".text").contains("No").click();
        cy.get("#additionalInformation-").clear();
        cy.get("#billing-details").find("#change-button").click();

        //basic info revert
        cy.get("order-details").find("#toggle-order-details").click();
        cy.get("order-details").find("#change-button").click();
        //
        cy.get("basic-order-edit").find('input[formcontrolname="firstName"]').clear().type("FirstName27tran4step");
        cy.get("basic-order-edit").find('input[formcontrolname="lastName"]').clear().type("LastName");
        cy.get("basic-order-edit").find('input[formcontrolname="jobTitle"]').clear().type("JobTitle");
        cy.get("basic-order-edit").find('input[formcontrolname="phone"]').clear().type("(512) 512 -  5122");
        cy.get("basic-order-edit").find('input[formcontrolname="companyName"]').clear().type("Company27tran4step");
        cy.get("basic-order-edit").find('input[formcontrolname="street"]').clear().type("Street");
        cy.get("basic-order-edit").find('input[formcontrolname="city"]').clear().type("City");
        cy.get('company-address ng-select[formcontrolname="country"]').click()
        cy.get(".ng-dropdown-panel-items").find(".ng-option-label").contains("US").click();
        cy.get('company-address ng-select[formcontrolname="usState"]').click()
        cy.get(".ng-dropdown-panel-items").find(".ng-option-label").contains("Alaska").click();
        cy.get("basic-order-edit").find('input[formcontrolname="zipCode"]').clear().type("44555");
        //
        cy.get(".other-cb").click();
        cy.get(".ng-dropdown-panel").find(".ng-option").contains("INTERTEK").click();
        cy.get("#current-certification-last-audit-event-radio-group").find(".text").contains("Surveillance 1").click();
        //
        cy.get('#company-description_-iso_27001').clear().type("We do something");
        cy.get('#total-employeesiso_27001').clear().type("2025");
        cy.get("#scope-description-needs-narrowing--iso_27001").find(".text").contains("Yes").click();
        cy.get("#part-time-employees-included-iso_27001").find(".text").contains("Yes").click({force: true});
        cy.get("#employees-count-description-iso_27001").type("1000");
        cy.get("#shifts_iso_27001").contains("Two").click();
        //
        cy.get(".question-options").each(($random)=>{
            var i = Math.floor(Math.random() * 2);
            cy.get($random).find(".question-option").eq(i).click();
        });
        cy.get('#estimate-question-long_option_single_choice-iso_27001-previously_documented_performance_description').clear().type('Some documented performance');
        cy.get('#estimate-question-long_option_single_choice-iso_27001-edit_rights_to_isms').contains("Yes").click();
        //
        cy.get("basic-order-edit").find('#change-button').click();
        cy.wait(5000);
        cy.get("price-change-approve").find("#approve-changes-button").click();
        cy.wait(5000);
        cy.get(".order-card").find("#toggle-order-details").should("have.text", " Show ");
        cy.get(".order-card").find("#order-details").should("not.exist");
        cy.get(".order-card").find(".change-button.collapsed").should("exist");

        //additional info revert
        cy.get("#desired-next-audit-date").click();
        cy.wait(400);
        for(let n = 0 ; n < 2 ; n++){
            cy.get(".cdk-overlay-pane").find("g[data-name='chevron-right']").click()
        }
        cy.get(".cdk-overlay-pane").find(".day-cell").contains("17").click();
        cy.get("#transfer-reason-iso_27001-certificate").clear().type("Some reason");
        cy.get("#isCurrentCertificationBodyAccredited-iso_27001-certificate").find(".text").contains("No").click();
        cy.get("#hasOpenNonConformities-iso_27001-certificate").find(".text").contains("Yes").click();
        cy.get("#hasCorrectiveActionPlans-iso_27001-certificate").find(".text").contains("No").click();
        cy.get("#major-non-conformities-iso_27001-certificate").click();
        cy.get(".ng-dropdown-panel-items").find(".ng-option").contains("50").click();
        cy.get("#minor-non-conformities-iso_27001-certificate").click();
        cy.get(".ng-dropdown-panel-items").find(".ng-option").contains("99").click();
        cy.get("#last-audit-performed-date").click();
        cy.wait(400);
        cy.get(".cdk-overlay-pane").find(".day-cell").contains("15").click();
        cy.get("#expiration-date").click();
        cy.wait(400);
        cy.get(".cdk-overlay-pane").find(".day-cell").contains("16").click();
        //
        cy.get("[formcontrolname=outsourced_process_1ISO_27001]").click();
        cy.get("[formcontrolname=outsourced_process_0ISO_27001]").click();
        cy.get("[formcontrolname=outsourced_process_2ISO_27001]").click();
        cy.get("#binary-question-radio-0ISO_27001-iso_27001").find(".text").contains("No").click();
        cy.get("#binary-question-radio-1ISO_27001-iso_27001").find(".text").contains("Yes").click();
        cy.get("#binary-question-description-1ISO_27001-iso_27001").clear().type("Not really");
        cy.get("#binary-question-radio-2ISO_27001-iso_27001").find(".text").contains("No").click();
        cy.get("#binary-question-radio-3ISO_27001-iso_27001").find(".text").contains("Yes").click();
        cy.get("#binary-question-description-3ISO_27001-iso_27001").clear().type("Full name and company example");
        cy.get("#binary-question-radio-4ISO_27001-iso_27001").find(".text").contains("No").click();
        //
        cy.get("additional-questions-edit").find("#change-button").click();
        cy.wait(5000);
        cy.get(".additional-questions-card").find("#toggle-order-details").should("have.text", " Show ");
        cy.get(".additional-questions-card").find("#order-details").should("not.exist");
        cy.get(".additional-questions-card").find(".change-button.collapsed").should("exist");

    })

})