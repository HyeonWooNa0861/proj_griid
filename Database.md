users
------
id                  BIGINT PK
email               VARCHAR(255) UNIQUE NOT NULL
password_hash       VARCHAR(255) NOT NULL
gender              ENUM('Male','Female','Other') NULL
birth               DATE NULL
region              VARCHAR(100)
nickname            VARCHAR(50)
profile_image       VARCHAR(255)

status              ENUM('ACTIVE','SUSPENDED','WITHDRAWN') DEFAULT 'ACTIVE'
created_at          DATETIME
updated_at          DATETIME


products
--------
id                  BIGINT PK
seller_id           BIGINT FK -> users.id
title               VARCHAR(255) NOT NULL
category_id         BIGINT FK -> categories.id

start_bid           INT NOT NULL
quick_buy_bid       INT NULL
bid_unit            INT NOT NULL

current_bid         INT NOT NULL
auction_end_time    DATETIME NOT NULL

description         TEXT
status              ENUM('OPEN','ENDED','CANCELED') DEFAULT 'OPEN'

created_at          DATETIME
updated_at          DATETIME


product_images
--------------
id              BIGINT PK
product_id      BIGINT FK -> products.id
image_url       VARCHAR(255)
sort_order      INT
created_at      DATETIME


bids
----
id              BIGINT PK
product_id      BIGINT FK -> products.id
user_id         BIGINT FK -> users.id
bid_price       INT NOT NULL
created_at      DATETIME


categories
----------
id              BIGINT PK
parent_id       BIGINT NULL
name            VARCHAR(100)
created_at      DATETIME




orders
------
id              BIGINT PK
product_id      BIGINT FK -> products.id
buyer_id        BIGINT FK -> users.id
final_price     INT
order_type      ENUM('BID','QUICK_BUY')
status          ENUM('VERIFYING','PAID','CANCELED')

created_at      DATETIME
paid_at         DATETIME




payments
--------
id              BIGINT PK
order_id        BIGINT FK -> orders.id
payment_method  VARCHAR(50)
amount          INT
status          ENUM('READY','SUCCESS','FAIL')
pg_tid          VARCHAR(100)

created_at      DATETIME
