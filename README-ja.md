# CuRate
## セットアップ手順
まず、このリポジトリをクローンします。
```sh
git clone https://github.com/Rerurate514/CuRate
```

そして、docker compose upするだけ！
```sh
docker compose up -d
```

## 設定
初回実行で、生成される.envには以下のような変数がセットされます。
```env
# windowsなら
DRIVE_PATH=C:\

# linux/macなら
DRIVE_PATH=/
```

これは実際にファイルが保存されるパスを指定します。
何も設定しない場合にはOSのプロジェクトルートが書き込まれ、そこにファイルとディレクトリが保存されていきます。
