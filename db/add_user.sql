insert into users (name, email, hash_id)
values (${name}, ${email}, ${hash_id})
returning *; 