import "dotenv/config"
import {defineConfig,env} from "prisma/config";

export default defineConfig({
    schema:"prisma/schema.prisma",

    migrations:{
        path:"prisma/migrations",
    },

    datasource:{
        // Use direct connection (port 5432) — required for migrations.
        // PgBouncer (port 6543) does not support advisory locks needed by Prisma Migrate.
        url: env("DIRECT_URL"),
    }

})