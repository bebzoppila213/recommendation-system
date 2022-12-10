
import { PrismaClient, Film } from '@prisma/client'

export default class BaseService{
    protected prismaClient: PrismaClient;

    constructor(){
        this.prismaClient = new PrismaClient()
    }
}