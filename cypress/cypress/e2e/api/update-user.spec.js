
describe('API-PATCH-003 - Update User ', () => {
  const baseUrl = 'https://reqres.in'

  it('Verify partial update of user job returns 200 and updated data', () => {
    const pathId = 2
    const body = { job: 'zion resident' }

    cy.request({
      method: 'PATCH',
      url: `${baseUrl}/api/users/${pathId}`,
      headers: { 'x-api-key': 'reqres-free-v1' },
      body
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('job', 'zion resident')
      expect(response.body).to.have.property('updatedAt')
    })
  })
})
