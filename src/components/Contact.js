const Contact = () =>{
    return (
        <div className="font-bold text-2xl m-4 text-center p-32">
            <h1>Contact Us page</h1>
            
            <form>
                <input type="text" placeholder="name" className="border border-black p-2 m-2"/>
                <input type="text" placeholder="message" className="border border-black p-2 m-2"/>
                <button className="border border-black p-2 m-2 bg-gray-100 rounded-lg">Submit</button>
            </form>
        </div>
    )
}

export default Contact;