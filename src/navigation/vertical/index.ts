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
      title: 'Giấy phép',
      icon: NoteText,
      children: [
        {
          icon: CircleOutline,
          title: 'Nước mặt',
          path: '/giay-phep/nuoc-mat'
        },
        {
          icon: CircleOutline,
          title: 'KTSD NDĐ',
          path: '/giay-phep/nuoc-duoi-dat'
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
      path: '#'
    },
    {
      title: 'Thông tin - Báo cáo biểu mẫu',
      icon: Information,
      path: '/bao-cao-bieu-mau'
    },
    {
      title: 'Nội dung khác',
      icon: More,
      path: '#'
    },
    {
      title: 'Hướng dẫn sử dụng',
      icon: TagOutline,
      path: '#'
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
