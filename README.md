# Learning IntersectionObserver with useSyncExternalStore

- [useSyncExternalStore - React](https://ja.react.dev/reference/react/useSyncExternalStore)
- [IntersectionObserver - Web API | MDN](https://developer.mozilla.org/ja/docs/Web/API/IntersectionObserver)

## What is IntersectionObserver ?

要素とviewportの交差状態の変化を非同期に監視するためのWeb API  
要素が画面に入った場合（もしくは外れた場合）に何か処理を行いたい場合に利用する

利用例

- 要素内の情報の遅延処理（画面に入ってからリクエスト処理を行う）
  - SNSのタイムラインの無限スクロールなど
- 要素が画面内に入った場合のフェードインアニメーションの付与

## What is useSyncExternalStore

React外部のストアをサブスクライブするためのフック  
Web APIのサブスクライブ（addEventListener）なども想定して実装されており、React外部の状態とReact内部のステートなどの状態をハイブリッドに扱える

本来はストアを取り回す用途であり、IntersectionObserverのように交差処理が実行されるタイミングでそのコンポーネントの最新のステートの情報を参照する用途で使うのは若干エッジケースな使い方ではありそうだが、使えそうだったので今回はこれで利用してみる

## vs useEffect

交差時に実行するハンドラがstateの更新を伴わないような場合はuseEffectとuseSyncExternalStoreの間に大きな差はない🐈‍⬛  
重要な差として、useEffectは「ハンドラの再評価のたびにIntersectionObserverのインスタンスを生成しなおす」のに対し、  
useSyncExternalStoreは「ハンドラの更新では監視状況に変化が生じない（インスタンスの再生成を伴わない）」といった違いがある

useEffectによる監視時に問題となるケースは、**ハンドラ内の処理によってハンドラの再評価が発生する**パターンであり、この場合はuseEffectパターンの要素がviewportに入った時に更新→再評価→更新...という感じで交差中に無限ループが発生してしまう

## Setup

```sh
# setup corepack
corepack enable
corepack prepare --activate

# install packages
pnpm i
```

## development

```sh
pnpm dev
```
