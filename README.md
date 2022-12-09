# auto-name-package-json

This is a simple script that will automatically add the property `name` to every `package.json` recursively in the current directory.

## ⚠ Warning ⚠

This script will overwrite all `package.json` files in the current directory and all subdirectories that don't have the `name` property.

## How to use it

Just run

```sh
npx zx https://raw.githubusercontent.com/BrunoS3D/auto-name-package-json/main/index.mjs
```
