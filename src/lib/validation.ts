import { z } from 'zod'

export class AuthValidation {
    static loginSchema = z.object({
        email: z.string().email('Geçerli bir email girin'),
        password: z.string().min(3, 'Şifre en az 3 karakter olmalı'),
    })

    static registerSchema = z.object({
        fullname: z.string().min(2, 'İsim en az 2 karakter olmalı'),
        email: z.string().email('Geçerli bir email girin'),
        phone: z.string().min(10, 'Telefon en az 10 karakter olmalı'),
        password: z.string().min(3, 'Şifre en az 3 karakter olmalı'),
    })
}

export type LoginFormInputs = z.infer<typeof AuthValidation.loginSchema>
export type RegisterFormInputs = z.infer<typeof AuthValidation.registerSchema>
