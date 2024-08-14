import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '@/constants/options';
import { chatSession } from '@/service/AIModal';
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { toast } from 'sonner';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc"
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { useNavigate } from 'react-router-dom';
function CreateTrip() {
  const [place, setPlace] = useState()

  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const handleInputChange = (name, value) => {

    setFormData({
      ...formData,
      [name]: value
    })
  }

  useEffect(() => {
    console.log(formData);
  }, [formData])

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => toast("Failed to login. please Try Again"),
  })
  const OnGenerateTrip = async () => {

    const user = localStorage.getItem('user');

    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (!formData?.noOfDays || !formData?.location || !formData?.budget || !formData.travelers) {
      toast("Please fill all details")
      return;
    }
    if (formData?.noOfDays > 5) {
      toast("Please enter less than 5 days")
      return;
    }
    console.log("FormData", formData);
    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveler}', formData?.travelers)
      .replace('{budget}', formData?.budget)
      .replace('{noOfDays}', formData?.noOfDays)

    // console.log('FINAL_PROMPT', FINAL_PROMPT)

    const result = await chatSession.sendMessage(FINAL_PROMPT);

    console.log("TripData", result?.response?.text())
    setLoading(false);
    SaveAiTrip(result?.response?.text());
  }

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId
    });
    setLoading(false);
    navigate('/view-trip/'+docId)
  }

  const GetUserProfile = (tokenInfo) => {
    console.log('tokenInfo', tokenInfo)
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json'
      }
    }).then((resp) => {
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      OnGenerateTrip();
    }).catch((err) => {
      console.log(".............", err);
      toast("Failed to fetch user info. Please Login Again")
    });
  }

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>
        Share Your Travel Vibes with Us 🏕️🌴
      </h2>
      <p className='mt-3 text-gray-500 text-xl'>
        Drop Us the Basics, and Our Trip Planner Will Whip Up a Customized Adventure Just for You!
      </p>

      <div className='mt-20 flex flex-col gap-10'>
        <div>
          <h2 className='text-xl my-3 font-medium'>
            Choose Your Dream Destination:
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => { setPlace(v); handleInputChange('location', v) }
            }}
          />
        </div>
        <div>
          <h2 className='text-xl my-3 font-medium'>
            How Many Days of Exploring Await?
          </h2>
          <Input placeholder={'Select...'} type="number"
            onChange={(e) => handleInputChange('noOfDays', e.target.value)}
          />
        </div>
      </div>

      <div>
        <h2 className='text-xl my-3 font-medium'>
          How Much Are You Looking to Spend?
        </h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectBudgetOptions.map((item, index) => (
            <div key={index}
              onClick={() => handleInputChange('budget', item.title)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.budget === item.title && 'shadow-lg border-black'}`}>
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className='text-xl my-3 font-medium'>
          Who's Part of Your Travel Squad?
        </h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectTravelesList.map((item, index) => (
            <div key={index}
              onClick={() => handleInputChange('travelers', item.people)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.travelers === item.people && 'shadow-lg border-black'}`}>
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      <div className='my-10 justify-end flex'>
        <Button
          disabled={loading}
          onClick={OnGenerateTrip}>
          {loading ?
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" /> : 'Generate Trip'
          }
        </Button>
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <DialogTitle className="flex justify-center items-center"><img src='/logo.png' className='h-24 w-auto' alt='Logo' /></DialogTitle>

              <h2 className='font-bold text-lg mt-7'>Sign In With Google</h2>
              <p>Sign in to the App with Google authentication securely</p>

              <Button
                disabled={loading}
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center">
                <FcGoogle className='h-7 w-7' />
                Sign in With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>

  )
}

export default CreateTrip
