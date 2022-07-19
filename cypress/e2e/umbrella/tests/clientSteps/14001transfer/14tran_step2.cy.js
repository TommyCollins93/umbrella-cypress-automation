
describe("14001 transfer - 2nd step testcases", function(){

    beforeEach(function(){
        cy.visit("https://stage-iso14001.myaudit.net/system/login");
        cy.get("#email").type("autouser14tran-step2@qq.qq");
        cy.get("#password").type("Qqqqqq11");
        cy.get("button").contains("LOGIN").click();
        cy.wait(3000);
    });

    it("basic validations", function(){
        
        //empty state
        cy.get(".submit-button").click();
        cy.get(".button-wrapper").find(".validation-message").should("have.text", "You missed a question");
        cy.get(".cb-select").find(".validation-message").should("have.text", "Required");
        cy.get(".col-md-12").eq(2).find(".validation-message").should("have.text", "Required"); //need id or proper class
        cy.get(".text-area-wrapper").find(".validation-message").should("have.text", "Please provide a description"); //need id or proper class
        cy.get(".employees-input").find(".validation-message").should("have.text", "Required");
        cy.get(".answer-part").eq(0).find(".validation-message").should("have.text", "Required"); //need id or proper class
        cy.get(".company-scope").find(".validation-message").should("have.text", "Select at least one");
        cy.get(".answer-part").eq(1).find(".validation-message").should("have.text", "Required"); //need id or proper class
        cy.get(".offer-request-card").eq(1).find(".validation-message").should("have.text", "Please answer all above questions");
        cy.get(".offer-request-card").eq(1).find(".price-factors").should("have.length", 8);
        //cb section
        cy.get(".cb-select").find(".text").contains("other").click();
        cy.get(".other-cb").find(".validation-message").should("have.text", "Required");
        cy.get(".other-cb").click();
        cy.get(".ng-dropdown-panel").find(".ng-option").contains("Not on the list").click();
        cy.get(".submit-button").click();
        cy.get(".custom-cb").find(".validation-message").should("have.text", "Required");
        cy.get("input[formcontrolname='customCbNameISO_14001']").type("a");
        cy.get(".custom-cb").find(".validation-message").should("have.text", "The answer is too short");
        cy.get("input[formcontrolname='customCbNameISO_14001']").clear().type("qwertyuiu ".repeat(10)+"a");
        cy.get(".custom-cb").find(".validation-message").should("have.text", "The answer is too long");
        //company description
        cy.get("#company-description_-iso_14001").type("aaaaaaaaa");
        cy.get(".text-area-wrapper").find(".validation-message").should("have.text", "Description is too short"); //need id or proper class
        //zabiera za dużo czasu, czeka na dokończenie animacji
        // cy.get("#company-description_-iso_14001").clear().type("qwertyuiu ".repeat(500)+"a");
        // cy.get(".text-area-wrapper").find(".validation-message").should("have.text", "The answer is too long"); //need id or proper class //BUG
        //total number of employees
        cy.get("#total-employeesiso_14001").type("0");
        cy.get(".employees-input").find(".validation-message").should("have.text", "Please enter positive number of employees");
        cy.get("#total-employeesiso_14001").clear().type("2026");
        cy.get(".employee-number-exceed-popup").should("exist");
        cy.get(".employees-input").find(".validation-message").should("have.text", "Employee number is too high (max. 2025)");
        cy.get("#total-employeesiso_14001").clear();
        //scope description
        cy.get("#scope-description-needs-narrowing--iso_14001-false").click();
        cy.get(".submit-button").click();
        cy.get(".text-area-wrapper").eq(1).find(".validation-message").should("have.text", "Required"); //need id or proper class
        cy.get("#scope-description--iso_14001").type("aaaaaaaaa");
        cy.get(".text-area-wrapper").eq(1).find(".validation-message").should("have.text", "The answer is too short"); //need id or proper class
        //zabiera za dużo czasu, czeka na dokończenie animacji
        // cy.get("#scope-description--iso_14001").clear().type("qwertyuiu ".repeat(500)+"a");
        // cy.get(".text-area-wrapper").eq(1).find(".validation-message").should("have.text", "The answer is too long"); //need id or proper class
        //no. of employees within scope
        cy.get("#employees-within-scope-iso_14001").type("0");
        cy.get(".employees-input").eq(1).find(".validation-message").should("have.text", "Please enter positive number of employees");
        cy.get("#employees-within-scope-iso_14001").clear().type("2026");
        cy.get(".employee-number-exceed-popup").should("exist");
        cy.get(".employees-input").eq(1).find(".validation-message").should("have.text", "Employee number is too high (max. 2025)");
        cy.get("#employees-within-scope-iso_14001").clear();
        //'total no. of employees' and 'no. of employees within scope' dependencies
        cy.get("#total-employeesiso_14001").type("10");
        cy.get("#employees-within-scope-iso_14001").type("100");
        cy.get(".employees-input").eq(0).find(".validation-message").should("have.text", "Cannot be lower than employees within scope");
        cy.get(".employees-input").eq(1).find(".validation-message").should("have.text", "Cannot be higher than total employees");
        cy.get("#total-employeesiso_14001").clear().type("2025");
        cy.get("#employees-within-scope-iso_14001").clear().type("2025");
        cy.get(".employees-input").eq(0).find(".validation-message").should("not.exist");
        cy.get(".employees-input").eq(1).find(".validation-message").should("not.exist");
        //part time employees included - textbox
        cy.get("#part-time-employees-included-iso_14001-true").click();
        cy.get(".submit-button").click();
        cy.get(".text-area-wrapper").eq(2).find(".validation-message").should("have.text", "Required");
        //zabiera za dużo czasu, czeka na dokończenie animacji
        // cy.get("#employees-count-description-iso_14001").type("qwertyuiu ".repeat(500)+"a");
        // cy.get(".text-area-wrapper").eq(2).find(".validation-message").should("have.text", "The answer is too long");
        //number of shifts
        cy.get("#shifts_iso_14001").find(".status-primary").contains("More").click();
        cy.get(".submit-button").click();
        cy.get(".more-shifts").find(".validation-message").should("have.text", "Required");
        //translator required - question
        cy.get("#price-factor-translator_required-iso_14001").find(".text").contains("Yes").click();
        cy.get(".submit-button").click();
        cy.get(".offer-request-card").eq(1).find("#attached-question-translator_required-iso_14001-specify_language").should("exist");
        cy.get(".offer-request-card").eq(1).find(".validation-message").eq(0).should("have.text", "Required");
        cy.get("#attached-question-translator_required-iso_14001-specify_language").type("a");
        cy.get(".offer-request-card").eq(1).find(".validation-message").eq(0).should("have.text", "The answer is too short");
        cy.get("#attached-question-translator_required-iso_14001-specify_language").clear().type("qwertyuiu ".repeat(10)+"a");
        cy.get(".offer-request-card").eq(1).find(".validation-message").eq(0).should("have.text", "The answer is too long");
    });

    it("choosing DEKRA in cb section/info icons/accordion behaviours)", function(){

        //choosing DEKRA
        cy.get("#has-dekra-iso_14001-certificate-radio-group").find(".status-primary").contains("DEKRA").click();
        cy.get(".redirection-message").should("have.text"," If you need a renewal, please get in touch with our sales department sales.us@dekra.com");
        cy.get(".submit-button").should("have.class", "btn-disabled");
        cy.get("button[disabled]").should("exist");
        //other cb
        cy.get(".cb-select").find(".text").contains("other").click();
        cy.get(".other-cb").click();
        cy.get(".ng-dropdown-panel").find(".ng-option").should("have.length", 14);
        cy.get(".ng-dropdown-panel").find(".ng-option").contains("Not on the list").click();
        cy.get("input[formcontrolname='customCbNameISO_14001']").type("dEkRa");
        cy.get(".redirection-message").should("have.text"," If you need a renewal, please get in touch with our sales department sales.us@dekra.com");
        cy.get(".submit-button").should("have.class", "btn-disabled");
        cy.get("button[disabled]").should("exist");
        cy.get("input[formcontrolname='customCbNameISO_14001']").clear();
        //company description icon
        cy.get(".info-icon").eq(0).click();
        cy.get(".description-card").should("include.text", "Examples:The design and manufacture of xyz.The provision of internal IT infrastructure and support for the manufacture of electronics.");
        cy.get(".description-card").find("nb-icon[icon='close-circle-outline']").click();
        //certification scope icon
        cy.get(".info-icon").eq(1).click();
        cy.get(".scopes-explanation-card").should("include.text", "The industry the primary activities of the organization's scope fall under, not necessarily what industries where products/services are being delivered");
        cy.get(".scopes-explanation-card").find("nb-icon[icon='close-circle-outline']").click();
        // hide/show sections and accordions
        cy.get(".toggle-view-section").should("have.text", " Hide ");
        cy.get(".toggle-view-section").click();
        cy.get(".toggle-view-section").should("have.text", " Show ");
        cy.get(".hide-section").should("exist");
            // open accordion on submit button click
            cy.get(".submit-button").click();
            cy.get(".toggle-view-section").should("have.text", " Hide ");
            cy.get(".hide-section").should("not.exist");
        //1st step info accordion
        cy.get(".toggle-details-section").should("have.text", " Show ")
        cy.get(".order-card").find("#order-details").should("not.exist");
        cy.get(".toggle-details-section").click();
        cy.get(".toggle-details-section").should("have.text", " Hide ")
        cy.get(".order-card").find("#order-details").should("exist");
    });

    it("certification scopes/number of shifts/stepper", function(){

        //certification scopes
        cy.get("#company-scopes").click();
        cy.get(".ng-dropdown-panel-items").find(".ng-option").should("have.length", 37);
        cy.get("#company-scopes").type("9");
        cy.get(".ng-dropdown-panel-items").find(".ng-option").should("have.length", 4);
        cy.get(".ng-dropdown-panel-items").find(".ng-option").eq(0).should("have.text", "09 - Printing Companies");
        cy.get(".ng-dropdown-panel-items").find(".ng-option").eq(1).should("have.text", "19 - Electrical and Optical Equipment");
        cy.get(".ng-dropdown-panel-items").find(".ng-option").eq(2).should("have.text", "29 - Wholesale and Retail Trade; Repair of Motor Vehicles, Motorcycles and Personal and Household Goods");
        cy.get(".ng-dropdown-panel-items").find(".ng-option").eq(3).should("have.text", "39 - Other Social Services");
        //certification scopes - radiobutton questions
        cy.get("#company-scopes").clear().click();
        cy.get(".ng-dropdown-panel-items").find(".ng-option").click({multiple: true});
        cy.get(".scope-question").should("have.length", 14);
        cy.get(".scope-question").each(($scope), function(){
            get($scope).find("nb-radio-group").contains("No").click();
        });
        //number of shifts
        cy.get("#shifts_iso_14001").find(".status-primary").contains("More").click();
        cy.get(".more-shifts").click();
        cy.get(".ng-dropdown-panel-items").find(".ng-option").should("have.length", 7);
        cy.get(".ng-dropdown-panel-items").find(".ng-option").eq(0).should("have.text", "4");
        cy.get(".ng-dropdown-panel-items").find(".ng-option").eq(6).should("have.text", "10");
        //stepper (FOR TRANSFER)
        cy.get(".stepper").find(".step").should("have.length", 5);
        cy.get(".stepper").find(".step").eq(0).should("have.class", "completed");
        cy.get(".step").eq(0).find("nb-icon[icon='checkmark-outline']").should("exist");
        cy.get(".stepper").find(".step").eq(1).should("have.class", "selected");
        cy.get(".stepper").find(".step").eq(2).should("have.class", "noninteractive").and("not.have.class", "selected");
        cy.get(".stepper").find(".step").eq(3).should("have.class", "noninteractive").and("not.have.class", "selected");
        cy.get(".stepper").find(".step").eq(4).should("have.class", "noninteractive").and("not.have.class", "selected");

    });


})