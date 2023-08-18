import { MemoryRouter, Route, Routes} from "react-router"
import UserProfile from "./UserProfile"
import React from "react"

describe("User information page", () => {

	it("calls the users/userID endpoint and lists the users info", () => {
    window.localStorage.setItem("token", "fakeToken")
    const userId = 1;

    cy.intercept('GET', `/users/${userId}`, { email: "testEmail", name: "testUserName", subscriptions: 'Netflix', genres: 'Actin', token: 'fakeToken' }).as('getUserInfo');

    cy.mount(
        <MemoryRouter initialEntries={[`/users/${userId}`]}>  
            <Routes>
            <Route path="/users/:id" element={<UserProfile />} />
            </Routes>
        </MemoryRouter>
    );
    
    cy.wait('@getUserInfo')

    cy.get('[data-cy=email]').should("contain.text", "Email: testEmail");
    //cy.get('[data-cy=name]').should('contain.text', "name: testUserName");
    //cy.get('[data-cy=subscriptins]').should('contain.text', "name: testUserName");
    //cy.get('[data-cy=name]').should('contain.text', "name: testUserName");

	})

})