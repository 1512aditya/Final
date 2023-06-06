
import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
//import Feedback from '../components/Feedback'
import Contact from '../components/contact'



export default function Home() {

    const [foodCat, setFoodCat] = useState([])
    const [foodItems, setFoodItems] = useState([])
    const [search, setSearch] = useState('')

    const loadFoodItems = async () => {
        let response = await fetch("http://localhost:5000/api/foodData", {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }

        });
        response = await response.json();
        
        setFoodItems(response[0])
        setFoodCat(response[1])
        
    }

    useEffect(() => {
        loadFoodItems()
    }, [])

    return (
        <div>
            <div><Navbar /></div>

            <div>
            <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel">

           <div className="carousel-inner " id='carousel'>
            <div class=" carousel-caption  " style={{ zIndex: "9" }}>
               <div className=" d-flex justify-content-center"> 
               
                 
                             <input className="form-control me-2 w-200 bg-white text-dark" type="search" placeholder="Type in.." aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                        
             </div>
             </div>
             <div className="carousel-item active" >
               <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100  " style={{ filter: "brightness(30%)" }} alt="..." />
            
             </div>
            <div className="carousel-item">
               <img src="https://source.unsplash.com/random/900x700/?pastry" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
             </div>
             <div className="carousel-item">
               <img src="https://source.unsplash.com/random/900x700/?barbeque" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />         
              </div> 
           </div>
          
         </div>
            </div>
            
            <div className='container'>
                {
                    foodCat !==[]
                    ? foodCat.map((data)=>{
                        return(
                            <div className='row mb-3'>
                            <div key={data._id} className="fs-3 m-3">{data.CategoryName}</div>
                            <hr/>
                            {foodItems !==[]?
                            foodItems.filter((item)=> (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase()))).map(filterItems=>{
                                return(
                                    <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                                        <Card foodItem = {filterItems}
                                        options= {filterItems.options[0]}
                                        ></Card>
                                    </div>
                                )
                            })
                            :<div>no such data found </div>}
                            </div>
                        )
                    })
                    :""
                }
                </div>
                <br></br>
                <h2 className="fs-3 m-3">Feedback</h2>
                <hr></hr>
                <div><Contact /></div>
            <div><Footer /></div>
        </div>
    )


}