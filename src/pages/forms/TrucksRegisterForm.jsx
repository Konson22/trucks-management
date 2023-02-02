import { useGlobalContext } from "../../contexts/GlobalContextProvider"
import InputField from "./InputField"
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { useState } from "react"
import { FaTimes } from "react-icons/fa"
import axios from 'axios'


export default function TrucksRegisterForm() {

    const { setShowForm, setTrucksData } = useGlobalContext()
    const [loading, setLoading] = useState(false)

    const validate = Yup.object({
        plate_no:Yup.string().required('Truck No Required'),
        driver_name:Yup.string().required('Name Required'),
        company:Yup.string().required('Company name Required'),
        client:Yup.string().required('Client name Required'),
        purpuse:Yup.string().required('Purpuse Required'),
    })

    const handleSubmit = async values => {
        setLoading(true)
        try{
            const response = await axios.post('http://localhost:3001/records', values).then(res => res)
            if(response.status === 201){
                setTrucksData(prev => [...prev, response.data])
                setShowForm(null)
            }
        } catch(error){
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

  return (
    <div className="fixed inset-0 bg-opacity-20 bg-black backdrop-blur-sm h-[100vh] flex items-center justify-center">
        <div className="bg-gray-100 p-10 rounded shadow-xl relative w-[40%]">
            <div className="absolute right-2 top-2 cursor-pointer" onClick={() => setShowForm(false)}>
                <FaTimes className='text-xl' />
            </div>
            <Formik
                initialValues={{
                    plate_no:'',
                    driver_name:'',
                    company:'',
                    client:'',
                    purpuse:'',
                }}
                validationSchema={validate}
                onSubmit={values => handleSubmit(values)}
            >
                <div className='form-container'>
                    <h1 className="text-2xl mb-5">Trucks Registeration Form</h1>
                    {loading && 'Loading...'}
                    <Form>
                        {fields.map(field => <InputField name={field.name} label={field.label} placeholder={field.placeholder} />)}
                        <div className="mt-3">
                            <button className='px-4 py-2 bg-green-600 rounded' type='submit'>Submit</button>
                        </div>
                    </Form>
                </div>
            </Formik>
        </div>
    </div>
  )
}


const fields = [
    {name:'plate_no', placeholder:'Enter plate number', type:'text', label:'Plate No', colspan:'col-span-2'},
    {name:'driver_name', placeholder:'Enter Driver Name', type:'text', label:'Driver Name', colspan:'col-span-2'},
    {name:'company', placeholder:'Enter Company Name', type:'text', label:'Company Name', colspan:'col-span-2'},
    {name:'client', placeholder:'Enter Client Name', type:'text', label:'Client Name', colspan:''},
    {name:'purpuse', placeholder:'Enter plate number', type:'text', label:'Purpuse', colspan:''},
]