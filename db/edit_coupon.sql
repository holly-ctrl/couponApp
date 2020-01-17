update coupons
set product = $1,
    expiration_date = $2
where
    id= $3;

select * from coupons;