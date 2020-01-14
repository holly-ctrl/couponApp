select * from users u
join password p on u.hash_id = p.hash_id
where email = $1;