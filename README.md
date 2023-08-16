## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ docker-compose up -d mongodb

$ npm run start:dev


#shows databases
$ docker exec -it 'container name' bash
$ mongosh
$ use admin
$ db.auth("root", "123456");
$ show dbs

$ use languagetestdb
$ db.MultipleChoiceQuestion.find()
