export const ControlledDateInput = ({ register, field, errors }: any) => {
    return (
        <>
            <input
                {...register(field)}
                type="date" className="form-control"
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