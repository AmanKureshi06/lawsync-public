import React, { createContext } from 'react'
import Navbar from './Components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import './App.css'
import Footer from './Components/Footer';
import NearMe from './User/NearMe';
import Login from './Login';
import PostJob from './User/PostJob';
import Registration from './Registration';
import LegalAdvice from './Lawyer/LegalAdvice';
import AboutAdvocate from './Lawyer/AboutAdvocate';
import AvailableAdvocates from './User/AvailableAdvocates';
import LawyerEditProfile from './Lawyer/LawyerEditProfile';
import Mywallet from './Lawyer/MyWallet';
import Message from './Lawyer/Message';
import UserEditProfile from './User/UserEditProfile';
import UserPayment from './User/UserPayment';
import UserBooking from './User/UserBooking';
import UserMessage from './User/UserMessage';
import Success from './User/Success';
import UserSettings from './User/UserSettings';
import FeeCalculator from './User/Feecal';
import UserPost from './User/UserPost';
import Access from './Error/Access';
import Error from './Error/Error';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import NotFound from './Error/NotFound';
import AddCard from './User/AddCard';
import Setting from './Lawyer/Settings';
import Dashboard from './Admin/Dashboard';
import ManageUsers from './Admin/ManageUsers';
import EditAdminProfile from './Admin/AdminEditProfile';
import ManageLawyer from './Admin/ManageLawyer';
import Complaints from './Admin/Complaints';
import AdminSettings from './Admin/AdminSettings';
import LawyerRegister from './Lawyer/LawyerRegister';
import ServiceProviderForm from './Lawyer/ServiceProviderForm';
import Terms from './Terms';
import UserChat from './User/Chat/UserChat';
import LawyerChat from './Lawyer/LawyerChat';
import LawyerPayment from './Lawyer/LawyerPayment';
import AddLawyerCard from './Lawyer/AddLawyerCard';
import Advocates from './Lawyer/Advocates';


export const content = createContext();


const Arr = [

  {
    id: 1,
    url: "../image/available_lawyer_1.png",
    name: "Arlene McCoy",
    price: 200
  },

  {
    id: 2,
    url: "../image/available_lawyer_2.png",
    name: "Mirza",
    price: 200
  },

  {
    id: 3,
    url: "../image/available_lawyer_3.png",
    name: "Arlene McCoy",
    price: 200
  },

  {
    id: 4,
    url: "../image/available_lawyer_4.png",
    name: "Arlene McCoy",
    price: 200
  }
  ,

  {
    id: 5,
    url: "../image/available_lawyer_5.png",
    name: "Arlene McCoy",
    price: 200
  }
  ,

  {
    id: 6,
    url: "../image/available_lawyer_6.png",
    name: "Arlene McCoy",
    price: 200
  }
  ,

  {
    id: 7,
    url: "../image/available_lawyer_7.png",
    name: "Arlene McCoy",
    price: 200
  }
  ,

  {
    id: 8,
    url: "../image/available_lawyer_8.png",
    name: "Arlene McCoy",
    price: 200
  }
  ,

  {
    id: 9,
    url: "../image/available_lawyer_9.png",
    name: "Arlene McCoy",
    price: 200
  }
  ,

  {
    id: 10,
    url: "../image/available_lawyer_10.png",
    name: "Arlene McCoy",
    price: 200
  }
  ,

  {
    id: 11,
    url: "../image/available_lawyer_11.png",
    name: "Arlene McCoy",
    price: 200
  }
  ,

  {
    id: 12,
    url: "../image/available_lawyer_12.png",
    name: "Ravi",
    price: 309
  }


]



function App() {
  return (
    <>
      <div>
        <ToastContainer />
        <content.Provider value={{ Arr }}>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<><Home /></>}></Route>
              <Route path="*" element={<NotFound />} />

              <Route path='/nearme' element={<><Navbar /> <NearMe /> <Footer /> </>}></Route>
              <Route path='/login' element={<> <Login /> </>}></Route>
              <Route path='/postjob' element={<> <PostJob /> </>}></Route>
              <Route path='/terms' element={<> <Terms /> </>}></Route>
              <Route path='/register' element={<> <Registration /> </>}></Route>
              <Route path='/available' element={<> <AvailableAdvocates /> </>}></Route>
              <Route path="/advocates/:username" element={<AboutAdvocate />} />
              <Route path='/advisor' element={<><LegalAdvice /> </>}></Route>
              <Route path='/profile' element={<><LawyerEditProfile /> </>}></Route>
              <Route path='/profile/wallet' element={<><Mywallet /> </>}></Route>
              {/* <Route path='/message' element={<><Message /> </>}></Route> */}
              <Route path='/settings' element={<><Setting /> </>}></Route>
              <Route path='/usereditprofile' element={<><UserEditProfile /> </>}></Route>
              <Route path='/userpayment' element={<><UserPayment /> </>}></Route>
              <Route path='/userbooking' element={<><UserBooking /> </>}></Route>
              <Route path='/usermessage' element={<><UserMessage /> </>}></Route>
              <Route path='/success' element={<><Success /> </>}></Route>
              <Route path='/usersettings' element={<><UserSettings /> </>}></Route>
              <Route path='/feecal' element={<><FeeCalculator /> </>}></Route>
              <Route path='/userpost' element={<><UserPost /> </>}></Route>
              <Route path='/error/403' element={<><Access /> </>}></Route>
              <Route path='/error' element={<><Error /> </>}></Route>
              <Route path='/addcard' element={<><AddCard /> </>}></Route>
              <Route path='/admin/dashboard' element={<><Dashboard /> </>}></Route>
              <Route path='/admin/profile' element={<><EditAdminProfile /> </>}></Route>
              <Route path='/admin/manage/users' element={<><ManageUsers /> </>}></Route>
              <Route path='/admin/manage/lawyers' element={<><ManageLawyer /> </>}></Route>
              <Route path='/admin/complaints' element={<><Complaints /> </>}></Route>
              <Route path='/admin/settings' element={<><AdminSettings /> </>}></Route>
              <Route path='/lawyer/register' element={<><LawyerRegister /> </>}></Route>
              <Route path='/lawyer/service' element={<><ServiceProviderForm /> </>}></Route>
              <Route path='/profile/payments' element={<><LawyerPayment /> </>}></Route>
              <Route path='/profile/addcard' element={<><AddLawyerCard /> </>}></Route>

              <Route path="/user/chat" element={<UserChat />} />
              <Route path="/lawyer/chat" element={<LawyerChat />} />
              <Route path="/advocates" element={<Advocates />} />


            </Routes>
          </BrowserRouter>
        </content.Provider>
      </div>
    </>
  )
}

export default App;
