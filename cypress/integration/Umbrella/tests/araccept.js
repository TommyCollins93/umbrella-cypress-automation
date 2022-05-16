//<reference types="Cypress" />
/**/

describe("application reviewer path", function(){

    it("accept and send to TR path", function(){

        cy.visit("https://stage-iso14001.myaudit.net/");
        cy.wait(1500);
        
        //login
        cy.get(".login-button").click();
        cy.get("#email").type("clay.carlson@dekra.com");
        cy.get("#password").type("Aa123456!");
        cy.get("button").contains("LOGIN").click();
        cy.wait(3000);

        //open, fill checklist, send to cb + upload files or not, accept
        cy.get(".available-dashboards").contains("AR").click();
        cy.wait(5000);
        cy.get("tr:nth-child(1) td:nth-child(10)").find(".edit-button").click();
        cy.wait(4000);
        
        cy.get(".checklist-content").find('[class="question-card ng-untouched ng-pristine ng-invalid"]').each((radio)=>{
            cy.get("[value='false']").check({force: true});
        });

        //cy.get("#email-input").type("blablaxxccvv@qq.ww");
        cy.get("[id='email-input']").each((email)=>{
            cy.get(email).type("blablaxxccvv@qq.ww");
        })
    
        //cy.get("#cert-number-input").type("12345678");
        cy.get("[id='cert-number-input']").each((certnumber)=>{
            cy.get(certnumber).type("12345678");
        })

        //cy.get("button").contains("SEND INITIAL EMAIL").click();
        //cy.wait(2000);
        cy.get("button").contains("SEND INITIAL EMAIL").each((sendmail)=>{
            cy.get(sendmail).click();
            cy.wait(2000);
        })

        //cy.get(".custom-checkbox").click();
        //cy.wait(2000);
        cy.get(".custom-checkbox").each((checkbox)=>{
            cy.get(checkbox).click();
            cy.wait(2000);
        })

        cy.get("#accept-offer-button").click();
        cy.wait(5000);

        //open, send to TR
        cy.get("tr:nth-child(1) td:nth-child(10)").find(".edit-button").click();
        cy.get(".send-to-tech-review-btn").click();

    })

})