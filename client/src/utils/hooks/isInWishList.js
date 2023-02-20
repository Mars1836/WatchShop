import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
function useIsInWishList(productId) {
  const [is, setIs] = useState(false);
  const wishlist = useSelector((state) => state.wishlist?.data);
  const isAuth = useSelector((state) => {
    return state.user.auth;
  });
  useEffect(() => {
    if (!wishlist) {
      return setIs(false);
    }
    const index = wishlist.findIndex((item) => {
      return item.product.id === productId;
    });

    if (index !== -1) {
      setIs(true);
    } else {
      setIs(false);
    }
  }, [wishlist]);
  return is;
}

export default useIsInWishList;
