import React, { useEffect, useState } from 'react'
import { UserType } from '../typings/weather'
import CustomBtn from '../components/CustomBtn'
import userImg from '../assets/gear_slot/head.png'
import InputField from '../components/InputField'
import { deleteAccount, updateAccount } from '../services'
import { useNavigate } from 'react-router-dom'

type PropsType = {
  setToken: React.Dispatch<React.SetStateAction<string | undefined>>
}

const Profile = ({ setToken }: PropsType) => {
  const navigate = useNavigate()
  const [user, setUser] = useState<UserType>()
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [updateError, setUpdateError] = useState<boolean>(false)
  const [isDeleteAccount, setIsDeleteAccount] = useState<boolean>(false)

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
        setUpdateError(false)
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

  const handleLogout = (): void => {
    sessionStorage.removeItem('warm_weather_token')
    sessionStorage.removeItem('warm_weather_user')
    setUser(undefined)
    setToken(undefined)

    navigate('/')
  }

  const handleDeleteAccount = async () => {
    const token = sessionStorage.getItem('warm_weather_token')
    const userId = user?.id

    const headers = {
      Accept: 'application/json',
      Authorization: 'Token ' + token,
      'Content-Type': 'application/json;charset=UTF-8'
    }
    if (userId) {
      const res = await deleteAccount(userId, { headers })
    }

    setIsDeleteAccount((prev) => !prev)
    sessionStorage.removeItem('warm_weather_token')
    sessionStorage.removeItem('warm_weather_user')
    setUser(undefined)
    setToken(undefined)

    navigate('/')
  }

  return (
    <div className={`pt-10 px-4 `}>
      <div className={`${isDeleteAccount && 'blur-sm'}`}>
        <div className="flex flex-1 justify-start items-center">
          <div className="border-2 border-cyan-500 rounded-full">
            <img src={userImg} alt="" className="w-24 h-24 rounded-full" />
          </div>
          <div className="flex flex-1 pl-2">
            {user && (
              <p className=" text-white">
                {user.first_name[0] &&
                  user?.first_name[0].toUpperCase() +
                    user?.first_name.slice(1)}{' '}
                {user.last_name &&
                  user?.last_name[0].toUpperCase() + user?.last_name.slice(1)}
              </p>
            )}
          </div>
          {/* <div className="flex">
            <CustomBtn title="Follow" onClick={() => {}} />
          </div> */}
        </div>
        <div className="mt-4 bg-slate-200 bg-opacity-50 rounded-md px-2 py-4">
          <div className="flex justify-between items-center">
            <p className="">My Info. </p>
            {updateError && (
              <p className="flex text-red-600">
                'Error while updating. try again later'
              </p>
            )}
            <div className="flex gap-1">
              {!isEdit && (
                <CustomBtn title={'edit'} onClick={handleAccountUpdate} />
              )}
              {isEdit && (
                <CustomBtn
                  title={'Delete Account'}
                  bgColor="bg-red-700"
                  onClick={() => setIsDeleteAccount((prev) => !prev)}
                />
              )}
            </div>
          </div>
          {!isEdit ? (
            <>
              <div>
                <p className="px-1">E-mail: {user?.email}</p>
              </div>
              <div className="flex">
                <p className="px-1">Zip Code: {user?.zip_code}</p>
              </div>
            </>
          ) : (
            <div>
              <div>
                <label htmlFor="email">Email</label>
                <InputField
                  // placeholder="email"
                  name="email"
                  value={user?.email}
                  onChange={handleUpdateChange}
                  errorColor={false}
                />
              </div>
              <div>
                <label htmlFor="first_name">First Name</label>
                <InputField
                  // placeholder="first name"
                  name="first_name"
                  value={user?.first_name}
                  onChange={handleUpdateChange}
                  errorColor={false}
                />
              </div>
              <div>
                <label htmlFor="last_name">Last Name</label>
                <InputField
                  // placeholder="last_name"
                  name="last_name"
                  value={user?.last_name}
                  onChange={handleUpdateChange}
                  errorColor={false}
                />
              </div>

              <div>
                <label htmlFor="zip_code">Zip Code</label>
                <InputField
                  // placeholder="zip_code"
                  name="zip_code"
                  value={user?.zip_code}
                  onChange={handleUpdateChange}
                  errorColor={false}
                />
              </div>
              <div className="flex gap-1">
                {isEdit && (
                  <CustomBtn
                    title="cancel"
                    onClick={handleEditCancel}
                    bgColor="bg-red-700"
                  />
                )}
                <CustomBtn title={'save'} onClick={handleAccountUpdate} />
              </div>
            </div>
          )}
        </div>
        <div className="mt-4 bg-slate-200 bg-opacity-50 rounded-md px-2 py-4">
          <p>Promp keywords</p>
          <div>
            <p>Gender: {user?.prompts.gender}</p>
            <p>On 72°F: {user?.prompts.sensitivity_to_cold}</p>
          </div>
        </div>
        {!isEdit && (
          <div className="flex w-screen absolute bottom-2 justify-center">
            <div className="w-1/2">
              <CustomBtn
                title="Log out"
                bgColor="bg-red-600"
                onClick={handleLogout}
              />
            </div>
          </div>
        )}
      </div>

      {/* Modal delete account */}
      {isDeleteAccount && (
        <div className="flex flex-col px-2 justify-center items-center text-white left-1/2 -translate-x-1/2 w-3/4 h-1/4 bg-slate-600 bg-opacity-50 rounded-lg z-10 absolute top-1/2 -translate-y-1/2">
          <p className="text-center">
            Are you sure you want to delete account?
          </p>
          <div className="absolute px-2 w-full gap-2 flex justify-between bottom-4">
            <CustomBtn
              title={'Cancel'}
              onClick={() => setIsDeleteAccount((prev) => !prev)}
            />
            <CustomBtn
              title={'Delete'}
              onClick={handleDeleteAccount}
              bgColor="bg-red-700"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile
