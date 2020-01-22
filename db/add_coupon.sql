insert into coupons (product, expiration_date, category_id, url)
values ($1, $2, $3, $4);

select * from coupons;