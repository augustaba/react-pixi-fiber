# ReactPixiFiber – React Fiber renderer for PixiJS

> 由于业务上依赖淘宝提供的pixi版本 淘宝提供的pixi版本依赖pixi4.8.8 所以将网上的react-pixi-fiber进行简单改造，使得支持淘宝小程序
### 安装

```js
$ npm install @augustaba/react-pixi-fiber
```

### 在web上使用



### 打包到淘宝小程序上

在webpack中使用
```js
resolve: {
  alias: {
    '@augustaba/react-pixi-fiber$': '@augustaba/react-pixi-fiber/react-pixi-mini'
  }
},
```