import { fetch } from 'undici'
import { sql } from '../db/connector.js'
import { exceptions } from './exceptions.js'

(async () => {
  const PAGES = 5
  const url = new URL('https://api.hh.ru/vacancies')
  const params = new URLSearchParams({
    per_page: '100',
    period: '7',
    professional_role: '96',
    responses_count_enabled: true,
    search_field: 'name',
    text: `(node.js or nodejs or node) and not (${exceptions.join(' or ')})`,
    vacancy_search_order: 'publication_time',
  })
  let result = []

  console.clear()

  for (let i = 0; i < PAGES; i++) {
    params.set('page', i)
    url.search = params
    const res = await fetch(url)
    const json = await res.json()
    json.items.map(i => {
      if (i) result.push({
        id: i.id,
        responses: i.counters.responses,
        url: i.alternate_url,
        title: i.name,
        employer: i.employer.name,
      })
    })
  }

  const vacancies = await sql`
    insert into jobs ${sql(result)}
    on conflict do nothing
    returning added_at, employer, title, url, responses
  `

  vacancies.length > 0
    ? console.table(vacancies)
    : console.log('Новых вакансий нет\n')

  process.exit(0)
})()