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
    <div className='bg-gradient-to-r from-slate-950 to-slate-700 min-h-screen'>
      <div className='min-h-screen text-white container mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <header className='flex items-center justify-between py-4 sm:py-6'>
          <div className='flex items-center space-x-2'>
            <img src={logo} alt="" className='w-8 h-8 sm:w-10 sm:h-10 rounded-full' />
            <h1 className='text-xl sm:text-2xl text-violet-400 font-bold'>EduWeb</h1>
          </div>
          {isLoggedIn ? (
            <div>
              <button 
                onClick={handleLogout} 
                className="bg-red-600 text-white py-2 px-3 sm:px-4 text-sm sm:text-base rounded hover:bg-red-400 hover:text-black transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className='flex flex-col sm:flex-row gap-2 sm:gap-4'>
              <Link 
                to={"/login"} 
                className='bg-violet-500 text-white py-2 px-3 sm:px-4 text-sm sm:text-base text-center border-white rounded hover:bg-violet-300 hover:text-black transition-colors duration-200'
              >
                Login
              </Link>
              <Link 
                to={"/signup"} 
                className='bg-violet-500 text-white py-2 px-3 sm:px-4 text-sm sm:text-base text-center border-white rounded hover:text-black hover:bg-violet-300 transition-colors duration-200'
              >
                Signup
              </Link>
            </div>
          )}
        </header>

        {/* Main section */}
        <section className='text-center py-8 sm:py-12 lg:py-16 flex flex-col items-center'>
          <div className='mb-4 sm:mb-6'>
            <span className='text-3xl sm:text-4xl lg:text-5xl font-semibold text-violet-500 hover:[text-shadow:0_0_15px_#8b5cf6] hover:text-violet-300 transition-all duration-300'>
              EduWeb
            </span>
          </div>
          <p className='text-gray-300 font-semibold text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 px-4 max-w-2xl'>
            Enhance your skills with best educators around the world
          </p>
          <div className='flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 w-full max-w-4xl px-4'>
            <Link 
              to={"/courses"} 
              className='w-full sm:w-auto bg-green-500 px-4 sm:px-6 py-2 sm:py-3 text-white text-sm sm:text-base rounded font-semibold hover:bg-violet-300 duration-300 hover:text-black transition-colors text-center min-w-[140px]'
            >
              Explore Courses
            </Link>
            <Link 
              to={"https://www.youtube.com/@freecodecamp/playlists"} 
              className='w-full sm:w-auto bg-orange-500 px-4 sm:px-6 py-2 sm:py-3 text-white text-sm sm:text-base rounded font-semibold hover:bg-violet-300 duration-300 hover:text-black transition-colors text-center min-w-[140px]'
            >
              Courses Videos
            </Link>
            <Link 
              to={"/admin/login"} 
              className='w-full sm:w-auto bg-blue-600 px-4 sm:px-6 py-2 sm:py-3 text-white text-sm sm:text-base rounded font-semibold hover:bg-violet-300 duration-300 hover:text-black transition-colors text-center min-w-[140px]'
            >
              Admin Login
            </Link>
          </div>
        </section>

        {/* Courses Slider Section */}
        <section className="py-8 sm:py-12">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-white mb-2">
              Featured Courses
            </h2>
            <p className="text-gray-300 text-center text-sm sm:text-base">
              Discover our most popular courses
            </p>
          </div>
          <div className="px-2 sm:px-4">
            <Slider {...settings}>
              {
                courses.map((course)=>(
                  <div key={course._id} className="p-2 sm:p-4 flex justify-center items-center">
                    <div className="relative flex-shrink-0 transition-transform duration-300 transform hover:scale-105">
                      <div className="bg-gray-700 rounded-lg overflow-hidden mx-auto w-full max-w-[240px] sm:max-w-[260px]">
                        <div className="h-24 sm:h-28 flex items-center justify-center bg-gray-600">
                          <img 
                            className="h-16 sm:h-20 w-auto object-contain" 
                            src={course.image.url} 
                            alt={course.title} 
                          />
                        </div>
                        <div className="p-4 sm:p-6 text-center">
                          <h3 className="text-lg sm:text-xl font-bold text-white mb-3 line-clamp-2 min-h-[3rem]">
                            {course.title}
                          </h3>
                          <button className="w-full bg-red-500 text-white px-3 py-2 rounded hover:bg-red-300 hover:text-black transition-colors duration-300 text-sm sm:text-base">
                            Enroll Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }
            </Slider>
          </div>
        </section>

        <hr className="border-gray-600 my-8 sm:my-12" />

        {/* Footer */}
        <footer className="pb-8 sm:pb-12">
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6'>
            {/* Brand and Social */}
            <div className="flex flex-col items-center justify-center text-center">
              <div className='flex items-center space-x-2 mb-4'>
                <img src={logo} alt="" className='w-8 h-8 rounded-full' />
                <h1 className='text-lg sm:text-xl text-violet-400 font-bold'>EduWeb</h1>
              </div>
              <div>
                <p className="mb-3 text-sm sm:text-base">Follow Us</p>
                <div className="flex justify-center space-x-4">
                  <a href="" className="text-xl sm:text-2xl hover:text-blue-500 transition-colors duration-200">
                    <FaFacebook />
                  </a>
                  <a href="" className="text-xl sm:text-2xl hover:text-pink-600 transition-colors duration-200">
                    <FaInstagram />
                  </a>
                  <a href="" className="text-xl sm:text-2xl hover:text-blue-300 transition-colors duration-200">
                    <FaTwitter />
                  </a>
                </div>
              </div>
            </div>

            {/* Connects */}
            <div className="flex flex-col items-center justify-center text-center">
              <div className="mb-4">
                <p className="font-semibold text-base sm:text-lg">Connects</p>
              </div>
              <div className="flex flex-col items-center text-slate-400 space-y-2">
                <a href="" className="hover:text-white cursor-pointer duration-200 text-sm sm:text-base transition-colors">
                  Youtube-learn to code
                </a>
                <a href="" className="hover:text-white cursor-pointer duration-200 text-sm sm:text-base transition-colors">
                  Telegram-learn to code
                </a>
                <a href="" className="hover:text-white cursor-pointer duration-200 text-sm sm:text-base transition-colors">
                  Github-learn to code
                </a>
              </div>
            </div>

            {/* Legal */}
            <div className="flex flex-col items-center justify-center text-center">
              <div className="mb-4">
                <p className="font-semibold text-base sm:text-lg">Copyrights &#169; 2025</p>
              </div>
              <div className="flex flex-col items-center text-slate-400 space-y-2">
                <a href="" className="hover:text-white cursor-pointer duration-200 text-sm sm:text-base transition-colors">
                  Terms & Conditions
                </a>
                <a href="" className="hover:text-white cursor-pointer duration-200 text-sm sm:text-base transition-colors">
                  Privacy Policy
                </a>
                <a href="" className="hover:text-white cursor-pointer duration-200 text-sm sm:text-base transition-colors">
                  Refund & Cancellation
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Home