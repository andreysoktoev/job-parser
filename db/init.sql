\c postgres

drop table if exists
  jobs
cascade;

create table jobs (
  id int unique,
  added_at timestamp default now(),
  responses int,
  url text,
  title text,
  employer text,
  unique (employer, title)
);