import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./styles.module.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { Button } from "@mui/material";
import { actionUserApi } from "../../../redux/actions/user";
import { Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import useArea from "../../../utils/hooks/area";
const cx = classNames.bind(styles);

function Addresses({ user }) {
  const [cityValue, setCityValue] = useState();
  const [districtValue, setDistrictValue] = useState();
  const [wardValue, setWardValue] = useState();
  const [particularAddress, setParticularAddress] = useState("");
  const [is, setIs] = useState(false);
  const dispatch = useDispatch();
  const citySelect = useRef(null);
  const area = useArea();
  function handleCityValueChange(e) {
    setCityValue(e.target.value);
    setDistrictValue("");
    setWardValue("");
  }

  function handleDistrictValueChange(e) {
    setDistrictValue(e.target.value);
    setWardValue("");
  }
  function handleWardValueChange(e) {
    setWardValue(e.target.value);
  }
  function handleParticularAddressChange(e) {
    setParticularAddress(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      city: area[cityValue].Name,
      district: area[cityValue].Districts[districtValue].Name,
      ward: area[cityValue].Districts[districtValue].Wards[wardValue].Name,
      location: particularAddress,
    };
    setCityValue();
    citySelect.current.selectedIndex = "0";
    setParticularAddress("");
    dispatch(actionUserApi.updateAddress(data));
  }

  useEffect(() => {
    if (cityValue && districtValue && wardValue) {
      setIs(true);
      return;
    }
    setIs(false);
  }, [cityValue, districtValue, wardValue]);
  return (
    <div className={cx("addresses")}>
      <h3 className={cx("title")}>Address</h3>
      <div>Địa chỉ hiện tại: </div>
      <>
        {!user.address.city ? (
          <p>Chưa có</p>
        ) : (
          <p>
            {(user.address.location && user.address.location + ", ") +
              user.address.ward +
              ", " +
              user.address.district +
              ", " +
              user.address.city}
          </p>
        )}
      </>
      <h4 style={{ margin: "20px 0" }}>Cập nhật địa chỉ</h4>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <select
              ref={citySelect}
              onChange={handleCityValueChange}
              className={cx("custom-select")}
            >
              <option value="">Chọn tỉnh thành</option>
              {area &&
                area.map((item, index) => {
                  return (
                    <option value={index} key={item.Id}>
                      {item.Name}
                    </option>
                  );
                })}
            </select>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <select
              defaultValue=""
              className={cx("custom-select")}
              onChange={handleDistrictValueChange}
            >
              <option value="">Chọn quận huyện</option>
              {area &&
                cityValue &&
                area[cityValue].Districts.map((item, index) => {
                  return (
                    <option value={index} key={item.Id}>
                      {item.Name}
                    </option>
                  );
                })}
            </select>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <select
              defaultValue=""
              className={cx("custom-select")}
              onChange={handleWardValueChange}
            >
              <option value="">Chọn phưỡng xã</option>
              {area &&
                cityValue &&
                districtValue &&
                area[cityValue].Districts[districtValue].Wards.map(
                  (item, index) => {
                    return (
                      <option value={index} key={item.Id}>
                        {item.Name}
                      </option>
                    );
                  }
                )}
            </select>
          </Grid>
        </Grid>
        <div
          className={cx("input_group")}
          style={{ flexDirection: "column", gap: "10px" }}
        >
          <label className={cx("label")}>Địa chỉ cụ thể</label>

          <div className={cx("input_wrap")}>
            <input
              type={"text"}
              value={particularAddress}
              onChange={handleParticularAddressChange}
            ></input>
          </div>
        </div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!is}
          sx={{
            color: "#fff",
          }}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Addresses;
