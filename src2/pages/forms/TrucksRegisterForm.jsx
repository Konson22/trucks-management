import { useGlobalContext } from "../../contexts/GlobalContextProvider"
import InputField from "./InputField"
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { useState } from "react"
import { FaSave, FaTimes } from "react-icons/fa"
import { clients } from "../../assets/data"
import { useRecordsContext } from "../../contexts/RecordsContextProvider"
import axiosInstance from "../../hooks/axiosInstance"


export default function TrucksRegisterForm() {

    const profile = JSON.parse(localStorage.getItem('wlc-user-auth'))
    const { setShowForm } = useGlobalContext()
    const { setData } = useRecordsContext()
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(null)

    const validate = Yup.object({
        plate_no:Yup.string().required('Truck No Required'),
        driver_name:Yup.string().required('Name Required'),
        company:Yup.string().required('Company name Required'),
        client:Yup.string().required('Client name Required'),
        purpuse:Yup.string().required('Purpuse Required'),
        contact:Yup.string().required('contact Required'),
    })

    const handleSubmit = async values => {
        setLoading(true)
        try{
            const response = await axiosInstance.post('/records/add', {data:values, name:profile.name}).then(res => res)
            if(response.status === 201){
                setData(prev => [...prev, response.data])
                setShowForm(null)
            }
        } catch(error){
            setMessage('Error occured')
        }finally{
            setLoading(false)
        }
    }

  return (
    <div className="bg-gray-200 p-10 rounded shadow-xl relative w-[60%]">
        <div className="absolute right-2 top-2 cursor-pointer" onClick={() => setShowForm(null)}>
        <FaTimes className='text-xl' />
        </div>
        {loading && <FormLoader />}
        <Formik
            initialValues={{
                plate_no:'',
                driver_name:'',
                company:'',
                client:'',
                contact:'',
                purpuse:'',
            }}
            validationSchema={validate}
            onSubmit={values => handleSubmit(values)}
        >
            <div className='form-container'>
                <h1 className="text-2xl mb-5">Trucks Registeration Form</h1>
                { message && <div className='px-4 py-2 my-4 bg-red-500'>{message}</div> }
                <Form>
                <div className="md:grid grid-cols-3 gap-4">
                    {fields.map(field => 
                        <InputField 
                            name={field.name} 
                            type={field.type} 
                            label={field.label} 
                            placeholder={field.placeholder} 
                            options={field.options}
                            cName=''
                        />
                    )}
                    </div>
                    <div className="flex text-white mt-8">
                        <button 
                            className='
                                flex items-center 
                                justify-center
                                px-4 py-2 bg-green-600 rounded w-full
                            ' 
                            type='submit'>
                            <FaSave className='text-xl mr-3' /> Save
                        </button>
                        <button 
                            className='
                                flex items-center 
                                justify-center
                                px-4 py-2 mx-4 bg-yellow-600 rounded w-full
                            ' 
                            type='reset'>
                            Reset
                        </button>
                        <button 
                            className='
                                flex items-center 
                                justify-center
                                px-4 py-2 bg-red-600 rounded w-full
                            ' 
                            type='button'>
                            Cancel
                        </button>
                    </div>
                </Form>
            </div>
        </Formik>
    </div>
  )
}

function FormLoader(){
    return(
        <div className="h-full w-full flex items-center justify-center bg-opacity-10 bg-white backdrop-blur-sm absolute inset-0 z-50">
            <div className="">
                <img src={process.env.PUBLIC_URL+'/images/spinner.gif'} alt='Loading...' />
                <span className="text-xl mt-6">loading...</span>
            </div>
        </div>
    )
}

const fields = [
    {name:'plate_no', placeholder:'Enter plate number', type:'text', label:'Plate No'},
    {name:'company', placeholder:'Enter Company Name', type:'text', label:'Company Name'},
    {name:'client', placeholder:'Enter Client Name', type:'select', label:'Client Name', options:clients},
    {name:'purpuse', placeholder:'Enter plate number', type:'select', label:'Purpuse', options:['Delivery', 'Loading', 'Official']},
    {name:'driver_name', placeholder:'Enter Driver Name', type:'text', label:'Driver Name'},
    {name:'contact', placeholder:'Enter phone No', type:'text', label:'Contact'},
]