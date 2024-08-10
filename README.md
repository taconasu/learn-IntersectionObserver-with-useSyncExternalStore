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

## やりたいこと

今回は以下のような動作を目指す

- 子コンポーネントがviewportに入った時に処理を実行する
  - 子コンポーネントがviewportから外れた時には何もしない
- `IntersectionObserver#observe`のタイミングでのみ関数を評価する
  - 初回レンダリング時などにgetSnapshotが実行されないようにする
  - ストアを参照する用途のuseSyncExternalStoreの本来の使い方ではなさそうだが...

## 構成

今回のサンプル実装では2つのコンポーネントのみ利用する

### ページ（親）コンポーネント

[Page](https://github.com/taconasu/learn-IntersectionObserver-with-useSyncExternalStore/blob/main/src/app/page.tsx)

Boolean型の状態をもつローカルステートと、子コンポーネントの交差時に実行するハンドラを定義した親コンポーネント

### 子コンポーネント

[TestContent](https://github.com/taconasu/learn-IntersectionObserver-with-useSyncExternalStore/blob/main/src/components/TestContent.tsx)

`useSyncExternalStore`を用いて`IntersectionObserver`の監視処理を行っているコンポーネント  
このコンポーネントがviewportに入った時に親コンポーネントから受け渡された交差時に実行するためのハンドラが処理される

## 実装

TestContentで`useSyncExternalStore`を実行し、サブスクライブ関数とスナップショット取得関数を引数に渡す  
それぞれは以下のような実装をする

- subscribe
  - IntersectionObserverインスタンスを作成し、targetとなるDOMを監視する
  - 監視している要素がviewportに入ったらsubscribe関数の引数として受け取るcallbackを実行する
    - これによってgetSnapshotが評価される
  - callback実行時、viewportに入ったことを評価するための`isIntersecting`フラグ（ref）を **true** にする
- getSnapshot
  - viewportに入ったことを評価するための`isIntersecting`フラグ（ref）が **true** の場合のみ処理を実行する
    - こうすることで、初回レンダリング時などで処理が実行されないようにしている
  - 親コンポーネントから渡されたonIntersecting関数を実行する
  - 実行が完了したら`isIntersecting`フラグ（ref）を **false** にする
    - 次回以降の交差時に処理を実行できるようにするため
