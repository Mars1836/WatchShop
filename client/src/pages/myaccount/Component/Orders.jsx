import React, { useEffect, useState } from "react"
import styles from "./styles.module.scss"
import classNames from "classnames/bind"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import useAsyncData from "../../../utils/hooks/asyncData"
import orderRequest from "../../../requests/order"
import { Button } from "@mui/material"
import formatDate from "../../../utils/function/formatDate"
import { Chip } from "@mui/material"
import Modal from "../../../components/Modal/Modal"
const cx = classNames.bind(styles)

function Orders() {
  const [openOrderDetail, setOpenOrderDetail] = useState()
  function handleCloseModal() {
    setOpenOrderDetail(false)
  }
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein }
  }
  const [order, error, loading] = useAsyncData(orderRequest.getOrder())
  const statusColor = {
    Pending: "#F1C40F",
    Processing: "#76D7C4",
    Completed: "#28B463",
    Rejected: "#E74C3C",
  }
  const [orderDetail, setOrderDetail] = useState({})
  useEffect(() => {
    console.log(order, loading)
  }, [order])
  return (
    <div className={cx("orders")}>
      <Modal open={openOrderDetail} onClose={handleCloseModal}>
        <div className={cx("order_detail")}>
          <p className={cx("title")}>Purchase Receipt</p>
          <div className={cx("wrapper_1")}>
            <div className={cx("item")}>
              <p className={cx("wrapper_1_title")}>Date</p>
              <p>{formatDate(new Date(orderDetail.createdAt))}</p>
            </div>
            <div className={cx("item")}>
              <p className={cx("wrapper_1_title")}>Order No.</p>
              <p>12312312312</p>
            </div>
          </div>
          <div className={cx("wrapper_2")}>
            <div className={cx("item")}>
              {orderDetail.order_items && (
                <>
                  {orderDetail.order_items.map(item => {
                    return (
                      <div className={cx("order_item")}>
                        <p className={cx("name")}>{item.product.name}</p>
                        <p className={cx("price")}>{item.price}</p>
                      </div>
                    )
                  })}
                  <div className={cx("order_item")}>
                    <p className={cx("name")}>Shiping</p>
                    <p className={cx("price")}>30000</p>
                  </div>
                </>
              )}
            </div>
            <p className={cx("price", "total_price")}>
              {Number(orderDetail.totalPrice)}
            </p>
          </div>
        </div>
      </Modal>
      <h3 className={cx("title")}>Orders</h3>
      <div>
        {!order ? (
          <> {!loading && <div>Bạn chưa có đơn hàng nào.</div>}</>
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell align='center'>Order </TableCell>
                  <TableCell align='center'>Date</TableCell>
                  <TableCell align='center'>Status</TableCell>
                  <TableCell align='center'>Total</TableCell>
                  <TableCell align='center'>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order ? (
                  <>
                    {order.map((item, index) => (
                      <TableRow
                        key={item.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align='center'>{item.id}</TableCell>
                        <TableCell align='center'>
                          {formatDate(new Date(item.createdAt))}
                        </TableCell>
                        <TableCell align='center'>
                          <Chip
                            label={item.status}
                            size='small'
                            style={{
                              color: "#fff",
                              background: statusColor[item.status],
                            }}
                          />
                        </TableCell>
                        <TableCell align='center'>
                          {Number(item.totalPrice)}
                        </TableCell>
                        <TableCell align='center'>
                          <Button
                            variant='contained'
                            style={{
                              fontSize: "12px",
                              padding: "4px 8px",
                              color: "#fff",
                            }}
                            onClick={() => {
                              setOrderDetail(item)
                              setOpenOrderDetail(true)
                            }}
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                ) : (
                  <></>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  )
}

export default Orders
