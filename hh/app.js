import { fetch } from 'undici'

async function run(page) {
  // const url = 'https://api.hh.ru/vacancies?text=node+and+not+senior&search_field=name&schedule=remote&experience=noExperience&experience=between1And3&period=30&vacancy_search_order=publication_time&responses_count_enabled=true'
  // const url = 'https://api.hh.ru/vacancies?specialization=1.221&text=junior&search_field=name&period=30&vacancy_search_order=publication_time&responses_count_enabled=true&per_page=100&page=7'
  const url = `https://api.hh.ru/vacancies?professional_role=96&text=node.js+or+nodejs+or+node&search_field=name&period=30&per_page=100&page=${page}`
  const res = await fetch(url)
  const json = await res.json()
  // const vacancies = json.items.map(i => ({
  //   employer: i.employer.name,
  //   title: i.name,
  //   salary: i.salary,
  //   requirements: i.snippet.requirement,
  //   url: i.alternate_url,
  //   responses: i.counters.responses
  // }))
  const vacancies = json.items.map(i => i.name)
  console.log(vacancies)
  // console.log(vacancies.length)
}

for (let i = 0; i < 4; i++) run(i)