import React, {useEffect,useState} from 'react';
import config from '../../config/config'

//IMPORT FONT-AWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faCode,faLaptopCode,faChalkboardTeacher,faRupeeSign,faPhoneVolume } from '@fortawesome/free-solid-svg-icons'


//IMPORT
import Textanimation from '../components/TextAnimation';
import Imageanimation from '../components/ImageAnimation';
import FeaturesCard from '../components/FeaturesCard';
import CourseCard from '../components/CourseCard';

// //IMPORT IMAGES
// import frontEnd from '../images/frontend.jpg'
// import backEnd from '../images/nodejs.jpg'
// import mern from '../images/mern.png'
// import dataStructure from '../images/datastructure.png'

//IMPORT CSS
import './Index.css'

//IMPORT FONT-AWESOME
const code = <FontAwesomeIcon icon={faCode} size="3x"/>
const codePattern = <FontAwesomeIcon icon={faLaptopCode} size="3x"/>
const liveInteraction = <FontAwesomeIcon icon={faChalkboardTeacher} size="3x"/>
const price = <FontAwesomeIcon icon={faRupeeSign} size="3x"/>
const call = <FontAwesomeIcon icon={faPhoneVolume} size="3x"/>
const element=<FontAwesomeIcon icon={faCode} size="3x"/>


const Index=()=> {
    const [initialProducts, setProducts]=useState()
    useEffect(()=>{
        const fetchProducts=async () =>{
            try{
                let response=await fetch(`${config.url}/product`)
                let responseData=await response.json()
                setProducts(responseData.products)
            }
            catch(err){}
        }
        fetchProducts()
    },[])

    return (
        <React.Fragment>
           <div className="container-fluid main-content">
               <div className="row">
                   <div className="col-12 col-sm-7 col-md-6">
                     <Textanimation/>
                   </div>
                   <div className="col-12 col-sm-5 col-md-6">
                     <Imageanimation/>
                   </div>
                </div>
           </div>
           <p className="text-center heading">Our Features </p>
           <div className="container card-container">
               <div className="row d-flex justify-content-center break">
                   <FeaturesCard title={"LEARN CODING"} text={"Educate yourself with top-notch study material."} icon={code}/>
                   <FeaturesCard title={"LEARN CODING PATTERNS"} text={"Learn the best coding pattern used in the IT industries."} icon={codePattern}/>
                   <FeaturesCard title={"LIVE INTERACTION"} text={"Get your doubts cleared in live interaction."} icon={liveInteraction}/> 
               </div>
               <div className="row d-flex justify-content-center break">
                    <FeaturesCard title={"ONLINE VIDEOS"} text={"Learn through high-quality & easy to understand video lectures."} icon={element}/>
                    <FeaturesCard title={"AFFORDABLE FEE"} text={"Learn from the best in the industry with an affordable payment plan."} icon={price}/>
                    <FeaturesCard title={"LATEST CONTENT"} text={"Learn from the comprehensive & interactive course content."} icon={element}/> 
               </div>
               <div className="row d-flex justify-content-center break">
                    <div className="col-sm-4 col-md-4"></div>
                    <FeaturesCard title={"DIRECT CALL"} text={"Get your query solved on direct phone call"} icon={call}/>
                    <div className="col-sm-4 col-md-4"></div>
               </div>
           </div>
           <p className="text-center heading">Courses</p>
           <div className="container">
               <div className="row justify-content-center break">
                   {
                      initialProducts &&
                        initialProducts.map(product=>(
                            <CourseCard key={product._id} header={product.title} image={`${config.url}/${product.image}`} delprice={product.delPrice} price={product.price} path={`/course-detail/${product.title}/${product._id}`} />
                        ))
                       
                        
                    }
                   {/* <CourseCard header={"Frontend-Course"} image={frontEnd} delprice={"Rs 5000"} price={"Rs 1599"} path={"/front-end/details"}/>
                   <CourseCard header={"Backend-Course"} image={backEnd}  delprice={"Rs 6000"} price={"Rs 1799"}  path={"/back-end/details"}/>
                   <CourseCard header={"MERN STACK Course"} image={mern}  delprice={"Rs 15000"} price={"Rs 3500"}  path={"/mern-stack/details"}/> */}
                   {/* <CourseCard header={"Data-Structure-Course"} image={dataStructure}/> */}
               </div>
               {/* <div className="row justify-content-center break">
                   <div className="col-sm-4 col-md-4"></div>
                   <CourseCard header={"Data-Structure-Course"} image={dataStructure}  delprice={"Rs 4000"} price={"Rs 1000"}  path={"/data-structure/details"}/>
                   <div className="col-sm-4 col-md-4"></div>
               </div> */}
           </div>
        </React.Fragment>
    )
}

export default Index
