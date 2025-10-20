
describe('API-GET-REQRES - List Users (page=2)', () => {
	const baseUrl = 'https://reqres.in'

	it('returns 200 and basic pagination fields', () => {
			cy.request({
				method: 'GET',
				url: `${baseUrl}/api/users`,
				qs: { page: 2 },
				headers: { 'x-api-key': 'reqres-free-v1' }
			}).then((response) => {
			expect(response.status).to.eq(200)

			// Basic sanity checks
			expect(response.body).to.have.property('page', 2)
			expect(response.body).to.have.property('per_page')
			expect(response.body).to.have.property('total')
			expect(response.body).to.have.property('total_pages')
			expect(response.body).to.have.property('data').and.to.be.an('array')
		})
	})
})

