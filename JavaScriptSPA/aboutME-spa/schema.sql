DROP TABLE IF EXISTS persons;

CREATE TABLE persons (
  id INTEGER PRIMARY KEY,
  name TEXT,
  hometown TEXT,
  sign TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER users BEFORE UPDATE ON persons BEGIN
  UPDATE pets SET updated_at= CURRENT_TIMESTAMP WHERE ID = new.id;
END;
