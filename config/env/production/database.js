const parse = require("pg-connection-string").parse;
const config = parse(process.env.DATABASE_URL);

const { host, port, database, user, password } = parse(process.env.DATABASE_URL);
module.exports = () => ({
  connection: {
    client: "postgres",
    connection: {
      host,
      port,
      database,
      user,
      password,
      ssl: {
        rejectUnauthorized: false,
      },
    },
    debug: false,
  },
});