import InputField from "./InputField"
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { useState } from "react"
import { clients } from "../../assets/data"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../../hooks/axiosInstance"
import { FormLoader } from "../../components/Loaders"



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
            const response = await axiosInstance.post('/auth/login', values).then(res => res)
            localStorage.setItem('wlc-user-auth', JSON.stringify(response.data))
            navigate('/', {replace:true})
        } catch(error){
            if(error.response){
                setMessage(error.response?.data)
            }
        }finally{
            setLoading(false)
        }
    }

  return (
    <div className='login-container h-[100vh] flex items-center justify-center'>
        <Formik
            initialValues={{ name:'', password:'' }}
            validationSchema={validate}
            onSubmit={values => handleSubmit(values)}
        >
            <div className='md:w-[30%] bg-opacity-60 bg-white shadow-sm py-10 px-10 rounded relative'>
                {loading && <FormLoader />}
                <h1 className="text-3xl text-center text-white mb-5">Login</h1>
                { message && <div className='px-4 py-2 my-4'>{message}</div> }
                <Form>
                    {fields.map(field => 
                        <InputField 
                            name={field.name} 
                            type={field.type} 
                            label={field.label} 
                            placeholder={field.placeholder} 
                            options={field.options}
                            cName='mb-4'
                        />
                    )}
                    <button 
                        className='w-full mt-4 flex items-center justify-center px-4 py-2 bg-green-600 rounded' 
                        type='submit'
                    >
                        Login
                    </button>
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
        label:'Organization',
        options:[...clients, 'VSS']
    },
    {name:'password', type:'password', placeholder:'Enter password', label:'Password'}
]