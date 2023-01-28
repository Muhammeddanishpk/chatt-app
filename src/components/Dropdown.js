import { Fragment, useContext, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { auth, db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { AuthContext } from "../context/auth";
// import { ChevronDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Drop({setUsername,handleSearch,username }) {
  const {currentUser} = useContext(AuthContext)
  const [user, setUser] = useState([]);
  // const [clickValue, setClickValue] = useState('');
  const Udata = collection(db, "users");
  getDocs(Udata).then((snapshot) => {
    const allPost = snapshot.docs.map((products) => {
      return {
        ...products.data(),
      };
    });


    setUser(allPost);
  });
 const SearchHandler = (e)=>{
  
 console.log(e.target.innerText)
    setUsername(e.target.innerText)
     
 }
   
  return (
    <Menu as="div" className="my-3 mx-3  w-full relative inline-block text-left">
      <div>
        <Menu.Button className="w-[100%] inline-flex  justify-center rounded-lg   bg-gray-800 px-4 py-2 text-sm font-medium text-gray-100 shadow-sm hover:bg-gray-800 focus:outline-none     ">
         <span className="start" >Start a new chat</span> 
          <span
            class="material-symbols-outlined -mr-1 ml-2 h-5 w-5 text-gray-400"
            aria-hidden="true"
          >
            expand_more
          </span>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-1 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
             {user.map((item,index)=>{
              return( <Menu.Item as="div" className={currentUser.uid === item.uid  ? 'hidden':"block"}>
                {({ active }) => (
                  <span
                  
                  key={item.uid}
                  onClick={SearchHandler}
                  
                    className={classNames(
                      active ? "bg-gray-700 cursor-pointer text-gray-100 flex items-center font-semibold" : "cursor-pointer items-center font-semibold text-gray-100 flex",
                      "block px-4 py-2 text-sm  "
                    )}
                  >
                    <img className="w-[30px] object-cover h-[30px] rounded-full mr-2" src={item.photoURL} alt="" />
                    {item.displayName}
                  </span>
                )}
              </Menu.Item>)
             })
             
        }
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
