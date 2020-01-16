insert into coupons (product, expiration_date, category_id)
values ($1, $2, $3);

select * from coupons;