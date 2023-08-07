// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CircleOutline from 'mdi-material-ui/CircleOutline';

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { Tv } from '@mui/icons-material';

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
      children: [
        {
          icon: CircleOutline,
          title: 'Yêu cầu kết nối',
          path: '/giam-sat/yeu-cau-ket-noi'
        },
        {
          icon: CircleOutline,
          title: 'Quản lý yêu cầu kết nối',
          path: '/giam-sat/quan-ly-yeu-cau-ket-noi'
        },
        {
          icon: CircleOutline,
          title: 'Khai thác,sử dụng nước mặt',
          path: '/giam-sat/nuoc-mat'
        },
        {
          icon: CircleOutline,
          title: 'Khai thác,sử dụng NDD',
          path: '/giam-sat/nuoc-duoi-dat'
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
      path: '/bao-cao-bieu-mau'
    },
    {
      title: 'Trữ lượng nước',
      path: '/tru-luong-nuoc'
    },
    {
      title: 'Nội dung khác',
      path: 'noi-dung-khac'
    },
    {
      title: 'Hướng dẫn sử dụng',
      path: 'huong-dan-su-dung'
    },
    {
      sectionTitle: 'Quản lý'
    },
    {
      title: 'Hệ thống',
      children: [
        {
          title: 'Người dùng',
          icon: AccountCogOutline,
          path: '/he-thong/nguoi-dung'
        },
        {
          title: 'Nhóm người dùng',
          icon: AccountCogOutline,
          path: '/he-thong/nhom-nguoi-dung'
        },
        {
          title: 'Trang truy cập',
          icon: Tv,
          path: '/he-thong/trang-truy-cap'
        },
      ]
    },
    {
      title: 'Phân quyền',
      children: [
        {
          title: 'Người dùng',
          icon: AccountCogOutline,
          path: '/phan-quyen/nguoi-dung'
        },
        {
          title: 'Nhóm người dùng',
          icon: Tv,
          path: '/phan-quyen/nhom-nguoi-dung'
        },
      ]
    },
  ]
}

export default navigation
