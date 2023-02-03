import { ErrorMessage, useField } from 'formik'
// import { TextField } from '@mui/material'


export default function InputField({...props}){

    const [field, meta] = useField(props)

    return(
        <div className='mb-4' key={props.name}>
            {props.type !== 'select' && 
                <input className={`h-[3.2rem] w-full px-3 focus:border-none focus:outline-none bg-white ${(meta.touched && meta.error) ? 'border-2 border-red-600' : ''}`} 
                    {...field} 
                    {...props} 
                />
            }
            {props.options && 
                <select className={`h-[3.2rem] w-full px-3 bg-white ${(meta.touched && meta.error) ? 'border-2 border-red-600' : ''}`} name={props.name} {...field}>
                    <option value=''>SELECT ORG</option>
                    {props.options.map(opt => (
                        <option value={opt}>{opt}</option>
                    ))}
                </select>
            }
            {/* <TextField
                fullWidth
                variant='standard'
                color='primary'
                label={label}
                className={`bg-white ${(meta.touched && meta.error) ? 'border-2 border-red-600' : ''}` }
                className={(meta.touched && meta.error) ? 'error-border' : '' }
                {...field}
                {...props}
                autoComplete="off"
            /> */}
            <ErrorMessage component='div' name={props.name} className="text-red-600 my-1" />
        </div>
    )
}