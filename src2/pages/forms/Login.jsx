import InputField from "./InputField"
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { useState } from "react"
import { clients } from "../../assets/data"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../../hooks/axiosInstance"



export default function Login() {

    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(false)

    const validate = Yup.object({
        name:Yup.string().required('Name Required'),
        password:Yup.string().required('password Required')
    })

    const handleSubmit = async values => {
        setLoading(true)
        try{
            // const response = await axios.post('https://rose-drab-seahorse.cyclic.app/auth/login', values, {
            const response = await axiosInstance.post('/auth/login', values).then(res => res)
            localStorage.setItem('wlc-user-auth', JSON.stringify(response.data))
            navigate('/')
        } catch(error){
            if(error.response){
                setMessage(error.response?.data)
            }
        }finally{
            setLoading(false)
        }
    }

  return (
    <div className='h-[100vh] flex items-center justify-center'>
        <Formik
            initialValues={{  name:'', password:'' }}
            validationSchema={validate}
            onSubmit={values => handleSubmit(values)}
        >
            <div className='w-[35%] bg-gray-200 p-12 rounded'>
                <h1 className="text-2xl mb-5">Login</h1>
                {loading && 'Loading...'}
                {message && 
                <div className="px-4 py-1 bg-red-200 mb-6">{message}</div>
                }
                <Form>
                    {fields.map(field => 
                        <InputField 
                            name={field.name} 
                            kn={field.name} 
                            type={field.type} 
                            label=''
                            placeholder={field.placeholder} 
                            options={field.options}  
                        />
                    )}
                    <div className="mt-3">
                        <button className='px-4 py-2 bg-green-600 rounded' type='submit'>Login</button>
                    </div>
                </Form>
            </div>
        </Formik>
    </div>
  )
}


const fields = [
    {
        name:'name', 
        type:'select',
        placeholder:'example@gmail.com', 
        label:'E-mail',
        options:[...clients, 'VSS', 'WLC']
    },
    {name:'password', type:'password', placeholder:'Enter password', label:'Password'}
]