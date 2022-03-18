import { Prisma, PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()


const items: Prisma.ItemCreateInput[] = [
    {
        title: 'Potato',
        image: 'https://dr.savee-cdn.com/things/5/9/7f8ce89593a643267be006.jpg',
        price: 1.99

    },
    {
        title: 'Tomato',
        image: 'https://dr.savee-cdn.com/things/5/9/764ed81507b87be1637b6d.jpg',
        price: 2.99
    },
    {
        title: 'Cheese',
        image: 'https://dr.savee-cdn.com/things/5/c/751c56fdc8611fc5c8b178.jpg',
        price: 3.99
    }
]

const users: Prisma.UserCreateInput[] = [
    {
        email: 'guido@email.com',
        name: 'Guido',
        password: bcrypt.hashSync('guido123'),
        orders: {
            create: [
                { item: { connect: { title: 'Potato' } }, quantity: 100 },
                { item: { connect: { title: 'Tomato' } }, quantity: 1 }
            ]
        }
    },
    {
        email: 'arvalda@email.com',
        name: 'Arvalda',
        password: bcrypt.hashSync('arvalda123'),
        orders: {
            create: [
                { item: { connect: { title: 'Tomato' } }, quantity: 2 }
            ]
        }
    },
    {
        email: 'alban@email.com',
        name: 'Alban',
        password: bcrypt.hashSync('alban123'),
        orders: {
            create: [
                { item: { connect: { title: 'Cheese' } }, quantity: 1 }
            ]
        }
    },
    {
        email: 'luiza@email.com',
        name: 'Luiza',
        password: bcrypt.hashSync('luiza123'),
        orders: {
            create: [
                { item: { connect: { title: `Tomato` } }, quantity: 4 }
            ]
        }
    }
]

async function createStuff() {
    for (const item of items) {
        await prisma.item.create({ data: item })
    }

    for (const user of users) {
        await prisma.user.create({ data: user })
    }
}

createStuff()