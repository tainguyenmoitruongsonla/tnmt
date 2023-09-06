// ** Next Imports
import Head from 'next/head'
import { Router, useRouter } from 'next/router'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

// import { useEffect } from 'react'

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'
import type { EmotionCache } from '@emotion/cache'

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'

// ** Contexts
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** Global css styles
import '../../styles/globals.css'
import { useEffect } from 'react'

// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
  Component: NextPage
  emotionCache: EmotionCache
}

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

// ** Configure JSS & ClassName
const App = (props: ExtendedAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Kiểm tra trạng thái đăng nhập ở đây
      const loggedIn = localStorage.getItem('authToken');
      if (!loggedIn && router.pathname !== '/pages/login') {
        router.push('/pages/login')
      }

      //  else {
      //   // Đăng ký một hàm xử lý cho sự kiện beforeunload hoặc unload
      //   const handleBeforeUnload = () => {
      //     // Xóa dữ liệu từ localStorage
      //     localStorage.removeItem('authToken');
      //   };
      //   window.addEventListener('unload', handleBeforeUnload);

      //   // Hủy đăng ký hàm xử lý khi component bị unmount
      //   return () => {
      //     window.removeEventListener('unload', handleBeforeUnload);
      //   };
      // }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  // Variables
  const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{themeConfig.templateName}</title>
        <meta
          name='description'
          content={`${themeConfig.templateName} - Thiết kế và phát triển bởi Viện Thủy văn Môi trường và Biến đổi khí hậu`}
        />
        <meta name='keywords' content='Viện Thủy văn Môi trường và Biến đổi khí hậu' />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>

      <SettingsProvider>
        <SettingsConsumer>
          {({ settings }) => {
            return <ThemeComponent settings={settings}>{getLayout(<Component {...pageProps} />)}</ThemeComponent>
          }}
        </SettingsConsumer>
      </SettingsProvider>
    </CacheProvider>
  )
}

export default App
