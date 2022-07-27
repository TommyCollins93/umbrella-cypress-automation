
describe("14001 transfer - 3rd step - calculations", function(){

    beforeEach(function(){
        cy.visit("https://stage-iso14001.myaudit.net/system/login");
        cy.get("#email").type("autouser14tran-step3@qq.qq");
        cy.get("#password").type("Qqqqqq11");
        cy.get("button").contains("LOGIN").click();
        cy.wait(3000);
    });

    it("low complexity, 200 total employees, max. positive % reduction, recert", function(){
        /*
        Scope complexity: Low
        Final complexity: Low
        No. of employees: 200
        Price factors reduction: 20%
        Price factors answers: 1 - No; 2 - No; 3 - No; 4 - No; 5 - No; 6 - Yes; 7 - Yes; 8 - No
        Last audit event: Recertification
        */
        cy.get("order-details").find("#toggle-order-details").click();
        cy.get("#change-button").click();
            //change of audit event
            cy.get("#current-certification-last-audit-event-radio-group").find(".text").contains("Recertification").click();
            //rest of the form - price changed
            cy.get('#total-employeesiso_14001').clear().type("200");
            cy.get("#scope-description-needs-narrowing--iso_14001").find(".text").contains("Yes").click();
            // cy.get("#scope-description--iso_14001").clear().type("Edit testing note");
            // cy.get("#employees-within-scope-iso_14001").clear().type("100");
            cy.get("#scope-selector-iso_14001").find(".ng-value-icon.left").click();
            cy.get('#company-scopes').click();
            cy.get(".ng-dropdown-panel-items").find("#item-5-iso_14001").click();
            cy.get("#scope-question-06-include_manufacturing_of_boardsISO_14001_iso_14001").find(".text").contains("No").click({force: true});
            /**/
            cy.get("#price-factor-performing_design-iso_14001").find(".text").contains("No").click();
            cy.get("#price-factor-translator_required-iso_14001").find(".text").contains("No").click();
            cy.get("#price-factor-high_degree_of_regulation-iso_14001").find(".text").contains("No").click();
            cy.get("#price-factor-complex_process-iso_14001").find(".text").contains("No").click();
            cy.get("#price-factor-outsourcing_processes-iso_14001").find(".text").contains("No").click();
            cy.get("#price-factor-highly_automated_processes-iso_14001").find(".text").contains("Yes").click();
            cy.get("#price-factor-employees_working_off_location-iso_14001").find(".text").contains("Yes").click();
            cy.get("#price-factor-low_risk-iso_14001").find(".text").contains("No").click();
        //
        cy.get(".decision-buttons").find("#change-button").click();
        cy.wait(4000);

        //ESTIMATE CHANGE PROPOSAL
        //1st year
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='audit-price-1']").eq(0).should("have.text", "$ 2,440");
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='audit-days-1']").eq(0).should("have.text", " 1.5 onsite audit day");
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='certification-fee-price-1']").should("have.text", "$ 250");
        cy.get("price-change-approve").find("price-card").eq(0).find(".total-price").should("have.text", "$ 2,690");
        //2nd year
        cy.get("price-change-approve").find("price-card").eq(1).find("[id='audit-price-2']").eq(0).should("have.text", "$ 2,440");
        cy.get("price-change-approve").find("price-card").eq(1).find("[id='audit-days-2']").eq(0).should("have.text", " 1.5 onsite audit day");
        cy.get("price-change-approve").find("price-card").eq(1).find("[id='certification-fee-price-2']").should("have.text", "$ 250");
        cy.get("price-change-approve").find("price-card").eq(1).find(".total-price").should("have.text", "$ 2,690");
        //3rd year
        cy.get("price-change-approve").find("price-card").eq(2).find("[id='audit-price-3']").eq(0).should("have.text", "$ 4,575");
        cy.get("price-change-approve").find("price-card").eq(2).find("[id='audit-days-3']").eq(0).should("have.text", " 3 onsite audit days");
        cy.get("price-change-approve").find("price-card").eq(2).find("[id='certification-fee-price-3']").should("have.text", "$ 250");
        cy.get("price-change-approve").find("price-card").eq(2).find(".total-price").should("have.text", "$ 4,825");
        //Complexity factor
        cy.get("price-change-approve").find("[id='number-of-employees-iso_14001']").should("have.text", " Low ");
        //3 years total
        cy.get("price-change-approve").find("[id='total-price']").should("have.text", "$ 10,205");

        //Accept changes
        cy.get(".decision-buttons").eq(1).find("#approve-changes-button").click(); //save changes
        cy.wait(5000);
        
        //RECHECK APPROVED CHANGES
        //1st year
        cy.get(".order-pricing").find("price-card").eq(0).find("[id='audit-price-1']").eq(0).should("have.text", "$ 2,440");
        cy.get(".order-pricing").find("price-card").eq(0).find("[id='audit-days-1']").eq(0).should("have.text", " 1.5 onsite audit day");
        cy.get(".order-pricing").find("price-card").eq(0).find("[id='certification-fee-price-1']").should("have.text", "$ 250");
        cy.get(".order-pricing").find("price-card").eq(0).find(".total-price").should("have.text", "$ 2,690");
        //2nd year
        cy.get(".order-pricing").find("price-card").eq(1).find("[id='audit-price-2']").eq(0).should("have.text", "$ 2,440");
        cy.get(".order-pricing").find("price-card").eq(1).find("[id='audit-days-2']").eq(0).should("have.text", " 1.5 onsite audit day");
        cy.get(".order-pricing").find("price-card").eq(1).find("[id='certification-fee-price-2']").should("have.text", "$ 250");
        cy.get(".order-pricing").find("price-card").eq(1).find(".total-price").should("have.text", "$ 2,690");
        //3rd year
        cy.get(".order-pricing").find("price-card").eq(2).find("[id='audit-price-3']").eq(0).should("have.text", "$ 4,575");
        cy.get(".order-pricing").find("price-card").eq(2).find("[id='audit-days-3']").eq(0).should("have.text", " 3 onsite audit days");
        cy.get(".order-pricing").find("price-card").eq(2).find("[id='certification-fee-price-3']").should("have.text", "$ 250");
        cy.get(".order-pricing").find("price-card").eq(2).find(".total-price").should("have.text", "$ 4,825");
        //Complexity factor
        cy.get(".order-pricing").find("[id='number-of-employees-iso_14001']").should("have.text", " Low ");
        //3 years total
        cy.get(".order-pricing").find("[id='total-price']").should("have.text", "$ 10,205");
    });

    it("limited complexity, 2000 total employees, -10% reduction, surv 2", function(){
        /*
        Scope complexity: Limited
        Final complexity: Limited
        No. of employees: 2000
        Reduction: -10%
        Price factors answers: 1 - No; 2 - Yes; 3 - No; 4 - No; 5 - No; 6 - No; 7 - No; 8 - No
        Last audit event: Surveillance 2
        */
        cy.get("order-details").find("#toggle-order-details").click();
        cy.get("#change-button").click();
            //change of audit event
            cy.get("#current-certification-last-audit-event-radio-group").find(".text").contains("Surveillance 2").click();
            //rest of the form - price changed
            cy.get('#total-employeesiso_14001').clear().type("2000");
            // cy.get("#scope-description-needs-narrowing--iso_14001").find(".text").contains("Yes").click();
            // cy.get("#scope-description--iso_14001").clear().type("Edit testing note");
            // cy.get("#employees-within-scope-iso_14001").clear().type("100");
            cy.get("#scope-selector-iso_14001").find(".ng-value-icon.left").click();
            cy.get('#company-scopes').click();
            cy.get(".ng-dropdown-panel-items").find("#item-30-iso_14001").click();
            cy.get("#scope-question-31-limited_to_transportationISO_14001_iso_14001").find(".text").contains("Yes").click({force: true});
            /**/
            cy.get("#price-factor-performing_design-iso_14001").find(".text").contains("No").click();
            cy.get("#price-factor-translator_required-iso_14001").find(".text").contains("Yes").click();
            cy.get("#attached-question-translator_required-iso_14001-specify_language").clear().type("abc abc");
            cy.get("#price-factor-high_degree_of_regulation-iso_14001").find(".text").contains("No").click();
            cy.get("#price-factor-complex_process-iso_14001").find(".text").contains("No").click();
            cy.get("#price-factor-outsourcing_processes-iso_14001").find(".text").contains("No").click();
            cy.get("#price-factor-highly_automated_processes-iso_14001").find(".text").contains("No").click();
            cy.get("#price-factor-employees_working_off_location-iso_14001").find(".text").contains("No").click();
            cy.get("#price-factor-low_risk-iso_14001").find(".text").contains("No").click();
        //
        cy.get(".decision-buttons").find("#change-button").click();
        cy.wait(4000);

        //ESTIMATE CHANGE PROPOSAL
        //1st year
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='audit-price-1']").eq(0).should("have.text", "$ 7,320");
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='audit-days-1']").eq(0).should("have.text", " 5 onsite audit days");
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='certification-fee-price-1']").should("have.text", "$ 250");
        cy.get("price-change-approve").find("price-card").eq(0).find(".total-price").should("have.text", "$ 7,570");
        //2nd year
        cy.get("price-change-approve").find("price-card").eq(1).find("[id='audit-price-2']").eq(0).should("have.text", "$ 3,660");
        cy.get("price-change-approve").find("price-card").eq(1).find("[id='audit-days-2']").eq(0).should("have.text", " 2.5 onsite audit days");
        cy.get("price-change-approve").find("price-card").eq(1).find("[id='certification-fee-price-2']").should("have.text", "$ 250");
        cy.get("price-change-approve").find("price-card").eq(1).find(".total-price").should("have.text", "$ 3,910");
        //3rd year
        cy.get("price-change-approve").find("price-card").eq(2).find("[id='audit-price-3']").eq(0).should("have.text", "$ 3,660");
        cy.get("price-change-approve").find("price-card").eq(2).find("[id='audit-days-3']").eq(0).should("have.text", " 2.5 onsite audit days");
        cy.get("price-change-approve").find("price-card").eq(2).find("[id='certification-fee-price-3']").should("have.text", "$ 250");
        cy.get("price-change-approve").find("price-card").eq(2).find(".total-price").should("have.text", "$ 3,910");
        //Complexity factor
        cy.get("price-change-approve").find("[id='number-of-employees-iso_14001']").should("have.text", " Limited ");
        //3 years total
        cy.get("price-change-approve").find("[id='total-price']").should("have.text", "$ 15,390");

        //Accept changes
        cy.get(".decision-buttons").eq(1).find("#approve-changes-button").click(); //save changes
        cy.wait(5000);
        
        //RECHECK APPROVED CHANGES
        //1st year
        cy.get(".order-pricing").find("price-card").eq(0).find("[id='audit-price-1']").eq(0).should("have.text", "$ 7,320");
        cy.get(".order-pricing").find("price-card").eq(0).find("[id='audit-days-1']").eq(0).should("have.text", " 5 onsite audit days");
        cy.get(".order-pricing").find("price-card").eq(0).find("[id='certification-fee-price-1']").should("have.text", "$ 250");
        cy.get(".order-pricing").find("price-card").eq(0).find(".total-price").should("have.text", "$ 7,570");
        //2nd year
        cy.get(".order-pricing").find("price-card").eq(1).find("[id='audit-price-2']").eq(0).should("have.text", "$ 3,660");
        cy.get(".order-pricing").find("price-card").eq(1).find("[id='audit-days-2']").eq(0).should("have.text", " 2.5 onsite audit days");
        cy.get(".order-pricing").find("price-card").eq(1).find("[id='certification-fee-price-2']").should("have.text", "$ 250");
        cy.get(".order-pricing").find("price-card").eq(1).find(".total-price").should("have.text", "$ 3,910");
        //3rd year
        cy.get(".order-pricing").find("price-card").eq(2).find("[id='audit-price-3']").eq(0).should("have.text", "$ 3,660");
        cy.get(".order-pricing").find("price-card").eq(2).find("[id='audit-days-3']").eq(0).should("have.text", " 2.5 onsite audit days");
        cy.get(".order-pricing").find("price-card").eq(2).find("[id='certification-fee-price-3']").should("have.text", "$ 250");
        cy.get(".order-pricing").find("price-card").eq(2).find(".total-price").should("have.text", "$ 3,910");
        //Complexity factor
        cy.get(".order-pricing").find("[id='number-of-employees-iso_14001']").should("have.text", " Limited ");
        //3 years total
        cy.get(".order-pricing").find("[id='total-price']").should("have.text", "$ 15,390");
    });

    it("high complexity, 500 employees within scope, max. negative % reduction, surv 1", function(){
        /*
        Scope complexity: High
        Final complexity: High
        No. of employees: 2025
        Employees within scope: 500
        Reduction: -10%
        Price factors answers: 1 - No; 2 - Yes; 3 - No; 4 - No; 5 - No; 6 - No; 7 - No; 8 - No
        Last audit event: Surveillance 1
        */
        cy.get("order-details").find("#toggle-order-details").click();
        cy.get("#change-button").click();
            //change of audit event
            cy.get("#current-certification-last-audit-event-radio-group").find(".text").contains("Surveillance 1").click();
            //rest of the form - price changed
            cy.get('#total-employeesiso_14001').clear().type("2025");
            cy.get("#scope-description-needs-narrowing--iso_14001").find(".text").contains("No").click();
            cy.get("#scope-description--iso_14001").clear().type("Edit testing note");
            cy.get("#employees-within-scope-iso_14001").clear().type("500");
            cy.get("#scope-selector-iso_14001").find(".ng-value-icon.left").click();
            cy.get('#company-scopes').click();
            cy.get(".ng-dropdown-panel-items").find("#item-14-iso_14001").click();
            cy.get("#scope-question-15-include_ceramicsISO_14001_iso_14001").find(".text").contains("Yes").click({force: true});
            /**/
            cy.get("#price-factor-performing_design-iso_14001").find(".text").contains("No").click();
            cy.get("#price-factor-translator_required-iso_14001").find(".text").contains("Yes").click();
            cy.get("#attached-question-translator_required-iso_14001-specify_language").clear().type("abc abc");
            cy.get("#price-factor-high_degree_of_regulation-iso_14001").find(".text").contains("No").click();
            cy.get("#price-factor-complex_process-iso_14001").find(".text").contains("No").click();
            cy.get("#price-factor-outsourcing_processes-iso_14001").find(".text").contains("No").click();
            cy.get("#price-factor-highly_automated_processes-iso_14001").find(".text").contains("No").click();
            cy.get("#price-factor-employees_working_off_location-iso_14001").find(".text").contains("No").click();
            cy.get("#price-factor-low_risk-iso_14001").find(".text").contains("No").click();
        //
        cy.get(".decision-buttons").find("#change-button").click();
        cy.wait(4000);

        //ESTIMATE CHANGE PROPOSAL
        //1st year
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='audit-price-1']").eq(0).should("have.text", "$ 7,320");
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='audit-days-1']").eq(0).should("have.text", " 5 onsite audit days");
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='certification-fee-price-1']").should("have.text", "$ 250");
        cy.get("price-change-approve").find("price-card").eq(0).find(".total-price").should("have.text", "$ 7,570");
        //2nd year
        cy.get("price-change-approve").find("price-card").eq(1).find("[id='audit-price-2']").eq(0).should("have.text", "$ 14,335");
        cy.get("price-change-approve").find("price-card").eq(1).find("[id='audit-days-2']").eq(0).should("have.text", " 9.5 onsite audit days");
        cy.get("price-change-approve").find("price-card").eq(1).find("[id='certification-fee-price-2']").should("have.text", "$ 250");
        cy.get("price-change-approve").find("price-card").eq(1).find(".total-price").should("have.text", "$ 14,585");
        //3rd year
        cy.get("price-change-approve").find("price-card").eq(2).find("[id='audit-price-3']").eq(0).should("have.text", "$ 7,320");
        cy.get("price-change-approve").find("price-card").eq(2).find("[id='audit-days-3']").eq(0).should("have.text", " 5 onsite audit days");
        cy.get("price-change-approve").find("price-card").eq(2).find("[id='certification-fee-price-3']").should("have.text", "$ 250");
        cy.get("price-change-approve").find("price-card").eq(2).find(".total-price").should("have.text", "$ 7,570");
        //Complexity factor
        cy.get("price-change-approve").find("[id='number-of-employees-iso_14001']").should("have.text", " High ");
        //3 years total
        cy.get("price-change-approve").find("[id='total-price']").should("have.text", "$ 29,725");

        //Accept changes
        cy.get(".decision-buttons").eq(1).find("#approve-changes-button").click(); //save changes
        cy.wait(5000);
        
        //RECHECK APPROVED CHANGES
        //1st year
        cy.get(".order-pricing").find("price-card").eq(0).find("[id='audit-price-1']").eq(0).should("have.text", "$ 7,320");
        cy.get(".order-pricing").find("price-card").eq(0).find("[id='audit-days-1']").eq(0).should("have.text", " 5 onsite audit days");
        cy.get(".order-pricing").find("price-card").eq(0).find("[id='certification-fee-price-1']").should("have.text", "$ 250");
        cy.get(".order-pricing").find("price-card").eq(0).find(".total-price").should("have.text", "$ 7,570");
        //2nd year
        cy.get(".order-pricing").find("price-card").eq(1).find("[id='audit-price-2']").eq(0).should("have.text", "$ 14,335");
        cy.get(".order-pricing").find("price-card").eq(1).find("[id='audit-days-2']").eq(0).should("have.text", " 9.5 onsite audit days");
        cy.get(".order-pricing").find("price-card").eq(1).find("[id='certification-fee-price-2']").should("have.text", "$ 250");
        cy.get(".order-pricing").find("price-card").eq(1).find(".total-price").should("have.text", "$ 14,585");
        //3rd year
        cy.get(".order-pricing").find("price-card").eq(2).find("[id='audit-price-3']").eq(0).should("have.text", "$ 7,320");
        cy.get(".order-pricing").find("price-card").eq(2).find("[id='audit-days-3']").eq(0).should("have.text", " 5 onsite audit days");
        cy.get(".order-pricing").find("price-card").eq(2).find("[id='certification-fee-price-3']").should("have.text", "$ 250");
        cy.get(".order-pricing").find("price-card").eq(2).find(".total-price").should("have.text", "$ 7,570");
        //Complexity factor
        cy.get(".order-pricing").find("[id='number-of-employees-iso_14001']").should("have.text", " High ");
        //3 years total
        cy.get(".order-pricing").find("[id='total-price']").should("have.text", "$ 29,725");
    });

    it("medium complexity, 30 employees within scope, 0% reduction, init", function(){
        /*
        Scope complexity: Medium
        Final complexity: Medium
        No. of employees: 30
        Employees within scope: 30
        Reduction: 0%
        Price factors answers: 1 - No; 2 - Yes; 3 - Yes; 4 - No; 5 - Yes; 6 - No; 7 - Yes; 8 - No
        Last audit event: Initial Certification
        */
        cy.get("order-details").find("#toggle-order-details").click();
        cy.get("#change-button").click();
            //change of audit event
            cy.get("#current-certification-last-audit-event-radio-group").find(".text").contains("Initial Certification ").click();
            //rest of the form - price changed
            cy.get('#total-employeesiso_14001').clear().type("30");
            // cy.get("#scope-description-needs-narrowing--iso_14001").find(".text").contains("No").click();
            // cy.get("#scope-description--iso_14001").clear().type("Edit testing note");
            cy.get("#employees-within-scope-iso_14001").clear().type("30");
            cy.get("#scope-selector-iso_14001").find(".ng-value-icon.left").click();
            cy.get('#company-scopes').click();
            cy.get(".ng-dropdown-panel-items").find("#item-6-iso_14001").click();
            cy.get("#scope-question-07a-limited_to_paper_productsISO_14001_iso_14001").find(".text").contains("No").click({force: true});
            /**/
            cy.get("#price-factor-performing_design-iso_14001").find(".text").contains("No").click();
            cy.get("#price-factor-translator_required-iso_14001").find(".text").contains("Yes").click();
            cy.get("#price-factor-high_degree_of_regulation-iso_14001").find(".text").contains("Yes").click();
            cy.get("#price-factor-complex_process-iso_14001").find(".text").contains("No").click();
            cy.get("#price-factor-outsourcing_processes-iso_14001").find(".text").contains("Yes").click();
            cy.get("#price-factor-highly_automated_processes-iso_14001").find(".text").contains("No").click();
            cy.get("#price-factor-employees_working_off_location-iso_14001").find(".text").contains("Yes").click();
            cy.get("#price-factor-low_risk-iso_14001").find(".text").contains("No").click();
        //
        cy.get(".decision-buttons").find("#change-button").click();
        cy.wait(4000);

        //ESTIMATE CHANGE PROPOSAL
        //1st year
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='audit-price-1']").eq(0).should("have.text", "$ 2,440");
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='audit-days-1']").eq(0).should("have.text", " 1.5 onsite audit day");
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='certification-fee-price-1']").should("have.text", "$ 250");
        cy.get("price-change-approve").find("price-card").eq(0).find(".total-price").should("have.text", "$ 2,690");
        //2nd year
        cy.get("price-change-approve").find("price-card").eq(1).find("[id='audit-price-2']").eq(0).should("have.text", "$ 2,440");
        cy.get("price-change-approve").find("price-card").eq(1).find("[id='audit-days-2']").eq(0).should("have.text", " 1.5 onsite audit day");
        cy.get("price-change-approve").find("price-card").eq(1).find("[id='certification-fee-price-2']").should("have.text", "$ 250");
        cy.get("price-change-approve").find("price-card").eq(1).find(".total-price").should("have.text", "$ 2,690");
        //3rd year
        cy.get("price-change-approve").find("price-card").eq(2).find("[id='audit-price-3']").eq(0).should("have.text", "$ 4,575");
        cy.get("price-change-approve").find("price-card").eq(2).find("[id='audit-days-3']").eq(0).should("have.text", " 3 onsite audit days");
        cy.get("price-change-approve").find("price-card").eq(2).find("[id='certification-fee-price-3']").should("have.text", "$ 250");
        cy.get("price-change-approve").find("price-card").eq(2).find(".total-price").should("have.text", "$ 4,825");
        //Complexity factor
        cy.get("price-change-approve").find("[id='number-of-employees-iso_14001']").should("have.text", " Medium ");
        //3 years total
        cy.get("price-change-approve").find("[id='total-price']").should("have.text", "$ 10,205");

        //Accept changes
        cy.get(".decision-buttons").eq(1).find("#approve-changes-button").click(); //save changes
        cy.wait(5000);
        
        //RECHECK APPROVED CHANGES
        //1st year
        cy.get(".order-pricing").find("price-card").eq(0).find("[id='audit-price-1']").eq(0).should("have.text", "$ 2,440");
        cy.get(".order-pricing").find("price-card").eq(0).find("[id='audit-days-1']").eq(0).should("have.text", " 1.5 onsite audit day");
        cy.get(".order-pricing").find("price-card").eq(0).find("[id='certification-fee-price-1']").should("have.text", "$ 250");
        cy.get(".order-pricing").find("price-card").eq(0).find(".total-price").should("have.text", "$ 2,690");
        //2nd year
        cy.get(".order-pricing").find("price-card").eq(1).find("[id='audit-price-2']").eq(0).should("have.text", "$ 2,440");
        cy.get(".order-pricing").find("price-card").eq(1).find("[id='audit-days-2']").eq(0).should("have.text", " 1.5 onsite audit day");
        cy.get(".order-pricing").find("price-card").eq(1).find("[id='certification-fee-price-2']").should("have.text", "$ 250");
        cy.get(".order-pricing").find("price-card").eq(1).find(".total-price").should("have.text", "$ 2,690");
        //3rd year
        cy.get(".order-pricing").find("price-card").eq(2).find("[id='audit-price-3']").eq(0).should("have.text", "$ 4,575");
        cy.get(".order-pricing").find("price-card").eq(2).find("[id='audit-days-3']").eq(0).should("have.text", " 3 onsite audit days");
        cy.get(".order-pricing").find("price-card").eq(2).find("[id='certification-fee-price-3']").should("have.text", "$ 250");
        cy.get(".order-pricing").find("price-card").eq(2).find(".total-price").should("have.text", "$ 4,825");
        //Complexity factor
        cy.get(".order-pricing").find("[id='number-of-employees-iso_14001']").should("have.text", " Medium ");
        //3 years total
        cy.get(".order-pricing").find("[id='total-price']").should("have.text", "$ 10,205");
    })

})