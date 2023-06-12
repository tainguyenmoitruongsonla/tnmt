// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import Factory from 'mdi-material-ui/Factory';
import NoteText from 'mdi-material-ui/NoteText';
import ChartSankey from 'mdi-material-ui/ChartSankey';
import Information from 'mdi-material-ui/Information';
import More from 'mdi-material-ui/More';
import TagOutline from 'mdi-material-ui/TagOutline';
import CircleOutline from 'mdi-material-ui/CircleOutline';
import WaterIcon from '@mui/icons-material/Water';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import { Tv } from "@mui/icons-material";

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Trang chủ',
      icon: HomeOutline,
      path: '/'
    },
    {
      sectionTitle: 'Danh mục'
    },
    {
      title: 'Công trình',
      icon: Factory,
      children: [
        {
          icon: CircleOutline,
          title: 'Nước mặt',
          path: '/cong-trinh/nuoc-mat'
        },
        {
          icon: CircleOutline,
          title: 'Nước dưới đất',
          path: '/cong-trinh/nuoc-duoi-dat'
        },
        {
          icon: CircleOutline,
          title: 'Xả thải',
          path: '/cong-trinh/xa-thai'
        }
      ]
    },
    {
      title: 'Quan trắc',
      icon: DisplaySettingsIcon,
      children: [
        {
          icon: CircleOutline,
          title: 'Nước mặt',
          path: '/quan-trac/nuoc-mat'
        },
        {
          icon: CircleOutline,
          title: 'Nước dưới đất',
          path: '/quan-trac/nuoc-duoi-dat'
        },
        {
          icon: CircleOutline,
          title: 'Xả thải',
          path: '/quan-trac/xa-thai'
        }
      ]
    },
    {
      title: 'Giấy phép',
      icon: NoteText,
      children: [
        {
          icon: CircleOutline,
          title: 'Quản lý cấp phép',
          path: '/giay-phep/quan-ly'
        },
        {
          icon: CircleOutline,
          title: 'Nước mặt',
          path: '/giay-phep/nuoc-mat'
        },
        {
          icon: CircleOutline,
          title: 'KTSD NDĐ',
          path: '/giay-phep/nuoc-duoi-dat/khai-thac-su-dung'
        },
        {
          icon: CircleOutline,
          title: 'Thăm dò NDĐ',
          path: '/giay-phep/nuoc-duoi-dat/tham-do'
        },
        {
          icon: CircleOutline,
          title: 'Hành nghề khoan NDĐ',
          path: '/giay-phep/nuoc-duoi-dat/hanh-nghe-khoan'
        },
        {
          icon: CircleOutline,
          title: 'Xả thải',
          path: '/giay-phep/xa-thai'
        }
      ]
    },
    {
      title: 'Giám sát',
      icon: ChartSankey,
      children: [
        {
          icon: CircleOutline,
          title: 'Nước mặt',
          path: '/giam-sat/nuoc-mat'
        },
        {
          icon: CircleOutline,
          title: 'KTSD NDĐ',
          path: '/giam-sat/khai-thac-ndd'
        },
        {
          icon: CircleOutline,
          title: 'Thăm dò NDĐ',
          path: '/giam-sat/tham-do-ndd'
        },
        {
          icon: CircleOutline,
          title: 'Hành nghề khoan NDĐ',
          path: '/giam-sat/hanh-nghe-khoan-ndd'
        },
        {
          icon: CircleOutline,
          title: 'Xả thải',
          path: '/giam-sat/xa-thai'
        }
      ]
    },
    {
      title: 'Thông tin - Báo cáo biểu mẫu',
      icon: Information,
      path: '/bao-cao-bieu-mau'
    },
    {
      title: 'Trữ lượng nước',
      icon: WaterIcon,
      path: '/tru-luong-nuoc'
    },
    {
      title: 'Nội dung khác',
      icon: More,
      path: 'noi-dung-khac'
    },
    {
      title: 'Hướng dẫn sử dụng',
      icon: TagOutline,
      path: 'huong-dan-su-dung'
    },
    {
      sectionTitle: 'Quản lý'
    },
    {
      title: 'Tài khoản & Quyền hạn',
      icon: AccountCogOutline,
      path: '/quan-ly/tai-khoan-va-quyen-han'
    },
    {
      title: 'Trang truy cập',
      icon: Tv,
      path: '/quan-ly/trang-truy-cap'
    },
  ]
}

export default navigation
