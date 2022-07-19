
describe("NOT A TEST - revert edit changes", function(){

    it("NOT A TEST - revert edit changes - 27001 initial 3rd step", function(){

        //this is only for test repeatability - preventing test errors
        
        //login
        cy.visit("https://stage-iso14001.myaudit.net/system/login");
        cy.get("#email").type("autouser27init-step3@qq.qq");
        cy.get("#password").type("Qqqqqq11");
        cy.get("button").contains("LOGIN").click();
        cy.wait(3000);

        //basic info revert
        cy.get("order-details").find("#toggle-order-details").click();
        cy.get("order-details").find("#change-button").click();
        //
        cy.get('input[formcontrolname="firstName"]').clear().type("FirstName27init3step");
        cy.get('input[formcontrolname="lastName"]').clear().type("LastName");
        cy.get('input[formcontrolname="jobTitle"]').clear().type("JobTitle");
        cy.get('input[formcontrolname="phone"]').clear().type("(512) 512 -  5122");
        cy.get('input[formcontrolname="companyName"]').clear().type("Company27init3step");
        cy.get('input[formcontrolname="street"]').clear().type("Street");
        cy.get('input[formcontrolname="city"]').clear().type("City");
        cy.get('company-address ng-select[formcontrolname="country"]').click();
        cy.get(".ng-dropdown-panel-items").find(".ng-option-label").contains("US").click();
        cy.get('company-address ng-select[formcontrolname="usState"]').click();
        cy.get(".ng-dropdown-panel-items").find(".ng-option-label").contains("Alaska").click();
        cy.get('input[formcontrolname="zipCode"]').clear().type("44555");
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

    })

})