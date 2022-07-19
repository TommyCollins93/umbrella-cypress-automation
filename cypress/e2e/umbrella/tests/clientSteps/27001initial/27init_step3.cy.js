
describe("27001 initial - 3rd step testcases", function(){

    beforeEach(function(){
        cy.visit("https://stage-iso14001.myaudit.net/system/login");
        cy.get("#email").type("autouser27init-step3@qq.qq");
        cy.get("#password").type("Qqqqqq11");
        cy.get("button").contains("LOGIN").click();
        cy.wait(3000);
    });

    it("basic validations", function(){
        
        //empty state and min/max characters in fields

        cy.get(".submit-button").click();
        cy.get(".button-wrapper").find(".validation-message").should("have.text", "You missed a question");
        //audit dates - ONLY FOR INITIAL
        cy.get(".pre-audit-date").find(".validation-message").should("not.have.text", "Required");
        cy.get(".stage-1-date").find(".validation-message").should("not.have.text", "Required");
        cy.get(".stage-2-date").find(".validation-message").should("not.have.text", "Required");
        //product additional questions
        //which process do you outsource
        cy.get("outsourced-process").find(".validation-message").should("have.text", "Required");
        //radiobutton questions - without answers
        cy.get(".binary-questions-wrapper").find("binary-question-with-comment").should("have.length", 5);
        cy.get(".binary-questions-wrapper").find("binary-question-with-comment").each(($question)=>{
            cy.get($question).find(".validation-message").should("have.text", "Required");
        });
        //radiobutton questions - answered "Yes" to each - empty textboxes
        cy.get("#binary-question-radio-0ISO_27001-iso_27001").find(".text").contains("Yes").click();
        cy.get("#binary-question-radio-1ISO_27001-iso_27001").find(".text").contains("Yes").click();
        cy.get("#binary-question-radio-2ISO_27001-iso_27001").find(".text").contains("Yes").click();
        cy.get("#binary-question-radio-3ISO_27001-iso_27001").find(".text").contains("Yes").click();
        cy.get("#binary-question-radio-4ISO_27001-iso_27001").find(".text").contains("Yes").click();
        cy.get(".submit-button").click();
        cy.get(".binary-questions-wrapper").find("binary-question-with-comment").each(($question)=>{
            cy.get($question).find(".validation-message").should("have.text", "Required");
        });
        //radiobutton questions - answered "Yes" to each - too short text
        cy.get("#binary-question-description-0ISO_27001-iso_27001").type("a");
        cy.get("#binary-question-description-1ISO_27001-iso_27001").type("a");
        cy.get("#binary-question-description-2ISO_27001-iso_27001").type("a");
        cy.get("#binary-question-description-3ISO_27001-iso_27001").type("a");
        cy.get("#binary-question-description-4ISO_27001-iso_27001").type("a");
        cy.get(".binary-questions-wrapper").find("binary-question-with-comment").each(($question)=>{
            cy.get($question).find(".validation-message").should("have.text", "Description is too short");
        });
        //outsourced process - clicked "Other"
        cy.get(".outsourced-processes-checkboxes").find(".text").contains("Other").click();
        cy.get(".submit-button").click();
        cy.get("product-additional-questions").find(".text-area-wrapper").eq(0).find(".validation-message").should("have.text", "Required");
        cy.get("#outsourced_process_4ISO_27001-iso_27001").type("a");
        cy.get("product-additional-questions").find(".text-area-wrapper").eq(0).find(".validation-message").should("have.text", "Description is too short");

    });

    it("contact banner/audit dates", function(){
        //contact banner
        cy.get("additional-notification").should("exist");

        //audit dates validations - INITIAL ONLY
            //checkmark for pre-audit
            cy.get("#target-pre-audit-date").click();
            cy.get(".cdk-overlay-pane").find(".day-cell.today").click();
            cy.get(".pre-audit-checkbox-wrapper").find(".custom-checkbox.checked").should("exist");
            cy.get(".pre-audit-checkbox-wrapper").find(".custom-checkbox").click();
            cy.get("#target-pre-audit-date").click();
            cy.get(".cdk-overlay-pane").find(".day-cell.today.selected").should("not.exist");
            //
            cy.get(".cdk-overlay-pane").find(".day-cell.today").click();
            cy.get(".pre-audit-date").find(".clear-icon").click();
            cy.get(".pre-audit-checkbox-wrapper").find(".custom-checkbox.checked").should("exist");
        //
        cy.get("#target-pre-audit-date").click();
        for(let n=0 ; n<2 ; n++){
            cy.get(".cdk-overlay-pane").find("g[data-name='chevron-left']").click();
        };
        cy.get(".cdk-overlay-pane").find(".day-cell").contains("17").click();
        cy.get("#target-stage1-audit-date").click();
        for(let n=0 ; n<2 ; n++){
            cy.get(".cdk-overlay-pane").find("g[data-name='chevron-left']").click();
        };
        cy.get(".cdk-overlay-pane").find(".day-cell").contains("16").click();
        cy.get("#target-stage2-audit-date").click();
        for(let n=0 ; n<2 ; n++){
            cy.get(".cdk-overlay-pane").find("g[data-name='chevron-left']").click();
        };
        cy.get(".cdk-overlay-pane").find(".day-cell").contains("15").click();
        cy.get(".pre-audit-date").find(".validation-message").should("have.text", "Can't be in the past, Needs to be before stage 1 audit");
        cy.get(".stage-1-date").find(".validation-message").should("have.text", "Can't be in the past, Needs to be after pre-audit, Needs to be before stage 2 audit");
        cy.get(".stage-2-date").find(".validation-message").should("have.text", "Can't be in the past, Needs to be after pre-audit, Needs to be after stage 1 audit");
        //
        cy.get("#target-pre-audit-date").click();
        cy.get(".cdk-overlay-pane").find(".day-cell").contains("15").click();
        cy.get(".pre-audit-date").find(".validation-message").should("have.text", "Can't be in the past, Needs to be before stage 2 audit");
        //
        cy.get("#target-pre-audit-date").click();
        for(let n=0 ; n<4 ; n++){
            cy.get(".cdk-overlay-pane").find("g[data-name='chevron-right']").click();
        };
        cy.get(".cdk-overlay-pane").find(".day-cell").contains("15").click();
        cy.get("#target-stage1-audit-date").click();
        for(let n=0 ; n<4 ; n++){
            cy.get(".cdk-overlay-pane").find("g[data-name='chevron-right']").click();
        };
        cy.get(".cdk-overlay-pane").find(".day-cell").contains("16").click();
        cy.get("#target-stage2-audit-date").click();
        for(let n=0 ; n<4 ; n++){
            cy.get(".cdk-overlay-pane").find("g[data-name='chevron-right']").click();
        };
        cy.get(".cdk-overlay-pane").find(".day-cell").contains("17").click();
        cy.get(".pre-audit-date").find(".validation-message").should("have.text", "");
        cy.get(".stage-1-date").find(".validation-message").should("have.text", "");
        cy.get(".stage-2-date").find(".validation-message").should("have.text", "");
    });

    it("stepper/downloading PDF/accordion behaviours", function(){
        //stepper (FOR INITIAL)
        cy.get(".stepper").find(".step").should("have.length", 4);
        cy.get(".stepper").find(".step").eq(0).should("have.class", "completed");
        cy.get(".step").eq(0).find("nb-icon[icon='checkmark-outline']").should("exist");
        cy.get(".stepper").find(".step").eq(1).should("have.class", "completed");
        cy.get(".step").eq(1).find("nb-icon[icon='checkmark-outline']").should("exist");
        cy.get(".stepper").find(".step").eq(2).should("have.class", "selected");
        cy.get(".stepper").find(".step").eq(3).should("have.class", "noninteractive").and("not.have.class", "selected");
        //download PDF and verify downloaded file
        cy.get("#download-offer-pdf").click();
        cy.readFile('cypress\\downloads\\Estimate-Company27init3step.pdf').should('exist');
        //accordion behaviour
            //pricing
            cy.get(".product-header").eq(0).find(".toggle-view-section").should("have.text", " Hide ");
            cy.get(".order-pricing").find(".hide-section").should("not.exist");
            cy.get(".product-header").eq(0).find(".toggle-view-section").click();
            cy.get(".product-header").eq(0).find(".toggle-view-section").should("have.text", " Show ");
            cy.get(".order-pricing").find(".hide-section").should("exist");
            //additional questions
            cy.get(".product-header").eq(1).find(".toggle-view-section").should("have.text", " Hide ");
            cy.get(".product-additional-questions").find(".hide-section").should("not.exist");
            cy.get(".product-header").eq(1).find(".toggle-view-section").click();
            cy.get(".product-header").eq(1).find(".toggle-view-section").should("have.text", " Show ");
            cy.get(".product-additional-questions").find(".hide-section").should("exist");
            cy.get(".submit-button").click();
            cy.get(".product-header").eq(1).find(".toggle-view-section").should("have.text", " Hide ");
            cy.get(".product-additional-questions").find(".hide-section").should("not.exist");
            //basic info accordion
            cy.get(".order-card").find("#toggle-order-details").should("have.text", " Show ");
            cy.get(".order-card").find("#order-details").should("not.exist");
            cy.get(".order-card").find(".change-button.collapsed").should("exist");
            cy.get(".order-card").find("#toggle-order-details").click();
            cy.get(".order-card").find("#toggle-order-details").should("have.text", " Hide ");
            cy.get(".order-card").find("#order-details").should("exist");
            cy.get(".order-card").find(".change-button.collapsed").should("not.exist");
    });

    it("editing/validating changes", function(){

        //editing - section visibility
        cy.get("order-details").find("#toggle-order-details").click();
        cy.get("#change-button").click();
        cy.get("basic-order-edit").should("exist");
        cy.get("#your-information-label").should("have.text", "Your information");
        cy.get("basic-order-edit").find("company-has-certificate").should("exist");
        cy.get("basic-order-edit").find("contact-person").should("exist");
        cy.get("basic-order-edit").find("company-address").should("exist");
        cy.get("basic-order-edit").find(".product-header").should("exist");
        cy.get("basic-order-edit").find("company-general-info").should("exist");
        cy.get("basic-order-edit").find("price-factors").should("exist");
        cy.get(".decision-buttons").find("#cancel-button").should("exist").and("not.have.attr", "disabled");
        cy.get(".decision-buttons").find("#change-button").should("exist").and("have.attr", "disabled");
        cy.get(".decision-buttons").find("#cancel-button").click();
        cy.get(".order-card").find("#toggle-order-details").should("have.text", " Show ");
        cy.get(".order-card").find("#order-details").should("not.exist");
        cy.get(".order-card").find(".change-button.collapsed").should("exist");
        //editing - cancelling changes
        cy.get("order-details").find("#toggle-order-details").click();
        cy.get("#change-button").click();
        cy.get("input[formcontrolname='firstName']").type(" edit");
        cy.get("input[formcontrolname='lastName']").type(" edit");
        cy.get("input[formcontrolname='email']").should("have.attr", "disabled");
        cy.get(".decision-buttons").find("#cancel-button").click();
        cy.get(".order-card").find("#toggle-order-details").click();
        cy.get("#contact-person").should("have.text", "FirstName27init3step LastName");
        cy.get("#user-info").find("#user-full-name").should("have.text", "FirstName27init3step LastName");
        //editing - editing and saving changes - prices don't change
        cy.get("#change-button").click();
            //multisite
            cy.get("#multiSite").find(".text").contains("Yes").click();
            cy.get(".decision-buttons").find("#change-button").should("have.attr", "disabled");
            cy.get(".button-redirect-link").should("exist");
            cy.get("#multiSite").find(".text").contains("No").click();
            //change audit type popup - cancel
            cy.get("#hasCertificate_ISO_27001").find(".text").contains("Yes").click(); //"Yes" for transfer
            cy.get(".audit-type-change-dialog").should("exist");
            cy.get(".audit-type-change-dialog").find(".dialog-buttons").contains("Cancel").click();
            // cy.get("#hasCertificate_ISO_27001").find("input[value='false']").eq(0).should("exist"); //sprawdź czy asercja działa
            // cy.get("#hasCertificate_ISO_27001 input").eq(0).should("have.attr", "value", "false"); //sprawdź czy inaczej zdefiniowana asercja działa
            //rest of the form - price not changed
            cy.get('input[formcontrolname="firstName"]').type(" edit");
            cy.get('input[formcontrolname="lastName"]').type(" edit");
            cy.get('input[formcontrolname="jobTitle"]').type(" edit");
            cy.get('input[formcontrolname="phone"]').type("1");
            cy.get('input[formcontrolname="companyName"]').type(" edit");
            cy.get('input[formcontrolname="street"]').type(" edit");
            cy.get('input[formcontrolname="city"]').type(" edit");
            cy.get('company-address ng-select[formcontrolname="country"]').click()
            cy.get(".ng-dropdown-panel-items").find(".ng-option-label").contains("CA").click();
            cy.get('company-address ng-select[formcontrolname="usState"]').click();
            cy.get(".ng-dropdown-panel-items").find(".ng-option-label").contains("Newfoundland and Labrador").click();
            cy.get('input[formcontrolname="zipCode"]').clear().type("R5T6Y7");
            /**/
            cy.get('#company-description_-iso_27001').type(" edit");
            cy.get("#part-time-employees-included-iso_27001").find(".text").contains("No").click();
            cy.get("#shifts_iso_27001").find(".text").contains("More").click();
            cy.get("#shifts-number-more_iso_27001").click().find(".ng-option-label").contains("4").click();
        //
        cy.get(".decision-buttons").find("#change-button").click();
        cy.wait(3000);
        cy.get("price-change-approve").should("not.exist");

        //editing - editing and saving changes - prices change
        cy.get("order-details").find("#toggle-order-details").click();
        cy.get("#change-button").click();
            //rest of the form - price changed
            cy.get('#total-employeesiso_27001').clear().type("1000");
            cy.get("#scope-description-needs-narrowing--iso_27001").find(".text").contains("No").click();
            cy.get("#scope-description--iso_27001").type("Edit testing note");
            cy.get("#employees-within-scope-iso_27001").clear().type("100");
            /**/
            cy.get(".question-options").each(($question)=>{
                cy.get($question).find(".question-option").eq(2).click();
            });
        //
        cy.get(".decision-buttons").find("#change-button").click();
        cy.wait(5000);
        cy.get("price-change-approve").find("product-pricing").should("exist");
        cy.get("price-change-approve").find("pricing-adjustments-details").should("exist");
        cy.get("price-change-approve").find("pricing-summary").should("exist");
        cy.get("price-change-approve").find(".decision-buttons").should("exist");
        cy.get(".submit-button").should("have.attr", "disabled");
        cy.get(".decision-buttons").eq(1).find("#approve-changes-button").click(); //save changes
        cy.wait(5000);
        cy.get(".order-card").find("#toggle-order-details").should("have.text", " Show ");
        cy.get(".order-card").find("#order-details").should("not.exist");
        cy.get(".order-card").find(".change-button.collapsed").should("exist");

    })

})