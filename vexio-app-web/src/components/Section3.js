import aboutus from "../assets/aboutus.jpg";

export default function Section3() {
  return (
    <div
      style={{
        marginTop: "200px",
        marginLeft: "auto",
        marginRight: "auto",
        display: "flex",
        gap: "150px",
        alignItems: "center",
      }}
      className="section3"
    >
      <img src={aboutus} alt="about us" height={450} width={500} />
      <div>
        <div
          style={{
            color: "#FF4495",
            fontSize: "13px",
            fontWeight: 400,
            letterSpacing: "0.1em",
          }}
        >
          ABOUT US
        </div>
        <div
          style={{
            fontSize: "35px",
            marginTop: "20px",
          }}
        >
          We Create Steps to Build a<br /> Successful Digital Product
        </div>
        <div
          style={{
            fontSize: "20px",
            maxWidth: "500px",
            lineHeight: "25px",
            marginTop: "20px",
          }}
        >
          With over 50 years of combined experience, our mission is to design
          with your values and vision in mind. We’re out to create purposeful
          spaces that increase your products' sales
        </div>
      </div>
    </div>
  );
}
