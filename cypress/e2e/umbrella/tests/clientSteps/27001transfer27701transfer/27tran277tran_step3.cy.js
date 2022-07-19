
describe("27001 and 27701 transfer - 3rd step testcases", function(){

    beforeEach(function(){
        cy.visit("https://stage-iso14001.myaudit.net/system/login");
        cy.get("#email").type("autouser27and277tran-step3@qq.qq");
        cy.get("#password").type("Qqqqqq11");
        cy.get("button").contains("LOGIN").click();
        cy.wait(3000);
    });

    it("basic validations", function(){
        
        //27001 and 27701 empty state and min/max characters in fields

        cy.get(".submit-button").click();
        cy.get(".button-wrapper").find(".validation-message").should("have.text", "You missed a question");
        //target date for next audit - ONLY FOR TRANSFER
        cy.get("audit-dates").each(($dateField)=>{
            cy.get($dateField).find(".validation-message").contains("Required").should("not.exist");
        });
        // transfer questions section - ONLY FOR TRANSFER
        cy.get(".transfer-questions-panel").find(".row.question").each(($rowQuestion)=>{
            cy.get($rowQuestion).find(".validation-message").should("have.text", "Required");
            cy.get($rowQuestion).type("a");
            cy.get($rowQuestion).find(".validation-message").should("have.text", "Description is too short");
        });
        cy.get(".transfer-questions-panel").find(".form-row").each(($rowQuestion)=>{
            cy.get($rowQuestion).find(".validation-message").should("have.text", "Required");
        });
            //dates - last audit performed/certificate expiration date - ONLY FOR TRANSFER
            cy.get(".last-audit-date").each(($lastAudit)=>{
                cy.get($lastAudit).find(".validation-message").should("have.text", "Required");
            });
            cy.get(".expiration-date").each(($expDate)=>{
                cy.get($expDate).find(".validation-message").should("have.text", "Required");
            });
        //27001 and 27701 product additional questions
        //27001 which process do you outsource
        cy.get("outsourced-process").find(".validation-message").should("have.text", "Required");
        //27001 radiobutton questions - without answers
        cy.get(".binary-questions-wrapper").eq(0).find("binary-question-with-comment").should("have.length", 5);
        cy.get(".binary-questions-wrapper").eq(0).find("binary-question-with-comment").each(($question)=>{
            cy.get($question).find(".validation-message").should("have.text", "Required");
        });
        //27701 radiobutton question - without answer
        cy.get(".binary-questions-wrapper").eq(1).find("binary-question-with-comment").should("have.length", 1);
        cy.get(".binary-questions-wrapper").eq(1).find("binary-question-with-comment").find(".validation-message").should("have.text", "Required");
        //27001 and 27701 radiobutton questions - answered "Yes" to each - empty textboxes
        cy.get("#binary-question-radio-0ISO_27001-iso_27001").find(".text").contains("Yes").click();
        cy.get("#binary-question-radio-1ISO_27001-iso_27001").find(".text").contains("Yes").click();
        cy.get("#binary-question-radio-2ISO_27001-iso_27001").find(".text").contains("Yes").click();
        cy.get("#binary-question-radio-3ISO_27001-iso_27001").find(".text").contains("Yes").click();
        cy.get("#binary-question-radio-4ISO_27001-iso_27001").find(".text").contains("Yes").click();
        cy.get("#binary-question-radio-0ISO_27701-iso_27701").find(".text").contains("Yes").click();
        cy.get(".submit-button").click();
        cy.get(".binary-questions-wrapper").eq(0).find("binary-question-with-comment").each(($question)=>{
            cy.get($question).find(".validation-message").should("have.text", "Required");
        });
        //27001 radiobutton questions - answered "Yes" to each - too short text
        cy.get("#binary-question-description-0ISO_27001-iso_27001").type("a");
        cy.get("#binary-question-description-1ISO_27001-iso_27001").type("a");
        cy.get("#binary-question-description-2ISO_27001-iso_27001").type("a");
        cy.get("#binary-question-description-3ISO_27001-iso_27001").type("a");
        cy.get("#binary-question-description-4ISO_27001-iso_27001").type("a");
        cy.get(".binary-questions-wrapper").eq(0).find("binary-question-with-comment").each(($question)=>{
            cy.get($question).find(".validation-message").should("have.text", "Description is too short");
        });
        //27001 and 27701 non-comformities radiobutton question - answered "Yes"
        cy.get("#hasOpenNonConformities-iso_27001-certificate").find(".text").contains("Yes").click();
        cy.get("#hasOpenNonConformities-iso_27701-certificate").find(".text").contains("Yes").click();
        cy.get(".submit-button").click();
        cy.get(".corrective-plans").each(($question)=>{
            cy.get($question).find(".validation-message").should("have.text", "Required");
        });
        cy.get(".major-nc").each(($major)=>{
            cy.get($major).find(".validation-message").should("have.text", "Required");
        });
        cy.get(".minor-nc").each(($minor)=>{
            cy.get($minor).find(".validation-message").should("have.text", "Required");
        });
        //27001 outsourced process - clicked "Other"
        cy.get(".outsourced-processes-checkboxes").find(".text").contains("Other").click();
        cy.get(".submit-button").click();
        cy.get("product-additional-questions").find(".text-area-wrapper").eq(0).find(".validation-message").should("have.text", "Required");
        cy.get("#outsourced_process_4ISO_27001-iso_27001").type("a");
        cy.get("product-additional-questions").find(".text-area-wrapper").eq(0).find(".validation-message").should("have.text", "Description is too short");

    });

    it("contact banner/next audit date/non-comformities/last audit date+cert expiration date", function(){
        //contact banner
        cy.get("additional-notification").should("exist");
        //27001 and 27701 next audit date validations
        cy.get("[id='desired-next-audit-date']").each(($nextAudit)=>{
            cy.get($nextAudit).click();
            for(let n=0 ; n<2 ; n++){
                cy.get(".cdk-overlay-pane").find("g[data-name='chevron-left']").click();
            };
            cy.get(".cdk-overlay-pane").find(".day-cell").contains("15").click();
        });
        cy.get("audit-dates").eq(0).find(".validation-message").should("have.text", "Can't be in the past");
        cy.get("audit-dates").eq(1).find(".validation-message").should("have.text", "Can't be in the past");
        cy.get("[id='desired-next-audit-date']").each(($nextAudit2)=>{
            cy.get($nextAudit2).click();
            for(let n=0 ; n<2 ; n++){
                cy.get(".cdk-overlay-pane").find("g[data-name='chevron-right']").click();
            };
            cy.get(".cdk-overlay-pane").find(".day-cell.today").click();
        });
        cy.get("audit-dates").eq(0).find(".validation-message").contains(".text").should("not.exist");
        cy.get("audit-dates").eq(1).find(".validation-message").contains(".text").should("not.exist");
        cy.get("audit-dates").eq(0).find(".clear-icon").click();
        cy.get("audit-dates").eq(1).find(".clear-icon").click();

        //27001 non-comformities
        cy.get("#hasOpenNonConformities-iso_27001-certificate").find(".text").contains("Yes").click();
        cy.get("#hasCorrectiveActionPlans-iso_27001-certificate").find(".text").contains("Yes").click();
        cy.get("#hasCorrectiveActionPlans-iso_27001-certificate").find(".text").contains("No").click();
        cy.get("#major-non-conformities-iso_27001-certificate").click();
        cy.get(".ng-dropdown-panel-items").find(".ng-option").contains("99").click();
        cy.get("#minor-non-conformities-iso_27001-certificate").click();
        cy.get(".ng-dropdown-panel-items").find(".ng-option").contains("0").click();

        //27701 non-comformities
        cy.get("#hasOpenNonConformities-iso_27701-certificate").find(".text").contains("Yes").click();
        cy.get("#hasCorrectiveActionPlans-iso_27701-certificate").find(".text").contains("Yes").click();
        cy.get("#hasCorrectiveActionPlans-iso_27701-certificate").find(".text").contains("No").click();
        cy.get("#major-non-conformities-iso_27701-certificate").click();
        cy.get(".ng-dropdown-panel-items").find(".ng-option").contains("99").click();
        cy.get("#minor-non-conformities-iso_27701-certificate").click();
        cy.get(".ng-dropdown-panel-items").find(".ng-option").contains("0").click();

        //27001 and 27701 last audit date + cert expiration date
        //
        cy.get("[id='last-audit-performed-date']").each(($lastAudit)=>{
            cy.get($lastAudit).click();
            for(let n=0 ; n<2 ; n++){
                cy.get(".cdk-overlay-pane").find("g[data-name='chevron-right']").click();
            }
            cy.get(".cdk-overlay-pane").find(".day-cell").contains("15").click();
        });
        cy.get(".last-audit-date").each(($lastAudit2)=>{
            cy.get($lastAudit2).find(".validation-message").should("have.text", "Can't be in the future");
        });
        cy.get("[id='last-audit-performed-date']").each(($lastAudit3)=>{
            cy.get($lastAudit3).click();
            for(let n=0 ; n<2 ; n++){
                cy.get(".cdk-overlay-pane").find("g[data-name='chevron-left']").click();
            };
            cy.get(".cdk-overlay-pane").find(".day-cell.today").click();
        });
        cy.get(".last-audit-date").each(($lastAudit4)=>{
            cy.get($lastAudit4).find(".validation-message").should("have.text", "Can't be in the future");
        });
        cy.get("[id='last-audit-performed-date']").each(($lastAudit5)=>{
            cy.get($lastAudit5).click();
            for(let n=0 ; n<2 ; n++){
                cy.get(".cdk-overlay-pane").find("g[data-name='chevron-left']").click();
            };
            cy.get(".cdk-overlay-pane").find(".day-cell").contains("10").click();
        });
        cy.get(".last-audit-date").each(($lastAudit6)=>{
            cy.get($lastAudit6).find(".validation-message").should("not.exist");
        });

        //
        cy.get("[id='expiration-date']").each(($expDate1)=>{
            cy.get($expDate1).click();
            for(let n=0 ; n<2 ; n++){
                cy.get(".cdk-overlay-pane").find("g[data-name='chevron-right']").click();
            };
            cy.get(".cdk-overlay-pane").find(".day-cell").contains("15").click();
        });
        cy.get(".expiration-date").each(($expDate2)=>{
            cy.get($expDate2).find(".validation-message").should("not.exist");
        });
        cy.get("[id='expiration-date']").each(($expDate3)=>{
            cy.get($expDate3).click();
            for(let n=0 ; n<2 ; n++){
                cy.get(".cdk-overlay-pane").find("g[data-name='chevron-left']").click();
            };
            cy.get(".cdk-overlay-pane").find(".day-cell.today").click();
        });
        cy.get(".expiration-date").each(($expDate4)=>{
            cy.get($expDate4).find(".validation-message").should("have.text", "The certificate expiration date is close; this can impact the transfer possibility ");
        });
        cy.get("[id='expiration-date']").each(($expDate5)=>{
            cy.get($expDate5).click();
            for(let n=0 ; n<2 ; n++){
                cy.get(".cdk-overlay-pane").find("g[data-name='chevron-left']").click();
            };
            cy.get(".cdk-overlay-pane").find(".day-cell").contains("11").click();
        });
        cy.get(".expiration-date").each(($expDate6)=>{
            cy.get($expDate6).find(".validation-message").should("have.text", "The certificate expiration date is close; this can impact the transfer possibility ");
        });
        cy.get("[id='expiration-date']").each(($expDate7)=>{
            cy.get($expDate7).click();
            cy.get(".cdk-overlay-pane").find(".day-cell").contains("10").click();
        });
        cy.get(".expiration-date").each(($expDate8)=>{
            cy.get($expDate8).find(".validation-message").eq(0).should("have.text", "Needs to be after the last performed audit");
            cy.get($expDate8).find(".validation-message").eq(1).should("have.text", "The certificate expiration date is close; this can impact the transfer possibility ");
        });
        cy.get(".last-audit-date").each(($lastAudit7)=>{
            cy.get($lastAudit7).find(".validation-message").should("have.text", "Needs to be before certificate expiration date");
        });
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
        cy.readFile('cypress\\downloads\\Estimate-Company27and277tran3step.pdf').should('exist');
        //accordion behaviour
            //27001 pricing
            cy.get(".product-header").eq(0).find(".toggle-view-section").should("have.text", " Hide ");
            cy.get(".order-pricing").find(".hide-section").should("not.exist");
            cy.get(".product-header").eq(0).find(".toggle-view-section").click();
            cy.get(".product-header").eq(0).find(".toggle-view-section").should("have.text", " Show ");
            cy.get(".order-pricing").find(".hide-section").should("exist");
            cy.get(".product-header").eq(0).find(".toggle-view-section").click();
            //27701 pricing
            cy.get(".product-header").eq(1).find(".toggle-view-section").should("have.text", " Hide ");
            cy.get(".order-pricing").find(".hide-section").should("not.exist");
            cy.get(".product-header").eq(1).find(".toggle-view-section").click();
            cy.get(".product-header").eq(1).find(".toggle-view-section").should("have.text", " Show ");
            cy.get(".order-pricing").find(".hide-section").should("exist");
            //27001 additional questions
            cy.get(".product-header").eq(2).find(".toggle-view-section").should("have.text", " Hide ");
            cy.get(".product-additional-questions").find(".hide-section").should("not.exist");
            cy.get(".product-header").eq(2).find(".toggle-view-section").click();
            cy.get(".product-header").eq(2).find(".toggle-view-section").should("have.text", " Show ");
            cy.get(".product-additional-questions").find(".hide-section").should("exist");
            cy.get(".submit-button").click();
            cy.get(".product-header").eq(2).find(".toggle-view-section").should("have.text", " Hide ");
            cy.get(".product-additional-questions").find(".hide-section").should("not.exist");
            //27701 additional questions
            cy.get(".product-header").eq(3).find(".toggle-view-section").should("have.text", " Hide ");
            cy.get(".product-additional-questions").find(".hide-section").should("not.exist");
            cy.get(".product-header").eq(3).find(".toggle-view-section").click();
            cy.get(".product-header").eq(3).find(".toggle-view-section").should("have.text", " Show ");
            cy.get(".product-additional-questions").find(".hide-section").should("exist");
            cy.get(".submit-button").click();
            cy.get(".product-header").eq(3).find(".toggle-view-section").should("have.text", " Hide ");
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
        cy.get("basic-order-edit").find(".product-header").each(($header)=>{
            cy.get($header).should("exist");
        });
        cy.get("basic-order-edit").find("current-cb-questions").each(($cbSection)=>{
            cy.get($cbSection).should("exist");
        });
        cy.get("basic-order-edit").find("company-general-info").each(($genInfo)=>{
            cy.get($genInfo).should("exist");
        });
        cy.get("basic-order-edit").find("price-factors").each(($priceFactors)=>{
            cy.get($priceFactors).should("exist");
        });
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
        cy.get("#contact-person").should("have.text", "FirstName27and277tran3step LastName");
        cy.get("#user-info").find("#user-full-name").should("have.text", "FirstName27and277tran3step LastName");
        //editing - editing and saving changes - prices don't change
        cy.get("#change-button").click();
            //multisite
            cy.get("#multiSite").find(".text").contains("Yes").click();
            cy.get(".decision-buttons").find("#change-button").should("have.attr", "disabled");
            cy.get(".button-redirect-link").should("exist");
            cy.get("#multiSite").find(".text").contains("No").click();
            //27001 change audit type popup - cancel
            cy.get("#hasCertificate_ISO_27001").find(".text").contains("No").click(); //"No" for initial
            cy.get(".audit-type-change-dialog").should("exist");
            cy.get(".audit-type-change-dialog").find(".dialog-buttons").contains("Cancel").click();
            // cy.get("#hasCertificate_ISO_27001").find("input[value='true']").eq(0).should("exist"); //sprawdź czy asercja działa
            // cy.get("#hasCertificate_ISO_27001 input").eq(0).should("have.attr", "value", "true"); //sprawdź czy inaczej zdefiniowana asercja działa
            //27701 change audit type popup - cancel
            cy.get("#hasCertificate_ISO_27701").find(".text").contains("No").click(); //"No" for initial
            cy.get(".audit-type-change-dialog").should("exist");
            cy.get(".audit-type-change-dialog").find(".dialog-buttons").contains("Cancel").click();
            // cy.get("#hasCertificate_ISO_27701").find("input[value='true']").eq(0).should("exist"); //sprawdź czy asercja działa
            // cy.get("#hasCertificate_ISO_27701 input").eq(0).should("have.attr", "value", "true"); //sprawdź czy inaczej zdefiniowana asercja działa
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
            cy.get(".other-cb").each(($otherCB)=>{
                cy.get($otherCB).click();
                cy.get(".ng-dropdown-panel").find(".ng-option").contains("Not on the list").click();
            });
            cy.get("input[formcontrolname='customCbNameISO_27001']").type("Edit fields");
            cy.get("input[formcontrolname='customCbNameISO_27701']").type("Edit fields");
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
            //27001 and 27701 last audit event
            cy.get("#current-certification-last-audit-event-radio-group").each(($lastAuditEvent)=>{
                cy.get($lastAuditEvent).find(".text").contains("Initial Certification ").click();
            });
            //27001 and 27701 rest of the form - price changed
            cy.get('#total-employeesiso_27001').clear().type("1000");
            cy.get("#scope-description-needs-narrowing--iso_27001").find(".text").contains("No").click();
            cy.get("#scope-description--iso_27001").type("Edit testing note");
            cy.get("#employees-within-scope-iso_27001").clear().type("100");
            /**/
            cy.get(".question-options").each(($question)=>{
                cy.get($question).find(".question-option").eq(0).click();
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