## What are the app objectives?

- show current daily USD price of top 10 crypto.
- Log in to see your tracked coins, amount, value in USDs.

## What we need?

- API to GET daily coin value and coinmarketcap
  - store it in coin_value table in mySQL
- API routes to local DB:
  - user_table
  - coin_table
  - mycoins_table
- swagger to implement REST_APIs with a GUI

## DB squeleton

- name: my_crypto_db
  - user_table
    - id INT PRIMARY KEY
    - username VARCHAR(30)
    - first_name VARCHAR(30)
    - last_name VARCHAR(30)
    - email VARCHAR(120)
    - usr_pwd CHAR(56)
  - wallet_table
    - id INT PRIMARY KEY
    - owner FOREING KEY username
    - mycoins:
      - coin
      - value
      - amount
  - coin_import
    - id
    - coin_name
    - coin_tag
    - coin_mc
    - coin_vol
    - coin_chg24
    - coin_chg7d
