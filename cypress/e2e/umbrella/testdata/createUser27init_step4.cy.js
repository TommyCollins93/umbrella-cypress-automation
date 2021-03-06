
describe("creating user account for iso 27001 initial - 4th step", function(){

    it("creating user account for iso 27001 initial - 4th step", function(){

        //1st step
        cy.visit("/");
        //cy.visit("https://stage.audits-iso9001.dekra.us/")
        cy.get(".btn").click();
        cy.get("#ISO_27001_button").click();
        cy.get("#multiSite").find(".text").contains("No").click();
        cy.get("#hasCertificate_ISO_27001").find(".text").contains("No").click();
        cy.get('input[formcontrolname="firstName"]').type("FirstName27init4step");
        cy.get('input[formcontrolname="lastName"]').type("LastName");
        cy.get('input[formcontrolname="jobTitle"]').type("JobTitle");
        cy.get('input[formcontrolname="email"]').type("autouser27init-step4@qq.qq");
        cy.get('input[formcontrolname="phone"]').type("(512) 512 -  5122");
        cy.get('input[formcontrolname="companyName"]').type("Company27init4step");
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
        cy.get('#company-description_-iso_27001').type("We do something");
        cy.get('#total-employeesiso_27001').type(2025);
        cy.get("#scope-description-needs-narrowing--iso_27001").find(".text").contains("Yes").click();
        cy.get("#part-time-employees-included-iso_27001").find(".text").contains("Yes").click({force: true});
        cy.get("#employees-count-description-iso_27001").type("1000");
        cy.get("#shifts_iso_27001").contains("Two").click();
        /**/
        cy.get(".question-options").each(($random)=>{
            var i = Math.floor(Math.random() * 2);
            cy.get($random).find(".question-option").eq(i).click();
        });
        cy.get('#estimate-question-long_option_single_choice-iso_27001-previously_documented_performance_description').type('Some documented performance');
        cy.get('#estimate-question-long_option_single_choice-iso_27001-edit_rights_to_isms').contains("Yes").click();
        cy.get('.submit-button').click();
        cy.wait(1000);

        //3rd step
        //initial audit dates
        cy.get("#target-pre-audit-date").click();
        for(let n=0 ; n<2 ; n++){
            cy.get(".cdk-overlay-pane").find("g[data-name='chevron-right']").click();
        };
        cy.get(".cdk-overlay-pane").find(".day-cell").contains("15").click();
        cy.get("#target-stage1-audit-date").click();
        for(let n=0 ; n<2 ; n++){
            cy.get(".cdk-overlay-pane").find("g[data-name='chevron-right']").click();
        };
        cy.get(".cdk-overlay-pane").find(".day-cell").contains("16").click();
        cy.get("#target-stage2-audit-date").click();
        for(let n=0 ; n<2 ; n++){
            cy.get(".cdk-overlay-pane").find("g[data-name='chevron-right']").click();
        };
        cy.get(".cdk-overlay-pane").find(".day-cell").contains("17").click();
        //
        cy.get("[formcontrolname=outsourced_process_1ISO_27001]").click();
        cy.get("#binary-question-radio-0ISO_27001-iso_27001").find(".text").contains("No").click();
        cy.get("#binary-question-radio-1ISO_27001-iso_27001").find(".text").contains("Yes").click();
        cy.get("#binary-question-description-1ISO_27001-iso_27001").type("Not really");
        cy.get("#binary-question-radio-2ISO_27001-iso_27001").find(".text").contains("No").click();
        cy.get("#binary-question-radio-3ISO_27001-iso_27001").find(".text").contains("Yes").click();
        cy.get("#binary-question-description-3ISO_27001-iso_27001").type("Full name and company example");
        cy.get("#binary-question-radio-4ISO_27001-iso_27001").find(".text").contains("No").click();
        cy.get('.submit-button').click();
        cy.wait(1000);

        //4th step
    });
})