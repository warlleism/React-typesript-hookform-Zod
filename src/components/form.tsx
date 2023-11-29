import './style.css'
import { useForm } from 'react-hook-form';
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ControlledTextInput } from './controlledTextInput';
import { ControlledEmailInput } from './controlledEmailInput';
import { ControlledDateInput } from './controlledDateInput';

const Form = () => {

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

    const { formState: { errors }, handleSubmit, register } = useForm<FormData>({
        mode: 'onBlur',
        resolver: zodResolver(schema)
    })

    console.log(errors)

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit((data) => console.log(data))}>
                <div className="form-group" >
                    <ControlledTextInput errors={errors?.name?.message} register={register} field={'name'} placeholder={'Digite seu nome'} />
                </div>
                <div className="form-group" >
                    <ControlledTextInput type={'number'} errors={errors?.document?.message} register={register} field={'document'} placeholder={'Número do documento'} />
                </div>
                <div className="form-group" >
                    <ControlledEmailInput errors={errors?.email?.message} register={register} field={'email'} placeholder={'Digite seu email'} />
                </div>
                <div className="date-fields-container" style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                    <div className="form-group">
                        <ControlledDateInput errors={errors?.initialDate?.message} register={register} field={'initialDate'} />
                    </div>
                    <div className="form-group">
                        <ControlledDateInput errors={errors?.finalDate?.message} register={register} field={'finalDate'} />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Filtrar</button>
            </form>
        </div>
    );
}

export default Form;
