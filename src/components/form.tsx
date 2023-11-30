import './style.css'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { ControlledTextInput } from './controlledTextInput';
import { ControlledEmailInput } from './controlledEmailInput';
import { ControlledDateInput } from './controlledDateInput';
import { schema, FormData } from './schema';

const Form = () => {
 
    const { formState: { errors }, handleSubmit, register } = useForm<FormData>({
        mode: 'onBlur',
        resolver: zodResolver(schema)
    })

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
