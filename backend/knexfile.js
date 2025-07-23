const config= {
  development: {
    client: 'sqlite3',
    connection: {
      filename: ':memory:',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './src/infra/db/migrations',
    },
  },
};

export default config;
