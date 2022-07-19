

describe("1st step testcases", function(){

    beforeEach(function(){
        cy.visit("/");
    });

    it("validation messages - empty state", function(){

        //cy.visit("/");
        cy.get("#get-a-quote-button").click();
        cy.get(".standard-selection-buttons-wrapper").find(".validation-message").should("have.text", "Select a standard");
        cy.get(".company-has-certificate-card").find(".validation-message").should("have.text", "Required");
        cy.get(".offer-request-card").eq(0).find(".validation-message").should("have.length", 5);
        cy.get(".offer-request-card").eq(0).find(".validation-message").each(($msg)=>{
            cy.get($msg).should("have.text", "Required");
        });
        cy.get(".offer-request-card").eq(1).find(".validation-message").should("have.length", 5);
        cy.get(".offer-request-card").eq(1).find(".validation-message").each(($msg)=>{
            cy.get($msg).should("have.text", "Required");
        });
        //more validation for specific iso questions
        cy.get(".standard-selection-buttons").each(($iso)=>{
            cy.get($iso).find("button").click({multiple: true});
        });
        cy.get("#get-a-quote-button").click();
        cy.get(".company-has-certificate-card").find(".validation-message").each(($msg)=>{
            cy.get($msg).should("have.text", "Required")
        })

    });
    
    it("links", function(){

        //marketing box
        cy.get(".marketing-text-box").find("a[href]").invoke("removeAttr", "target").click();
        cy.url().should("include", "dekra.us/en/audit/overview");
        cy.go("back");
        //information links
        cy.get(".information").find("a[href]").eq(0).invoke("removeAttr", "target").click();
        cy.url().should("include", "dekra.us/en/audit/iso-9001-certification");
        cy.go("back");
        cy.get(".information").find("a[href]").eq(1).invoke("removeAttr", "target").click();
        cy.url().should("include", "dekra.us/en/audit/iso-14001-certification");
        cy.go("back");
        cy.get(".information").find("a[href]").eq(2).invoke("removeAttr", "target").click();
        cy.url().should("include", "dekra.us/en/audit/iso-45001-certification");
        cy.go("back");
        cy.get(".information").find("a[href]").eq(3).invoke("removeAttr", "target").click();
        cy.url().should("include", "dekra.us/en/audit/iso-27001-certification");
        cy.go("back");
        cy.get(".information").find("a[href]").eq(4).invoke("removeAttr", "target").click();
        cy.url().should("include", "dekra.us/en/audit/iso-27701-certification");
        cy.go("back");
        //multisite links - 9001
        cy.get(".standard-selection-buttons").eq(0).click();
        cy.get("#multiSite").find(".text").contains("Yes").click();
        cy.get("#redirect-button").click();
        cy.url().should("include", "dekra.us/en/audit/9001-rfq-1");
        cy.go("back");
        //multisite links - 9001+27001+27701
        cy.get(".standard-selection-buttons").find("button").eq(0).click()
        cy.get(".standard-selection-buttons").find("button").eq(3).click()
        cy.get(".standard-selection-buttons").find("button").eq(4).click();
        cy.get("#multiSite").find(".text").contains("Yes").click();
        cy.get("#redirect-button").click();
        cy.url().should("include", "dekra.us/en/audit/iso-27701-certification/#rfq");
        cy.go("back");
    });

    it("state field", function(){

        cy.get('ng-select[formcontrolname="usState"]').click();
        cy.get(".ng-dropdown-panel-items").find(".ng-option").should("have.length", 50);
        cy.get('ng-select[formcontrolname="usState"]').type("Al");
        cy.get(".ng-dropdown-panel-items").find(".ng-option").should("have.length", 3);
        cy.get(".ng-option").eq(0).should("have.text", "Alabama");
        cy.get(".ng-option").eq(1).should("have.text", "Alaska");
        cy.get(".ng-option").eq(2).should("have.text", "California");
        cy.get('ng-select[formcontrolname="usState"]').clear().type("qa");
        cy.get(".ng-dropdown-panel-items").find(".ng-option").should("have.text", "Not found");
        
    });

    it("contact at Dekra field", function(){

            cy.get("#salesperson-select").click();
            cy.get(".ng-dropdown-panel-items").find(".ng-option").should("have.length", 4);
            cy.get("#salesperson-select").type("ca");
            cy.get(".ng-dropdown-panel-items").find(".ng-option").should("have.length", 2);
            cy.get(".ng-dropdown-panel-items").find(".ng-option").eq(0).should("have.text", "Joseph Duncan");
            cy.get(".ng-dropdown-panel-items").find(".ng-option").eq(1).should("have.text", "Clay Carlson");
            cy.get("#salesperson-select").clear().type("ha");
            cy.get(".ng-dropdown-panel-items").find(".ng-option").should("have.text", "No items found");

    })

    it("validation messages - other", function(){
        //first name
        cy.get('input[formcontrolname="firstName"]').type("a");
        cy.get(".offer-request-card").eq(0).find(".validation-message").eq(0).should("have.text", "The answer is too short");
        cy.get('input[formcontrolname="firstName"]').clear().type("qwertyuiu ".repeat(10)+"a");
        cy.get(".offer-request-card").eq(0).find(".validation-message").eq(0).should("have.text", "The answer is too long");
        //last name
        cy.get('input[formcontrolname="lastName"]').type("a");
        cy.get(".offer-request-card").eq(0).find(".validation-message").eq(1).should("have.text", "The answer is too short");
        cy.get('input[formcontrolname="lastName"]').clear().type("qwertyuiu ".repeat(10)+"a");
        cy.get(".offer-request-card").eq(0).find(".validation-message").eq(1).should("have.text", "The answer is too long");
        //job title
        cy.get('input[formcontrolname="jobTitle"]').type("a");
        cy.get(".offer-request-card").eq(0).find(".validation-message").eq(2).should("have.text", "The answer is too short");
        cy.get('input[formcontrolname="jobTitle"]').clear().type("qwertyuiu ".repeat(10)+"a");
        cy.get(".offer-request-card").eq(0).find(".validation-message").eq(2).should("have.text", "The answer is too long");
        //email address
        cy.get('input[formcontrolname="email"]').type("qq@qq.q");
        cy.get(".offer-request-card").eq(0).find(".validation-message").eq(3).should("have.text", "Enter valid email address");
        //phone number
        cy.get('input[formcontrolname="phone"]').type("a");
        cy.get(".offer-request-card").eq(0).find(".validation-message").eq(4).should("have.text", "Enter valid phone number");
        cy.get('input[formcontrolname="phone"]').clear().type("1111111111111");
        cy.get(".offer-request-card").eq(0).find(".validation-message").eq(4).should("have.text", "Too many characters");
        //company name
        cy.get('input[formcontrolname="companyName"]').type(" ");
        cy.get(".offer-request-card").eq(1).find(".validation-message").eq(0).should("have.text", "The answer is too short");
        cy.get('input[formcontrolname="companyName"]').clear().type("qwertyuiu ".repeat(10)+"a");
        cy.get(".offer-request-card").eq(1).find(".validation-message").eq(0).should("have.text", "The answer is too long");
        //street
        cy.get('input[formcontrolname="street"]').type(" ");
        cy.get(".offer-request-card").eq(1).find(".validation-message").eq(1).should("have.text", "The answer is too short");
        cy.get('input[formcontrolname="street"]').clear().type("qwertyuiu ".repeat(10)+"a");
        cy.get(".offer-request-card").eq(1).find(".validation-message").eq(1).should("have.text", "The answer is too long");
        //city
        cy.get('input[formcontrolname="city"]').type(" ");
        cy.get(".offer-request-card").eq(1).find(".validation-message").eq(2).should("have.text", "The answer is too short");
        cy.get('input[formcontrolname="city"]').clear().type("qwertyuiu ".repeat(10)+"a");
        cy.get(".offer-request-card").eq(1).find(".validation-message").eq(2).should("have.text", "The answer is too long");
        //zip/postal code
        cy.get('input[formcontrolname="zipCode"]').type("a");
        cy.get(".offer-request-card").eq(1).find(".validation-message").eq(3).should("have.text", "Zip code must contain 5 digits ");
        cy.get('input[formcontrolname="zipCode"]').clear().type("111111");
        cy.get(".offer-request-card").eq(1).find(".validation-message").eq(3).should("have.text", "Zip code must contain 5 digits ");
        cy.get('ng-select[formcontrolname="country"]').click()
        cy.get(".ng-dropdown-panel-items").find(".ng-option-label").contains("CA").click();
        cy.get('input[formcontrolname="zipCode"]').clear().type("12345");
        cy.get(".offer-request-card").eq(1).find(".validation-message").eq(4).should("have.text", "E.g. M6K 1V2 ");

    });

})