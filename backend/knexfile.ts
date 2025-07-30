const config = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: ':memory:',
      // filename: './mydb.sqlite'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './src/infra/db/migrations',
    },
  },
};

export default config;
