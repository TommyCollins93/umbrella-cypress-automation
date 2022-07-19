
describe("14001 transfer - 3rd step testcases", function(){

    beforeEach(function(){
        cy.visit("https://stage-iso14001.myaudit.net/system/login");
        cy.get("#email").type("autouser14tran-step3@qq.qq");
        cy.get("#password").type("Qqqqqq11");
        cy.get("button").contains("LOGIN").click();
        cy.wait(3000);
    });

    it("basic validations", function(){
        
        //empty state and min/max characters in fields

        cy.get(".submit-button").click();
        cy.get(".button-wrapper").find(".validation-message").should("have.text", "You missed a question");
        //target date for next audit - ONLY FOR TRANSFER
        cy.get("audit-dates").find(".validation-message").contains("Required").should("not.exist");
        // transfer questions section - ONLY FOR TRANSFER
        cy.get(".transfer-questions-panel").find(".row.question").find(".validation-message").should("have.text", "Required"); //reason for transfer section - need id or proper class
        cy.get(".transfer-questions-panel").find(".row.question").type("a");
        cy.get(".transfer-questions-panel").find(".row.question").find(".validation-message").should("have.text", "Description is too short");
        cy.get(".transfer-questions-panel").find(".row.question").clear().type("a");
        cy.get(".transfer-questions-panel").find(".form-row").eq(0).find(".validation-message").should("have.text", "Required"); //reason for transfer section - need id or proper class
        cy.get(".transfer-questions-panel").find(".form-row").eq(1).find(".validation-message").should("have.text", "Required"); //reason for transfer section - need id or proper class
            //dates - last audit performed/certificate expiration date - ONLY FOR TRANSFER
            cy.get(".last-audit-date").find(".validation-message").should("have.text", "Required");
            cy.get(".expiration-date").find(".validation-message").should("have.text", "Required");
        //product additional questions
        //which process do you outsource
        cy.get("outsourced-process").find(".validation-message").should("have.text", "Required");
        //radiobutton questions - without answers
        cy.get(".binary-questions-wrapper").find("binary-question-with-comment").should("have.length", 8);
        cy.get(".binary-questions-wrapper").find("binary-question-with-comment").each(($question)=>{
            cy.get($question).find(".validation-message").should("have.text", "Required");
        });
        //radiobutton questions - answered "Yes" to each - empty textboxes
        cy.get("#binary-question-radio-0ISO_14001-iso_14001").find(".text").contains("Yes").click();
        cy.get("#binary-question-radio-1ISO_14001-iso_14001").find(".text").contains("Yes").click();
        cy.get("#binary-question-radio-2ISO_14001-iso_14001").find(".text").contains("Yes").click();
        cy.get("#binary-question-radio-3ISO_14001-iso_14001").find(".text").contains("Yes").click();
        cy.get("#binary-question-radio-4ISO_14001-iso_14001").find(".text").contains("Yes").click();
        cy.get("#binary-question-radio-5ISO_14001-iso_14001").find(".text").contains("No").click();
        cy.get("#binary-question-radio-6ISO_14001-iso_14001").find(".text").contains("No").click();
        cy.get("#binary-question-radio-7ISO_14001-iso_14001").find(".text").contains("Yes").click();
        cy.get(".submit-button").click();
        cy.get(".binary-questions-wrapper").find("binary-question-with-comment").each(($question)=>{
            cy.get($question).find(".validation-message").should("have.text", "Required");
        });
        //radiobutton questions - answered "Yes" to each - too short text
        cy.get("#binary-question-description-0ISO_14001-iso_14001").type("a");
        cy.get("#binary-question-description-1ISO_14001-iso_14001").type("a");
        cy.get("#binary-question-description-2ISO_14001-iso_14001").type("a");
        cy.get("#binary-question-description-3ISO_14001-iso_14001").type("a");
        cy.get("#binary-question-description-4ISO_14001-iso_14001").type("a");
        cy.get("#binary-question-description-5ISO_14001-iso_14001").type("a");
        cy.get("#binary-question-description-6ISO_14001-iso_14001").type("a");
        cy.get("#binary-question-description-7ISO_14001-iso_14001").type("a");
        cy.get(".binary-questions-wrapper").find("binary-question-with-comment").each(($question)=>{
            cy.get($question).find(".validation-message").should("have.text", "Description is too short");
        });
        //kind of material used in process - textfield
        cy.get("product-additional-questions").find(".text-area-wrapper").eq(8).find(".validation-message").should("have.text", "Required");
        cy.get("#text-question-0ISO_14001-iso_14001").type("a");
        cy.get("product-additional-questions").find(".text-area-wrapper").eq(8).find(".validation-message").should("have.text", "Description is too short");
        //permits in effect - textfield
        cy.get("product-additional-questions").find(".text-area-wrapper").eq(9).find(".validation-message").should("have.text", "Required");
        cy.get("#text-question-1ISO_14001-iso_14001").type("a");
        cy.get("product-additional-questions").find(".text-area-wrapper").eq(9).find(".validation-message").should("have.text", "Description is too short");
        //special environmental or health and safety considerations - textfield
        cy.get("product-additional-questions").find(".text-area-wrapper").eq(10).find(".validation-message").should("have.text", "Required");
        cy.get("#text-question-2ISO_14001-iso_14001").type("a");
        cy.get("product-additional-questions").find(".text-area-wrapper").eq(10).find(".validation-message").should("have.text", "Description is too short");
        //non-comformities radiobutton question - answered "Yes"
        cy.get("#hasOpenNonConformities-iso_14001-certificate").find(".text").contains("Yes").click();
        cy.get(".submit-button").click();
        cy.get(".corrective-plans").find(".validation-message").should("have.text", "Required");
        cy.get(".major-nc").find(".validation-message").should("have.text", "Required");
        cy.get(".minor-nc").find(".validation-message").should("have.text", "Required");
        //outsourced process - clicked "Other"
        cy.get(".outsourced-processes-checkboxes").find(".text").contains("Other").click();
        cy.get(".submit-button").click();
        cy.get("product-additional-questions").find(".text-area-wrapper").eq(0).find(".validation-message").should("have.text", "Required");
        cy.get("#outsourced_process_4ISO_14001-iso_14001").type("a");
        cy.get("product-additional-questions").find(".text-area-wrapper").eq(0).find(".validation-message").should("have.text", "Description is too short");

    });

    it("contact banner/next audit date/non-comformities/last audit date+cert expiration date", function(){
        //contact banner
        cy.get("additional-notification").should("exist");
        //next audit date validations
        cy.get("#desired-next-audit-date").click();
        for(let n=0 ; n<2 ; n++){
            cy.get(".cdk-overlay-pane").find("g[data-name='chevron-left']").click();
        }
        cy.get(".cdk-overlay-pane").find(".day-cell").contains("15").click();
        cy.get("audit-dates").find(".validation-message").should("have.text", "Can't be in the past");
        //
        cy.get("#desired-next-audit-date").click();
        for(let n=0 ; n<2 ; n++){
            cy.get(".cdk-overlay-pane").find("g[data-name='chevron-right']").click();
        }
        cy.get(".cdk-overlay-pane").find(".day-cell.today").click();
        cy.get("audit-dates").find(".validation-message").contains(".text").should("not.exist");
        cy.get("audit-dates").find(".clear-icon").click();

        //non-comformities
        cy.get("#hasOpenNonConformities-iso_14001-certificate").find(".text").contains("Yes").click();
        cy.get("#hasCorrectiveActionPlans-iso_14001-certificate").find(".text").contains("Yes").click();
        cy.get("#hasCorrectiveActionPlans-iso_14001-certificate").find(".text").contains("No").click();
        cy.get("#major-non-conformities-iso_14001-certificate").click();
        cy.get(".ng-dropdown-panel-items").find(".ng-option").contains("99").click();
        cy.get("#minor-non-conformities-iso_14001-certificate").click();
        cy.get(".ng-dropdown-panel-items").find(".ng-option").contains("0").click();

        //last audit date + cert expiration date
        //
        cy.get("#last-audit-performed-date").click();
        for(let n=0 ; n<2 ; n++){
            cy.get(".cdk-overlay-pane").find("g[data-name='chevron-right']").click();
        }
        cy.get(".cdk-overlay-pane").find(".day-cell").contains("15").click();
        cy.get(".last-audit-date").find(".validation-message").should("have.text", "Can't be in the future");
        cy.get("#last-audit-performed-date").click();
        for(let n=0 ; n<2 ; n++){
            cy.get(".cdk-overlay-pane").find("g[data-name='chevron-left']").click();
        }
        cy.get(".cdk-overlay-pane").find(".day-cell.today").click();
        cy.get(".last-audit-date").find(".validation-message").should("have.text", "Can't be in the future");
        cy.get("#last-audit-performed-date").click();
        for(let n=0 ; n<2 ; n++){
            cy.get(".cdk-overlay-pane").find("g[data-name='chevron-left']").click();
        }
        cy.get(".cdk-overlay-pane").find(".day-cell").contains("10").click();
        cy.get(".last-audit-date").find(".validation-message").should("not.exist");
        //
        cy.get("#expiration-date").click();
        for(let n=0 ; n<2 ; n++){
            cy.get(".cdk-overlay-pane").find("g[data-name='chevron-right']").click();
        }
        cy.get(".cdk-overlay-pane").find(".day-cell").contains("15").click();
        cy.get(".expiration-date").find(".validation-message").should("not.exist");
        cy.get("#expiration-date").click();
        for(let n=0 ; n<2 ; n++){
            cy.get(".cdk-overlay-pane").find("g[data-name='chevron-left']").click();
        }
        cy.get(".cdk-overlay-pane").find(".day-cell.today").click();
        cy.get(".expiration-date").find(".validation-message").should("have.text", "The certificate expiration date is close; this can impact the transfer possibility ");
        cy.get("#expiration-date").click();
        for(let n=0 ; n<2 ; n++){
            cy.get(".cdk-overlay-pane").find("g[data-name='chevron-left']").click();
        }
        cy.get(".cdk-overlay-pane").find(".day-cell").contains("11").click();
        cy.get(".expiration-date").find(".validation-message").should("have.text", "The certificate expiration date is close; this can impact the transfer possibility ");
        cy.get("#expiration-date").click();
        cy.get(".cdk-overlay-pane").find(".day-cell").contains("10").click();
        cy.get(".expiration-date").find(".validation-message").eq(0).should("have.text", "Needs to be after the last performed audit");
        cy.get(".expiration-date").find(".validation-message").eq(1).should("have.text", "The certificate expiration date is close; this can impact the transfer possibility ");
        cy.get(".last-audit-date").find(".validation-message").should("have.text", "Needs to be before certificate expiration date");
    });

    it("stepper/downloading PDF/accordion behaviours", function(){
        //stepper (FOR TRANSFER)
        cy.get(".stepper").find(".step").should("have.length", 5);
        cy.get(".stepper").find(".step").eq(0).should("have.class", "completed");
        cy.get(".step").eq(0).find("nb-icon[icon='checkmark-outline']").should("exist");
        cy.get(".stepper").find(".step").eq(1).should("have.class", "completed");
        cy.get(".step").eq(1).find("nb-icon[icon='checkmark-outline']").should("exist");
        cy.get(".stepper").find(".step").eq(2).should("have.class", "selected");
        cy.get(".stepper").find(".step").eq(3).should("have.class", "noninteractive").and("not.have.class", "selected");
        cy.get(".stepper").find(".step").eq(4).should("have.class", "noninteractive").and("not.have.class", "selected");
        //download PDF and verify downloaded file
        cy.get("#download-offer-pdf").click();
        cy.readFile('cypress\\downloads\\Estimate-Company14tran3step.pdf').should('exist');
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
        cy.get("basic-order-edit").find("current-cb-questions").should("exist");
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
        cy.get("#contact-person").should("have.text", "FirstName14tran3step LastName");
        cy.get("#user-info").find("#user-full-name").should("have.text", "FirstName14tran3step LastName"); //CORRECT FOR LATER
        //editing - editing and saving changes - prices don't change
        cy.get("#change-button").click();
            //multisite
            cy.get("#multiSite").find(".text").contains("Yes").click();
            cy.get(".decision-buttons").find("#change-button").should("have.attr", "disabled");
            cy.get(".button-redirect-link").should("exist");
            cy.get("#multiSite").find(".text").contains("No").click();
            //change audit type popup - cancel
            cy.get("#hasCertificate_ISO_14001").find(".text").contains("No").click(); //"No" for initial
            cy.get(".audit-type-change-dialog").should("exist");
            cy.get(".audit-type-change-dialog").find(".dialog-buttons").contains("Cancel").click();
            // cy.get("#hasCertificate_ISO_14001").find("input[value='true']").eq(0).should("exist"); //sprawdź czy asercja działa
            // cy.get("#hasCertificate_ISO_14001 input").eq(0).should("have.attr", "value", "true"); //sprawdź czy inaczej zdefiniowana asercja działa
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
            cy.get(".other-cb").click();
            cy.get(".ng-dropdown-panel").find(".ng-option").contains("Not on the list").click();
            cy.get("input[formcontrolname='customCbNameISO_14001']").type("Edit fields");
            /**/
            cy.get('#company-description_-iso_14001').type(" edit");
            cy.get("#part-time-employees-included-iso_14001").find(".text").contains("No").click();
            cy.get("#shifts_iso_14001").find(".text").contains("More").click();
            cy.get("#shifts-number-more_iso_14001").click().find(".ng-option-label").contains("4").click();
        //
        cy.get(".decision-buttons").find("#change-button").click();
        cy.wait(3000);
        cy.get("price-change-approve").should("not.exist");

        //editing - editing and saving changes - prices change
        cy.get("order-details").find("#toggle-order-details").click();
        cy.get("#change-button").click();
            //last audit event
            cy.get("#current-certification-last-audit-event-radio-group").find(".text").contains("Initial Certification ").click();
            //rest of the form - price changed
            cy.get('#total-employeesiso_14001').clear().type("1000");
            cy.get("#scope-description-needs-narrowing--iso_14001").find(".text").contains("No").click();
            cy.get("#scope-description--iso_14001").type("Edit testing note");
            cy.get("#employees-within-scope-iso_14001").clear().type("100");
            cy.get("#scope-selector-iso_14001").find(".ng-value-icon.left").click();
            cy.get('#company-scopes').click();
            cy.get(".ng-dropdown-panel-items").find("#item-28-iso_14001").click();
            cy.get("#scope-question-29-include_fossil_fuelISO_14001_iso_14001").find(".text").contains("Yes").click({force: true});
            /**/
            cy.get("#price-factor-performing_design-iso_14001").find(".text").contains("Yes").click();
            cy.get("#price-factor-translator_required-iso_14001").find(".text").contains("No").click();
            cy.get("#price-factor-high_degree_of_regulation-iso_14001").find(".text").contains("Yes").click();
            cy.get("#price-factor-complex_process-iso_14001").find(".text").contains("No").click();
            cy.get("#price-factor-outsourcing_processes-iso_14001").find(".text").contains("Yes").click();
            cy.get("#price-factor-highly_automated_processes-iso_14001").find(".text").contains("No").click();
            cy.get("#price-factor-employees_working_off_location-iso_14001").find(".text").contains("Yes").click();
            cy.get("#price-factor-low_risk-iso_14001").find(".text").contains("No").click();
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