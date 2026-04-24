describe('template shell', () => {
  it('shows the starter headline', () => {
    cy.visit('/');
    cy.contains('Frontend + backend + IA listos para arrancar');
  });
});
