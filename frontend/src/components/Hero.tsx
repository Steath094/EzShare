
function Hero() {
  return (
        <div className="dark:text-white flex justify-center items-center gap-5 flex-col md:h-[80vh] px-24">
        <div className={`rounded-md flex justify-center items-center flex-col`} 
        style={{
            backgroundImage: `url("/Images/Bg.jpg")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width:'80%',
            height:'75%'
            }}>
            <h1 className="xl:text-6xl font-bold my-2 tracking-tighter text-white">Share Text and Code With Anyone</h1>
        <p className="text-[#f9fafbcc] font-light text-xl max-w-lg text-center">EzShare is a collaborative text editor that allows you to share text and code with an one in real-time.</p>
        <button className="bg-[#0c77f2] py-2 px-4 rounded-md mt-10">Create Room</button>
        </div>

        <div className="w-[80%] mt-6">
            <input type="text" className="rounded-md border bg-transparent p-4 w-80" placeholder="Join Room By Code" />
        </div>
        <div className="text-center font-semibold mt-3">
            EzShare is a free and open-source project. You can find the source code on GitHub.
        </div>
    </div>
  )
}

export default Hero