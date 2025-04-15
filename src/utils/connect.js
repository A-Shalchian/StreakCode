import { PrismaClient } from "@prisma/client";
let prisma;
if (process.env.NODE_ENV === "production") {
  // In production mode, we use a single instance of PrismaClient
  prisma = new PrismaClient();
} else {
  // In development mode, we create a new PrismaClient instance for each request
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}
export default prisma;
