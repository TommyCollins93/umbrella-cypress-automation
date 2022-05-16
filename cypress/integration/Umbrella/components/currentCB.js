module.exports = currentCB()
{
    cy.get(".cb-select").find(".text").contains("other").click();
    cy.get(".other-cb").click();
    cy.get(".ng-dropdown-panel").find(".ng-option").contains("INTERTEK").click();
    cy.get("#current-certification-last-audit-event-radio-group").find(".text").contains("Recertification").click();
}