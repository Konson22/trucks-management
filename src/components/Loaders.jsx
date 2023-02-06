


export function FormLoader(){
    return(
        <div className="h-full w-full flex items-center justify-center bg-opacity-10 bg-white backdrop-blur-sm absolute inset-0 z-50">
            <div className="">
                <img src={process.env.PUBLIC_URL+'/images/spinner.gif'} alt='Loading...' />
                <span className="text-xl mt-6">loading...</span>
            </div>
        </div>
    )
}