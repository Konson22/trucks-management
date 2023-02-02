import { ErrorMessage, useField } from 'formik'
import { TextField } from '@mui/material'



export default function InputField({...props}){

    const [field, meta] = useField(props)

    return(
        <div className='mb-4' key={props.name}>
            <TextField
                fullWidth
                // variant='standard'
                color='primary'
                // label={label}
                className={`bg-white ${(meta.touched && meta.error) ? 'border-2 border-red-600' : ''}` }
                // className={(meta.touched && meta.error) ? 'error-border' : '' }
                {...field}
                {...props}
                autoComplete="off"
            />
            <ErrorMessage component='div' name={field.name} className="text-red-600 my-1" />
        </div>
    )
}