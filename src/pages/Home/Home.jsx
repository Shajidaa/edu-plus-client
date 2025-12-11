import Banner from "../../components/Home/Banner";
import LatestTuition from "../../components/Home/LatestTuition";
import LatestTutor from "../../components/Home/LatestTutor";
import Container from "../../components/Shared/Container";

function Home() {
  return (
    <Container>
      <Banner></Banner>
      <LatestTuition></LatestTuition>
      <LatestTutor></LatestTutor>
    </Container>
  );
}

export default Home;
