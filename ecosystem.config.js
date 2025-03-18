module.exports = {
  apps: [
    {
      name: "backend",
      script: "server.js",
      cwd: "/app/src/backend",
      env: {
        NODE_ENV: "production",
        PORT: 5000,
      },
    },
    {
      name: "frontend",
      script: "serve",
      args: "-s build",
      cwd: "/app",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
