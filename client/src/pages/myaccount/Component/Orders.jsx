import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import classNames from "classnames/bind";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useAsyncData from "../../../utils/hooks/asyncData";
import orderRequest from "../../../requests/order";
import { Button } from "@mui/material";
import formatDate from "../../../utils/function/formatDate";
import { Chip } from "@mui/material";
const cx = classNames.bind(styles);

function Orders() {
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  const [order, error, loading] = useAsyncData(orderRequest.getOrder());
  const statusColor = {
    Pending: "#F1C40F",
    Processing: "#76D7C4",
    Completed: "#28B463",
    Rejected: "#E74C3C",
  };
  useEffect(() => {
    console.log(order, loading);
  }, [order]);
  return (
    <div className={cx("orders")}>
      <h3 className={cx("title")}>Orders</h3>
      <div>
        {!order?.order_items ? (
          <> {!loading && <div>Bạn chưa có đơn hàng nào.</div>}</>
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Order </TableCell>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Total</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order ? (
                  <>
                    {order.order_items.map((item) => (
                      <TableRow
                        key={item.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center">
                          {item.product.name}
                        </TableCell>
                        <TableCell align="center">
                          {formatDate(new Date(item.createdAt))}
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            label={item.status}
                            size="small"
                            style={{
                              color: "#fff",
                              background: statusColor[item.status],
                            }}
                          />
                        </TableCell>
                        <TableCell align="center">{item.price}</TableCell>
                        <TableCell align="center">
                          <Button
                            variant="contained"
                            style={{
                              fontSize: "12px",
                              padding: "4px 8px",
                              color: "#fff",
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
  );
}

export default Orders;
