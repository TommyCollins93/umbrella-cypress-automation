
describe("9001 transfer - 5th step testcases", function(){

    beforeEach(function(){
        cy.visit("https://stage-iso14001.myaudit.net/system/login");
        cy.get("#email").type("autouser9tran-step5@qq.qq");
        cy.get("#password").type("Qqqqqq11");
        cy.get("button").contains("LOGIN").click();
        cy.wait(3000);
    });

    it("static data/basic validations/contact banner/stepper", function(){

        //right hand side
        cy.get(".title").should("have.text", "Upload documents");
        cy.get("#get-a-quote-button").should("have.text", "SEND TO DEKRA");

        //accordion - basic info
        cy.get(".order-card").find("#toggle-order-details").click();
        cy.get("address-details").should("exist");
        cy.get("contact-person-details").should("exist");
        cy.get("transfer-questions-details").should("exist");
        cy.get("scopes-details").should("exist");
        cy.get("employee-details").should("exist");
        cy.get("price-factors-details").should("exist");
        cy.get("price-factors-details").should("exist");
        cy.get(".order-card").find("#change-button").should("not.exist");

        //accordion - additional questions
        cy.get(".additional-questions-card").find("#toggle-order-details").click();
        cy.get("transfer-additional-questions-details").should("exist");
        cy.get("base-additional-questions-details").should("exist");
        cy.get(".additional-questions-card").find("#change-button").should("not.exist");

        //accordion - billing info
        cy.get(".billing-preferences-container").find("#toggle-order-details").click();
        cy.get(".billing-container").should("exist");
        cy.get("billing-information").should("exist");
        cy.get("#billing-details").find("#change-button").should("not.exist");

        //empty state
        cy.get("#get-a-quote-button").click();
        cy.get(".button-wrapper").find(".validation-message").should("have.text", "You missed a question");
        cy.get(".transfer-documents-panel").eq(0).find(".validation-message").should("have.text", "Required");
        cy.get(".transfer-documents-panel").eq(1).find(".validation-message").should("have.text", "Required");

        //contact banner
        cy.get("additional-notification").should("exist");

        //stepper (FOR TRANSFER)
        cy.get(".stepper").find(".step").should("have.length", 5);
        cy.get(".stepper").find(".step").eq(0).should("have.class", "completed");
        cy.get(".step").eq(0).find("nb-icon[icon='checkmark-outline']").should("exist");
        cy.get(".stepper").find(".step").eq(1).should("have.class", "completed");
        cy.get(".step").eq(1).find("nb-icon[icon='checkmark-outline']").should("exist");
        cy.get(".stepper").find(".step").eq(2).should("have.class", "completed");
        cy.get(".step").eq(2).find("nb-icon[icon='checkmark-outline']").should("exist");
        cy.get(".stepper").find(".step").eq(3).should("have.class", "completed");
        cy.get(".step").eq(3).find("nb-icon[icon='checkmark-outline']").should("exist");
        cy.get(".stepper").find(".step").eq(4).should("have.class", "selected");

    });

    it("downloading PDF/documents upload", function(){

        //download PDF and verify downloaded file
        cy.get("#download-offer-pdf").click();
        cy.readFile('cypress/downloads/Estimate-Company9tran5step.pdf').should('exist');

        //documents upload - files too big
        cy.get("[for='CERTIFICATE-upload-document-button']").selectFile('cypress/fixtures/pdf/abigpdf.pdf');
        cy.get("[for='REPORTS-AND-NONCONFORMITIES-upload-document-button']").selectFile('cypress/fixtures/pdf/abigpdf.pdf');
        cy.get(".transfer-documents-panel").eq(0).find(".validation-message").should("have.text", "File is too big, maximum 15MB");
        cy.get(".transfer-documents-panel").eq(1).find(".validation-message").should("have.text", "File is too big, maximum 15MB");

        //documents upload - certificate document only
        cy.get("[for='CERTIFICATE-upload-document-button']").selectFile('cypress/fixtures/pdf/Estimate-1retest5121.pdf');
        cy.get("#get-a-quote-button").click();
        cy.get(".button-wrapper").find(".validation-message").should("have.text", "You missed a question");
        cy.get(".transfer-documents-panel").eq(0).find(".validation-message").should("not.exist");
        cy.get(".transfer-documents-panel").eq(0).find(".file-button").should("have.text", " Estimate-1retest5121.pdf ");
        cy.get(".transfer-documents-panel").eq(1).find(".validation-message").should("have.text", "Required");
        cy.get(".transfer-documents-panel").eq(0).find('g[data-name="close-square"]').click();

        //documents upload - reports and nonconformities
        cy.get("[for='REPORTS-AND-NONCONFORMITIES-upload-document-button']").selectFile('cypress/fixtures/pdf/Estimate-1retest5121.pdf');
        cy.get("#get-a-quote-button").click();
        cy.get(".button-wrapper").find(".validation-message").should("have.text", "You missed a question");
        cy.get(".transfer-documents-panel").eq(0).find(".validation-message").should("have.text", "Required");
        cy.get(".transfer-documents-panel").eq(1).find(".validation-message").should("not.exist");
        cy.get(".transfer-documents-panel").eq(1).find(".file-button").should("have.text", " Estimate-1retest5121.pdf ");

    });

})