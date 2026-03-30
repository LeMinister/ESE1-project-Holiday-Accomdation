describe("Holiday App", () => {

  it("loads homepage", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Properties");
  });

  it("shows login page", () => {
    cy.visit("http://localhost:3000/login");
    cy.contains("Login");
  });

  it("can attempt login", () => {
    cy.visit("http://localhost:3000/login");

    cy.get("input[name=username]").type("test");
    cy.get("input[name=password]").type("test123");
    cy.get("button").click();
  });

  it("loads properties from API", () => {
    cy.intercept("GET", "/api/properties/", {
      statusCode: 200,
      body: [
        { id: 1, name: "Villa", price_per_night: 200 }
      ]
    });

    cy.visit("http://localhost:3000");
    cy.contains("Villa");
  });

});