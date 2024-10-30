const config = {
  development: {
    username: "postgres",
    password: "03399truth",
    database: "to-dolist",
    host: "localhost",
    dialect: "postgres"
  },
  test: {
    username: "postgres",
    password: "03399truth",
    database: "to-dolist_test",
    host: "localhost",
    dialect: "postgres"
  },
  production: {
    username: "postgres",
    password: "03399truth",
    database: "to-dolist_production",
    host: "localhost",
    dialect: "postgres"
  }
};

export default config;
