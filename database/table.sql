create TABLE companies
(
  id SERIAL PRIMARY KEY,
  name VARCHAR(256) NOT NULL UNIQUE
);

create TABLE users
(
  id SERIAL PRIMARY KEY,
  login text NOT NULL UNIQUE,
  password text NOT NULL,
  full_name VARCHAR(256) NOT NULL,
  company_id INT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by INT DEFAULT NULL,
  last_updated_by INT DEFAULT NULL,
  role VARCHAR(32) NOT NULL,

  CONSTRAINT fk_company_id
  FOREIGN KEY(company_id) REFERENCES companies(id)
  ON DELETE CASCADE
);


create TABLE tasks
(
  id SERIAL PRIMARY KEY,
  title VARCHAR(256) NOT NULL,
  description text NOT NULL,
  parent_id INT DEFAULT NULL,
  company_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by INT NOT NULL,
  last_updated_by INT NOT NULL,
  day INT NOT NULL,

  CONSTRAINT fk_company_id
  FOREIGN KEY(company_id) REFERENCES companies(id)
  ON DELETE CASCADE
);

create TABLE user_tasks
(
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  task_id INT NOT NULL,
  start_at date NOT NULL,
  end_at date NOT NULL,
  started_date date DEFAULT NULL,
  ended_date date DEFAULT NULL,
  status VARCHAR(32) DEFAULT 'took',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by INT NOT NULL,
  last_updated_by INT NOT NULL,


  CONSTRAINT fk_user_id FOREIGN KEY (user_id)
  REFERENCES users(id)
  ON DELETE NO ACTION,

  CONSTRAINT fk_task_id FOREIGN KEY(task_id)
  REFERENCES tasks(id)
  ON DELETE NO ACTION
);