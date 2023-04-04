// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import Factory from 'mdi-material-ui/Factory';
import NoteText from 'mdi-material-ui/NoteText';
import ChartSankey from 'mdi-material-ui/ChartSankey';
import Information from 'mdi-material-ui/Information';
import More from 'mdi-material-ui/More';
import TagOutline from 'mdi-material-ui/TagOutline';

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
      path: 'construction'
    },
    {
      title: 'Giấy phép',
      icon: NoteText,
      path: '#'
    },
    {
      title: 'Giám sát',
      icon: ChartSankey,
      path: '#'
    },
    {
      title: 'Thông tin - Báo cáo biểu mẫu',
      icon: Information,
      path: '#'
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
    // {
    //   sectionTitle: 'User Interface'
    // },
    // {
    //   title: 'Typography',
    //   icon: FormatLetterCase,
    //   path: '/typography'
    // },
    // {
    //   title: 'Icons',
    //   path: '/icons',
    //   icon: GoogleCirclesExtended
    // },
    // {
    //   title: 'Cards',
    //   icon: CreditCardOutline,
    //   path: '/cards'
    // },
    // {
    //   title: 'Tables',
    //   icon: Table,
    //   path: '/tables'
    // },
    // {
    //   icon: CubeOutline,
    //   title: 'Form Layouts',
    //   path: '/form-layouts'
    // },
    {
      sectionTitle: 'Quản lý'
    },
    {
      title: 'Quản lý tài khoản',
      icon: AccountCogOutline,
      path: '/account-settings'
    },
  ]
}

export default navigation
