import React,{useState} from 'react';
import './rentform.css';


const Rentform = ()=>
{
    const [fileData , setFileData] = useState();
    const [property , setProperty] = useState(
        {
            bhktype:"", facing:"",propertyAge:"",city:"", propertySize:"",
            street:"",address:"",pincode:"", cost:"",deposit:"",preferredTenant:"", furnishing:"",
            parkingFacility:"", waterSupply:"",nonvegAllowed:"",latitude:"", longitude:""
        });


    const handleInput = (e)=>
    {
        setProperty({...property,[e.target.name]:e.target.value});
    };

    const handleFileUpload = (e)=>
    {
        setFileData(e.target.files[0]);
    };

    const handleSubmit = async(e)=>
    {
        e.preventDefault();

        console.log(property);
        const data = new FormData();
        data.append('image',fileData);
        data.append('bhktype', property.bhktype);data.append('facing', property.facing);data.append('propertyAge', property.propertyAge);
        data.append('city', property.city);data.append('propertySize', property.propertySize);data.append('street', property.street);data.append('address',property.address);
        data.append('cost', property.cost);data.append('deposit', property.deposit);data.append('preferredTenant', property.preferredTenant);
        data.append('furnishing', property.furnishing);data.append('parkingFacility', property.parkingFacility);data.append('waterSupply', property.waterSupply);
        data.append('nonvegAllowed', property.nonvegAllowed);data.append('latitude', property.latitude);data.append('longitude', property.longitude);
        data.append('pincode', property.pincode);

        await fetch("http://localhost:8080/propertyregistration",{
            method : "POST",
            body : data    
        }).then((result)=>
        {
            console.log("File sent successfully");
            alert("Property Registered Successfully")
        }).catch((err)=>
        {
            console.log(err);
        })
    }

    
    return(
        <>
        <p className='logo'>PROPERTY REGISTRATION FORM<br/></p>
        <div className='rentFormBlock'>
            <table>
                <tr><td>BHK Type : </td>
                <td>
                <select name="bhktype" className='selectBox' onChange={handleInput}>
                    <option value="None" selected>select an option</option>
                    <option value="1 BHK">1 BHK</option>
                    <option value="2 BHK">2 BHK</option>
                    <option value="3 BHK">3 BHK</option>
                    <option value="4+ BHK">4+ BHK</option>
                </select>
                </td>
                </tr>

                <tr><td>Facing : </td>
                <td>
                <select name="facing" className='selectBox' onChange={handleInput}>
                    <option value="None" selected>select an option</option>
                    <option value="North">North</option>
                    <option value="South">South</option>
                    <option value="East">East</option>
                    <option value="West">West</option>
                    <option value="North-East">North-East</option>
                    <option value="South-East">South-East</option>
                    <option value="North-West">North-West</option>    
                </select>                
                </td>
                </tr>

                <tr><td>Property Age : </td>
                <td>
                <select name="propertyAge" className='selectBox' onChange={handleInput}>
                    <option value="none" selected>select an option</option>
                    <option value="Under Construction">Under Construction</option>
                    <option value="Less than 1 year">Less than 1 year</option>
                    <option value="1-3 Years">1-3 Years</option>  
                    <option value="4-10 Years">4-10 Years</option>                   
                    <option value="More than 10 years">More than 10 years</option>
                </select>               
                </td>
                </tr>

                <tr>
                    <td>city : </td>
                    <td>
                        <input type="text" className='txtnbgcolor' name="city" onChange={handleInput}></input>
                    </td>
                </tr>

                <tr>
                    <td>Street / Area : </td>
                    <td>
                        <input type="text" className='txtnbgcolor' name="street" onChange={handleInput}></input>
                    </td>
                </tr>

                <tr>
                    <td>Address : </td>
                    <td>
                        <input type="text" className='txtnbgcolor' name="address" onChange={handleInput}></input>
                    </td>
                </tr>

                <tr>
                    <td>pincode : </td>
                    <td>
                        <input type="text" className='txtnbgcolor' name="pincode" onChange={handleInput}></input>
                    </td>
                </tr>

                <tr>
                    <td>Property size : </td>
                    <td>
                        <input type="text" className='txtnbgcolor' name="propertySize" onChange={handleInput}></input>
                    </td>
                </tr>


                <tr>
                    <td>Rent cost : </td>
                    <td>
                        <input type="text" className='txtnbgcolor' name="cost" onChange={handleInput} placeholder="/month"></input>
                    </td>
                </tr>

                <tr>
                    <td>Deposit amount : </td>
                    <td>
                        <input type="text" className='txtnbgcolor' name="deposit" onChange={handleInput}></input>
                    </td>
                </tr>

                <tr>
                    <td>Preferred Tenant : </td>
                    <td>
                        <select name="preferredTenant" className='selectBox' onChange={handleInput}>
                            <option value="None">Select an option</option>
                            <option value="Anyone">Anyone</option>
                            <option value="Bachelor">Bachelor </option>
                            <option value="Family">Family</option>
                        </select>
                    </td>
                </tr>

                <tr>
                    <td>Furnishing : </td>
                    <td>
                        <select name="furnishing" className='selectBox' onChange={handleInput}>
                            <option value="None">Select an option</option>
                            <option value="Fully-furnished">Fully-furnished</option>
                            <option value="Semi-furnished">Semi-furnished</option>
                            <option value="Unfurnished">Unfurnished</option>
                        </select>
                    </td>
                </tr>

                <tr>
                    <td>Parking facility : </td>
                    <td>
                        <select name="parkingFacility" className='selectBox' onChange={handleInput}>
                            <option value="None">Select an option</option>
                            <option value="Yes">Yes </option>
                            <option value="No">No</option>
                        </select>
                    </td>
                </tr>

                <tr>
                    <td>Water supply : </td>
                    <td>
                        <select name="waterSupply" className='selectBox' onChange={handleInput}>
                            <option value="None">Select an option</option>
                            <option value="Corporation">Corporation</option>
                            <option value="BoreWell">Borewell</option>
                            <option value="Corporation and Borewell">Both</option>
                        </select>
                    </td>
                </tr>

                <tr>
                    <td>Non-veg allowed : </td>
                    <td>
                        <select name="nonvegAllowed" className='selectBox' onChange={handleInput}>
                            <option value="None">Select an option</option>
                            <option value="Yes">Yes </option>
                            <option value="No">No</option>
                        </select>
                    </td>
                </tr>

                <tr>
                    <td>Latitude : </td>
                    <td>
                        <input type="text" className='txtnbgcolor' name="latitude" onChange={handleInput}></input>
                    </td>
                </tr>

                <tr>
                    <td>Longitude : </td>
                    <td>
                        <input type="text" className='txtnbgcolor' name="longitude" onChange={handleInput}></input>
                    </td>
                </tr>

                <tr>
                    <td>Images : </td>
                    <td>
                        <input type="file" onChange={handleFileUpload}></input>
                    </td>
                </tr>

                <tr>
                    <td></td>
                    <td>
                        <input type="button" onClick={handleSubmit} value="Submit" name='image' className='rentformbtn'></input> 
                    </td>
                </tr>
            </table>    
        </div>
        </>
    )
}

export default Rentform;