'use client'

import * as React from 'react'

import { Box, Toolbar, IconButton, Menu, Button, MenuItem } from '@mui/material'
import XIcon from '@mui/icons-material/X'
import ArticleIcon from '@mui/icons-material/Article'
import discordIcon from '@/icons/Discord.svg'
import MenuIcon from '@mui/icons-material/Menu'
import Link from 'next/link'
import Image from 'next/image'

import logo from '/public/images/ArbitrumLogo.svg'

import { HeaderAccountPopover } from './HeaderAccountPopover'

import { AddChainButton } from './AddChain'
interface ResponsiveAppBarProps {
  wallet: boolean
  marginBelow: string
}

function ResponsiveAppBar({ wallet, marginBelow }: ResponsiveAppBarProps) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  return (
    <div className={`z-30 ${marginBelow}  flex justify-center`}>
      <nav
        className=" fixed   mx-auto w-full   border-b-2 border-gray-900 px-0 text-white    backdrop-blur-lg sm:px-8  md:max-w-[85vw]     "
        aria-labelledby="menu-button"
      >
        <Toolbar disableGutters>
          <Box
            sx={{
              display: {
                xs: 'none',
                lg: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }
            }}
          >
            <Image
              src={logo}
              width={40}
              height={40}
              alt="web Complare logo"
              className=" mr-2"
            />
            <h1 className="text-3xl font-semibold  text-white">Complere</h1>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', lg: 'none' },
              color: 'white'
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            {/* Mobile Links */}
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', lg: 'none' },
                mt: '1px',

                backdropFilter: 'blur(5px)',
                '& .MuiMenu-paper': {
                  backgroundColor: 'var(--mobile-menu-bg)',
                  borderRadius: '8px'
                }
              }}
            >
              {wallet && (
                <MenuItem
                  sx={{
                    transition: 'background 0.3s ease-in-out',
                    width: 'full',

                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <div className=" min-h-[30vh]">
                    <HeaderAccountPopover />
                  </div>
                </MenuItem>
              )}

              <MenuItem
                sx={{
                  width: { sm: '25vw', xs: '70vw' }
                }}
              >
                <div className="mt-1 flex w-full items-center justify-center p-2 text-white ">
                  <div className="flex items-center  justify-between space-x-5 ">
                    <Link
                      href={''}
                      target="_blank"
                      className="mb-2 text-sm transition-all duration-300 ease-in-out  hover:scale-110  sm:text-lg"
                      title="Twitter"
                    >
                      <XIcon />
                    </Link>
                    <Link
                      href={''}
                      target="_blank"
                      className="mb-2 text-sm transition-all duration-300 ease-in-out  hover:scale-110  sm:text-lg"
                      title="Blog"
                    >
                      <ArticleIcon />
                    </Link>

                    <Link
                      href={''}
                      target="_blank"
                      className="mb-2 text-sm transition-all duration-300   ease-in-out  hover:scale-110  sm:text-lg"
                      title="Discord Server"
                    >
                      <Image
                        src={discordIcon}
                        width={30}
                        height={30}
                        alt="discord icon"
                        className=""
                      />
                    </Link>
                  </div>
                </div>
              </MenuItem>
            </Menu>
          </Box>

          {/* Mobile menu end */}

          {/* web/mobile button and links */}

          <Box
            sx={{
              display: { xs: 'flex', lg: 'none', flexGrow: 1, mr: 2 }
            }}
          >
            <Image
              src={logo}
              width={40}
              height={40}
              alt="mobile Complare logo"
              className=" mr-2"
            />
            <h1 className="text-3xl font-semibold  text-white">Complere</h1>
          </Box>

          {/* Web Links */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', lg: 'flex' } }}></Box>

          {wallet && (
            <div className="mr-4  flex w-full  max-w-max  items-center   justify-end ">
              <AddChainButton />
            </div>
          )}

          {wallet && (
            <Box sx={{ display: { xs: 'none', lg: 'flex' }, width: 'full' }}>
              <HeaderAccountPopover />
            </Box>
          )}
        </Toolbar>
      </nav>
    </div>
  )
}
export default ResponsiveAppBar
