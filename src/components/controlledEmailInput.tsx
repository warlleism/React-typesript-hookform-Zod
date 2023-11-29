export const ControlledEmailInput = ({ register, field, placeholder, errors }: any) => {
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

    )
}