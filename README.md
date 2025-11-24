# hms
Hospital Management System (MERN Stack) – Admin &amp; Doctor Panel with Today's Patient Management


# hms its a monorepo 
A Monorepo (short for "monolithic repository") is a software development strategy where multiple distinct projects are stored within a single Git repository.

In the context of your hms, instead of having one repository for the client and a completely separate one for the server, you keep them together under one root directory.

```
hms/ (Root)
├── package.json
├── pnpm-workspace.yaml
├── node_modules/          <-- Contains .pnpm (Virtual Store)
├── client/
│   ├── package.json
│   └── node_modules/      <-- Contains symlinks pointing to root
└── server/
    ├── package.json
    └── node_modules/      <-- Contains symlinks pointing to root
```