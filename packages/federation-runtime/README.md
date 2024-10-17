# `@poc-css/federation-runtime`

This package is a wrapper on top of Squide Firefly that offers a pre-configured and pre-typed API for the Workleap platform.

For example, instead of importing `ModuleRegisterFunction` from `@squide/firefly`:

```
import type { ModuleRegisterFunction } from `@squide/firefly`;

export const register: ModuleRegisterFunction = async runtime => {
}
```

A Workleap platform project would import `ModuleRegisterFunction` from `@poc-css/federation-runtime`:

```
import type { ModuleRegisterFunction } from `@poc-css/federation-runtime`;

export const register: ModuleRegisterFunction = async runtime => {
}
```
