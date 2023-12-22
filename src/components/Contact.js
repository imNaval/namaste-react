const Contact = () =>{
    return (
        <div className="sm:font-bold text-2xl m-4 text-center p-4 xxxs:p-8 xxs:p-10 xs:p-16 sm:p-32">
            <h1>Contact Us page</h1>
            
            <form>
                <input type="text" placeholder="name" className="rounded-lg border border-black p-2 m-2 w-[90%] sm:w-auto"/>
                <input type="text" placeholder="message" className="rounded-lg border border-black p-2 m-2 w-[90%] sm:w-auto"/>
                <button className="border border-black p-2 m-2 bg-gray-100 rounded-lg">Submit</button>
            </form>
        </div>
    )
}

export default Contact;