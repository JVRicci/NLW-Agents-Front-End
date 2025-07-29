import { config } from "dotenv"
import { z } from "zod"
import process from "process"

if(process.env.NODE_ENV == "test"){
    config({ path : ".env.test"})
} else {
    config()
}

const envSchema = z .object({
    NODE_ENV : z.enum(["develop"]).default("develop"),
    // Endereço e porta da API
    URL: z.string(),
    PORT: z.coerce.number().default(3333)
})

// Faz conversão automática das variáveis da env
export const _env = envSchema.safeParse(process.env)
// console.log(_env)

if(_env.success === false) {
    throw new Error(`Invalid enviroment variables:\n${_env.error}`)
}

export const env = _env.data