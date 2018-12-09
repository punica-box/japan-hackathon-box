###

```
Paste to SmartX & deploy
最初に Initialize()を読んでください

- dealer登録
   - RegisterAsDealer
- 賭場作成(引数は全部string
   - CreateRoom(addr, dealer_rate, minbet, gamble_rate, deposit_ong)
- 最新の賭場ID取得(READONLY) = PreExec or PreRunで読んでください
   - GetLatestRoomID()
   - 最大の賭場IDが返ってきます
   - フロントで最大の賭場IDまでアレ連番の配列作ってアレしてください...
- 賭場の詳細情報取得(READONLY) = PreExec or PreRunで読んでください
   - GetRoomByID(room_id)
   こんな感じで返るのでフロントでパーズしてください
   dealer_rate,10:minbet,10:gamble_rate,10,deposit_ong:1000 
```

SoloChainはOntologyブロックチェーンのバージョンが古いので、
動かない関数があり、該当する部分をコメントアウトしてます。