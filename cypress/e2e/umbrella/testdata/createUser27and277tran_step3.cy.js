
describe("creating user account for iso 27001 and 27701 transfer - 3rd step", function(){

    it("creating user account for iso 27001 and 27701 transfer - 3rd step", function(){

        //1st step
        cy.visit("/");
        //cy.visit("https://stage.audits-iso9001.dekra.us/")
        cy.get(".btn").click();
        cy.get("#ISO_27001_button").click();
        cy.get("#ISO_27701_button").click();
        cy.get("#multiSite").find(".text").contains("No").click();
        cy.get("#hasCertificate_ISO_27001").find(".text").contains("Yes").click();
        cy.get("#hasCertificate_ISO_27701").find(".text").contains("Yes").click();
        cy.get('input[formcontrolname="firstName"]').type("FirstName27and277tran3step");
        cy.get('input[formcontrolname="lastName"]').type("LastName");
        cy.get('input[formcontrolname="jobTitle"]').type("JobTitle");
        cy.get('input[formcontrolname="email"]').type("autouser27and277tran-step3@qq.qq");
        cy.get('input[formcontrolname="phone"]').type("(512) 512 -  5122");
        cy.get('input[formcontrolname="companyName"]').type("Company27and277tran3step");
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
        cy.get(".cb-select").each(($radio)=>{
            cy.get($radio).contains("other").click();
        })
        cy.get(".other-cb").each(($dropdown)=>{
            cy.get($dropdown).click();
            cy.get(".ng-dropdown-panel").find(".ng-option").contains("INTERTEK").click();
        })
        //cy.get(".cb-select").find(".text").contains("other").click();
        //cy.get(".other-cb").click();
        //cy.get(".ng-dropdown-panel").find(".ng-option").contains("INTERTEK").click();
        cy.get("[formcontrolname='lastAuditEventISO_27001']").find(".text").contains("Surveillance 1").click();
        cy.get("[formcontrolname='lastAuditEventISO_27701']").find(".text").contains("Surveillance 2").click();
        /**/
        cy.get('#company-description_-iso_27001').type("We do something");
        cy.get('#total-employeesiso_27001').type(2025);
        cy.get("#scope-description-needs-narrowing--iso_27001").find(".text").contains("Yes").click();
        cy.get("#part-time-employees-included-iso_27001").find(".text").contains("Yes").click({force: true});
        cy.get("#employees-count-description-iso_27001").type("1000");
        cy.get("#shifts_iso_27001").contains("Two").click();
        /**/
        cy.get(".question-options").each(($random)=>{
            var i = Math.floor(Math.random() * 2);
            //var k = Math.floor(Math.random() * 2);
            cy.get($random).find(".question-option").eq(i).click();
        });
        cy.get('#estimate-question-long_option_single_choice-iso_27001-previously_documented_performance_description').type('Some documented performance');
        cy.get('#estimate-question-long_option_single_choice-iso_27001-edit_rights_to_isms').contains("Yes").click();
        cy.get('.submit-button').click();
        cy.wait(1000);

        //3rd step
    });
})