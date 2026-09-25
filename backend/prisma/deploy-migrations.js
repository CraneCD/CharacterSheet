// Runs as the last step of `npm run build`. On Render (which sets RENDER=true
// for builds) it applies pending migrations with `prisma migrate deploy`, so
// schema changes ship with the code: there's no Shell on the free plan to run
// it by hand. A failed migration fails the build, and Render keeps serving the
// previous deploy instead of starting new code against an old schema.
//
// Everywhere else (local builds, CI) it does nothing: use `npm run
// prisma:migrate` in development, and `npx prisma migrate deploy` by hand for
// any other deployment.
const { execSync } = require('child_process');

if (!process.env.RENDER) {
    console.log('deploy-migrations: not on Render, skipping prisma migrate deploy');
    process.exit(0);
}

console.log('deploy-migrations: applying pending migrations');
execSync('npx prisma migrate deploy', { stdio: 'inherit' });
