describe("Watch Later Page", () => {
        beforeAll(() => {
      // Sign up a new user
            cy.signupAndLogin();
        });
    
        it("displays user's watch later movies", () => {
        // Visit the Watch Later page
        cy.visit("/watchlater");
    
        // Assuming you have some movies in watchLater array,
        // you can check if at least one movie is displayed
        cy.get("li").should("exist");
    
        // You can also assert specific movie details if needed
        cy.get("li").first().within(() => {
            cy.get("h3").should("be.visible");
            cy.get("p").should("be.visible");
            // Add more assertions for other movie details
        });
        });
    
        it("displays 'No movies in watch later' message when no movies are present", () => {
        // Visit the Watch Later page
        cy.visit("/watch-later");
    
        // Assuming you have no movies in watchLater array
        cy.contains("No movies in watch later.").should("be.visible");
        });
});
