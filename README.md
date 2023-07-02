# component-modal-xuanlv

弹窗组件

## 开始

```bash
# 安装
pnpm i

# 编译
pnpm build

# 启动
pnpm dev
```

## 发布流程

```bash
# 交互式填写变更集，然后选择要更改发布的包
pnpm changeset

# 自动生成发布包的版本
pnpm changeset version

# 仔细检查版本是否正确，确认后 git 提交

# 发布
pnpm release
```

## 给模块单独安装依赖

`pnpm` 提供了 `--filter` 参数，可以用来对特定的 `package` 进行某些操作。 因此，如果想给 `pkg1` 安装一个依赖包 `pkg2`，可以进行如下操作：

```bash
pnpm add pkg2 --filter pkg1
```

## 模块之间的相互依赖

基于 `pnpm` 提供的 `workspace:`，可以方便在 `packages` 内部进行互相引用。比如在 `pkg1` 中引用 `pkg2`：

```bash
pnpm install pkg2 -r --filter pkg1
```
