CREATE DATABASE todo_project;


CREATE TABLE todo(
    t_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);


CREATE OR REPLACE FUNCTION insert_todo(
    todo_description TEXT
)
RETURNS VOID
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO todo (description)
    VALUES (todo_description);
END;
$$;


CREATE OR REPLACE function get_all_todos()
returns TABLE (
    id INTEGER,
    description VARCHAR(255)
)
LANGUAGE plpgsql
AS $$
BEGIN   
    RETURN QUERY SELECT * FROM todo;
END;
$$;


CREATE OR REPLACE FUNCTION get_todo_by_id(t_id INTEGER)
RETURNS TABLE (
    id INTEGER,
    description VARCHAR(255)
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY SELECT * FROM todo WHERE id = t_id;
END;
$$;