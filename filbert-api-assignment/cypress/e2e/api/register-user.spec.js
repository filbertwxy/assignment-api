
describe('API-POST-002 - User Registration (Success)', () => {
  const baseUrl = 'https://reqres.in'

  it('Verify successful user registration returns a token', () => {
    const body = {
      email: 'eve.holt@reqres.in',
      password: 'pistol'
    }

    cy.request({
      method: 'POST',
      url: `${baseUrl}/api/register`,
      headers: { 'x-api-key': 'reqres-free-v1' },
      body
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('token')
      expect(response.body.token).to.be.a('string').and.not.be.empty
    })
  })
})
