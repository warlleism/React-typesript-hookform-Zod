import { z } from 'zod'

const schema = z.object({
    name: z.string().refine(value => !!value, { message: 'O campo "name" é obrigatório' }),
    email: z.string().email('E-mail inválido').refine(value => !!value, { message: 'O campo "email" é obrigatório' }),
    document: z.string().refine(value => !!value, { message: 'O campo "document" é obrigatório' }),
    initialDate: z.string().refine(value => !!value, { message: 'O campo "initialDate" é obrigatório' }),
    finalDate: z.string().refine(value => !!value, { message: 'O campo "finalDate" é obrigatório' }),
}).superRefine((fields, ctx) => {

    if (!fields.finalDate) {
        ctx.addIssue({
            path: ['finalDate'],
            code: z.ZodIssueCode.invalid_date,
            message: 'Selecione uma data final'
        });
    }

    if (!fields.initialDate) {
        ctx.addIssue({
            path: ['initialDate'],
            code: z.ZodIssueCode.invalid_date,
            message: 'Selecione uma data inicial'
        });
    }

    if (new Date(fields.initialDate).getTime() > new Date(fields.finalDate).getTime()) {
        ctx.addIssue({
            path: ['finalDate'],
            code: z.ZodIssueCode.invalid_date,
            message: 'Data final deve ser maior que a inicial'
        });
    }
});

type FormData = z.infer<typeof schema>;

export type { FormData }; 

export { schema };