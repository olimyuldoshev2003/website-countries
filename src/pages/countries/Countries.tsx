import React, { useEffect } from 'react'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { getCountries } from '../../api/api'

const Countries = () => {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getCountries())
  }, [dispatch])

  return (
      <>
      <div className="countries_page">
        
          </div>
      </>
  )
}

export default Countries