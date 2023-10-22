import React, { useEffect, useState } from 'react'
import { PromptSelectType, UserType } from '../typings/weather'
import CustomBtn from '../components/CustomBtn'
import userImg from '../assets/gear_slot/head.png'
import InputField from '../components/InputField'
import { deleteAccount, updateAccount, updatePrompts } from '../services'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import { genderOptions, sensitivityToCold } from '../constants/PromptOptions'

type PropsType = {
  setToken: React.Dispatch<React.SetStateAction<string | undefined>>
}

const Profile = ({ setToken }: PropsType) => {
  const navigate = useNavigate()
  const [user, setUser] = useState<UserType>()
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [isPromptEdit, setIsPromptEdit] = useState<boolean>(false)
  const [updateError, setUpdateError] = useState<boolean>(false)
  const [isDeleteAccount, setIsDeleteAccount] = useState<boolean>(false)
  const [genderSelectedOption, setGenderSelectedOption] =
    useState<PromptSelectType>(genderOptions[0])
  const [sensitivityCold, setSensitivityCold] = useState<PromptSelectType>(
    sensitivityToCold[0]
  )

  useEffect(() => {
    const userExist = sessionStorage.getItem('warm_weather_user')
    if (userExist) {
      setUser(JSON.parse(userExist))
    }
  }, [])
  useEffect(() => {
    if (!user) return

    const userCold = {
      value: user.prompt.sensitivity_to_cold,
      label: user.prompt.sensitivity_to_cold
    }
    setSensitivityCold(userCold)
    const userGender = {
      value: user.prompt.gender,
      label: user.prompt.gender
    }
    setGenderSelectedOption(userGender)
    sessionStorage.setItem('warm_weather_user', JSON.stringify(user))
  }, [user])

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

  const handlePromptUpdate = async () => {
    if (!user) return
    const token = sessionStorage.getItem('warm_weather_token')

    const updateData = {
      User: user.id,
      gender: genderSelectedOption.value,
      sensitivity_to_cold: sensitivityCold.value
    }
    const headers = {
      Accept: 'application/json',
      Authorization: 'Token ' + token,
      'Content-Type': 'application/json;charset=UTF-8'
    }

    const res = await updatePrompts(updateData, { headers })
    if (res?.status === 200) {
      setUser({ ...user, prompt: res.data })
    }
    setIsPromptEdit((prev) => !prev)
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
      await deleteAccount(userId, { headers })
    }

    setIsDeleteAccount((prev) => !prev)
    sessionStorage.removeItem('warm_weather_token')
    sessionStorage.removeItem('warm_weather_user')
    setUser(undefined)
    setToken(undefined)

    navigate('/')
  }

  return (
    <div
      className={`pt-14 px-4 flex flex-col justify-between h-full md:min-h-screen border relative`}
    >
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
                  name="email"
                  value={user?.email}
                  onChange={handleUpdateChange}
                  errorColor={false}
                />
              </div>
              <div>
                <label htmlFor="first_name">First Name</label>
                <InputField
                  name="first_name"
                  value={user?.first_name}
                  onChange={handleUpdateChange}
                  errorColor={false}
                />
              </div>
              <div>
                <label htmlFor="last_name">Last Name</label>
                <InputField
                  name="last_name"
                  value={user?.last_name}
                  onChange={handleUpdateChange}
                  errorColor={false}
                />
              </div>

              <div>
                <label htmlFor="zip_code">Zip Code</label>
                <InputField
                  name="zip_code"
                  value={user?.zip_code}
                  onChange={handleUpdateChange}
                  errorColor={false}
                />
              </div>
              <div className="flex gap-1">
                {isEdit && (
                  <CustomBtn
                    title="Cancel"
                    onClick={handleEditCancel}
                    bgColor="bg-red-700"
                  />
                )}
                <CustomBtn title={'Update'} onClick={handleAccountUpdate} />
              </div>
            </div>
          )}
        </div>
        <div className="mt-4 bg-slate-200 bg-opacity-50 rounded-md px-2 py-4">
          {!isPromptEdit ? (
            <>
              <div className="flex justify-between items-center">
                <p>Prompt keywords</p>
                <div>
                  <CustomBtn
                    title="edit"
                    onClick={() => {
                      setIsPromptEdit((prev) => !prev)
                    }}
                  />
                </div>
              </div>
              <div>
                <p>Gender: {user?.prompt.gender}</p>
                <p>On 72°F: {user?.prompt.sensitivity_to_cold}</p>
              </div>
            </>
          ) : (
            <>
              <div>
                <p>On a sunny 72˚ day, how do you normally feel?</p>
                <label htmlFor="Gender">Zip Code</label>
                <Select
                  options={genderOptions}
                  value={genderSelectedOption}
                  onChange={(e) => {
                    if (e) {
                      setGenderSelectedOption(e)
                    }
                  }}
                />
                <label>Sensitivity to cold</label>
                <Select
                  options={sensitivityToCold}
                  value={sensitivityCold}
                  onChange={(e) => {
                    if (e) {
                      setSensitivityCold(e)
                    }
                  }}
                />
                <div className="flex gap-1">
                  {isPromptEdit && (
                    <CustomBtn
                      title="Cancel"
                      onClick={() => setIsPromptEdit((prev) => !prev)}
                      bgColor="bg-red-700"
                    />
                  )}
                  <CustomBtn title={'Update'} onClick={handlePromptUpdate} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {!isEdit && !isPromptEdit && (
        <div className="flex w-full relative bottom-4 justify-center">
          <div className="w-1/2">
            <CustomBtn
              title="Log out"
              bgColor="bg-red-600"
              onClick={handleLogout}
            />
          </div>
        </div>
      )}

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
