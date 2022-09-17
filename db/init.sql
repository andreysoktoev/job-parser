\c postgres

drop table if exists
  jobs
cascade;

create table jobs (
  id int unique,
  employer text,
  title text,
  responses int,
  added_at timestamp default now(),
  unique (employer, title)
);