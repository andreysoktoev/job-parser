import { fetch } from 'undici'
import { sql } from '../db/connector.js'

(async () => {
  const PAGES = 5
  const url = new URL('https://api.hh.ru/vacancies')
  const params = new URLSearchParams({
    per_page: '100',
    period: '7',
    professional_role: '96',
    responses_count_enabled: true,
    search_field: 'name',
    text: '(node.js or nodejs or node) and not senior',
    vacancy_search_order: 'publication_time',
  })
  url.search = params
  let result = []

  for (let i = 0; i < PAGES; i++) {
    params.set('page', i)
    url.search = params
    const res = await fetch(url)
    const json = await res.json()
    json.items.map(i => {
      if (i) result.push({
        id: i.id,
        employer: i.employer.name,
        title: i.name,
        responses: i.counters.responses
      })
    })
  }

  await sql`insert into jobs ${sql(result)} on conflict do nothing`
  console.log('chotka')
})()