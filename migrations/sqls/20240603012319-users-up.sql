CREATE TABLE users (
  id              SERIAL PRIMARY KEY,
  username        VARCHAR(500) NOT NULL,
  firstname       VARCHAR(250) NOT NULL,
  lastname        VARCHAR(250) NOT NULL,
  password        VARCHAR(200) NOT NULL,
  created_at timestamp not null default now(),
  updated_at timestamp not null default now()
);