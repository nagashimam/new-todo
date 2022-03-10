# サーバーに使う自宅のラズパイがcypressのシステム要件を満たさない
# apiには関係ないので、cypress以外をインストールする
packs_without_cypress=`cat package.json | grep -v "cypress"`
echo $packs_without_cypress > package.json
npm ci
git restore package.json package-lock.json

# .envファイルを作成する
read -p "ADMINER_PORT: " ADMINER_PORT
read -p "MYSQL_PORT: " MYSQL_PORT
read -p "MYSQL_ROOT_PASSWORD: " MYSQL_ROOT_PASSWORD
read -p "DATABASE_URL: " DATABASE_URL
read -p "AUTH0_DOMAIN: " AUTH0_DOMAIN
read -p "AUTH0_AUDIENCE: " AUTH0_AUDIENCE
echo "ADMINER_PORT="$ADMINER_PORT > .env
echo "MYSQL_PORT="$MYSQL_PORT >> .env
echo "MYSQL_ROOT_PASSWORD="$MYSQL_ROOT_PASSWORD >> .env
echo "DATABASE_URL="$DATABASE_URL >> .env
echo "AUTH0_DOMAIN="$AUTH0_DOMAIN >> .env
echo "AUTH0_AUDIENCE="$AUTH0_AUDIENCE >> .env
