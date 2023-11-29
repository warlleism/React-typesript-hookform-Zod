export const ControlledTextInput = ({ register, field, placeholder, errors, type }: any) => {
    return (
        <>
            <input
                {...register(field)}
                type={type ? "number" : "text"}
                className="form-control"
                id={field}
                placeholder={placeholder}
            />
            {
                errors && (
                    <p>{errors}</p>
                )
            }

        </>

    )
}