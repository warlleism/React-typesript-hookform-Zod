import { UseFormRegister } from 'react-hook-form';
import { FormData } from './schema';

interface ControlledEmailInputProps {
    register: UseFormRegister<FormData>;
    field: "name" | "email" | "document" | "initialDate" | "finalDate"; 
    placeholder: string;
    errors?: string | null;
}

export const ControlledEmailInput = ({ register, field, placeholder, errors }: ControlledEmailInputProps) => {
    return (
        <>
            <input
                {...register(field)}
                type="email"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder={placeholder}
                id={field}
            />
            {
                errors && (
                    <p>{errors}</p>
                )
            }
        </>
    );
};
