require("dotenv").config();

module.exports = {
  apps: [
    {
      name: `http://localhost:`+process.env.SERVER_PORT,
      exec_mode: 'cluster',
      instances: 0, // Or a number of instances
      script: './server.js',
      // args: 'server.js',
    },
  ],
}

//ddd
