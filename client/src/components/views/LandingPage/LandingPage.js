import axios from "axios";
import React, { useCallback } from "react";

function LandingPage(props) {
  const onClickLogout = useCallback(() => {
    axios.get("api/users/logout").then((res) => {
      if (res.data.success) {
        props.history.push("/login");
      } else {
        alert("로그아웃에 실패 했습니다.");
      }
    });
  }, []);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <h1>시작 페이지</h1>
      <button onClick={onClickLogout}>로그아웃</button>
    </div>
  );
}

export default LandingPage;
