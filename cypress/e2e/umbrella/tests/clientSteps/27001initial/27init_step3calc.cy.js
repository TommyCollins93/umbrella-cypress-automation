
describe("27001 initial - 3rd step - calculations", function(){

    beforeEach(function(){
        cy.visit("https://stage-iso14001.myaudit.net/system/login");
        cy.get("#email").type("autouser27init-step3@qq.qq");
        cy.get("#password").type("Qqqqqq11");
        cy.get("button").contains("LOGIN").click();
        cy.wait(3000);
    });

    it("business complexity 3, IT complexity 3, effort low, 200 total employees, 30% reduction", function(){
        /*
        Business complexity: 3
        IT complexity: 3
        Indicated effort: Low
        No. of employees: 200
        Final addition/reduction: -30%
        Estimate questions answers: 1 - a); 2 - a); 3 - a); 4 - a); 5 - a); 6 - a); 7 - a); 8 - a)
        */
        cy.get("order-details").find("#toggle-order-details").click();
        cy.get("#change-button").click();
            //rest of the form - price changed
            cy.get('#total-employeesiso_27001').clear().type("200");
            cy.get("#scope-description-needs-narrowing--iso_27001").find(".text").contains("Yes").click();
            // cy.get("#scope-description--iso_27001").clear().type("Edit testing note");
            // cy.get("#employees-within-scope-iso_27001").clear().type("100");
            /**/
            cy.get(".question-options").each(($row)=>{
                // var i = Math.floor(Math.random() * 2);
                cy.get($row).find(".question-option").eq(0).click();
            });
            cy.get("#estimate-question-long_option_single_choice-iso_27001-previously_documented_performance_description").type("test1");
        //
        cy.get(".decision-buttons").find("#change-button").click();
        cy.wait(4000);

        //ESTIMATE CHANGE PROPOSAL
        //1st year
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='audit-price-1']").eq(0).should("have.text", "$ 2,700");
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='audit-days-1']").eq(0).should("have.text", " 1 onsite audit day");
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='audit-price-1']").eq(1).should("have.text", "$ 15,300");
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='audit-days-1']").eq(1).should("have.text", " 6 onsite audit days");
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='certification-fee-price-1']").should("have.text", "$ 500");
        cy.get("price-change-approve").find("price-card").eq(0).find(".total-price").should("have.text", "$ 18,500");
        //2nd year
        cy.get("price-change-approve").find("price-card").eq(1).find("[id='audit-price-2']").should("have.text", "$ 6,300");
        cy.get("price-change-approve").find("price-card").eq(1).find("[id='audit-days-2']").should("have.text", " 2.5 onsite audit days");
        cy.get("price-change-approve").find("price-card").eq(1).find("[id='certification-fee-price-2']").should("have.text", "$ 500");
        cy.get("price-change-approve").find("price-card").eq(1).find(".total-price").should("have.text", "$ 6,800");
        //3rd year
        cy.get("price-change-approve").find("price-card").eq(2).find("[id='audit-price-3']").should("have.text", "$ 6,300");
        cy.get("price-change-approve").find("price-card").eq(2).find("[id='audit-days-3']").should("have.text", " 2.5 onsite audit days");
        cy.get("price-change-approve").find("price-card").eq(2).find("[id='certification-fee-price-3']").should("have.text", "$ 500");
        cy.get("price-change-approve").find("price-card").eq(2).find(".total-price").should("have.text", "$ 6,800");
        //Risk factor
        cy.get("price-change-approve").find(".label-value").eq(0).should("have.text", " Effort to audit: Low ");
        cy.get("price-change-approve").find(".label-value").eq(1).should("have.text", " Business complexity: Low ");
        cy.get("price-change-approve").find(".label-value").eq(2).should("have.text", "IT complexity: Low");
        //3 years total
        cy.get("price-change-approve").find("[id='total-price']").should("have.text", "$ 32,100");

        //Accept changes
        cy.get(".decision-buttons").eq(1).find("#approve-changes-button").click(); //save changes
        cy.wait(5000);
        
        //RECHECK APPROVED CHANGES
        //1st year
        cy.get(".order-pricing").find("price-card").eq(0).find("[id='audit-price-1']").eq(0).should("have.text", "$ 2,700");
        cy.get(".order-pricing").find("price-card").eq(0).find("[id='audit-days-1']").eq(0).should("have.text", " 1 onsite audit day");
        cy.get(".order-pricing").find("price-card").eq(0).find("[id='audit-price-1']").eq(1).should("have.text", "$ 15,300");
        cy.get(".order-pricing").find("price-card").eq(0).find("[id='audit-days-1']").eq(1).should("have.text", " 6 onsite audit days");
        cy.get(".order-pricing").find("price-card").eq(0).find("[id='certification-fee-price-1']").should("have.text", "$ 500");
        cy.get(".order-pricing").find("price-card").eq(0).find(".total-price").should("have.text", "$ 18,500");
        //2nd year
        cy.get(".order-pricing").find("price-card").eq(1).find("[id='audit-price-2']").should("have.text", "$ 6,300");
        cy.get(".order-pricing").find("price-card").eq(1).find("[id='audit-days-2']").should("have.text", " 2.5 onsite audit days");
        cy.get(".order-pricing").find("price-card").eq(1).find("[id='certification-fee-price-2']").should("have.text", "$ 500");
        cy.get(".order-pricing").find("price-card").eq(1).find(".total-price").should("have.text", "$ 6,800");
        //3rd year
        cy.get(".order-pricing").find("price-card").eq(2).find("[id='audit-price-3']").should("have.text", "$ 6,300");
        cy.get(".order-pricing").find("price-card").eq(2).find("[id='audit-days-3']").should("have.text", " 2.5 onsite audit days");
        cy.get(".order-pricing").find("price-card").eq(2).find("[id='certification-fee-price-3']").should("have.text", "$ 500");
        cy.get(".order-pricing").find("price-card").eq(2).find(".total-price").should("have.text", "$ 6,800");
        //Risk factor
        cy.get(".order-pricing").find(".label-value").eq(0).should("have.text", " Effort to audit: Low ");
        cy.get(".order-pricing").find(".label-value").eq(1).should("have.text", " Business complexity: Low ");
        cy.get(".order-pricing").find(".label-value").eq(2).should("have.text", "IT complexity: Low");
        //3 years total
        cy.get(".order-pricing").find("[id='total-price']").should("have.text", "$ 32,100");
    });

    it("business complexity 6, IT complexity 6, effort medium, 200 total employees, 0% reduction", function(){
        /*
        Business complexity: 6
        IT complexity: 6
        Indicated effort: Medium
        No. of employees: 200
        Final addition/reduction: 0%
        Estimate questions answers: 1 - b); 2 - b); 3 - b); 4 - b); 5 - b); 6 - b); 7 - b); 8 - b)
        */
        cy.get("order-details").find("#toggle-order-details").click();
        cy.get("#change-button").click();
            //rest of the form - price changed
            cy.get('#total-employeesiso_27001').clear().type("200");
            //cy.get("#scope-description-needs-narrowing--iso_27001").find(".text").contains("Yes").click();
            // cy.get("#scope-description--iso_27001").clear().type("Edit testing note");
            // cy.get("#employees-within-scope-iso_27001").clear().type("100");
            /**/
            cy.get(".question-options").each(($row)=>{
                // var i = Math.floor(Math.random() * 2);
                cy.get($row).find(".question-option").eq(1).click();
            });    
        //
        cy.get(".decision-buttons").find("#change-button").click();
        cy.wait(4000);

        //ESTIMATE CHANGE PROPOSAL
        //1st year
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='audit-price-1']").eq(0).should("have.text", "$ 2,700");
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='audit-days-1']").eq(0).should("have.text", " 1 onsite audit day");
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='audit-price-1']").eq(1).should("have.text", "$ 22,500");
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='audit-days-1']").eq(1).should("have.text", " 9 onsite audit days");
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='certification-fee-price-1']").should("have.text", "$ 500");
        cy.get("price-change-approve").find("price-card").eq(0).find(".total-price").should("have.text", "$ 25,700");
        //2nd year
        cy.get("price-change-approve").find("price-card").eq(1).find("[id='audit-price-2']").should("have.text", "$ 8,550");
        cy.get("price-change-approve").find("price-card").eq(1).find("[id='audit-days-2']").should("have.text", " 3.5 onsite audit days");
        cy.get("price-change-approve").find("price-card").eq(1).find("[id='certification-fee-price-2']").should("have.text", "$ 500");
        cy.get("price-change-approve").find("price-card").eq(1).find(".total-price").should("have.text", "$ 9,050");
        //3rd year
        cy.get("price-change-approve").find("price-card").eq(2).find("[id='audit-price-3']").should("have.text", "$ 8,550");
        cy.get("price-change-approve").find("price-card").eq(2).find("[id='audit-days-3']").should("have.text", " 3.5 onsite audit days");
        cy.get("price-change-approve").find("price-card").eq(2).find("[id='certification-fee-price-3']").should("have.text", "$ 500");
        cy.get("price-change-approve").find("price-card").eq(2).find(".total-price").should("have.text", "$ 9,050");
        //Risk factor
        cy.get("price-change-approve").find(".label-value").eq(0).should("have.text", " Effort to audit: Medium ");
        cy.get("price-change-approve").find(".label-value").eq(1).should("have.text", " Business complexity: Medium ");
        cy.get("price-change-approve").find(".label-value").eq(2).should("have.text", "IT complexity: Medium");
        //3 years total
        cy.get("price-change-approve").find("[id='total-price']").should("have.text", "$ 43,800");

        //Accept changes
        cy.get(".decision-buttons").eq(1).find("#approve-changes-button").click(); //save changes
        cy.wait(5000);
        
        //RECHECK APPROVED CHANGES
        //1st year
        cy.get(".order-pricing").find("price-card").eq(0).find("[id='audit-price-1']").eq(0).should("have.text", "$ 2,700");
        cy.get(".order-pricing").find("price-card").eq(0).find("[id='audit-days-1']").eq(0).should("have.text", " 1 onsite audit day");
        cy.get(".order-pricing").find("price-card").eq(0).find("[id='audit-price-1']").eq(1).should("have.text", "$ 22,500");
        cy.get(".order-pricing").find("price-card").eq(0).find("[id='audit-days-1']").eq(1).should("have.text", " 9 onsite audit days");
        cy.get(".order-pricing").find("price-card").eq(0).find("[id='certification-fee-price-1']").should("have.text", "$ 500");
        cy.get(".order-pricing").find("price-card").eq(0).find(".total-price").should("have.text", "$ 25,700");
        //2nd year
        cy.get(".order-pricing").find("price-card").eq(1).find("[id='audit-price-2']").should("have.text", "$ 8,550");
        cy.get(".order-pricing").find("price-card").eq(1).find("[id='audit-days-2']").should("have.text", " 3.5 onsite audit days");
        cy.get(".order-pricing").find("price-card").eq(1).find("[id='certification-fee-price-2']").should("have.text", "$ 500");
        cy.get(".order-pricing").find("price-card").eq(1).find(".total-price").should("have.text", "$ 9,050");
        //3rd year
        cy.get(".order-pricing").find("price-card").eq(2).find("[id='audit-price-3']").should("have.text", "$ 8,550");
        cy.get(".order-pricing").find("price-card").eq(2).find("[id='audit-days-3']").should("have.text", " 3.5 onsite audit days");
        cy.get(".order-pricing").find("price-card").eq(2).find("[id='certification-fee-price-3']").should("have.text", "$ 500");
        cy.get(".order-pricing").find("price-card").eq(2).find(".total-price").should("have.text", "$ 9,050");
        //Risk factor
        cy.get(".order-pricing").find(".label-value").eq(0).should("have.text", " Effort to audit: Medium ");
        cy.get(".order-pricing").find(".label-value").eq(1).should("have.text", " Business complexity: Medium ");
        cy.get(".order-pricing").find(".label-value").eq(2).should("have.text", "IT complexity: Medium");
        //3 years total
        cy.get(".order-pricing").find("[id='total-price']").should("have.text", "$ 43,800");
    });

    it("business complexity 9, IT complexity 9, effort high, 500 employees within scope, 50% addition", function(){
        /*
        Business complexity: 9
        IT complexity: 9
        Indicated effort: High
        No. of employees: 2025
        Employees within scope: 500
        Final addition/reduction: 50%
        Estimate questions answers: 1 - c); 2 - c); 3 - c); 4 - c); 5 - c); 6 - c); 7 - c); 8 - c)
        */
        cy.get("order-details").find("#toggle-order-details").click();
        cy.get("#change-button").click();
            //rest of the form - price changed
            cy.get('#total-employeesiso_27001').clear().type("2025");
            cy.get("#scope-description-needs-narrowing--iso_27001").find(".text").contains("No").click();
            cy.get("#scope-description--iso_27001").clear().type("Edit testing note");
            cy.get("#employees-within-scope-iso_27001").clear().type("500");
            /**/
            cy.get(".question-options").each(($row)=>{
                // var i = Math.floor(Math.random() * 2);
                cy.get($row).find(".question-option").eq(2).click();
            });  
        //
        cy.get(".decision-buttons").find("#change-button").click();
        cy.wait(4000);

        //ESTIMATE CHANGE PROPOSAL
        //1st year
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='audit-price-1']").eq(0).should("have.text", "$ 2,700");
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='audit-days-1']").eq(0).should("have.text", " 1 onsite audit day");
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='audit-price-1']").eq(1).should("have.text", "$ 41,850");
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='audit-days-1']").eq(1).should("have.text", " 16.5 onsite audit days");
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='certification-fee-price-1']").should("have.text", "$ 500");
        cy.get("price-change-approve").find("price-card").eq(0).find(".total-price").should("have.text", "$ 45,050");
        //2nd year
        cy.get("price-change-approve").find("price-card").eq(1).find("[id='audit-price-2']").should("have.text", "$ 14,850");
        cy.get("price-change-approve").find("price-card").eq(1).find("[id='audit-days-2']").should("have.text", " 6 onsite audit days");
        cy.get("price-change-approve").find("price-card").eq(1).find("[id='certification-fee-price-2']").should("have.text", "$ 500");
        cy.get("price-change-approve").find("price-card").eq(1).find(".total-price").should("have.text", "$ 15,350");
        //3rd year
        cy.get("price-change-approve").find("price-card").eq(2).find("[id='audit-price-3']").should("have.text", "$ 14,850");
        cy.get("price-change-approve").find("price-card").eq(2).find("[id='audit-days-3']").should("have.text", " 6 onsite audit days");
        cy.get("price-change-approve").find("price-card").eq(2).find("[id='certification-fee-price-3']").should("have.text", "$ 500");
        cy.get("price-change-approve").find("price-card").eq(2).find(".total-price").should("have.text", "$ 15,350");
        //Risk factor
        cy.get("price-change-approve").find(".label-value").eq(0).should("have.text", " Effort to audit: High ");
        cy.get("price-change-approve").find(".label-value").eq(1).should("have.text", " Business complexity: High ");
        cy.get("price-change-approve").find(".label-value").eq(2).should("have.text", "IT complexity: High");
        //3 years total
        cy.get("price-change-approve").find("[id='total-price']").should("have.text", "$ 75,750");

        //Accept changes
        cy.get(".decision-buttons").eq(1).find("#approve-changes-button").click(); //save changes
        cy.wait(5000);
        
        //RECHECK APPROVED CHANGES
        //1st year
        cy.get(".order-pricing").find("price-card").eq(0).find("[id='audit-price-1']").eq(0).should("have.text", "$ 2,700");
        cy.get(".order-pricing").find("price-card").eq(0).find("[id='audit-days-1']").eq(0).should("have.text", " 1 onsite audit day");
        cy.get(".order-pricing").find("price-card").eq(0).find("[id='audit-price-1']").eq(1).should("have.text", "$ 41,850");
        cy.get(".order-pricing").find("price-card").eq(0).find("[id='audit-days-1']").eq(1).should("have.text", " 16.5 onsite audit days");
        cy.get(".order-pricing").find("price-card").eq(0).find("[id='certification-fee-price-1']").should("have.text", "$ 500");
        cy.get(".order-pricing").find("price-card").eq(0).find(".total-price").should("have.text", "$ 45,050");
        //2nd year
        cy.get(".order-pricing").find("price-card").eq(1).find("[id='audit-price-2']").should("have.text", "$ 14,850");
        cy.get(".order-pricing").find("price-card").eq(1).find("[id='audit-days-2']").should("have.text", " 6 onsite audit days");
        cy.get(".order-pricing").find("price-card").eq(1).find("[id='certification-fee-price-2']").should("have.text", "$ 500");
        cy.get(".order-pricing").find("price-card").eq(1).find(".total-price").should("have.text", "$ 15,350");
        //3rd year
        cy.get(".order-pricing").find("price-card").eq(2).find("[id='audit-price-3']").should("have.text", "$ 14,850");
        cy.get(".order-pricing").find("price-card").eq(2).find("[id='audit-days-3']").should("have.text", " 6 onsite audit days");
        cy.get(".order-pricing").find("price-card").eq(2).find("[id='certification-fee-price-3']").should("have.text", "$ 500");
        cy.get(".order-pricing").find("price-card").eq(2).find(".total-price").should("have.text", "$ 15,350");
        //Risk factor
        cy.get(".order-pricing").find(".label-value").eq(0).should("have.text", " Effort to audit: High ");
        cy.get(".order-pricing").find(".label-value").eq(1).should("have.text", " Business complexity: High ");
        cy.get(".order-pricing").find(".label-value").eq(2).should("have.text", "IT complexity: High");
        //3 years total
        cy.get(".order-pricing").find("[id='total-price']").should("have.text", "$ 75,750");
    });

    it("business complexity 6, IT complexity 7, effort medium, 30 employees within scope, 20% addition", function(){
        /*
        Business complexity: 6
        IT complexity: 7
        Indicated effort: Medium
        No. of employees: 30
        Employees within scope: 30
        Final addition/reduction: 20%
        Estimate questions answers: 1 - a); 2 - b); 3 - c); 4 - b); 5 - c); 6 - b); 7 - b); 8 - c)
        */
        cy.get("order-details").find("#toggle-order-details").click();
        cy.get("#change-button").click();
            //rest of the form - price changed
            cy.get('#total-employeesiso_27001').clear().type("30");
            // cy.get("#scope-description-needs-narrowing--iso_27001").find(".text").contains("No").click();
            // cy.get("#scope-description--iso_27001").clear().type("Edit testing note");
            cy.get("#employees-within-scope-iso_27001").clear().type("30");
            /**/
            cy.get(".question-options").eq(0).find(".question-option").eq(0).click();
            cy.get(".question-options").eq(1).find(".question-option").eq(1).click();
            cy.get(".question-options").eq(2).find(".question-option").eq(2).click();
            cy.get(".question-options").eq(3).find(".question-option").eq(1).click();
            cy.get("#estimate-question-long_option_single_choice-iso_27001-previously_documented_performance_description").type("test1");
            cy.get(".question-options").eq(4).find(".question-option").eq(2).click();
            cy.get(".question-options").eq(5).find(".question-option").eq(1).click();
            cy.get(".question-options").eq(6).find(".question-option").eq(1).click();
            cy.get(".question-options").eq(7).find(".question-option").eq(2).click();
        //
        cy.get(".decision-buttons").find("#change-button").click();
        cy.wait(4000);

        //ESTIMATE CHANGE PROPOSAL
        //1st year
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='audit-price-1']").eq(0).should("have.text", "$ 2,700");
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='audit-days-1']").eq(0).should("have.text", " 1 onsite audit day");
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='audit-price-1']").eq(1).should("have.text", "$ 15,750");
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='audit-days-1']").eq(1).should("have.text", " 6.5 onsite audit days");
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='certification-fee-price-1']").should("have.text", "$ 500");
        cy.get("price-change-approve").find("price-card").eq(0).find(".total-price").should("have.text", "$ 18,950");
        //2nd year
        cy.get("price-change-approve").find("price-card").eq(1).find("[id='audit-price-2']").should("have.text", "$ 6,300");
        cy.get("price-change-approve").find("price-card").eq(1).find("[id='audit-days-2']").should("have.text", " 2.5 onsite audit days");
        cy.get("price-change-approve").find("price-card").eq(1).find("[id='certification-fee-price-2']").should("have.text", "$ 500");
        cy.get("price-change-approve").find("price-card").eq(1).find(".total-price").should("have.text", "$ 6,800");
        //3rd year
        cy.get("price-change-approve").find("price-card").eq(2).find("[id='audit-price-3']").should("have.text", "$ 6,300");
        cy.get("price-change-approve").find("price-card").eq(2).find("[id='audit-days-3']").should("have.text", " 2.5 onsite audit days");
        cy.get("price-change-approve").find("price-card").eq(2).find("[id='certification-fee-price-3']").should("have.text", "$ 500");
        cy.get("price-change-approve").find("price-card").eq(2).find(".total-price").should("have.text", "$ 6,800");
        //Risk factor
        cy.get("price-change-approve").find(".label-value").eq(0).should("have.text", " Effort to audit: Medium ");
        cy.get("price-change-approve").find(".label-value").eq(1).should("have.text", " Business complexity: Medium ");
        cy.get("price-change-approve").find(".label-value").eq(2).should("have.text", "IT complexity: High");
        //3 years total
        cy.get("price-change-approve").find("[id='total-price']").should("have.text", "$ 32,550");

        //Accept changes
        cy.get(".decision-buttons").eq(1).find("#approve-changes-button").click(); //save changes
        cy.wait(5000);
        
        //RECHECK APPROVED CHANGES
        //1st year
        cy.get(".order-pricing").find("price-card").eq(0).find("[id='audit-price-1']").eq(0).should("have.text", "$ 2,700");
        cy.get(".order-pricing").find("price-card").eq(0).find("[id='audit-days-1']").eq(0).should("have.text", " 1 onsite audit day");
        cy.get(".order-pricing").find("price-card").eq(0).find("[id='audit-price-1']").eq(1).should("have.text", "$ 15,750");
        cy.get(".order-pricing").find("price-card").eq(0).find("[id='audit-days-1']").eq(1).should("have.text", " 6.5 onsite audit days");
        cy.get(".order-pricing").find("price-card").eq(0).find("[id='certification-fee-price-1']").should("have.text", "$ 500");
        cy.get(".order-pricing").find("price-card").eq(0).find(".total-price").should("have.text", "$ 18,950");
        //2nd year
        cy.get(".order-pricing").find("price-card").eq(1).find("[id='audit-price-2']").should("have.text", "$ 6,300");
        cy.get(".order-pricing").find("price-card").eq(1).find("[id='audit-days-2']").should("have.text", " 2.5 onsite audit days");
        cy.get(".order-pricing").find("price-card").eq(1).find("[id='certification-fee-price-2']").should("have.text", "$ 500");
        cy.get(".order-pricing").find("price-card").eq(1).find(".total-price").should("have.text", "$ 6,800");
        //3rd year
        cy.get(".order-pricing").find("price-card").eq(2).find("[id='audit-price-3']").should("have.text", "$ 6,300");
        cy.get(".order-pricing").find("price-card").eq(2).find("[id='audit-days-3']").should("have.text", " 2.5 onsite audit days");
        cy.get(".order-pricing").find("price-card").eq(2).find("[id='certification-fee-price-3']").should("have.text", "$ 500");
        cy.get(".order-pricing").find("price-card").eq(2).find(".total-price").should("have.text", "$ 6,800");
        //Risk factor
        cy.get(".order-pricing").find(".label-value").eq(0).should("have.text", " Effort to audit: Medium ");
        cy.get(".order-pricing").find(".label-value").eq(1).should("have.text", " Business complexity: Medium ");
        cy.get(".order-pricing").find(".label-value").eq(2).should("have.text", "IT complexity: High");
        //3 years total
        cy.get(".order-pricing").find("[id='total-price']").should("have.text", "$ 32,550");
    })

})