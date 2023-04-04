# simple-commerce-e2e

## pre-requis

- install node
- install vs code

## steps

- créer projet projet github 

- create ssh key to connect to github (nécessaire pour récupérer un projet privé et pour pusher)

```shell
ssh-keygen -t ed25519 -C "sboursault@protonmail.com"
cat ~/.ssh/id_ed25519.pub
```

- git clone using ssh

```shell
git clone git@github.com:sboursault/simple-commerce-e2e.git
cd simple-commerce-e2e/
echo node_modules > .gitignore
code .
```

- install cypress

From https://docs.cypress.io/guides/getting-started/installing-cypress
and https://docs.cypress.io/guides/getting-started/opening-the-app

```shell
npm install cypress --save-dev
npx cypress open
```

- install typescript

From https://docs.cypress.io/guides/tooling/typescript-support

```shell
npm install --save-dev typescript
```
Create `tsconfig.json` inside the `cypress` folder
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["es5", "dom"],
    "types": ["cypress", "node"]
  },
  "include": ["**/*.ts"]
}
```

- create the first test : add-to-basket.cy.ts

