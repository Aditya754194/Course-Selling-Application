import logo from "../assets/logo_web.png"
import { Link } from "react-router-dom"
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../utils/utils";

const Home = () => {

  const [courses,setCourses] = useState([]);
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  
  useEffect(()=>{
    const token = localStorage.getItem("user"); 
    console.log(token)
    if(token){
      setIsLoggedIn(true);
    }else{
      setIsLoggedIn(false);
    }
  },[])

  const handleLogout = async() => {
    try {
      const response = axios.post(`${BACKEND_URL}/user/logout`,{
        withCredentials: true,
      })
      toast.success((await response).data.message);
      localStorage.removeItem("user");
      setIsLoggedIn(false);
    } catch (error) {
      console.log("Error in logging out",error)
      toast.error(error.response.data.errors || "Error in logging out")
    }
  }

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/course/courses`,
          {
            withCredentials:true
          }
        );
        setCourses(response.data.courses);
      } catch (error) {
        console.log("error in fetching Courses", error);
      }
    }
    fetchCourses();
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };


  return (
    <div className='bg-gradient-to-r from-slate-950 to-slate-700 h-100'>
      <div className='min-h-screen md:h-100 text-white container mx-auto'>
        {/* Header */}
        <header className='flex items-center justify-between p-6'>
          <div className='flex items-center space-x-2 '>
            <img src={logo} alt="" className='w-10 h-10 rounded-full' />
            <h1 className='text-2xl text-violet-400 font-bold'>EduWeb</h1>
          </div>
          {isLoggedIn ?(<div>
            <button onClick={handleLogout} className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-400 hover:text-black">Logout</button>
          </div>):(
            <div className='space-x-4'>
            <Link to={"/login"} className='bg-violet-500 text-white py-2 px-4 border-white rounded hover:bg-violet-300 hover:text-black'>Login</Link>
            <Link to={"/signup"} className='bg-violet-500 text-white py-2 px-4 border-white rounded hover:text-black hover:bg-violet-300'>Signup</Link>
          </div>
          )}
        </header>

        {/* Main section */}
        <section className='text-center py-10'>
          <div>
            <span className='text-5xl font-semibold text-violet-500 hover:[text-shadow:0_0_15px_#8b5cf6] hover:text-violet-300'>EduWeb</span>
          </div>
          <br />
          <p className='text-gray-300 font-semibold'>Enhance your skills with best educators around the world</p>
          <div className='space-x-4 mt-4'>
            <Link to={"/courses"} className='bg-green-500 px-6 py-2 text-white rounded font-semibold hover:bg-violet-300 duration-300 hover:text-black'>Explore Courses</Link>
            <Link to={"https://www.youtube.com/@freecodecamp/playlists"} className='bg-orange-500 px-6 py-2 text-white rounded font-semibold hover:bg-violet-300 duration-300 hover:text-black'>Courses Videos</Link>
          </div>
        </section>
        <section>
          <Slider {...settings}>
            {
              courses.map((course)=>(
                <div key={course._id} className="p-4 ">
                  <div className="relative flex-shrink-0 w-92 transition-transform duration-300 transform hover:scale-105">
                    <div className="bg-gray-700 rounded-lg overflow-hidden w-60">
                      <img className="h-20 w-full object-contain mt-6" src={course.image.url} alt="" />
                      <div className="p-6 text-center">
                        <h2 className="text-xl font-bold text-white">{course.title}</h2>
                        <button className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-300 hover:text-black mt-1">Enroll Now</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </Slider>
        </section>

        <hr className="border-white" />
        {/* Footer */}
        <footer className="mt-8">
          <div className='grid grid-cols-1 md:grid-cols-3 '>
            <div className="flex flex-col items-center justify-center mb-3">
              <div className='flex items-center space-x-2'>
                <img src={logo} alt="" className='w-8 h-8 rounded-full' />
                <h1 className='text-1xl text-violet-400 font-bold'>EduWeb</h1>
              </div>
              <div className="mt-3 ml-4">
                <p className="mb-2">Follow Us</p>
                <div className="flex space-x-2">
                  <a href=""><FaFacebook className="hover:text-blue-500" /></a>
                  <a href=""><FaInstagram className="hover:text-pink-600" /></a>
                  <a href=""><FaTwitter className="hover:text-blue-300" /></a>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div>
                <p className="font-semibold">Connects</p>
              </div>
              <div className="flex flex-col items-center text-slate-500 mt-2">
                <a href="" className="hover:text-white cursor-pointer duration-200">Youtube-learn to code</a>
                <a href="" className="hover:text-white cursor-pointer duration-200">Telegram-learn to code</a>
                <a href="" className="hover:text-white cursor-pointer duration-200">Github-learn to code</a>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div>
                <p className="font-semibold">Copyrights &#169; 2025</p>
              </div>
              <div className="flex flex-col items-center text-slate-500 mt-2">
                <a href="" className="hover:text-white cursor-pointer duration-200">Terms & Conditions</a>
                <a href="" className="hover:text-white cursor-pointer duration-200">Privacy Policy</a>
                <a href="" className="hover:text-white cursor-pointer duration-200">Refund & Cancellation</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Home
