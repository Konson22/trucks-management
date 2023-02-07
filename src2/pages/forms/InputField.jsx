import { ErrorMessage, useField } from 'formik'


export default function InputField({kn, cName='mb-4', ...props}){

    const [field, meta] = useField(props)

    return(
        <div className={cName} key={kn}>
            <label className='' htmlFor={props.name}>{props.label}</label>
            {props.type !== 'select' && 
                <input className={`h-[3.2rem] w-full px-3 mt-1 focus:border-none focus:outline-none bg-white ${(meta.touched && meta.error) ? 'border-b border-red-600' : ''}`} 
                    {...field} 
                    {...props} 
                />
            }
            {props.options && 
                <select className={`h-[3.2rem] w-full focus:border-none focus:outline-none px-3 mt-1 bg-white ${(meta.touched && meta.error) ? 'border-b border-red-600' : ''}`} name={props.name} {...field}>
                    <option value=''>Select {props.label}</option>
                    {props.options.map(opt => (
                        <option value={opt}>{opt}</option>
                    ))}
                </select>
            }
            <ErrorMessage component='div' name={props.name} className="text-red-600 my-1" />
        </div>
    )
}