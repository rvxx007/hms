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

# Before starting the project run seeders using this command 
## At Root directory hms

```
pnpm seed:admin
pnpm seed:doctor
pnpm seed:medicine

```


# Login - POST

```
http://localhost:4000/api/v1/auth/login

payload : 
{
  "email": "admin@hms.com",
  "password": "admin123"
}

```


# To Create Hospital - POST 

```
http://localhost:4000/api/v1/admin/hospitals

payload : 
{
  "name": "Nagpur City Hospital",
  "address": "Nagpur",
  "phone": "9876883210"
}

```

# To get all Hospital - GET 

```
http://localhost:4000/api/v1/admin/hospitals

```

# To get Hospital by ID / Name / Email - GET 

```
http://localhost:4000/api/v1/admin/hospitals?id="..."
http://localhost:4000/api/v1/admin/hospitals?name="..."
http://localhost:4000/api/v1/admin/hospitals?email="..."

```


# To get all Doctors - GET 

```
http://localhost:4000/api/v1/admin/doctors

```

# To get Doctors by ID / Name / Email - GET 

```
http://localhost:4000/api/v1/admin/doctors?id="..."
http://localhost:4000/api/v1/admin/doctors?name="..."
http://localhost:4000/api/v1/admin/doctors?email="..."

```

# To get all Medicines - GET

```
http://localhost:4000/api/v1/admin/medicines

```

# To search and filter Medicines - GET

```
http://localhost:4000/api/v1/admin/medicines?name=...
http://localhost:4000/api/v1/admin/medicines?genericName=...
http://localhost:4000/api/v1/admin/medicines?type=...
http://localhost:4000/api/v1/admin/medicines?company=...

```
