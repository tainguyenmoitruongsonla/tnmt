// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CircleOutline from 'mdi-material-ui/CircleOutline';

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { Functions, PeopleAltOutlined, Tv } from '@mui/icons-material';


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
          title: 'Bản đồ công trình',
          path: '/cong-trinh'
        },
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
      title: 'KN tiếp nhận nước thải',
      children: [
        {
          icon: CircleOutline,
          title: 'Nguồn nước sông',
          path: '#'
        },
        {
          icon: CircleOutline,
          title: 'Nguồn nước hồ',
          path: '#'
        }
      ]
    },
    {
      title: 'Giấy phép',
      children: [
        {
          icon: CircleOutline,
          title: 'QL cấp phép',
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
      title: 'Tiền cấp quyền',
      children: [
        {
          icon: CircleOutline,
          title: 'Tổng quan',
          path: '/tien-cap-quyen/tong-quan'
        },
        {
          icon: CircleOutline,
          title: 'Giấy phép Bộ cấp',
          path: '/tien-cap-quyen/bo-cap'
        },
        {
          icon: CircleOutline,
          title: 'Giấy phép Tỉnh cấp',
          path: '/tien-cap-quyen/tinh-cap'
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
          title: 'QL yêu cầu kết nối',
          path: '/giam-sat/quan-ly-yeu-cau-ket-noi'
        },
        {
          icon: CircleOutline,
          title: 'KT,SD nước mặt',
          path: '/giam-sat/nuoc-mat'
        },
        {
          icon: CircleOutline,
          title: 'KT,SD nước dưới đất',
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
      title: 'Trữ lượng nước',
      children: [
        {
          icon: CircleOutline,
          title: 'Nước mưa',
          path: '/tru-luong-nuoc/nuoc-mua'
        },
        {
          icon: CircleOutline,
          title: 'Nước mặt',
          path: '/tru-luong-nuoc/nuoc-mat'
        },
        {
          icon: CircleOutline,
          title: 'Nước dưới đất',
          path: '/tru-luong-nuoc/nuoc-duoi-dat'
        }
      ]
    },
    {
      title: 'Thông tin - Báo cáo biểu mẫu',
      path: '/bao-cao-bieu-mau'
    },
    {
      title: 'Nội dung khác',
      path: '#'
    },
    {
      title: 'Hướng dẫn sử dụng',
      path: '#'
    },
    {
      sectionTitle: 'Quản lý'
    },
    {
      title: 'Dữ liệu',
      children: [
        {
          title: 'Loại công trình',
          icon: CircleOutline,
          path: '#'
        },
        {
          title: 'Loại giấy phép',
          icon: CircleOutline,
          path: '#'
        },
        {
          title: 'Doanh nghiệp',
          icon: CircleOutline,
          path: '#'
        },
        {
          title: 'Sông',
          icon: CircleOutline,
          path: '#'
        },
        {
          title: 'Lưu vực',
          icon: CircleOutline,
          path: '#'
        },
        {
          title: 'Tầng chứa nước',
          icon: CircleOutline,
          path: '#'
        },
        {
          title: 'File hướng dẫn sử dụng',
          icon: CircleOutline,
          path: '#'
        },
      ]
    },
    {
      title: 'Hệ thống',
      children: [
        {
          title: 'Nhóm người dùng',
          icon: PeopleAltOutlined,
          path: '/he-thong/nhom-nguoi-dung'
        },
        {
          title: 'Người dùng',
          icon: AccountCogOutline,
          path: '/he-thong/nguoi-dung'
        },
        {
          title: 'Trang truy cập',
          icon: Tv,
          path: '/he-thong/trang-truy-cap'
        },
        {
          title: 'Các chức năng',
          icon: Functions,
          path: '#'
        },
      ]
    },
    {
      title: 'Phân quyền',
      children: [
        {
          title: 'Nhóm người dùng',
          icon: PeopleAltOutlined,
          path: '/phan-quyen/nhom-nguoi-dung'
        },
        {
          title: 'Người dùng',
          icon: AccountCogOutline,
          path: '/phan-quyen/nguoi-dung'
        }
      ]
    },
  ]
}

export default navigation
