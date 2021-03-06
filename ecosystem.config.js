module.exports = {
  apps: [
    {
      name: "Miniprogram-express",
      script: "./node_modules/.bin/ts-node src/index.ts",
      instances: 1,
      autorestart: true,
      watch: ["src", "db.config.js"],
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ],

  deploy: {
    production: {
      user: "node",
      host: "212.83.163.1",
      ref: "origin/master",
      repo: "git@github.com:repo.git",
      path: "/var/www/production",
      "post-deploy":
        "npm install && pm2 reload ecosystem.config.js --env production"
    }
  }
};
