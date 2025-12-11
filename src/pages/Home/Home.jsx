import Banner from "../../components/Home/Banner";
import LatestTuition from "../../components/Home/LatestTuition";
import Container from "../../components/Shared/Container";

function Home() {
  return (
    <Container>
      <Banner></Banner>
      <LatestTuition></LatestTuition>
    </Container>
  );
}

export default Home;
