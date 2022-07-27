
describe("9001 initial - 3rd step - calculations", function(){

    beforeEach(function(){
        cy.visit("https://stage-iso14001.myaudit.net/system/login");
        cy.get("#email").type("autouser9init-step3@qq.qq");
        cy.get("#password").type("Qqqqqq11");
        cy.get("button").contains("LOGIN").click();
        cy.wait(3000);
    });

    it("low risk, 200 total employees, max. positive % reduction, no catastrophic risk", function(){
        /*
        Scope risk: Low
        Final risk: Low
        No. of employees: 200
        Price factors reduction: 30%
        Price factors answers: 1 - No; 2 - No; 3 - No; 4 - No; 5 - No; 6 - Yes; 7 - Yes; 8 - No
        Catastrophic risk: No
        */
        cy.get("order-details").find("#toggle-order-details").click();
        cy.get("#change-button").click();
            //rest of the form - price changed
            cy.get('#total-employeesiso_9001').clear().type("200");
            cy.get("#scope-description-needs-narrowing--iso_9001").find(".text").contains("Yes").click();
            // cy.get("#scope-description--iso_9001").clear().type("Edit testing note");
            // cy.get("#employees-within-scope-iso_9001").clear().type("100");
            cy.get("#scope-selector-iso_9001").find(".ng-value-icon.left").click();
            cy.get('#company-scopes').click();
            cy.get(".ng-dropdown-panel-items").find("#item-2-iso_9001").click();
            cy.get("#catastrophic-risk-iso_9001").find(".text").contains("No").click({force: true}); //ISO 9001 related
            /**/
            cy.get("#price-factor-performing_design-iso_9001").find(".text").contains("No").click();
            cy.get("#price-factor-translator_required-iso_9001").find(".text").contains("No").click();
            cy.get("#price-factor-high_degree_of_regulation-iso_9001").find(".text").contains("No").click();
            cy.get("#price-factor-complex_process-iso_9001").find(".text").contains("No").click();
            cy.get("#price-factor-outsourcing_processes-iso_9001").find(".text").contains("No").click();
            cy.get("#price-factor-highly_automated_processes-iso_9001").find(".text").contains("Yes").click();
            cy.get("#price-factor-employees_working_off_location-iso_9001").find(".text").contains("Yes").click();
            cy.get("#price-factor-low_risk-iso_9001").find(".text").contains("No").click();
        //
        cy.get(".decision-buttons").find("#change-button").click();
        cy.wait(4000);

        //ESTIMATE CHANGE PROPOSAL
        //1st year
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='audit-price-1']").eq(0).should("have.text", "$ 1,525");
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='audit-days-1']").eq(0).should("have.text", " 1 onsite audit day");
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='audit-price-1']").eq(1).should("have.text", "$ 6,405");
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='audit-days-1']").eq(1).should("have.text", " 4.5 onsite audit days");
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='certification-fee-price-1']").should("have.text", "$ 250");
        cy.get("price-change-approve").find("price-card").eq(0).find(".total-price").should("have.text", "$ 8,180");
        //2nd year
        cy.get("price-change-approve").find("price-card").eq(1).find("[id='audit-price-2']").should("have.text", "$ 2,745");
        cy.get("price-change-approve").find("price-card").eq(1).find("[id='audit-days-2']").should("have.text", " 2 onsite audit days");
        cy.get("price-change-approve").find("price-card").eq(1).find("[id='certification-fee-price-2']").should("have.text", "$ 250");
        cy.get("price-change-approve").find("price-card").eq(1).find(".total-price").should("have.text", "$ 2,995");
        //3rd year
        cy.get("price-change-approve").find("price-card").eq(2).find("[id='audit-price-3']").should("have.text", "$ 2,745");
        cy.get("price-change-approve").find("price-card").eq(2).find("[id='audit-days-3']").should("have.text", " 2 onsite audit days");
        cy.get("price-change-approve").find("price-card").eq(2).find("[id='certification-fee-price-3']").should("have.text", "$ 250");
        cy.get("price-change-approve").find("price-card").eq(2).find(".total-price").should("have.text", "$ 2,995");
        //Risk factor
        cy.get("price-change-approve").find("[id='number-of-employees-iso_9001']").should("have.text", " Low ");
        //3 years total
        cy.get("price-change-approve").find("[id='total-price']").should("have.text", "$ 14,170");

        //Accept changes
        cy.get(".decision-buttons").eq(1).find("#approve-changes-button").click(); //save changes
        cy.wait(5000);
        
        //RECHECK APPROVED CHANGES
        //1st year
        cy.get("order-pricing").find("price-card").eq(0).find("[id='audit-price-1']").eq(0).should("have.text", "$ 1,525");
        cy.get("order-pricing").find("price-card").eq(0).find("[id='audit-days-1']").eq(0).should("have.text", " 1 onsite audit day");
        cy.get("order-pricing").find("price-card").eq(0).find("[id='audit-price-1']").eq(1).should("have.text", "$ 6,405");
        cy.get("order-pricing").find("price-card").eq(0).find("[id='audit-days-1']").eq(1).should("have.text", " 4.5 onsite audit days");
        cy.get("order-pricing").find("price-card").eq(0).find("[id='certification-fee-price-1']").should("have.text", "$ 250");
        cy.get("order-pricing").find("price-card").eq(0).find(".total-price").should("have.text", "$ 8,180");
        //2nd year
        cy.get("order-pricing").find("price-card").eq(1).find("[id='audit-price-2']").should("have.text", "$ 2,745");
        cy.get("order-pricing").find("price-card").eq(1).find("[id='audit-days-2']").should("have.text", " 2 onsite audit days");
        cy.get("order-pricing").find("price-card").eq(1).find("[id='certification-fee-price-2']").should("have.text", "$ 250");
        cy.get("order-pricing").find("price-card").eq(1).find(".total-price").should("have.text", "$ 2,995");
        //3rd year
        cy.get("order-pricing").find("price-card").eq(2).find("[id='audit-price-3']").should("have.text", "$ 2,745");
        cy.get("order-pricing").find("price-card").eq(2).find("[id='audit-days-3']").should("have.text", " 2 onsite audit days");
        cy.get("order-pricing").find("price-card").eq(2).find("[id='certification-fee-price-3']").should("have.text", "$ 250");
        cy.get("order-pricing").find("price-card").eq(2).find(".total-price").should("have.text", "$ 2,995");
        //Risk factor
        cy.get("order-pricing").find("[id='number-of-employees-iso_9001']").should("have.text", " Low ");
        //3 years total
        cy.get("order-pricing").find("[id='total-price']").should("have.text", "$ 14,170");
    });

    it("high risk, 2000 total employees, -10% reduction, catastrophic risk", function(){
        /*
        Scope risk: Low
        Final risk: High
        No. of employees: 2000
        Reduction: -10%
        Price factors answers: 1 - Yes; 2 - No; 3 - No; 4 - No; 5 - No; 6 - No; 7 - No; 8 - No
        Catastrophic risk: Yes
        */
        cy.get("order-details").find("#toggle-order-details").click();
        cy.get("#change-button").click();
            //rest of the form - price changed
            cy.get('#total-employeesiso_9001').clear().type("2000");
            //cy.get("#scope-description-needs-narrowing--iso_9001").find(".text").contains("Yes").click();
            // cy.get("#scope-description--iso_9001").clear().type("Edit testing note");
            // cy.get("#employees-within-scope-iso_9001").clear().type("100");
            //cy.get("#scope-selector-iso_9001").find(".ng-value-icon.left").click();
            //cy.get('#company-scopes').click();
            //cy.get(".ng-dropdown-panel-items").find("#item-4-iso_9001").click();
            cy.get("#catastrophic-risk-iso_9001").find(".text").contains("Yes").click({force: true}); //ISO 9001 related
            /**/
            cy.get("#price-factor-performing_design-iso_9001").find(".text").contains("Yes").click();
            cy.get("#price-factor-translator_required-iso_9001").find(".text").contains("No").click();
            cy.get("#price-factor-high_degree_of_regulation-iso_9001").find(".text").contains("No").click();
            cy.get("#price-factor-complex_process-iso_9001").find(".text").contains("No").click();
            cy.get("#price-factor-outsourcing_processes-iso_9001").find(".text").contains("No").click();
            cy.get("#price-factor-highly_automated_processes-iso_9001").find(".text").contains("No").click();
            cy.get("#price-factor-employees_working_off_location-iso_9001").find(".text").contains("No").click();
            cy.get("#price-factor-low_risk-iso_9001").find(".text").contains("No").click();
        //
        cy.get(".decision-buttons").find("#change-button").click();
        cy.wait(4000);

        //ESTIMATE CHANGE PROPOSAL
        //1st year
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='audit-price-1']").eq(0).should("have.text", "$ 1,525");
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='audit-days-1']").eq(0).should("have.text", " 1 onsite audit day");
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='audit-price-1']").eq(1).should("have.text", "$ 18,605");
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='audit-days-1']").eq(1).should("have.text", " 12.5 onsite audit days");
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='certification-fee-price-1']").should("have.text", "$ 250");
        cy.get("price-change-approve").find("price-card").eq(0).find(".total-price").should("have.text", "$ 20,380");
        //2nd year
        cy.get("price-change-approve").find("price-card").eq(1).find("[id='audit-price-2']").should("have.text", "$ 6,710");
        cy.get("price-change-approve").find("price-card").eq(1).find("[id='audit-days-2']").should("have.text", " 4.5 onsite audit days");
        cy.get("price-change-approve").find("price-card").eq(1).find("[id='certification-fee-price-2']").should("have.text", "$ 250");
        cy.get("price-change-approve").find("price-card").eq(1).find(".total-price").should("have.text", "$ 6,960");
        //3rd year
        cy.get("price-change-approve").find("price-card").eq(2).find("[id='audit-price-3']").should("have.text", "$ 6,710");
        cy.get("price-change-approve").find("price-card").eq(2).find("[id='audit-days-3']").should("have.text", " 4.5 onsite audit days");
        cy.get("price-change-approve").find("price-card").eq(2).find("[id='certification-fee-price-3']").should("have.text", "$ 250");
        cy.get("price-change-approve").find("price-card").eq(2).find(".total-price").should("have.text", "$ 6,960");
        //Risk factor
        cy.get("price-change-approve").find("[id='number-of-employees-iso_9001']").should("have.text", " High ");
        //3 years total
        cy.get("price-change-approve").find("[id='total-price']").should("have.text", "$ 34,300");

        //Accept changes
        cy.get(".decision-buttons").eq(1).find("#approve-changes-button").click(); //save changes
        cy.wait(5000);
        
        //RECHECK APPROVED CHANGES
        //1st year
        cy.get(".order-pricing").find("price-card").eq(0).find("[id='audit-price-1']").eq(0).should("have.text", "$ 1,525");
        cy.get(".order-pricing").find("price-card").eq(0).find("[id='audit-days-1']").eq(0).should("have.text", " 1 onsite audit day");
        cy.get(".order-pricing").find("price-card").eq(0).find("[id='audit-price-1']").eq(1).should("have.text", "$ 18,605");
        cy.get(".order-pricing").find("price-card").eq(0).find("[id='audit-days-1']").eq(1).should("have.text", " 12.5 onsite audit days");
        cy.get(".order-pricing").find("price-card").eq(0).find("[id='certification-fee-price-1']").should("have.text", "$ 250");
        cy.get(".order-pricing").find("price-card").eq(0).find(".total-price").should("have.text", "$ 20,380");
        //2nd year
        cy.get(".order-pricing").find("price-card").eq(1).find("[id='audit-price-2']").should("have.text", "$ 6,710");
        cy.get(".order-pricing").find("price-card").eq(1).find("[id='audit-days-2']").should("have.text", " 4.5 onsite audit days");
        cy.get(".order-pricing").find("price-card").eq(1).find("[id='certification-fee-price-2']").should("have.text", "$ 250");
        cy.get(".order-pricing").find("price-card").eq(1).find(".total-price").should("have.text", "$ 6,960");
        //3rd year
        cy.get(".order-pricing").find("price-card").eq(2).find("[id='audit-price-3']").should("have.text", "$ 6,710");
        cy.get(".order-pricing").find("price-card").eq(2).find("[id='audit-days-3']").should("have.text", " 4.5 onsite audit days");
        cy.get(".order-pricing").find("price-card").eq(2).find("[id='certification-fee-price-3']").should("have.text", "$ 250");
        cy.get(".order-pricing").find("price-card").eq(2).find(".total-price").should("have.text", "$ 6,960");
        //Risk factor
        cy.get(".order-pricing").find("[id='number-of-employees-iso_9001']").should("have.text", " High ");
        //3 years total
        cy.get(".order-pricing").find("[id='total-price']").should("have.text", "$ 34,300");
    });

    it("high risk, 500 employees within scope, max. negative % reduction, no catastrophic risk", function(){
        /*
        Scope risk: High
        Final risk: High
        No. of employees: 2025
        Employees within scope: 500
        Reduction: -40%
        Price factors answers: 1 - Yes; 2 - Yes; 3 - Yes; 4 - Yes; 5 - No; 6 - No; 7 - No; 8 - No
        Catastrophic risk: No
        */
        cy.get("order-details").find("#toggle-order-details").click();
        cy.get("#change-button").click();
            //rest of the form - price changed
            cy.get('#total-employeesiso_9001').clear().type("2025");
            cy.get("#scope-description-needs-narrowing--iso_9001").find(".text").contains("No").click();
            cy.get("#scope-description--iso_9001").clear().type("Edit testing note");
            cy.get("#employees-within-scope-iso_9001").clear().type("500");
            cy.get("#scope-selector-iso_9001").find(".ng-value-icon.left").click();
            cy.get('#company-scopes').click();
            cy.get(".ng-dropdown-panel-items").find("#item-8-iso_9001").click();
            cy.get("#catastrophic-risk-iso_9001").find(".text").contains("No").click({force: true}); //ISO 9001 related
            /**/
            cy.get("#price-factor-performing_design-iso_9001").find(".text").contains("Yes").click();
            cy.get("#price-factor-translator_required-iso_9001").find(".text").contains("Yes").click();
            cy.get("#attached-question-translator_required-iso_9001-specify_language").clear().type("abc abc");
            cy.get("#price-factor-high_degree_of_regulation-iso_9001").find(".text").contains("Yes").click();
            cy.get("#price-factor-complex_process-iso_9001").find(".text").contains("Yes").click();
            cy.get("#price-factor-outsourcing_processes-iso_9001").find(".text").contains("No").click();
            cy.get("#price-factor-highly_automated_processes-iso_9001").find(".text").contains("No").click();
            cy.get("#price-factor-employees_working_off_location-iso_9001").find(".text").contains("No").click();
            cy.get("#price-factor-low_risk-iso_9001").find(".text").contains("No").click();
        //
        cy.get(".decision-buttons").find("#change-button").click();
        cy.wait(4000);

        //ESTIMATE CHANGE PROPOSAL
        //1st year
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='audit-price-1']").eq(0).should("have.text", "$ 1,525");
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='audit-days-1']").eq(0).should("have.text", " 1 onsite audit day");
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='audit-price-1']").eq(1).should("have.text", "$ 17,385");
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='audit-days-1']").eq(1).should("have.text", " 11.5 onsite audit days");
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='certification-fee-price-1']").should("have.text", "$ 250");
        cy.get("price-change-approve").find("price-card").eq(0).find(".total-price").should("have.text", "$ 19,160");
        //2nd year
        cy.get("price-change-approve").find("price-card").eq(1).find("[id='audit-price-2']").should("have.text", "$ 6,405");
        cy.get("price-change-approve").find("price-card").eq(1).find("[id='audit-days-2']").should("have.text", " 4.5 onsite audit days");
        cy.get("price-change-approve").find("price-card").eq(1).find("[id='certification-fee-price-2']").should("have.text", "$ 250");
        cy.get("price-change-approve").find("price-card").eq(1).find(".total-price").should("have.text", "$ 6,655");
        //3rd year
        cy.get("price-change-approve").find("price-card").eq(2).find("[id='audit-price-3']").should("have.text", "$ 6,405");
        cy.get("price-change-approve").find("price-card").eq(2).find("[id='audit-days-3']").should("have.text", " 4.5 onsite audit days");
        cy.get("price-change-approve").find("price-card").eq(2).find("[id='certification-fee-price-3']").should("have.text", "$ 250");
        cy.get("price-change-approve").find("price-card").eq(2).find(".total-price").should("have.text", "$ 6,655");
        //Risk factor
        cy.get("price-change-approve").find("[id='number-of-employees-iso_9001']").should("have.text", " High ");
        //3 years total
        cy.get("price-change-approve").find("[id='total-price']").should("have.text", "$ 32,470");

        //Accept changes
        cy.get(".decision-buttons").eq(1).find("#approve-changes-button").click(); //save changes
        cy.wait(5000);
        
        //RECHECK APPROVED CHANGES
        //1st year
        cy.get(".order-pricing").find("price-card").eq(0).find("[id='audit-price-1']").eq(0).should("have.text", "$ 1,525");
        cy.get(".order-pricing").find("price-card").eq(0).find("[id='audit-days-1']").eq(0).should("have.text", " 1 onsite audit day");
        cy.get(".order-pricing").find("price-card").eq(0).find("[id='audit-price-1']").eq(1).should("have.text", "$ 17,385");
        cy.get(".order-pricing").find("price-card").eq(0).find("[id='audit-days-1']").eq(1).should("have.text", " 11.5 onsite audit days");
        cy.get(".order-pricing").find("price-card").eq(0).find("[id='certification-fee-price-1']").should("have.text", "$ 250");
        cy.get(".order-pricing").find("price-card").eq(0).find(".total-price").should("have.text", "$ 19,160");
        //2nd year
        cy.get(".order-pricing").find("price-card").eq(1).find("[id='audit-price-2']").should("have.text", "$ 6,405");
        cy.get(".order-pricing").find("price-card").eq(1).find("[id='audit-days-2']").should("have.text", " 4.5 onsite audit days");
        cy.get(".order-pricing").find("price-card").eq(1).find("[id='certification-fee-price-2']").should("have.text", "$ 250");
        cy.get(".order-pricing").find("price-card").eq(1).find(".total-price").should("have.text", "$ 6,655");
        //3rd year
        cy.get(".order-pricing").find("price-card").eq(2).find("[id='audit-price-3']").should("have.text", "$ 6,405");
        cy.get(".order-pricing").find("price-card").eq(2).find("[id='audit-days-3']").should("have.text", " 4.5 onsite audit days");
        cy.get(".order-pricing").find("price-card").eq(2).find("[id='certification-fee-price-3']").should("have.text", "$ 250");
        cy.get(".order-pricing").find("price-card").eq(2).find(".total-price").should("have.text", "$ 6,655");
        //Risk factor
        cy.get(".order-pricing").find("[id='number-of-employees-iso_9001']").should("have.text", " High ");
        //3 years total
        cy.get(".order-pricing").find("[id='total-price']").should("have.text", "$ 32,470");
    });

    it("medium risk, 30 employees within scope, 0% reduction, no catastrophic risk", function(){
        /*
        Scope risk: Medium
        Final risk: Medium
        No. of employees: 30
        Employees within scope: 30
        Reduction: 0%
        Price factors answers: 1 - Yes; 2 - No; 3 - Yes; 4 - No; 5 - Yes; 6 - No; 7 - Yes; 8 - No
        Catastrophic risk: No
        */
        cy.get("order-details").find("#toggle-order-details").click();
        cy.get("#change-button").click();
            //rest of the form - price changed
            cy.get('#total-employeesiso_9001').clear().type("30");
            // cy.get("#scope-description-needs-narrowing--iso_9001").find(".text").contains("No").click();
            // cy.get("#scope-description--iso_9001").clear().type("Edit testing note");
            cy.get("#employees-within-scope-iso_9001").clear().type("30");
            cy.get("#scope-selector-iso_9001").find(".ng-value-icon.left").click();
            cy.get('#company-scopes').click();
            cy.get(".ng-dropdown-panel-items").find("#item-1-iso_9001").click();
            cy.get("#catastrophic-risk-iso_9001").find(".text").contains("No").click({force: true}); //ISO 9001 related
            /**/
            cy.get("#price-factor-performing_design-iso_9001").find(".text").contains("Yes").click();
            cy.get("#price-factor-translator_required-iso_9001").find(".text").contains("No").click();
            cy.get("#price-factor-high_degree_of_regulation-iso_9001").find(".text").contains("Yes").click();
            cy.get("#price-factor-complex_process-iso_9001").find(".text").contains("No").click();
            cy.get("#price-factor-outsourcing_processes-iso_9001").find(".text").contains("Yes").click();
            cy.get("#price-factor-highly_automated_processes-iso_9001").find(".text").contains("No").click();
            cy.get("#price-factor-employees_working_off_location-iso_9001").find(".text").contains("Yes").click();
            cy.get("#price-factor-low_risk-iso_9001").find(".text").contains("No").click();
        //
        cy.get(".decision-buttons").find("#change-button").click();
        cy.wait(4000);

        //ESTIMATE CHANGE PROPOSAL
        //1st year
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='audit-price-1']").eq(0).should("have.text", "$ 1,525");
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='audit-days-1']").eq(0).should("have.text", " 1 onsite audit day");
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='audit-price-1']").eq(1).should("have.text", "$ 3,355");
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='audit-days-1']").eq(1).should("have.text", " 2.5 onsite audit days");
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='certification-fee-price-1']").should("have.text", "$ 250");
        cy.get("price-change-approve").find("price-card").eq(0).find(".total-price").should("have.text", "$ 5,130");
        //2nd year
        cy.get("price-change-approve").find("price-card").eq(1).find("[id='audit-price-2']").should("have.text", "$ 2,135");
        cy.get("price-change-approve").find("price-card").eq(1).find("[id='audit-days-2']").should("have.text", " 1.5 onsite audit day");
        cy.get("price-change-approve").find("price-card").eq(1).find("[id='certification-fee-price-2']").should("have.text", "$ 250");
        cy.get("price-change-approve").find("price-card").eq(1).find(".total-price").should("have.text", "$ 2,385");
        //3rd year
        cy.get("price-change-approve").find("price-card").eq(2).find("[id='audit-price-3']").should("have.text", "$ 2,135");
        cy.get("price-change-approve").find("price-card").eq(2).find("[id='audit-days-3']").should("have.text", " 1.5 onsite audit day");
        cy.get("price-change-approve").find("price-card").eq(2).find("[id='certification-fee-price-3']").should("have.text", "$ 250");
        cy.get("price-change-approve").find("price-card").eq(2).find(".total-price").should("have.text", "$ 2,385");
        //Risk factor
        cy.get("price-change-approve").find("[id='number-of-employees-iso_9001']").should("have.text", " Medium ");
        //3 years total
        cy.get("price-change-approve").find("[id='total-price']").should("have.text", "$ 9,900");

        //Accept changes
        cy.get(".decision-buttons").eq(1).find("#approve-changes-button").click(); //save changes
        cy.wait(5000);
        
        //RECHECK APPROVED CHANGES
        //1st year
        cy.get(".order-pricing").find("price-card").eq(0).find("[id='audit-price-1']").eq(0).should("have.text", "$ 1,525");
        cy.get(".order-pricing").find("price-card").eq(0).find("[id='audit-days-1']").eq(0).should("have.text", " 1 onsite audit day");
        cy.get(".order-pricing").find("price-card").eq(0).find("[id='audit-price-1']").eq(1).should("have.text", "$ 3,355");
        cy.get(".order-pricing").find("price-card").eq(0).find("[id='audit-days-1']").eq(1).should("have.text", " 2.5 onsite audit days");
        cy.get(".order-pricing").find("price-card").eq(0).find("[id='certification-fee-price-1']").should("have.text", "$ 250");
        cy.get(".order-pricing").find("price-card").eq(0).find(".total-price").should("have.text", "$ 5,130");
        //2nd year
        cy.get(".order-pricing").find("price-card").eq(1).find("[id='audit-price-2']").should("have.text", "$ 2,135");
        cy.get(".order-pricing").find("price-card").eq(1).find("[id='audit-days-2']").should("have.text", " 1.5 onsite audit day");
        cy.get(".order-pricing").find("price-card").eq(1).find("[id='certification-fee-price-2']").should("have.text", "$ 250");
        cy.get(".order-pricing").find("price-card").eq(1).find(".total-price").should("have.text", "$ 2,385");
        //3rd year
        cy.get(".order-pricing").find("price-card").eq(2).find("[id='audit-price-3']").should("have.text", "$ 2,135");
        cy.get(".order-pricing").find("price-card").eq(2).find("[id='audit-days-3']").should("have.text", " 1.5 onsite audit day");
        cy.get(".order-pricing").find("price-card").eq(2).find("[id='certification-fee-price-3']").should("have.text", "$ 250");
        cy.get(".order-pricing").find("price-card").eq(2).find(".total-price").should("have.text", "$ 2,385");
        //Risk factor
        cy.get(".order-pricing").find("[id='number-of-employees-iso_9001']").should("have.text", " Medium ");
        //3 years total
        cy.get(".order-pricing").find("[id='total-price']").should("have.text", "$ 9,900");
    })

})