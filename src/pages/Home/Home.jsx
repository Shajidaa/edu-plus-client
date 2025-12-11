import Banner from "../../components/Home/Banner";
import Call from "../../components/Home/Call";
import LatestTuition from "../../components/Home/LatestTuition";
import LatestTutor from "../../components/Home/LatestTutor";
import PlatformSections from "../../components/Home/PlatformSections";

function Home() {
  return (
    <>
      <Banner></Banner>
      <LatestTuition></LatestTuition>
      <LatestTutor></LatestTutor>
      <Call></Call>
      <PlatformSections></PlatformSections>
    </>
  );
}

export default Home;
