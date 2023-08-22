describe("User Profile", () => {
    const userName = "User";
    const userEmail = "user@email.com";
    const userPassword = "12345678";

    it("displays user email on profile page after signup, login, and navigation", () => {
        cy.visit("/signup");
        cy.get("#name").type(userName);
        cy.get("#email").type(userEmail);
        cy.get("#password").type(userPassword);
        cy.get("#signup").click();

        cy.visit("/login");
        cy.get("#email").type(userEmail);
        cy.get("#password").type(userPassword);
        cy.get("#submit").click();

        cy.url().should("include", "/homepage");

        cy.contains("Your Profile").click();

        cy.get(".email[data-cy=email]").should("contain", userEmail);
    });
});