
describe("9001 initial - 4th step testcases", function(){

    beforeEach(function(){
        cy.visit("https://stage-iso14001.myaudit.net/system/login");
        cy.get("#email").type("autouser9init-step4@qq.qq");
        cy.get("#password").type("Qqqqqq11");
        cy.get("button").contains("LOGIN").click();
        cy.wait(3000);
    });

    it("basic validations/contact banner/stepper/downloading PDF", function(){

        //empty state
        cy.get(".submit-button").click();
        cy.get(".button-wrapper").find(".validation-message").should("have.text", "You missed a question");

        //checkmarks - terms and conditions
        cy.get(".terms-and-conditions-panel").find(".status-danger").should("exist");
        cy.get(".terms-and-conditions-panel").find(".status-danger").should("exist");
        cy.get("#download-terms-and-conditions-div").find(".validation-message").should("have.text", "Please accept to proceed");

        //contact banner
        cy.get("additional-notification").should("exist");

        //stepper (FOR INITIAL)
        cy.get(".stepper").find(".step").should("have.length", 4);
        cy.get(".stepper").find(".step").eq(0).should("have.class", "completed");
        cy.get(".step").eq(0).find("nb-icon[icon='checkmark-outline']").should("exist");
        cy.get(".stepper").find(".step").eq(1).should("have.class", "completed");
        cy.get(".step").eq(1).find("nb-icon[icon='checkmark-outline']").should("exist");
        cy.get(".stepper").find(".step").eq(2).should("have.class", "completed");
        cy.get(".step").eq(2).find("nb-icon[icon='checkmark-outline']").should("exist");
        cy.get(".stepper").find(".step").eq(3).should("have.class", "selected");

        //download PDF and verify downloaded file
        cy.get("#download-offer-pdf").click();
        cy.readFile('cypress\\downloads\\Estimate-Company9init4step.pdf').should('exist');

    });

    it("right hand side - title, files and user data", function(){

        //right hand side title
        cy.get(".title").should("have.text", "Order Confirmation");

        //download and verify terms and conditions PDF file
        cy.get("#download-terms-and-conditions-icon").click();
        cy.readFile('cypress\\downloads\\terms-and-conditions.pdf').should('exist');

        //signed by - field contents
        cy.get("#terms-and-conditions-first-name").should("have.value", "FirstName9init4step");
        cy.get("#terms-and-conditions-last-name").should("have.value", "LastName");
        cy.get("#terms-and-conditions-title").should("have.value", "JobTitle");

    });

    describe("billing info cases", function(){

        before(function(){

        //aliases for billing information component
        cy.get(".billing-info").find(".item").eq(0).find("p").eq(1).as("dekraAddress");
        cy.get(".billing-info").find(".item").eq(1).find("p").eq(1).as("dekraInfo");
        cy.get(".billing-info").find(".item").eq(2).find("p").eq(1).as("accountNumber");
        cy.get(".billing-info").find(".item").eq(3).find("p").eq(1).as("routingNumber");
        cy.get(".billing-info").find(".item").eq(4).find("p").eq(1).as("domWirRoutingNumber");
        cy.get(".billing-info").find(".item").eq(5).find("p").eq(1).as("swiftCode");
        cy.get(".billing-info").find(".item").eq(6).find("p").eq(1).as("idNumber");
        cy.get(".billing-info").find(".item").eq(7).find("p").eq(1).as("dunsNumber");
        cy.get(".billing-info").find(".item").eq(8).find("p").eq(1).as("cageCode");
        cy.get(".billing-info").find(".item").eq(9).find(".dekra-contact").as("billingContact");
        cy.get(".billing-info").find(".item").eq(10).find("span").as("csContact");
        //

        });

        it("billing info section", function(){

            //grant access to use clipboard by browser
            // cy.wrap(Cypress.automation('remote:debugger:protocol', {
            //     command: 'Browser.grantPermissions',
            //     params: {
            //       permissions: ['clipboardReadWrite', 'clipboardSanitizedWrite'],
            //       // make the permission tighter by allowing the current origin only
            //       // like "http://localhost:56978"
            //       origin: window.location.origin,
            //     }
            // }));

            //accordion behaviour
            cy.get(".billing-preferences-container").find("#card-header").should("have.text", " Billing preferences ");
            cy.get(".billing-container").find(".toggle-details-section").should("have.text", " Hide ");
            cy.get(".billing-container").find("#card-header").should("not.have.class", "collapsed");
            cy.get(".billing-container").find(".toggle-details-section").click();
            cy.get(".billing-container").find(".toggle-details-section").should("have.text", " Show ");
            cy.get(".billing-container").find("#card-header").should("have.class", "collapsed");
            cy.get(".billing-container").find(".toggle-details-section").click();
    
            //billing preferences - check default data and information
            cy.get(".address-toggle").find(".native-input").should("have.attr", "disabled");
            cy.get(".radio-with-question").find(".radio-column").find(".text").should("have.text", " No ");
            cy.get(".text-row").find(".text-value").should("have.text", "answer was not provided"); //should have better id
    
            //billing info - check static data (and copy function TO BE ADDED)
            cy.get(".billing-info").find(".dekra-label").should("have.text", "DEKRA's billing information");
            cy.get("@dekraAddress").should("have.text", "Dekra Certification, Inc., P.O. Box 85394, Minneapolis, MN 55485-9394")
            cy.get("@dekraInfo").should("have.text", "Wells Fargo Bank, N.A, 420 Montgomery St, San Francisco, CA 94104");
            cy.get("@accountNumber").should("have.text", "4943717165");
            cy.get("@routingNumber").should("have.text", "61000227");
            cy.get("@domWirRoutingNumber").should("have.text", "121000248");
            cy.get("@swiftCode").should("have.text", "WFBIUS6S");
            cy.get("@idNumber").should("have.text", "23-2689662");
            cy.get("@dunsNumber").should("have.text", "876862343");
            cy.get("@cageCode").should("have.text", "3BQZ3");
            cy.get("@billingContact").find("a[href='mailto: ar.na@dekra.com']").should("have.text", "ar.na@dekra.com");
            cy.get("@billingContact").find("a[href='tel: 678-809-6101']").should("have.text", "678-809-6101")
            cy.get("@csContact").find("a[href='mailto: clientservices@dekra.com']").should("have.text", "clientservices@dekra.com");
            cy.get("@csContact").find("a[href='tel: 215-997-4519']").should("have.text", "215-997-4519");

            //billing info - copy function - TO SOLVE LATER!!
            // cy.get(".item").eq(0).find("nb-icon[icon='copy-outline']").trigger("click").then(()=>{
            //     cy.window().its('navigator.clipboard').invoke('readText').should('equal', 'Dekra Certification, Inc., P.O. Box 85394, Minneapolis, MN 55485-9394');
            // });
            // cy.get(".item").eq(1).find("nb-icon[icon='copy-outline']").trigger("click").then(()=>{
            //     cy.window().its('navigator.clipboard').invoke('readText').should('equal', 'Wells Fargo Bank, N.A, 420 Montgomery St, San Francisco, CA 94104');
            // });

            /***************************************************************************************************************/

            // cy.get(".item").eq(0).find("nb-icon[icon='copy-outline']").trigger("click").then(()=>{
            //     cy.window().then((win) => {
            //         win.navigator.clipboard.readText().then((text) => {
            //           expect(text).to.eq('Dekra Certification, Inc., P.O. Box 85394, Minneapolis, MN 55485-9394');
            //         });
            //     });
            // });
            // cy.get(".item").eq(1).find("nb-icon[icon='copy-outline']").click().then(()=>{
            //     cy.window().then((win2) => {
            //         win2.navigator.clipboard.readText().then((text) => {
            //           expect(text).to.eq('Wells Fargo Bank, N.A, 420 Montgomery St, San Francisco, CA 94104');
            //         });
            //     });
            // });
            // cy.get(".item").eq(2).find("nb-icon[icon='copy-outline']").click().then(()=>{
            //     cy.window().then((win) => {
            //         win.navigator.clipboard.readText().then((text) => {
            //           expect(text).to.eq('4943717165');
            //         });
            //     });
            // });
            // cy.get(".item").eq(3).find("nb-icon[icon='copy-outline']").click().then(()=>{
            //     cy.window().then((win) => {
            //         win.navigator.clipboard.readText().then((text) => {
            //           expect(text).to.eq('61000227');
            //         });
            //     });
            // });
            // cy.get(".item").eq(4).find("nb-icon[icon='copy-outline']").click().then(()=>{
            //     cy.window().then((win) => {
            //         win.navigator.clipboard.readText().then((text) => {
            //           expect(text).to.eq('121000248');
            //         });
            //     });
            // });
            // cy.get(".item").eq(5).find("nb-icon[icon='copy-outline']").click().then(()=>{
            //     cy.window().then((win) => {
            //         win.navigator.clipboard.readText().then((text) => {
            //           expect(text).to.eq('WFBIUS6S');
            //         });
            //     });
            // });
            // cy.get(".item").eq(6).find("nb-icon[icon='copy-outline']").click().then(()=>{
            //     cy.window().then((win) => {
            //         win.navigator.clipboard.readText().then((text) => {
            //           expect(text).to.eq('23-2689662');
            //         });
            //     });
            // });
            // cy.get(".item").eq(7).find("nb-icon[icon='copy-outline']").click().then(()=>{
            //     cy.window().then((win) => {
            //         win.navigator.clipboard.readText().then((text) => {
            //           expect(text).to.eq('876862343');
            //         });
            //     });
            // });
            // cy.get(".item").eq(8).find("nb-icon[icon='copy-outline']").click().then(()=>{
            //     cy.window().then((win) => {
            //         win.navigator.clipboard.readText().then((text) => {
            //           expect(text).to.eq('3BQZ3');
            //         });
            //     });
            // });

            //editing billing data - validations

            cy.get(".billing-preferences-container").find("#change-button").click();
                //check visibility of edit button for other accordions - should not be visible
                cy.get(".order-card").find("#toggle-order-details").click();
                cy.get(".order-card").find("#change-button").should("not.exist");
                cy.get(".additional-questions-card").find("#toggle-order-details").click();
                cy.get(".additional-questions-card").find("#change-button").should("not.exist");
                //check disabled elements
                cy.get(".terms-and-conditions-panel").find("#read-and-accepted-checkbox").find(".native-input").should("have.attr", "disabled");
                cy.get(".terms-and-conditions-panel").find("#terms-and-conditions-checkbox").find(".native-input").should("have.attr", "disabled");
                cy.get("#decline-offer-button").should("have.attr", "disabled");
                cy.get(".submit-button").should("have.attr", "disabled");
            //additional billing information - validations
            cy.get("#additionalInformation-").should("have.attr", "placeholder", "type in any additional billing information");
            cy.get("#additionalInformation-").type("a");
            cy.get(".additional-billing-info").find(".validation-message").should("have.text", "The answer is too short");
            cy.get("#change-button").should("have.attr", "disabled");
            cy.get("#additionalInformation-").type("aa");
            cy.get(".additional-billing-info").find(".validation-message").should("not.exist");
            cy.get("#change-button").should("not.have.attr", "disabled");
            cy.get("#additionalInformation-").clear();
            //purchase order number radiobutton - validations and additional questions
            cy.get("nb-radio-group[formcontrolname='isPurchaseNumberRequiredForPayment']").find(".text").contains("Yes").click();
            cy.get("input[formcontrolname='purchaseOrderNumber']").should("have.attr", "placeholder", "172942-1");
            cy.get("input[formcontrolname='purchaseOrderNumber']").type("a");
            cy.get(".billing-container").find(".text-row").eq(0).find(".validation-message").should("have.text", "The answer is too short");
            cy.get("input[formcontrolname='purchaseOrderNumber']").clear();
            cy.get(".billing-container").find(".text-row").eq(0).find(".validation-message").should("have.text", "Required");
            cy.get("input[formcontrolname='purchaseOrderNumber']").type("123-45a");
            cy.get("nb-radio-group[formcontrolname='coverTravelExpenses']").find(".text").contains("Yes").click();
            //different address and contact informations - fill fields with sample data (case 1)
            cy.get("nb-toggle[formcontrolname='sameCompanyAndContactPersonAsProvided']").find(".toggle").click();
            cy.get("input[formcontrolname='companyName']").type("Another Company");
            cy.get("input[formcontrolname='street']").type("Some Street, 12b");
            cy.get("input[formcontrolname='city']").type("New City");
            cy.get('ng-select[formcontrolname="usState"]').click();
            cy.get(".ng-dropdown-panel-items").find(".ng-option").should("have.length", 50);
            cy.get('ng-select[formcontrolname="usState"]').type("ca");
            cy.get(".ng-dropdown-panel-items").find(".ng-option-label").contains("California").click();
            cy.get("input[formcontrolname='zipCode']").type("55444");
            cy.get("input[name='contact-person-first-name']").type("Some Name");
            cy.get("input[name='contact-person-last-name']").type("Some Last");
            cy.get("input[name='contact-person-job-title']").type("Some Job");
            cy.get("input[formcontrolname='email']").type("somerandommail@qq.qq");
            cy.get("input[formcontrolname='phone']").type("456-567 771");
            cy.get("#change-button").click();
            cy.wait(5000);
                //billing info read-only data
                cy.get(".billing-preferences-container").find("#toggle-order-details").click();
                cy.get(".billing-container").find("address-details").should("exist");
                cy.get(".billing-container").find("contact-person-details").should("exist");
                cy.get(".radio-with-question").eq(0).find(".text").should("have.text", " Yes ");
                cy.get(".radio-with-question").eq(1).find(".text").should("have.text", " Yes ");
                //download PDF - company name change shouldn't change PDF file name
                cy.get("#download-offer-pdf").click();
                cy.readFile('cypress\\downloads\\Estimate-Company9init4step.pdf').should('exist');
                //check user panel at navigation bar - first/last name and email change shouldn't change user account data
                cy.get("#user-info").find("#user-full-name").should("have.text", "FirstName9init4step LastName");
                cy.get("#user-info").find("#user-email").should("have.text", "autouser9init-step4@qq.qq");
                //check basic info accordion - first/last name and email change shouldn't change basic info data
                cy.get(".order-card").find(".company-name").should("have.text", "Company9init4step");
                cy.get("#order-details").find("#contact-person").should("have.text", "FirstName9init4step LastName");
                cy.get("#order-details").find("#email").should("have.text", "autouser9init-step4@qq.qq");
            //different address and contact informations - fill fields with sample data (case 2)
            cy.get(".billing-preferences-container").find("#change-button").click();
            cy.get("ng-select[formcontrolname='country']").click();
            cy.get(".ng-dropdown-panel-items").find(".ng-option-label").contains("CA").click();
            cy.get("ng-select[formcontrolname='usState']").click();
            cy.get(".ng-dropdown-panel-items").find(".ng-option-label").contains("Prince Edward Island").click();
            cy.get("input[formcontrolname='zipCode']").clear().type("T6Y 7U8");
            cy.get("input[formcontrolname='email']").clear().type("autouser9init-step4@qq.qq");
            cy.get("nb-radio-group[formcontrolname='isPurchaseNumberRequiredForPayment']").find(".text").contains("No").click();
            cy.get("#additionalInformation-").type("Some information");
            cy.get("#change-button").click();
            cy.wait(5000);
        });
    });
    
    describe("edit functionality", function(){

        it("basic info - edit", function(){

            //editing - section visibility
            cy.get("order-details").find("#toggle-order-details").click();
            cy.get("order-details").find("#change-button").click();
            cy.get("basic-order-edit").should("exist");
            cy.get("#your-information-label").should("have.text", "Your information");
            cy.get("basic-order-edit").find("company-has-certificate").should("exist");
            cy.get("basic-order-edit").find("contact-person").should("exist");
            cy.get("basic-order-edit").find("company-address").should("exist");
            cy.get("basic-order-edit").find(".product-header").should("exist");
            cy.get("basic-order-edit").find("company-general-info").should("exist");
            cy.get("basic-order-edit").find("price-factors").should("exist");
            cy.get("basic-order-edit").find("#cancel-button").should("exist").and("not.have.attr", "disabled");
            cy.get("basic-order-edit").find("#change-button").should("exist").and("have.attr", "disabled");
            cy.get("basic-order-edit").find("#cancel-button").click();
            cy.get(".order-card").find("#toggle-order-details").should("have.text", " Show ");
            cy.get(".order-card").find("#order-details").should("not.exist");
            cy.get(".order-card").find(".change-button.collapsed").should("exist");
            //editing - cancelling changes
            cy.get("order-details").find("#toggle-order-details").click();
            cy.get("order-details").find("#change-button").click();
            cy.get("contact-person").find("input[formcontrolname='firstName']").type(" edit");
            cy.get("contact-person").find("input[formcontrolname='lastName']").type(" edit");
            cy.get("contact-person").find("input[formcontrolname='email']").should("have.attr", "disabled");
            cy.get(".decision-buttons").find("#cancel-button").click();
            cy.wait(3000);
            cy.get(".order-card").find("#toggle-order-details").click();
            cy.get("order-details").find("#contact-person").should("have.text", "FirstName9init4step LastName");
            cy.get("#user-info").find("#user-full-name").should("have.text", "FirstName9init4step LastName");
            //editing - editing and saving changes - prices don't change
            cy.get("order-details").find("#change-button").click();
                //multisite
                cy.get("#multiSite").find(".text").contains("Yes").click();
                cy.get("basic-order-edit").find("#change-button").should("have.attr", "disabled");
                cy.get(".button-redirect-link").should("exist");
                cy.get("#multiSite").find(".text").contains("No").click();
                //change audit type popup - cancel
                cy.get("#hasCertificate_ISO_9001").find(".text").contains("Yes").click(); //"Yes" for transfer
                cy.get(".audit-type-change-dialog").should("exist");
                cy.get(".audit-type-change-dialog").find(".dialog-buttons").contains("Cancel").click();
                // cy.get("#hasCertificate_ISO_9001").find("input[value='false']").eq(0).should("exist"); //sprawdź czy asercja działa
                // cy.get("#hasCertificate_ISO_9001 input").eq(0).should("have.attr", "value", "false"); //sprawdź czy inaczej zdefiniowana asercja działa
                //rest of the form - price not changed
                cy.get("contact-person").find('input[formcontrolname="firstName"]').type(" edit");
                cy.get("contact-person").find('input[formcontrolname="lastName"]').type(" edit");
                cy.get("contact-person").find('input[formcontrolname="jobTitle"]').type(" edit");
                cy.get("contact-person").find('input[formcontrolname="phone"]').type("1");
                cy.get('input[formcontrolname="companyName"]').type(" edit");
                cy.get('input[formcontrolname="street"]').type(" edit");
                cy.get('input[formcontrolname="city"]').type(" edit");
                cy.get('company-address ng-select[formcontrolname="country"]').click()
                cy.get(".ng-dropdown-panel-items").find(".ng-option-label").contains("CA").click();
                cy.get('company-address ng-select[formcontrolname="usState"]').click();
                cy.get(".ng-dropdown-panel-items").find(".ng-option-label").contains("Newfoundland and Labrador").click();
                cy.get('input[formcontrolname="zipCode"]').clear().type("R5T6Y7");
                /**/
                cy.get('#company-description_-iso_9001').type(" edit");
                cy.get("#part-time-employees-included-iso_9001").find(".text").contains("No").click();
                cy.get("#shifts_iso_9001").find(".text").contains("More").click();
                cy.get("#shifts-number-more_iso_9001").click().find(".ng-option-label").contains("4").click();
            //
            cy.get("basic-order-edit").find("#change-button").click();
            cy.wait(5000);
            cy.get("price-change-approve").should("not.exist");
    
            //signed by - field contents updated
            cy.get("#terms-and-conditions-first-name").should("have.value", "FirstName9init4step edit");
            cy.get("#terms-and-conditions-last-name").should("have.value", "LastName edit");
            cy.get("#terms-and-conditions-title").should("have.value", "JobTitle edit");
            //basic info accordion updated
            cy.get(".order-card").find(".company-name").should("have.text", "Company9init4step edit");
    
            //editing - editing and saving changes - prices change
            cy.get("order-details").find("#toggle-order-details").click();
            cy.get("order-details").find("#change-button").click();
                //rest of the form - price changed
                cy.get('#total-employeesiso_9001').clear().type("1000");
                cy.get("#scope-description-needs-narrowing--iso_9001").find(".text").contains("No").click();
                cy.get("#scope-description--iso_9001").type("Edit testing note");
                cy.get("#employees-within-scope-iso_9001").clear().type("100");
                cy.get("#scope-selector-iso_9001").find(".ng-value-icon.left").click();
                cy.get('#company-scopes').click();
                cy.get(".ng-dropdown-panel-items").find("#item-19-iso_9001").click();
                cy.get("#catastrophic-risk-iso_9001").find(".text").contains("Yes").click({force: true}); //ISO 9001 related
                /**/
                cy.get("#price-factor-performing_design-iso_9001").find(".text").contains("Yes").click();
                cy.get("#price-factor-translator_required-iso_9001").find(".text").contains("No").click();
                cy.get("#price-factor-high_degree_of_regulation-iso_9001").find(".text").contains("Yes").click();
                cy.get("#price-factor-complex_process-iso_9001").find(".text").contains("No").click();
                cy.get("#price-factor-outsourcing_processes-iso_9001").find(".text").contains("Yes").click();
                cy.get("#price-factor-highly_automated_processes-iso_9001").find(".text").contains("No").click();
                cy.get("#price-factor-employees_working_off_location-iso_9001").find(".text").contains("Yes").click();
                cy.get("#price-factor-low_risk-iso_9001").find(".text").contains("No").click();
            //
            cy.get("basic-order-edit").find("#change-button").click();
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
    
        });

        it("additional questions - edit", function(){

            //section visibility
            cy.get(".additional-questions-card").find("#toggle-order-details").click();
            cy.get(".additional-questions-card").find("base-additional-questions-details").should("exist");
            
            //edit then save
            cy.get(".additional-questions-card").find("#change-button").click();
                //check visibility of edit button for other accordions - should not be visible
                cy.get("#billing-details").find("#change-button").should("not.exist");
                cy.get(".order-card").find("#toggle-order-details").click();
                cy.get(".order-card").find("#change-button").should("not.exist");
                //check disabled elements
                cy.get(".terms-and-conditions-panel").find("#read-and-accepted-checkbox").find(".native-input").should("have.attr", "disabled");
                cy.get(".terms-and-conditions-panel").find("#terms-and-conditions-checkbox").find(".native-input").should("have.attr", "disabled");
                cy.get("#decline-offer-button").should("have.attr", "disabled");
                cy.get(".submit-button").should("have.attr", "disabled");
            cy.get("pre-audit-checkbox").find(".custom-checkbox").click();
            cy.get(".stage-1-date").find(".clear-icon").click();
            cy.get(".stage-2-date").find(".clear-icon").click();
            //======
            cy.get("[formcontrolname=outsourced_process_1ISO_9001]").click();
            cy.get("[formcontrolname=outsourced_process_0ISO_9001]").click();
            cy.get("[formcontrolname=outsourced_process_2ISO_9001]").click();
            cy.get("#binary-question-radio-0ISO_9001-iso_9001").find(".text").contains("Yes").click();
            cy.get("#binary-question-description-0ISO_9001-iso_9001").type("Some secutity issues.");
            cy.get("#binary-question-radio-1ISO_9001-iso_9001").find(".text").contains("No").click();
            cy.get("#binary-question-radio-2ISO_9001-iso_9001").find(".text").contains("Yes").click();
            cy.get("#binary-question-description-2ISO_9001-iso_9001").type("Some risks.");
            cy.get("#binary-question-radio-3ISO_9001-iso_9001").find(".text").contains("No").click();
            cy.get("#binary-question-radio-4ISO_9001-iso_9001").find(".text").contains("Yes").click();
            cy.get("#binary-question-description-4ISO_9001-iso_9001").type("Receiving services.");
            cy.get("#text-question-0ISO_9001-iso_9001").type(", platinum");
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
            cy.wait(5000);
            cy.get("price-change-approve").find("#approve-changes-button").click();
            cy.wait(5000);
            cy.get(".additional-questions-card").find("#toggle-order-details").should("have.text", " Show ");
            cy.get(".additional-questions-card").find("#order-details").should("not.exist");
            cy.get(".additional-questions-card").find(".change-button.collapsed").should("exist");
    
        });

    })

})