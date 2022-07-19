
describe("27001 initial - 2nd step testcases", function(){

    beforeEach(function(){
        cy.visit("https://stage-iso14001.myaudit.net/system/login");
        cy.get("#email").type("autouser27init-step2@qq.qq");
        cy.get("#password").type("Qqqqqq11");
        cy.get("button").contains("LOGIN").click();
        cy.wait(3000);
    });

    it("basic validations", function(){
        
        //empty state
        cy.get(".submit-button").click();
        cy.get(".button-wrapper").find(".validation-message").should("have.text", "You missed a question");
        cy.get(".text-area-wrapper").find(".validation-message").should("have.text", "Please provide a description"); //need id or proper class
        cy.get(".employees-input").find(".validation-message").should("have.text", "Required");
        cy.get(".answer-part").eq(0).find(".validation-message").should("have.text", "Required"); //need id or proper class
        cy.get(".company-scope").find(".read-only-scope").contains("33 - Information Technology");
        cy.get(".answer-part").eq(1).find(".validation-message").should("have.text", "Required"); //need id or proper class
        // cy.get(".offer-request-card").eq(1).find(".validation-message").should("have.text", "Please answer all above questions");
        // cy.get(".offer-request-card").eq(1).find(".price-factors").should("have.length", 4);
        cy.get("estimate-questions").find(".validation-message").each(($validation_message)=>{
            cy.get($validation_message).should("have.text", "Required");
        });
        cy.get("estimate-questions").find(".question-options").should("have.length", 8);

        //company description
        cy.get("#company-description_-iso_27001").type("aaaaaaaaa");
        cy.get(".text-area-wrapper").find(".validation-message").should("have.text", "Description is too short"); //need id or proper class
        //zabiera za dużo czasu, czeka na dokończenie animacji
        // cy.get("#company-description_-iso_27001").clear().type("qwertyuiu ".repeat(500)+"a");
        // cy.get(".text-area-wrapper").find(".validation-message").should("have.text", "The answer is too long"); //need id or proper class //BUG
        //total number of employees
        cy.get("#total-employeesiso_27001").type("0");
        cy.get(".employees-input").find(".validation-message").should("have.text", "Please enter positive number of employees");
        cy.get("#total-employeesiso_27001").clear().type("2026");
        cy.get(".employee-number-exceed-popup").should("exist");
        cy.get(".employees-input").find(".validation-message").should("have.text", "Employee number is too high (max. 2025)");
        cy.get("#total-employeesiso_27001").clear();
        //scope description
        cy.get("#scope-description-needs-narrowing--iso_27001-false").click();
        cy.get(".submit-button").click();
        cy.get(".text-area-wrapper").eq(1).find(".validation-message").should("have.text", "Required"); //need id or proper class
        cy.get("#scope-description--iso_27001").type("aaaaaaaaa");
        cy.get(".text-area-wrapper").eq(1).find(".validation-message").should("have.text", "The answer is too short"); //need id or proper class
        //zabiera za dużo czasu, czeka na dokończenie animacji
        // cy.get("#scope-description--iso_27001").clear().type("qwertyuiu ".repeat(500)+"a");
        // cy.get(".text-area-wrapper").eq(1).find(".validation-message").should("have.text", "The answer is too long"); //need id or proper class
        //no. of employees within scope
        cy.get("#employees-within-scope-iso_27001").type("0");
        cy.get(".employees-input").eq(1).find(".validation-message").should("have.text", "Please enter positive number of employees");
        cy.get("#employees-within-scope-iso_27001").clear().type("2026");
        cy.get(".employee-number-exceed-popup").should("exist");
        cy.get(".employees-input").eq(1).find(".validation-message").should("have.text", "Employee number is too high (max. 2025)");
        cy.get("#employees-within-scope-iso_27001").clear();
        //'total no. of employees' and 'no. of employees within scope' dependencies
        cy.get("#total-employeesiso_27001").type("10");
        cy.get("#employees-within-scope-iso_27001").type("100");
        cy.get(".employees-input").eq(0).find(".validation-message").should("have.text", "Cannot be lower than employees within scope");
        cy.get(".employees-input").eq(1).find(".validation-message").should("have.text", "Cannot be higher than total employees");
        cy.get("#total-employeesiso_27001").clear().type("1");
        cy.get("#employees-within-scope-iso_27001").clear().type("1");
        cy.get(".employees-input").eq(0).find(".validation-message").should("not.exist");
        cy.get(".employees-input").eq(1).find(".validation-message").should("not.exist");
        //part time employees included - textbox
        cy.get("#part-time-employees-included-iso_27001-true").click();
        cy.get(".submit-button").click();
        cy.get(".text-area-wrapper").eq(2).find(".validation-message").should("have.text", "Required");
        //zabiera za dużo czasu, czeka na dokończenie animacji
        // cy.get("#employees-count-description-iso_27001").type("qwertyuiu ".repeat(500)+"a");
        // cy.get(".text-area-wrapper").eq(2).find(".validation-message").should("have.text", "The answer is too long");
        //number of shifts
        cy.get("#shifts_iso_27001").find(".status-primary").contains("More").click();
        cy.get(".submit-button").click();
        cy.get(".more-shifts").find(".validation-message").should("have.text", "Required");
        //'Previously documented performance' section
        cy.get("long-option-single-choice").eq(3).find(".question-option").eq(2).click();
        cy.get("long-option-single-choice").eq(3).find("#estimate-question-long_option_single_choice-iso_27001-previously_documented_performance_description").should("not.exist");
        cy.get("long-option-single-choice").eq(3).find(".question-option").eq(1).click();
        cy.get("long-option-single-choice").eq(3).find("#estimate-question-long_option_single_choice-iso_27001-previously_documented_performance_description").should("exist");
        cy.get(".submit-button").click();
        cy.get("long-option-single-choice").eq(3).find(".validation-message").should("have.text", "Required");
        cy.get("long-option-single-choice").eq(3).find(".question-option").eq(2).click();
        cy.get("long-option-single-choice").eq(3).find(".question-option").eq(0).click();
        cy.get("long-option-single-choice").eq(3).find("#estimate-question-long_option_single_choice-iso_27001-previously_documented_performance_description").should("exist");
        cy.get(".submit-button").click();
        cy.get("long-option-single-choice").eq(3).find(".validation-message").should("have.text", "Required");
        cy.get("long-option-single-choice").eq(3).find("#estimate-question-long_option_single_choice-iso_27001-previously_documented_performance_description").type("a");
        cy.get("long-option-single-choice").eq(3).find(".validation-message").should("have.text", "The answer is too short");
        //'Outsourcing and third-party arrangements' section
        cy.get("long-option-single-choice").eq(5).find(".question-option").eq(0).click();
        cy.get(".submit-button").click();
        cy.get("long-option-single-choice").eq(5).find(".radio-button-row").should("exist");
        cy.get("long-option-single-choice").eq(5).find(".validation-message").should("have.text", "Required");
        cy.get("long-option-single-choice").eq(5).find(".question-option").eq(1).click();
        cy.get("long-option-single-choice").eq(5).find(".radio-button-row").should("exist");
        cy.get("long-option-single-choice").eq(5).find(".validation-message").should("have.text", "Required");
        cy.get("long-option-single-choice").eq(5).find(".question-option").eq(2).click();
        cy.get("long-option-single-choice").eq(5).find(".radio-button-row").should("exist");
        cy.get("long-option-single-choice").eq(5).find(".validation-message").should("have.text", "Required");
        cy.get("long-option-single-choice").eq(5).find("#estimate-question-long_option_single_choice-iso_27001-edit_rights_to_isms").contains("No").click();
    });

    it("choosing DEKRA in cb section/info icons/accordion behaviours)", function(){

        //company description icon
        cy.get(".info-icon").eq(0).click();
        cy.get(".description-card").should("include.text", "Examples:The design and manufacture of xyz.The provision of internal IT infrastructure and support for the manufacture of electronics.");
        cy.get(".description-card").find("nb-icon[icon='close-circle-outline']").click();
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

    it("number of shifts/stepper", function(){

        //number of shifts
        cy.get("#shifts_iso_27001").find(".status-primary").contains("More").click();
        cy.get(".more-shifts").click();
        cy.get(".ng-dropdown-panel-items").find(".ng-option").should("have.length", 7);
        cy.get(".ng-dropdown-panel-items").find(".ng-option").eq(0).should("have.text", "4");
        cy.get(".ng-dropdown-panel-items").find(".ng-option").eq(6).should("have.text", "10");
        //stepper (FOR INITIAL)
        cy.get(".stepper").find(".step").should("have.length", 4);
        cy.get(".stepper").find(".step").eq(0).should("have.class", "completed");
        cy.get(".step").eq(0).find("nb-icon[icon='checkmark-outline']").should("exist");
        cy.get(".stepper").find(".step").eq(1).should("have.class", "selected");
        cy.get(".stepper").find(".step").eq(2).should("have.class", "noninteractive").and("not.have.class", "selected");
        cy.get(".stepper").find(".step").eq(3).should("have.class", "noninteractive").and("not.have.class", "selected");

    });


})