import "../App.css";

export default function Section2() {
  return (
    <div
      style={{
        marginLeft: "auto",
        marginRight: "auto",
        display: "flex",
        flexDirection: "column",
        marginTop: "150px",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontSize: "13px",
          color: "#FF4495",
        }}
      >
        OUR SERVICES
      </div>
      <div
        style={{
          fontSize: "30px",
          textAlign: "center",
          marginTop: "30px",
          fontWeight: "500",
        }}
      >
        We provide awesome services
      </div>
      <div
        style={{
          marginTop: "60px",
          display: "flex",
          justifyContent: "space-between",
          gap: "20px",
          flexWrap: "wrap",
        }}
        className="fourbox"
      >
        <div
          style={{
            background: "#fff",
            borderRadius: "5px",
            padding: "40px 25px",
            transition: "all .4s ease-out 0s",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            boxShadow: "0 25px 35px rgba(68,162,255,0.4)",
          }}
        >
          <div
            style={{
              color: "#192839",
              fontSize: "28px",
              fontWeight: "700",
              //   marginBottom: "21px",
            }}
          >
            Discover, Explore
            <br /> the Product
          </div>
          <div></div>
          <div
            style={{
              fontSize: "19px",
            }}
          >
            Effective strategies to help you <br />
            reach customers.
          </div>
        </div>
        <div
          style={{
            background: "#fff",
            borderRadius: "5px",
            padding: "40px 25px",
            transition: "all .4s ease-out 0s",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            boxShadow: "0 25px 35px rgba(68,162,255,0.4)",
          }}
        >
          <div
            style={{
              color: "#192839",
              fontSize: "28px",
              fontWeight: "700",
              //   marginBottom: "21px",
            }}
          >
            Set schedule for
            <br /> sending email
          </div>
          <div></div>
          <div
            style={{
              fontSize: "19px",
            }}
          >
            Schedule a time to send daily
            <br /> requests.
          </div>
        </div>
        <div
          style={{
            background: "#fff",
            borderRadius: "5px",
            padding: "40px 25px",
            transition: "all .4s ease-out 0s",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            boxShadow: "0 25px 35px rgba(68,162,255,0.4)",
          }}
        >
          <div
            style={{
              color: "#192839",
              fontSize: "28px",
              fontWeight: "700",
              //   marginBottom: "21px",
            }}
          >
            Track your products
            <br /> rating.
          </div>
          <div></div>
          <div
            style={{
              fontSize: "19px",
            }}
          >
            Keep a regular track on your
            <br /> products for better sales
          </div>
        </div>
      </div>
    </div>
  );
}
