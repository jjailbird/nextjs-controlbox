This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).



## Getting Started

First install related modules

```bash

git pull

npm install

```

To run the development server:

```bash
npm run dev
# or
yarn dev
```

To generate static page

```bash
npm run static
# or
yarn static

# generate static pages in "out" directory
# run web server
node server.js
```
Ubuntu에 Node.js 최신 버전 설치

```bash 
$ curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
$ sudo apt install nodejs
```

Toast(popup) 메시지 문구 수정하기

-  pages/index.js 196 lines

```javascript
  ...
      <ModalBasic open={modalDeployed} onClose={closeModalDeployed}>
        Data Aggregation Service deployed.
      </ModalBasic>
      <ModalBasic open={modalUpgraded} onClose={closeModalUpgraded}>
        Data Aggregation Service upgraded.
      </ModalBasic>
      <ModalBasic open={modaSDNEnabled} onClose={closeModalSDNEnabled}>
        SDN enabled.
      </ModalBasic>
      <ModalReset open={modalReset} onClose={closeModalReset} onClick1={executeReset} onClick2={closeModalReset}>
        Do you really want to reset it?
      </ModalReset>
  ...
```

Deploy 영역 수정하기

- components/DeplyNewService.js

```javascript
  ...
  <div className={`${style.text}`}>
    Data Aggregation Service
    <br/>
    (Body)
  </div>
  ...

```

Upgrade 영역 수정하기

- components/DeplyUpgradeService.js

```javascript
  ...
  <div className={`${style.text}`}>
    Data Aggregation Service
    <br/>
    (Body + Camera)
  </div>
  ...

```

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

## Use environment variables

cp .env.sample .env
BASEPATH variable and subfolder name should match

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.




[File upload / Progress bar](https://gofogo.tistory.com/143);

[Executing Shell Commands with Node.js](https://stackabuse.com/executing-shell-commands-with-node-js/)

[Download Files with Axios](https://thewebtier.com/snippets/download-files-with-axios/)

[resct download progress bar with axios](https://github.com/codegeous/react-component-depot/blob/master/src/pages/FileDownloader/index.js)

[Axios File Download in Node.js](https://futurestud.io/tutorials/download-files-images-with-axios-in-node-js)