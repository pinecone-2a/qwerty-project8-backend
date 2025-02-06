const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

async function main() {
    const create = await prisma.donation.create({
        data: {
            amount: 200,
            specialMessage: "String",
            socialURLOrBuyMeACoffee: "String",
            donorId: 1,
            recipientId: 2
        }
    })
    console.log(create)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })