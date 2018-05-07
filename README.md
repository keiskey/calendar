# パラメーター管理
## location.search案
- d … 日付。Dateオブジェクトを生成できれば何でも可。（例：2018/05）
- p … ページサイズ。文字列かmmサイズで指定。（A3, 297x420）
```
let params = {
  d: Date.now(),
  p: "A3",
};
location.slice(1).split("&").forEach(p => {
  const [key, value] = p.split("=");
  params[key] = value;
});

const datetime = new Date(params.d);
```
## location.hash案
```
const hash = location.hash.slice(2);
const datetime = new Date(hash || Date.now());

window.addEventListener("hashchange", (event) => {
  location.reload();
});
```
