
describe("27001 and 27701 transfer - 3rd step - calculations", function(){

    beforeEach(function(){
        cy.visit("https://stage-iso14001.myaudit.net/system/login");
        cy.get("#email").type("autouser27and277tran-step3@qq.qq");
        cy.get("#password").type("Qqqqqq11");
        cy.get("button").contains("LOGIN").click();
        cy.wait(3000);
    });

    it("business complexity 3, IT complexity/PIA 3, effort low, 200 total employees, 30% reduction, recert", function(){
        /*
        Business complexity: 3
        IT complexity/Private Information Availability: 3
        Indicated effort: Low
        No. of employees: 200
        Final addition/reduction: -30%
        27001 estimate questions answers: 1 - a); 2 - a); 3 - a); 4 - a); 5 - a); 6 - a); 7 - a); 8 - a)
        27701 estimate questions answers: 9 - a); 10 - a)
        Both last audit events: Recertification
        */
        cy.get("order-details").find("#toggle-order-details").click();
        cy.get("#change-button").click();
            //change of audit event
            cy.get("[id='current-certification-last-audit-event-radio-group']").each(($lastAudit)=>{
                cy.get($lastAudit).find(".text").contains("Recertification").click();
            });
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
        //27001
        //1st year
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='audit-price-1']").should("have.text", "$ 6,300");
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='audit-days-1']").should("have.text", " 2.5 onsite audit days");
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='certification-fee-price-1']").should("have.text", "$ 500");
        cy.get("price-change-approve").find("price-card").eq(0).find(".total-price").should("have.text", "$ 6,800");
        //2nd year
        cy.get("price-change-approve").find("price-card").eq(1).find("[id='audit-price-2']").should("have.text", "$ 6,300");
        cy.get("price-change-approve").find("price-card").eq(1).find("[id='audit-days-2']").should("have.text", " 2.5 onsite audit days");
        cy.get("price-change-approve").find("price-card").eq(1).find("[id='certification-fee-price-2']").should("have.text", "$ 500");
        cy.get("price-change-approve").find("price-card").eq(1).find(".total-price").should("have.text", "$ 6,800");
        //3rd year
        cy.get("price-change-approve").find("price-card").eq(2).find("[id='audit-price-3']").should("have.text", "$ 12,150");
        cy.get("price-change-approve").find("price-card").eq(2).find("[id='audit-days-3']").should("have.text", " 5 onsite audit days");
        cy.get("price-change-approve").find("price-card").eq(2).find("[id='certification-fee-price-3']").should("have.text", "$ 500");
        cy.get("price-change-approve").find("price-card").eq(2).find(".total-price").should("have.text", "$ 12,650");
        //Risk factor
        cy.get("price-change-approve").find(".label-value").eq(0).should("have.text", " Effort to audit: Low ");
        cy.get("price-change-approve").find(".label-value").eq(1).should("have.text", " Business complexity: Low ");
        cy.get("price-change-approve").find(".label-value").eq(2).should("have.text", "IT complexity: Low");
        //27701
        //1st year
        cy.get("price-change-approve").find("price-card").eq(3).find("[id='audit-price-1']").should("have.text", "$ 2,250");
        cy.get("price-change-approve").find("price-card").eq(3).find("[id='audit-days-1']").should("have.text", " 1 onsite audit day");
        cy.get("price-change-approve").find("price-card").eq(3).find("[id='certification-fee-price-1']").should("have.text", "$ 500");
        cy.get("price-change-approve").find("price-card").eq(3).find(".total-price").should("have.text", "$ 2,750");
        //2nd year
        cy.get("price-change-approve").find("price-card").eq(4).find("[id='audit-price-2']").should("have.text", "$ 2,250");
        cy.get("price-change-approve").find("price-card").eq(4).find("[id='audit-days-2']").should("have.text", " 1 onsite audit day");
        cy.get("price-change-approve").find("price-card").eq(4).find("[id='certification-fee-price-2']").should("have.text", "$ 500");
        cy.get("price-change-approve").find("price-card").eq(4).find(".total-price").should("have.text", "$ 2,750");
        //3rd year
        cy.get("price-change-approve").find("price-card").eq(5).find("[id='audit-price-3']").should("have.text", "$ 4,050");
        cy.get("price-change-approve").find("price-card").eq(5).find("[id='audit-days-3']").should("have.text", " 1.5 onsite audit day");
        cy.get("price-change-approve").find("price-card").eq(5).find("[id='certification-fee-price-3']").should("have.text", "$ 500");
        cy.get("price-change-approve").find("price-card").eq(5).find(".total-price").should("have.text", "$ 4,550");
        //Risk factor
        cy.get("price-change-approve").find(".label-value").eq(3).should("have.text", " Effort to audit: Low ");
        cy.get("price-change-approve").find(".label-value").eq(4).should("have.text", " Business complexity: Low ");
        cy.get("price-change-approve").find(".label-value").eq(5).should("have.text", "Private Information Availability: Low");
        //3 years total
        cy.get("price-change-approve").find("[id='total-price']").should("have.text", "$ 36,300");

        //Accept changes
        cy.get(".decision-buttons").eq(1).find("#approve-changes-button").click(); //save changes
        cy.wait(5000);
        
        //RECHECK APPROVED CHANGES
        //27001
        //1st year
        cy.get(".order-pricing").find("price-card").eq(0).find("[id='audit-price-1']").should("have.text", "$ 6,300");
        cy.get(".order-pricing").find("price-card").eq(0).find("[id='audit-days-1']").should("have.text", " 2.5 onsite audit days");
        cy.get(".order-pricing").find("price-card").eq(0).find("[id='certification-fee-price-1']").should("have.text", "$ 500");
        cy.get(".order-pricing").find("price-card").eq(0).find(".total-price").should("have.text", "$ 6,800");
        //2nd year
        cy.get(".order-pricing").find("price-card").eq(1).find("[id='audit-price-2']").should("have.text", "$ 6,300");
        cy.get(".order-pricing").find("price-card").eq(1).find("[id='audit-days-2']").should("have.text", " 2.5 onsite audit days");
        cy.get(".order-pricing").find("price-card").eq(1).find("[id='certification-fee-price-2']").should("have.text", "$ 500");
        cy.get(".order-pricing").find("price-card").eq(1).find(".total-price").should("have.text", "$ 6,800");
        //3rd year
        cy.get(".order-pricing").find("price-card").eq(2).find("[id='audit-price-3']").should("have.text", "$ 12,150");
        cy.get(".order-pricing").find("price-card").eq(2).find("[id='audit-days-3']").should("have.text", " 5 onsite audit days");
        cy.get(".order-pricing").find("price-card").eq(2).find("[id='certification-fee-price-3']").should("have.text", "$ 500");
        cy.get(".order-pricing").find("price-card").eq(2).find(".total-price").should("have.text", "$ 12,650");
        //Risk factor
        cy.get(".order-pricing").find(".label-value").eq(0).should("have.text", " Effort to audit: Low ");
        cy.get(".order-pricing").find(".label-value").eq(1).should("have.text", " Business complexity: Low ");
        cy.get(".order-pricing").find(".label-value").eq(2).should("have.text", "IT complexity: Low");
        //27701
        //1st year
        cy.get(".order-pricing").find("price-card").eq(3).find("[id='audit-price-1']").should("have.text", "$ 2,250");
        cy.get(".order-pricing").find("price-card").eq(3).find("[id='audit-days-1']").should("have.text", " 1 onsite audit day");
        cy.get(".order-pricing").find("price-card").eq(3).find("[id='certification-fee-price-1']").should("have.text", "$ 500");
        cy.get(".order-pricing").find("price-card").eq(3).find(".total-price").should("have.text", "$ 2,750");
        //2nd year
        cy.get(".order-pricing").find("price-card").eq(4).find("[id='audit-price-2']").should("have.text", "$ 2,250");
        cy.get(".order-pricing").find("price-card").eq(4).find("[id='audit-days-2']").should("have.text", " 1 onsite audit day");
        cy.get(".order-pricing").find("price-card").eq(4).find("[id='certification-fee-price-2']").should("have.text", "$ 500");
        cy.get(".order-pricing").find("price-card").eq(4).find(".total-price").should("have.text", "$ 2,750");
        //3rd year
        cy.get(".order-pricing").find("price-card").eq(5).find("[id='audit-price-3']").should("have.text", "$ 4,050");
        cy.get(".order-pricing").find("price-card").eq(5).find("[id='audit-days-3']").should("have.text", " 1.5 onsite audit day");
        cy.get(".order-pricing").find("price-card").eq(5).find("[id='certification-fee-price-3']").should("have.text", "$ 500");
        cy.get(".order-pricing").find("price-card").eq(5).find(".total-price").should("have.text", "$ 4,550");
        //Risk factor
        cy.get(".order-pricing").find(".label-value").eq(3).should("have.text", " Effort to audit: Low ");
        cy.get(".order-pricing").find(".label-value").eq(4).should("have.text", " Business complexity: Low ");
        cy.get(".order-pricing").find(".label-value").eq(5).should("have.text", "Private Information Availability: Low");
        //3 years total
        cy.get(".order-pricing").find("[id='total-price']").should("have.text", "$ 36,300");
    });

    it("business complexity 6, IT complexity/PIA 6, effort medium, 200 total employees, 0% reduction, surv 2", function(){
        /*
        Business complexity: 6
        IT complexity/Private Information Availability: 6
        Indicated effort: Medium
        No. of employees: 200
        Final addition/reduction: 0%
        27001 estimate questions answers: 1 - b); 2 - b); 3 - b); 4 - b); 5 - b); 6 - b); 7 - b); 8 - b)
        27701 estimate questions answers: 9 - b); 10 - b)
        Both last audit events: Surveillance 2
        */
        cy.get("order-details").find("#toggle-order-details").click();
        cy.get("#change-button").click();
            //change of audit event
            cy.get("[id='current-certification-last-audit-event-radio-group']").each(($lastAudit2)=>{
                cy.get($lastAudit2).find(".text").contains("Surveillance 2").click();
            });
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
        //27001
        //1st year
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='audit-price-1']").should("have.text", "$ 17,100");
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='audit-days-1']").should("have.text", " 7 onsite audit days");
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='certification-fee-price-1']").should("have.text", "$ 500");
        cy.get("price-change-approve").find("price-card").eq(0).find(".total-price").should("have.text", "$ 17,600");
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
        //27701
        //1st year
        cy.get("price-change-approve").find("price-card").eq(3).find("[id='audit-price-1']").should("have.text", "$ 4,500");
        cy.get("price-change-approve").find("price-card").eq(3).find("[id='audit-days-1']").should("have.text", " 2 onsite audit days");
        cy.get("price-change-approve").find("price-card").eq(3).find("[id='certification-fee-price-1']").should("have.text", "$ 500");
        cy.get("price-change-approve").find("price-card").eq(3).find(".total-price").should("have.text", "$ 5,000");
        //2nd year
        cy.get("price-change-approve").find("price-card").eq(4).find("[id='audit-price-2']").should("have.text", "$ 3,150");
        cy.get("price-change-approve").find("price-card").eq(4).find("[id='audit-days-2']").should("have.text", " 1.5 onsite audit day");
        cy.get("price-change-approve").find("price-card").eq(4).find("[id='certification-fee-price-2']").should("have.text", "$ 500");
        cy.get("price-change-approve").find("price-card").eq(4).find(".total-price").should("have.text", "$ 3,650");
        //3rd year
        cy.get("price-change-approve").find("price-card").eq(5).find("[id='audit-price-3']").should("have.text", "$ 3,150");
        cy.get("price-change-approve").find("price-card").eq(5).find("[id='audit-days-3']").should("have.text", " 1.5 onsite audit day");
        cy.get("price-change-approve").find("price-card").eq(5).find("[id='certification-fee-price-3']").should("have.text", "$ 500");
        cy.get("price-change-approve").find("price-card").eq(5).find(".total-price").should("have.text", "$ 3,650");
        //Risk factor
        cy.get("price-change-approve").find(".label-value").eq(3).should("have.text", " Effort to audit: Medium ");
        cy.get("price-change-approve").find(".label-value").eq(4).should("have.text", " Business complexity: Medium ");
        cy.get("price-change-approve").find(".label-value").eq(5).should("have.text", "Private Information Availability: Medium");
        //3 years total
        cy.get("price-change-approve").find("[id='total-price']").should("have.text", "$ 48,000");

        //Accept changes
        cy.get(".decision-buttons").eq(1).find("#approve-changes-button").click(); //save changes
        cy.wait(5000);
        
        //RECHECK APPROVED CHANGES
        //27001
        //1st year
        cy.get(".order-pricing").find("price-card").eq(0).find("[id='audit-price-1']").should("have.text", "$ 17,100");
        cy.get(".order-pricing").find("price-card").eq(0).find("[id='audit-days-1']").should("have.text", " 7 onsite audit days");
        cy.get(".order-pricing").find("price-card").eq(0).find("[id='certification-fee-price-1']").should("have.text", "$ 500");
        cy.get(".order-pricing").find("price-card").eq(0).find(".total-price").should("have.text", "$ 17,600");
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
        //27701
        //1st year
        cy.get(".order-pricing").find("price-card").eq(3).find("[id='audit-price-1']").should("have.text", "$ 4,500");
        cy.get(".order-pricing").find("price-card").eq(3).find("[id='audit-days-1']").should("have.text", " 2 onsite audit days");
        cy.get(".order-pricing").find("price-card").eq(3).find("[id='certification-fee-price-1']").should("have.text", "$ 500");
        cy.get(".order-pricing").find("price-card").eq(3).find(".total-price").should("have.text", "$ 5,000");
        //2nd year
        cy.get(".order-pricing").find("price-card").eq(4).find("[id='audit-price-2']").should("have.text", "$ 3,150");
        cy.get(".order-pricing").find("price-card").eq(4).find("[id='audit-days-2']").should("have.text", " 1.5 onsite audit day");
        cy.get(".order-pricing").find("price-card").eq(4).find("[id='certification-fee-price-2']").should("have.text", "$ 500");
        cy.get(".order-pricing").find("price-card").eq(4).find(".total-price").should("have.text", "$ 3,650");
        //3rd year
        cy.get(".order-pricing").find("price-card").eq(5).find("[id='audit-price-3']").should("have.text", "$ 3,150");
        cy.get(".order-pricing").find("price-card").eq(5).find("[id='audit-days-3']").should("have.text", " 1.5 onsite audit day");
        cy.get(".order-pricing").find("price-card").eq(5).find("[id='certification-fee-price-3']").should("have.text", "$ 500");
        cy.get(".order-pricing").find("price-card").eq(5).find(".total-price").should("have.text", "$ 3,650");
        //Risk factor
        cy.get(".order-pricing").find(".label-value").eq(3).should("have.text", " Effort to audit: Medium ");
        cy.get(".order-pricing").find(".label-value").eq(4).should("have.text", " Business complexity: Medium ");
        cy.get(".order-pricing").find(".label-value").eq(5).should("have.text", "Private Information Availability: Medium");
        //3 years total
        cy.get(".order-pricing").find("[id='total-price']").should("have.text", "$ 48,000");
    });

    it("business complexity 9, IT complexity/PIA 9, effort high, 500 employees within scope, 50% addition", function(){
        /*
        Business complexity: 9
        IT complexity/Private Information Availability: 9
        Indicated effort: High
        No. of employees: 2025
        Employees within scope: 500
        Final addition/reduction: 50%
        27001 estimate questions answers: 1 - c); 2 - c); 3 - c); 4 - c); 5 - c); 6 - c); 7 - c); 8 - c)
        27701 estimate questions answers: 9 - c); 10 - b)
        Both last audit events: Surveillance 1
        */
        cy.get("order-details").find("#toggle-order-details").click();
        cy.get("#change-button").click();
            //change of audit event
            cy.get("[id='current-certification-last-audit-event-radio-group']").each(($lastAudit3)=>{
                cy.get($lastAudit3).find(".text").contains("Surveillance 1").click();
            });
            //rest of the form - price changed
            cy.get('#total-employeesiso_27001').clear().type("2025");
            cy.get("#scope-description-needs-narrowing--iso_27001").find(".text").contains("No").click();
            cy.get("#scope-description--iso_27001").clear().type("Edit testing note");
            cy.get("#employees-within-scope-iso_27001").clear().type("500");
            /**/
            cy.get(".question-options").eq(0).find(".question-option").eq(2).click();
            cy.get(".question-options").eq(1).find(".question-option").eq(2).click();
            cy.get(".question-options").eq(2).find(".question-option").eq(2).click();
            cy.get(".question-options").eq(3).find(".question-option").eq(2).click();
            cy.get(".question-options").eq(4).find(".question-option").eq(2).click();
            cy.get(".question-options").eq(5).find(".question-option").eq(2).click();
            cy.get(".question-options").eq(6).find(".question-option").eq(2).click();
            cy.get(".question-options").eq(7).find(".question-option").eq(2).click();
            cy.get(".question-options").eq(8).find(".question-option").eq(2).click();
            cy.get(".question-options").eq(9).find(".question-option").eq(1).click();
        //
        cy.get(".decision-buttons").find("#change-button").click();
        cy.wait(4000);

        //ESTIMATE CHANGE PROPOSAL
        //27001
        //1st year
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='audit-price-1']").should("have.text", "$ 14,850");
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='audit-days-1']").should("have.text", " 6 onsite audit days");
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='certification-fee-price-1']").should("have.text", "$ 500");
        cy.get("price-change-approve").find("price-card").eq(0).find(".total-price").should("have.text", "$ 15,350");
        //2nd year
        cy.get("price-change-approve").find("price-card").eq(1).find("[id='audit-price-2']").should("have.text", "$ 29,700");
        cy.get("price-change-approve").find("price-card").eq(1).find("[id='audit-days-2']").should("have.text", " 12 onsite audit days");
        cy.get("price-change-approve").find("price-card").eq(1).find("[id='certification-fee-price-2']").should("have.text", "$ 500");
        cy.get("price-change-approve").find("price-card").eq(1).find(".total-price").should("have.text", "$ 30,200");
        //3rd year
        cy.get("price-change-approve").find("price-card").eq(2).find("[id='audit-price-3']").should("have.text", "$ 14,850");
        cy.get("price-change-approve").find("price-card").eq(2).find("[id='audit-days-3']").should("have.text", " 6 onsite audit days");
        cy.get("price-change-approve").find("price-card").eq(2).find("[id='certification-fee-price-3']").should("have.text", "$ 500");
        cy.get("price-change-approve").find("price-card").eq(2).find(".total-price").should("have.text", "$ 15,350");
        //Risk factor
        cy.get("price-change-approve").find(".label-value").eq(0).should("have.text", " Effort to audit: High ");
        cy.get("price-change-approve").find(".label-value").eq(1).should("have.text", " Business complexity: High ");
        cy.get("price-change-approve").find(".label-value").eq(2).should("have.text", "IT complexity: High");
        //27701
        //1st year
        cy.get("price-change-approve").find("price-card").eq(3).find("[id='audit-price-1']").should("have.text", "$ 8,550");
        cy.get("price-change-approve").find("price-card").eq(3).find("[id='audit-days-1']").should("have.text", " 3.5 onsite audit days");
        cy.get("price-change-approve").find("price-card").eq(3).find("[id='certification-fee-price-1']").should("have.text", "$ 500");
        cy.get("price-change-approve").find("price-card").eq(3).find(".total-price").should("have.text", "$ 9,050");
        //2nd year
        cy.get("price-change-approve").find("price-card").eq(4).find("[id='audit-price-2']").should("have.text", "$ 15,750");
        cy.get("price-change-approve").find("price-card").eq(4).find("[id='audit-days-2']").should("have.text", " 6.5 onsite audit days");
        cy.get("price-change-approve").find("price-card").eq(4).find("[id='certification-fee-price-2']").should("have.text", "$ 500");
        cy.get("price-change-approve").find("price-card").eq(4).find(".total-price").should("have.text", "$ 16,250");
        //3rd year
        cy.get("price-change-approve").find("price-card").eq(5).find("[id='audit-price-3']").should("have.text", "$ 8,550");
        cy.get("price-change-approve").find("price-card").eq(5).find("[id='audit-days-3']").should("have.text", " 3.5 onsite audit days");
        cy.get("price-change-approve").find("price-card").eq(5).find("[id='certification-fee-price-3']").should("have.text", "$ 500");
        cy.get("price-change-approve").find("price-card").eq(5).find(".total-price").should("have.text", "$ 9,050");
        //Risk factor
        cy.get("price-change-approve").find(".label-value").eq(3).should("have.text", " Effort to audit: High ");
        cy.get("price-change-approve").find(".label-value").eq(4).should("have.text", " Business complexity: High ");
        cy.get("price-change-approve").find(".label-value").eq(5).should("have.text", "Private Information Availability: High");
        //3 years total
        cy.get("price-change-approve").find("[id='total-price']").should("have.text", "$ 95,250");

        //Accept changes
        cy.get(".decision-buttons").eq(1).find("#approve-changes-button").click(); //save changes
        cy.wait(5000);
        
        //RECHECK APPROVED CHANGES
        //27001
        //1st year
        cy.get(".order-pricing").find("price-card").eq(0).find("[id='audit-price-1']").should("have.text", "$ 14,850");
        cy.get(".order-pricing").find("price-card").eq(0).find("[id='audit-days-1']").should("have.text", " 6 onsite audit days");
        cy.get(".order-pricing").find("price-card").eq(0).find("[id='certification-fee-price-1']").should("have.text", "$ 500");
        cy.get(".order-pricing").find("price-card").eq(0).find(".total-price").should("have.text", "$ 15,350");
        //2nd year
        cy.get(".order-pricing").find("price-card").eq(1).find("[id='audit-price-2']").should("have.text", "$ 29,700");
        cy.get(".order-pricing").find("price-card").eq(1).find("[id='audit-days-2']").should("have.text", " 12 onsite audit days");
        cy.get(".order-pricing").find("price-card").eq(1).find("[id='certification-fee-price-2']").should("have.text", "$ 500");
        cy.get(".order-pricing").find("price-card").eq(1).find(".total-price").should("have.text", "$ 30,200");
        //3rd year
        cy.get(".order-pricing").find("price-card").eq(2).find("[id='audit-price-3']").should("have.text", "$ 14,850");
        cy.get(".order-pricing").find("price-card").eq(2).find("[id='audit-days-3']").should("have.text", " 6 onsite audit days");
        cy.get(".order-pricing").find("price-card").eq(2).find("[id='certification-fee-price-3']").should("have.text", "$ 500");
        cy.get(".order-pricing").find("price-card").eq(2).find(".total-price").should("have.text", "$ 15,350");
        //Risk factor
        cy.get(".order-pricing").find(".label-value").eq(0).should("have.text", " Effort to audit: High ");
        cy.get(".order-pricing").find(".label-value").eq(1).should("have.text", " Business complexity: High ");
        cy.get(".order-pricing").find(".label-value").eq(2).should("have.text", "IT complexity: High");
        //27701
        //1st year
        cy.get(".order-pricing").find("price-card").eq(3).find("[id='audit-price-1']").should("have.text", "$ 8,550");
        cy.get(".order-pricing").find("price-card").eq(3).find("[id='audit-days-1']").should("have.text", " 3.5 onsite audit days");
        cy.get(".order-pricing").find("price-card").eq(3).find("[id='certification-fee-price-1']").should("have.text", "$ 500");
        cy.get(".order-pricing").find("price-card").eq(3).find(".total-price").should("have.text", "$ 9,050");
        //2nd year
        cy.get(".order-pricing").find("price-card").eq(4).find("[id='audit-price-2']").should("have.text", "$ 15,750");
        cy.get(".order-pricing").find("price-card").eq(4).find("[id='audit-days-2']").should("have.text", " 6.5 onsite audit days");
        cy.get(".order-pricing").find("price-card").eq(4).find("[id='certification-fee-price-2']").should("have.text", "$ 500");
        cy.get(".order-pricing").find("price-card").eq(4).find(".total-price").should("have.text", "$ 16,250");
        //3rd year
        cy.get(".order-pricing").find("price-card").eq(5).find("[id='audit-price-3']").should("have.text", "$ 8,550");
        cy.get(".order-pricing").find("price-card").eq(5).find("[id='audit-days-3']").should("have.text", " 3.5 onsite audit days");
        cy.get(".order-pricing").find("price-card").eq(5).find("[id='certification-fee-price-3']").should("have.text", "$ 500");
        cy.get(".order-pricing").find("price-card").eq(5).find(".total-price").should("have.text", "$ 9,050");
        //Risk factor
        cy.get(".order-pricing").find(".label-value").eq(3).should("have.text", " Effort to audit: High ");
        cy.get(".order-pricing").find(".label-value").eq(4).should("have.text", " Business complexity: High ");
        cy.get(".order-pricing").find(".label-value").eq(5).should("have.text", "Private Information Availability: High");
        //3 years total
        cy.get(".order-pricing").find("[id='total-price']").should("have.text", "$ 95,250");
    });

    it("business complexity 6, IT complexity/PIA 7, effort medium, 30 employees within scope, 20% addition", function(){
        /*
        Business complexity: 6
        IT complexity/Private Information Availability: 7
        Indicated effort: Medium
        No. of employees: 30
        Employees within scope: 30
        Final addition/reduction: 20%
        27001 estimate questions answers: 1 - a); 2 - b); 3 - c); 4 - b); 5 - c); 6 - b); 7 - b); 8 - c)
        27701 estimate questions answers: 9 - b); 10 - a)
        Both last audit events: Initial Certification
        */
        cy.get("order-details").find("#toggle-order-details").click();
        cy.get("#change-button").click();
            //change of audit event
            cy.get("[id='current-certification-last-audit-event-radio-group']").each(($lastAudit2)=>{
                cy.get($lastAudit2).find(".text").contains("Initial Certification ").click();
            });
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
            cy.get("#estimate-question-long_option_single_choice-iso_27001-previously_documented_performance_description").clear().type("abcabc")
            cy.get(".question-options").eq(4).find(".question-option").eq(2).click();
            cy.get(".question-options").eq(5).find(".question-option").eq(1).click();
            cy.get(".question-options").eq(6).find(".question-option").eq(1).click();
            cy.get(".question-options").eq(7).find(".question-option").eq(2).click();
            cy.get(".question-options").eq(8).find(".question-option").eq(1).click();
            cy.get(".question-options").eq(9).find(".question-option").eq(0).click();
        //
        cy.get(".decision-buttons").find("#change-button").click();
        cy.wait(4000);

        //ESTIMATE CHANGE PROPOSAL
        //27001
        //1st year
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='audit-price-1']").should("have.text", "$ 6,300");
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='audit-days-1']").should("have.text", " 2.5 onsite audit days");
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='certification-fee-price-1']").should("have.text", "$ 500");
        cy.get("price-change-approve").find("price-card").eq(0).find(".total-price").should("have.text", "$ 6,800");
        //2nd year
        cy.get("price-change-approve").find("price-card").eq(1).find("[id='audit-price-2']").should("have.text", "$ 6,300");
        cy.get("price-change-approve").find("price-card").eq(1).find("[id='audit-days-2']").should("have.text", " 2.5 onsite audit days");
        cy.get("price-change-approve").find("price-card").eq(1).find("[id='certification-fee-price-2']").should("have.text", "$ 500");
        cy.get("price-change-approve").find("price-card").eq(1).find(".total-price").should("have.text", "$ 6,800");
        //3rd year
        cy.get("price-change-approve").find("price-card").eq(2).find("[id='audit-price-3']").should("have.text", "$ 12,600");
        cy.get("price-change-approve").find("price-card").eq(2).find("[id='audit-days-3']").should("have.text", " 5 onsite audit days");
        cy.get("price-change-approve").find("price-card").eq(2).find("[id='certification-fee-price-3']").should("have.text", "$ 500");
        cy.get("price-change-approve").find("price-card").eq(2).find(".total-price").should("have.text", "$ 13,100");
        //Risk factor
        cy.get("price-change-approve").find(".label-value").eq(0).should("have.text", " Effort to audit: Medium ");
        cy.get("price-change-approve").find(".label-value").eq(1).should("have.text", " Business complexity: Medium ");
        cy.get("price-change-approve").find(".label-value").eq(2).should("have.text", "IT complexity: High");
        //27701
        //1st year
        cy.get("price-change-approve").find("price-card").eq(3).find("[id='audit-price-1']").should("have.text", "$ 2,250");
        cy.get("price-change-approve").find("price-card").eq(3).find("[id='audit-days-1']").should("have.text", " 1 onsite audit day");
        cy.get("price-change-approve").find("price-card").eq(3).find("[id='certification-fee-price-1']").should("have.text", "$ 500");
        cy.get("price-change-approve").find("price-card").eq(3).find(".total-price").should("have.text", "$ 2,750");
        //2nd year
        cy.get("price-change-approve").find("price-card").eq(4).find("[id='audit-price-2']").should("have.text", "$ 2,250");
        cy.get("price-change-approve").find("price-card").eq(4).find("[id='audit-days-2']").should("have.text", " 1 onsite audit day");
        cy.get("price-change-approve").find("price-card").eq(4).find("[id='certification-fee-price-2']").should("have.text", "$ 500");
        cy.get("price-change-approve").find("price-card").eq(4).find(".total-price").should("have.text", "$ 2,750");
        //3rd year
        cy.get("price-change-approve").find("price-card").eq(5).find("[id='audit-price-3']").should("have.text", "$ 2,700");
        cy.get("price-change-approve").find("price-card").eq(5).find("[id='audit-days-3']").should("have.text", " 1 onsite audit day");
        cy.get("price-change-approve").find("price-card").eq(5).find("[id='certification-fee-price-3']").should("have.text", "$ 500");
        cy.get("price-change-approve").find("price-card").eq(5).find(".total-price").should("have.text", "$ 3,200");
        //Risk factor
        cy.get("price-change-approve").find(".label-value").eq(3).should("have.text", " Effort to audit: Medium ");
        cy.get("price-change-approve").find(".label-value").eq(4).should("have.text", " Business complexity: Medium ");
        cy.get("price-change-approve").find(".label-value").eq(5).should("have.text", "Private Information Availability: High");
        //3 years total
        cy.get("price-change-approve").find("[id='total-price']").should("have.text", "$ 35,400");

        //Accept changes
        cy.get(".decision-buttons").eq(1).find("#approve-changes-button").click(); //save changes
        cy.wait(5000);
        
        //RECHECK APPROVED CHANGES
        //27001
        //1st year
        cy.get(".order-pricing").find("price-card").eq(0).find("[id='audit-price-1']").should("have.text", "$ 6,300");
        cy.get(".order-pricing").find("price-card").eq(0).find("[id='audit-days-1']").should("have.text", " 2.5 onsite audit days");
        cy.get(".order-pricing").find("price-card").eq(0).find("[id='certification-fee-price-1']").should("have.text", "$ 500");
        cy.get(".order-pricing").find("price-card").eq(0).find(".total-price").should("have.text", "$ 6,800");
        //2nd year
        cy.get(".order-pricing").find("price-card").eq(1).find("[id='audit-price-2']").should("have.text", "$ 6,300");
        cy.get(".order-pricing").find("price-card").eq(1).find("[id='audit-days-2']").should("have.text", " 2.5 onsite audit days");
        cy.get(".order-pricing").find("price-card").eq(1).find("[id='certification-fee-price-2']").should("have.text", "$ 500");
        cy.get(".order-pricing").find("price-card").eq(1).find(".total-price").should("have.text", "$ 6,800");
        //3rd year
        cy.get(".order-pricing").find("price-card").eq(2).find("[id='audit-price-3']").should("have.text", "$ 12,600");
        cy.get(".order-pricing").find("price-card").eq(2).find("[id='audit-days-3']").should("have.text", " 5 onsite audit days");
        cy.get(".order-pricing").find("price-card").eq(2).find("[id='certification-fee-price-3']").should("have.text", "$ 500");
        cy.get(".order-pricing").find("price-card").eq(2).find(".total-price").should("have.text", "$ 13,100");
        //Risk factor
        cy.get(".order-pricing").find(".label-value").eq(0).should("have.text", " Effort to audit: Medium ");
        cy.get(".order-pricing").find(".label-value").eq(1).should("have.text", " Business complexity: Medium ");
        cy.get(".order-pricing").find(".label-value").eq(2).should("have.text", "IT complexity: High");
        //27701
        //1st year
        cy.get(".order-pricing").find("price-card").eq(3).find("[id='audit-price-1']").should("have.text", "$ 2,250");
        cy.get(".order-pricing").find("price-card").eq(3).find("[id='audit-days-1']").should("have.text", " 1 onsite audit day");
        cy.get(".order-pricing").find("price-card").eq(3).find("[id='certification-fee-price-1']").should("have.text", "$ 500");
        cy.get(".order-pricing").find("price-card").eq(3).find(".total-price").should("have.text", "$ 2,750");
        //2nd year
        cy.get(".order-pricing").find("price-card").eq(4).find("[id='audit-price-2']").should("have.text", "$ 2,250");
        cy.get(".order-pricing").find("price-card").eq(4).find("[id='audit-days-2']").should("have.text", " 1 onsite audit day");
        cy.get(".order-pricing").find("price-card").eq(4).find("[id='certification-fee-price-2']").should("have.text", "$ 500");
        cy.get(".order-pricing").find("price-card").eq(4).find(".total-price").should("have.text", "$ 2,750");
        //3rd year
        cy.get(".order-pricing").find("price-card").eq(5).find("[id='audit-price-3']").should("have.text", "$ 2,700");
        cy.get(".order-pricing").find("price-card").eq(5).find("[id='audit-days-3']").should("have.text", " 1 onsite audit day");
        cy.get(".order-pricing").find("price-card").eq(5).find("[id='certification-fee-price-3']").should("have.text", "$ 500");
        cy.get(".order-pricing").find("price-card").eq(5).find(".total-price").should("have.text", "$ 3,200");
        //Risk factor
        cy.get(".order-pricing").find(".label-value").eq(3).should("have.text", " Effort to audit: Medium ");
        cy.get(".order-pricing").find(".label-value").eq(4).should("have.text", " Business complexity: Medium ");
        cy.get(".order-pricing").find(".label-value").eq(5).should("have.text", "Private Information Availability: High");
        //3 years total
        cy.get(".order-pricing").find("[id='total-price']").should("have.text", "$ 35,400");
    })

})