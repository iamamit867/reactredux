import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-http-5783e-default-rtdb.firebaseio.com/cart.json"
      );

      if (!response.ok) {
        throw new Error("Sent cart data failed!");
      }
      const data = response.json();
      return data;
    };

    try {
        const cartData = await fetchData();
        dispatch(cartActions.replaceCart({
            items: cartData.items || [],
        totalQuantity: cartData.totalQuantity,}));
    } catch (error) {
        dispatch(
            uiActions.showNotify({
              status: "error",
              title: "Error!",
              message: "Sent cart data failed!",
            })
          );
    }

  };
};

export const sendCartData = (cartData) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotify({
        status: "pending",
        title: "Sending....",
        message: "Sending Cart Data!",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://react-http-5783e-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({items: cartData.items, totalQuantity: cartData.totalQuantity}),
        }
      );
      if (!response.ok) {
        throw new Error("Sent cart data failed!");
      }
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotify({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotify({
          status: "error",
          title: "Error!",
          message: "Sent cart data failed!",
        })
      );
    }
  };
};
