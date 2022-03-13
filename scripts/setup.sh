# 環境変数読み込みに必要なのでグローバルインストール
npm i dotenv -g

# .envファイルを作成する
read -p "DATABASE_URL: " DATABASE_URL
read -p "AUTH0_DOMAIN: " AUTH0_DOMAIN
read -p "AUTH0_AUDIENCE: " AUTH0_AUDIENCE
echo "DATABASE_URL="$DATABASE_URL >> .env
echo "AUTH0_DOMAIN="$AUTH0_DOMAIN >> .env
echo "AUTH0_AUDIENCE="$AUTH0_AUDIENCE >> .env
