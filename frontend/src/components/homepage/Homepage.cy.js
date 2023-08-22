import Homepage from './Homepage' 
// import { MemoryRouter, Route, Routes } from 'react-router'

// // const navigate = () => {}

describe("Homepage", () => {
    it('calls the /homepage and we see heading and search bar', () => {
        cy.mount(<Homepage/>)
        cy.get('#heading').should('contain.text', "Search for a movie or tv show title")  
    })

    it("calls the /homepage/bytitle/title and lists the results", () => {
        cy.intercept('GET', '/homepage/bytitle/movie', {
                statusCode: 200,
                // body: { _id: "asdfg",
                //     title: "movie",
                //     release_year: 2000,
                //     synopsis: "synopsis",
                //     rating: 5,
                //     links: "links"
                // }   
            })
            .as("getHomepage")

        cy.mount(<Homepage/>)

        cy.get('#heading').should('contain.text', "Search for a movie or tv show title")  

        cy.get('input[type="text"]').type('movie');
        cy.get('button').click();

        cy.wait("@getHomepage")

        cy.get('#title').should('contain.text', "movie");   
    })
    
    // it("calls the /homepage/bytitle/title and returns error if movie not found", () => {
    //     cy.intercept('GET', '/homepage/bytitle/movie', {
    //             statusCode: 404,
    //             body: { error: "Title not found"
    //             }   
    //         })
    //         .as("getHomepage")

    //     cy.mount(<Homepage/>)

    //     cy.get('#heading').should('contain.text', "Search for a movie or tv show title")  

    //     cy.get('input[type="text"]').type('movie');
    //     cy.get('button').click();

    //     cy.wait("@getHomepage").then( interception => {
    //         expect(interception.response.body.error).to.eq("Title not found") 
    //     })
    // })
})
