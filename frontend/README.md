# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

```
hobby
├─ .eslintrc.cjs
├─ .git
│  ├─ COMMIT_EDITMSG
│  ├─ config
│  ├─ description
│  ├─ FETCH_HEAD
│  ├─ HEAD
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  ├─ push-to-checkout.sample
│  │  └─ update.sample
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ objects
│  │  ├─ 02
│  │  │  └─ 6cfd9aa1d1d561265f2a0b5f98129a11592367
│  │  ├─ 03
│  │  │  ├─ 724f6eb50f75ee5d5c794cd9b6e4f313eb2302
│  │  │  └─ a709ec544b4c53b6beea7f951a9d91efa17947
│  │  ├─ 0d
│  │  │  ├─ 312892d23a73d8ef998281a3d670dddb0b962b
│  │  │  ├─ 685d49a395ef1bf33cf836d1d9a795117b51cf
│  │  │  └─ 6babeddbdbc9d9ac5bd4d57004229d22dbd864
│  │  ├─ 0e
│  │  │  └─ 72d0f7862cc9376af8adf2ca06a7c9540f654b
│  │  ├─ 11
│  │  │  ├─ 62e19363bc0d220baafe83a4f039eee4d354ba
│  │  │  └─ f02fe2a0061d6e6e1f271b21da95423b448b32
│  │  ├─ 12
│  │  │  └─ c14c9a6e4863f9bb78da70c9bc0d6ab86e9f99
│  │  ├─ 16
│  │  │  └─ ed55a127d7435634a756b2e161fcfae3e6ed3f
│  │  ├─ 19
│  │  │  └─ 4bfc58a9edb9b746bc47b7add8a36313d9ea25
│  │  ├─ 1b
│  │  │  └─ 8acce1e24b0aa384b4709fd3bed68e49c622d5
│  │  ├─ 1c
│  │  │  └─ 8ee4b752892ba68f6b106c0fdb4f1c9493be86
│  │  ├─ 1e
│  │  │  └─ e2fdb8fc04263f85627a0add02a1661e4ce783
│  │  ├─ 21
│  │  │  └─ 30656d06c239f759840bfc0ff5c886ce7c6caf
│  │  ├─ 22
│  │  │  └─ 63b18cce40b33433d86af8949307d5ac52c85c
│  │  ├─ 23
│  │  │  └─ 51689467a011cdae9f01f4109025fe5db4f9f4
│  │  ├─ 26
│  │  │  ├─ 63c16bb1cdd601a33449b1ebbb0d049cccf7be
│  │  │  ├─ a8dfa07786c5937d84aa79e2c36e2659988659
│  │  │  └─ b84dcaa801244e3e31c2227f5023c86e7f0e22
│  │  ├─ 29
│  │  │  └─ 5d52a1d1cc4eaa1d526bbebc4fe4f4b789125b
│  │  ├─ 2a
│  │  │  ├─ 03d5dc0c357b7d0aa090a08af8544648ca8106
│  │  │  └─ ec60d836bd4ea3f27c9938799f198f03aa0f14
│  │  ├─ 30
│  │  │  └─ a131ed77ab9e3853ce21ff411522e2cb41786a
│  │  ├─ 31
│  │  │  └─ 0be38ae4ae4ee75367a292562b2ac14178f939
│  │  ├─ 34
│  │  │  ├─ 5e890be20573ee94fc8aa0a101bb9b45288447
│  │  │  └─ 7bea44ea46588c3dd8e33f43e6e0c1a8ed368d
│  │  ├─ 35
│  │  │  └─ 8e859ea02c065e258b712bfaab57236d91a0f0
│  │  ├─ 3a
│  │  │  └─ fdd6e38438be7612befbd4b656af7bed27a31a
│  │  ├─ 3d
│  │  │  ├─ 7150da80e43e3650342aa4758fa8b74e95d6d6
│  │  │  └─ a39b1422c9c8abf9090745282b16b4ad4ef48c
│  │  ├─ 3e
│  │  │  └─ 4134117893287e006ecb5675dba8e92b4e1372
│  │  ├─ 44
│  │  │  └─ c853049872644f9396a7d6fdb9b8f908f40146
│  │  ├─ 45
│  │  │  ├─ a183c42a875d260d8792149f5a65b6c2662cdd
│  │  │  └─ a7087e65bb3dcfc36c26802d54c86a3e8b0a4f
│  │  ├─ 4a
│  │  │  └─ 917414812fcd56dba0fdb47785d4fb8b93ee4a
│  │  ├─ 4e
│  │  │  └─ 3b0f1e8338bdda2b000ec265f9ad85cfd15d2f
│  │  ├─ 4f
│  │  │  ├─ 4f2d58c2634aed0ae8c93a735978d148fcb11b
│  │  │  ├─ 778021c6e616a831a33813856b3ed81e817b41
│  │  │  └─ 99fd70f87491281b452baee97108d045434948
│  │  ├─ 51
│  │  │  └─ b43ff2b4d3984ab0aa67aa0ee320feab4858f9
│  │  ├─ 52
│  │  │  ├─ 095f262bf4b2542a05fc4eb0cbce5c4bef5b79
│  │  │  └─ ccd82fa19c608b7fca2ec6dfc5fbc793b89247
│  │  ├─ 55
│  │  │  ├─ 3e2527fe378b0a057ca40d3e83ac20bb829c79
│  │  │  └─ 7b37c44d5cb352ff331f90e7fba0189cdfa65e
│  │  ├─ 5a
│  │  │  └─ 33944a9b41b59a9cf06ee4bb5586c77510f06b
│  │  ├─ 5e
│  │  │  └─ dcf623d0ca16c8f0df6513634fc6e67d011c3d
│  │  ├─ 5f
│  │  │  ├─ 2171e74e409161e51a80bd995f8f3ded420f1c
│  │  │  └─ 2eb2f9620fc51f471f980af8b12aff3409ef3a
│  │  ├─ 61
│  │  │  └─ 19ad9a8faaa5073a454f67b50fb98a25972fd2
│  │  ├─ 66
│  │  │  └─ ec6ec5c2da8bb606d1fa8b99722f216aa2a000
│  │  ├─ 68
│  │  │  └─ 45de33f4cef6cdf5a9ca3159d9399844379c7d
│  │  ├─ 6c
│  │  │  └─ 87de9bb3358469122cc991d5cf578927246184
│  │  ├─ 6f
│  │  │  └─ 420b9977489db1d6a5e28d9338246c5ee3d728
│  │  ├─ 72
│  │  │  └─ 7963eb7f3ce51cbf5e03bc82f06ad6c8f609c6
│  │  ├─ 7a
│  │  │  └─ d70a4066e75f500e1760703d0a482752745f70
│  │  ├─ 7b
│  │  │  └─ de18dd65bce6b0720af76220a822b90336905c
│  │  ├─ 7e
│  │  │  └─ 5d4d25171892b371926bae3adb4bb308f6c7f8
│  │  ├─ 81
│  │  │  └─ 817c2211386066b4e1d81741fe2d36a5b49cbd
│  │  ├─ 83
│  │  │  └─ edd925b918ce8bf4cd7da7d029cf60c7f30aab
│  │  ├─ 87
│  │  │  └─ 1d39a34fb47a0b440f30ad2666bb6e59d83376
│  │  ├─ 88
│  │  │  ├─ 52cfe40078a06c210863942a3f04b5ef09b3f0
│  │  │  └─ ed8015488859caec74d702342f25b7942b1f8c
│  │  ├─ 8b
│  │  │  ├─ 1e451c0762c8b80996bc6edd21f5cb0ef77cce
│  │  │  └─ 375006f4fc2c65d03533bd86513f616a1d1443
│  │  ├─ 91
│  │  │  └─ 68d92b0b8d0e665f55b11a826fd4de5984828d
│  │  ├─ 94
│  │  │  └─ c0b2fc152a086447a04f62793957235d2475be
│  │  ├─ 95
│  │  │  └─ a396dbbc819837e148193bf9a8763bdaddea8f
│  │  ├─ 9c
│  │  │  ├─ 271dc7cf174ce70ef5bf6c4cadc01a983ca604
│  │  │  └─ 2d225055c86c475082a2e407e5ec2309ad9a7d
│  │  ├─ a0
│  │  │  └─ 55c7f6af7406aa12aaa789a1063e63467ad558
│  │  ├─ a1
│  │  │  └─ 73e89ac8d168a0e0e677b3354d761bfb884a2f
│  │  ├─ a3
│  │  │  ├─ 9d5bf9f85c732e463d5c7ec1317c10eab15d07
│  │  │  └─ f62cf7981e6b28904050ed7a935e676ba2d261
│  │  ├─ a5
│  │  │  └─ 47bf36d8d11a4f89c59c144f24795749086dd1
│  │  ├─ a8
│  │  │  ├─ a9f24d01a7cdcd795f6341ba9e304aac80fd4d
│  │  │  └─ bfa24ed6e5440d9df7090f87989384a2989a80
│  │  ├─ aa
│  │  │  └─ 501f28f06c5e7a2e70d48b57c327a929777cc2
│  │  ├─ ac
│  │  │  ├─ 434d2a4fe71ea6abefca63ce2e9e935251a863
│  │  │  └─ 776982e8868900062022b28b3e0fb08c7eb531
│  │  ├─ ae
│  │  │  └─ 220f8a3bf7205b182cad782af7610fe36a4e19
│  │  ├─ af
│  │  │  ├─ e48ac750194a747f5665300d14049f72011a33
│  │  │  └─ f2b1fbc1ff13c49096951bd6f70f4b50dbaeee
│  │  ├─ b1
│  │  │  └─ 41e3a19d2df08e0849657c0b5eac262d7ac8c2
│  │  ├─ b2
│  │  │  └─ 47c1f4d1f63b5b14eddb6dc9e6794bacc1a750
│  │  ├─ b3
│  │  │  └─ 89e3b5257cc8a15a622270bd133359b95f0920
│  │  ├─ b9
│  │  │  └─ d355df2a5956b526c004531b7b0ffe412461e0
│  │  ├─ bd
│  │  │  ├─ 38af101dbc2e9fc5d767d31297f465b8d2a97a
│  │  │  └─ 995f46d0d2e678543e283caf0c988b5e336c29
│  │  ├─ c4
│  │  │  ├─ d8ff404f2e38661acab9f591b20c039b7bfe79
│  │  │  └─ de0e6fc2d7158a49ac4087e5e212f707e5a9a0
│  │  ├─ c5
│  │  │  ├─ 4c947d7bb1c15c7ba49402ecc73db702905874
│  │  │  └─ dc13895cf3bc67df4581b99edbf4c37514ac60
│  │  ├─ c8
│  │  │  └─ e7fa2ffb3e3a284bfc636ccb89a59375b4b9cb
│  │  ├─ c9
│  │  │  └─ 992bc8d3f45eac568e0fdfabb9fe7a857c7b9a
│  │  ├─ ce
│  │  │  └─ 289b16098e2a98cdda3f128071f5caf1e0ae65
│  │  ├─ cf
│  │  │  └─ 19af67f7ad29261b3a73cbb8240d1fc5d36ea1
│  │  ├─ d0
│  │  │  └─ 07fcd0235541264536fa1b7e631a12e18666f4
│  │  ├─ d4
│  │  │  └─ caee5f93b27416e9c3d406cca8ceb1b0cf32dc
│  │  ├─ d6
│  │  │  └─ c953795300e4256c76542d6bb0fe06f08b5ad6
│  │  ├─ d7
│  │  │  ├─ 0716854e33353461654c9d5fd4d362906045ad
│  │  │  ├─ 39292ae0143669e21b30df04a74b5baf985175
│  │  │  └─ 793a32390dfc28281c1c32957403d4cbc3e1fd
│  │  ├─ da
│  │  │  ├─ 92d5e6b150fdd4d3ab44a1e3db007a38bf662e
│  │  │  └─ ab18c2f497cda6afb6073c04d2ba406fdb1f47
│  │  ├─ db
│  │  │  ├─ 6e52c0283aa69dcd2a8734212fab18861baa9e
│  │  │  └─ 7517688d9111eb90fd364352609c87a5cf78c5
│  │  ├─ df
│  │  │  └─ 3dcbb799975a98eb5fddd88032b2f3e4be4a1b
│  │  ├─ e0
│  │  │  └─ d1390955e1dea31fa69119bbce246128e3cd10
│  │  ├─ e2
│  │  │  └─ d1a9855c73b64a57525ef43f5485db11645999
│  │  ├─ e4
│  │  │  └─ b78eae12304a075fa19675c4047061d6ab920d
│  │  ├─ e7
│  │  │  └─ b8dfb1b2a60bd50538bec9f876511b9cac21e3
│  │  ├─ e9
│  │  │  └─ 1f8912c3893e2c580ab5aed9f16792379cf259
│  │  ├─ ea
│  │  │  └─ 9d0cd8255683d84f125948115daf1de0f06b1f
│  │  ├─ ee
│  │  │  └─ 8e39178bf8d6ed22d30f3f00c50019e17cbf22
│  │  ├─ ef
│  │  │  ├─ 1b70513602f9962297617ee6c8f09a237b0af7
│  │  │  └─ ff62be4035bc685a170e4c51f3f4460cad4a70
│  │  ├─ f1
│  │  │  └─ cf2ecb3f8891fe0aab7aabc01d9f24e74dca26
│  │  ├─ f3
│  │  │  ├─ 448b8cde49136a378388e5e1827e42d86ad687
│  │  │  └─ d7f078b62818d1431e2be55964b9b7518ac061
│  │  ├─ f4
│  │  │  └─ 2206ddd04bb1f0b4bd217e1e4c4631287fb3c0
│  │  ├─ f6
│  │  │  └─ 7d70b51f83c80e82803f4abab161a5f56740a2
│  │  ├─ f7
│  │  │  └─ 6b39f535a6d3722b50968e7b079fa0a24200ba
│  │  ├─ info
│  │  └─ pack
│  ├─ ORIG_HEAD
│  └─ refs
│     ├─ heads
│     │  └─ main
│     ├─ remotes
│     │  └─ origin
│     │     └─ main
│     └─ tags
├─ .gitignore
├─ backend
│  ├─ .editorconfig
│  ├─ .eslintrc.json
│  ├─ .gitignore
│  ├─ .prettierrc.js
│  ├─ bootstrap.js
│  ├─ jest.config.js
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ README.md
│  ├─ README.zh-CN.md
│  ├─ src
│  │  ├─ config
│  │  │  ├─ config.default.ts
│  │  │  └─ config.unittest.ts
│  │  ├─ configuration.ts
│  │  ├─ controller
│  │  │  ├─ api.controller.ts
│  │  │  └─ home.controller.ts
│  │  ├─ filter
│  │  │  ├─ default.filter.ts
│  │  │  └─ notfound.filter.ts
│  │  ├─ interface.ts
│  │  ├─ middleware
│  │  │  └─ report.middleware.ts
│  │  └─ service
│  │     └─ user.service.ts
│  ├─ test
│  │  └─ controller
│  │     ├─ api.test.ts
│  │     └─ home.test.ts
│  └─ tsconfig.json
├─ image
│  └─ white.jpg
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  └─ vite.svg
├─ README.md
├─ src
│  ├─ App.css
│  ├─ App.tsx
│  ├─ assets
│  │  └─ react.svg
│  ├─ index.css
│  ├─ logic
│  │  ├─ logic.css
│  │  ├─ logic.html
│  │  ├─ logic.tsx
│  │  └─ logic_app.tsx
│  ├─ main.tsx
│  ├─ personal
│  │  ├─ hobby_table.tsx
│  │  ├─ personal.css
│  │  ├─ personal_app.tsx
│  │  ├─ post.tsx
│  │  └─ smallview.tsx
│  ├─ register
│  │  ├─ register.css
│  │  ├─ register.html
│  │  ├─ register.tsx
│  │  └─ register_app.tsx
│  ├─ square
│  │  ├─ add_group.tsx
│  │  ├─ dialog.tsx
│  │  ├─ hobby.tsx
│  │  ├─ hobby_groups.tsx
│  │  ├─ square_app.tsx
│  │  └─ view.tsx
│  └─ vite-env.d.ts
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts

```
```
hobby
├─ .eslintrc.cjs
├─ .git
│  ├─ COMMIT_EDITMSG
│  ├─ config
│  ├─ description
│  ├─ FETCH_HEAD
│  ├─ HEAD
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  ├─ push-to-checkout.sample
│  │  └─ update.sample
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ objects
│  │  ├─ 02
│  │  │  └─ 6cfd9aa1d1d561265f2a0b5f98129a11592367
│  │  ├─ 03
│  │  │  ├─ 724f6eb50f75ee5d5c794cd9b6e4f313eb2302
│  │  │  └─ a709ec544b4c53b6beea7f951a9d91efa17947
│  │  ├─ 0d
│  │  │  ├─ 312892d23a73d8ef998281a3d670dddb0b962b
│  │  │  ├─ 685d49a395ef1bf33cf836d1d9a795117b51cf
│  │  │  └─ 6babeddbdbc9d9ac5bd4d57004229d22dbd864
│  │  ├─ 0e
│  │  │  └─ 72d0f7862cc9376af8adf2ca06a7c9540f654b
│  │  ├─ 11
│  │  │  ├─ 62e19363bc0d220baafe83a4f039eee4d354ba
│  │  │  └─ f02fe2a0061d6e6e1f271b21da95423b448b32
│  │  ├─ 12
│  │  │  └─ c14c9a6e4863f9bb78da70c9bc0d6ab86e9f99
│  │  ├─ 16
│  │  │  └─ ed55a127d7435634a756b2e161fcfae3e6ed3f
│  │  ├─ 19
│  │  │  └─ 4bfc58a9edb9b746bc47b7add8a36313d9ea25
│  │  ├─ 1b
│  │  │  └─ 8acce1e24b0aa384b4709fd3bed68e49c622d5
│  │  ├─ 1c
│  │  │  └─ 8ee4b752892ba68f6b106c0fdb4f1c9493be86
│  │  ├─ 1e
│  │  │  └─ e2fdb8fc04263f85627a0add02a1661e4ce783
│  │  ├─ 21
│  │  │  └─ 30656d06c239f759840bfc0ff5c886ce7c6caf
│  │  ├─ 22
│  │  │  └─ 63b18cce40b33433d86af8949307d5ac52c85c
│  │  ├─ 23
│  │  │  └─ 51689467a011cdae9f01f4109025fe5db4f9f4
│  │  ├─ 26
│  │  │  ├─ 63c16bb1cdd601a33449b1ebbb0d049cccf7be
│  │  │  ├─ a8dfa07786c5937d84aa79e2c36e2659988659
│  │  │  └─ b84dcaa801244e3e31c2227f5023c86e7f0e22
│  │  ├─ 29
│  │  │  └─ 5d52a1d1cc4eaa1d526bbebc4fe4f4b789125b
│  │  ├─ 2a
│  │  │  ├─ 03d5dc0c357b7d0aa090a08af8544648ca8106
│  │  │  └─ ec60d836bd4ea3f27c9938799f198f03aa0f14
│  │  ├─ 30
│  │  │  └─ a131ed77ab9e3853ce21ff411522e2cb41786a
│  │  ├─ 31
│  │  │  └─ 0be38ae4ae4ee75367a292562b2ac14178f939
│  │  ├─ 34
│  │  │  ├─ 5e890be20573ee94fc8aa0a101bb9b45288447
│  │  │  └─ 7bea44ea46588c3dd8e33f43e6e0c1a8ed368d
│  │  ├─ 35
│  │  │  └─ 8e859ea02c065e258b712bfaab57236d91a0f0
│  │  ├─ 3a
│  │  │  └─ fdd6e38438be7612befbd4b656af7bed27a31a
│  │  ├─ 3d
│  │  │  ├─ 7150da80e43e3650342aa4758fa8b74e95d6d6
│  │  │  └─ a39b1422c9c8abf9090745282b16b4ad4ef48c
│  │  ├─ 3e
│  │  │  └─ 4134117893287e006ecb5675dba8e92b4e1372
│  │  ├─ 44
│  │  │  └─ c853049872644f9396a7d6fdb9b8f908f40146
│  │  ├─ 45
│  │  │  ├─ a183c42a875d260d8792149f5a65b6c2662cdd
│  │  │  └─ a7087e65bb3dcfc36c26802d54c86a3e8b0a4f
│  │  ├─ 4a
│  │  │  └─ 917414812fcd56dba0fdb47785d4fb8b93ee4a
│  │  ├─ 4e
│  │  │  └─ 3b0f1e8338bdda2b000ec265f9ad85cfd15d2f
│  │  ├─ 4f
│  │  │  ├─ 4f2d58c2634aed0ae8c93a735978d148fcb11b
│  │  │  ├─ 778021c6e616a831a33813856b3ed81e817b41
│  │  │  └─ 99fd70f87491281b452baee97108d045434948
│  │  ├─ 51
│  │  │  └─ b43ff2b4d3984ab0aa67aa0ee320feab4858f9
│  │  ├─ 52
│  │  │  ├─ 095f262bf4b2542a05fc4eb0cbce5c4bef5b79
│  │  │  └─ ccd82fa19c608b7fca2ec6dfc5fbc793b89247
│  │  ├─ 55
│  │  │  ├─ 3e2527fe378b0a057ca40d3e83ac20bb829c79
│  │  │  └─ 7b37c44d5cb352ff331f90e7fba0189cdfa65e
│  │  ├─ 5a
│  │  │  └─ 33944a9b41b59a9cf06ee4bb5586c77510f06b
│  │  ├─ 5e
│  │  │  └─ dcf623d0ca16c8f0df6513634fc6e67d011c3d
│  │  ├─ 5f
│  │  │  ├─ 2171e74e409161e51a80bd995f8f3ded420f1c
│  │  │  └─ 2eb2f9620fc51f471f980af8b12aff3409ef3a
│  │  ├─ 61
│  │  │  └─ 19ad9a8faaa5073a454f67b50fb98a25972fd2
│  │  ├─ 66
│  │  │  └─ ec6ec5c2da8bb606d1fa8b99722f216aa2a000
│  │  ├─ 68
│  │  │  └─ 45de33f4cef6cdf5a9ca3159d9399844379c7d
│  │  ├─ 6c
│  │  │  └─ 87de9bb3358469122cc991d5cf578927246184
│  │  ├─ 6f
│  │  │  └─ 420b9977489db1d6a5e28d9338246c5ee3d728
│  │  ├─ 72
│  │  │  └─ 7963eb7f3ce51cbf5e03bc82f06ad6c8f609c6
│  │  ├─ 7a
│  │  │  └─ d70a4066e75f500e1760703d0a482752745f70
│  │  ├─ 7b
│  │  │  └─ de18dd65bce6b0720af76220a822b90336905c
│  │  ├─ 7e
│  │  │  └─ 5d4d25171892b371926bae3adb4bb308f6c7f8
│  │  ├─ 81
│  │  │  └─ 817c2211386066b4e1d81741fe2d36a5b49cbd
│  │  ├─ 83
│  │  │  └─ edd925b918ce8bf4cd7da7d029cf60c7f30aab
│  │  ├─ 87
│  │  │  └─ 1d39a34fb47a0b440f30ad2666bb6e59d83376
│  │  ├─ 88
│  │  │  ├─ 52cfe40078a06c210863942a3f04b5ef09b3f0
│  │  │  └─ ed8015488859caec74d702342f25b7942b1f8c
│  │  ├─ 8b
│  │  │  ├─ 1e451c0762c8b80996bc6edd21f5cb0ef77cce
│  │  │  └─ 375006f4fc2c65d03533bd86513f616a1d1443
│  │  ├─ 91
│  │  │  └─ 68d92b0b8d0e665f55b11a826fd4de5984828d
│  │  ├─ 94
│  │  │  └─ c0b2fc152a086447a04f62793957235d2475be
│  │  ├─ 95
│  │  │  └─ a396dbbc819837e148193bf9a8763bdaddea8f
│  │  ├─ 9c
│  │  │  ├─ 271dc7cf174ce70ef5bf6c4cadc01a983ca604
│  │  │  └─ 2d225055c86c475082a2e407e5ec2309ad9a7d
│  │  ├─ a0
│  │  │  └─ 55c7f6af7406aa12aaa789a1063e63467ad558
│  │  ├─ a1
│  │  │  └─ 73e89ac8d168a0e0e677b3354d761bfb884a2f
│  │  ├─ a3
│  │  │  ├─ 9d5bf9f85c732e463d5c7ec1317c10eab15d07
│  │  │  └─ f62cf7981e6b28904050ed7a935e676ba2d261
│  │  ├─ a5
│  │  │  └─ 47bf36d8d11a4f89c59c144f24795749086dd1
│  │  ├─ a8
│  │  │  ├─ a9f24d01a7cdcd795f6341ba9e304aac80fd4d
│  │  │  └─ bfa24ed6e5440d9df7090f87989384a2989a80
│  │  ├─ aa
│  │  │  └─ 501f28f06c5e7a2e70d48b57c327a929777cc2
│  │  ├─ ac
│  │  │  ├─ 434d2a4fe71ea6abefca63ce2e9e935251a863
│  │  │  └─ 776982e8868900062022b28b3e0fb08c7eb531
│  │  ├─ ae
│  │  │  └─ 220f8a3bf7205b182cad782af7610fe36a4e19
│  │  ├─ af
│  │  │  ├─ e48ac750194a747f5665300d14049f72011a33
│  │  │  └─ f2b1fbc1ff13c49096951bd6f70f4b50dbaeee
│  │  ├─ b1
│  │  │  └─ 41e3a19d2df08e0849657c0b5eac262d7ac8c2
│  │  ├─ b2
│  │  │  └─ 47c1f4d1f63b5b14eddb6dc9e6794bacc1a750
│  │  ├─ b3
│  │  │  └─ 89e3b5257cc8a15a622270bd133359b95f0920
│  │  ├─ b9
│  │  │  └─ d355df2a5956b526c004531b7b0ffe412461e0
│  │  ├─ bd
│  │  │  ├─ 38af101dbc2e9fc5d767d31297f465b8d2a97a
│  │  │  └─ 995f46d0d2e678543e283caf0c988b5e336c29
│  │  ├─ c4
│  │  │  ├─ d8ff404f2e38661acab9f591b20c039b7bfe79
│  │  │  └─ de0e6fc2d7158a49ac4087e5e212f707e5a9a0
│  │  ├─ c5
│  │  │  ├─ 4c947d7bb1c15c7ba49402ecc73db702905874
│  │  │  └─ dc13895cf3bc67df4581b99edbf4c37514ac60
│  │  ├─ c8
│  │  │  └─ e7fa2ffb3e3a284bfc636ccb89a59375b4b9cb
│  │  ├─ c9
│  │  │  └─ 992bc8d3f45eac568e0fdfabb9fe7a857c7b9a
│  │  ├─ ce
│  │  │  └─ 289b16098e2a98cdda3f128071f5caf1e0ae65
│  │  ├─ cf
│  │  │  └─ 19af67f7ad29261b3a73cbb8240d1fc5d36ea1
│  │  ├─ d0
│  │  │  └─ 07fcd0235541264536fa1b7e631a12e18666f4
│  │  ├─ d4
│  │  │  └─ caee5f93b27416e9c3d406cca8ceb1b0cf32dc
│  │  ├─ d6
│  │  │  └─ c953795300e4256c76542d6bb0fe06f08b5ad6
│  │  ├─ d7
│  │  │  ├─ 0716854e33353461654c9d5fd4d362906045ad
│  │  │  ├─ 39292ae0143669e21b30df04a74b5baf985175
│  │  │  └─ 793a32390dfc28281c1c32957403d4cbc3e1fd
│  │  ├─ da
│  │  │  ├─ 92d5e6b150fdd4d3ab44a1e3db007a38bf662e
│  │  │  └─ ab18c2f497cda6afb6073c04d2ba406fdb1f47
│  │  ├─ db
│  │  │  ├─ 6e52c0283aa69dcd2a8734212fab18861baa9e
│  │  │  └─ 7517688d9111eb90fd364352609c87a5cf78c5
│  │  ├─ df
│  │  │  └─ 3dcbb799975a98eb5fddd88032b2f3e4be4a1b
│  │  ├─ e0
│  │  │  └─ d1390955e1dea31fa69119bbce246128e3cd10
│  │  ├─ e2
│  │  │  └─ d1a9855c73b64a57525ef43f5485db11645999
│  │  ├─ e4
│  │  │  └─ b78eae12304a075fa19675c4047061d6ab920d
│  │  ├─ e7
│  │  │  └─ b8dfb1b2a60bd50538bec9f876511b9cac21e3
│  │  ├─ e9
│  │  │  └─ 1f8912c3893e2c580ab5aed9f16792379cf259
│  │  ├─ ea
│  │  │  └─ 9d0cd8255683d84f125948115daf1de0f06b1f
│  │  ├─ ee
│  │  │  └─ 8e39178bf8d6ed22d30f3f00c50019e17cbf22
│  │  ├─ ef
│  │  │  ├─ 1b70513602f9962297617ee6c8f09a237b0af7
│  │  │  └─ ff62be4035bc685a170e4c51f3f4460cad4a70
│  │  ├─ f1
│  │  │  └─ cf2ecb3f8891fe0aab7aabc01d9f24e74dca26
│  │  ├─ f3
│  │  │  ├─ 448b8cde49136a378388e5e1827e42d86ad687
│  │  │  └─ d7f078b62818d1431e2be55964b9b7518ac061
│  │  ├─ f4
│  │  │  └─ 2206ddd04bb1f0b4bd217e1e4c4631287fb3c0
│  │  ├─ f6
│  │  │  └─ 7d70b51f83c80e82803f4abab161a5f56740a2
│  │  ├─ f7
│  │  │  └─ 6b39f535a6d3722b50968e7b079fa0a24200ba
│  │  ├─ info
│  │  └─ pack
│  ├─ ORIG_HEAD
│  └─ refs
│     ├─ heads
│     │  └─ main
│     ├─ remotes
│     │  └─ origin
│     │     └─ main
│     └─ tags
├─ .gitignore
├─ backend
│  ├─ .editorconfig
│  ├─ .eslintrc.json
│  ├─ .gitignore
│  ├─ .prettierrc.js
│  ├─ bootstrap.js
│  ├─ jest.config.js
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ README.md
│  ├─ README.zh-CN.md
│  ├─ src
│  │  ├─ config
│  │  │  ├─ config.default.ts
│  │  │  └─ config.unittest.ts
│  │  ├─ configuration.ts
│  │  ├─ controller
│  │  │  ├─ api.controller.ts
│  │  │  └─ home.controller.ts
│  │  ├─ filter
│  │  │  ├─ default.filter.ts
│  │  │  └─ notfound.filter.ts
│  │  ├─ interface.ts
│  │  ├─ middleware
│  │  │  └─ report.middleware.ts
│  │  └─ service
│  │     └─ user.service.ts
│  ├─ test
│  │  └─ controller
│  │     ├─ api.test.ts
│  │     └─ home.test.ts
│  └─ tsconfig.json
├─ image
│  └─ white.jpg
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  └─ vite.svg
├─ README.md
├─ src
│  ├─ App.css
│  ├─ App.tsx
│  ├─ assets
│  │  └─ react.svg
│  ├─ index.css
│  ├─ logic
│  │  ├─ logic.css
│  │  ├─ logic.html
│  │  ├─ logic.tsx
│  │  └─ logic_app.tsx
│  ├─ main.tsx
│  ├─ personal
│  │  ├─ hobby_table.tsx
│  │  ├─ personal.css
│  │  ├─ personal_app.tsx
│  │  ├─ post.tsx
│  │  └─ smallview.tsx
│  ├─ register
│  │  ├─ register.css
│  │  ├─ register.html
│  │  ├─ register.tsx
│  │  └─ register_app.tsx
│  ├─ square
│  │  ├─ add_group.tsx
│  │  ├─ dialog.tsx
│  │  ├─ hobby.tsx
│  │  ├─ hobby_groups.tsx
│  │  ├─ square_app.tsx
│  │  └─ view.tsx
│  └─ vite-env.d.ts
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts

```