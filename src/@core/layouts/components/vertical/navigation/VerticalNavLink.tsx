// ** React Imports
import { ElementType, ReactNode, useState } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Imports
import Chip from '@mui/material/Chip'
import ListItem from '@mui/material/ListItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import ListItemIcon from '@mui/material/ListItemIcon'
import ExpandIcon from 'mdi-material-ui/ChevronRight'
import ListItemButton, { ListItemButtonProps } from '@mui/material/ListItemButton'

// ** Configs Import
import themeConfig from 'src/configs/themeConfig'

// ** Types
import { NavGroup, NavLink } from 'src/@core/layouts/types'
import { Settings } from 'src/@core/context/settingsContext'

// ** Custom Components Imports
import UserIcon from 'src/layouts/components/UserIcon'

// ** Utils
import { handleURLQueries } from 'src/@core/layouts/utils'
import { List } from '@mui/material'

interface Props {
  item: NavLink
  settings: Settings
  navVisible?: boolean
  toggleNavVisibility: () => void
}

// ** Styled Components
const MenuNavLink = styled(ListItemButton)< ListItemButtonProps & { component?: ElementType; target?: '_blank' | undefined } >(({ theme }) => ({
  width: '100%',
  borderTopRightRadius: 100,
  borderBottomRightRadius: 100,
  color: theme.palette.text.primary,
  padding: theme.spacing(2.25, 3.5),
  transition: 'opacity .25s ease-in-out',
  '&.active, &.active:hover': {
    boxShadow: theme.shadows[3],
    backgroundImage: `linear-gradient(98deg, ${theme.palette.customColors.primaryGradient}, ${theme.palette.primary.dark} 94%)`
  },
  '&.menu__item: hover': {
    boxShadow: theme.shadows[3],
    backgroundImage: `linear-gradient(98deg, ${theme.palette.customColors.primaryGradient}, ${theme.palette.primary.dark} 94%)`
  },
  '&.active .MuiTypography-root, &.active .MuiSvgIcon-root': {
    color: `${theme.palette.common.white} !important`
  }
}))

const MenuItemTextMetaWrapper = styled(Box)<BoxProps>({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  transition: 'opacity .25s ease-in-out',
  ...(themeConfig.menuTextTruncate && { overflow: 'hidden' })
})

