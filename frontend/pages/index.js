import React, { Fragment } from "react";
import LoadingSpinner from "../components/Common/UX/LoadingSpinner";
import StatusOverlay from "../components/Common/UX/StatusOverlay";
import HomeCards from "../components/Home/HomeCards";
import Slider from "../components/Home/Slider";
import TopProducts from "../components/Home/TopProducts";

function Home(props) {
  return (
    <Fragment>
      <Slider />
      <TopProducts products={props.featuredProducts} />
      <HomeCards />
    </Fragment >
  )
}

export default Home;

export async function getStaticProps() {
  try {
    const res = await fetch(`${process.env.BACKEND}/featuredProducts`);
    const data = await res.json();
    if (!res.ok) {
      const err = new Error(data.message);
      throw err;
    } else {
      return {
        props: {
          featuredProducts: data.data,
        },
        revalidate: 120
      }
    }

  } catch (err) {
    return {
      redirect: {
        destination: "/wentWrong"
      }
    }
  }
}