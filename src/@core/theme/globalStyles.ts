// ** MUI Imports
import { Theme } from '@mui/material/styles'

const GlobalStyles = (theme: Theme) => {
  return {
    '.ps__rail-y': {
      zIndex: 1,
      right: '0 !important',
      left: 'auto !important',
      '&:hover, &:focus, &.ps--clicking': {
        backgroundColor: theme.palette.mode === 'light' ? '#E4E5EB !important' : '#423D5D !important'
      },
      '& .ps__thumb-y': {
        right: '3px !important',
        left: 'auto !important',
        backgroundColor: theme.palette.mode === 'light' ? '#C2C4D1 !important' : '#504B6D !important'
      },
      '.layout-vertical-nav &': {
        '& .ps__thumb-y': {
          width: 4,
          backgroundColor: theme.palette.mode === 'light' ? '#C2C4D1 !important' : '#504B6D !important'
        },
        '&:hover, &:focus, &.ps--clicking': {
          backgroundColor: 'transparent !important',
          '& .ps__thumb-y': {
            width: 6
          }
        }
      }
    },

    '&.MuiDataGrid-columnHeader': {
      whiteSpace: 'break-spaces !important',
      backgroundColor: 'rgb(21 83 143) !important',
      color: '#fff !important'
    },

    '&.MuiDataGrid-cell': {
      color: '#2f2f2f',
    },

    '#nprogress': {
      pointerEvents: 'none',
      '& .bar': {
        left: 0,
        top: 0,
        height: 3,
        width: '100%',
        zIndex: 2000,
        position: 'fixed',
        backgroundColor: theme.palette.primary.main
      }
    },

    '&.sub__nav &.menu__item': {
      borderLeft: `2px solid ${theme.palette.secondary.dark}`,
    },
    '&.sub__nav &.active::before': {
      content: '""',
      position: 'absolute',
      top: 'calc(50% - 5px)',
      left: '-6px',
      transform: 'translate(-50 %, -50 %)',
      width: '10px',
      height: '10px',
      backgroundColor: `${theme.palette.customColors.primaryGradient}`,
      borderRadius: '50%',
      zIndex: 1,
    }
  }
}

export default GlobalStyles