const VerticalNavLink = ({ item, navVisible, toggleNavVisibility }: Props) => {

  // ** Hooks
  const router = useRouter()

  const IconTag: ReactNode = item.icon

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const isNavLinkActive = (itemPath:any) => {
    if (router.pathname === itemPath || handleURLQueries(router, itemPath)) {
      return true
    } else {
      return false
    }
  }
  if(item.children){
    return(
      <>
        <ListItem disablePadding className='nav-link' disabled={item.disabled || false} sx={{ mt: 1.5, px: '0 !important' }} onMouseDown={handleClick}>
          <Link passHref href={item.path === undefined ? '#' : `${item.path}`}>
            <MenuNavLink
              component={'a'}
              className={isNavLinkActive(item.path) ? 'active' : ''+ ' menu__item' }
              {...(item.openInNewTab ? { target: '_blank' } : null)}
              onClick={e => {
                if (item.path === undefined) {
                  e.preventDefault()
                  e.stopPropagation()
                }
                if (navVisible) {
                  toggleNavVisibility()
                }
              }}
              sx={{
                pl: 5.5,
                ...(item.disabled ? { pointerEvents: 'none' } : { cursor: 'pointer' })
              }}
            >
              <ListItemIcon
                sx={{
                  mr: 2.5,
                  transition: 'margin .25s ease-in-out',
                  color: `#fff`
                }}
              >
                <UserIcon icon={IconTag} />
              </ListItemIcon>

              <MenuItemTextMetaWrapper>
                <Typography sx={{color: `#fff`}} {...(themeConfig.menuTextTruncate && { noWrap: true })}>{item.title}</Typography>
                {item.badgeContent ? (
                  <Chip
                    label={item.badgeContent}
                    color={item.badgeColor || 'primary'}
                    sx={{
                      height: 20,
                      fontWeight: 500,
                      marginLeft: 1.25,
                      '& .MuiChip-label': { px: 1.5, textTransform: 'capitalize' }
                    }}
                  />
                ) : null}
              </MenuItemTextMetaWrapper>
              {open || item.children.some(child => isNavLinkActive(child.path)) ?  
                item.children ? <ExpandIcon className='is-opened-children' sx={{ color: `#fff`}} />  : ''
                : 
                item.children ? <ExpandIcon className='is-not-opened-children' sx={{ color: `#fff`}} /> : ''
              }
            </MenuNavLink>
          </Link>
        </ListItem>
        <Collapse in={open || item.children.some(child => isNavLinkActive(child.path))} timeout="auto" unmountOnExit>
          <List sx={{paddingLeft: '10px'}}>
            {item.children.map((item: NavGroup | NavLink, index: number) => {
                return (
                  <ListItem key={index}
                  disablePadding
                  className='nav-link'
                  disabled={item.disabled || false}
                  sx={{ mt: 1.5, px: '0 !important'}}
                  onClick={handleClick}
                >
                  <Link passHref href={item.path === undefined ? '/' : `${item.path}`}>
                    <MenuNavLink
                      component={'a'}
                      className={isNavLinkActive(item.path) ? 'active' : ''+ ' menu__item'}
                      {...(item.openInNewTab ? { target: '_blank' } : null)}
                      onClick={e => {
                        if (item.path === undefined) {
                          e.preventDefault()
                          e.stopPropagation()
                        }
                        if (navVisible) {
                          toggleNavVisibility()
                        }
                      }}
                      sx={{
                        pl: 5.5,
                        ...(item.disabled ? { pointerEvents: 'none' } : { cursor: 'pointer' })
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          mr: 2.5,
                          transition: 'margin .25s ease-in-out',
                          color: `#fff`
                        }}
                      >
                        <UserIcon icon={item.icon}/>
                      </ListItemIcon>
        
                      <MenuItemTextMetaWrapper>
                        <Typography sx={{color: `#fff`}} {...(themeConfig.menuTextTruncate && { noWrap: true })}>{item.title}</Typography>
                        {item.badgeContent ? (
                          <Chip
                            label={item.badgeContent}
                            color={item.badgeColor || 'primary'}
                            sx={{
                              height: 20,
                              fontWeight: 500,
                              marginLeft: 1.25,
                              '& .MuiChip-label': { px: 1.5, textTransform: 'capitalize' }
                            }}
                          />
                        ) : null}
                      </MenuItemTextMetaWrapper>
                    </MenuNavLink>
                </Link>
              </ListItem>
                )
              })
            }
          </List>
        </Collapse>
      </>
    )
  }else{
  return (
    <ListItem
      disablePadding
      className='nav-link'
      disabled={item.disabled || false}
      sx={{ mt: 1.5, px: '0 !important' }}
    >
      <Link passHref href={item.path === undefined ? '/' : `${item.path}`}>
        <MenuNavLink
          component={'a'}
          className={isNavLinkActive(item.path) ? 'active' : ''+ ' menu__item'}
          {...(item.openInNewTab ? { target: '_blank' } : null)}
          onClick={e => {
            if (item.path === undefined) {
              e.preventDefault()
              e.stopPropagation()
            }
            if (navVisible) {
              toggleNavVisibility()
            }
          }}
          sx={{
            pl: 5.5,
            ...(item.disabled ? { pointerEvents: 'none' } : { cursor: 'pointer' })
          }}
        >
          <ListItemIcon
            sx={{
              mr: 2.5,
              transition: 'margin .25s ease-in-out',
              color: `#fff`
            }}
          >
            <UserIcon icon={IconTag} />
          </ListItemIcon>

          <MenuItemTextMetaWrapper>
            <Typography sx={{color: `#fff`}} {...(themeConfig.menuTextTruncate && { noWrap: true })}>{item.title}</Typography>
            {item.badgeContent ? (
              <Chip
                label={item.badgeContent}
                color={item.badgeColor || 'primary'}
                sx={{
                  height: 20,
                  fontWeight: 500,
                  marginLeft: 1.25,
                  '& .MuiChip-label': { px: 1.5, textTransform: 'capitalize' }
                }}
              />
            ) : null}
          </MenuItemTextMetaWrapper>
        </MenuNavLink>
      </Link>
    </ListItem>
  )}
}

export default VerticalNavLink
