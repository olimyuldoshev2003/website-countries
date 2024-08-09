import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './layout/Layout'
import Home from './pages/home/Home'
import Countries from './pages/countries/Countries'
import Country from './pages/country/Country'

const App = () => {

  const router = createBrowserRouter([
    {
      path: `/`,
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home/>,
        },
        {
          path: `countries`,
          element: <Countries />,
        },
        {
          path: `/country/:id`,
          element: <Country />,
        }
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App