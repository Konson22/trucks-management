import InputField from "./InputField"
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { useState } from "react"
import axios from 'axios'


export default function Login() {

    const [loading, setLoading] = useState(false)

    const validate = Yup.object({
        email:Yup.string().required('E-mail Required'),
        password:Yup.string().required('password Required')
    })

    const handleSubmit = async values => {
        setLoading(true)
        try{
            const response = await axios.post('http://localhost:3001/records', values).then(res => res)
            if(response.status === 201){
                console.log(response.data)
            }
        } catch(error){
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

  return (
        <Formik
            initialValues={{  email:'', password:'' }}
            validationSchema={validate}
            onSubmit={values => handleSubmit(values)}
        >
            <div className='bg-red-100 px-[15%]'>
                <h1 className="text-2xl mb-5">Trucks Registeration Form</h1>
                {loading && 'Loading...'}
                <Form>
                    {fields.map(field => <InputField name={field.name} label={field.label} placeholder={field.placeholder} />)}
                    <div className="mt-3">
                        <button className='px-4 py-2 bg-green-600 rounded' type='submit'>Login</button>
                    </div>
                </Form>
            </div>
        </Formik>
  )
}


const fields = [
    {name:'email', placeholder:'example@gmail.com', type:'email', label:'E-mail'},
    {name:'password', placeholder:'Enter password', type:'password', label:'Password'}
]