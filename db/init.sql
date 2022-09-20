\c postgres

drop table if exists
  jobs
cascade;

create table jobs (
  id int unique,
  added_at timestamp default now(),
  employer text,
  title text,
  url text,
  responses int,
  unique (employer, title)
);