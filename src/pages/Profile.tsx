import React, { useEffect, useState } from 'react'
import { UserType } from '../typings/weather'
import CustomBtn from '../components/CustomBtn'
import userImg from '../assets/gear_slot/head.png'
import InputField from '../components/InputField'
import { updateAccount } from '../services'

const Profile = () => {
  const [user, setUser] = useState<UserType>()
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [updateError, setUpdateError] = useState<boolean>(false)

  useEffect(() => {
    const userExist = sessionStorage.getItem('warm_weather_user')
    if (userExist) {
      setUser(JSON.parse(userExist))
    }
  }, [])

  const handleEdit = (): void => setIsEdit((prev) => !prev)

  const handleUpdateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (user) setUser({ ...user, [event.target.name]: event.target.value })
  }

  const handleAccountUpdate = async () => {
    if (!isEdit) {
      handleEdit()
      return
    } else {
      handleEdit()
    }

    const token = sessionStorage.getItem('warm_weather_token')

    const headers = {
      Accept: 'application/json',
      Authorization: 'Token ' + token,
      'Content-Type': 'application/json;charset=UTF-8'
    }

    const updateUser: UserType | undefined = user ? { ...user } : undefined
    const userId = user?.id
    delete updateUser?.id

    if (userId && updateUser) {
      const res = await updateAccount(updateUser, userId, { headers })
      if (res?.status === 202) {
        sessionStorage.setItem('warm_weather_user', JSON.stringify(res.data))
      } else {
        setUpdateError(true)
        const userExist = sessionStorage.getItem('warm_weather_user')
        if (userExist) {
          setUser(JSON.parse(userExist))
        }
      }
    }
  }

  const handleEditCancel = (): void => {
    handleEdit()
    const userExist = sessionStorage.getItem('warm_weather_user')
    if (userExist) {
      setUser(JSON.parse(userExist))
    }
  }
  return (
    <div className="pt-10 px-4">
      <div className="flex flex-1 justify-start items-center">
        <div className="border-2 border-cyan-500 rounded-full">
          <img src={userImg} alt="" className="w-24 h-24 rounded-full" />
        </div>
        <div className="flex flex-1 pl-2">
          {user && (
            <p className=" text-white">
              {user?.first_name[0].toUpperCase() +
                user?.first_name.slice(1) +
                ' ' +
                user?.last_name[0].toUpperCase() +
                user?.last_name.slice(1)}
            </p>
          )}
        </div>
        <div className="flex">
          <CustomBtn title="Follow" onClick={() => {}} />
        </div>
      </div>
      <div className="mt-4 bg-slate-200 bg-opacity-50 rounded-md px-2 py-4">
        <div className="flex justify-between">
          <p className="">My Info. </p>
          {updateError && (
            <p className="flex text-red-600">
              'Error while updating. try again later'
            </p>
          )}
          <div className="flex gap-1">
            {isEdit && (
              <CustomBtn
                title="cancel"
                onClick={handleEditCancel}
                bgColor="bg-red-700"
              />
            )}
            <CustomBtn
              title={!isEdit ? 'edit' : 'save'}
              onClick={handleAccountUpdate}
            />
          </div>
        </div>
        {!isEdit ? (
          <>
            <div>
              <p className="px-1">email: {user?.email}</p>
            </div>
            <div className="flex">
              <p className="px-1">address: </p>
              <p className="px-1">{user?.address}</p>
              <p className="px-1">{user?.city}</p>
              <p className="px-1">{user?.state}</p>
              <p className="px-1">{user?.zip_code}</p>
            </div>
          </>
        ) : (
          <div>
            <div>
              <label htmlFor="email">Email</label>
              <InputField
                placeholder="email"
                name="email"
                value={user?.email}
                onChange={handleUpdateChange}
                errorColor={false}
              />
            </div>
            <div>
              <label htmlFor="first_name">First Name</label>
              <InputField
                placeholder="first_name"
                name="first_name"
                value={user?.first_name}
                onChange={handleUpdateChange}
                errorColor={false}
              />
            </div>
            <div>
              <label htmlFor="last_name">Last Name</label>
              <InputField
                placeholder="last_name"
                name="last_name"
                value={user?.last_name}
                onChange={handleUpdateChange}
                errorColor={false}
              />
            </div>
            <div>
              <label htmlFor="address">Address</label>
              <InputField
                placeholder="address"
                name="address"
                value={user?.address}
                onChange={handleUpdateChange}
                errorColor={false}
              />
            </div>
            <div>
              <label htmlFor="city">City</label>
              <InputField
                placeholder="city"
                name="city"
                value={user?.city}
                onChange={handleUpdateChange}
                errorColor={false}
              />
            </div>
            <div>
              <label htmlFor="state">State</label>
              <InputField
                placeholder="state"
                name="state"
                value={user?.state}
                onChange={handleUpdateChange}
                errorColor={false}
              />
            </div>
            <div>
              <label htmlFor="zip_code">Zip Code</label>
              <InputField
                placeholder="zip_code"
                name="zip_code"
                value={user?.zip_code}
                onChange={handleUpdateChange}
                errorColor={false}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
