import InputField from '../components/InputField'
import userIcon from '../assets/user_icon.png'
import CustomBtn from '../components/CustomBtn'
import { useState } from 'react'
import { RegisterData } from '../typings/weather'

const Register = () => {
  const [data, setData] = useState<RegisterData>({
    email: '',
    username: '',
    password: '',
    confirm_password: '',
    full_name: '',
    address: '',
    city: '',
    state: '',
    zip_code: ''
  })

  const handleInputField = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [event.target.name]: event.target.value })
  }

  return (
    <div
      className="flex h-full items-center relative
    md:h-full md:max-w-[1280px] md:justify-center "
    >
      {/* <div
        className=" 
        w-full h-1/2 bg-no-repeat bg-cover absolute top-0 bottom-0 left-0 right-0
        md:flex md:flex-1 md:relative "
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div> */}
      <div className="flex flex-col w-full h-full flex-1 justify-evenly items-center relative">
        <div className="flex flex-col w-full justify-evenly items-center">
          <img src={userIcon} alt="user icon" className="w-1/4 mb-2" />
        </div>

        <div className="w-11/12">
          <InputField
            onChange={handleInputField}
            name="email"
            placeholder="Email"
            inputType="email"
          />
          <InputField
            onChange={handleInputField}
            name="username"
            placeholder="Username"
          />
          <div className="flex justify-between">
            <div className="flex w-[45%]">
              <InputField
                onChange={handleInputField}
                name="password"
                placeholder="Password"
                inputType="password"
              />
            </div>
            <div className="flex w-[45%]">
              <InputField
                onChange={handleInputField}
                name="confirm_password"
                placeholder="Confirm Password"
                inputType="password"
              />
            </div>
          </div>
          <InputField
            onChange={handleInputField}
            name="full_name"
            placeholder="Full Name"
          />
          <InputField
            onChange={handleInputField}
            name="address"
            placeholder="Address"
          />
          <div className="flex justify-between">
            <div className="flex w-[45%]">
              <InputField
                onChange={handleInputField}
                name="city"
                placeholder="City"
              />
            </div>
            <div className="flex w-[45%]">
              <InputField
                onChange={handleInputField}
                name="state"
                placeholder="State"
              />
            </div>
          </div>
          <InputField
            onChange={handleInputField}
            name="zip_code"
            placeholder="Zip Code"
          />
        </div>

        <div className="w-3/4 absolute bottom-6">
          <CustomBtn />
        </div>
      </div>
    </div>
  )
}

export default Register
