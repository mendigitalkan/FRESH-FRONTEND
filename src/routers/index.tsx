import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AppLayout from '../layouts/AppLayout'
import ErrorPage from '../pages/error-page'
import DashboardView from '../pages/dashboard/dashboardView'
import LoginView from '../pages/auth/Login'
import ProfileView from '../pages/myProfile/Index'
import AuthLayout from '../layouts/AuthLayout'
import { useToken } from '../hooks/token'
import SettingsView from '../pages/settings/Index'
import ProductListView from '../pages/products/listProductView'
import CategoryListView from '../pages/category/categoryListView'
import CategoryCreateView from '../pages/category/categoryCreateView'
import CategoryEditView from '../pages/category/categoryEditView'
import DetailProductView from '../pages/products/detailProductView'
import CreateProductView from '../pages/products/createProductView'
import EditProductView from '../pages/products/editProductView'
import ListAdminView from '../pages/admins/listAdminView'
import CreateAdminView from '../pages/admins/createAdminView'
import DetailAdminView from '../pages/admins/detailAdminView'
import EditAdminView from '../pages/admins/editAdminView'
import DetailOrderView from '../pages/orders/detailOrderView'
import ListOrderView from '../pages/orders/listOrderView'
import ListCustomersView from '../pages/customers/listCustomersView'
import DetailCustomersView from '../pages/customers/detailCustomersView'
import ListWablasView from '../pages/wablas/listWablasView'
import ListTransactionView from '../pages/transactions/listTransactionView'
import DetailTransactionView from '../pages/transactions/detailTransactionView'
import ListNotificationView from '../pages/notification/ListNotificationView'
import CreateNotificationView from '../pages/notification/CreateNotificationView'
import EditProfileView from '../pages/myProfile/EditProfileView'
import CreateWaBlasView from '../pages/wablas/CreateWaBlasView'
import CreateBankSettingsView from '../pages/settings/bank/CreateBankSettingView'
import EditBankSettingView from '../pages/settings/bank/EditBankSettingView'

export default function AppRouters() {
  const routers: { path: string; element: JSX.Element }[] = []
  const authRouters: { path: string; element: JSX.Element }[] = [
    {
      path: '/',
      element: <LoginView />
    },
    {
      path: '/login',
      element: <LoginView />
    }
  ]

  const mainRouters: { path: string; element: JSX.Element }[] = []

  const currentUser = 'superAdmin'

  switch (currentUser) {
    case 'superAdmin':
      mainRouters.push(
        ...[
          {
            path: '/',
            element: <DashboardView />
          },
          {
            path: '/products',
            element: <ProductListView />
          },
          {
            path: '/products/create',
            element: <CreateProductView />
          },
          {
            path: '/products/detail/:productId',
            element: <DetailProductView />
          },
          {
            path: '/products/edit/:productId',
            element: <EditProductView />
          },
          {
            path: '/categories',
            element: <CategoryListView />
          },
          {
            path: '/categories/create',
            element: <CategoryCreateView />
          },
          {
            path: '/categories/edit/:categoryId',
            element: <CategoryEditView />
          },
          {
            path: '/customers',
            element: <ListCustomersView />
          },
          {
            path: '/customers/detail/:customerId',
            element: <DetailCustomersView />
          },
          {
            path: '/notifications',
            element: <ListNotificationView />
          },
          {
            path: '/notifications/create',
            element: <CreateNotificationView />
          },
          {
            path: '/orders',
            element: <ListOrderView />
          },
          {
            path: '/orders/detail/:orderId',
            element: <DetailOrderView />
          },
          {
            path: '/transactions',
            element: <ListTransactionView />
          },
          {
            path: '/transactions/detail/:transactionId',
            element: <DetailTransactionView />
          },
          {
            path: '/wa-blas',
            element: <ListWablasView />
          },
          {
            path: '/wa-blas/create',
            element: <CreateWaBlasView />
          },
          {
            path: '/admins',
            element: <ListAdminView />
          },
          {
            path: '/admins/create',
            element: <CreateAdminView />
          },
          {
            path: '/admins/detail/:adminId',
            element: <DetailAdminView />
          },
          {
            path: '/admins/edit/:adminId',
            element: <EditAdminView />
          },

          //settings routers
          {
            path: '/settings',
            element: <SettingsView />
          },
          {
            path: '/settings/bank/create',
            element: <CreateBankSettingsView />
          },
          {
            path: '/settings/bank/edit/:bankSettingId',
            element: <EditBankSettingView />
          },

          //my profile routers
          {
            path: '/my-profile',
            element: <ProfileView />
          },
          {
            path: '/my-profile/edit/:userId',
            element: <EditProfileView />
          }
        ]
      )
      break
    default:
      break
  }

  const { getToken } = useToken()

  const isAuth = getToken()

  if (isAuth) {
    routers.push(...mainRouters)
  } else {
    routers.push(...authRouters)
  }

  const appRouters = createBrowserRouter([
    {
      path: '/',
      element: isAuth ? <AppLayout /> : <AuthLayout />,
      errorElement: <ErrorPage />,
      children: routers
    }
  ])

  return <RouterProvider router={appRouters} />
}
