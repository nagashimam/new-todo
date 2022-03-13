# サーバーに使う自宅のラズパイがcypressのシステム要件を満たさない
# apiには関係ないので、cypress以外をインストールする
packs_without_cypress=`cat package.json | grep -v "cypress"`
echo $packs_without_cypress > package.json

# 環境変数読み込みに必要なのでグローバルインストール
npm i dotenv -g

# GPGキーを更新
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 04EE7237B7D453EC 648ACFD622F3D138
echo 'deb http://httpredir.debian.org/debian buster-backports main contrib non-free' | sudo tee -a /etc/apt/sources.list.d/debian-backports.list
sudo apt-get update && sudo apt-get upgrade -y
sudo apt-get install libseccomp2 -t buster-backports

# .envファイルを作成する
read -p "DATABASE_URL: " DATABASE_URL
read -p "AUTH0_DOMAIN: " AUTH0_DOMAIN
read -p "AUTH0_AUDIENCE: " AUTH0_AUDIENCE
echo "DATABASE_URL="$DATABASE_URL >> .env
echo "AUTH0_DOMAIN="$AUTH0_DOMAIN >> .env
echo "AUTH0_AUDIENCE="$AUTH0_AUDIENCE >> .env
