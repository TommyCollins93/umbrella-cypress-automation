
describe("9001 initial - 4th step - calculations", function(){

    beforeEach(function(){
        cy.visit("https://stage-iso14001.myaudit.net/system/login");
        cy.get("#email").type("autouser9init-step4@qq.qq");
        cy.get("#password").type("Qqqqqq11");
        cy.get("button").contains("LOGIN").click();
        cy.wait(3000);
    });

    it("additional questions - unchecked pre-audit checkmark", function(){

        //edit pre-audit, then save
        cy.get(".additional-questions-card").find("#toggle-order-details").click();
        cy.get(".additional-questions-card").find("#change-button").click();
        cy.get("pre-audit-checkbox").find(".custom-checkbox").click();
        //
        cy.get("additional-questions-edit").find("#change-button").click();
        cy.wait(5000);
        cy.get("additional-questions-edit").find("price-change-approve").should("exist");
        cy.get("price-change-approve").find("#approve-changes-button").click();
        cy.wait(5000);
        cy.get(".additional-questions-card").find("#toggle-order-details").should("have.text", " Show ");
        cy.get(".additional-questions-card").find("#order-details").should("not.exist");
        cy.get(".additional-questions-card").find(".change-button.collapsed").should("exist");
        //
        cy.get(".additional-questions-card").find("#toggle-order-details").click();
        cy.get(".additional-questions-card").find("#change-button").click();
        cy.get("pre-audit-checkbox").find(".custom-checkbox").click();
        cy.get("additional-questions-edit").find("#change-button").click();
        cy.wait(4000);

        //ESTIMATE CHANGE PROPOSAL
        //1st year
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='audit-price-1']").eq(0).should("have.text", "$ 1,525");
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='audit-days-1']").eq(0).should("have.text", " 1 onsite audit day");
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='audit-price-1']").eq(1).should("have.text", "$ 13,115");
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='audit-days-1']").eq(1).should("have.text", " 9 onsite audit days");
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='certification-fee-price-1']").should("have.text", "$ 250");
        cy.get("price-change-approve").find("price-card").eq(0).find(".total-price").should("have.text", "$ 14,890");
        //2nd year
        cy.get("price-change-approve").find("price-card").eq(1).find("[id='audit-price-2']").should("have.text", "$ 4,880");
        cy.get("price-change-approve").find("price-card").eq(1).find("[id='audit-days-2']").should("have.text", " 3.5 onsite audit days");
        cy.get("price-change-approve").find("price-card").eq(1).find("[id='certification-fee-price-2']").should("have.text", "$ 250");
        cy.get("price-change-approve").find("price-card").eq(1).find(".total-price").should("have.text", "$ 5,130");
        //3rd year
        cy.get("price-change-approve").find("price-card").eq(2).find("[id='audit-price-3']").should("have.text", "$ 4,880");
        cy.get("price-change-approve").find("price-card").eq(2).find("[id='audit-days-3']").should("have.text", " 3.5 onsite audit days");
        cy.get("price-change-approve").find("price-card").eq(2).find("[id='certification-fee-price-3']").should("have.text", "$ 250");
        cy.get("price-change-approve").find("price-card").eq(2).find(".total-price").should("have.text", "$ 5,130");
        //Risk factor
        cy.get("price-change-approve").find("[id='number-of-employees-iso_9001']").should("have.text", " Low ");
        //3 years total
        cy.get("price-change-approve").find("[id='total-price']").should("have.text", "$ 25,150");

        //Accept changes
        cy.get(".decision-buttons").eq(1).find("#approve-changes-button").click(); //save changes
        cy.wait(5000);
        
        //RECHECK APPROVED CHANGES
        //1st year
        cy.get("order-pricing").find("price-card").eq(0).find("[id='audit-price-1']").eq(0).should("have.text", "$ 1,525");
        cy.get("order-pricing").find("price-card").eq(0).find("[id='audit-days-1']").eq(0).should("have.text", " 1 onsite audit day");
        cy.get("order-pricing").find("price-card").eq(0).find("[id='audit-price-1']").eq(1).should("have.text", "$ 13,115");
        cy.get("order-pricing").find("price-card").eq(0).find("[id='audit-days-1']").eq(1).should("have.text", " 9 onsite audit days");
        cy.get("order-pricing").find("price-card").eq(0).find("[id='certification-fee-price-1']").should("have.text", "$ 250");
        cy.get("order-pricing").find("price-card").eq(0).find(".total-price").should("have.text", "$ 14,890");
        //2nd year
        cy.get("order-pricing").find("price-card").eq(1).find("[id='audit-price-2']").should("have.text", "$ 4,880");
        cy.get("order-pricing").find("price-card").eq(1).find("[id='audit-days-2']").should("have.text", " 3.5 onsite audit days");
        cy.get("order-pricing").find("price-card").eq(1).find("[id='certification-fee-price-2']").should("have.text", "$ 250");
        cy.get("order-pricing").find("price-card").eq(1).find(".total-price").should("have.text", "$ 5,130");
        //3rd year
        cy.get("order-pricing").find("price-card").eq(2).find("[id='audit-price-3']").should("have.text", "$ 4,880");
        cy.get("order-pricing").find("price-card").eq(2).find("[id='audit-days-3']").should("have.text", " 3.5 onsite audit days");
        cy.get("order-pricing").find("price-card").eq(2).find("[id='certification-fee-price-3']").should("have.text", "$ 250");
        cy.get("order-pricing").find("price-card").eq(2).find(".total-price").should("have.text", "$ 5,130");
        //Risk factor
        cy.get("order-pricing").find("[id='number-of-employees-iso_9001']").should("have.text", " Low ");
        //3 years total
        cy.get("order-pricing").find("[id='total-price']").should("have.text", "$ 25,150");
    
    });

    it("additional questions - checked pre-audit checkmark", function(){

        //edit pre-audit, then save
        cy.get(".additional-questions-card").find("#toggle-order-details").click();
        cy.get(".additional-questions-card").find("#change-button").click();
        cy.get("pre-audit-checkbox").find(".custom-checkbox").click();
        //
        cy.get("additional-questions-edit").find("#change-button").click();
        cy.wait(5000);
        cy.get("additional-questions-edit").find("price-change-approve").should("exist");
        cy.get("price-change-approve").find("#approve-changes-button").click();
        cy.wait(5000);
        cy.get(".additional-questions-card").find("#toggle-order-details").should("have.text", " Show ");
        cy.get(".additional-questions-card").find("#order-details").should("not.exist");
        cy.get(".additional-questions-card").find(".change-button.collapsed").should("exist");
        //
        cy.get(".additional-questions-card").find("#toggle-order-details").click();
        cy.get(".additional-questions-card").find("#change-button").click();
        cy.get("pre-audit-checkbox").find(".custom-checkbox").click();
        cy.get("additional-questions-edit").find("#change-button").click();
        cy.wait(4000);

        //ESTIMATE CHANGE PROPOSAL
        //1st year
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='audit-price-1']").eq(0).should("have.text", "$ 1,220");
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='audit-days-1']").eq(0).should("have.text", " 1 onsite audit day");
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='audit-price-1']").eq(1).should("have.text", "$ 1,525");
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='audit-days-1']").eq(1).should("have.text", " 1 onsite audit day");
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='audit-price-1']").eq(2).should("have.text", "$ 13,115");
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='audit-days-1']").eq(2).should("have.text", " 9 onsite audit days");
        cy.get("price-change-approve").find("price-card").eq(0).find("[id='certification-fee-price-1']").should("have.text", "$ 250");
        cy.get("price-change-approve").find("price-card").eq(0).find(".total-price").should("have.text", "$ 16,110");
        //2nd year
        cy.get("price-change-approve").find("price-card").eq(1).find("[id='audit-price-2']").should("have.text", "$ 4,880");
        cy.get("price-change-approve").find("price-card").eq(1).find("[id='audit-days-2']").should("have.text", " 3.5 onsite audit days");
        cy.get("price-change-approve").find("price-card").eq(1).find("[id='certification-fee-price-2']").should("have.text", "$ 250");
        cy.get("price-change-approve").find("price-card").eq(1).find(".total-price").should("have.text", "$ 5,130");
        //3rd year
        cy.get("price-change-approve").find("price-card").eq(2).find("[id='audit-price-3']").should("have.text", "$ 4,880");
        cy.get("price-change-approve").find("price-card").eq(2).find("[id='audit-days-3']").should("have.text", " 3.5 onsite audit days");
        cy.get("price-change-approve").find("price-card").eq(2).find("[id='certification-fee-price-3']").should("have.text", "$ 250");
        cy.get("price-change-approve").find("price-card").eq(2).find(".total-price").should("have.text", "$ 5,130");
        //Risk factor
        cy.get("price-change-approve").find("[id='number-of-employees-iso_9001']").should("have.text", " Low ");
        //3 years total
        cy.get("price-change-approve").find("[id='total-price']").should("have.text", "$ 26,370");

        //Accept changes
        cy.get(".decision-buttons").eq(1).find("#approve-changes-button").click(); //save changes
        cy.wait(5000);
        
        //RECHECK APPROVED CHANGES
        //1st year
        cy.get("order-pricing").find("price-card").eq(0).find("[id='audit-price-1']").eq(0).should("have.text", "$ 1,220");
        cy.get("order-pricing").find("price-card").eq(0).find("[id='audit-days-1']").eq(0).should("have.text", " 1 onsite audit day");
        cy.get("order-pricing").find("price-card").eq(0).find("[id='audit-price-1']").eq(1).should("have.text", "$ 1,525");
        cy.get("order-pricing").find("price-card").eq(0).find("[id='audit-days-1']").eq(1).should("have.text", " 1 onsite audit day");
        cy.get("order-pricing").find("price-card").eq(0).find("[id='audit-price-1']").eq(2).should("have.text", "$ 13,115");
        cy.get("order-pricing").find("price-card").eq(0).find("[id='audit-days-1']").eq(2).should("have.text", " 9 onsite audit days");
        cy.get("order-pricing").find("price-card").eq(0).find("[id='certification-fee-price-1']").should("have.text", "$ 250");
        cy.get("order-pricing").find("price-card").eq(0).find(".total-price").should("have.text", "$ 16,110");
        //2nd year
        cy.get("order-pricing").find("price-card").eq(1).find("[id='audit-price-2']").should("have.text", "$ 4,880");
        cy.get("order-pricing").find("price-card").eq(1).find("[id='audit-days-2']").should("have.text", " 3.5 onsite audit days");
        cy.get("order-pricing").find("price-card").eq(1).find("[id='certification-fee-price-2']").should("have.text", "$ 250");
        cy.get("order-pricing").find("price-card").eq(1).find(".total-price").should("have.text", "$ 5,130");
        //3rd year
        cy.get("order-pricing").find("price-card").eq(2).find("[id='audit-price-3']").should("have.text", "$ 4,880");
        cy.get("order-pricing").find("price-card").eq(2).find("[id='audit-days-3']").should("have.text", " 3.5 onsite audit days");
        cy.get("order-pricing").find("price-card").eq(2).find("[id='certification-fee-price-3']").should("have.text", "$ 250");
        cy.get("order-pricing").find("price-card").eq(2).find(".total-price").should("have.text", "$ 5,130");
        //Risk factor
        cy.get("order-pricing").find("[id='number-of-employees-iso_9001']").should("have.text", " Low ");
        //3 years total
        cy.get("order-pricing").find("[id='total-price']").should("have.text", "$ 26,370");
    
    });

})