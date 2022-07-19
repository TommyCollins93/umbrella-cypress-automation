describe("", function(){

    it("", ()=>{

        //login
        cy.visit("https://stage-iso14001.myaudit.net/system/login");
        cy.get("#email").type("autouser27init-step4@qq.qq");
        cy.get("#password").type("Qqqqqq11");
        cy.get("button").contains("LOGIN").click();
        cy.wait(2000);

        //additional info revert
        cy.get(".additional-questions-card").find("#toggle-order-details").click();
        cy.get(".additional-questions-card").find("#change-button").click();
        //
        cy.get("#target-pre-audit-date").click();
        cy.wait(400);
        for(let n=0 ; n<2 ; n++){
            cy.get(".cdk-overlay-pane").find("g[data-name='chevron-right']").click();
        };
        cy.get(".cdk-overlay-pane").find(".day-cell").contains("15").click();
        cy.get("#target-stage1-audit-date").click();
        cy.wait(400);
        for(let n=0 ; n<2 ; n++){
            cy.get(".cdk-overlay-pane").find("g[data-name='chevron-right']").click();
        };
        cy.get(".cdk-overlay-pane").find(".day-cell").contains("16").click();
        cy.get("#target-stage2-audit-date").click();
        cy.wait(400);
        for(let n=0 ; n<2 ; n++){
            cy.get(".cdk-overlay-pane").find("g[data-name='chevron-right']").click();
        };
        cy.get(".cdk-overlay-pane").find(".day-cell").contains("17").click();
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