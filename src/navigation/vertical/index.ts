// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'

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
      title: 'Công trình',
      primaryPath: 'cong-trinh',
      children: [
        {
          title: 'Bản đồ công trình',
          path: '/cong-trinh'
        },
        {
          title: 'Nước mặt',
          path: '/cong-trinh/nuoc-mat'
        },
        {
          title: 'Nước dưới đất',
          path: '/cong-trinh/nuoc-duoi-dat'
        },
        {
          title: 'Xả thải',
          path: '/cong-trinh/xa-thai'
        }
      ]
    },
    {
      title: 'Quan trắc',
      primaryPath: 'quan-trac',
      children: [
        {
          title: 'Nước mặt',
          path: '/quan-trac/nuoc-mat'
        },
        {
          title: 'Nước dưới đất',
          path: '/quan-trac/nuoc-duoi-dat'
        },
        {
          title: 'Xả thải',
          path: '/quan-trac/xa-thai'
        }
      ]
    },
    {
      title: 'Giám sát',
      primaryPath: 'giam-sat',
      children: [
        {
          title: 'Đăng ký kết nối',
          path: '/giam-sat/yeu-cau-ket-noi'
        },
        {
          title: 'QL đăng ký kết nối',
          path: '/giam-sat/quan-ly-yeu-cau-ket-noi'
        },
        {
          title: 'Nước mặt',
          path: '/giam-sat/nuoc-mat'
        },
        {
          title: 'Nước dưới đất',
          path: '/giam-sat/nuoc-duoi-dat'
        },
        {
          title: 'Xả thải',
          path: '/giam-sat/xa-thai'
        }
      ]
    },
    {
      title: 'Trữ lượng nước',
      primaryPath: 'tru-luong-nuoc',
      children: [
        {
          sectionTitle: 'Nước mưa',
        },
        {
          title: 'Nước mưa',
          path: '/tru-luong-nuoc/nuoc-mua'
        },

        //
        {
          sectionTitle: 'Nước mặt',
        },
        {
          title: 'Số lượng',
          path: '/tru-luong-nuoc/nuoc-mat/so-luong'
        },
        {
          title: 'Tổng lượng',
          path: '/tru-luong-nuoc/nuoc-mat/tong-luong'
        },
        {
          title: 'Chất lượng nước',
          path: '/tru-luong-nuoc/nuoc-mat/chat-luong-nuoc'
        },

        //
        {
          sectionTitle: 'Nước dưới đất',
        },
        {
          title: 'Số lượng NDĐ',
          path: '/tru-luong-nuoc/nuoc-duoi-dat/so-luong'
        },
        {
          title: 'Tổng lượng NDĐ',
          path: '/tru-luong-nuoc/nuoc-duoi-dat/tong-luong'
        },
        {
          title: 'Chất lượng NDĐ',
          path: '#'
        },
      ]
    },
    {
      title: 'Giấy phép',
      primaryPath: 'giay-phep',
      children: [
        {
          title: 'QL cấp phép',
          path: '/giay-phep/quan-ly'
        },
        {
          sectionTitle: 'Nước mặt',
        },
        {
          title: 'Nước mặt',
          path: '/giay-phep/nuoc-mat'
        },

        //
        {
          sectionTitle: 'Nước dưới đất',
        },
        {
          title: 'Khai thác sử dụng',
          path: '/giay-phep/nuoc-duoi-dat/khai-thac-su-dung'
        },
        {
          title: 'Thăm dò',
          path: '/giay-phep/nuoc-duoi-dat/tham-do'
        },
        {
          title: 'Hành nghề khoan',
          path: '/giay-phep/nuoc-duoi-dat/hanh-nghe-khoan'
        },

        //
        {
          sectionTitle: 'Xả thải',
        },
        {
          title: 'Xả thải',
          path: '/giay-phep/xa-thai'
        }
      ]
    },
    {
      title: 'Tiền cấp quyền',
      primaryPath: 'tien-cap-quyen',
      children: [
        {
          title: 'Giấy phép Bộ cấp',
          path: '/tien-cap-quyen/bo-cap'
        },
        {
          title: 'Giấy phép Tỉnh cấp',
          path: '/tien-cap-quyen/tinh-cap'
        }
      ]
    },
    {
      title: 'Thông tin - Dữ liệu',
      children: [
        {
          sectionTitle: 'Số lượng, chất lượng nước',
        },
        {
          title: 'Số lượng nước',
          path: '/thong-tin-du-lieu/so-luong-nuoc'
        },
        {
          title: 'Chất lượng nước',
          path: '/thong-tin-du-lieu/chat-luong-nuoc'
        },

        //
        {
          sectionTitle: 'Số liệu điều tra',
        },
        {
          title: 'Điều tra nước dưới đất',
          path: '#'
        },
        {
          title: 'Vùng hạn chế KTNDĐ',
          path: '#'
        },

        //
        {
          sectionTitle: 'KTSD Tài nguyên nước',
        },
        {
          title: 'Danh mục CTKTSDN',
          path: '/thong-tin-du-lieu/danh-muc-ctktsdn'
        },
        {
          title: 'KTSD nước mặt ',
          path: '/thong-tin-du-lieu/ktsd-nuoc-duoi-dat'
        },
        {
          title: 'KTSD nước dưới đất ',
          path: '#'
        },

        //
        {
          sectionTitle: 'Kết quả cấp phép',
        },
        {
          title: 'Kết quả cấp phép',
          path: '/thong-tin-du-lieu/ket-qua-cap-phep'
        },

        //
        {
          sectionTitle: 'HSKT Trạm',
        },
        {
          title: 'Nước mặt',
          path: '/thong-tin-du-lieu/hskt-tram/nuoc-mat'
        },
        {
          title: 'Nước dưới đất',
          path: '/thong-tin-du-lieu/hskt-tram/nuoc-duoi-dat'
        },

        //
        {
          sectionTitle: 'Danh mục nguồn nước',
        },
        {
          title: 'Hành lang BVNN',
          path: '/thong-tin-du-lieu/hanh-lang-bao-ve-nguon-nuoc'
        },
        {
          title: 'Danh mục NNNT',
          path: '/thong-tin-du-lieu/danh-muc-mnnt'
        },
      ]
    },
    {
      title: 'Thông báo - cảnh báo',
      primaryPath: 'thong-bao-canh-bao',
      path: '/thong-bao-canh-bao'
    },
    {
      title: 'Báo cáo biểu mẫu',
      path: '/bao-cao-bieu-mau'
    },
    {
      title: 'KN tiếp nhận nước thải',
      children: [
        {
          sectionTitle: 'Nguồn nước sông,suối',
        },
        {
          title: 'CLN theo QCVN ',
          path: '/kn-tiep-nhan-nuoc-thai/nguon-nuoc-song/cln'
        },
        {
          title: 'Thông tin nguồn thải',
          path: '/kn-tiep-nhan-nuoc-thai/nguon-nuoc-song/tt-nguon-thai'
        },
        {
          title: 'Thông tin nguồn TNNT ',
          path: '/kn-tiep-nhan-nuoc-thai/nguon-nuoc-song/tt-nhan-nuoc-thai'
        },
        {
          title: 'Khả năng TNNT sông,suối',
          path: '#'
        },
        {
          title: 'Tính dự báo KNTNNT sông,suối',
          path: '/kn-tiep-nhan-nuoc-thai/nguon-nuoc-song/du-bao-kntnnt'
        },

        //
        {
          sectionTitle: 'Nguồn nước ao,hồ',
        },
        {
          title: 'Thông số CLN theo QCVN',
          path: '/kn-tiep-nhan-nuoc-thai/nguon-nuoc-ao/cln'
        },
        {
          title: 'Thông tin nguồn thải ao,hồ',
          path: '#'
        },
        {
          title: 'Thông tin ao,hồ',
          path: '#'
        },
        {
          title: 'Khả năng TNNT ao,hồ',
          path: '#'
        },
        {
          title: 'Tính dự báo KNTNNT ao,hồ',
          path: '#'
        },
      ]
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
      primaryPath: 'he-thong',
      children: [
        {
          title: 'Loại công trình',
          path: '/loai-cong-trinh'
        },
        {
          title: 'Loại giấy phép',
          path: '/loai-giay-phep'
        },
        {
          title: 'Doanh nghiệp',
          path: '/doanh-nghiep'
        },
        {
          title: 'Sông',
          path: '/song'
        },
        {
          title: 'Lưu vực',
          path: '/luu-vuc'
        },
        {
          title: 'Tầng chứa nước',
          path: '/tang-chua-nuoc'
        },
        {
          title: 'File hướng dẫn sử dụng',
          path: '#'
        },
      ]
    },
    {
      title: 'Hệ thống',
      primaryPath: 'he-thong',
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
      primaryPath: 'phan-quyen',
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
