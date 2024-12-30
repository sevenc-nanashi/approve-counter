# Approve Counter / マージキューのためのスコアベースのApprove数チェッカー

Approve Counterは、マージキューに使える、人やチームによって重みを付けられるApprove数チェッカーです。

## ユースケース

- レビュワーによってApprove数に重みを付けたい（上位レビュワーのApprove数は下位レビュワーのApprove2つ分とする、など）

## 使い方

以下のようなWorkflowを作成してください：

```yaml
on:
  pull_request_target:
    types: [auto_merge_enabled]
  merge_group:
    types: [checks_requested]

jobs:
  approve:
    runs-on: ubuntu-latest
    steps:
      - uses: sevenc-nanashi/approve-counter@v1
        with:
          # GitHubのトークン。
          # チームを指定する時に必要です。
          # OrgnizationのMember権限が必要です。
          token: ${{ secrets.OWNER_TOKEN }}

          # 失敗時の挙動。
          # fail: Workflowを失敗させる。（デフォルト）
          # none: 何もしない。独自の条件を作りたい時に使います。
          #       outputs.scoreにスコア、outputs.resultに結果（true/false）が入ります。
          on_fail: fail

          # マージに必要なスコア。
          # 0の場合は失敗しなくなります。
          required_score: 2

          # ユーザー/チームとポイントの関連付け。
          score_rules: |
            // チームの場合は#から始めてください。
            #maintainer: 2
            #reviewer: 1
            // ユーザーの場合は@から始めてください。
            @sevenc-nanashi: 2
            // それ以外の行は無視されます。
```

その後、RulesetのRequire status checks to passに`approve`を追加してください。

## 注意点

- Review when Readyボタンを押した人もApproveしたものとしてカウントされます。

## ライセンス

MIT Licenseで公開しています。
