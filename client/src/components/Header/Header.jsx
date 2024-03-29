import React, { useRef } from "react"
import styles from "./header.module.scss"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import PhoneIcon from "@mui/icons-material/Phone"
import FacebookIcon from "@mui/icons-material/Facebook"
import InstagramIcon from "@mui/icons-material/Instagram"
import TwitterIcon from "@mui/icons-material/Twitter"
import Divider from "@mui/material/Divider"
import Button from "../Button/Button"
import FavoriteIcon from "@mui/icons-material/Favorite"
import SearchIcon from "@mui/icons-material/Search"
import { Badge } from "@mui/material"
import { useEffect, useMemo } from "react"
import { useTheme } from "@mui/material/styles"
import { useMediaQuery } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import Modal from "../Modal/Modal"
import { useState } from "react"
import classNames from "classnames/bind"
import { Link } from "react-router-dom"
import routes from "../../utils/configs/routes"
import useCurrentPage from "../../utils/hooks/currentPage"
import LoginForm from "../LoginForm/LoginForm"
import TooltipCart from "../Tooltip/TooltipCart"
import { useSelector } from "react-redux"
import { Avatar } from "@mui/material"
import TooltipUser from "../Tooltip/TooltipUser"
import CustomTooltip from "../Tooltip/CustomTooltip"
import { Tooltip } from "react-tooltip"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import SearchedProduct from "../Tooltip/SearchedProductTooltip/SearchedProductTooltip"
import Test from "../Test"
// import "./tooltip.css"
function Header() {
  const currentPage = useCurrentPage()
  const cx = classNames.bind(styles)
  const theme = useTheme()
  const isAuth = useSelector(state => state.user.auth)
  const user = useSelector(state => state.user.data)
  const sm_matches = useMediaQuery(theme.breakpoints.up("sm"))
  const md_matches = useMediaQuery(theme.breakpoints.up("md"))
  const isVerifyLoading = useSelector(state => state.user.verifyLoading)
  const [isSearchedTooltipOpen, setIsSearchedTooltipOpen] = useState(false)
  const [headerMenuShow, setHeaderMenuShow] = useState(false)
  const [open, setOpen] = useState(false)
  const [isShowBottomHeader, setIsShowBottomHeader] = useState(false)
  const [searchProductValue, setSearchProductValue] = useState("")
  const navigate = useNavigate()
  const cartNum =
    useSelector(state => {
      return state.cart.data?.cart_items?.length
    }) || 0
  useEffect(() => {}, [sm_matches, md_matches])
  const handleClose = () => setOpen(false)
  const handleOpen = () => setOpen(true)
  const handleProductValue = e => {
    setSearchProductValue(e.target.value)
  }
  const handleIsSearchedTooltipOpen = () => {
    setIsSearchedTooltipOpen(true)
  }
  const handleIsSearchedTooltipClose = () => {
    setIsSearchedTooltipOpen(false)
  }
  const search_form = useRef(null)
  const bottom_header_pc = useRef()
  const getTargetWidth = ref => {
    if (ref.current) {
      return ref.current.offsetWidth
    }
    return 0
  }
  useEffect(() => {
    setHeaderMenuShow(open)
  }, [open])
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          setIsShowBottomHeader(!entry.isIntersecting)
        })
      },
      {
        rootMargin: "30px",
      },
    )
    if (bottom_header_pc.current) {
      observer.observe(bottom_header_pc.current)
    }
  })

  const handleRequireAuth = url => {
    if (isAuth) {
      return navigate(url)
    }
    return toast.warning("Bạn cần đăng nhập trước!!!")
  }

  return (
    <>
      {md_matches ? (
        <div className={cx("header_pc")}>
          <div className={cx("top")}>
            <div className={cx("left")}>
              <div className={cx("infor")}>
                <LocationOnIcon className={cx("icon")}></LocationOnIcon>
                <p>319 - C16 Lý Thường Kiệt, P.15, Q.11, Tp.HCM</p>
              </div>
              <div className={cx("infor")}>
                <PhoneIcon className={cx("icon")}></PhoneIcon>
                <Button variant={"text"}>076 922 0162</Button>
              </div>
            </div>
            <div className={cx("right")}>
              {!isVerifyLoading && (
                <>
                  {isAuth ? (
                    <>
                      <p>{user.name}</p>
                      <Avatar
                        src={`${user.avatar}`}
                        id='tooltip-anchor-click'
                        sx={{ width: 30, height: 30, cursor: "pointer" }}
                      ></Avatar>
                      <CustomTooltip
                        events={["click"]}
                        anchorId='tooltip-anchor-click'
                        content={<TooltipUser></TooltipUser>}
                        place='bottom'
                        style={{
                          backgroundColor: "#242424",
                          opacity: 1,
                          zIndex: 1000,
                        }}
                        clickable
                      ></CustomTooltip>
                    </>
                  ) : (
                    <>
                      <Button
                        to={routes.login.path}
                        variant='text'
                        animate='none'
                      >
                        Đăng nhập
                      </Button>
                      /
                      <Button
                        to={routes.register.path}
                        variant='text'
                        animate='none'
                      >
                        Đăng ký
                      </Button>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
          <Divider sx={{ background: "rgb(72,72,72)" }}></Divider>
          <div className={cx("center")}>
            <div className={cx("left")}>
              <div className={cx("logo")}>
                <Button variant={"none"} href='/'>
                  <img
                    src='http://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/logo-mona-2.png'
                    alt=''
                    className={cx("img")}
                  />
                </Button>
              </div>
            </div>
            <div className={cx("center")}>
              <div className={cx("wrap_form")}>
                <div
                  ref={search_form}
                  className={cx("search_form")}
                  id='searched-product-tooltip-anchor-click'
                >
                  <input
                    className={cx("search_input")}
                    placeholder='Tìm kiếm...'
                    name='searchProductValue'
                    onChange={handleProductValue}
                    onFocus={handleIsSearchedTooltipOpen}
                    onBlur={handleIsSearchedTooltipClose}
                  ></input>
                  <Button
                    style={{
                      width: "70px",
                      borderBottomLeftRadius: "0px",
                      borderTopLeftRadius: "0px",
                    }}
                  >
                    <SearchIcon></SearchIcon>
                  </Button>
                </div>
                <CustomTooltip
                  className='noArrow'
                  isOpen={isSearchedTooltipOpen && searchProductValue}
                  anchorId='searched-product-tooltip-anchor-click'
                  content={
                    <SearchedProduct
                      searchValue={searchProductValue}
                    ></SearchedProduct>
                  }
                  place='bottom-end'
                  classNameArrow={cx("tooltip-arrow-searched-product")}
                  arrowColor='red'
                  style={{
                    backgroundColor: "rgb(72 72 72)",
                    opacity: 1,
                    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                    padding: 0,
                    zIndex: 1000,
                    width: `${getTargetWidth(search_form)}px`,
                  }}
                  clickable
                ></CustomTooltip>
              </div>
            </div>
            <div className={cx("right")}>
              <Button
                variant={"text"}
                onClick={() => {
                  handleRequireAuth(routes.wishlist.path)
                }}
              >
                <FavoriteIcon></FavoriteIcon>
              </Button>

              <>
                <div
                  className={cx("cart_icon")}
                  id='tooltip-cart'
                  onClick={() => {
                    handleRequireAuth(routes.cart.path)
                  }}
                >
                  <div></div>
                  <div className={cx("body")}>{cartNum}</div>
                </div>
                {!!cartNum && (
                  <CustomTooltip
                    anchorId='tooltip-cart'
                    content={<TooltipCart></TooltipCart>}
                    style={{
                      backgroundColor: "#fff",
                      zIndex: 1000,
                      boxShadow: "0px 0px 6px 2px rgba(0,0,0,0.37)",
                    }}
                    clickable
                  ></CustomTooltip>
                )}
              </>
            </div>
          </div>
          <Divider sx={{ background: "rgb(72,72,72)" }}></Divider>

          <div className={cx("bottom")} ref={bottom_header_pc}>
            <ul className={cx("navigation")}>
              <li className={cx("item")}>
                <Button
                  variant={"text-underline"}
                  to={routes.home.path}
                  className={cx({ btn_active: currentPage.home })}
                >
                  TRANG CHỦ
                </Button>
              </li>
              <li className={cx("item")}>
                <Button
                  variant={"text-underline"}
                  to={routes.introduce.path}
                  className={cx({ btn_active: currentPage.introduce })}
                >
                  GIỚI THIỆU
                </Button>
              </li>
              <li className={cx("item")}>
                <Button
                  variant={"text-underline"}
                  to={routes.maleWatches.path}
                  className={cx({ btn_active: currentPage.maleWatches })}
                >
                  ĐỒNG HỒ NAM
                </Button>
              </li>
              <li className={cx("item")}>
                <Button
                  variant={"text-underline"}
                  to={routes.femaleWatches.path}
                  className={cx({ btn_active: currentPage.femaleWatches })}
                >
                  ĐỒNG HỒ NỮ
                </Button>
              </li>
              <li className={cx("item")}>
                <Button
                  variant={"text-underline"}
                  to={routes.blog.path}
                  className={cx({ btn_active: currentPage.blog })}
                >
                  BLOGS
                </Button>
              </li>
              <li className={cx("item")}>
                <Button
                  variant={"text-underline"}
                  to={routes.contact.path}
                  className={cx({ btn_active: currentPage.contact })}
                >
                  LIÊN HỆ
                </Button>
              </li>
            </ul>
          </div>

          <div className={cx("bottom", "fixed", { hide: !isShowBottomHeader })}>
            <ul className={cx("navigation")}>
              <li className={cx("item")}>
                <Button
                  variant={"text-underline"}
                  to={routes.home.path}
                  className={cx({ btn_active: currentPage.home })}
                >
                  TRANG CHỦ
                </Button>
              </li>
              <li className={cx("item")}>
                <Button
                  variant={"text-underline"}
                  to={routes.introduce.path}
                  className={cx({ btn_active: currentPage.introduce })}
                >
                  GIỚI THIỆU
                </Button>
              </li>
              <li className={cx("item")}>
                <Button
                  variant={"text-underline"}
                  to={routes.maleWatches.path}
                  className={cx({ btn_active: currentPage.maleWatches })}
                >
                  ĐỒNG HỒ NAM
                </Button>
              </li>
              <li className={cx("item")}>
                <Button
                  variant={"text-underline"}
                  to={routes.femaleWatches.path}
                  className={cx({ btn_active: currentPage.femaleWatches })}
                >
                  ĐỒNG HỒ NỮ
                </Button>
              </li>
              <li className={cx("item")}>
                <Button
                  variant={"text-underline"}
                  to={routes.blog.path}
                  className={cx({ btn_active: currentPage.blog })}
                >
                  BLOGS
                </Button>
              </li>
              <li className={cx("item")}>
                <Button
                  variant={"text-underline"}
                  to={routes.contact.path}
                  className={cx({ btn_active: currentPage.contact })}
                >
                  LIÊN HỆ
                </Button>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div
          className={cx(`header_mobile`)}
          style={{
            right: `0px`,
          }}
        >
          <div className={cx("top")}>
            <div className={cx("right")}>
              <Button variant={"text"}>
                <FacebookIcon className={cx("icon")}></FacebookIcon>
              </Button>
              <Button variant={"text"}>
                <InstagramIcon className={cx("icon")}></InstagramIcon>
              </Button>
              <Button variant={"text"}>
                <TwitterIcon className={cx("icon")}></TwitterIcon>
              </Button>
            </div>
          </div>

          <div className={cx("main")}>
            <div className={cx("left")}>
              <div>
                <MenuIcon
                  className={cx("icon")}
                  onClick={handleOpen}
                ></MenuIcon>
              </div>
            </div>
            <div className={cx("center")}>
              <div className={cx("logo")}>
                <Button variant={"none"} href='/'>
                  <img
                    src='http://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/logo-mona-2.png'
                    alt=''
                    className={cx("img")}
                  />
                </Button>
              </div>
            </div>
            <div className={cx("right")}>
              <Button
                variant={"text"}
                to={!isAuth || routes.wishlist.path}
                onClick={() => {
                  handleRequireAuth()
                }}
              >
                <FavoriteIcon></FavoriteIcon>
              </Button>
            </div>
          </div>
          <Modal open={open} onClose={handleClose}>
            <div className={cx(`header_menu`, `${headerMenuShow && "show"}`)}>
              <div className={cx("input_group")}>
                <input placeholder='Tìm kiếm...'></input>
                <Button
                  variant={"contained"}
                  style={{ borderRadius: "0", padding: "4px 8px" }}
                >
                  <SearchIcon> </SearchIcon>
                </Button>
              </div>
              <ul className={cx("list")}>
                <li className={cx("item")}>
                  <Link to={routes.home.path}>TRANG CHỦ</Link>
                </li>
                <li className={cx("item")}>
                  <Link to={routes.introduce.path}>GIỚI THIỆU</Link>
                </li>
                <li className={cx("item")}>
                  <Link to={routes.maleWatches.path}>ĐỒNG HỒ NAM</Link>
                </li>
                <li className={cx("item")}>
                  <Link to={routes.femaleWatches.path}>ĐỒNG HỒ NỮ</Link>
                </li>
                <li className={cx("item")}>
                  <Link to={routes.blog.path}>BLOGS</Link>
                </li>
                <li className={cx("item")}>
                  <Link to={routes.contact.path}>LIÊN HỆ</Link>
                </li>
                {!isAuth ? (
                  <li className={cx("item")}>
                    <Link to={routes.login.path}>Đăng nhập</Link>
                  </li>
                ) : (
                  <li className={cx("item", "account")}>
                    My Account
                    <ul className={cx("list_account_option")}>
                      <li className={cx("account_option")}>
                        <Link to={routes.myAccount.path}>my account</Link>
                      </li>
                      <li className={cx("account_option")}>
                        <Link to={routes.cart.path}>Cart</Link>
                      </li>
                      <li className={cx("account_option")}>
                        <Link to={routes.wishlist.path}>wishlist</Link>
                      </li>
                    </ul>
                  </li>
                )}
              </ul>
            </div>
          </Modal>
        </div>
      )}
    </>
  )
}

export default Header
